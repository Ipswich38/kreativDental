import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Activity,
  Eye,
  FileText,
  Award
} from 'lucide-react'

export default function DentistDashboard() {
  return (
    <div className="space-y-6">
      {/* Dentist Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Dr. Jerome Oh - Performance Dashboard</h1>
        <p className="text-teal-100">Your practice insights and earnings overview</p>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">6 completed, 2 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱45,000</div>
            <p className="text-xs text-muted-foreground">Commission: ₱13,500</p>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱540K</div>
            <p className="text-xs text-muted-foreground">120 appointments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Inventory (Performance) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-teal-600" />
              My Inventory (Performance)
            </CardTitle>
            <CardDescription>Your earnings and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-medium text-teal-800 mb-3">November 2024 Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Revenue</p>
                    <p className="text-lg font-bold text-teal-700">₱425,000</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Commission Earned</p>
                    <p className="text-lg font-bold text-teal-700">₱127,500</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Appointments</p>
                    <p className="text-lg font-bold text-teal-700">85 patients</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Status</p>
                    <p className="text-lg font-bold text-green-700">₱100,000 paid</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium">Commission Breakdown</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Surgical Cases (35%)</span>
                    <span className="font-medium">₱98,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RCT & Crowns (30%)</span>
                    <span className="font-medium">₱25,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General Services (10%)</span>
                    <span className="font-medium">₱4,000</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Download Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Today&apos;s Schedule
            </CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  time: '09:00 AM',
                  patient: 'Marjorie Magno',
                  service: '2OP/4LC',
                  room: 'Room 1',
                  status: 'completed',
                  revenue: '₱5,000'
                },
                {
                  time: '10:00 AM',
                  patient: 'Bernard Gerona',
                  service: 'EXO',
                  room: 'Room 1',
                  status: 'completed',
                  revenue: '₱3,000'
                },
                {
                  time: '02:00 PM',
                  patient: 'Joan Panganiban',
                  service: 'RCT',
                  room: 'Room 2',
                  status: 'in_progress',
                  revenue: '₱8,000'
                },
                {
                  time: '03:30 PM',
                  patient: 'Maria Santos',
                  service: 'Crown Prep',
                  room: 'Room 1',
                  status: 'scheduled',
                  revenue: '₱15,000'
                }
              ].map((appointment, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600 w-16">
                    {appointment.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{appointment.patient}</p>
                    <p className="text-xs text-gray-600">{appointment.service} - {appointment.room}</p>
                    <p className="text-xs text-green-600 font-medium">{appointment.revenue}</p>
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

            <div className="mt-4 pt-4 border-t">
              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Dentist */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for your practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <Clock className="h-6 w-6" />
              <span className="text-sm">Log In/Out</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">My Schedule</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">View Payroll</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span className="text-sm">My Patients</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}