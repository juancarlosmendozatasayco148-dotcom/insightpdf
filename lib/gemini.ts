import OpenAI from "openai";

interface AIProvider {
  name: string;
  client: OpenAI | null;
  model: string;
}

const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.AI_API_KEY;
const groqKey = process.env.GROQ_API_KEY;

const providers: AIProvider[] = [];

if (openrouterKey) {
  providers.push({
    name: "OpenRouter",
    client: new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: openrouterKey,
      defaultHeaders: {
        "HTTP-Referer": process.env.APP_URL || "https://insightpdf.app",
        "X-Title": "InsightPDF",
      },
    }),
    model: process.env.AI_MODEL || "google/gemini-2.5-flash:free",
  });
}

if (groqKey) {
  providers.push({
    name: "Groq",
    client: new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: groqKey,
    }),
    model: "llama-3.3-70b-versatile",
  });
}

if (providers.length === 0) {
  console.warn(
    "No AI API key configured. Set OPENROUTER_API_KEY (recomendado) o GROQ_API_KEY en .env"
  );
}

async function tryProvider(
  provider: AIProvider,
  messages: { role: string; content: string }[]
): Promise<string | null> {
  if (!provider.client) return null;
  try {
    const response = await provider.client.chat.completions.create({
      model: provider.model,
      messages: messages as any,
      temperature: 0.4,
      max_tokens: 8192,
    });
    return response.choices[0]?.message?.content || "";
  } catch (err: any) {
    const isQuota =
      err.status === 429 ||
      (err.message || "").includes("429") ||
      (err.message || "").includes("quota") ||
      (err.message || "").includes("RESOURCE_EXHAUSTED");
    if (isQuota) {
      console.log(`${provider.name} quota exhausted, trying next provider`);
      return null;
    }
    throw err;
  }
}

export async function generateText(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  if (providers.length === 0) throw new Error("No AI API key configured");

  const messages: { role: string; content: string }[] = [];
  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  for (const provider of providers) {
    const result = await tryProvider(provider, messages);
    if (result !== null) return result;
  }

  throw Object.assign(new Error("Límite de cuota alcanzado en todos los proveedores. Espera unos minutos."), { status: 429 });
}

export async function generateChat(
  messages: { role: string; content: string }[]
): Promise<string> {
  if (providers.length === 0) throw new Error("No AI API key configured");

  for (const provider of providers) {
    const result = await tryProvider(provider, messages);
    if (result !== null) return result;
  }

  throw Object.assign(new Error("Límite de cuota alcanzado en todos los proveedores. Espera unos minutos."), { status: 429 });
}

export async function generateWithRetry(
  fn: () => Promise<string>,
  maxRetries = 3
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
      const delay = Math.min(1000 * Math.pow(2, attempt), 15000);
      console.log(
        `Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Unexpected: all retries exhausted");
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
