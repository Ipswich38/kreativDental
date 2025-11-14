// Core Entity Types
export interface Tenant {
  id: string
  name: string
  slug: string
  owner_name?: string
  email?: string
  phone?: string
  address?: string
  logo_url?: string
  timezone: string
  currency: string
  status: 'active' | 'suspended' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  tenant_id: string
  employee_number: string
  email?: string
  role: UserRole
  first_name: string
  middle_name?: string
  last_name: string
  suffix?: string
  position?: string
  specialty?: string
  phone?: string
  address?: string
  birth_date?: string
  hire_date?: string
  employment_status: 'active' | 'inactive' | 'terminated'

  // Passcode Management
  passcode_hash: string
  passcode_changed_at?: string
  passcode_expires_at?: string
  must_change_passcode: boolean
  failed_login_attempts: number
  locked_until?: string

  // Settings
  avatar_url?: string
  is_active: boolean
  last_login_at?: string
  created_at: string
  updated_at: string
}

export type UserRole = 'owner' | 'admin' | 'dentist' | 'front_desk' | 'dental_assistant'

export interface Patient {
  id: string
  tenant_id: string
  patient_number: string
  first_name: string
  middle_name?: string
  last_name: string
  suffix?: string
  birth_date: string
  gender?: string
  phone: string
  email?: string
  address?: string
  city?: string
  province?: string
  zip_code?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  has_medical_history: boolean
  medical_conditions?: string
  allergies?: string
  current_medications?: string
  insurance_type?: InsuranceType
  insurance_provider?: string
  insurance_card_number?: string
  insurance_expiry?: string
  status: 'active' | 'inactive' | 'archived'
  notes?: string
  created_at: string
  updated_at: string
}

export type InsuranceType = 'private' | 'maxicare' | 'medicard' | 'valucare'

export interface Service {
  id: string
  tenant_id: string
  service_code: string
  name: string
  category: string
  description?: string
  base_price: number
  hmo_price?: number
  promo_price?: number
  promo_active: boolean
  duration_minutes: number
  requires_specialist: boolean
  specialist_type?: string
  commission_category: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  tenant_id: string
  appointment_number: string
  patient_id: string
  dentist_id: string
  room_number: number
  appointment_date: string
  start_time: string
  end_time: string
  duration_minutes: number
  services: AppointmentService[]
  status: AppointmentStatus
  insurance_type?: InsuranceType
  estimated_cost: number
  notes?: string
  created_by?: string
  modified_by?: string
  cancelled_reason?: string
  created_at: string
  updated_at: string

  // Relations
  patient?: Patient
  dentist?: User
  creator?: User
}

export interface AppointmentService {
  service_id: string
  service_name?: string
  quantity: number
  price: number
  subtotal: number
}

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'rescheduled'

export interface Bill {
  id: string
  tenant_id: string
  bill_number: string
  patient_id: string
  appointment_id?: string
  dentist_id?: string
  bill_date: string
  due_date?: string
  items: BillItem[]
  subtotal: number
  discount: number
  insurance_coverage: number
  total_amount: number
  amount_paid: number
  balance: number
  status: 'unpaid' | 'partial' | 'paid' | 'void'
  notes?: string
  created_by?: string
  voided_by?: string
  void_reason?: string
  voided_at?: string
  created_at: string
  updated_at: string

  // Relations
  patient?: Patient
  appointment?: Appointment
  dentist?: User
  payments?: Payment[]
}

export interface BillItem {
  service_id: string
  name: string
  quantity: number
  price: number
  subtotal: number
}

export interface Payment {
  id: string
  tenant_id: string
  receipt_number: string
  bill_id: string
  patient_id: string
  payment_date: string
  amount: number
  payment_method: PaymentMethod
  reference_number?: string
  bank_details?: string
  received_by: string
  notes?: string
  created_at: string

  // Relations
  bill?: Bill
  patient?: Patient
  receiver?: User
}

export type PaymentMethod = 'cash' | 'gcash' | 'maya' | 'bank_transfer'

// Dashboard Types
export interface DashboardStats {
  today: {
    revenue: number
    patients: number
    appointments: number
    expenses: number
  }
  monthly: {
    revenue: number
    expenses: number
    profit: number
    patients: number
  }
}

export interface DentistInventory {
  user_id: string
  period: 'today' | 'week' | 'month'
  appointments: {
    total: number
    completed: number
    cancelled: number
    no_show: number
  }
  revenue: {
    total: number
    by_category: Record<string, number>
  }
  commission: {
    total: number
    breakdown: Record<string, number>
    basic_pay: number
  }
  payment_status: {
    paid: number
    pending: number
  }
}

// Form Types
export interface LoginForm {
  employee_number: string
  passcode: string
  tenant_slug?: string
}

export interface PatientForm {
  first_name: string
  middle_name?: string
  last_name: string
  suffix?: string
  birth_date: string
  gender?: string
  phone: string
  email?: string
  address?: string
  city?: string
  province?: string
  zip_code?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  has_medical_history: boolean
  medical_conditions?: string
  allergies?: string
  current_medications?: string
  insurance_type?: InsuranceType
  insurance_provider?: string
  insurance_card_number?: string
  insurance_expiry?: string
  notes?: string
}

export interface AppointmentForm {
  patient_id: string
  dentist_id: string
  room_number: number
  appointment_date: string
  start_time: string
  duration_minutes: number
  services: string[]
  insurance_type?: InsuranceType
  notes?: string
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Utility Types
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}