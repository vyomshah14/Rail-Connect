import React from "react";
import { Link } from "react-router-dom";
import {
  Train,
  Search,
  ShieldCheck,
  Ticket,
  Clock,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function LandingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem", paddingBottom: "4rem" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "5rem 1.5rem 6rem",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "rgba(37, 99, 235, 0.2)",
              color: "#60a5fa",
              padding: "0.4rem 1rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              border: "1px solid rgba(96, 165, 250, 0.3)",
            }}
          >
            <Sparkles size={16} /> Next-Generation Railway Operations Platform
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            Smart Railway Operations & <br />
            <span style={{ color: "#3b82f6" }}>Passenger Management</span>
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#94a3b8",
              maxWidth: "700px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.6,
            }}
          >
            Streamlining railway scheduling, passenger reservations, PNR tracking, and station operations with speed, transparency, and modern SaaS reliability.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link to="/trains" className="btn btn-primary btn-lg">
              <Search size={19} /> Explore & Search Trains
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <div className="main-content" style={{ display: "flex", flexDirection: "column", gap: "4rem", paddingTop: 0 }}>
        {/* Quick Features Highlight */}
        <section>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Comprehensive Platform Features
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--navy)", marginTop: "0.25rem" }}>
              Built for Modern Railway Excellence
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div className="card">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Train size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
                Real-Time Train Schedules
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Filter trains by status, departure times, source & destination stations with instant search and pagination.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--success-bg)",
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Ticket size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
                Instant Ticket Booking
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Book confirmed journey seats with automatic seat allocation, instant PNR generation, and cancellation management.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--warning-bg)",
                  color: "var(--warning)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
                PNR & History Lookup
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Dedicated PNR query engine and complete journey history tracking for passengers.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#f3e8ff",
                  color: "#7c3aed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
                Admin Operations Console
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Role-based dashboard driven by MongoDB aggregation pipelines for station, train, and booking analytics.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          style={{
            backgroundColor: "var(--bg-surface)",
            borderRadius: "var(--radius-lg)",
            padding: "3rem 2rem",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--navy)" }}>
              How RailConnect Works
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Three simple steps to manage your rail journeys and bookings
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                1
              </div>
              <h4 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>Search & Select Route</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                Browse available train schedules by departure times, station codes, and current seat availability.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                2
              </div>
              <h4 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>Book & Receive PNR</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                Pick your travel date and lock in your seat instantly with a unique system PNR number.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                3
              </div>
              <h4 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>Track & Manage</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                View notifications, check PNR status, update passenger profiles, or cancel tickets whenever needed.
              </p>
            </div>
          </div>
        </section>

        {/* Railway Statistics Section */}
        <section
          style={{
            background: "linear-gradient(135deg, var(--navy) 0%, #1e293b 100%)",
            color: "#ffffff",
            padding: "3rem 2rem",
            borderRadius: "var(--radius-lg)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <h3 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#60a5fa" }}>100%</h3>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "0.2rem" }}>RESTful API Coverage</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#34d399" }}>Instant</h3>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "0.2rem" }}>PNR Generation & Lookup</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#fbbf24" }}>Role-Based</h3>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "0.2rem" }}>Passenger & Admin Console</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#a78bfa" }}>Aggregation</h3>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "0.2rem" }}>MongoDB Analytics Engine</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-color)",
          padding: "2.5rem 1.5rem 1.5rem",
          backgroundColor: "var(--bg-surface)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ maxWidth: "350px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Train size={20} color="var(--primary)" />
                <strong style={{ fontSize: "1.1rem", color: "var(--navy)" }}>RailConnect</strong>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                Smart Railway Operations & Passenger Management System built for BTech Project demonstration.
              </p>
            </div>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <div>
                <h5 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Quick Links</h5>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.85rem" }}>
                  <li><Link to="/trains" style={{ color: "var(--text-muted)" }}>Search Trains</Link></li>
                  <li><Link to="/pnr" style={{ color: "var(--text-muted)" }}>PNR Lookup</Link></li>
                  <li><Link to="/login" style={{ color: "var(--text-muted)" }}>Passenger Login</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", textAlign: "center", fontSize: "0.8rem", color: "var(--text-light)" }}>
            &copy; {new Date().getFullYear()} RailConnect Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
