import bcrypt from 'bcryptjs'
import { createServerActionClient } from './supabase-server'
import { User, Tenant } from '@/types'

export interface AuthUser extends User {
  tenant: Tenant
}

export interface LoginCredentials {
  employee_number: string
  passcode: string
  tenant_slug?: string
}

export interface AuthSession {
  user: AuthUser
  tenant_id: string
  access_token?: string
  refresh_token?: string
}

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'AuthError'
  }
}

// Validate passcode strength
export function validatePasscode(passcode: string): boolean {
  // Must be exactly 6 digits
  return /^\d{6}$/.test(passcode)
}

// Hash passcode for storage
export async function hashPasscode(passcode: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(passcode, saltRounds)
}

// Verify passcode against hash
export async function verifyPasscode(passcode: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(passcode, hash)
}

// Login function
export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const { employee_number, passcode, tenant_slug } = credentials

  if (!employee_number || !passcode) {
    throw new AuthError('Employee number and passcode are required', 'MISSING_CREDENTIALS')
  }

  if (!validatePasscode(passcode)) {
    throw new AuthError('Passcode must be exactly 6 digits', 'INVALID_PASSCODE_FORMAT')
  }

  const supabase = createServerActionClient()

  try {
    // Build query to find user
    let query = supabase
      .from('users')
      .select(`
        *,
        tenant:tenants(*)
      `)
      .eq('employee_number', employee_number)
      .eq('is_active', true)

    // If tenant_slug is provided, filter by it
    if (tenant_slug) {
      query = query.eq('tenants.slug', tenant_slug)
    }

    const { data: users, error: userError } = await query

    if (userError) {
      console.error('Database error during login:', userError)
      throw new AuthError('Login failed. Please try again.', 'DATABASE_ERROR')
    }

    if (!users || users.length === 0) {
      throw new AuthError('Invalid employee number or clinic not found', 'USER_NOT_FOUND')
    }

    if (users.length > 1 && !tenant_slug) {
      // User exists in multiple tenants, need tenant_slug
      throw new AuthError('Multiple clinics found. Please contact your administrator.', 'MULTIPLE_TENANTS')
    }

    const user = users[0] as AuthUser

    // Check if user is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const lockTime = Math.ceil((new Date(user.locked_until).getTime() - Date.now()) / 60000)
      throw new AuthError(`Account locked. Try again in ${lockTime} minutes.`, 'ACCOUNT_LOCKED')
    }

    // Verify passcode
    const isValidPasscode = await verifyPasscode(passcode, user.passcode_hash)

    if (!isValidPasscode) {
      // Increment failed attempts
      const failedAttempts = (user.failed_login_attempts || 0) + 1
      const shouldLock = failedAttempts >= 3

      await supabase
        .from('users')
        .update({
          failed_login_attempts: failedAttempts,
          locked_until: shouldLock ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null
        })
        .eq('id', user.id)

      if (shouldLock) {
        throw new AuthError('Too many failed attempts. Account locked for 15 minutes.', 'ACCOUNT_LOCKED')
      } else {
        const remaining = 3 - failedAttempts
        throw new AuthError(`Invalid passcode. ${remaining} attempts remaining.`, 'INVALID_PASSCODE')
      }
    }

    // Check if passcode needs to be changed
    if (user.must_change_passcode) {
      throw new AuthError('You must change your passcode before continuing.', 'PASSCODE_CHANGE_REQUIRED')
    }

    // Check if passcode is expired (30 days)
    if (user.passcode_expires_at && new Date(user.passcode_expires_at) < new Date()) {
      throw new AuthError('Your passcode has expired. Please change it.', 'PASSCODE_EXPIRED')
    }

    // Successful login - reset failed attempts and update last login
    await supabase
      .from('users')
      .update({
        failed_login_attempts: 0,
        locked_until: null,
        last_login_at: new Date().toISOString()
      })
      .eq('id', user.id)

    // Log audit event
    await supabase
      .from('audit_logs')
      .insert({
        tenant_id: user.tenant_id,
        user_id: user.id,
        action: 'login',
        entity_type: 'user',
        entity_id: user.id,
        new_values: { login_time: new Date().toISOString() }
      })

    return {
      user,
      tenant_id: user.tenant_id
    }

  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    console.error('Unexpected error during login:', error)
    throw new AuthError('An unexpected error occurred. Please try again.', 'UNKNOWN_ERROR')
  }
}

// Change passcode function
export async function changePasscode(
  userId: string,
  currentPasscode: string,
  newPasscode: string
): Promise<void> {
  if (!validatePasscode(currentPasscode) || !validatePasscode(newPasscode)) {
    throw new AuthError('Passcode must be exactly 6 digits', 'INVALID_PASSCODE_FORMAT')
  }

  if (currentPasscode === newPasscode) {
    throw new AuthError('New passcode must be different from current passcode', 'SAME_PASSCODE')
  }

  const supabase = createServerActionClient()

  try {
    // Get current user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('passcode_hash, passcode_changed_at')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      throw new AuthError('User not found', 'USER_NOT_FOUND')
    }

    // Verify current passcode
    const isValidCurrent = await verifyPasscode(currentPasscode, user.passcode_hash)
    if (!isValidCurrent) {
      throw new AuthError('Current passcode is incorrect', 'INVALID_CURRENT_PASSCODE')
    }

    // Check if new passcode was used recently (last 3 passcodes)
    // This would require storing passcode history - simplified for now

    // Hash new passcode
    const newHash = await hashPasscode(newPasscode)

    // Update passcode
    const { error: updateError } = await supabase
      .from('users')
      .update({
        passcode_hash: newHash,
        passcode_changed_at: new Date().toISOString(),
        passcode_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        must_change_passcode: false
      })
      .eq('id', userId)

    if (updateError) {
      throw new AuthError('Failed to update passcode', 'UPDATE_FAILED')
    }

    // Log audit event
    await supabase
      .from('audit_logs')
      .insert({
        user_id: userId,
        action: 'change_passcode',
        entity_type: 'user',
        entity_id: userId,
        new_values: { changed_at: new Date().toISOString() }
      })

  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    console.error('Unexpected error during passcode change:', error)
    throw new AuthError('Failed to change passcode. Please try again.', 'UNKNOWN_ERROR')
  }
}

// Get current session (for server components)
export async function getCurrentSession(): Promise<AuthSession | null> {
  // This would integrate with Next.js session management
  // For now, returning null - implement based on your session storage choice
  return null
}

// Logout function
export async function logout(userId?: string): Promise<void> {
  const supabase = createServerActionClient()

  if (userId) {
    // Log audit event
    await supabase
      .from('audit_logs')
      .insert({
        user_id: userId,
        action: 'logout',
        entity_type: 'user',
        entity_id: userId,
        new_values: { logout_time: new Date().toISOString() }
      })
  }

  // Clear session storage - implement based on your session storage choice
}

// Utility to check if user has permission
export function hasPermission(user: AuthUser, permission: string): boolean {
  const rolePermissions = {
    owner: ['*'], // All permissions
    admin: [
      'users.read', 'users.write',
      'patients.read', 'patients.write',
      'appointments.read', 'appointments.write',
      'billing.read', 'billing.write',
      'reports.read',
      'payroll.read', 'payroll.write',
      'expenses.read', 'expenses.write'
    ],
    dentist: [
      'patients.read',
      'appointments.read', 'appointments.update_own',
      'billing.read_own',
      'payroll.read_own',
      'inventory.read_own'
    ],
    front_desk: [
      'patients.read', 'patients.write',
      'appointments.read', 'appointments.write',
      'billing.read', 'billing.write'
    ],
    dental_assistant: [
      'patients.read', 'patients.update',
      'appointments.read',
      'inventory.read', 'inventory.write',
      'payroll.read_own'
    ]
  }

  const userPermissions = rolePermissions[user.role] || []

  // Check for wildcard permission (owner)
  if (userPermissions.includes('*')) {
    return true
  }

  // Check for exact permission match
  return userPermissions.includes(permission)
}