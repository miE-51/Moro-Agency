
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuoteAssistance = async (requirements: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User wants a digital project with these requirements: "${requirements}". 
      Based on our agency services (Bot Development, Web Design, Video Editing), 
      analyze the complexity and suggest a package. Return a summary for the user.`,
      config: {
        systemInstruction: "You are an expert sales consultant for Moro Digital Agency. Be professional, encouraging, and clear.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I couldn't generate a personalized summary right now, but feel free to browse our standard pricing below.";
  }
};

export const refineProjectTitle = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Give me a catchy 3-4 word project title for: ${description}`,
    });
    return response.text?.replace(/"/g, '') || "New Project";
  } catch (error) {
    return "Custom Project";
  }
};
