import { api } from "../../../services/api";

/**
 * askRobot
 * Communicates with the RAG API for learning assistance.
 * @param {string} question - The user's query
 * @param {boolean} isVoice - Whether the query is voice-based
 * @returns {Promise<object>} - The bot response
 */
export const askRobot = async (question, isVoice = false) => {
    try {
        const endpoint = isVoice ? "/rag/ask?voice=true" : "/rag/ask";
        const response = await api.post(endpoint, { question });
        return response; // Usually { answer: "..." }
    } catch (error) {
        console.error("Error asking robot:", error);
        throw error;
    }
};
