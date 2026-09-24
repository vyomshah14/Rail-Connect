import React from "react";

export function LoadingSpinner({ size = 24, color = "var(--primary)" }) {
  return (
    <div
      style={{
        display: "inline-block",
        width: size,
        height: size,
        border: `3px solid rgba(0, 0, 0, 0.1)`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function PageLoader({ message = "Loading RailConnect..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "1.25rem",
      }}
    >
      <LoadingSpinner size={44} color="var(--primary)" />
      <p style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.95rem" }}>
        {message}
      </p>
    </div>
  );
}
