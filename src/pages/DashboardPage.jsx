import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { bookingApi } from "../api/bookingApi";
import { notificationApi } from "../api/notificationApi";
import { StatCard } from "../components/common/StatCard";
import { BookingCard } from "../components/bookings/BookingCard";
import { PageLoader } from "../components/common/LoadingSpinner";
import {
  Search,
  Ticket,
  SearchCode,
  History,
  User,
  Bell,
  Train,
  ArrowRight,
  AlertCircle,
  Calendar,
} from "lucide-react";

export function DashboardPage() {
  const { user, passengerProfile } = useAuth();
  
  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [bookingsData, notificationsData] = await Promise.all([
          bookingApi.getMyBookings().catch(() => []),
          notificationApi.getMyNotifications().catch(() => []),
        ]);

        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
        setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
      } catch (err) {
        // Handle silently or empty
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <PageLoader message="Loading your dashboard..." />;
  }

  const confirmedBookings = bookings.filter((b) => b.bookingStatus === "confirmed");
  const upcomingBooking = confirmedBookings[0] || null;
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
            Passenger Operations Dashboard
          </span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, marginTop: "0.25rem", color: "#ffffff" }}>
            Welcome back, {user?.name || "Passenger"}!
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.925rem", marginTop: "0.3rem" }}>
            Manage your train bookings, track PNR status, and check travel notifications.
          </p>
        </div>

        <Link to="/trains" className="btn btn-primary btn-lg">
          <Search size={18} /> Book New Ticket
        </Link>
      </div>

      {/* Profile missing warning alert */}
      {!passengerProfile && (
        <div
          style={{
            backgroundColor: "var(--warning-bg)",
            border: "1px solid var(--warning-border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <AlertCircle size={24} color="var(--warning)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#92400e" }}>
                Passenger Profile Incomplete
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#b45309" }}>
                You must complete your Passenger Profile (Age, Gender, Phone) before booking train tickets.
              </p>
            </div>
          </div>
          <Link to="/profile" className="btn btn-sm btn-primary">
            Complete Profile Now &rarr;
          </Link>
        </div>
      )}

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <StatCard
          title="Total Bookings"
          value={bookings.length}
          icon={Ticket}
          color="var(--primary)"
          subtitle={`${confirmedBookings.length} Active Confirmed`}
        />
        <StatCard
          title="Unread Alerts"
          value={unreadNotifications}
          icon={Bell}
          color="var(--warning)"
          subtitle="System Notifications"
        />
        <StatCard
          title="Passenger Profile"
          value={passengerProfile ? "Verified" : "Pending"}
          icon={User}
          color={passengerProfile ? "var(--success)" : "var(--danger)"}
          subtitle={passengerProfile?.phone || "Setup required"}
        />
      </div>

      {/* Quick Action Grid */}
      <div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
          Quick Actions
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          <Link to="/trains" className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center", padding: "1.25rem" }}>
            <Search size={24} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Search Trains</span>
          </Link>
          <Link to="/bookings" className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center", padding: "1.25rem" }}>
            <Ticket size={24} color="var(--success)" />
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>My Bookings</span>
          </Link>
          <Link to="/pnr" className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center", padding: "1.25rem" }}>
            <SearchCode size={24} color="var(--info)" />
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>PNR Lookup</span>
          </Link>
          <Link to="/history" className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center", padding: "1.25rem" }}>
            <History size={24} color="#7c3aed" />
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Journey History</span>
          </Link>
          <Link to="/notifications" className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center", padding: "1.25rem" }}>
            <Bell size={24} color="var(--warning)" />
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Notifications</span>
          </Link>
          <Link to="/profile" className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center", padding: "1.25rem" }}>
            <User size={24} color="var(--navy)" />
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Profile</span>
          </Link>
        </div>
      </div>

      {/* Upcoming Journey Widget */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)" }}>
            Next Upcoming Journey
          </h3>
          <Link to="/bookings" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.875rem" }}>
            View All ({bookings.length}) &rarr;
          </Link>
        </div>

        {upcomingBooking ? (
          <BookingCard booking={upcomingBooking} />
        ) : (
          <div className="card" style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
            <Calendar size={36} color="var(--text-muted)" style={{ margin: "0 auto 0.75rem" }} />
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)" }}>
              No Upcoming Bookings
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "0.25rem 0 1.25rem" }}>
              Ready for your next train journey? Search available trains and reserve your seat.
            </p>
            <Link to="/trains" className="btn btn-primary btn-sm">
              Search & Book Train Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
