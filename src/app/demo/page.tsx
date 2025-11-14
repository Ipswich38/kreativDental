import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  Shield,
  Smartphone,
  Zap,
  BarChart3
} from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            🚀 Production Ready Demo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-teal-600">Kreativ</span>Dental Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience the complete dental practice management solution
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Try Live Demo
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Calendar className="h-8 w-8 text-teal-600 mb-2" />
              <CardTitle>Smart Scheduling</CardTitle>
              <CardDescription>
                Intelligent appointment booking with conflict detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Conflict detection</li>
                <li>• Multi-room support</li>
                <li>• Insurance integration</li>
                <li>• SMS reminders</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>
                Complete patient records with duplicate detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Duplicate detection</li>
                <li>• Medical history</li>
                <li>• Insurance tracking</li>
                <li>• Treatment history</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <DollarSign className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Billing & Payments</CardTitle>
              <CardDescription>
                Multi-payment method processing with commission tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• GCash, Maya, Bank transfers</li>
                <li>• HMO integration</li>
                <li>• Commission calculations</li>
                <li>• Receipt generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Clock className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Attendance & Payroll</CardTitle>
              <CardDescription>
                Automated payroll with complex commission structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Time tracking</li>
                <li>• Overtime calculations</li>
                <li>• Complex commissions</li>
                <li>• Automated payslips</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Real-time insights and comprehensive reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Revenue analytics</li>
                <li>• Dentist performance</li>
                <li>• P&L statements</li>
                <li>• Export capabilities</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle>Security & Compliance</CardTitle>
              <CardDescription>
                Enterprise-grade security with role-based access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Role-based access</li>
                <li>• Data encryption</li>
                <li>• Audit trails</li>
                <li>• HIPAA-aware design</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technical Stack */}
        <Card className="border-0 shadow-lg mb-16">
          <CardHeader className="text-center">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <CardTitle>Built with Modern Technology</CardTitle>
            <CardDescription>
              Production-ready stack for scalability and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Next.js 14</p>
                <p className="text-xs text-gray-600">App Router</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">TypeScript</p>
                <p className="text-xs text-gray-600">Type Safety</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Supabase</p>
                <p className="text-xs text-gray-600">PostgreSQL</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Tailwind CSS</p>
                <p className="text-xs text-gray-600">Responsive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Demo Credentials</CardTitle>
            <CardDescription>
              Try different user roles with these test accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Admin/Management</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm">Owner - Dra. Camila</p>
                    <p className="text-sm text-gray-600">Employee: DENT001</p>
                    <p className="text-sm text-gray-600">Passcode: 123456</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm">Admin - Mich Blasco</p>
                    <p className="text-sm text-gray-600">Employee: STAFF001</p>
                    <p className="text-sm text-gray-600">Passcode: 123456</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Staff/Dentists</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm">Dr. Jerome Oh</p>
                    <p className="text-sm text-gray-600">Employee: DENT002</p>
                    <p className="text-sm text-gray-600">Passcode: 123456</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm">Front Desk - Jezel</p>
                    <p className="text-sm text-gray-600">Employee: STAFF002</p>
                    <p className="text-sm text-gray-600">Passcode: 123456</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-teal-600" />
                <p className="text-sm font-medium text-teal-800">Mobile Optimized</p>
              </div>
              <p className="text-sm text-teal-700 mt-1">
                Try the demo on your mobile device for the full experience. The interface adapts perfectly to all screen sizes.
              </p>
            </div>

            <div className="text-center mt-6">
              <Link href="/login">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Start Demo Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}