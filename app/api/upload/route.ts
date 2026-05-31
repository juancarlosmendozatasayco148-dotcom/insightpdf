import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Solo se aceptan archivos PDF" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 10MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const data = new Uint8Array(bytes);

    let text = await extractWithUnpdf(data);

    if (!text || text.trim().length < 10) {
      text = await extractWithGemini(data);
    }

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        {
          error:
            "No se pudo extraer texto del PDF. El archivo podría ser un documento escaneado. Asegúrate de que tenga texto seleccionable.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      fileName: file.name,
      fileSize: file.size,
      text,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error al procesar el archivo. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

async function extractWithUnpdf(data: Uint8Array): Promise<string | null> {
  try {
    const { text } = await extractText(data, { mergePages: true });
    if (!text) return null;
    return text.trim().length >= 10 ? text : null;
  } catch (err) {
    console.log("unpdf extraction failed, will try Gemini fallback:", (err as Error).message);
    return null;
  }
}

async function extractWithGemini(data: Uint8Array): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: { temperature: 0.1, maxOutputTokens: 8192 },
    });

    const base64Data = Buffer.from(data).toString("base64");
    const result = await model.generateContent([
      {
        inlineData: { mimeType: "application/pdf", data: base64Data },
      },
      { text: "Extrae TODO el texto de este documento PDF. Devuelve SOLO el texto completo, sin añadir explicaciones, comentarios ni formato adicional. Respeta el idioma original del documento." },
    ]);

    const extracted = result.response.text();
    console.log("Gemini OCR extracted", extracted?.length ?? 0, "chars");
    return extracted && extracted.trim().length >= 10 ? extracted : null;
  } catch (err) {
    console.error("Gemini extraction failed:", err);
    return null;
  }
}
