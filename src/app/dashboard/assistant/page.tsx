import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Package,
  Clock,
  DollarSign,
  Calendar,
  Activity,
  FileText,
  AlertTriangle,
  Plus,
  Eye
} from 'lucide-react'

export default function AssistantDashboard() {
  return (
    <div className="space-y-6">
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Dental Assistant Dashboard</h1>
        <p className="text-emerald-100">Patient care support and inventory management</p>
      </div>

      {/* Assistant Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Assisted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Today&apos;s appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
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
            <CardTitle className="text-sm font-medium">My Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱13,300</div>
            <p className="text-xs text-muted-foreground">This month total</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for dental assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Clock className="h-6 w-6" />
              <span className="text-sm">Log In/Out</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <Package className="h-6 w-6" />
              <span className="text-sm">Check Inventory</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span className="text-sm">Patient Records</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">My Payroll</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
              Today&apos;s Assignments
            </CardTitle>
            <CardDescription>Your scheduled patient assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  time: '09:00 AM',
                  patient: 'Juan Dela Cruz',
                  dentist: 'Dra. Camila Cañares-Price',
                  procedure: 'Cleaning & Polishing',
                  status: 'completed'
                },
                {
                  time: '10:30 AM',
                  patient: 'Maria Teresa',
                  dentist: 'Dr. Jerome Oh',
                  procedure: 'Tooth Extraction',
                  status: 'completed'
                },
                {
                  time: '02:00 PM',
                  patient: 'Carlos Santos',
                  dentist: 'Dra. Fevi Stella Torralba-Pio',
                  procedure: 'Root Canal Treatment',
                  status: 'in_progress'
                },
                {
                  time: '03:30 PM',
                  patient: 'Ana Rodriguez',
                  dentist: 'Dra. Shirley Bayog',
                  procedure: 'Crown Preparation',
                  status: 'scheduled'
                }
              ].map((assignment, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600 w-16">
                    {assignment.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{assignment.patient}</p>
                    <p className="text-xs text-gray-600">{assignment.procedure}</p>
                    <p className="text-xs text-gray-500">with {assignment.dentist}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                    assignment.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {assignment.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-orange-600" />
              Inventory Management
            </CardTitle>
            <CardDescription>Stock levels and supply management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h4 className="font-medium text-red-800">Critical Stock Levels</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cotton Rolls</span>
                    <span className="font-medium text-red-700">1 pack left</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gloves (Small)</span>
                    <span className="font-medium text-red-700">2 boxes left</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="h-5 w-5 text-orange-600" />
                  <h4 className="font-medium text-orange-800">Low Stock Alert</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Head Caps</span>
                    <span className="font-medium text-orange-700">50 pcs (Min: 100)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium">Recent Stock Updates</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Composite Resin (A2)</p>
                      <p className="text-gray-600">Added 5 syringes</p>
                    </div>
                    <span className="text-green-600 font-medium">+5</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Fluoride Gel</p>
                      <p className="text-gray-600">Used 1 bottle</p>
                    </div>
                    <span className="text-red-600 font-medium">-1</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Update Stock
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Performance & Earnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-emerald-600" />
            My Performance & Earnings
          </CardTitle>
          <CardDescription>Your work summary and compensation details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-800 mb-3">November 2024</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Days Worked</span>
                  <span className="font-medium">22 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Regular Hours</span>
                  <span className="font-medium">176 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime</span>
                  <span className="font-medium">5 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3">This Month Earnings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Salary</span>
                  <span className="font-medium">₱11,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime Pay</span>
                  <span className="font-medium">₱375</span>
                </div>
                <div className="flex justify-between">
                  <span>Deductions</span>
                  <span className="font-medium text-red-600">-₱500</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3">Net Pay</h4>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">₱11,800</div>
                <p className="text-sm text-green-600">To be paid: Oct 31</p>
              </div>
              <Button className="w-full mt-3" size="sm" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View Payslip
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}