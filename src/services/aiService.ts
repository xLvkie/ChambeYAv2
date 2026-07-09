import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const aiService = {
  
  // ==========================================
  // FUNCIONALIDAD 1: PARA EL EMPLEADOR
  // ==========================================
  mejorarVacante: async (textoBorrador: string) => {
    try {
      const prompt = `Eres un experto reclutador de recursos humanos en Perú. 
      Mejora el siguiente texto de una oferta de trabajo para que suene profesional, 
      estructurada y atractiva para trabajadores técnicos y operativos. 
      Mantén un tono respetuoso y claro. 
      REGLA ESTRICTA: El resultado DEBE SER MUY CONCISO, máximo 10 lineas. No uses viñetas, solo un párrafo corto.
      Texto original del empleador: "${textoBorrador}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error al mejorar la vacante con IA:", error);
      throw new Error("No se pudo conectar con la IA de Gemini.");
    }
  },

  // ==========================================
  // FUNCIONALIDAD 2: PARA EL POSTULANTE
  // ==========================================
  optimizarPerfil: async (textoBorrador: string) => {
    try {
      const prompt = `Eres un orientador laboral experto. 
      Mejora la siguiente descripción de experiencia laboral de un trabajador técnico/operativo. 
      Resalta sus habilidades, puntualidad y responsabilidad.
      REGLA ESTRICTA: El resultado DEBE SER MUY CONCISO, máximo 5 lineas. No uses viñetas, solo un párrafo corto.
      Texto original: "${textoBorrador}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error al optimizar el perfil con IA:", error);
      throw new Error("No se pudo conectar con la IA de Gemini.");
    }
  }
};