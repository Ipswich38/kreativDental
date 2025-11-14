-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'dentist', 'front_desk', 'dental_assistant');
CREATE TYPE employment_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE tenant_status AS ENUM ('active', 'suspended', 'cancelled');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'past_due', 'cancelled');
CREATE TYPE patient_status AS ENUM ('active', 'inactive', 'archived');
CREATE TYPE insurance_type AS ENUM ('private', 'maxicare', 'medicard', 'valucare');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', 'rescheduled');
CREATE TYPE bill_status AS ENUM ('unpaid', 'partial', 'paid', 'void');
CREATE TYPE payment_method AS ENUM ('cash', 'gcash', 'maya', 'bank_transfer');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'half_day', 'leave');
CREATE TYPE inventory_transaction_type AS ENUM ('stock_in', 'stock_out', 'adjustment');
CREATE TYPE overtime_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payroll_status AS ENUM ('draft', 'calculated', 'approved', 'paid');
CREATE TYPE commission_status AS ENUM ('pending', 'included_in_payroll', 'paid');

-- TENANTS TABLE
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    owner_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    address TEXT,
    logo_url TEXT,
    timezone VARCHAR(50) DEFAULT 'Asia/Manila',
    currency VARCHAR(3) DEFAULT 'PHP',
    status tenant_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUBSCRIPTIONS TABLE
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    plan VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    user_limit INTEGER NOT NULL,
    status subscription_status DEFAULT 'trial',
    trial_ends_at TIMESTAMPTZ,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    employee_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    passcode_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,

    -- Personal Info
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    suffix VARCHAR(10),
    position VARCHAR(100),
    specialty VARCHAR(100),
    phone VARCHAR(50),
    address TEXT,
    birth_date DATE,

    -- Employment
    hire_date DATE,
    employment_status employment_status DEFAULT 'active',

    -- Passcode Management
    passcode_changed_at TIMESTAMPTZ,
    passcode_expires_at TIMESTAMPTZ,
    must_change_passcode BOOLEAN DEFAULT true,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,

    -- Settings
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_employee_number_per_tenant UNIQUE (tenant_id, employee_number)
);

-- USER COMPENSATION TABLE
CREATE TABLE user_compensation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- For Staff
    salary_type VARCHAR(20),
    base_salary DECIMAL(10,2),
    allowances JSONB,

    -- For Dentists
    basic_pay_structure JSONB,
    commission_rules JSONB,

    effective_from DATE NOT NULL,
    effective_to DATE,
    is_current BOOLEAN DEFAULT true,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PATIENTS TABLE
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    patient_number VARCHAR(20) NOT NULL,

    -- Personal Info
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    suffix VARCHAR(10),
    birth_date DATE NOT NULL,
    gender VARCHAR(20),

    -- Contact
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    zip_code VARCHAR(10),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),

    -- Medical History
    has_medical_history BOOLEAN DEFAULT false,
    medical_conditions TEXT,
    allergies TEXT,
    current_medications TEXT,

    -- Insurance
    insurance_type insurance_type,
    insurance_provider VARCHAR(100),
    insurance_card_number VARCHAR(100),
    insurance_expiry DATE,

    -- Status
    status patient_status DEFAULT 'active',
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_patient_number_per_tenant UNIQUE (tenant_id, patient_number)
);

-- SERVICES TABLE
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    service_code VARCHAR(20) NOT NULL,

    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,

    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    hmo_price DECIMAL(10,2),
    promo_price DECIMAL(10,2),
    promo_active BOOLEAN DEFAULT false,

    -- Service Details
    duration_minutes INTEGER DEFAULT 30,
    requires_specialist BOOLEAN DEFAULT false,
    specialist_type VARCHAR(100),

    -- Commission Category (for calculations)
    commission_category VARCHAR(50),

    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_service_code_per_tenant UNIQUE (tenant_id, service_code)
);

-- APPOINTMENTS TABLE
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    appointment_number VARCHAR(20) NOT NULL,

    patient_id UUID REFERENCES patients(id) ON DELETE RESTRICT,
    dentist_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    room_number INTEGER NOT NULL,

    -- Scheduling
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL,

    -- Services
    services JSONB NOT NULL,

    -- Status
    status appointment_status DEFAULT 'scheduled',

    -- Payment Info
    insurance_type insurance_type,
    estimated_cost DECIMAL(10,2),

    notes TEXT,

    -- Audit Trail
    created_by UUID REFERENCES users(id),
    modified_by UUID REFERENCES users(id),
    cancelled_reason TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_appointment_number_per_tenant UNIQUE (tenant_id, appointment_number),
    CONSTRAINT check_end_after_start CHECK (end_time > start_time)
);

-- APPOINTMENT HISTORY TABLE
CREATE TABLE appointment_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,

    action VARCHAR(50) NOT NULL,
    changed_by UUID REFERENCES users(id),
    reason TEXT,

    old_data JSONB,
    new_data JSONB,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BILLS TABLE
CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    bill_number VARCHAR(20) NOT NULL,

    patient_id UUID REFERENCES patients(id) ON DELETE RESTRICT,
    appointment_id UUID REFERENCES appointments(id),
    dentist_id UUID REFERENCES users(id),

    -- Bill Details
    bill_date DATE NOT NULL,
    due_date DATE,

    items JSONB NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    insurance_coverage DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,

    -- Payment Status
    amount_paid DECIMAL(10,2) DEFAULT 0,
    balance DECIMAL(10,2) NOT NULL,
    status bill_status DEFAULT 'unpaid',

    notes TEXT,

    -- Audit
    created_by UUID REFERENCES users(id),
    voided_by UUID REFERENCES users(id),
    void_reason TEXT,
    voided_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_bill_number_per_tenant UNIQUE (tenant_id, bill_number)
);

-- PAYMENTS TABLE
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    receipt_number VARCHAR(20) NOT NULL,

    bill_id UUID REFERENCES bills(id) ON DELETE RESTRICT,
    patient_id UUID REFERENCES patients(id),

    payment_date TIMESTAMPTZ DEFAULT NOW(),
    amount DECIMAL(10,2) NOT NULL,

    payment_method payment_method NOT NULL,
    reference_number VARCHAR(100),
    bank_details TEXT,

    received_by UUID REFERENCES users(id),
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_receipt_number_per_tenant UNIQUE (tenant_id, receipt_number)
);

-- Create indexes for better performance
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_role ON users(tenant_id, role);
CREATE INDEX idx_users_employee_number ON users(employee_number);
CREATE INDEX idx_users_active ON users(tenant_id, is_active);

CREATE INDEX idx_patients_tenant ON patients(tenant_id);
CREATE INDEX idx_patients_phone ON patients(tenant_id, phone);
CREATE INDEX idx_patients_name ON patients(tenant_id, last_name, first_name);
CREATE INDEX idx_patients_status ON patients(tenant_id, status);

CREATE INDEX idx_services_tenant ON services(tenant_id);
CREATE INDEX idx_services_category ON services(tenant_id, category);
CREATE INDEX idx_services_active ON services(tenant_id, is_active);

CREATE INDEX idx_appointments_tenant ON appointments(tenant_id);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_dentist ON appointments(dentist_id);
CREATE INDEX idx_appointments_date ON appointments(tenant_id, appointment_date);
CREATE INDEX idx_appointments_status ON appointments(tenant_id, status);

CREATE INDEX idx_bills_tenant ON bills(tenant_id);
CREATE INDEX idx_bills_patient ON bills(patient_id);
CREATE INDEX idx_bills_status ON bills(tenant_id, status);
CREATE INDEX idx_bills_date ON bills(tenant_id, bill_date);

CREATE INDEX idx_payments_tenant ON payments(tenant_id);
CREATE INDEX idx_payments_bill ON payments(bill_id);
CREATE INDEX idx_payments_date ON payments(tenant_id, payment_date);
CREATE INDEX idx_payments_method ON payments(tenant_id, payment_method);

CREATE INDEX idx_appointment_history_appointment ON appointment_history(appointment_id);

CREATE INDEX idx_user_compensation_user ON user_compensation(user_id);
CREATE INDEX idx_user_compensation_current ON user_compensation(user_id, is_current);

-- Full text search indexes
CREATE INDEX idx_patients_search ON patients USING gin(
    to_tsvector('english', first_name || ' ' || last_name || ' ' || COALESCE(phone, ''))
);

-- Function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON bills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();