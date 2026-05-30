"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface InsightsPanelProps {
  documentText: string;
}

type Tab = "summary" | "insights";

export default function InsightsPanel({ documentText }: InsightsPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [summaryLevel, setSummaryLevel] = useState<
    "short" | "medium" | "detailed"
  >("medium");
  const [summary, setSummary] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState<"summary" | "insights" | null>(null);

  const generateSummary = async (
    level: "short" | "medium" | "detailed"
  ) => {
    setSummaryLevel(level);
    setLoading("summary");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText, level }),
      });
      const data = await res.json();
      setSummary(data.text);
    } catch {
      setSummary("Error al generar el resumen.");
    } finally {
      setLoading(null);
    }
  };

  const generateInsights = async () => {
    setLoading("insights");
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText }),
      });
      const data = await res.json();
      setInsights(data.text);
    } catch {
      setInsights("Error al extraer insights.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-zinc-100">
        <h2 className="text-sm font-semibold text-zinc-900">
          Resumen e Insights
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Analiza el documento con IA
        </p>
      </div>

      <div className="flex border-b border-zinc-100 px-5">
        <button
          onClick={() => setActiveTab("summary")}
          className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === "summary"
              ? "text-indigo-600 border-indigo-600"
              : "text-zinc-500 hover:text-zinc-700 border-transparent"
          }`}
        >
          Resumen
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === "insights"
              ? "text-indigo-600 border-indigo-600"
              : "text-zinc-500 hover:text-zinc-700 border-transparent"
          }`}
        >
          Insights
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activeTab === "summary" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["short", "medium", "detailed"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => generateSummary(level)}
                  disabled={loading === "summary"}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    summaryLevel === level && summary
                      ? "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  } disabled:opacity-50`}
                >
                  {level === "short"
                    ? "Corto"
                    : level === "medium"
                      ? "Medio"
                      : "Detallado"}
                </button>
              ))}
            </div>

            {loading === "summary" ? (
              <div className="flex items-center gap-3 p-6 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-zinc-500">
                  Generando resumen...
                </span>
              </div>
            ) : summary ? (
              <div className="prose prose-sm max-w-none prose-zinc prose-headings:text-zinc-800 prose-a:text-indigo-600 prose-code:text-indigo-600 prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {summary}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                    />
                  </svg>
                </div>
                <p className="text-sm text-zinc-500 mb-4">
                  Selecciona un nivel para generar el resumen
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-4">
            {!insights && !loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-zinc-500 mb-4">
                  Extrae conceptos clave, conexiones y más
                </p>
                <button
                  onClick={generateInsights}
                  className="px-5 py-2.5 bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-indigo-200/50 active:scale-95"
                >
                  Extraer insights
                </button>
              </div>
            ) : loading === "insights" ? (
              <div className="flex items-center gap-3 p-6 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-zinc-500">
                  Extrayendo insights...
                </span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none prose-zinc prose-headings:text-zinc-800 prose-a:text-indigo-600">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {insights!}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
