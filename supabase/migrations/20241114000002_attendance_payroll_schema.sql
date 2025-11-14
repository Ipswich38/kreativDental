-- ATTENDANCE TABLE
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    work_date DATE NOT NULL,

    -- Time Logs
    time_in TIMESTAMPTZ,
    time_out TIMESTAMPTZ,

    -- Break Times
    break_start TIMESTAMPTZ,
    break_end TIMESTAMPTZ,
    break_duration_minutes INTEGER DEFAULT 0,

    -- Calculations
    scheduled_start TIME,
    scheduled_end TIME,
    regular_hours DECIMAL(5,2) DEFAULT 0,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    late_minutes INTEGER DEFAULT 0,

    status attendance_status DEFAULT 'present',
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_user_date UNIQUE (tenant_id, user_id, work_date)
);

-- OVERTIME LOGS TABLE
CREATE TABLE overtime_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    attendance_id UUID REFERENCES attendance(id),

    overtime_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_hours DECIMAL(5,2) NOT NULL,

    reason TEXT,

    status overtime_status DEFAULT 'pending',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INVENTORY ITEMS TABLE
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    item_code VARCHAR(20) NOT NULL,

    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    unit_type VARCHAR(20) NOT NULL,

    -- Stock
    current_stock DECIMAL(10,2) DEFAULT 0,
    minimum_stock DECIMAL(10,2) NOT NULL,
    reorder_point DECIMAL(10,2) NOT NULL,

    -- Cost
    cost_per_unit DECIMAL(10,2) NOT NULL,

    -- Supplier
    supplier_name VARCHAR(255),
    supplier_contact VARCHAR(100),

    notes TEXT,
    is_active BOOLEAN DEFAULT true,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_item_code_per_tenant UNIQUE (tenant_id, item_code)
);

-- INVENTORY TRANSACTIONS TABLE
CREATE TABLE inventory_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    item_id UUID REFERENCES inventory_items(id) ON DELETE RESTRICT,

    transaction_type inventory_transaction_type NOT NULL,
    transaction_date TIMESTAMPTZ DEFAULT NOW(),

    quantity DECIMAL(10,2) NOT NULL,
    cost_per_unit DECIMAL(10,2),
    total_cost DECIMAL(10,2),

    -- Stock In Details
    supplier VARCHAR(255),
    invoice_number VARCHAR(100),
    expiry_date DATE,

    -- Stock Out Details
    used_by UUID REFERENCES users(id),
    patient_id UUID REFERENCES patients(id),
    appointment_id UUID REFERENCES appointments(id),
    purpose TEXT,

    -- Adjustment
    adjustment_reason TEXT,

    performed_by UUID REFERENCES users(id),
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EXPENSES TABLE
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,

    expense_date DATE NOT NULL,

    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    payment_method payment_method,
    vendor VARCHAR(255),
    reference_number VARCHAR(100),

    receipt_url TEXT,

    -- Auto-tagged
    is_auto_generated BOOLEAN DEFAULT false,
    related_payroll_id UUID,
    related_inventory_id UUID,

    recorded_by UUID REFERENCES users(id),
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYROLL PERIODS TABLE
CREATE TABLE payroll_periods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,

    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    pay_date DATE NOT NULL,

    status payroll_status DEFAULT 'draft',

    total_gross DECIMAL(10,2) DEFAULT 0,
    total_deductions DECIMAL(10,2) DEFAULT 0,
    total_net DECIMAL(10,2) DEFAULT 0,

    calculated_by UUID REFERENCES users(id),
    calculated_at TIMESTAMPTZ,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYROLL DETAILS TABLE
CREATE TABLE payroll_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    payroll_period_id UUID REFERENCES payroll_periods(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE RESTRICT,

    -- Days/Hours Worked
    days_worked INTEGER DEFAULT 0,
    regular_hours DECIMAL(5,2) DEFAULT 0,
    overtime_hours DECIMAL(5,2) DEFAULT 0,

    -- Earnings
    base_salary DECIMAL(10,2) DEFAULT 0,
    allowances DECIMAL(10,2) DEFAULT 0,
    commissions DECIMAL(10,2) DEFAULT 0,
    overtime_pay DECIMAL(10,2) DEFAULT 0,
    gross_pay DECIMAL(10,2) NOT NULL,

    -- Deductions
    deductions JSONB,
    total_deductions DECIMAL(10,2) DEFAULT 0,

    -- Net Pay
    net_pay DECIMAL(10,2) NOT NULL,

    -- Payment
    payment_method payment_method,
    bank_account VARCHAR(100),
    payment_reference VARCHAR(100),
    paid_at TIMESTAMPTZ,

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMMISSION RECORDS TABLE
CREATE TABLE commission_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,

    user_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    bill_id UUID REFERENCES bills(id),
    payment_id UUID REFERENCES payments(id),

    commission_date DATE NOT NULL,

    service_name VARCHAR(255),
    service_category VARCHAR(100),

    revenue_amount DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,

    status commission_status DEFAULT 'pending',
    payroll_period_id UUID REFERENCES payroll_periods(id),

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT LOGS TABLE
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,

    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,

    entity_type VARCHAR(50),
    entity_id UUID,

    old_values JSONB,
    new_values JSONB,

    ip_address INET,
    user_agent TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Additional indexes for new tables
CREATE INDEX idx_attendance_tenant ON attendance(tenant_id);
CREATE INDEX idx_attendance_user ON attendance(user_id);
CREATE INDEX idx_attendance_date ON attendance(tenant_id, work_date);

CREATE INDEX idx_overtime_user ON overtime_logs(user_id);
CREATE INDEX idx_overtime_status ON overtime_logs(tenant_id, status);

CREATE INDEX idx_inventory_tenant ON inventory_items(tenant_id);
CREATE INDEX idx_inventory_category ON inventory_items(tenant_id, category);
CREATE INDEX idx_inventory_low_stock ON inventory_items(tenant_id, current_stock, minimum_stock)
  WHERE current_stock <= minimum_stock;

CREATE INDEX idx_inventory_trans_item ON inventory_transactions(item_id);
CREATE INDEX idx_inventory_trans_date ON inventory_transactions(tenant_id, transaction_date);

CREATE INDEX idx_expenses_tenant ON expenses(tenant_id);
CREATE INDEX idx_expenses_date ON expenses(tenant_id, expense_date);
CREATE INDEX idx_expenses_category ON expenses(tenant_id, category);

CREATE INDEX idx_payroll_periods_tenant ON payroll_periods(tenant_id);
CREATE INDEX idx_payroll_periods_date ON payroll_periods(tenant_id, period_start, period_end);

CREATE INDEX idx_payroll_details_period ON payroll_details(payroll_period_id);
CREATE INDEX idx_payroll_details_user ON payroll_details(user_id);

CREATE INDEX idx_commission_user ON commission_records(user_id);
CREATE INDEX idx_commission_date ON commission_records(tenant_id, commission_date);
CREATE INDEX idx_commission_status ON commission_records(tenant_id, status);

CREATE INDEX idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Add triggers for updated_at on new tables
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON inventory_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payroll_periods_updated_at BEFORE UPDATE ON payroll_periods
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();