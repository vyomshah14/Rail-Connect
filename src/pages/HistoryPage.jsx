import React, { useState, useEffect } from "react";
import { bookingApi } from "../api/bookingApi";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { StatusBadge } from "../components/common/StatusBadge";
import { History, Calendar, MapPin, Ticket } from "lucide-react";

export function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingApi.getJourneyHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load journey history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Journey History</h1>
          <p className="page-subtitle">
            Complete historical timeline of your past and active train bookings
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={loadHistory} />}

      {loading ? (
        <PageLoader message="Loading your travel history..." />
      ) : history.length === 0 ? (
        <EmptyState
          title="No Journey History"
          description="You do not have any past or active journey records registered in your account."
          icon={History}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {history.map((item) => {
            const train = item.train || {};
            const sourceName = train.source?.name || train.source?.code || "Origin";
            const destName = train.destination?.name || train.destination?.code || "Destination";

            return (
              <div
                key={item._id}
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "var(--bg-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                      flexShrink: 0,
                    }}
                  >
                    <History size={22} />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.85rem", color: "var(--primary)" }}>
                        {item.pnr}
                      </span>
                      <StatusBadge status={item.bookingStatus} type="booking" />
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.15rem" }}>
                      {train.trainName || "Express Train"}{" "}
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>
                        (#{train.trainNumber || "N/A"})
                      </span>
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.15rem" }}>
                      <MapPin size={14} color="var(--primary)" /> {sourceName} &rarr; {destName}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    <Calendar size={14} /> Journey Date
                  </div>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.15rem" }}>
                    {new Date(item.journeyDate).toLocaleDateString("en-IN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Seat: {item.seatNumber}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
