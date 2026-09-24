import React from "react";
import { Ticket, XCircle, Train, Bell, CheckCircle } from "lucide-react";

export function NotificationItem({ notification, onMarkAsRead }) {
  const getIcon = (type) => {
    switch (type) {
      case "booking":
        return <Ticket size={20} color="var(--primary)" />;
      case "cancellation":
        return <XCircle size={20} color="var(--danger)" />;
      case "train_status":
        return <Train size={20} color="var(--warning)" />;
      default:
        return <Bell size={20} color="var(--info)" />;
    }
  };

  const isUnread = !notification.isRead;

  return (
    <div
      onClick={() => isUnread && onMarkAsRead(notification._id)}
      style={{
        padding: "1.25rem",
        borderRadius: "var(--radius-md)",
        border: "1px solid",
        borderColor: isUnread ? "var(--primary-glow)" : "var(--border-color)",
        backgroundColor: isUnread ? "rgba(37, 99, 235, 0.03)" : "var(--bg-surface)",
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        cursor: isUnread ? "pointer" : "default",
        transition: "all var(--transition-fast)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: isUnread ? "var(--primary-light)" : "var(--bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {getIcon(notification.type)}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
          <h4 style={{ fontSize: "0.975rem", fontWeight: isUnread ? 700 : 600, color: "var(--navy)" }}>
            {notification.title}
          </h4>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {new Date(notification.createdAt).toLocaleDateString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
          {notification.message}
        </p>

        {isUnread && (
          <div style={{ marginTop: "0.5rem", display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700 }}>
            Click to mark as read
          </div>
        )}
      </div>
    </div>
  );
}
