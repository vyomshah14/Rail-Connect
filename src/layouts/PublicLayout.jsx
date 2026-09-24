import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";

export function PublicLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
