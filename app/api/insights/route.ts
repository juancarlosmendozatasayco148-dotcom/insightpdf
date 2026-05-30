import { NextRequest, NextResponse } from "next/server";
import { getModel, generateWithRetry, getInsightsPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    const { documentText } = JSON.parse(raw);

    if (!documentText) {
      return NextResponse.json(
        { error: "Missing documentText" },
        { status: 400 }
      );
    }

    const model = getModel();
    const prompt = getInsightsPrompt(documentText);
    const result = await generateWithRetry(model, prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Insights error:", error);
    return NextResponse.json(
      { error: "Failed to extract insights" },
      { status: 500 }
    );
  }
}
