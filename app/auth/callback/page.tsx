'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if user is authenticated after OAuth callback
        const { supabase } = await import('@/lib/supabase')
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          console.log('[v0] OAuth successful, redirecting to dashboard')
          router.push('/dashboard')
        } else {
          console.log('[v0] No session found after OAuth callback')
          router.push('/login?error=oauth_failed')
        }
      } catch (error) {
        console.error('[v0] Auth callback error:', error)
        router.push('/login?error=callback_error')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Completing login...</h1>
        <p className="text-muted-foreground">Please wait while we authenticate you.</p>
      </div>
    </div>
  )
}
