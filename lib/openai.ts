import { GoogleGenerativeAI } from '@google/generative-ai'

let geminiInstance: GoogleGenerativeAI | null = null

// Lazy initialize Gemini client - only when needed
export const getGemini = (): GoogleGenerativeAI | null => {
  // If already initialized, return cached instance
  if (geminiInstance) {
    return geminiInstance
  }

  const apiKey = process.env.GOOGLE_API_KEY

  if (!apiKey) {
    console.warn('[v0] GOOGLE_API_KEY environment variable is not set. AI Mentor features will not work.')
    return null
  }

  try {
    geminiInstance = new GoogleGenerativeAI(apiKey)
    console.log('[v0] Gemini client initialized successfully')
    return geminiInstance
  } catch (error) {
    console.error('[v0] Failed to initialize Gemini client:', error)
    return null
  }
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function generateMentorResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  userContext?: {
    examType?: string
    focusAreas?: string[]
    level?: string
  }
): Promise<string> {
  const client = getGemini()
  if (!client) {
    throw new Error('GOOGLE_API_KEY is not configured')
  }

  const systemPrompt = `You are an expert AI Mentor helping students prepare for competitive exams like UPSC, IIT-JEE, NEET, and other standardized tests. 

Your responsibilities:
- Provide clear, concise, and accurate explanations of complex topics
- Adapt your teaching style based on the student's level and needs
- Break down difficult concepts into manageable parts
- Use examples and real-world analogies when helpful
- Suggest study techniques and time management strategies
- Ask clarifying questions to better understand student needs
- Provide actionable study plans and revision schedules
- Review practice problems and provide constructive feedback
${userContext?.examType ? `- Focus on preparing for: ${userContext.examType}` : ''}
${userContext?.focusAreas ? `- Priority areas: ${userContext.focusAreas.join(', ')}` : ''}

Always be encouraging, patient, and supportive. Provide specific, detailed answers rather than generic responses.`

  try {
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build conversation history for context
    const history = conversationHistory.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    // Start chat session with system prompt and history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I will follow these guidelines as your AI Mentor.' }],
        },
        ...history,
      ],
    })

    const response = await chat.sendMessage(userMessage)
    const assistantMessage = response.response.text()

    if (!assistantMessage) {
      throw new Error('No response from Gemini')
    }

    return assistantMessage
  } catch (error) {
    console.error('[v0] Gemini API error:', error)
    throw error
  }
}

export async function generateStudyPlan(
  topic: string,
  daysAvailable: number,
  currentLevel: string
): Promise<string> {
  const client = getGemini()
  if (!client) {
    throw new Error('GOOGLE_API_KEY is not configured')
  }

  const prompt = `You are an expert educational planner. Create a ${daysAvailable}-day study plan for learning "${topic}". Current knowledge level: ${currentLevel}. Format as a structured day-by-day plan with specific topics, time allocations, and practice recommendations.`

  try {
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const response = await model.generateContent(prompt)
    const plan = response.response.text()

    if (!plan) {
      throw new Error('No response from Gemini')
    }

    return plan
  } catch (error) {
    console.error('[v0] Gemini Study Plan API error:', error)
    throw error
  }
}

export async function evaluateAnswer(
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  examType: string
): Promise<{
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}> {
  const client = getGemini()
  if (!client) {
    throw new Error('GOOGLE_API_KEY is not configured')
  }

  const prompt = `You are an expert exam evaluator. Evaluate this ${examType} answer:
Question: ${question}
Student's Answer: ${studentAnswer}
Model Answer: ${correctAnswer}

Provide your response in the following JSON format:
{
  "score": <number 0-10>,
  "feedback": "<overall feedback>",
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<improvement1>", "<improvement2>"]
}`

  try {
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const response = await model.generateContent(prompt)
    const responseText = response.response.text()

    if (!responseText) {
      throw new Error('No response from Gemini')
    }

    const evaluation = JSON.parse(responseText)
    return evaluation
  } catch (error) {
    console.error('[v0] Gemini Evaluation API error:', error)
    throw error
  }
}
