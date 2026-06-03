import { createClient } from '@supabase/supabase-js'

export async function getUserStats(userId: string, token: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('[v0] Error fetching user stats:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[v0] Database error:', error)
    return null
  }
}

export async function updateUserStats(
  userId: string,
  token: string,
  stats: {
    study_streak?: number
    hours_today?: number
    completion_rate?: number
    next_exam?: string
  }
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  try {
    const { data, error } = await supabase
      .from('user_stats')
      .update({
        ...stats,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('[v0] Error updating user stats:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[v0] Database error:', error)
    return null
  }
}

export async function saveChatMessage(
  userId: string,
  token: string,
  userMessage: string,
  mentorResponse: string
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        user_message: userMessage,
        mentor_response: mentorResponse,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('[v0] Error saving chat message:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[v0] Database error:', error)
    return null
  }
}

export async function getFocusSessions(userId: string, token: string, limit: number = 10) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  try {
    const { data, error } = await supabase
      .from('focus_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[v0] Error fetching focus sessions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[v0] Database error:', error)
    return []
  }
}

export async function createFocusSession(
  userId: string,
  token: string,
  session: {
    title: string
    duration_minutes: number
    subject?: string
  }
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  try {
    const { data, error } = await supabase
      .from('focus_sessions')
      .insert({
        user_id: userId,
        ...session,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('[v0] Error creating focus session:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[v0] Database error:', error)
    return null
  }
}

export async function completeFocusSession(userId: string, token: string, sessionId: number) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  try {
    const { data, error } = await supabase
      .from('focus_sessions')
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('[v0] Error completing focus session:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[v0] Database error:', error)
    return null
  }
}
