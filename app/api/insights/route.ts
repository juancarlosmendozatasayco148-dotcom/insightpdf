import { NextRequest, NextResponse } from "next/server";
import { getModel, getInsightsPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { documentText } = await request.json();

    if (!documentText) {
      return NextResponse.json(
        { error: "Missing documentText" },
        { status: 400 }
      );
    }

    const model = getModel();

    const prompt = getInsightsPrompt(documentText);
    const result = await model.generateContent(prompt);
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
