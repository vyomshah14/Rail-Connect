import { apiClient } from "./api";

export const passengerApi = {
  createPassenger: (passengerData) => {
    return apiClient("/api/passengers", {
      method: "POST",
      body: passengerData,
    });
  },

  getMyPassenger: () => {
    return apiClient("/api/passengers/me", { method: "GET" });
  },

  updateMyPassenger: (passengerData) => {
    return apiClient("/api/passengers/me", {
      method: "PUT",
      body: passengerData,
    });
  },

  deleteMyPassenger: () => {
    return apiClient("/api/passengers/me", {
      method: "DELETE",
    });
  },
};
