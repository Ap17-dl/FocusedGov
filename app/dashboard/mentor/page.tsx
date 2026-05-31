'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Lightbulb, ThumbsUp, ThumbsDown, Copy } from 'lucide-react'

export default function MentorPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'mentor'; content: string }>>([
    {
      role: 'mentor',
      content: 'Hello! I\'m your AI Mentor, here to help you prepare for your exam. Feel free to ask me anything about your studies, exam strategies, or specific topics. What would you like to focus on today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'mentor',
          content: `Great question! Let me help you with that. Based on your learning pattern and exam requirements, here's what I recommend:\n\n1. Focus on understanding the core concepts first\n2. Practice with previous year questions\n3. Review your mistakes and learn from them\n4. Use spaced repetition for better retention\n\nWould you like me to explain any specific concept or create a focused study plan for you?`,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const suggestedQuestions = [
    'How should I prepare for Essay writing?',
    'What are the most important topics for UPSC?',
    'How can I improve my answer accuracy?',
    'Create a 30-day study plan for me',
  ]

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">AI Mentor Chat</h1>
        <p className="text-muted-foreground">Get personalized guidance from your AI mentor anytime</p>
      </div>

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
