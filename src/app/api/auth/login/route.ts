import { NextRequest, NextResponse } from 'next/server'
import { createServerActionClient } from '@/lib/supabase-server'
import bcrypt from 'bcryptjs'

const validCredentials: Record<string, { passcode: string; role: string; name: string }> = {
  'DENT001': { passcode: '987654', role: 'owner', name: 'Dra. Camila Cañares-Price' },
  'STAFF001': { passcode: '246810', role: 'admin', name: 'Mich Blasco' },
  'STAFF002': { passcode: '135792', role: 'front_desk', name: 'Jezel Roche' },
  'STAFF003': { passcode: '468024', role: 'dental_assistant', name: 'Edna Tatimo' },
  'STAFF004': { passcode: '579136', role: 'dental_assistant', name: 'Mhay Blanqueza' },
  'DENT002': { passcode: '876543', role: 'dentist', name: 'Dr. Jerome Oh' },
  'DENT003': { passcode: '765432', role: 'dentist', name: 'Dra. Clency' },
  'DENT004': { passcode: '654321', role: 'dentist', name: 'Dra. Fatima Porciuncula' },
  'DENT005': { passcode: '543210', role: 'dentist', name: 'Dra. Fevi Stella Torralba-Pio' },
  'DENT006': { passcode: '432109', role: 'dentist', name: 'Dr. Jonathan Pineda' },
  'DENT007': { passcode: '321098', role: 'dentist', name: 'Dr. Felipe Supilana' },
  'DENT008': { passcode: '210987', role: 'dentist', name: 'Dra. Shirley Bayog' },
}

export async function POST(request: NextRequest) {
  try {
    const { employee_number, passcode } = await request.json()

    if (!employee_number || !passcode) {
      return NextResponse.json(
        { success: false, error: 'Employee number and passcode are required' },
        { status: 400 }
      )
    }

    // Validate credentials
    const user = validCredentials[employee_number.toUpperCase()]

    if (!user || user.passcode !== passcode) {
      return NextResponse.json(
        { success: false, error: 'Invalid employee number or passcode' },
        { status: 401 }
      )
    }

    // Return success with user info
    return NextResponse.json({
      success: true,
      user: {
        employee_number: employee_number.toUpperCase(),
        name: user.name,
        role: user.role,
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}