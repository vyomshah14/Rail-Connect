import React from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "../common/StatusBadge";
import { Train, Clock, MapPin, Users, ArrowRight } from "lucide-react";

export function TrainCard({ train, showBookBtn = true }) {
  const sourceName = train.source?.name || train.source?.code || "Origin";
  const sourceCity = train.source?.city ? `(${train.source.city})` : "";
  const destName = train.destination?.name || train.destination?.code || "Destination";
  const destCity = train.destination?.city ? `(${train.destination.city})` : "";

  const isAvailable = train.availableSeats > 0 && train.status !== "cancelled";

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "var(--primary)",
                backgroundColor: "var(--primary-light)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              #{train.trainNumber}
            </span>
            <StatusBadge status={train.status} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)" }}>{train.trainName}</h3>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
            <Users size={16} /> Seats Available
          </div>
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              color: isAvailable ? "var(--success)" : "var(--danger)",
            }}
          >
            {train.availableSeats}{" "}
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-muted)" }}>
              / {train.totalSeats}
            </span>
          </span>
        </div>
      </div>

      {/* Station & Schedule route */}
      <div
        style={{
          backgroundColor: "var(--bg-subtle)",
          borderRadius: "var(--radius-md)",
          padding: "1rem",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)" }}>
            Departure
          </span>
          <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--navy)" }}>{train.departureTime}</p>
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={14} color="var(--primary)" /> {sourceName} {sourceCity}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "var(--primary)" }}>
          <ArrowRight size={20} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)" }}>Direct Route</span>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)" }}>
            Arrival
          </span>
          <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--navy)" }}>{train.arrivalTime}</p>
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={14} color="var(--primary)" /> {destName} {destCity}
          </p>
        </div>
      </div>

      {showBookBtn && (
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.25rem" }}>
          <Link
            to={`/trains/${train._id}`}
            className={`btn ${isAvailable ? "btn-primary" : "btn-secondary"}`}
            style={{ width: "100%", smWidth: "auto" }}
          >
            {isAvailable ? "Book Ticket Now" : "View Details / Full"}
          </Link>
        </div>
      )}
    </div>
  );
}
