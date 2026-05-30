import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CHAT_SYSTEM_PROMPT = `Eres un asistente de investigación inteligente. Tu función es ayudar al usuario a analizar, comprender y extraer información de documentos PDF.

Normas:
- Responde SIEMPRE en español.
- Sé preciso y conciso.
- Cuando cites información del documento, indica la sección o contexto.
- Si no encuentras la información en el documento, dilo honestamente.
- Usa formato markdown para estructurar tus respuestas (listas, tablas, negritas).
- Para código técnico, usa bloques de código con el lenguaje correspondiente.`;

function getChatSystemPrompt(documentText: string) {
  return `${CHAT_SYSTEM_PROMPT}\n\nContexto del documento:\n\n${documentText}`;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseErr: any) {
      console.error("Chat body parse error:", parseErr.message, "raw:", rawBody.slice(0, 300));
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const { documentText, message, history = [] } = body;

    if (!documentText || !message) {
      return NextResponse.json(
        { error: "Missing documentText or message" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Chat error: GEMINI_API_KEY not configured");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { temperature: 0.4, maxOutputTokens: 8192 },
    });

    const systemPrompt = getChatSystemPrompt(documentText);

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Ok." }] },
      ...history.map((msg: { role: string; text: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    let result;
    try {
      result = await model.generateContent({ contents });
    } catch (geminiErr: any) {
      console.error("Chat error - gemini call failed:", geminiErr.constructor?.name, geminiErr.message?.slice(0, 500));
      console.error("Chat error - status:", geminiErr.status, "statusText:", geminiErr.statusText);
      return NextResponse.json(
        { error: `Gemini error: ${geminiErr.message?.slice(0, 100)}` },
        { status: 500 }
      );
    }

    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Chat error - request parse:", error.constructor?.name, error.message?.slice(0, 500));
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
