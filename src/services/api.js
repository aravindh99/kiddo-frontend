import { useNavigate } from "react-router-dom";

/**
 * Gravity Link Service
 * The only way to communicate with the Gravity Core (Backend).
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class GravityLink {
    constructor() {
        this.token = localStorage.getItem("token");
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem("token", token);
    }

    logout() {
        this.token = null;
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    async request(endpoint, options = {}) {
        // ALWAYS get the freshest token from storage
        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, config);

            // Handle Unauthorized universally
            if (response.status === 401) {
                console.warn(`[Gravity Link 401]: Unauthorized at ${endpoint}. Token present: ${!!token}`);
                // Only logout if it's a real expired session, not a missing dev token
                if (token) {
                    this.logout();
                }
                throw new Error("Session expired or invalid. Please login again.");
            }

            if (response.status === 403) {
                throw new Error("Access Denied: Insufficient Gravity.");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gravity Core Error");
            }

            return data;
        } catch (error) {
            console.error("[Gravity Link Error]:", error);
            throw error;
        }
    }

    async get(endpoint, params = null) {
        let url = endpoint;
        if (params) {
            const query = new URLSearchParams(params).toString();
            url += `?${query}`;
        }
        return this.request(url, { method: "GET" });
    }

    post(endpoint, body) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    put(endpoint, body) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    delete(endpoint) {
        return this.request(endpoint, { method: "DELETE" });
    }
}

export const api = new GravityLink();
