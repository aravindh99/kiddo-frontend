import { api } from "../../../services/api";

/**
 * Fetches the timetable for a specific class and section (from a teacher's perspective).
 * @param {Object} params - Query parameters including class_id and section_id.
 * @returns {Promise<Array>} - List of timetable entries.
 */
export async function getTeacherTimetable(params = {}) {
    try {
        // Shared endpoint for viewing timetables
        const response = await api.get("/timetables/gettimetable", params);
        if (response.success) {
            return response.data || [];
        }
        throw new Error(response.message || "Failed to fetch timetable");
    } catch (error) {
        console.error("[Teacher Timetable Service Error]:", error);
        throw error;
    }
}
