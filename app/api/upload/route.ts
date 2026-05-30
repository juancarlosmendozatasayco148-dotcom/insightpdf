import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum 10MB" },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Store file in Vercel Blob (or locally in dev)
    let fileUrl: string;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`documents/${id}.pdf`, file, {
        access: "public",
      });
      fileUrl = blob.url;
    } else {
      // Dev mode: store in ./public/tmp/
      const fs = require("fs");
      const dir = "./public/tmp";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const filePath = `${dir}/${id}.pdf`;
      fs.writeFileSync(filePath, buffer);
      fileUrl = `/tmp/${id}.pdf`;
    }

    return NextResponse.json({
      id,
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
