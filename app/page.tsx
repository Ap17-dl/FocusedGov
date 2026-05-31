'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Brain, BarChart3, MessageCircle, Zap } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">InnovativeFlow</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm hover:text-primary transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</Link>
              <Link href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight text-balance">
              Master Your Exams with <span className="text-primary">AI Guidance</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Personalized learning paths, AI-powered answer evaluation, and intelligent revision schedules. Focus on understanding, not memorization.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Learning Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-border">
            <div className="space-y-2">
              <div className="text-3xl font-semibold text-primary">10K+</div>
              <p className="text-muted-foreground">Students Prepared</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-semibold text-primary">95%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-semibold text-primary">50K+</div>
              <p className="text-muted-foreground">PYQ Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-semibold">Everything You Need to Succeed</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools designed for serious students preparing for competitive exams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Smart Study Plans</h3>
                <p className="text-muted-foreground">
                  AI generates personalized learning paths based on your strengths and weaknesses.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">PYQ Analytics</h3>
                <p className="text-muted-foreground">
                  Deep analysis of previous year questions with AI-powered pattern recognition.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Answer Evaluation</h3>
                <p className="text-muted-foreground">
                  Get detailed feedback on your answers with explanations and alternative approaches.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Revision Engine</h3>
                <p className="text-muted-foreground">
                  Intelligent spaced repetition for optimal memory retention and recall.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">AI Mentor Chat</h3>
                <p className="text-muted-foreground">
                  Real-time guidance from an AI mentor trained on expert knowledge and best practices.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="space-y-4 p-6 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Visualize your progress with detailed analytics and performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-semibold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, effective, and built around your learning goals.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { number: '1', title: 'Create Your Profile', description: 'Select your exam, goals, and current level to get started.' },
              { number: '2', title: 'Get Your Plan', description: 'AI creates a personalized learning path tailored to your needs.' },
              { number: '3', title: 'Study & Practice', description: 'Work through curated content and past year questions.' },
              { number: '4', title: 'Get Feedback', description: 'Receive detailed AI analysis of your answers and progress.' },
              { number: '5', title: 'Revise Smartly', description: 'Use intelligent revision schedules for maximum retention.' },
              { number: '6', title: 'Excel', description: 'Apply insights from analytics to ace your exam.' },
            ].map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {step.number}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-semibold">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your preparation journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="p-8 border border-border rounded-lg bg-card space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Free</h3>
                  <p className="text-muted-foreground">Perfect for getting started</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">₹0</span>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    5 PYQ solutions per week
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Basic progress tracking
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                    AI answer evaluation
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </div>

              {/* Pro Plan */}
              <div className="p-8 border-2 border-primary rounded-lg bg-card space-y-6 relative">
                <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                  Most Popular
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                  <p className="text-muted-foreground">For serious exam prep</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">₹999</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Unlimited PYQ solutions
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    AI answer evaluation
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Smart study plans
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Priority AI chat support
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90">Start Free Trial</Button>
              </div>

              {/* Premium Plan */}
              <div className="p-8 border border-border rounded-lg bg-card space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Premium</h3>
                  <p className="text-muted-foreground">Complete exam mastery</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">₹1,999</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Everything in Pro
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    1:1 AI mentorship
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Current affairs module
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Advanced analytics
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Start Free Trial</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-semibold">Ready to Transform Your Exam Prep?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of students who are acing their exams with InnovativeFlow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Learning Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="mailto:support@innovativeflow.com">
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">InnovativeFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Intelligent exam preparation for ambitious students.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 InnovativeFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
