'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Brain, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!email) {
        setError('Please enter your email address')
        return
      }

      // TODO: Replace with actual password reset logic
      console.log('[v0] Password reset requested for:', email)
      await new Promise(resolve => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (err) {
      setError('Failed to process request. Please try again.')
    } finally {
      setIsLoading(false)
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
        <div className="w-full max-w-md space-y-8">
          {!isSubmitted ? (
            <>
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold">Reset Your Password</h1>
                <p className="text-muted-foreground">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <Card className="p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="bg-input"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>

                <div className="border-t border-border pt-4">
                  <p className="text-center text-sm text-muted-foreground">
                    Remember your password?{' '}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </Card>

              <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </>
          ) : (
            <>
              <Card className="p-12 text-center space-y-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Check Your Email</h2>
                    <p className="text-muted-foreground">
                      We&apos;ve sent a password reset link to <span className="font-medium text-foreground">{email}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/30 text-sm text-muted-foreground space-y-2">
                  <p>The link will expire in 24 hours. If you don&apos;t see the email:</p>
                  <ul className="text-left space-y-1 ml-4">
                    <li>• Check your spam folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• Try requesting a new link</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try Another Email
                  </Button>
                  <Link href="/login">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
