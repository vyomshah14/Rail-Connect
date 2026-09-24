import { apiClient } from "./api";

export const stationApi = {
  getStations: () => {
    return apiClient("/api/stations", { method: "GET" });
  },

  getStationById: (id) => {
    return apiClient(`/api/stations/${id}`, { method: "GET" });
  },

  createStation: (stationData) => {
    return apiClient("/api/stations", {
      method: "POST",
      body: stationData,
    });
  },

  updateStation: (id, stationData) => {
    return apiClient(`/api/stations/${id}`, {
      method: "PUT",
      body: stationData,
    });
  },

  deleteStation: (id) => {
    return apiClient(`/api/stations/${id}`, {
      method: "DELETE",
    });
  },
};
