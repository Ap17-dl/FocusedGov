'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Target, Zap, TrendingUp, Calendar, AlertCircle, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    studyStreak: 0,
    hoursToday: 0,
    completionRate: 0,
    nextExam: 'Jun 15, 2026',
  })
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    const fetchStats = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push('/login')
          return
        }

        console.log('[v0] Fetching dashboard stats')
        const response = await fetch('/api/user/stats', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('[v0] Error fetching stats:', error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user) {
      fetchStats()
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading || dataLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Mock data - replace with real data from backend
  const upcomingTopics = [
    { title: 'Modern Indian History - Part 1', progress: 40, status: 'in-progress' },
    { title: 'Constitutional Law Basics', progress: 0, status: 'upcoming' },
    { title: 'Geography - Physical Features', progress: 85, status: 'in-progress' },
  ]

  const recentPYQs = [
    { title: 'UPSC 2023 - Ques 15 (History)', score: 8, date: '2 days ago' },
    { title: 'UPSC 2022 - Ques 8 (Geography)', score: 6, date: '5 days ago' },
    { title: 'UPSC 2023 - Ques 22 (Polity)', score: 9, date: '1 week ago' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold">Welcome back, {user.user_metadata?.full_name || 'Student'}!</h1>
          <p className="text-muted-foreground text-sm sm:text-base">You&apos;re on track with your exam preparation. Keep up the momentum!</p>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Study Streak</p>
              <p className="text-3xl font-semibold">{stats.studyStreak}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Today&apos;s Study</p>
              <p className="text-3xl font-semibold">{stats.hoursToday}h</p>
              <p className="text-xs text-muted-foreground">hours</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Course Progress</p>
              <p className="text-3xl font-semibold">{stats.completionRate}%</p>
              <div className="w-20 h-2 bg-border rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Next Exam</p>
              <p className="text-lg font-semibold">{stats.nextExam}</p>
              <p className="text-xs text-muted-foreground">238 days left</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Upcoming Topics */}
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Your Study Plan</h2>
                <p className="text-sm text-muted-foreground">Topics to focus on this week</p>
              </div>
              <Link href="/dashboard/planner">
                <Button variant="outline" size="sm">View Full Plan</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingTopics.map((topic, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{topic.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {topic.status === 'in-progress' ? 'In Progress' : 'Coming Next'}
                      </p>
                    </div>
                    {topic.status === 'upcoming' && (
                      <div className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
                        Queued
                      </div>
                    )}
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${topic.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{topic.progress}% Complete</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/dashboard/planner">
                <Button className="w-full bg-primary hover:bg-primary/90 justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Today&apos;s Lesson
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Ask AI Mentor
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-accent/30 bg-accent/5">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm">Revision Alert</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  3 topics are due for revision today. Keep your memory sharp!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent PYQ Attempts */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent PYQ Attempts</h2>
            <p className="text-sm text-muted-foreground">Your latest answer evaluations</p>
          </div>
          <Link href="/dashboard/planner">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        <div className="space-y-3">
          {recentPYQs.map((pyq, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
              <div className="flex-1">
                <h3 className="text-sm font-medium">{pyq.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{pyq.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold">{pyq.score}/10</p>
                  <p className="text-xs text-muted-foreground">{(pyq.score * 10).toFixed(0)}%</p>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      </div>
    </div>
  )
}
