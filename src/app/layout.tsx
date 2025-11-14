import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KreativDental - Dental Practice & Payroll Management',
  description: 'Integrated dental practice management system with built-in payroll processing for Philippine dental clinics.',
  keywords: 'dental, clinic, practice management, payroll, Philippines, dentist',
  authors: [{ name: 'Kreativloops' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}