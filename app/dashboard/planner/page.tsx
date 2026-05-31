'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, AlertCircle, CheckCircle2, Clock, Play, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function PlannerPage() {
  const [expandedDay, setExpandedDay] = useState(0)

  const weekPlan = [
    {
      day: 'Monday',
      date: 'Jun 3',
      topics: [
        { title: 'Modern History: Mughal Period', duration: '45 min', completed: true },
        { title: 'Political Philosophy - Part 1', duration: '60 min', completed: true },
        { title: 'Constitution: Article 1-15', duration: '50 min', completed: false, inProgress: true },
      ]
    },
    {
      day: 'Tuesday',
      date: 'Jun 4',
      topics: [
        { title: 'Constitution: Article 16-30', duration: '45 min', completed: false },
        { title: 'PYQ Solving: 2022 Paper', duration: '90 min', completed: false },
        { title: 'Revision: Ancient History', duration: '40 min', completed: false },
      ]
    },
    {
      day: 'Wednesday',
      date: 'Jun 5',
      topics: [
        { title: 'Geography: Climate Systems', duration: '50 min', completed: false },
        { title: 'Case Studies Analysis', duration: '75 min', completed: false },
      ]
    },
    {
      day: 'Thursday',
      date: 'Jun 6',
      topics: [
        { title: 'Current Affairs: Monthly Review', duration: '60 min', completed: false },
        { title: 'Mock Test: Full Length', duration: '180 min', completed: false },
      ]
    },
    {
      day: 'Friday',
      date: 'Jun 7',
      topics: [
        { title: 'Revision: Week Summary', duration: '90 min', completed: false },
        { title: 'Essay Writing Practice', duration: '60 min', completed: false },
      ]
    },
    {
      day: 'Saturday',
      date: 'Jun 8',
      topics: [
        { title: 'Analytics Review', duration: '30 min', completed: false },
        { title: 'Self-Paced Learning', duration: '120 min', completed: false },
      ]
    },
    {
      day: 'Sunday',
      date: 'Jun 9',
      topics: [
        { title: 'Rest & Reflection', duration: 'Free', completed: false },
      ]
    },
  ]

  const todayStats = {
    planned: 155,
    completed: 95,
    inProgress: 50,
  }

  const calculatePercentage = (total: number, completed: number) => {
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Study Planner</h1>
        <p className="text-muted-foreground">Your personalized learning schedule for the week</p>
      </div>

      {/* Today's Overview */}
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Today's Focus</h2>
          <p className="text-sm text-muted-foreground">Monday, June 3rd</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Total Planned</p>
            <p className="text-2xl font-semibold">{todayStats.planned}</p>
            <p className="text-xs text-muted-foreground mt-1">minutes</p>
          </div>
          <div className="p-4 border border-border rounded-lg bg-green-50/50">
            <p className="text-sm text-muted-foreground mb-2">Completed</p>
            <p className="text-2xl font-semibold text-green-700">{todayStats.completed}</p>
            <p className="text-xs text-muted-foreground mt-1">{calculatePercentage(todayStats.planned, todayStats.completed)}% done</p>
          </div>
          <div className="p-4 border border-border rounded-lg bg-blue-50/50">
            <p className="text-sm text-muted-foreground mb-2">In Progress</p>
            <p className="text-2xl font-semibold text-blue-700">{todayStats.inProgress}</p>
            <p className="text-xs text-muted-foreground mt-1">minutes remaining</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Daily Progress</p>
            <p className="text-sm text-muted-foreground">{calculatePercentage(todayStats.planned, todayStats.completed)}%</p>
          </div>
          <div className="w-full h-3 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${calculatePercentage(todayStats.planned, todayStats.completed)}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Weekly Schedule</h2>

        <div className="space-y-3">
          {weekPlan.map((dayPlan, index) => (
            <Card key={index} className="overflow-hidden">
              <div
                className="p-6 cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => setExpandedDay(expandedDay === index ? -1 : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div>
                      <p className="font-semibold">{dayPlan.day}</p>
                      <p className="text-sm text-muted-foreground">{dayPlan.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{dayPlan.topics.length} topics</p>
                    <p className="text-xs text-muted-foreground">
                      {dayPlan.topics.filter(t => t.completed).length} completed
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedDay === index ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {/* Progress bar for day */}
                <div className="mt-4 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: `${calculatePercentage(dayPlan.topics.length, dayPlan.topics.filter(t => t.completed).length)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Expanded Topics */}
              {expandedDay === index && (
                <div className="border-t border-border p-6 space-y-3 bg-secondary/20">
                  {dayPlan.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {topic.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : topic.inProgress ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-r-transparent animate-spin"></div>
                        ) : (
                          <BookOpen className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium ${topic.completed ? 'text-muted-foreground line-through' : ''}`}>
                            {topic.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {topic.duration}
                        </div>
                        {!topic.completed && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        )}
                        {topic.completed && (
                          <span className="text-sm text-green-600 font-medium">Done</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Customization Card */}
      <Card className="p-6 space-y-4 border-accent/30 bg-accent/5">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Customize Your Plan</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Want to adjust your study schedule? Our AI can create a new personalized plan based on your preferences.
            </p>
          </div>
          <Button size="sm" variant="outline">
            Regenerate Plan
          </Button>
        </div>
      </Card>
    </div>
  )
}
