import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fileUrl } = await request.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "Missing fileUrl" },
        { status: 400 }
      );
    }

    // Download the PDF
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch PDF");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text with pdf-parse
    const pdf = require("pdf-parse");
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF. El archivo podría estar escaneado o ser una imagen." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      text: data.text,
      pageCount: data.numpages,
      info: data.info,
    });
  } catch (error) {
    console.error("Extract error:", error);
    return NextResponse.json(
      { error: "Failed to extract text from PDF" },
      { status: 500 }
    );
  }
}
