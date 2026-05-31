'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, BookOpen, MessageSquare, ThumbsUp, Lightbulb } from 'lucide-react'
import { useState } from 'react'

export default function EvaluationPage() {
  const [activeTab, setActiveTab] = useState('evaluation')

  const evaluation = {
    question: 'Analyze the impact of the British education system on Indian society during the 19th century.',
    examYear: 'UPSC 2022',
    marks: 'Out of 250 words (15 marks)',
    yourScore: 9,
    totalMarks: 15,
    submittedAnswer: `The British education system profoundly transformed Indian society in multiple ways. The introduction of English education created a new intellectual class that was exposed to Western ideas and scientific thinking. This led to social reforms and the emergence of luminaries like Ram Mohan Roy and Debendra Mohan Tagore who spearheaded the renaissance movement.

However, this system also led to the marginalization of traditional Indian knowledge systems. Classical subjects like Sanskrit and Persian were sidelined, causing the erosion of India's intellectual heritage. The curriculum was designed primarily to serve the colonial administration's interests, creating a class of English-educated Indians who worked within the colonial bureaucracy.

The Macaulay Minute on Education deliberately promoted English over Indian languages, which had both positive and negative consequences. While it facilitated communication and modernization, it also created a cultural divide between the educated elite and the masses.

Overall, the British education system was a mixed blessing - it introduced modern knowledge systems but at the cost of indigenous educational traditions.`,

    feedback: {
      strengths: [
        'Comprehensive analysis of multiple impacts (social, intellectual, administrative)',
        'Balanced perspective acknowledging both positive and negative aspects',
        'Reference to specific historical figures (Ram Mohan Roy, Debendra Mohan Tagore)',
        'Structured presentation with clear progression of ideas',
      ],
      improvements: [
        'Could have included statistics on literacy rates before and after British rule',
        'Limited discussion on the impact on women\'s education specifically',
        'Could have connected to the broader framework of cultural imperialism',
        'Missing reference to specific policies like the Wood\'s Education Dispatch',
      ],
      suggestions: [
        'Read more about the Wood\'s Education Dispatch of 1854 and Hunter Commission',
        'Study the role of vernacular education during the colonial period',
        'Analyze case studies of specific educational institutions and their impact',
        'Compare British education policies with other colonial education systems',
      ],
    }
  }

  const accuracy = Math.round((evaluation.yourScore / evaluation.totalMarks) * 100)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Answer Evaluation</h1>
        <p className="text-muted-foreground">{evaluation.examYear}</p>
      </div>

      {/* Score Card */}
      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{evaluation.yourScore}</div>
                <div className="text-xs text-muted-foreground">/{evaluation.totalMarks}</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">{accuracy}% Accuracy</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Performance</p>
                <p className="font-semibold text-lg text-green-600">Excellent</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Compared to Average</p>
                <p className="font-semibold text-lg text-primary">+15%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Feedback</p>
                <p className="font-semibold text-lg text-accent">Comprehensive</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-border flex gap-4">
        <button
          onClick={() => setActiveTab('evaluation')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'evaluation'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          AI Evaluation
        </button>
        <button
          onClick={() => setActiveTab('answer')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'answer'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Your Answer
        </button>
        <button
          onClick={() => setActiveTab('mentor')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'mentor'
              ? 'border-primary text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Ask Mentor
        </button>
      </div>

      {/* Content */}
      {activeTab === 'evaluation' && (
        <div className="space-y-8">
          {/* Question */}
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Question</h3>
            <p className="text-foreground leading-relaxed">{evaluation.question}</p>
            <p className="text-sm text-muted-foreground">{evaluation.marks}</p>
          </Card>

          {/* Strengths */}
          <Card className="p-6 space-y-4 border-green-200 bg-green-50/50">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-lg text-green-900">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {evaluation.feedback.strengths.map((strength, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Areas for Improvement */}
          <Card className="p-6 space-y-4 border-orange-200 bg-orange-50/50">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-lg text-orange-900">Areas for Improvement</h3>
            </div>
            <ul className="space-y-3">
              {evaluation.feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="text-orange-600 font-bold">•</span>
                  <span className="text-foreground">{improvement}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Suggestions */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-lg">Learning Recommendations</h3>
            </div>
            <ul className="space-y-3">
              {evaluation.feedback.suggestions.map((suggestion, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="text-accent font-bold">{index + 1}.</span>
                  <span className="text-foreground">{suggestion}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full mt-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Learning Resources
            </Button>
          </Card>
        </div>
      )}

      {activeTab === 'answer' && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Answer</h3>
            <div className="p-4 border border-border rounded-lg bg-secondary/30 text-foreground leading-relaxed whitespace-pre-wrap text-sm">
              {evaluation.submittedAnswer}
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <ThumbsUp className="w-4 h-4 mr-2" />
              This Helped
            </Button>
            <Button variant="outline">Report Issue</Button>
          </div>
        </Card>
      )}

      {activeTab === 'mentor' && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ask Your AI Mentor</h3>
            <p className="text-sm text-muted-foreground">
              Have specific questions about this answer? Chat with your AI mentor for deeper insights.
            </p>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Chat messages would go here */}
            <div className="p-4 border border-border rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground italic">Start a conversation with your AI mentor...</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about this answer..."
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
