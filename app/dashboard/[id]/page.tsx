"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import Chat from "@/components/chat";
import InsightsPanel from "@/components/insights-panel";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName") || "Documento";
  const fileUrl = searchParams.get("fileUrl") || "";

  const [documentText, setDocumentText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"chat" | "insights">("chat");

  useEffect(() => {
    async function extractText() {
      try {
        const res = await fetch("/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileUrl }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error al extraer texto");
        }

        setDocumentText(data.text);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al procesar el documento"
        );
      } finally {
        setLoading(false);
      }
    }

    if (fileUrl) {
      extractText();
    } else {
      setLoading(false);
      setError("No se encontró el archivo.");
    }
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-zinc-500">
            Extrayendo texto del documento...
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Esto puede tomar unos segundos
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">
            Error al procesar
          </h2>
          <p className="text-sm text-zinc-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="border-b border-zinc-200 px-6 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              InsightPDF
            </span>
          </a>
          <span className="text-zinc-300 shrink-0">/</span>
          <span className="text-sm text-zinc-500 truncate">{fileName}</span>
        </div>
        <div className="flex gap-1 bg-zinc-100 rounded-lg p-1">
          {[
            { key: "chat", label: "Chat" },
            { key: "insights", label: "Resumen" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key as "chat" | "insights")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeView === tab.key
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0 border-r border-zinc-200">
          <div className="flex-1 overflow-hidden bg-zinc-50 flex items-center justify-center">
            {fileUrl ? (
              <iframe
                src={fileUrl}
                className="w-full h-full"
                title={fileName}
              />
            ) : (
              <p className="text-sm text-zinc-400">
                Vista previa no disponible
              </p>
            )}
          </div>
        </div>

        <div className="w-[480px] flex flex-col shrink-0">
          {activeView === "chat" && documentText ? (
            <Chat documentText={documentText} />
          ) : activeView === "insights" && documentText ? (
            <InsightsPanel documentText={documentText} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
