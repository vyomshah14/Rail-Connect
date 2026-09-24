import React, { useState } from "react";
import { bookingApi } from "../api/bookingApi";
import { FormInput } from "../components/common/FormInput";
import { StatusBadge } from "../components/common/StatusBadge";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { SearchCode, Ticket, MapPin, Calendar, User, Search } from "lucide-react";

export function PnrSearchPage() {
  const [pnrInput, setPnrInput] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!pnrInput.trim()) return;

    setLoading(true);
    setError(null);
    setBooking(null);
    setSearched(true);

    try {
      const data = await bookingApi.getBookingByPNR(pnrInput.trim());
      setBooking(data);
    } catch (err) {
      setError(err.message || "Booking not found for this PNR number.");
    } finally {
      setLoading(false);
    }
  };

  const train = booking?.train || {};
  const sourceName = train.source?.name || train.source?.code || "Origin";
  const destName = train.destination?.name || train.destination?.code || "Destination";

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.75rem",
          }}
        >
          <SearchCode size={28} />
        </div>
        <h1 className="page-title" style={{ justifyContent: "center" }}>PNR Status Enquiry</h1>
        <p className="page-subtitle">
          Enter your 13+ character RailConnect PNR number to check live reservation details
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <FormInput
              label="PNR Number"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              placeholder="e.g. RC1710920400000"
              icon={SearchCode}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading || !pnrInput.trim()}
            style={{ marginBottom: "1.25rem" }}
          >
            {loading ? <LoadingSpinner size={18} color="#fff" /> : <><Search size={18} /> Search PNR</>}
          </button>
        </div>
      </form>

      {/* Results Display */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <LoadingSpinner size={36} />
          <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Searching PNR record...</p>
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : booking ? (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", borderLeft: "5px solid var(--primary)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                PNR Number
              </span>
              <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)" }}>
                {booking.pnr}
              </h2>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>
                Status
              </span>
              <StatusBadge status={booking.bookingStatus} type="booking" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                Train Details
              </span>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.2rem" }}>
                {train.trainName || "Express Train"}
              </h4>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--primary)" }}>
                #{train.trainNumber || "N/A"}
              </span>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                Seat & Coach
              </span>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.2rem" }}>
                {booking.seatNumber}
              </h4>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Confirmed Berth</span>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                Journey Date
              </span>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.2rem" }}>
                {new Date(booking.journeyDate).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h4>
            </div>
          </div>

          <div style={{ backgroundColor: "var(--bg-subtle)", borderRadius: "var(--radius-md)", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <MapPin size={20} color="var(--primary)" />
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)" }}>
              Route: <strong>{sourceName}</strong> &rarr; <strong>{destName}</strong>
            </span>
          </div>
        </div>
      ) : searched ? (
        <ErrorMessage message="No booking found for this PNR." />
      ) : null}
    </div>
  );
}
