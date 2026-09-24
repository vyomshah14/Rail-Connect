import { apiClient } from "./api";

export const authApi = {
  login: (credentials) => {
    return apiClient("/api/auth/login", {
      method: "POST",
      body: credentials,
    });
  },

  register: (userData) => {
    return apiClient("/api/auth/register", {
      method: "POST",
      body: userData,
    });
  },
};
