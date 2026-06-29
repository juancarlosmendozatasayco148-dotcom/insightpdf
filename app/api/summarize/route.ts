import { NextRequest, NextResponse } from "next/server";
import { generateWithRetry, generateText, getSummaryPrompt } from "@/lib/gemini";

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

    const prompt = getSummaryPrompt(documentText, level as "short" | "medium" | "detailed");
    const text = await generateWithRetry(() => generateText(prompt));

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Summary error:", err);
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
      { error: "Error al generar el resumen. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
