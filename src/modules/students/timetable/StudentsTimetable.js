import { api } from "../../../services/api";

/**
 * Fetches the timetable for a specific class and section.
 * @param {Object} params - Query parameters including class_id and section_id.
 * @returns {Promise<Array>} - List of timetable entries.
 */
export async function getStudentTimetable(params = {}) {
    try {
        // The endpoint is updated in the backend routes to /gettimetable
        const response = await api.get("/timetables/gettimetable", params);
        if (response.success) {
            return response.data || [];
        }
        throw new Error(response.message || "Failed to fetch timetable");
    } catch (error) {
        console.error("[Timetable Service Error]:", error);
        throw error;
    }
}
