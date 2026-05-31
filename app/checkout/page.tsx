'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lock, Check } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(false)

  const plan = 'Pro'
  const basePrice = 999
  const discount = appliedCoupon ? 199 : 0
  const totalPrice = basePrice - discount

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (coupon === 'WELCOME20') {
      setAppliedCoupon(true)
    }
  }

  const handlePayment = async () => {
    if (!email || !fullName || !phone) {
      alert('Please fill in all required fields')
      return
    }

    // In production, this would call your backend to create a Razorpay order
    console.log('Processing payment for:', { email, fullName, phone, plan, amount: totalPrice })
    alert(`Payment processing started for ${plan} plan (₹${totalPrice}/month)`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </Link>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold">Complete Your Purchase</h1>
              <p className="text-muted-foreground">
                Enter your details below to activate your {plan} subscription with a 7-day free trial.
              </p>
            </div>

            {/* Personal Information */}
            <div className="border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-semibold">Personal Information</h2>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Coupon Code */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Have a Coupon Code?</h2>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  disabled={appliedCoupon}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-input focus:outline-none focus:border-primary disabled:opacity-50"
                />
                <Button
                  type="submit"
                  variant="outline"
                  disabled={appliedCoupon}
                >
                  {appliedCoupon ? 'Applied' : 'Apply'}
                </Button>
              </form>
              {appliedCoupon && (
                <p className="text-sm text-primary flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  20% discount applied (Save ₹200)
                </p>
              )}
              <p className="text-xs text-muted-foreground">Try code: WELCOME20</p>
            </div>

            {/* Payment Method */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Payment Method</h2>
              <p className="text-sm text-muted-foreground">
                Your payment will be processed securely through Razorpay. We accept all major credit/debit cards, UPI, netbanking, and digital wallets.
              </p>
              <div className="flex items-center gap-2 p-4 bg-secondary/50 rounded-lg">
                <Lock className="w-5 h-5 text-primary" />
                <span className="text-sm">Secure payment powered by Razorpay</span>
              </div>
            </div>

            {/* Terms */}
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                By proceeding, you agree to our{' '}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                Your subscription will automatically renew each month. You can cancel anytime, no questions asked.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-border rounded-lg p-6 space-y-6 bg-card">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              {/* Plan Details */}
              <div className="space-y-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Plan</p>
                  <p className="font-semibold">{plan}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Billing Period</p>
                  <p className="font-semibold">1 Month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Trial Period</p>
                  <p className="font-semibold">7 Days Free</p>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{basePrice}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Discount (20%)</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Charged monthly after 7-day free trial
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 pt-4 border-t border-border">
                <p className="text-sm font-semibold">What's Included:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    Unlimited PYQ solutions
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    AI answer evaluation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    Smart study plans
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    Priority email support
                  </li>
                </ul>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                size="lg"
              >
                Start 7-Day Free Trial
              </Button>

              {/* Security Info */}
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                Payments secured by Razorpay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
