
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExecutiveSummary = async (episodeTitle: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a premium executive summary for a business podcast titled "${episodeTitle}". 
      Context: ${description}. 
      Format the output with key takeaways, action items, and a strategic outlook.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Summary currently unavailable. Please try again later.";
  }
};

export const generateTranscript = async (episodeTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Simulate a detailed professional transcript for the podcast episode: "${episodeTitle}". 
      The transcript should feel corporate, including timestamps and speaker names (Host: Dr. Ricardo Ginga and Guest).`,
      config: {
        temperature: 0.5,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Transcript Error:", error);
    return "Transcript generation failed.";
  }
};
