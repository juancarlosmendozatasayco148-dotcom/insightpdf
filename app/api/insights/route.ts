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
  } catch (err: any) {
    console.error("Insights error:", err);
    const status = err.status || 500;
    const isQuota = status === 429 || (err.message || "").includes("429") || (err.message || "").includes("quota") || (err.message || "").includes("RESOURCE_EXHAUSTED");
    if (isQuota) {
      return NextResponse.json({ error: "Límite de cuota de Gemini alcanzado. Espera unos minutos o configura facturación en https://ai.google.dev/pricing" }, { status: 429 });
    }
    return NextResponse.json(
      { error: "Error al extraer insights. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
