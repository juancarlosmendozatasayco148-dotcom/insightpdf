"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { formatFileSize } from "@/lib/utils";

export default function FileUpload() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const selected = acceptedFiles[0];
      if (!selected) return;

      if (!selected.name.endsWith(".pdf")) {
        setError("Solo se aceptan archivos PDF");
        return;
      }

      if (selected.size > 10 * 1024 * 1024) {
        setError("El archivo es demasiado grande. Máximo 10MB");
        return;
      }

      setFile(selected);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al subir el archivo");
      }

      router.push(`/dashboard/${data.id}?fileName=${encodeURIComponent(data.fileName)}&fileUrl=${encodeURIComponent(data.fileUrl)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-indigo-400 bg-indigo-50 scale-[1.02]"
            : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
            isDragActive ? "bg-indigo-100" : "bg-zinc-100"
          }`}>
            <svg className={`w-8 h-8 transition-colors ${
              isDragActive ? "text-indigo-500" : "text-zinc-400"
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className="text-base font-medium text-zinc-900">
              {isDragActive
                ? "Suelta tu PDF aquí"
                : "Arrastra tu PDF o haz clic"}
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              PDF hasta 10MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {file && !uploading && (
        <div className="mt-4 animate-fade-in">
          <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">{file.name}</p>
                <p className="text-xs text-zinc-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleUpload}
            className="mt-3 w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
          >
            Analizar documento
          </button>
        </div>
      )}

      {uploading && (
        <div className="mt-4 p-6 bg-zinc-50 rounded-xl border border-zinc-200 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <div>
              <p className="text-sm font-medium text-zinc-900">Procesando documento...</p>
              <p className="text-xs text-zinc-500">Extrayendo texto con IA</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
