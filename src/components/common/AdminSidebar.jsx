import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Train,
  Building2,
  Bell,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export function AdminSidebar({ onCloseMobile }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Trains", path: "/admin/trains", icon: Train },
    { label: "Stations", path: "/admin/stations", icon: Building2 },
    { label: "Notifications", path: "/notifications", icon: Bell },
  ];

  return (
    <aside className="sidebar-desktop" style={{ backgroundColor: "#0b132b" }}>
      <div className="sidebar-header" style={{ borderBottomColor: "rgba(255,255,255,0.08)" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "var(--radius-md)",
            backgroundColor: "#7c3aed",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldAlert size={22} />
        </div>
        <div>
          <h2 className="sidebar-brand-title">RailConnect</h2>
          <span style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 700, display: "block" }}>
            Admin Console
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer" style={{ borderTopColor: "rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          className="sidebar-item"
          style={{ width: "100%", color: "#ef4444" }}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
