import { api } from "../../../services/api";

export const fetchHomework = async (params = {}) => {
    try {
        const response = await api.get("/homework", params);
        return response.data;
    } catch (error) {
        console.error("Error fetching homework:", error);
        throw error;
    }
};

export const submitHomework = async (homeworkId, payload) => {
    try {
        const response = await api.post(`/homework/${homeworkId}/submit`, payload);
        return response.data;
    } catch (error) {
        console.error("Error submitting homework:", error);
        throw error;
    }
};
