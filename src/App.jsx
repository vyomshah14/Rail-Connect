import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Layouts
import { PublicLayout } from "./layouts/PublicLayout";
import { PassengerLayout } from "./layouts/PassengerLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Route Protection Guards
import { ProtectedRoute, RoleProtectedRoute } from "./components/common/ProtectedRoute";

// Public Pages
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccessDeniedPage } from "./pages/AccessDeniedPage";

// Passenger Pages
import { DashboardPage } from "./pages/DashboardPage";
import { TrainsPage } from "./pages/TrainsPage";
import { TrainDetailPage } from "./pages/TrainDetailPage";
import { MyBookingsPage } from "./pages/MyBookingsPage";
import { PnrSearchPage } from "./pages/PnrSearchPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotificationsPage } from "./pages/NotificationsPage";

// Admin Pages
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminTrainsPage } from "./pages/AdminTrainsPage";
import { AdminStationsPage } from "./pages/AdminStationsPage";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
          </Route>

          {/* Passenger Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <PassengerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trains" element={<TrainsPage />} />
            <Route path="/trains/:id" element={<TrainDetailPage />} />
            <Route path="/bookings" element={<MyBookingsPage />} />
            <Route path="/pnr" element={<PnrSearchPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </RoleProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/trains" element={<AdminTrainsPage />} />
            <Route path="/admin/stations" element={<AdminStationsPage />} />
          </Route>

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}
