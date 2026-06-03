import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get auth header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables not configured')
      // Return mock data if Supabase is not configured
      const stats = {
        studyStreak: Math.floor(Math.random() * 30) + 1,
        hoursToday: (Math.random() * 5).toFixed(1),
        completionRate: Math.floor(Math.random() * 100),
        nextExam: '2026-12-15',
      }
      return NextResponse.json(stats)
    }

    // Create Supabase client with token
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    // For now, return mock data with user context
    // TODO: Query real data from user_stats table
    const stats = {
      studyStreak: Math.floor(Math.random() * 30) + 1,
      hoursToday: (Math.random() * 5).toFixed(1),
      completionRate: Math.floor(Math.random() * 100),
      nextExam: '2026-12-15',
      userId: user.id,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('[v0] Stats API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
