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
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}
