import OpenAI from 'openai'

let openai: OpenAI | null = null

// Initialize OpenAI only if API key is available and we're not in build-time
if (typeof process !== 'undefined' && process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  } catch (error) {
    console.warn('[v0] Failed to initialize OpenAI client:', error)
  }
} else if (typeof process !== 'undefined') {
  console.warn('[v0] OPENAI_API_KEY environment variable is not set. AI Mentor features will not work.')
}

export const getOpenAI = () => openai

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
  const client = getOpenAI()
  if (!client) {
    throw new Error('OPENAI_API_KEY is not configured')
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

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ]

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
    })

    const assistantMessage = response.choices[0]?.message?.content
    if (!assistantMessage) {
      throw new Error('No response from OpenAI')
    }

    return assistantMessage
  } catch (error) {
    console.error('[v0] OpenAI API error:', error)
    throw error
  }
}

export async function generateStudyPlan(
  topic: string,
  daysAvailable: number,
  currentLevel: string
): Promise<string> {
  const client = getOpenAI()
  if (!client) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content:
        'You are an expert educational planner. Create detailed, structured study plans that are realistic and achievable.',
    },
    {
      role: 'user',
      content: `Create a ${daysAvailable}-day study plan for learning "${topic}". Current knowledge level: ${currentLevel}. Format as a structured day-by-day plan with specific topics, time allocations, and practice recommendations.`,
    },
  ]

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 1500,
    })

    const plan = response.choices[0]?.message?.content
    if (!plan) {
      throw new Error('No response from OpenAI')
    }

    return plan
  } catch (error) {
    console.error('[v0] OpenAI Study Plan API error:', error)
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
  const client = getOpenAI()
  if (!client) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content:
        'You are an expert exam evaluator. Evaluate student answers objectively, provide scores out of 10, and give constructive feedback.',
    },
    {
      role: 'user',
      content: `Evaluate this ${examType} answer:
Question: ${question}
Student's Answer: ${studentAnswer}
Model Answer: ${correctAnswer}

Provide your response in the following JSON format:
{
  "score": <number 0-10>,
  "feedback": "<overall feedback>",
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<improvement1>", "<improvement2>"]
}`,
    },
  ]

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.5,
      max_tokens: 500,
    })

    const responseText = response.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('No response from OpenAI')
    }

    const evaluation = JSON.parse(responseText)
    return evaluation
  } catch (error) {
    console.error('[v0] OpenAI Evaluation API error:', error)
    throw error
  }
}
