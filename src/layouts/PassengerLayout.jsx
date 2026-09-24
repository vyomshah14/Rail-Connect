import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";

export function PassengerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar onCloseMobile={() => setMobileOpen(false)} />

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
            style={{ width: "280px", background: "var(--navy)", height: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onCloseMobile={() => setMobileOpen(false)} />
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
