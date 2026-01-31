
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with process.env.API_KEY directly as per guidelines.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const askTux = async (prompt: string, history: {role: string, content: string}[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are Tux, the wise and helpful Linux mascot. You are an expert systems administrator and a librarian of the Linux Documentation Project (TLDP). Your goal is to provide accurate, helpful, and concise information about Linux. Use a friendly, slightly authoritative but encouraging tone. Use googleSearch to find real-time info if needed.",
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text || "I'm sorry, my penguin brain hit a kernel panic.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'External Resource',
      uri: chunk.web?.uri || '#'
    })) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Connection error. Check your network routing.", sources: [] };
  }
};

export interface SearchResult {
  relevantIds: string[];
  explanation: string;
}

export const searchDocsAI = async (query: string, availableDocs: any[]): Promise<SearchResult> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is searching for: "${query}". Based on the following document titles and summaries, return a JSON list of IDs for the top relevant documents, ranked by relevance, and a short explanation of why these were chosen.
      Docs: ${JSON.stringify(availableDocs.map(d => ({id: d.id, title: d.title, summary: d.summary})))}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            relevantIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            explanation: { type: Type.STRING }
          },
          required: ["relevantIds", "explanation"]
        }
      }
    });

    const data = JSON.parse(response.text || '{"relevantIds": [], "explanation": ""}');
    return data;
  } catch (error) {
    return { relevantIds: [], explanation: "Search indexing currently offline." };
  }
};

export const executeSimulatedCommand = async (command: string, history: string[]) => {
  const ai = getAI();
  try {
    // Upgrading to gemini-3-pro-preview for complex terminal simulation tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Simulate a Linux terminal (Ubuntu 24.04 style). The user entered: "${command}". 
      Previous context: ${history.join('\n')}.
      Provide the realistic terminal output (stdout/stderr). 
      If it's 'ls', show realistic file structure. If 'whoami', return 'tux'.
      Be concise. Only return the shell output.`,
      config: {
        systemInstruction: "You are a bash shell running on a modern Linux distribution. Return only the command output, no conversational text.",
      },
    });
    return response.text || "bash: command not found";
  } catch (error) {
    return "Error connecting to virtual terminal.";
  }
};

export const summarizeArticle = async (title: string, summary: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this Linux documentation titled "${title}". Use bullet points for key takeaways and "Tux's Pro Tip".
      Context: ${summary}`,
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    return "Failed to generate AI insights.";
  }
};
