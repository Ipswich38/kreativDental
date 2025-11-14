-- Seed data for Happy Teeth Dental Clinic

-- Insert Happy Teeth tenant
INSERT INTO tenants (
    id,
    name,
    slug,
    owner_name,
    email,
    phone,
    address,
    timezone,
    currency,
    status
) VALUES (
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'Happy Teeth Dental Clinic',
    'happy-teeth',
    'Dra. Camila Cañares-Price',
    'info@happyteeth.ph',
    '+63 917-123-4567',
    'Metro Manila, Philippines',
    'Asia/Manila',
    'PHP',
    'active'
);

-- Insert subscription for Happy Teeth
INSERT INTO subscriptions (
    tenant_id,
    plan,
    price,
    user_limit,
    status,
    trial_ends_at,
    current_period_start,
    current_period_end
) VALUES (
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'custom',
    1000.00,
    15,
    'trial',
    NOW() + INTERVAL '30 days',
    NOW(),
    NOW() + INTERVAL '1 month'
);

-- Insert users (staff and dentists)
INSERT INTO users (
    id,
    tenant_id,
    employee_number,
    passcode_hash,
    role,
    first_name,
    middle_name,
    last_name,
    position,
    specialty,
    phone,
    employment_status,
    is_active,
    hire_date
) VALUES
-- Owner
(
    '550e8400-e29b-41d4-a716-446655440000',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT001',
    crypt('123456', gen_salt('bf')),
    'owner',
    'Camila',
    NULL,
    'Cañares-Price',
    'Owner/General Dentist',
    'General Dentist',
    '+63 917-123-4567',
    'active',
    true,
    '2020-01-01'
),
-- Staff
(
    '550e8400-e29b-41d4-a716-446655440001',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'STAFF001',
    crypt('123456', gen_salt('bf')),
    'admin',
    'Mich',
    NULL,
    'Blasco',
    'Admin/Social Media Manager',
    NULL,
    '+63 917-123-4568',
    'active',
    true,
    '2021-01-01'
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'STAFF002',
    crypt('123456', gen_salt('bf')),
    'front_desk',
    'Jezel',
    NULL,
    'Roche',
    'Front-Desk Staff',
    NULL,
    '+63 917-123-4569',
    'active',
    true,
    '2021-06-01'
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'STAFF003',
    crypt('123456', gen_salt('bf')),
    'dental_assistant',
    'Edna',
    NULL,
    'Tatimo',
    'Lead Dental Assistant',
    NULL,
    '+63 917-123-4570',
    'active',
    true,
    '2020-06-01'
),
(
    '550e8400-e29b-41d4-a716-446655440004',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'STAFF004',
    crypt('123456', gen_salt('bf')),
    'dental_assistant',
    'Mhay',
    NULL,
    'Blanqueza',
    'Dental Assistant/Treatment Coordinator',
    NULL,
    '+63 917-123-4571',
    'active',
    true,
    '2021-03-01'
),
-- Dentists
(
    '550e8400-e29b-41d4-a716-446655440005',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT002',
    crypt('123456', gen_salt('bf')),
    'dentist',
    'Jerome',
    NULL,
    'Oh',
    'Dentist',
    'Oral Surgeon/Endodontics',
    '+63 917-123-4572',
    'active',
    true,
    '2020-03-01'
),
(
    '550e8400-e29b-41d4-a716-446655440006',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT003',
    crypt('123456', gen_salt('bf')),
    'dentist',
    'Clency',
    NULL,
    'Smith',
    'Dentist',
    'Pediatric Dentist',
    '+63 917-123-4573',
    'active',
    true,
    '2020-06-01'
),
(
    '550e8400-e29b-41d4-a716-446655440007',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT004',
    crypt('123456', gen_salt('bf')),
    'dentist',
    'Fatima',
    NULL,
    'Porciuncula',
    'Dentist',
    'Orthodontics',
    '+63 917-123-4574',
    'active',
    true,
    '2020-09-01'
),
(
    '550e8400-e29b-41d4-a716-446655440008',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT005',
    crypt('123456', gen_salt('bf')),
    'dentist',
    'Fevi Stella',
    NULL,
    'Torralba-Pio',
    'Dentist',
    'General Dentist',
    '+63 917-123-4575',
    'active',
    true,
    '2021-01-01'
),
(
    '550e8400-e29b-41d4-a716-446655440009',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT006',
    crypt('123456', gen_salt('bf')),
    'dentist',
    'Jonathan',
    NULL,
    'Pineda',
    'Dentist',
    'TMJ Specialist',
    '+63 917-123-4576',
    'active',
    true,
    '2021-03-01'
),
(
    '550e8400-e29b-41d4-a716-446655440010',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT007',
    crypt('123456', gen_salt('bf')),
    'dentist',
    'Felipe',
    NULL,
    'Supilana',
    'Dentist',
    'Dental Implant Specialist',
    '+63 917-123-4577',
    'active',
    true,
    '2021-06-01'
),
(
    '550e8400-e29b-41d4-a716-446655440011',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DENT008',
    crypt('123456', gen_salt('bf')),
    'dentist',
    'Shirley',
    NULL,
    'Bayog',
    'Dentist',
    'Cosmetic Dentistry',
    '+63 917-123-4578',
    'active',
    true,
    '2021-09-01'
);

-- Insert compensation structures
INSERT INTO user_compensation (
    tenant_id,
    user_id,
    salary_type,
    base_salary,
    allowances,
    commission_rules,
    effective_from,
    is_current
) VALUES
-- Staff compensation
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '550e8400-e29b-41d4-a716-446655440001',
    'weekly',
    1500.00,
    '{"transportation": 165}',
    '{"braces": 1000, "fluoride": 300, "xray": 200}',
    '2021-01-01',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '550e8400-e29b-41d4-a716-446655440002',
    'daily',
    500.00,
    '{}',
    '{"xray": 150, "fluoride": 150, "braces_install": 500}',
    '2021-06-01',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '550e8400-e29b-41d4-a716-446655440003',
    'daily',
    500.00,
    '{}',
    '{}',
    '2020-06-01',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '550e8400-e29b-41d4-a716-446655440004',
    'daily',
    600.00,
    '{}',
    '{}',
    '2021-03-01',
    true
),
-- Dentist compensation
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '550e8400-e29b-41d4-a716-446655440005',
    'complex',
    1500.00,
    '{}',
    '{"surgical": {"rate": 0.35, "no_basic_pay": true}, "rct": {"rate": 0.30, "no_basic_pay": false}, "general": {"rate": 0.10, "no_basic_pay": false}, "extraction_simple": {"rate": 0.15, "no_basic_pay": false}}',
    '2020-03-01',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '550e8400-e29b-41d4-a716-446655440006',
    'commission',
    0,
    '{}',
    '{"all_services": {"rate": 0.40}}',
    '2020-06-01',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '550e8400-e29b-41d4-a716-446655440007',
    'commission',
    0,
    '{}',
    '{"orthodontics": {"rate": 0.45}, "general": {"rate": 0.35}}',
    '2020-09-01',
    true
);

-- Insert basic services catalog
INSERT INTO services (
    tenant_id,
    service_code,
    name,
    category,
    description,
    base_price,
    hmo_price,
    duration_minutes,
    commission_category,
    is_active
) VALUES
-- Preventive Services
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'OP',
    'Oral Prophylaxis (Simple)',
    'Preventive',
    'Basic teeth cleaning and plaque removal',
    1500.00,
    1200.00,
    30,
    'general',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'FL',
    'Fluoride Application',
    'Preventive',
    'Fluoride treatment for cavity prevention',
    800.00,
    600.00,
    15,
    'general',
    true
),
-- Restorative Services
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'LC',
    'Light Cure Filling',
    'Restorative',
    'Tooth-colored composite filling',
    1500.00,
    1200.00,
    45,
    'general',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'DESEN',
    'Desensitization',
    'Restorative',
    'Treatment for sensitive teeth',
    500.00,
    400.00,
    20,
    'general',
    true
),
-- Surgical Services
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'EXO',
    'Simple Extraction',
    'Surgery',
    'Simple tooth extraction',
    3000.00,
    2400.00,
    30,
    'surgical',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'SURG_EXO',
    'Surgical Extraction',
    'Surgery',
    'Complex surgical tooth extraction',
    8000.00,
    6400.00,
    60,
    'surgical',
    true
),
-- Endodontics
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'RCT',
    'Root Canal Treatment',
    'Endodontics',
    'Root canal therapy',
    8000.00,
    6400.00,
    90,
    'rct',
    true
),
-- Prosthodontics
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'CROWN',
    'Crown (Metal/Ceramic)',
    'Prosthodontics',
    'Dental crown restoration',
    15000.00,
    12000.00,
    60,
    'prostho',
    true
),
-- Orthodontics
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'BRACES',
    'Braces Installation',
    'Orthodontics',
    'Initial braces installation',
    50000.00,
    40000.00,
    120,
    'orthodontics',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'ADJUST',
    'Braces Adjustment',
    'Orthodontics',
    'Monthly braces adjustment',
    2000.00,
    1600.00,
    30,
    'orthodontics',
    true
),
-- Diagnostic
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'XRAY',
    'Periapical X-ray',
    'Diagnostic',
    'Single tooth X-ray',
    300.00,
    250.00,
    10,
    'diagnostic',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'PANO',
    'Panoramic X-ray',
    'Diagnostic',
    'Full mouth X-ray',
    1500.00,
    1200.00,
    15,
    'diagnostic',
    true
);

-- Insert sample inventory items
INSERT INTO inventory_items (
    tenant_id,
    item_code,
    name,
    category,
    unit_type,
    current_stock,
    minimum_stock,
    reorder_point,
    cost_per_unit,
    supplier_name,
    is_active
) VALUES
-- PPE Items
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'PPE001',
    'Head Caps (Disposable)',
    'ppe',
    'piece',
    50,
    100,
    150,
    2.50,
    'MediSupply Corp',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'PPE002',
    'Foot Covers (Disposable)',
    'ppe',
    'piece',
    250,
    100,
    200,
    2.00,
    'MediSupply Corp',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'PPE003',
    'Gloves (Small)',
    'ppe',
    'box',
    2,
    5,
    10,
    450.00,
    'MediSupply Corp',
    true
),
-- Consumables
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'CON001',
    'Cotton Rolls',
    'consumable',
    'pack',
    1,
    5,
    10,
    150.00,
    'Dental Supplies Inc',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'CON002',
    'Composite Resin (A2)',
    'consumable',
    'syringe',
    8,
    3,
    5,
    1200.00,
    'Dental Materials Co',
    true
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'CON003',
    'Fluoride Gel',
    'consumable',
    'bottle',
    5,
    2,
    4,
    800.00,
    'Dental Supplies Inc',
    true
);

-- Sample patients for testing
INSERT INTO patients (
    id,
    tenant_id,
    patient_number,
    first_name,
    last_name,
    birth_date,
    gender,
    phone,
    email,
    address,
    city,
    province,
    has_medical_history,
    insurance_type,
    status
) VALUES
(
    '650e8400-e29b-41d4-a716-446655440001',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'PT-2024-001',
    'Juan',
    'Dela Cruz',
    '1990-01-15',
    'Male',
    '+63 917-555-0001',
    'juan.delacruz@email.com',
    '123 Rizal St.',
    'Manila',
    'Metro Manila',
    false,
    'maxicare',
    'active'
),
(
    '650e8400-e29b-41d4-a716-446655440002',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'PT-2024-002',
    'Maria',
    'Santos',
    '1985-05-20',
    'Female',
    '+63 917-555-0002',
    'maria.santos@email.com',
    '456 Bonifacio Ave.',
    'Quezon City',
    'Metro Manila',
    true,
    'medicard',
    'active'
),
(
    '650e8400-e29b-41d4-a716-446655440003',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'PT-2024-003',
    'Pedro',
    'Garcia',
    '1992-03-10',
    'Male',
    '+63 917-555-0003',
    'pedro.garcia@email.com',
    '789 Magsaysay Blvd.',
    'Makati',
    'Metro Manila',
    false,
    'private',
    'active'
);