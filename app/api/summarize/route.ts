import { NextRequest, NextResponse } from "next/server";
import { getModel, getSummaryPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { documentText, level = "medium" } = await request.json();

    if (!documentText) {
      return NextResponse.json(
        { error: "Missing documentText" },
        { status: 400 }
      );
    }

    const model = getModel();

    const prompt = getSummaryPrompt(documentText, level as "short" | "medium" | "detailed");
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Summary error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
