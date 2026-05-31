'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, DollarSign, TrendingUp, AlertCircle, Settings, BarChart3, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const stats = {
    totalUsers: 12543,
    activeUsers: 8234,
    totalRevenue: 1245600,
    monthlyRevenue: 156800,
    avgAccuracy: 76.3,
    totalQuestions: 45230,
  }

  const recentActivity = [
    { type: 'user_signup', message: 'New user registered', time: '2 mins ago', severity: 'info' },
    { type: 'subscription', message: 'Premium subscription purchased', time: '15 mins ago', severity: 'success' },
    { type: 'error', message: 'API response timeout detected', time: '1 hour ago', severity: 'warning' },
    { type: 'payment', message: 'Failed payment transaction', time: '2 hours ago', severity: 'error' },
  ]

  const topExams = [
    { name: 'UPSC Civil Services', users: 5420, growth: '+12%' },
    { name: 'JEE Main & Advanced', users: 3210, growth: '+8%' },
    { name: 'NEET', users: 2890, growth: '+15%' },
    { name: 'CAT', users: 890, growth: '+5%' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Platform overview and management</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Link href="/">
              <Button size="sm">Exit Admin</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <Users className="w-5 h-5 text-primary/50" />
            </div>
            <p className="text-3xl font-bold">{(stats.totalUsers / 1000).toFixed(1)}K</p>
            <p className="text-xs text-green-600">+8.2% this month</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <TrendingUp className="w-5 h-5 text-accent/50" />
            </div>
            <p className="text-3xl font-bold">{(stats.activeUsers / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground">Currently studying</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <DollarSign className="w-5 h-5 text-green-600/50" />
            </div>
            <p className="text-3xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
            <p className="text-xs text-green-600">All-time revenue</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <BarChart3 className="w-5 h-5 text-primary/50" />
            </div>
            <p className="text-3xl font-bold">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</p>
            <p className="text-xs text-green-600">This month</p>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Link href="/admin/activity">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const severityColor = {
                    info: 'bg-blue-50 border-blue-200',
                    success: 'bg-green-50 border-green-200',
                    warning: 'bg-yellow-50 border-yellow-200',
                    error: 'bg-red-50 border-red-200',
                  }[activity.severity]

                  const textColor = {
                    info: 'text-blue-700',
                    success: 'text-green-700',
                    warning: 'text-yellow-700',
                    error: 'text-red-700',
                  }[activity.severity]

                  return (
                    <div key={index} className={`p-4 border rounded-lg ${severityColor}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`font-medium text-sm ${textColor}`}>{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                        <AlertCircle className={`w-4 h-4 ${textColor}`} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6 space-y-6">
              <h2 className="text-lg font-semibold">Platform Performance</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Average User Accuracy</p>
                    <p className="text-sm font-bold text-primary">{stats.avgAccuracy}%</p>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${stats.avgAccuracy}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">API Response Time</p>
                    <p className="text-sm font-bold text-green-600">45ms</p>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-full bg-green-600 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">System Uptime</p>
                    <p className="text-sm font-bold text-green-600">99.98%</p>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '99.98%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Top Exams */}
          <Card className="p-6 space-y-6">
            <h2 className="text-lg font-semibold">Top Exams</h2>

            <div className="space-y-4">
              {topExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{exam.name}</p>
                    <p className="text-xs text-muted-foreground">{(exam.users / 1000).toFixed(1)}K users</p>
                  </div>
                  <span className="text-xs font-semibold text-green-600">{exam.growth}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              View All Exams
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/users">
            <Button variant="outline" className="w-full justify-start h-auto p-4 flex-col items-start">
              <Users className="w-5 h-5 mb-2" />
              <span>User Management</span>
            </Button>
          </Link>
          <Link href="/admin/content">
            <Button variant="outline" className="w-full justify-start h-auto p-4 flex-col items-start">
              <BookOpen className="w-5 h-5 mb-2" />
              <span>Content Management</span>
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="outline" className="w-full justify-start h-auto p-4 flex-col items-start">
              <BarChart3 className="w-5 h-5 mb-2" />
              <span>Analytics</span>
            </Button>
          </Link>
          <Link href="/admin/reports">
            <Button variant="outline" className="w-full justify-start h-auto p-4 flex-col items-start">
              <Eye className="w-5 h-5 mb-2" />
              <span>Reports</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
