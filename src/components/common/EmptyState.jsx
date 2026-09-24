import React from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  title = "No Data Found",
  description = "There are no records matching your criteria.",
  icon: Icon = Inbox,
  actionText,
  onAction,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3.5rem 1.5rem",
        textAlign: "center",
        backgroundColor: "var(--bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--border-color)",
        margin: "1.5rem 0",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "var(--bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
          marginBottom: "1rem",
        }}
      >
        <Icon size={28} />
      </div>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.4rem" }}>
        {title}
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "400px", marginBottom: actionText ? "1.25rem" : 0 }}>
        {description}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionText}
        </button>
      )}
    </div>
  );
}
