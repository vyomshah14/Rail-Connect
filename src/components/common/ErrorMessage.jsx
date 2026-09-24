import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorMessage({ message = "Something went wrong. Please try again.", onRetry }) {
  return (
    <div
      style={{
        backgroundColor: "var(--danger-bg)",
        border: "1px solid var(--danger-border)",
        borderRadius: "var(--radius-md)",
        padding: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        margin: "1rem 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <AlertCircle size={22} color="var(--danger)" style={{ flexShrink: 0 }} />
        <span style={{ color: "#991b1b", fontSize: "0.925rem", fontWeight: 500 }}>
          {message}
        </span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-sm btn-outline-danger"
          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
        >
          <RefreshCw size={14} /> Retry
        </button>
      )}
    </div>
  );
}
