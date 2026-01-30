import { api } from "../../../services/api";

/**
 * Fetches the timetable for a parent's child (requires class_id and section_id).
 * @param {Object} params - Query parameters including class_id and section_id.
 * @returns {Promise<Array>} - List of timetable entries.
 */
export async function getParentTimetable(params = {}) {
    try {
        // Shared endpoint for viewing timetables
        const response = await api.get("/timetables/gettimetable", params);
        if (response.success) {
            return response.data || [];
        }
        throw new Error(response.message || "Failed to fetch timetable");
    } catch (error) {
        console.error("[Parent Timetable Service Error]:", error);
        throw error;
    }
}
