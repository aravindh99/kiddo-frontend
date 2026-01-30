import { api } from "../../../services/api";

/**
 * Fetches teacher attendance analytics from the backend.
 * @param {Object} query - Optional query parameters like class_id, section_id, or date.
 * @returns {Promise<Array>} - List of attendance analytics records.
 */
export async function getTeacherAttendanceAnalytics(query = {}) {
    try {
        const response = await api.get("/teachers/attendance/analytics", query);
        // Based on the controller, the response is { items: [...] }
        return response.items || [];
    } catch (error) {
        console.error("Error in getTeacherAttendanceAnalytics:", error);
        throw error;
    }
}
