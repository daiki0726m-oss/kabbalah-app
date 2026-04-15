import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

// Model fallback chain: try each model in order
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

/**
 * Generate content with automatic model fallback on 503/UNAVAILABLE errors
 */
export async function generateWithFallback(params: {
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  jsonMode?: boolean;
}) {
  let lastError: Error | null = null;

  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.prompt,
        config: {
          temperature: params.temperature ?? 0.85,
          maxOutputTokens: params.maxOutputTokens ?? 8192,
          ...(params.jsonMode ? { responseMimeType: 'application/json' } : {}),
        },
      });
      return response;
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${model} failed:`, err.message?.substring(0, 100));
      if (
        err.message?.includes('503') ||
        err.message?.includes('UNAVAILABLE') ||
        err.message?.includes('high demand') ||
        err.message?.includes('overloaded')
      ) {
        continue; // Try next model
      }
      throw err; // Non-503 error, don't retry
    }
  }

  throw lastError || new Error('All models unavailable');
}
