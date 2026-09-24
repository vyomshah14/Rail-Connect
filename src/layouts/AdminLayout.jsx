import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { AdminSidebar } from "../components/common/AdminSidebar";

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{ width: "280px", background: "#0b132b", height: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="dashboard-main">
        <Navbar onToggleSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
