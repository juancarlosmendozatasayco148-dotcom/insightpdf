"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
          <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-zinc-500">Cargando documento...</p>
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
      <header className="border-b border-zinc-200 px-6 h-14 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 min-w-0">
          <a href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
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
          <span className="text-sm text-zinc-500 truncate max-w-[240px]">
            {docData.fileName}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-zinc-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView("chat")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeView === "chat"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveView("insights")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeView === "insights"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Resumen
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 min-w-0 border-r border-zinc-200 flex flex-col">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <h2 className="text-sm font-semibold text-zinc-700">
              {docData.fileName}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {docData.text.length.toLocaleString()} caracteres · Vista previa
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <pre className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap font-sans">
              {textPreview}
            </pre>
          </div>
        </div>

        <div className="w-[500px] flex flex-col shrink-0 border-l border-zinc-200">
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
