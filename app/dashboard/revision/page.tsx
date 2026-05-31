'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Zap, CheckCircle2, AlertCircle, PlayCircle, RotateCcw } from 'lucide-react'

export default function RevisionPage() {
  const revisionTopics = [
    {
      title: 'Modern History: Mughal Period',
      daysUntilDue: 0,
      attempts: 8,
      lastAttempt: '3 days ago',
      accuracy: 82,
      priority: 'urgent',
      status: 'ready'
    },
    {
      title: 'Constitutional Law: Articles 1-50',
      daysUntilDue: 1,
      attempts: 12,
      lastAttempt: '5 days ago',
      accuracy: 88,
      priority: 'high',
      status: 'ready'
    },
    {
      title: 'Political Philosophy Basics',
      daysUntilDue: 2,
      attempts: 6,
      lastAttempt: '1 week ago',
      accuracy: 75,
      priority: 'medium',
      status: 'ready'
    },
    {
      title: 'Ancient History: Mauryan Empire',
      daysUntilDue: 3,
      attempts: 15,
      lastAttempt: '10 days ago',
      accuracy: 79,
      priority: 'medium',
      status: 'ready'
    },
    {
      title: 'Geography: Climate Systems',
      daysUntilDue: 5,
      attempts: 5,
      lastAttempt: '2 weeks ago',
      accuracy: 70,
      priority: 'low',
      status: 'ready'
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'Revise Today'
      case 'high': return 'Revise Soon'
      case 'medium': return 'This Week'
      default: return 'Upcoming'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Intelligent Revision</h1>
        <p className="text-muted-foreground">Spaced repetition schedule optimized for your learning</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Topics Due Today</span>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-semibold text-red-600">1</p>
          <p className="text-xs text-muted-foreground">Urgent attention needed</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">This Week</span>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-semibold text-orange-600">3</p>
          <p className="text-xs text-muted-foreground">Include in daily schedule</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Mastered</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-semibold text-green-600">12</p>
          <p className="text-xs text-muted-foreground">Maintained long-term</p>
        </Card>
      </div>

      {/* Revision Topics */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Revision Queue</h2>

        {revisionTopics.map((topic, index) => (
          <Card key={index} className="p-6 space-y-4 hover:bg-secondary/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-semibold">{topic.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(topic.priority)}`}>
                    {getPriorityBadge(topic.priority)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {topic.attempts} previous attempts
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Last seen {topic.lastAttempt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    {topic.accuracy}% accuracy
                  </div>
                </div>
              </div>

              {topic.daysUntilDue === 0 ? (
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-600">Due Today</p>
                  <p className="text-xs text-muted-foreground">Don't miss this!</p>
                </div>
              ) : (
                <div className="text-right">
                  <p className="text-sm font-semibold">{topic.daysUntilDue} days</p>
                  <p className="text-xs text-muted-foreground">until review due</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 border-t border-border">
              <Button className="flex-1 bg-primary hover:bg-primary/90" size="sm">
                <PlayCircle className="w-4 h-4 mr-2" />
                Start Revision
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Skip
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* How Spaced Repetition Works */}
      <Card className="p-6 space-y-4 bg-secondary/30">
        <h3 className="font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          How Our Spaced Repetition Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold mb-2">1. Optimal Intervals</p>
            <p className="text-muted-foreground">
              Topics are automatically scheduled at scientifically proven intervals for maximum retention.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">2. Adaptive Learning</p>
            <p className="text-muted-foreground">
              Intervals adjust based on your accuracy - master faster, consolidate harder topics.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">3. Forgetting Curve</p>
            <p className="text-muted-foreground">
              Reviews scheduled right before you're about to forget - perfect timing every time.
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Card */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Your Revision Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Consistency</p>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-primary rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">80% of reviews completed</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Retention</p>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-accent rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Long-term memory improving</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
