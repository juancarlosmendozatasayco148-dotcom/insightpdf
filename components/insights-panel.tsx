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

  const generateSummary = async (level: "short" | "medium" | "detailed") => {
    setSummaryLevel(level);
    setLoading("summary");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText, level }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al generar el resumen.");
      setSummary(data.text);
    } catch (err: any) {
      setSummary(err?.message || "Error al generar el resumen.");
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
      if (!res.ok) throw new Error(data.error || "Error al extraer insights.");
      setInsights(data.text);
    } catch (err: any) {
      setInsights(err?.message || "Error al extraer insights.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-stone-200">
        <h2 className="text-sm font-semibold text-black">Resumen e Insights</h2>
        <p className="text-xs text-stone-400 mt-0.5">Analiza el documento con IA</p>
      </div>

      <div className="flex border-b border-stone-200 px-5">
        <button
          onClick={() => setActiveTab("summary")}
          className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === "summary"
              ? "text-black border-black"
              : "text-stone-500 hover:text-stone-700 border-transparent"
          }`}
        >
          Resumen
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === "insights"
              ? "text-black border-black"
              : "text-stone-500 hover:text-stone-700 border-transparent"
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
                  className={`px-3 py-1.5 text-xs font-medium transition-all border ${
                    summaryLevel === level && summary
                      ? "bg-black text-white border-black"
                      : "bg-white text-stone-600 border-stone-300 hover:border-black"
                  } disabled:opacity-50`}
                >
                  {level === "short" ? "Corto" : level === "medium" ? "Medio" : "Detallado"}
                </button>
              ))}
            </div>

            {loading === "summary" ? (
              <div className="flex items-center gap-3 p-6 border border-stone-200">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-stone-500">Generando resumen...</span>
              </div>
            ) : summary ? (
              <div className="prose prose-sm max-w-none prose-zinc prose-headings:text-black prose-a:text-stone-600 prose-code:text-stone-600 prose-code:bg-stone-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {summary}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-stone-500 mb-4">Selecciona un nivel para generar el resumen</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-4">
            {!insights && !loading ? (
              <div className="text-center py-12">
                <p className="text-sm text-stone-500 mb-4">Extrae conceptos clave, conexiones y más</p>
                <button
                  onClick={generateInsights}
                  className="px-5 py-2.5 text-sm bg-black text-white rounded hover:bg-stone-800 transition-colors"
                >
                  Extraer insights
                </button>
              </div>
            ) : loading === "insights" ? (
              <div className="flex items-center gap-3 p-6 border border-stone-200">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-stone-500">Extrayendo insights...</span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none prose-zinc prose-headings:text-black prose-a:text-stone-600">
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
