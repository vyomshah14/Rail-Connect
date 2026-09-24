import React, { useState, useEffect } from "react";
import { bookingApi } from "../api/bookingApi";
import { cancellationApi } from "../api/cancellationApi";
import { useToast } from "../hooks/useToast";
import { BookingCard } from "../components/bookings/BookingCard";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { Ticket, AlertCircle } from "lucide-react";

export function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cancellation state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  const { showSuccess, showError } = useToast();

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingApi.getMyBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleOpenCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelReason("Personal plans changed");
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    setCancelLoading(true);

    try {
      const res = await cancellationApi.cancelBooking({
        bookingId: selectedBooking._id,
        reason: cancelReason || "Cancelled by passenger",
      });

      showSuccess("Booking cancelled successfully.");

      // Update booking status in local state
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, bookingStatus: "cancelled" } : b
        )
      );

      setSelectedBooking(null);
    } catch (err) {
      showError(err.message || "Cancellation failed. Please try again.");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Bookings</h1>
          <p className="page-subtitle">
            View all active ticket reservations and handle cancellations
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={loadBookings} />}

      {loading ? (
        <PageLoader message="Loading your ticket bookings..." />
      ) : bookings.length === 0 ? (
        <EmptyState
          title="No Bookings Found"
          description="You haven't booked any train tickets yet. Search available trains to make your first reservation!"
          icon={Ticket}
          actionText="Search & Book Trains"
          onAction={() => (window.location.href = "/trains")}
        />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleOpenCancelModal}
            />
          ))}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {selectedBooking && (
        <ConfirmModal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onConfirm={handleConfirmCancel}
          title={`Cancel Booking #${selectedBooking.pnr}`}
          message="Are you sure you want to cancel this booking? This action will free your reserved seat."
          confirmText="Yes, Cancel Booking"
          confirmVariant="danger"
          loading={cancelLoading}
        >
          <div className="form-group" style={{ marginTop: "1rem", marginBottom: 0 }}>
            <label className="form-label">Cancellation Reason</label>
            <input
              type="text"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="e.g. Schedule change, emergency..."
              className="form-input"
            />
          </div>
        </ConfirmModal>
      )}
    </div>
  );
}
