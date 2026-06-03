import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateMentorResponse, ChatMessage } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    // Get auth header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    if (message.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 })
    }

    // Get Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

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

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI Mentor is not configured. Please add OPENAI_API_KEY to environment variables.' },
        { status: 503 }
      )
    }

    // Convert conversation history to ChatMessage format
    const formattedHistory: ChatMessage[] = conversationHistory.map((msg: any) => ({
      role: msg.role || 'user',
      content: msg.content || '',
    }))

    // Generate response from OpenAI
    const response = await generateMentorResponse(message.trim(), formattedHistory, {
      examType: 'Competitive Exams',
    })

    // Store conversation in database (optional - for future analytics)
    try {
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        user_message: message,
        mentor_response: response,
        created_at: new Date().toISOString(),
      })
    } catch (dbError) {
      console.error('[v0] Error storing chat message:', dbError)
      // Don't fail the response if database save fails
    }

    return NextResponse.json({
      response,
      userId: user.id,
    })
  } catch (error) {
    console.error('[v0] Chat API error:', error)
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key. Please check your configuration.' },
          { status: 503 }
        )
      }
      if (error.message.includes('429')) {
        return NextResponse.json(
          { error: 'OpenAI API rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
