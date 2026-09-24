import React, { useState, useEffect } from "react";
import { notificationApi } from "../api/notificationApi";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { NotificationItem } from "../components/notifications/NotificationItem";
import { CreateNotificationModal } from "../components/admin/CreateNotificationModal";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { Bell, CheckCheck, Send } from "lucide-react";

export function NotificationsPage() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationApi.getMyNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      showSuccess("Notification marked as read");
    } catch (err) {
      showError(err.message || "Failed to update notification.");
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    if (unread.length === 0) return;

    try {
      await Promise.all(unread.map((n) => notificationApi.markAsRead(n._id)));
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      showSuccess("All notifications marked as read!");
    } catch (err) {
      showError(err.message || "Failed to mark all as read.");
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Notifications {unreadCount > 0 && <span className="badge badge-boarding">{unreadCount} New</span>}
          </h1>
          <p className="page-subtitle">
            System announcements, booking updates, and train status alerts
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {user?.role === "admin" && (
            <button onClick={() => setCreateModalOpen(true)} className="btn btn-primary btn-sm">
              <Send size={15} /> Send Notification
            </button>
          )}

          {unreadCount > 0 && (
            <button onClick={handleMarkAllRead} className="btn btn-secondary btn-sm">
              <CheckCheck size={16} /> Mark All as Read
            </button>
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={loadNotifications} />}

      {loading ? (
        <PageLoader message="Loading notifications..." />
      ) : notifications.length === 0 ? (
        <EmptyState
          title="No Notifications"
          description="You don't have any notifications or alerts at this time."
          icon={Bell}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {notifications.map((item) => (
            <NotificationItem
              key={item._id}
              notification={item}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}

      {/* Admin Send Notification Modal */}
      {user?.role === "admin" && (
        <CreateNotificationModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={loadNotifications}
        />
      )}
    </div>
  );
}
