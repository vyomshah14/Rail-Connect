import React from "react";
import { StatusBadge } from "../common/StatusBadge";
import { Calendar, MapPin, Ticket, AlertCircle } from "lucide-react";

export function BookingCard({ booking, onCancel }) {
  const train = booking.train || {};
  const sourceName = train.source?.name || train.source?.code || "Origin";
  const destName = train.destination?.name || train.destination?.code || "Destination";

  const formattedDate = booking.journeyDate
    ? new Date(booking.journeyDate).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const isConfirmed = booking.bookingStatus === "confirmed";

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
            PNR Number
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 800, color: "var(--navy)" }}>
              {booking.pnr}
            </span>
            <StatusBadge status={booking.bookingStatus} type="booking" />
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
            Seat Allocated
          </span>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)" }}>
            {booking.seatNumber}
          </p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "0.85rem 0" }}>
        <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.4rem" }}>
          {train.trainName || "Express Train"}{" "}
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>
            (#{train.trainNumber || "N/A"})
          </span>
        </h4>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.875rem", color: "var(--text-main)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <MapPin size={16} color="var(--primary)" />
            <span>
              <strong>{sourceName}</strong> &rarr; <strong>{destName}</strong>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Calendar size={16} color="var(--primary)" />
            <span>Journey Date: <strong>{formattedDate}</strong></span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Booked on: {new Date(booking.bookingDate || booking.createdAt).toLocaleDateString()}
        </span>

        {isConfirmed && onCancel && (
          <button
            onClick={() => onCancel(booking)}
            className="btn btn-sm btn-outline-danger"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}
