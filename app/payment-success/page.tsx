'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Download, Clock, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <Card className="p-8 space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-semibold">Welcome to Your Pro Plan!</h1>
            <p className="text-lg text-muted-foreground">
              Your subscription is now active. Your 7-day free trial starts today.
            </p>
          </div>

          {/* Confirmation Details */}
          <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Plan</p>
                <p className="text-lg font-semibold">Pro</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Price</p>
                <p className="text-lg font-semibold">₹999/month</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Trial Period</p>
                <p className="text-lg font-semibold">7 Days</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Next Charge</p>
                <p className="text-lg font-semibold">Jan 22, 2025</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">What Happens Next?</h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  1
                </div>
                <div>
                  <p className="font-semibold">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a confirmation email to your registered email address
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  2
                </div>
                <div>
                  <p className="font-semibold">Start Learning</p>
                  <p className="text-sm text-muted-foreground">
                    Access all Pro features immediately. Begin with your personalized study plan
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  3
                </div>
                <div>
                  <p className="font-semibold">Auto-Renewal Notification</p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll remind you before your trial ends on January 22, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Features Highlight */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Your Pro Plan Includes</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Unlimited PYQ Solutions',
                'AI Answer Evaluation',
                'Smart Study Plans',
                'Complete Quiz Access',
                'Priority Email Support',
                'Weekly Progress Reports',
                'Analytics Insights',
                'Revision Scheduling',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Link href="/dashboard">
              <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/subscriptions">
              <Button variant="outline" className="w-full">
                View Subscription Details
              </Button>
            </Link>
          </div>

          {/* Important Info */}
          <div className="bg-secondary/30 rounded-lg p-4 space-y-3 text-sm">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">No Commitment Required</p>
                <p className="text-muted-foreground text-xs">
                  Cancel anytime before January 22 and you won't be charged
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">Need Help?</p>
                  <p className="text-muted-foreground text-xs">
                  Contact our support team at support@focusedgov.com
                </p>
              </div>
            </div>
          </div>

          {/* Download Invoice */}
          <button className="w-full p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-muted-foreground space-y-2">
          <p>
            By continuing, you agree to our{' '}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
