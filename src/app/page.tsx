import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-teal-600">Kreativ</span>Dental
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Integrated Dental Practice & Payroll Management
          </p>
          <p className="text-lg text-gray-500">
            Built specifically for Philippine dental clinics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-teal-600">Practice Management</CardTitle>
              <CardDescription>
                Complete patient records, appointments, and billing system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Smart appointment scheduling</li>
                <li>• Patient management with duplicate detection</li>
                <li>• Multi-payment method billing</li>
                <li>• Insurance integration (Maxicare, Medicard)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-600">Integrated Payroll</CardTitle>
              <CardDescription>
                Automated payroll with complex commission structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Time tracking & attendance</li>
                <li>• Commission calculations</li>
                <li>• Dentist performance dashboards</li>
                <li>• Staff payroll automation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-600">Multi-Tenant SaaS</CardTitle>
              <CardDescription>
                Secure, scalable cloud solution for multiple clinics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Role-based access control</li>
                <li>• Mobile-first responsive design</li>
                <li>• Real-time data synchronization</li>
                <li>• Enterprise-grade security</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Link href="/login">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                Login to Your Clinic
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                View Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            30-day free trial • No credit card required
          </p>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            Special POC: Happy Teeth Dental Clinic
          </p>
        </div>
      </div>
    </div>
  )
}