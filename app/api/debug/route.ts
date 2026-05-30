export async function GET() {
  const key = process.env.GEMINI_API_KEY || 'not set';
  return Response.json({ 
    prefix: key.slice(0, 6),
    length: key.length,
    startsWithAIza: key.startsWith('AIza'),
  });
}
