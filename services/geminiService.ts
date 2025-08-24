
import { GoogleGenAI } from "@google/genai";

// Ensure API key is available. In a real app, this would be handled more securely.
if (!process.env.API_KEY) {
    // This is a placeholder for development.
    // In a real deployed app, the environment variable must be set.
    console.warn("API_KEY environment variable not set. Using a placeholder. AI features will fail.");
    process.env.API_KEY = "YOUR_API_KEY_HERE";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProposalSection = async (prompt: string): Promise<string> => {
    try {
        if (process.env.API_KEY === "YOUR_API_KEY_HERE") {
             return new Promise(resolve => setTimeout(() => resolve("Esta es una respuesta de marcador de posición porque la clave API no está configurada. Proporcione un prompt real para obtener una respuesta generada sobre la sección de su propuesta."), 1500));
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Eres un experto redactor de propuestas. Basado en el siguiente prompt, escribe una sección clara, concisa y persuasiva para una propuesta de negocio. El tono debe ser profesional y seguro. Concéntrate solo en el contenido solicitado. No agregues títulos o encabezados a menos que se te pida.

Prompt: "${prompt}"`,
            config: {
                temperature: 0.7,
                topP: 0.9,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Hubo un error al generar el contenido. Por favor, verifica tu clave API e inténtalo de nuevo.";
    }
};