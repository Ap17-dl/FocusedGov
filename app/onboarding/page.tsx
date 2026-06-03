'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, BookOpen, BarChart3, Clock, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    {
      title: 'Welcome to FocusedGov!',
      description: 'We&apos;re excited to help you ace your exams. Let&apos;s get you started.',
      icon: Brain,
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            InnovativeFlow uses AI to create personalized learning experiences tailored to your specific exam and goals.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
                  <p className="text-muted-foreground">
                    FocusedGov uses AI to create personalized learning experiences tailored to your specific exam and goals.
                  </p>
                <p className="text-sm text-muted-foreground">Personalized learning paths based on your strengths</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">AI Answer Evaluation</h4>
                <p className="text-sm text-muted-foreground">Get detailed feedback on your answers</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Intelligent Revision</h4>
                <p className="text-sm text-muted-foreground">Spaced repetition for maximum retention</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "How You'll Study",
      description: "A calm, distraction-free learning experience designed for serious students.",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              { num: '1', text: 'Complete topic lessons and curated content' },
              { num: '2', text: 'Solve previous year questions with guidance' },
              { num: '3', text: 'Get AI-powered feedback and explanations' },
              { num: '4', text: 'Track progress with detailed analytics' },
              { num: '5', text: 'Use intelligent revision schedules' },
              { num: '6', text: 'Chat with your AI mentor anytime' },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {item.num}
                </div>
                <p className="text-muted-foreground pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Your Study Schedule',
      description: 'Customize your daily commitment to stay on track.',
      icon: Clock,
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block">
              <input
                type="radio"
                name="schedule"
                defaultChecked
                className="mr-3"
              />
              <span className="font-semibold">Intensive (2+ hours/day)</span>
              <p className="text-sm text-muted-foreground ml-6">Best for final preparation</p>
            </label>
            <label className="block">
              <input
                type="radio"
                name="schedule"
                className="mr-3"
              />
              <span className="font-semibold">Moderate (1-2 hours/day)</span>
              <p className="text-sm text-muted-foreground ml-6">Balanced approach</p>
            </label>
            <label className="block">
              <input
                type="radio"
                name="schedule"
                className="mr-3"
              />
                      <span className="text-xl font-semibold">FocusedGov</span>
              <p className="text-sm text-muted-foreground ml-6">Build consistency gradually</p>
            </label>
          </div>
        </div>
      ),
    },
    {
      title: "You're All Set!",
      description: 'Your personalized learning journey is ready to begin.',
      icon: CheckCircle2,
      content: (
        <div className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-secondary/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ready to Begin!</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Your AI mentor is waiting to help you succeed. Click below to start your first lesson.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Pro Tip:</span> Consistency beats perfection. Even 30 minutes of focused study daily will compound into remarkable results.
            </p>
          </div>
        </div>
      ),
    },
  ]

  const CurrentIcon = steps[currentStep].icon

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      // Simulate progress
      await new Promise(resolve => setTimeout(resolve, 1000))
      window.location.href = '/dashboard'
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">InnovativeFlow</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    index <= currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <Card className="p-8 sm:p-12 space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <CurrentIcon className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">{steps[currentStep].title}</h1>
                <p className="text-lg text-muted-foreground">{steps[currentStep].description}</p>
              </div>
            </div>

            {/* Content */}
            <div>{steps[currentStep].content}</div>

            {/* Navigation */}
            <div className="flex gap-4 pt-8 border-t border-border">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading ? (
                  'Setting up...'
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Step Indicator */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </main>
    </div>
  )
}
