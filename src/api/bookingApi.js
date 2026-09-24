import { apiClient } from "./api";

export const bookingApi = {
  createBooking: (bookingData) => {
    return apiClient("/api/bookings", {
      method: "POST",
      body: bookingData,
    });
  },

  getMyBookings: () => {
    return apiClient("/api/bookings/my", { method: "GET" });
  },

  getJourneyHistory: () => {
    return apiClient("/api/bookings/history", { method: "GET" });
  },

  getBookingByPNR: (pnr) => {
    return apiClient(`/api/bookings/pnr/${pnr}`, { method: "GET" });
  },
};
