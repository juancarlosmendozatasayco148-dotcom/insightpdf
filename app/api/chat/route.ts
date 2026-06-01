import { NextRequest, NextResponse } from "next/server";
import { getModel, generateWithRetry, getChatSystemPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  let bodyRaw: string;
  try {
    bodyRaw = await request.text();
  } catch (err: any) {
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
    const model = getModel();
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

    const result = await generateWithRetry(model, { contents });
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Chat Gemini error:", err.constructor.name, err.message?.slice(0, 500));
    const status = err.status || 500;
    const isQuota = status === 429 || (err.message || "").includes("429") || (err.message || "").includes("quota") || (err.message || "").includes("RESOURCE_EXHAUSTED");
    if (isQuota) {
      return NextResponse.json({ error: "Límite de cuota de Gemini alcanzado. Espera unos minutos o configura facturación en https://ai.google.dev/pricing" }, { status: 429 });
    }
    const isModelError = (err.message || "").includes("not found") || (err.message || "").includes("not supported");
    if (isModelError) {
      return NextResponse.json({ error: "Error: El modelo de IA especificado no está disponible. Contacta al administrador." }, { status: 500 });
    }
    return NextResponse.json({ error: "Error al procesar el mensaje. Intenta de nuevo." }, { status: 500 });
  }
}
