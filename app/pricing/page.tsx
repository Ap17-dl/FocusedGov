'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'Forever',
      description: 'Perfect for getting started',
      features: [
        '5 PYQ solutions per week',
        'Basic progress tracking',
        'Limited quiz access',
        'Community resources',
        'Email support',
      ],
      excluded: [
        'AI answer evaluation',
        'Smart study plans',
        'Analytics insights',
        'Priority support',
        'AI mentor chat',
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      highlighted: false,
    },
    {
      name: 'Basic',
      price: '₹499',
      period: '/month',
      description: 'For casual learners',
      features: [
        '50 PYQ solutions per month',
        'AI answer evaluation',
        'Basic progress tracking',
        'Quiz builder access',
        'Email support',
        'Weekly progress reports',
      ],
      excluded: [
        'Smart study plans',
        'AI mentor chat',
        'Advanced analytics',
        'Current affairs module',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      ctaLink: '/checkout?plan=basic',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '₹999',
      period: '/month',
      description: 'For serious exam prep',
      features: [
        'Unlimited PYQ solutions',
        'AI answer evaluation',
        'Smart study plans',
        'Complete quiz access',
        'Priority email support',
        'Weekly progress reports',
        'Analytics insights',
        'Revision scheduling',
      ],
      excluded: [
        'AI mentor chat',
        'Current affairs module',
        'Priority support (live chat)',
        '1:1 mentorship',
      ],
      cta: 'Start Free Trial',
      ctaLink: '/checkout?plan=pro',
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '₹1,999',
      period: '/month',
      description: 'Complete exam mastery',
      features: [
        'Everything in Pro',
        'AI mentor chat (24/7)',
        'Current affairs module',
        'Live chat support',
        'Advanced analytics',
        'Custom study plans',
        'Monthly 1:1 mentorship',
        'Personalized feedback',
        'Priority support',
      ],
      excluded: [],
      cta: 'Start Free Trial',
      ctaLink: '/checkout?plan=premium',
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="text-sm hover:text-primary transition-colors mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose the plan that works best for your preparation journey. All paid plans include a 7-day free trial.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-4">
          <span className="text-foreground">Monthly</span>
          <div className="relative inline-flex h-8 w-14 rounded-full bg-secondary">
            <button className="relative z-10 inline-flex w-7 transform rounded-full bg-primary shadow-md transition-transform" />
          </div>
          <span className="text-muted-foreground">
            Annual <span className="text-primary font-semibold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-primary border-2 shadow-lg scale-105 lg:scale-110'
                  : 'border-border hover:border-primary/50'
              } p-8 bg-card`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>

                {/* CTA Button */}
                <Link href={plan.ctaLink}>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                      Included Features
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.excluded.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                        Not Included
                      </p>
                      <ul className="space-y-3">
                        {plan.excluded.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 opacity-50">
                            <div className="w-5 h-5 rounded-full border border-border flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {[
            {
              q: 'Can I switch plans anytime?',
              a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.',
            },
            {
              q: 'What happens after the free trial?',
              a: 'After 7 days, your subscription will automatically begin. You can cancel anytime before the trial ends with no charges.',
            },
            {
              q: 'Is my data secure?',
              a: 'Yes, we use industry-standard encryption and security measures to protect your personal and study data.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit/debit cards, UPI, netbanking, and digital wallets through Razorpay.',
            },
            {
              q: 'Do you offer refunds?',
              a: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with your subscription.',
            },
            {
              q: 'Can I get a custom plan?',
              a: 'For enterprise or institutional licensing, please contact our sales team at sales@focusedgov.com',
            },
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-border pb-6">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-lg bg-secondary/50 border border-border p-8 text-center space-y-6">
          <h2 className="text-3xl font-semibold">Ready to start learning?</h2>
          <p className="text-muted-foreground">
            Join thousands of students who are acing their exams with FocusedGov. Start your free trial today—no credit card required.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
