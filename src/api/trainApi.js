import { apiClient } from "./api";

export const trainApi = {
  getTrains: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.status) query.append("status", params.status);
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.page) query.append("page", params.page);
    if (params.limit) query.append("limit", params.limit);

    const queryString = query.toString();
    const endpoint = `/api/trains${queryString ? `?${queryString}` : ""}`;
    return apiClient(endpoint, { method: "GET" });
  },

  getTrainById: (id) => {
    return apiClient(`/api/trains/${id}`, { method: "GET" });
  },

  createTrain: (trainData) => {
    return apiClient("/api/trains", {
      method: "POST",
      body: trainData,
    });
  },

  updateTrain: (id, trainData) => {
    return apiClient(`/api/trains/${id}`, {
      method: "PUT",
      body: trainData,
    });
  },

  deleteTrain: (id) => {
    return apiClient(`/api/trains/${id}`, {
      method: "DELETE",
    });
  },
};
