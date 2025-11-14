import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Users,
  DollarSign,
  Phone,
  Plus,
  Search,
  CreditCard,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react'

export default function FrontDeskDashboard() {
  return (
    <div className="space-y-6">
      {/* Front Desk Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Front Desk Dashboard</h1>
        <p className="text-purple-100">Patient management and appointment coordination</p>
      </div>

      {/* Front Desk Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 checked in, 4 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱45,000</div>
            <p className="text-xs text-muted-foreground">15 transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Registered today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5h 30m</div>
            <p className="text-xs text-muted-foreground">Since 9:15 AM</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for patient management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span className="text-sm">New Appointment</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span className="text-sm">Register Patient</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Process Payment</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <Search className="h-6 w-6" />
              <span className="text-sm">Find Patient</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              Today&apos;s Schedule
            </CardTitle>
            <CardDescription>Appointment overview and patient check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  time: '09:00 AM',
                  patient: 'Marjorie Magno',
                  dentist: 'Dr. Jerome Oh',
                  service: '2OP/4LC',
                  status: 'checked_in',
                  phone: '+63 917-555-0001'
                },
                {
                  time: '10:00 AM',
                  patient: 'Bernard Gerona',
                  dentist: 'Dr. Jerome Oh',
                  service: 'EXO',
                  status: 'in_progress',
                  phone: '+63 917-555-0002'
                },
                {
                  time: '02:00 PM',
                  patient: 'Joan Panganiban',
                  dentist: 'Dr. Fevi Pio',
                  service: 'RCT',
                  status: 'confirmed',
                  phone: '+63 917-555-0003'
                },
                {
                  time: '03:30 PM',
                  patient: 'Maria Santos',
                  dentist: 'Dr. Shirley Bayog',
                  service: 'Crown Prep',
                  status: 'pending',
                  phone: '+63 917-555-0004'
                }
              ].map((appointment, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600 w-16">
                    {appointment.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{appointment.patient}</p>
                    <p className="text-xs text-gray-600">{appointment.service} - {appointment.dentist}</p>
                    <p className="text-xs text-gray-500">{appointment.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'checked_in' ? 'bg-green-100 text-green-700' :
                      appointment.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      appointment.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {appointment.status.replace('_', ' ')}
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment & Billing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
              Payment & Billing
            </CardTitle>
            <CardDescription>Today&apos;s transactions and billing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Today&apos;s Collections</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Cash</p>
                    <p className="font-bold text-green-700">₱18,000</p>
                  </div>
                  <div>
                    <p className="text-gray-600">GCash</p>
                    <p className="font-bold text-green-700">₱15,000</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Maya</p>
                    <p className="font-bold text-green-700">₱8,000</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Bank</p>
                    <p className="font-bold text-green-700">₱4,000</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium">Recent Transactions</h5>
                <div className="space-y-2">
                  {[
                    { patient: 'Juan Dela Cruz', amount: '₱3,500', method: 'GCash', time: '10:45 AM' },
                    { patient: 'Maria Santos', amount: '₱8,000', method: 'Cash', time: '11:30 AM' },
                    { patient: 'Pedro Garcia', amount: '₱5,500', method: 'Maya', time: '01:15 PM' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{transaction.patient}</p>
                        <p className="text-gray-600">{transaction.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount}</p>
                        <p className="text-gray-600">{transaction.method}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Daily Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
            Important Reminders
          </CardTitle>
          <CardDescription>Tasks and alerts that need attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-800">Follow-up Calls</p>
                <p className="text-sm text-orange-700">3 patients need appointment confirmations for tomorrow</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">Insurance Verification</p>
                <p className="text-sm text-blue-700">Verify Maxicare coverage for Maria Santos (3:30 PM)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <DollarSign className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Outstanding Balances</p>
                <p className="text-sm text-red-700">₱15,000 in unpaid bills from 3 patients</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}