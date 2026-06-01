import OpenAI from "openai";

const apiKey = process.env.AI_API_KEY;

if (!apiKey) {
  console.warn("AI_API_KEY not configured");
}

const client = apiKey
  ? new OpenAI({
      baseURL: process.env.AI_BASE_URL || "https://openrouter.ai/api/v1",
      apiKey,
      defaultHeaders: {
        "HTTP-Referer": process.env.APP_URL || "https://insightpdf.app",
        "X-Title": "InsightPDF",
      },
    })
  : null;

const defaultModel = process.env.AI_MODEL || "google/gemini-2.5-flash";

export async function generateText(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  if (!client) throw new Error("AI_API_KEY not configured");

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [];
  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  const response = await client.chat.completions.create({
    model: defaultModel,
    messages,
    temperature: 0.4,
    max_tokens: 8192,
  });

  return response.choices[0]?.message?.content || "";
}

export async function generateChat(
  messages: { role: string; content: string }[]
): Promise<string> {
  if (!client) throw new Error("AI_API_KEY not configured");

  const response = await client.chat.completions.create({
    model: defaultModel,
    messages: messages as any,
    temperature: 0.4,
    max_tokens: 8192,
  });

  return response.choices[0]?.message?.content || "";
}

export async function generateWithRetry(
  fn: () => Promise<string>,
  maxRetries = 5
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      const isQuota =
        err.status === 429 ||
        (err.message || "").includes("429") ||
        (err.message || "").includes("quota");
      if (!isQuota || attempt === maxRetries - 1) throw err;
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
      console.log(
        `AI rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Unexpected: all retries exhausted without result or error");
}

const CHAT_SYSTEM_PROMPT = `Eres un asistente de investigación inteligente. Tu función es ayudar al usuario a analizar, comprender y extraer información de documentos PDF.

Normas:
- Responde SIEMPRE en español.
- Sé preciso y conciso.
- Cuando cites información del documento, indica la sección o contexto.
- Si no encuentras la información en el documento, dilo honestamente.
- Usa formato markdown para estructurar tus respuestas (listas, tablas, negritas).
- Para código técnico, usa bloques de código con el lenguaje correspondiente.`;

export function getChatSystemPrompt(documentText: string) {
  return `${CHAT_SYSTEM_PROMPT}\n\nContexto del documento:\n\n${documentText}`;
}

export function getSummaryPrompt(
  documentText: string,
  level: "short" | "medium" | "detailed"
) {
  const instructions = {
    short:
      "Genera un resumen MUY breve de 1-2 párrafos con las ideas principales.",
    medium:
      "Genera un resumen de extensión media (3-5 párrafos) cubriendo los puntos clave, estructura y conclusiones principales.",
    detailed:
      "Genera un resumen detallado que incluya: introducción, metodología (si aplica), hallazgos principales, conclusiones y recomendaciones. Estructura con secciones y viñetas.",
  };

  return `${instructions[level]}

Documento:
${documentText}

Responde en español, usando formato markdown.`;
}

export function getInsightsPrompt(documentText: string) {
  return `Analiza el siguiente documento y extrae:

1. **Conceptos clave** (máximo 5) - Los conceptos más importantes con breve explicación.
2. **Conexiones** - Relaciones entre ideas o conceptos dentro del documento.
3. **Preguntas frecuentes** - 3-5 preguntas que este documento responde.
4. **Datos relevantes** - Cifras, estadísticas o fechas importantes.
5. **Conclusión principal** - En una frase.

Documento:
${documentText}

Formatea la respuesta en markdown con emojis para cada sección.
Responde en español.`;
}
