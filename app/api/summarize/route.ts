import { NextRequest, NextResponse } from "next/server";
import { getModel, generateWithRetry, getSummaryPrompt } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    const { documentText, level = "medium" } = JSON.parse(raw);

    if (!documentText) {
      return NextResponse.json(
        { error: "Missing documentText" },
        { status: 400 }
      );
    }

    const model = getModel();
    const prompt = getSummaryPrompt(documentText, level as "short" | "medium" | "detailed");
    const result = await generateWithRetry(model, prompt);
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
