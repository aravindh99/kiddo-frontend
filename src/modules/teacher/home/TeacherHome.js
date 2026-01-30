import { api } from "../../../services/api";

/**
 * Fetches the teacher dashboard data from the backend.
 * Returns an object containing classes, timetable, homework summary, and pending report cards.
 */
export async function getTeacherDashboardData() {
    try {
        const response = await api.get("/teachers/dashboard");
        if (response.success) {
            return response.data;
        }
        throw new Error(response.message || "Failed to fetch dashboard data");
    } catch (error) {
        console.error("Error in getTeacherDashboardData:", error);
        throw error;
    }
}
