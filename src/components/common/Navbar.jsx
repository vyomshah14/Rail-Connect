import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { notificationApi } from "../../api/notificationApi";
import { Train, Bell, LogOut, User, Menu, X, Shield } from "lucide-react";

export function Navbar({ onToggleSidebar }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadNotifications = async () => {
      try {
        const notifications = await notificationApi.getMyNotifications();
        if (Array.isArray(notifications)) {
          const count = notifications.filter((n) => !n.isRead).length;
          setUnreadCount(count);
        }
      } catch (err) {
        // Silent catch for notification count badge
      }
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 15000); // Check periodically
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        {onToggleSidebar && (
          <button onClick={onToggleSidebar} className="icon-button mobile-nav-toggle" aria-label="Toggle menu">
            <Menu size={22} />
          </button>
        )}
        <Link to={user?.role === "admin" ? "/admin/dashboard" : "/"} className="brand-logo-public">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Train size={22} />
          </div>
          <span style={{ color: "var(--navy)", fontWeight: 800 }}>
            Rail<span style={{ color: "var(--primary)" }}>Connect</span>
          </span>
        </Link>
      </div>

      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <Link to="/notifications" className="icon-button" title="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && <span className="notification-badge-count">{unreadCount}</span>}
            </Link>

            <Link to={user?.role === "admin" ? "/admin/dashboard" : "/profile"} className="user-profile-badge">
              <div className="avatar-circle">{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</div>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                <span style={{ color: "var(--navy)", fontSize: "0.85rem", fontWeight: 700 }}>{user?.name}</span>
                <span
                  className={`badge badge-${user?.role}`}
                  style={{ fontSize: "0.65rem", padding: "1px 6px", width: "fit-content" }}
                >
                  {user?.role}
                </span>
              </div>
            </Link>

            <button onClick={handleLogout} className="icon-button" title="Logout" style={{ color: "var(--danger)" }}>
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/login" className="btn btn-secondary btn-sm">
              Log In
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
