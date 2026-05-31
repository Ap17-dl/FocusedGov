'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, ChevronRight, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)

  const quiz = {
    title: 'UPSC 2023 - General Studies Paper 1',
    topic: 'Modern Indian History',
    totalQuestions: 10,
    timeLimit: 30,
    questions: [
      {
        id: 1,
        question: 'Who founded the Brahmo Samaj?',
        type: 'multiple-choice',
        options: [
          'Raja Ram Mohan Roy',
          'Keshab Chandra Sen',
          'Ishwar Chandra Vidyasagar',
          'Bankim Chandra Chattopadhyay',
        ],
        correctAnswer: 'Raja Ram Mohan Roy',
      },
      {
        id: 2,
        question: 'In which year was the Indian National Congress founded?',
        type: 'multiple-choice',
        options: [
          '1885',
          '1876',
          '1895',
          '1905',
        ],
        correctAnswer: '1885',
      },
      {
        id: 3,
        question: 'Who was the first President of the Indian National Congress?',
        type: 'multiple-choice',
        options: [
          'Dadabhai Naoroji',
          'W.C. Bannerjee',
          'George Yule',
          'Surendranath Bannerjee',
        ],
        correctAnswer: 'W.C. Bannerjee',
      },
    ],
  }

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: option,
    })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const question = quiz.questions[currentQuestion]
  const currentAnswer = selectedAnswers[currentQuestion]
  const isAnswered = currentQuestion in selectedAnswers

  if (showResults) {
    const correct = quiz.questions.filter(
      (q) => selectedAnswers[quiz.questions.indexOf(q)] === q.correctAnswer
    ).length

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Quiz Results</h1>
          <p className="text-muted-foreground">{quiz.title}</p>
        </div>

        <Card className="p-12 text-center space-y-8">
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <div className="text-4xl font-bold text-primary">{correct}/10</div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Great Attempt!</h2>
              <p className="text-muted-foreground">You scored {Math.round((correct / 10) * 100)}% on this quiz.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Correct</p>
              <p className="text-2xl font-semibold text-green-600">{correct}</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Incorrect</p>
              <p className="text-2xl font-semibold text-red-600">{10 - correct}</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
              <p className="text-2xl font-semibold text-primary">{Math.round((correct / 10) * 100)}%</p>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Review Answers
            </Button>
            <Button variant="outline" className="w-full">
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{quiz.title}</h1>
        <p className="text-muted-foreground">{quiz.topic}</p>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Question {currentQuestion + 1} of {quiz.totalQuestions}</span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            Time left: {quiz.timeLimit} mins
          </div>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <Card className="p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{question.question}</h2>
          <p className="text-sm text-muted-foreground">Select the correct answer</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                currentAnswer === option
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={currentAnswer === option}
                onChange={(e) => handleSelectAnswer(e.target.value)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-foreground">{option}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <div className="flex gap-2 flex-wrap justify-center">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded border transition-all ${
                index === currentQuestion
                  ? 'bg-primary text-primary-foreground border-primary'
                  : index in selectedAnswers
                  ? 'bg-secondary border-border'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length === 0}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Stats */}
      <Card className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Answered</p>
          <p className="text-2xl font-semibold">{Object.keys(selectedAnswers).length}/{quiz.totalQuestions}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Skipped</p>
          <p className="text-2xl font-semibold">{quiz.totalQuestions - Object.keys(selectedAnswers).length}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Progress</p>
          <p className="text-2xl font-semibold">{Math.round(((currentQuestion + 1) / quiz.totalQuestions) * 100)}%</p>
        </div>
      </Card>
    </div>
  )
}
