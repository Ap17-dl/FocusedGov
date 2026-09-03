import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const FALLBACK_MODELS = [
  process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "groq/compound",
];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "GROQ_API_KEY is not configured in environment variables.",
        },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });
    const body = await req.json();
    const { message, messages: incomingMessages } = body;

    if (!message && (!incomingMessages || incomingMessages.length === 0)) {
      return NextResponse.json(
        { success: false, error: "No message provided" },
        { status: 400 }
      );
    }

    const systemPrompt = {
      role: "system" as const,
      content:
        "You are an expert, encouraging, and highly structured AI Mentor designed to help students prepare for competitive civil services and academic exams (such as UPSC, State PSCs, SSC, and general studies). " +
        "Provide clear, actionable, high-yield answers with bullet points, structured frameworks, examples, and study techniques where applicable.",
    };

    let formattedMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      systemPrompt,
    ];

    if (Array.isArray(incomingMessages) && incomingMessages.length > 0) {
      for (const msg of incomingMessages) {
        if (msg && typeof msg.content === "string" && msg.content.trim()) {
          const role = msg.role === "mentor" || msg.role === "assistant" ? "assistant" : "user";
          formattedMessages.push({
            role,
            content: msg.content.trim(),
          });
        }
      }
    } else if (typeof message === "string" && message.trim()) {
      formattedMessages.push({
        role: "user",
        content: message.trim(),
      });
    }

    // Try primary and fallback models
    let lastError: any = null;
    let responseText: string | null = null;

    for (const model of FALLBACK_MODELS) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: formattedMessages,
          model,
          temperature: 0.7,
          max_tokens: 1500,
        });

        responseText = chatCompletion.choices[0]?.message?.content || "";
        if (responseText) {
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} failed, trying next:`, err?.message || err);
        lastError = err;
      }
    }

    if (!responseText) {
      throw lastError || new Error("Failed to generate response from available AI models.");
    }

    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error: any) {
    console.error("GROQ API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process chat request",
      },
      { status: 500 }
    );
  }
}