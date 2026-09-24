import { apiClient } from "./api";

export const notificationApi = {
  createNotification: (notificationData) => {
    return apiClient("/api/notifications", {
      method: "POST",
      body: notificationData,
    });
  },

  getMyNotifications: () => {
    return apiClient("/api/notifications/my", { method: "GET" });
  },

  markAsRead: (id) => {
    return apiClient(`/api/notifications/${id}/read`, {
      method: "PATCH",
    });
  },
};
