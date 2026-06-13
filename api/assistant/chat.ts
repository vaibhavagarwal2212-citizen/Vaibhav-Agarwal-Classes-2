import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return res.status(200).json({
      reply: response.text || "No response generated.",
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      reply: "AI Assistant is temporarily unavailable.",
    });
  }
}