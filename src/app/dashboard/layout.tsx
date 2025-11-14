import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          <Header />
          <main className="p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center py-2">
            <span className="text-xs">Dashboard</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <span className="text-xs">Appointments</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <span className="text-xs">Patients</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>
    </div>
  )
}