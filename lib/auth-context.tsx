'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import dynamic from 'next/dynamic'

// Dynamically import supabase to prevent SSR issues
const supabaseModule = dynamic(() => import('./supabase'), { ssr: false })

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { supabase } = await import('./supabase')
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('[v0] Auth init error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    let subscription: any = null
    const setupSubscription = async () => {
      try {
        const { supabase } = await import('./supabase')
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })
        subscription = data
      } catch (error) {
        console.error('Error setting up auth subscription:', error)
      }
    }

    setupSubscription()

    return () => subscription?.subscription?.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      const { supabase } = await import('./supabase')
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
