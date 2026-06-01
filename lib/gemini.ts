import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY not configured");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const generationConfig = {
  temperature: 0.4,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export function getModel() {
  if (!genAI) throw new Error("Gemini API key not configured");
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig,
  });
}

export async function generateWithRetry(
  model: ReturnType<typeof getModel>,
  request: { contents: { role: string; parts: { text: string }[] }[] } | string,
  maxRetries = 5
): Promise<{ response: { text: () => string } }> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = typeof request === "string"
        ? await model.generateContent(request)
        : await model.generateContent(request);
      return result;
    } catch (err: any) {
      const isQuota = err.status === 429 || (err.message || "").includes("429") || (err.message || "").includes("quota");
      if (!isQuota || attempt === maxRetries - 1) throw err;
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
      console.log(`Gemini quota exceeded, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Unexpected: all retries exhausted without result or error");
}

export function getEmbeddingModel() {
  if (!genAI) throw new Error("Gemini API key not configured");
  return genAI.getGenerativeModel({ model: "text-embedding-004" });
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

export function getSummaryPrompt(documentText: string, level: "short" | "medium" | "detailed") {
  const instructions = {
    short: "Genera un resumen MUY breve de 1-2 párrafos con las ideas principales.",
    medium: "Genera un resumen de extensión media (3-5 párrafos) cubriendo los puntos clave, estructura y conclusiones principales.",
    detailed: "Genera un resumen detallado que incluya: introducción, metodología (si aplica), hallazgos principales, conclusiones y recomendaciones. Estructura con secciones y viñetas.",
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
