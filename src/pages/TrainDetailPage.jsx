import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { trainApi } from "../api/trainApi";
import { stationApi } from "../api/stationApi";
import { bookingApi } from "../api/bookingApi";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { StatusBadge } from "../components/common/StatusBadge";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Modal } from "../components/common/Modal";
import {
  Train,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Ticket,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export function TrainDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, passengerProfile, user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [train, setTrain] = useState(null);
  const [stationsMap, setStationsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking Form State
  const [journeyDate, setJourneyDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  useEffect(() => {
    const loadTrainData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [trainData, stationsData] = await Promise.all([
          trainApi.getTrainById(id),
          stationApi.getStations().catch(() => []),
        ]);

        const map = {};
        if (Array.isArray(stationsData)) {
          stationsData.forEach((s) => {
            map[s._id] = s;
          });
        }
        setStationsMap(map);
        setTrain(trainData);
      } catch (err) {
        setError(err.message || "Failed to load train details.");
      } finally {
        setLoading(false);
      }
    };

    loadTrainData();
  }, [id]);

  if (loading) return <PageLoader message="Loading train itinerary..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!train) return <ErrorMessage message="Train not found" />;

  // Resolve source and destination station names
  const sourceStation =
    typeof train.source === "object"
      ? train.source
      : stationsMap[train.source] || { name: "Origin Station", code: "SRC" };

  const destStation =
    typeof train.destination === "object"
      ? train.destination
      : stationsMap[train.destination] || { name: "Destination Station", code: "DST" };

  const isAvailable = train.availableSeats > 0 && train.status !== "cancelled";

  const handleBook = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/trains/${id}` } } });
      return;
    }

    if (!passengerProfile) {
      showError("Please complete your Passenger Profile before booking.");
      navigate("/profile");
      return;
    }

    if (!journeyDate) {
      showError("Please select a valid journey date.");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await bookingApi.createBooking({
        trainId: train._id,
        journeyDate,
      });

      showSuccess("Booking confirmed successfully!");
      setBookingSuccessData(res.booking);

      // Refresh train available seats
      setTrain((prev) => ({
        ...prev,
        availableSeats: Math.max(0, prev.availableSeats - 1),
      }));
    } catch (err) {
      showError(err.message || "Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Train Banner */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--navy) 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "#60a5fa",
                  backgroundColor: "rgba(96, 165, 250, 0.15)",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                #{train.trainNumber}
              </span>
              <StatusBadge status={train.status} />
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff" }}>{train.trainName}</h1>
          </div>

          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
              Available Seats
            </span>
            <p
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: isAvailable ? "#34d399" : "#f87171",
              }}
            >
              {train.availableSeats}{" "}
              <span style={{ fontSize: "1rem", color: "#94a3b8", fontWeight: 500 }}>
                / {train.totalSeats}
              </span>
            </p>
          </div>
        </div>

        {/* Route Details */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>
              Source Station
            </span>
            <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff", margin: "0.2rem 0" }}>
              {train.departureTime}
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#60a5fa", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <MapPin size={16} /> {sourceStation.name} ({sourceStation.code || "SRC"})
            </p>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              {sourceStation.city}, {sourceStation.state}
            </p>
          </div>

          <div style={{ textAlign: "center", color: "#60a5fa" }}>
            <ArrowRight size={28} />
            <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Scheduled</span>
          </div>

          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>
              Destination Station
            </span>
            <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff", margin: "0.2rem 0" }}>
              {train.arrivalTime}
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#60a5fa", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <MapPin size={16} /> {destStation.name} ({destStation.code || "DST"})
            </p>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              {destStation.city}, {destStation.state}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="card" style={{ padding: "2rem" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Ticket size={22} color="var(--primary)" /> Confirm Your Booking
        </h3>

        {!isAuthenticated ? (
          <div
            style={{
              backgroundColor: "var(--info-bg)",
              border: "1px solid var(--info-border)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <AlertCircle size={22} color="var(--info)" />
              <span style={{ fontSize: "0.925rem", color: "#0369a1" }}>
                You must log in to your RailConnect account to book a ticket.
              </span>
            </div>
            <Link to="/login" className="btn btn-sm btn-primary">
              Log In Now
            </Link>
          </div>
        ) : !passengerProfile ? (
          <div
            style={{
              backgroundColor: "var(--warning-bg)",
              border: "1px solid var(--warning-border)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <AlertCircle size={22} color="var(--warning)" />
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#92400e" }}>
                  Passenger Profile Missing
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#b45309" }}>
                  Please create your Passenger Profile first to proceed with booking.
                </p>
              </div>
            </div>
            <Link to="/profile" className="btn btn-sm btn-primary">
              Complete Profile
            </Link>
          </div>
        ) : (
          <form onSubmit={handleBook} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Passenger Name
                </span>
                <p style={{ fontWeight: 700, color: "var(--navy)" }}>{passengerProfile.name}</p>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Age / Gender / Contact
                </span>
                <p style={{ fontWeight: 600, color: "var(--text-main)" }}>
                  {passengerProfile.age} yrs • {passengerProfile.gender} • {passengerProfile.phone}
                </p>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Calendar size={16} /> Select Journey Date <span style={{ color: "var(--danger)" }}>*</span>
              </label>
              <input
                type="date"
                value={journeyDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={bookingLoading || !isAvailable}
            >
              {bookingLoading ? (
                <LoadingSpinner size={20} color="#fff" />
              ) : isAvailable ? (
                <>Confirm & Generate PNR</>
              ) : (
                <>No Seats Available</>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Booking Success Modal */}
      {bookingSuccessData && (
        <Modal
          isOpen={!!bookingSuccessData}
          onClose={() => {
            setBookingSuccessData(null);
            navigate("/bookings");
          }}
          title="Booking Confirmed!"
          footer={
            <button
              onClick={() => {
                setBookingSuccessData(null);
                navigate("/bookings");
              }}
              className="btn btn-primary"
            >
              View My Bookings &rarr;
            </button>
          }
        >
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "var(--success-bg)",
                color: "var(--success)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--navy)" }}>
              Ticket Reserved Successfully!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.2rem" }}>
              Your journey has been confirmed. Below are your booking credentials:
            </p>

            <div
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                margin: "1.5rem 0",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>PNR Number:</span>
                <strong style={{ fontFamily: "var(--font-mono)", color: "var(--primary)", fontSize: "1.1rem" }}>
                  {bookingSuccessData.pnr}
                </strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Allocated Seat:</span>
                <strong style={{ fontFamily: "var(--font-mono)", color: "var(--navy)" }}>
                  {bookingSuccessData.seatNumber}
                </strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Journey Date:</span>
                <strong>{new Date(bookingSuccessData.journeyDate).toLocaleDateString()}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Status:</span>
                <span className="badge badge-confirmed">Confirmed</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
