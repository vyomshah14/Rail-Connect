import React from "react";

export function StatCard({ title, value, icon: Icon, color = "var(--primary)", subtitle }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {title}
        </span>
        <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--navy)", marginTop: "0.25rem", letterSpacing: "-0.02em" }}>
          {value}
        </h2>
        {subtitle && (
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            {subtitle}
          </p>
        )}
      </div>
      {Icon && (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "var(--radius-md)",
            backgroundColor: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
            flexShrink: 0,
          }}
        >
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}
