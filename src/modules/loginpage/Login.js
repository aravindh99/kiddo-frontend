import { api } from "../../services/api";

export const login = async (username, password) => {
  try {
    const data = await api.post("/auth/login", { username, password });
    if (data.token) {
      api.setToken(data.token);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
