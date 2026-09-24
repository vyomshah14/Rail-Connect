import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Search,
  Ticket,
  SearchCode,
  History,
  Bell,
  User,
  LogOut,
  Train,
} from "lucide-react";

export function Sidebar({ onCloseMobile }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Search Trains", path: "/trains", icon: Search },
    { label: "My Bookings", path: "/bookings", icon: Ticket },
    { label: "PNR Search", path: "/pnr", icon: SearchCode },
    { label: "Journey History", path: "/history", icon: History },
    { label: "Notifications", path: "/notifications", icon: Bell },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <aside className="sidebar-desktop">
      <div className="sidebar-header">
        <div
          style={{
            width: 38,
            height: 38,
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
        <div>
          <h2 className="sidebar-brand-title">RailConnect</h2>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>
            Passenger Portal
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

      <div className="sidebar-footer">
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
