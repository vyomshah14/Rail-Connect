import { apiClient } from "./api";

export const cancellationApi = {
  cancelBooking: (data) => {
    return apiClient("/api/cancellations", {
      method: "POST",
      body: data,
    });
  },
};
