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
  const [summaryLevel, setSummaryLevel] = useState<"short" | "medium" | "detailed">("medium");
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
    <div className="h-full flex flex-col">
      <div className="flex border-b border-zinc-200">
        <button
          onClick={() => setActiveTab("summary")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "summary"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          Resumen
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "insights"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          Insights
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "summary" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["short", "medium", "detailed"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => generateSummary(level)}
                  disabled={loading === "summary"}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    summaryLevel === level && summary
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
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
              <div className="flex items-center gap-3 p-4">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-zinc-500">Generando resumen...</span>
              </div>
            ) : summary ? (
              <div className="prose prose-sm max-w-none prose-zinc prose-headings:text-zinc-900">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {summary}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-zinc-400">
                  Selecciona un nivel para generar el resumen
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-4">
            {!insights && !loading ? (
              <div className="text-center py-8">
                <button
                  onClick={generateInsights}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Extraer insights
                </button>
              </div>
            ) : loading === "insights" ? (
              <div className="flex items-center gap-3 p-4">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-zinc-500">Extrayendo insights...</span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none prose-zinc prose-headings:text-zinc-900">
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
