import { NextRequest, NextResponse } from "next/server";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import path from "path";

try {
  const workerPath = path.join(
    process.cwd(),
    "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"
  );
  pdfjs.GlobalWorkerOptions.workerSrc = `file://${workerPath}`;
} catch {
  console.warn("Could not set pdfjs worker path");
}

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
    let pageCount = 0;
    try {
      const loadingTask = pdfjs.getDocument({ data });
      const doc = await loadingTask.promise;
      pageCount = doc.numPages;

      const textParts: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .filter((item) => "str" in item)
          .map((item) => (item as { str: string }).str)
          .join(" ");
        textParts.push(pageText);
      }

      text = textParts.join("\n");
      await doc.destroy();
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
      pageCount,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error al procesar el archivo. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
