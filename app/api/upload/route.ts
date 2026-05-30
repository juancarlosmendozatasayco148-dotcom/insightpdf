import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

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

    let text: string;
    try {
      const { text: pages } = await extractText(data, { mergePages: true });
      text = typeof pages === "string" ? pages : Array.isArray(pages) ? pages.join("\n") : String(pages);
    } catch (err) {
      console.error("PDF extract error:", err);
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
