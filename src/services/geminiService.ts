import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function analyzeTranscript(transcript: string, language: string) {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `
            Analyze the following phone call transcript for potential voice cloning scams.
            Transcript: "${transcript}"
            Language: ${language}
            
            Identify if there are any urgency markers, requests for money, OTPs, or sensitive information.
            Return a JSON object with:
            - riskScoreBoost: number (0-20)
            - reasonFlags: string[] (e.g., "urgency", "money_request", "sensitive_info")
            - summary: string
          `
        }]
      }]
    });
    
    const text = result.text;
    
    const jsonMatch = text.match(/\{.*\}/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { riskScoreBoost: 0, reasonFlags: [], summary: "Analysis failed" };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { riskScoreBoost: 0, reasonFlags: [], summary: "Analysis failed" };
  }
}
