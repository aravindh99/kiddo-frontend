import { api } from "../../../services/api";

export const fetchGroupChats = async () => {
    try {
        const response = await api.get("/group-chat");
        return response.data;
    } catch (error) {
        console.error("Error fetching group chats:", error);
        throw error;
    }
};

export const fetchChatMessages = async (chatId) => {
    try {
        const response = await api.get(`/group-chat/${chatId}/messages`);
        return response.data;
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        throw error;
    }
};
