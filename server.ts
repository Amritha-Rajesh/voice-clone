import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Add CORS/COOP headers to allow Firebase Auth popups
  app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
    next();
  });

  // Gemini AI Setup
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Scam Detection API (using Gemini)
  app.post("/api/analyze-transcript", async (req, res) => {
    try {
      const { transcript, language } = req.body;
      
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
      
      // Basic JSON extraction from markdown if needed
      const jsonMatch = text?.match(/\{.*\}/s);
      const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { riskScoreBoost: 0, reasonFlags: [], summary: "Analysis failed" };

      res.json(analysis);
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze transcript" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
