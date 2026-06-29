"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Chat from "@/components/chat";
import InsightsPanel from "@/components/insights-panel";

interface DocData {
  fileName: string;
  text: string;
}

export default function DashboardPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [docData, setDocData] = useState<DocData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"chat" | "insights">("chat");
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(`doc_${id}`);
      if (!stored) {
        router.replace("/");
        return;
      }
      setDocData(JSON.parse(stored));
    } catch {
      router.replace("/");
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-stone-500">Cargando documento...</p>
        </div>
      </div>
    );
  }

  if (!docData) return null;

  const textPreview =
    docData.text.length > 1500
      ? docData.text.slice(0, 1500) + "..."
      : docData.text;

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="border-b border-stone-200 px-4 sm:px-6 h-14 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-black hidden sm:inline" style={{ fontFamily: "'Playfair Display', serif" }}>
              InsightPDF
            </span>
          </Link>
          <span className="text-stone-300 hidden sm:inline shrink-0">/</span>
          <span className="text-sm text-stone-500 truncate max-w-[120px] sm:max-w-[240px]">
            {docData.fileName}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-700 border border-stone-300 hover:border-black rounded transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {showPreview ? "Ocultar" : "Vista previa"}
          </button>
          <div className="flex border border-stone-300 rounded">
            <button
              onClick={() => setActiveView("chat")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeView === "chat"
                  ? "bg-black text-white"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveView("insights")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeView === "insights"
                  ? "bg-black text-white"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Resumen
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {showPreview && (
          <div className="hidden lg:flex flex-col w-1/3 min-w-0 border-r border-stone-200">
            <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
              <h2 className="text-sm font-semibold text-black">
                {docData.fileName}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {docData.text.length.toLocaleString()} caracteres · Vista previa
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap font-sans">
                {textPreview}
              </pre>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          {activeView === "chat" ? (
            <Chat documentText={docData.text} />
          ) : (
            <InsightsPanel documentText={docData.text} />
          )}
        </div>
      </div>
    </div>
  );
}
