'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Lightbulb, ThumbsUp, ThumbsDown, Copy, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface Message {
  role: 'user' | 'mentor'
  content: string
}

export default function MentorPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'mentor',
      content: 'Hello! I\'m your AI Mentor, here to help you prepare for your exam. Feel free to ask me anything about your studies, exam strategies, or specific topics. What would you like to focus on today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setError(null)
    const userMessage = input.trim()
    
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsLoading(true)

    try {
      // Get session token
      const { supabase } = await import('@/lib/supabase')
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setError('Session expired. Please log in again.')
        router.push('/login')
        return
      }

      // Call chat API with conversation history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.filter((m) => m.role === 'mentor').slice(-5), // Last 5 mentor messages for context
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to get AI response')
        setMessages((prev) => prev.slice(0, -1)) // Remove user message if failed
        return
      }

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        {
          role: 'mentor',
          content: data.response,
        },
      ])
    } catch (err) {
      console.error('[v0] Chat error:', err)
      setError('Failed to connect to AI Mentor. Please try again.')
      setMessages((prev) => prev.slice(0, -1)) // Remove user message if failed
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedQuestions = [
    'How should I prepare for Essay writing?',
    'What are the most important topics for UPSC?',
    'How can I improve my answer accuracy?',
    'Create a 30-day study plan for me',
  ]

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center space-y-8">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="mt-4 text-muted-foreground">Loading AI Mentor...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">AI Mentor Chat</h1>
        <p className="text-muted-foreground">Get personalized guidance from your AI mentor anytime</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive">Error</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Messages */}
        <Card className="flex-1 p-6 space-y-4 overflow-y-auto bg-secondary/10">
          {messages.length === 1 && messages[0].role === 'mentor' && (
            <div className="space-y-6">
              {/* Welcome State */}
              <div className="space-y-6 py-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Welcome to Your Study Session</h2>
                    <p className="text-muted-foreground text-sm mt-2">
                      I\'m here to help you understand concepts, solve problems, and ace your exam.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-center text-muted-foreground">Quick Topics</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Modern History',
                      'Constitutional Law',
                      'Geography',
                      'Current Affairs',
                    ].map((topic) => (
                      <button
                        key={topic}
                        className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium hover:border-primary"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-center text-muted-foreground">Suggested Questions</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => setInput(question)}
                        className="w-full text-left p-3 border border-border rounded-lg hover:bg-secondary transition-colors text-sm hover:border-primary"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'mentor' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary border border-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {message.role === 'mentor' && (
                    <div className="flex gap-2 mt-3">
                      <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold text-xs">
                    Y
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-secondary border border-border rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            type="text"
            placeholder="Ask your mentor anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="bg-input"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
