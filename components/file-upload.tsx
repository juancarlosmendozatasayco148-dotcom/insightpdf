"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { formatFileSize } from "@/lib/utils";

export default function FileUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  });

  useEffect(() => {
    if (window.location.hash === "#upload") {
      setTimeout(() => inputRef.current?.click(), 500);
    }
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    setUploadProgress("Extrayendo texto con IA...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir el archivo");
      const id = crypto.randomUUID();
      sessionStorage.setItem(
        `doc_${id}`,
        JSON.stringify({ fileName: data.fileName, text: data.text })
      );
      setUploadProgress("Redirigiendo...");
      router.push(`/dashboard/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir el archivo");
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  };

  const isActive = isDragActive || dragOver;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed p-16 text-center cursor-pointer transition-all duration-300 ${
          isActive
            ? "border-black bg-stone-50 scale-[1.01]"
            : "border-stone-300 hover:border-black hover:bg-stone-50"
        } ${error ? "border-red-400" : ""}`}
      >
        <input ref={inputRef} {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className={`w-14 h-14 rounded border flex items-center justify-center transition-all duration-300 ${
            isActive
              ? "bg-black text-white border-black scale-110"
              : "bg-white text-stone-400 border-stone-300 hover:border-black"
          }`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isActive ? "text-black" : "text-stone-600"
            }`}>
              {isActive
                ? "Suelta tu PDF aquí"
                : "Arrastra tu PDF o haz clic"}
            </p>
            <p className="text-xs text-stone-400 mt-1">PDF hasta 10MB</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-stone-50 border border-stone-200 text-sm text-stone-600 animate-fade-in">
          {error}
        </div>
      )}

      {file && !uploading && (
        <div className="mt-5 animate-scale-in">
          <div className="flex items-center justify-between p-4 border border-stone-200">
            <div className="flex items-center gap-3 min-w-0">
              <svg className="w-5 h-5 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <div className="min-w-0">
                <p className="text-sm font-medium text-black truncate">{file.name}</p>
                <p className="text-xs text-stone-400">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="text-stone-400 hover:text-black transition-colors p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleUpload}
            className="mt-3 w-full py-3 px-6 text-sm bg-black text-white hover:bg-stone-800 transition-all duration-300 active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Analizar documento
            </span>
          </button>
        </div>
      )}

      {uploading && (
        <div className="mt-5 p-5 border border-stone-200 bg-stone-50 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-black">Procesando documento...</p>
              <p className="text-xs text-stone-400 mt-0.5">{uploadProgress}</p>
              <div className="mt-2 h-1 bg-stone-200 overflow-hidden">
                <div className="h-full w-1/4 bg-black rounded-full animate-progress" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
