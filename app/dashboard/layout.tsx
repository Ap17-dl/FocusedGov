'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Brain, LayoutDashboard, BookOpen, BarChart3, Clock, Settings, LogOut, Menu, X, MessageSquare, Zap, CreditCard } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Study Planner', href: '/dashboard/planner' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Clock, label: 'Revision', href: '/dashboard/revision' },
    { icon: Zap, label: 'Resources', href: '/dashboard/resources' },
    { icon: MessageSquare, label: 'AI Mentor', href: '/dashboard/mentor' },
    { icon: CreditCard, label: 'Subscriptions', href: '/dashboard/subscriptions' },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-background transition-transform md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="FocusedGov Logo" width={40} height={40}/>
            <span className="font-semibold truncate">FocusedGov</span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="space-y-3 border-t border-border pt-6">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement logout
                window.location.href = '/'
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden -ml-2 p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <h1 className="text-lg font-semibold flex-1 md:flex-none">Welcome Back</h1>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center hover:bg-primary/30 transition-colors">
                J
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
