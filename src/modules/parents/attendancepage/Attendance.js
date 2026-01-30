import { api } from "../../../services/api";

/**
 * Fetches parent attendance analytics from the backend.
 * @param {Object} query - Optional query parameters.
 * @returns {Promise<Array>} - List of attendance analytics records for the parent's children.
 */
export async function getParentAttendanceAnalytics(query = {}) {
    try {
        const response = await api.get("/parents/attendance/analytics", query);
        // Based on the controller, the response is { items: [...] }
        return response.items || [];
    } catch (error) {
        console.error("Error in getParentAttendanceAnalytics:", error);
        throw error;
    }
}
