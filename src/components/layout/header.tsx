'use client'

import { useState } from 'react'
import { Bell, Search, Menu, Calendar, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search patients, appointments..."
                className="w-64 pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Quick Stats - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 px-6 py-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">12 Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">8 Patients</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">3h 45m</span>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-medium text-sm">JR</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Jezel Roche</p>
              <p className="text-xs text-gray-500">Front Desk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Time & Status */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>Friday, November 14, 2024</span>
          <span>•</span>
          <span>2:45 PM</span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Logged in: 5h 30m</span>
        </div>
      </div>
    </header>
  )
}