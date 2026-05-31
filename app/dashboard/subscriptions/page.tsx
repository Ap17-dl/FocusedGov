'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, X, AlertCircle, CreditCard, Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SubscriptionsPage() {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const currentPlan = {
    name: 'Pro',
    price: 999,
    status: 'Active',
    startDate: '2024-12-15',
    renewalDate: '2025-01-15',
    autoRenewal: true,
    paymentMethod: {
      type: 'Credit Card',
      last4: '4242',
      expiry: '12/26',
    },
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
  }

  const upcomingPlans = [
    {
      name: 'Premium',
      price: 1999,
      period: 'per month',
      bestFor: 'Students wanting complete exam mastery',
      newFeatures: [
        'AI mentor chat (24/7)',
        'Current affairs module',
        'Live chat support',
        'Advanced analytics',
        'Monthly 1:1 mentorship',
      ],
      savings: '₹0',
    },
  ]

  const invoices = [
    {
      id: 'INV-2025-001',
      date: '2025-01-15',
      amount: 999,
      status: 'Paid',
      plan: 'Pro Monthly',
    },
    {
      id: 'INV-2024-012',
      date: '2024-12-15',
      amount: 999,
      status: 'Paid',
      plan: 'Pro Monthly',
    },
    {
      id: 'INV-2024-011',
      date: '2024-11-15',
      amount: 999,
      status: 'Paid',
      plan: 'Pro Monthly',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Subscriptions</h1>
        <p className="text-muted-foreground">
          Manage your subscription plans, billing, and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Current Plan</h2>
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Plan Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                <h3 className="text-3xl font-semibold">{currentPlan.name}</h3>
                <p className="text-lg text-primary mt-2">
                  ₹{currentPlan.price} <span className="text-muted-foreground text-sm">per month</span>
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-semibold text-primary">{currentPlan.status}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Subscription Started</span>
                  <span className="font-semibold">{currentPlan.startDate}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Renews On</span>
                  <span className="font-semibold">{currentPlan.renewalDate}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Auto-Renewal</span>
                  <span className="font-semibold flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Enabled
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Link href="/pricing">
                  <Button className="w-full">Upgrade Plan</Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>

            {/* Included Features */}
            <div className="space-y-4">
              <h4 className="font-semibold">Included Features</h4>
              <ul className="space-y-3">
                {currentPlan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 space-y-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold">Cancel Subscription?</h3>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to cancel your Pro subscription? You will lose access to premium features immediately.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                variant="destructive"
                className="w-full"
              >
                Yes, Cancel Subscription
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCancelConfirm(false)}
              >
                Keep My Subscription
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Billing Information */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Billing Information</h2>
        <Card className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">{currentPlan.paymentMethod.type}</p>
                  <p className="text-sm text-muted-foreground">
                    ending in {currentPlan.paymentMethod.last4} • Expires {currentPlan.paymentMethod.expiry}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </Card>
      </section>

      {/* Invoices */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Billing History</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Invoice</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Plan</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{invoice.id}</td>
                    <td className="px-6 py-4 text-sm">{invoice.date}</td>
                    <td className="px-6 py-4 text-sm">{invoice.plan}</td>
                    <td className="px-6 py-4 text-sm font-semibold">₹{invoice.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Upgrade Suggestion */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Upgrade Options</h2>
        {upcomingPlans.map((plan) => (
          <Card key={plan.name} className="p-6 border-accent/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Plan</p>
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{plan.bestFor}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">₹{plan.price}</p>
                  <p className="text-muted-foreground text-sm">{plan.period}</p>
                </div>
                <Link href="/pricing?plan=premium">
                  <Button className="bg-primary hover:bg-primary/90">
                    Upgrade to {plan.name}
                  </Button>
                </Link>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Additional Features</h4>
                <ul className="space-y-3">
                  {plan.newFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  )
}
