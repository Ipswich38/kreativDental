-- Enable Row Level Security on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_compensation ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE overtime_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's tenant_id
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT (current_setting('app.current_tenant_id', true))::UUID
$$;

-- Helper function to get current user's ID
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT (current_setting('app.current_user_id', true))::UUID
$$;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT (current_setting('app.current_user_role', true))::user_role
$$;

-- RLS Policies for TENANTS
CREATE POLICY "Users can only access their own tenant" ON tenants
  FOR ALL USING (id = get_current_tenant_id());

-- RLS Policies for SUBSCRIPTIONS
CREATE POLICY "Users can only access their tenant's subscription" ON subscriptions
  FOR ALL USING (tenant_id = get_current_tenant_id());

-- RLS Policies for USERS
CREATE POLICY "Users can access users in their tenant" ON users
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Owners and admins can manage users" ON users
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (
    tenant_id = get_current_tenant_id() AND
    id = get_current_user_id()
  );

-- RLS Policies for USER_COMPENSATION
CREATE POLICY "Compensation access by role" ON user_compensation
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    (get_current_user_role() IN ('owner', 'admin') OR user_id = get_current_user_id())
  );

CREATE POLICY "Only owners and admins can manage compensation" ON user_compensation
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

-- RLS Policies for PATIENTS
CREATE POLICY "Users can access patients in their tenant" ON patients
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Staff can manage patients" ON patients
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin', 'front_desk', 'dental_assistant')
  );

CREATE POLICY "Dentists can view patients" ON patients
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() = 'dentist'
  );

-- RLS Policies for SERVICES
CREATE POLICY "Users can view services in their tenant" ON services
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Owners and admins can manage services" ON services
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

-- RLS Policies for APPOINTMENTS
CREATE POLICY "Users can view appointments in their tenant" ON appointments
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Staff can manage appointments" ON appointments
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin', 'front_desk', 'dental_assistant')
  );

CREATE POLICY "Dentists can view their own appointments" ON appointments
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() = 'dentist' AND
    dentist_id = get_current_user_id()
  );

CREATE POLICY "Dentists can update their own appointments" ON appointments
  FOR UPDATE USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() = 'dentist' AND
    dentist_id = get_current_user_id()
  );

-- RLS Policies for APPOINTMENT_HISTORY
CREATE POLICY "Users can view appointment history in their tenant" ON appointment_history
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Staff can manage appointment history" ON appointment_history
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin', 'front_desk', 'dental_assistant')
  );

-- RLS Policies for BILLS
CREATE POLICY "Users can view bills in their tenant" ON bills
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Staff can manage bills" ON bills
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin', 'front_desk')
  );

CREATE POLICY "Dentists can view bills for their patients" ON bills
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() = 'dentist' AND
    dentist_id = get_current_user_id()
  );

-- RLS Policies for PAYMENTS
CREATE POLICY "Users can view payments in their tenant" ON payments
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Staff can manage payments" ON payments
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin', 'front_desk')
  );

-- RLS Policies for ATTENDANCE
CREATE POLICY "Users can view attendance in their tenant" ON attendance
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Owners and admins can manage attendance" ON attendance
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

CREATE POLICY "Users can manage their own attendance" ON attendance
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    user_id = get_current_user_id()
  );

-- RLS Policies for OVERTIME_LOGS
CREATE POLICY "Users can view overtime logs in their tenant" ON overtime_logs
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Owners and admins can manage overtime logs" ON overtime_logs
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

CREATE POLICY "Users can manage their own overtime logs" ON overtime_logs
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    user_id = get_current_user_id()
  );

-- RLS Policies for INVENTORY_ITEMS
CREATE POLICY "Users can view inventory in their tenant" ON inventory_items
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Staff can manage inventory" ON inventory_items
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin', 'dental_assistant')
  );

-- RLS Policies for INVENTORY_TRANSACTIONS
CREATE POLICY "Users can view inventory transactions in their tenant" ON inventory_transactions
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Staff can manage inventory transactions" ON inventory_transactions
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin', 'dental_assistant')
  );

-- RLS Policies for EXPENSES
CREATE POLICY "Users can view expenses in their tenant" ON expenses
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Owners and admins can manage expenses" ON expenses
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

-- RLS Policies for PAYROLL_PERIODS
CREATE POLICY "Users can view payroll periods in their tenant" ON payroll_periods
  FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Owners and admins can manage payroll periods" ON payroll_periods
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

-- RLS Policies for PAYROLL_DETAILS
CREATE POLICY "Users can view payroll details in their tenant" ON payroll_details
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    (get_current_user_role() IN ('owner', 'admin') OR user_id = get_current_user_id())
  );

CREATE POLICY "Owners and admins can manage payroll details" ON payroll_details
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

-- RLS Policies for COMMISSION_RECORDS
CREATE POLICY "Users can view commission records in their tenant" ON commission_records
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    (get_current_user_role() IN ('owner', 'admin') OR user_id = get_current_user_id())
  );

CREATE POLICY "Owners and admins can manage commission records" ON commission_records
  FOR ALL USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() IN ('owner', 'admin')
  );

-- RLS Policies for AUDIT_LOGS
CREATE POLICY "Owners can view all audit logs" ON audit_logs
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() = 'owner'
  );

CREATE POLICY "Admins can view audit logs" ON audit_logs
  FOR SELECT USING (
    tenant_id = get_current_tenant_id() AND
    get_current_user_role() = 'admin'
  );

CREATE POLICY "System can create audit logs" ON audit_logs
  FOR INSERT WITH CHECK (tenant_id = get_current_tenant_id());