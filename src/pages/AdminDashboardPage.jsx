import React, { useState, useEffect } from "react";
import { dashboardApi } from "../api/dashboardApi";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { CreateNotificationModal } from "../components/admin/CreateNotificationModal";
import {
  Users,
  Train,
  Ticket,
  XCircle,
  Database,
  BarChart3,
  MapPin,
  Calendar,
  Send,
} from "lucide-react";

export function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard aggregation stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <PageLoader message="Executing MongoDB aggregation pipelines..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadStats} />;
  if (!stats) return null;

  // Process booking breakdown from aggregate
  const confirmedCount =
    stats.bookingStats?.find((b) => b._id === "confirmed")?.count || 0;
  const cancelledCount =
    stats.bookingStats?.find((b) => b._id === "cancelled")?.count || 0;

  const bookingsList = stats.bookingWithPassengers || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#7c3aed",
              backgroundColor: "#f3e8ff",
              padding: "2px 8px",
              borderRadius: "4px",
              marginBottom: "0.4rem",
            }}
          >
            <Database size={14} /> MongoDB Aggregation Driven
          </div>
          <h1 className="page-title">Admin Operations Console</h1>
          <p className="page-subtitle">
            Real-time platform analytics, booking status breakdown, and system records
          </p>
        </div>

        <button onClick={() => setNotifyModalOpen(true)} className="btn btn-primary">
          <Send size={18} /> Broadcast Notification
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <StatCard
          title="Total Registered Users"
          value={stats.totalUsers || 0}
          icon={Users}
          color="var(--primary)"
          subtitle="Passengers & Staff"
        />
        <StatCard
          title="Active Trains"
          value={stats.totalTrains || 0}
          icon={Train}
          color="var(--info)"
          subtitle="Fleet inventory"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings || 0}
          icon={Ticket}
          color="var(--success)"
          subtitle={`${confirmedCount} Confirmed`}
        />
        <StatCard
          title="Total Cancellations"
          value={stats.totalCancellations || 0}
          icon={XCircle}
          color="var(--danger)"
          subtitle={`${cancelledCount} Revoked`}
        />
      </div>

      {/* Booking Analytics Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <BarChart3 size={18} color="var(--primary)" /> Booking Status Aggregation
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", backgroundColor: "var(--success-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--success-border)" }}>
              <span style={{ fontWeight: 700, color: "var(--success)", fontSize: "0.9rem" }}>Confirmed Bookings</span>
              <strong style={{ fontSize: "1.2rem", color: "var(--navy)" }}>{confirmedCount}</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", backgroundColor: "var(--danger-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--danger-border)" }}>
              <span style={{ fontWeight: 700, color: "var(--danger)", fontSize: "0.9rem" }}>Cancelled Bookings</span>
              <strong style={{ fontSize: "1.2rem", color: "var(--navy)" }}>{cancelledCount}</strong>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.4rem" }}>
            System Efficiency
          </h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.5 }}>
            Booking completion rate is{" "}
            <strong style={{ color: "var(--success)" }}>
              {stats.totalBookings > 0
                ? Math.round((confirmedCount / stats.totalBookings) * 100)
                : 100}
              %
            </strong>{" "}
            across all scheduled train routes. Data pipeline verified live against MongoDB collections.
          </p>
        </div>
      </div>

      {/* Confirmed Bookings MongoDB Lookup Table */}
      <div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
          Recent Passenger Bookings ($lookup aggregation)
        </h3>

        {bookingsList.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ color: "var(--text-muted)" }}>No passenger bookings logged yet.</p>
          </div>
        ) : (
          <div className="table-responsive card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>PNR</th>
                  <th>Passenger Details</th>
                  <th>Train</th>
                  <th>Route</th>
                  <th>Journey Date</th>
                  <th>Seat</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingsList.map((item) => {
                  const pDetail = Array.isArray(item.passengerDetails) ? item.passengerDetails[0] : item.passengerDetails;
                  const tDetail = item.trainDetails || {};
                  const srcStat = Array.isArray(item.sourceStation) ? item.sourceStation[0] : item.sourceStation;
                  const dstStat = Array.isArray(item.destinationStation) ? item.destinationStation[0] : item.destinationStation;

                  return (
                    <tr key={item._id}>
                      <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--primary)" }}>
                        {item.pnr}
                      </td>
                      <td>
                        <div>
                          <strong style={{ color: "var(--navy)" }}>{pDetail?.name || "Passenger"}</strong>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                            {pDetail?.phone || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong style={{ color: "var(--navy)" }}>{tDetail?.trainName || "Express"}</strong>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            #{tDetail?.trainNumber || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.85rem" }}>
                          {srcStat?.code || srcStat?.name || "SRC"} &rarr; {dstStat?.code || dstStat?.name || "DST"}
                        </span>
                      </td>
                      <td>{new Date(item.journeyDate).toLocaleDateString()}</td>
                      <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{item.seatNumber}</td>
                      <td>
                        <StatusBadge status={item.bookingStatus} type="booking" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Broadcast Notification Modal */}
      <CreateNotificationModal
        isOpen={notifyModalOpen}
        onClose={() => setNotifyModalOpen(false)}
        onSuccess={loadStats}
      />
    </div>
  );
}
