import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  Plus,
  CreditCard,
  Activity
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱45,000</div>
            <p className="text-xs text-muted-foreground">
              +15% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              8 completed, 4 remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Served</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 new patients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 / 12</div>
            <p className="text-xs text-muted-foreground">
              Currently logged in
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for faster workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span className="text-sm">New Appointment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Add Patient</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Process Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Clock className="h-6 w-6" />
              <span className="text-sm">View Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: '09:00 AM',
                  patient: 'Juan Dela Cruz',
                  dentist: 'Dra. Camila Cañares-Price',
                  service: 'Cleaning',
                  room: 'Room 1',
                  status: 'completed'
                },
                {
                  time: '10:30 AM',
                  patient: 'Maria Teresa',
                  dentist: 'Dr. Jerome Oh',
                  service: 'Extraction',
                  room: 'Room 1',
                  status: 'completed'
                },
                {
                  time: '02:00 PM',
                  patient: 'Carlos Santos',
                  dentist: 'Dra. Fevi Stella Torralba-Pio',
                  service: 'Root Canal',
                  room: 'Room 2',
                  status: 'in_progress'
                },
                {
                  time: '03:30 PM',
                  patient: 'Ana Rodriguez',
                  dentist: 'Dra. Shirley Bayog',
                  service: 'Crown Prep',
                  room: 'Room 1',
                  status: 'scheduled'
                }
              ].map((appointment, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600 w-16">
                    {appointment.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{appointment.patient}</p>
                    <p className="text-xs text-gray-600">{appointment.service} - {appointment.dentist}</p>
                    <p className="text-xs text-gray-500">{appointment.room}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-700' :
                    appointment.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {appointment.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Important updates and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Low Stock Alert */}
              <div className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-800">Low Stock Alert</p>
                  <p className="text-sm text-orange-700">Head Caps: 50 pcs remaining (Min: 100)</p>
                  <p className="text-xs text-orange-600 mt-1">Reorder recommended</p>
                </div>
              </div>

              {/* Pending Payments */}
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <DollarSign className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Pending Payments</p>
                  <p className="text-sm text-red-700">₱15,000 in unpaid bills (3 patients)</p>
                  <p className="text-xs text-red-600 mt-1">Follow up required</p>
                </div>
              </div>

              {/* Upcoming Birthdays */}
              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Staff Birthday</p>
                  <p className="text-sm text-blue-700">Mhay Blanqueza - Tomorrow (Nov 15)</p>
                  <p className="text-xs text-blue-600 mt-1">Don&apos;t forget to greet!</p>
                </div>
              </div>

              {/* Commission Update */}
              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Commission Ready</p>
                  <p className="text-sm text-green-700">October payroll calculated - ₱856,535</p>
                  <p className="text-xs text-green-600 mt-1">Ready for approval</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>November 2024 Summary</CardTitle>
          <CardDescription>Month-to-date performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-700">₱645,000</div>
              <p className="text-sm text-teal-600">Total Revenue</p>
              <p className="text-xs text-gray-500 mt-1">14 days completed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">168</div>
              <p className="text-sm text-blue-600">Appointments</p>
              <p className="text-xs text-gray-500 mt-1">95% completion rate</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">₱124,000</div>
              <p className="text-sm text-purple-600">Net Profit</p>
              <p className="text-xs text-gray-500 mt-1">19.2% margin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}