"use client";

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface ChatProps {
  documentText: string;
}

const suggestions = [
  "¿Cuál es el tema principal del documento?",
  "Resume los puntos clave",
  "¿Qué conclusiones presenta?",
];

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [code]);
  return (
    <button
      onClick={handleCopy}
      className="copy-button absolute top-2 right-2 p-1.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-500 hover:text-stone-700 transition-all duration-200"
      title="Copiar código"
    >
      {copied ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      )}
    </button>
  );
}

export default function Chat({ documentText }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText, message: userMessage, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setMessages((prev) => [...prev, { role: "assistant", text: data.text }]);
    } catch (err: any) {
      const errorMsg = err?.message || "Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo.";
      setMessages((prev) => [...prev, { role: "assistant", text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-stone-200">
        <h2 className="text-sm font-semibold text-black">Chat con IA</h2>
        <p className="text-xs text-stone-400 mt-0.5">Pregunta sobre el contenido del documento</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-xs">
              <p className="text-sm text-stone-500 mb-4">Haz preguntas sobre el documento. Por ejemplo:</p>
              <div className="space-y-2">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-stone-600 border border-stone-200 hover:border-black transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex items-start gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
              msg.role === "user" ? "bg-black text-white" : "bg-stone-200 text-stone-500"
            }`}>
              {msg.role === "user" ? "T" : "AI"}
            </div>
            <div className={`max-w-[85%] rounded px-4 py-3 transition-all duration-300 ${
              msg.role === "user" ? "bg-black text-white" : "bg-stone-50 border border-stone-200 text-black"
            }`}>
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none prose-zinc prose-headings:text-black prose-a:text-stone-600 prose-code:text-stone-600 prose-code:bg-stone-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-stone-50 prose-pre:border prose-pre:border-stone-200 prose-pre:text-black prose-pre:relative">
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      pre: ({ children, ...props }) => (
                        <pre {...props} className="relative group">{children}<CopyButton code={extractCodeFromChildren(children)} /></pre>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold shrink-0">AI</div>
            <div className="bg-stone-50 border border-stone-200 rounded px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-stone-400 rounded-full typing-dot" />
                <div className="w-2 h-2 bg-stone-400 rounded-full typing-dot" />
                <div className="w-2 h-2 bg-stone-400 rounded-full typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-stone-200 p-4 bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta sobre el documento..."
            rows={1}
            className="flex-1 resize-none border border-stone-300 px-4 py-3 text-sm outline-none focus:border-black transition-all duration-200"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="shrink-0 w-10 h-10 bg-black hover:bg-stone-800 disabled:bg-stone-300 text-white flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 text-xs text-stone-400">Enter para enviar · Shift+Enter para nueva línea</p>
      </div>
    </div>
  );
}

function extractCodeFromChildren(children: React.ReactNode): string {
  const code = (children as any)?.[1]?.props?.children?.[0] ?? "";
  return typeof code === "string" ? code : "";
}
