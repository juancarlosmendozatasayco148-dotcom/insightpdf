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
  let bodyRaw: string;

  try {
    bodyRaw = await request.text();
  } catch (err: any) {
    console.error("Chat error reading body:", err.message);
    return NextResponse.json({ error: "Cannot read request body" }, { status: 400 });
  }

  let documentText: string;
  let message: string;
  let history: { role: string; text: string }[] = [];

  try {
    const parsed = JSON.parse(bodyRaw);
    documentText = parsed.documentText;
    message = parsed.message;
    history = parsed.history || [];
  } catch (err: any) {
    console.error("Chat JSON parse error:", err.message, "body start:", bodyRaw.slice(0, 100));
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!documentText || !message) {
    return NextResponse.json({ error: "Missing documentText or message" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
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
      ...history.map((m: { role: string; text: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const result = await model.generateContent({ contents });
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Chat Gemini error:", err.constructor.name, err.message?.slice(0, 500));
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}
