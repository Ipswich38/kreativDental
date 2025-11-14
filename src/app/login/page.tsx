'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-react'
import { AuthError } from '@/lib/auth'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    employee_number: '',
    passcode: '',
    tenant_slug: 'happy-teeth' // Default to Happy Teeth for POC
  })
  const [selectedRole, setSelectedRole] = useState('front_desk')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPasscodeChange, setShowPasscodeChange] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // For now, simulate login process
      // This will be replaced with actual API call to /api/auth/login
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful login - redirect to dashboard based on selected role
      const dashboardPath = getDashboardPath(selectedRole)
      router.push(dashboardPath)

    } catch (err) {
      setError('Login functionality will be implemented in Phase 2. This is a UI demo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    setError('') // Clear error when user starts typing
  }

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'owner':
        return '/dashboard/admin'
      case 'admin':
        return '/dashboard/admin'
      case 'dentist':
        return '/dashboard/dentist'
      case 'front_desk':
        return '/dashboard/front-desk'
      case 'dental_assistant':
        return '/dashboard/assistant'
      default:
        return '/dashboard'
    }
  }

  const formatPasscodeInput = (value: string) => {
    // Only allow digits and limit to 6 characters
    return value.replace(/\D/g, '').slice(0, 6)
  }

  if (showPasscodeChange) {
    return <PasscodeChangeForm
      employeeNumber={formData.employee_number}
      onSuccess={() => {
        setShowPasscodeChange(false)
        setError('')
        // Auto-submit with new credentials would go here
      }}
      onCancel={() => setShowPasscodeChange(false)}
    />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-teal-600">Kreativ</span>Dental
          </h1>
          <p className="text-gray-600">Welcome to Happy Teeth Dental Clinic</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your employee number and passcode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Employee Number */}
              <div className="space-y-2">
                <Label htmlFor="employee_number">Employee Number</Label>
                <Input
                  id="employee_number"
                  type="text"
                  placeholder="e.g., STAFF001 or DENT001"
                  value={formData.employee_number}
                  onChange={handleInputChange('employee_number')}
                  disabled={isLoading}
                  required
                  className="h-12 text-center text-lg font-mono tracking-wider"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              {/* Passcode */}
              <div className="space-y-2">
                <Label htmlFor="passcode">6-Digit Passcode</Label>
                <Input
                  id="passcode"
                  type="password"
                  placeholder="••••••"
                  value={formData.passcode}
                  onChange={(e) => {
                    const formatted = formatPasscodeInput(e.target.value)
                    setFormData(prev => ({ ...prev, passcode: formatted }))
                    setError('')
                  }}
                  disabled={isLoading}
                  required
                  maxLength={6}
                  className="h-12 text-center text-2xl font-mono tracking-wider"
                />
                <p className="text-xs text-gray-500">
                  Default passcode: 123456 (must change after first login)
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700"
                disabled={isLoading || formData.employee_number.length < 5 || formData.passcode.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Users */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3 text-center">Quick Demo Access:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, employee_number: 'DENT001', passcode: '123456' }))
                    setSelectedRole('owner')
                  }}
                  className={`p-2 rounded border ${selectedRole === 'owner' ? 'bg-teal-50 border-teal-300' : 'bg-gray-50 border-gray-200'} hover:bg-teal-50 transition-colors`}
                >
                  <p className="font-medium">Owner</p>
                  <p className="text-gray-600">DENT001</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, employee_number: 'STAFF001', passcode: '123456' }))
                    setSelectedRole('admin')
                  }}
                  className={`p-2 rounded border ${selectedRole === 'admin' ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'} hover:bg-blue-50 transition-colors`}
                >
                  <p className="font-medium">Admin</p>
                  <p className="text-gray-600">STAFF001</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, employee_number: 'DENT002', passcode: '123456' }))
                    setSelectedRole('dentist')
                  }}
                  className={`p-2 rounded border ${selectedRole === 'dentist' ? 'bg-teal-50 border-teal-300' : 'bg-gray-50 border-gray-200'} hover:bg-teal-50 transition-colors`}
                >
                  <p className="font-medium">Dentist</p>
                  <p className="text-gray-600">DENT002</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, employee_number: 'STAFF002', passcode: '123456' }))
                    setSelectedRole('front_desk')
                  }}
                  className={`p-2 rounded border ${selectedRole === 'front_desk' ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200'} hover:bg-purple-50 transition-colors`}
                >
                  <p className="font-medium">Front Desk</p>
                  <p className="text-gray-600">STAFF002</p>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, employee_number: 'STAFF004', passcode: '123456' }))
                  setSelectedRole('dental_assistant')
                }}
                className={`w-full mt-2 p-2 rounded border ${selectedRole === 'dental_assistant' ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200'} hover:bg-emerald-50 transition-colors text-xs`}
              >
                <p className="font-medium">Dental Assistant</p>
                <p className="text-gray-600">STAFF004</p>
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Click any role above to auto-fill credentials
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 KreativDental. All rights reserved.</p>
          <p>Need help? Contact your administrator.</p>
        </div>
      </div>
    </div>
  )
}

// Passcode Change Component
function PasscodeChangeForm({
  employeeNumber,
  onSuccess,
  onCancel
}: {
  employeeNumber: string
  onSuccess: () => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    currentPasscode: '',
    newPasscode: '',
    confirmPasscode: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.newPasscode !== formData.confirmPasscode) {
      setError('New passcode confirmation does not match')
      return
    }

    if (formData.currentPasscode === formData.newPasscode) {
      setError('New passcode must be different from current passcode')
      return
    }

    setIsLoading(true)

    try {
      // Implementation would call changePasscode API
      // For now, simulate success
      setTimeout(() => {
        onSuccess()
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError('Failed to change passcode. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">Change Passcode</CardTitle>
          <CardDescription className="text-center">
            You must change your default passcode before continuing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Current Passcode</Label>
              <Input
                type="password"
                placeholder="••••••"
                value={formData.currentPasscode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  currentPasscode: e.target.value.replace(/\D/g, '').slice(0, 6)
                }))}
                maxLength={6}
                className="text-center text-xl font-mono"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>New Passcode</Label>
              <Input
                type="password"
                placeholder="••••••"
                value={formData.newPasscode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  newPasscode: e.target.value.replace(/\D/g, '').slice(0, 6)
                }))}
                maxLength={6}
                className="text-center text-xl font-mono"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm New Passcode</Label>
              <Input
                type="password"
                placeholder="••••••"
                value={formData.confirmPasscode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  confirmPasscode: e.target.value.replace(/\D/g, '').slice(0, 6)
                }))}
                maxLength={6}
                className="text-center text-xl font-mono"
                required
              />
            </div>

            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || Object.values(formData).some(val => val.length !== 6)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing...
                  </>
                ) : (
                  'Change Passcode'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}