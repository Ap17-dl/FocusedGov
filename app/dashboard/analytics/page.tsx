'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, BarChart3, Target, Brain, Calendar, Filter } from 'lucide-react'

export default function AnalyticsPage() {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, attempts: 8 },
    { day: 'Tue', hours: 3.2, attempts: 10 },
    { day: 'Wed', hours: 2.8, attempts: 9 },
    { day: 'Thu', hours: 4.1, attempts: 12 },
    { day: 'Fri', hours: 2.0, attempts: 6 },
    { day: 'Sat', hours: 3.5, attempts: 11 },
    { day: 'Sun', hours: 1.2, attempts: 3 },
  ]

  const subjectPerformance = [
    { name: 'Modern History', accuracy: 82, attempts: 45 },
    { name: 'Political Philosophy', accuracy: 75, attempts: 32 },
    { name: 'Constitutional Law', accuracy: 88, attempts: 38 },
    { name: 'Geography', accuracy: 70, attempts: 28 },
    { name: 'Economics', accuracy: 65, attempts: 22 },
  ]

  const maxHours = Math.max(...weeklyData.map(d => d.hours))
  const maxAttempts = Math.max(...weeklyData.map(d => d.attempts))

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Analytics & Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Study Hours</p>
              <p className="text-3xl font-semibold">187.5</p>
              <p className="text-xs text-green-600 mt-1">+12% from last week</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Questions Attempted</p>
              <p className="text-3xl font-semibold">347</p>
              <p className="text-xs text-green-600 mt-1">+8% from last week</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Average Accuracy</p>
              <p className="text-3xl font-semibold">76.3%</p>
              <p className="text-xs text-green-600 mt-1">+3.2% from last week</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Strongest Subject</p>
              <p className="text-xl font-semibold">Constitutional</p>
              <p className="text-xs text-muted-foreground mt-1">88% accuracy</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Study Hours Chart */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Weekly Study Activity</h2>
            <p className="text-sm text-muted-foreground">Hours studied and questions attempted</p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            This Week
          </Button>
        </div>

        {/* Chart */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-4">Study Hours</p>
            <div className="flex items-end gap-3 h-64 pb-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-border rounded-t flex items-end justify-center overflow-hidden relative h-48 group">
                    <div
                      className="w-full bg-primary rounded-t transition-all hover:bg-primary/80 cursor-pointer"
                      style={{ height: `${(day.hours / maxHours) * 100}%` }}
                    >
                      <span className="text-xs font-semibold text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center h-full">
                        {day.hours}h
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-medium">{day.day}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium mb-4">Questions Attempted</p>
            <div className="flex items-end gap-3 h-48 pb-4">
              {weeklyData.map((day) => (
                <div key={`attempts-${day.day}`} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-border rounded-t flex items-end justify-center overflow-hidden relative h-32 group">
                    <div
                      className="w-full bg-accent rounded-t transition-all hover:bg-accent/80 cursor-pointer"
                      style={{ height: `${(day.attempts / maxAttempts) * 100}%` }}
                    >
                      <span className="text-xs font-semibold text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center h-full">
                        {day.attempts}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-medium">{day.day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Subject-wise Performance */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Subject-wise Performance</h2>
          <p className="text-sm text-muted-foreground">Your accuracy by subject area</p>
        </div>

        <div className="space-y-4">
          {subjectPerformance.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">{subject.attempts} attempts</p>
                </div>
                <p className="text-sm font-semibold text-primary">{subject.accuracy}%</p>
              </div>
              <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{ width: `${subject.accuracy}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Key Insights</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Your consistency has improved 15% in the past month</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Constitutional Law is your strongest area (88% accuracy)</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Focus on Economics - needs 10 more attempts for mastery</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Your peak productivity hours are 6-9 AM</p>
            </li>
          </ul>
        </Card>

        <Card className="p-6 space-y-4 border-accent/30 bg-accent/5">
          <h3 className="font-semibold">Recommendations</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Increase revision frequency for Economics to 3x per week</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Schedule mock tests every Sunday for maximum impact</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Take advantage of your morning peak - add 30 min more study</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Review fundamentals in Geography before attempting harder questions</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
