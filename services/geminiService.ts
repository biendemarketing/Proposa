import { GoogleGenAI } from "@google/genai";

// Se espera que la clave de API se configure como una variable de entorno `process.env.API_KEY`.
// Inicializaremos el cliente dentro de la función para manejar los posibles errores de la clave de API con elegancia.

export const generateProposalSection = async (prompt: string): Promise<string> => {
    try {
        // Inicializa el cliente aquí para capturar errores de clave de API dentro de esta función.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
        if (error instanceof Error && error.message.includes("API Key")) {
            return "Error de configuración: La clave de API de Gemini no está configurada. Por favor, contacta al administrador para resolver este problema.";
        }
        return "Hubo un error al generar el contenido. Por favor, inténtalo de nuevo más tarde.";
    }
};
