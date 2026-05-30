import { NextRequest, NextResponse } from "next/server";
import { getModel, getChatSystemPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { documentText, message, history = [] } = await request.json();

    if (!documentText || !message) {
      return NextResponse.json(
        { error: "Missing documentText or message" },
        { status: 400 }
      );
    }

    const model = getModel();
    const systemPrompt = getChatSystemPrompt(documentText);

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido. Estoy listo para analizar el documento." }],
        },
        ...history.map((msg: { role: string; text: string }) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.text }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
