import { NextRequest, NextResponse } from "next/server";
import { generateWithRetry, generateChat, getChatSystemPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  let bodyRaw: string;
  try {
    bodyRaw = await request.text();
  } catch {
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
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!documentText || !message) {
    return NextResponse.json({ error: "Missing documentText or message" }, { status: 400 });
  }

  try {
    const systemPrompt = getChatSystemPrompt(documentText);

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((m: { role: string; text: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const text = await generateWithRetry(() => generateChat(messages));

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Chat AI error:", err.constructor.name, err.message?.slice(0, 500));
    const status = err.status || 500;
    const isQuota =
      status === 429 ||
      (err.message || "").includes("429") ||
      (err.message || "").includes("quota") ||
      (err.message || "").includes("RESOURCE_EXHAUSTED");
    if (isQuota) {
      return NextResponse.json(
        {
          error:
            "Límite de cuota alcanzado. Espera unos minutos u obtén una API key gratuita en https://openrouter.ai",
        },
        { status: 429 }
      );
    }
    if ((err.message || "").includes("No AI API key configured")) {
      return NextResponse.json(
        {
          error:
            "No hay API key configurada. El administrador debe configurar OPENROUTER_API_KEY o GROQ_API_KEY en las variables de entorno de Vercel.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Error al procesar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
