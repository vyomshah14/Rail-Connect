import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export function AccessDeniedPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "480px",
          width: "100%",
          padding: "3rem 2rem",
          textAlign: "center",
          borderTop: "6px solid var(--danger)",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "var(--danger-bg)",
            color: "var(--danger)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <ShieldAlert size={36} />
        </div>

        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--navy)" }}>
          Access Denied (403)
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: "0.5rem 0 1.75rem", lineHeight: 1.5 }}>
          You do not have administrative permissions to view this portal page. Please contact a RailConnect administrator if you believe this is an error.
        </p>

        <Link to="/dashboard" className="btn btn-primary btn-block">
          <ArrowLeft size={18} /> Return to Passenger Dashboard
        </Link>
      </div>
    </div>
  );
}
