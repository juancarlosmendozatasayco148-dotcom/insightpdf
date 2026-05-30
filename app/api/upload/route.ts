import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

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
    const buffer = Buffer.from(bytes);

    let text: string;
    try {
      text = await new Promise<string>((resolve, reject) => {
        const parser = new PDFParser();

        parser.on("pdfParser_dataReady", () => {
          try {
            const rawText = parser.getRawTextContent();
            parser.destroy();
            resolve(rawText);
          } catch (err) {
            parser.destroy();
            reject(err);
          }
        });

        parser.on("pdfParser_dataError", (errData: unknown) => {
          parser.destroy();
          const msg =
            errData && typeof errData === "object" && "parserError" in errData
              ? String((errData as { parserError: Error }).parserError)
              : "Error al procesar el PDF";
          reject(new Error(msg));
        });

        parser.parseBuffer(buffer);
      });
    } catch (err) {
      console.error("PDF parse error:", err);
      return NextResponse.json(
        {
          error:
            "No se pudo procesar el PDF. Verifica que el archivo no esté dañado o protegido con contraseña.",
        },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        {
          error:
            "No se pudo extraer texto del PDF. El archivo podría ser un documento escaneado (imágenes sin texto seleccionable).",
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
