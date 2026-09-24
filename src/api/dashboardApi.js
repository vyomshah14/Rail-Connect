import { apiClient } from "./api";

export const dashboardApi = {
  getStats: () => {
    return apiClient("/api/dashboard/stats", { method: "GET" });
  },
};
