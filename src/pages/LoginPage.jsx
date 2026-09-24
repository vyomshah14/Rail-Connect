import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { authApi } from "../api/authApi";
import { FormInput } from "../components/common/FormInput";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Train, Mail, Lock, LogIn } from "lucide-react";

export function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const { login } = useAuth();
  const { showSuccess } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errs.password = "Password is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError("");

    try {
      const data = await authApi.login(formData);
      showSuccess(`Welcome back, ${data.user?.name || "User"}!`);
      login(data.token, data.user);

      const redirectPath =
        data.user?.role === "admin"
          ? "/admin/dashboard"
          : location.state?.from?.pathname || "/dashboard";

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setApiError(err.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "440px",
          width: "100%",
          padding: "2.25rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.75rem",
            }}
          >
            <Train size={28} />
          </div>
          <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--navy)" }}>
            Welcome Back
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.2rem" }}>
            Log in to manage your bookings and rail journeys
          </p>
        </div>

        {apiError && (
          <div
            style={{
              backgroundColor: "var(--danger-bg)",
              border: "1px solid var(--danger-border)",
              color: "var(--danger)",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="passenger@railconnect.com"
            error={errors.email}
            icon={Mail}
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
            icon={Lock}
            required
          />

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={submitting}
            style={{ marginTop: "0.5rem" }}
          >
            {submitting ? <LoadingSpinner size={18} color="#fff" /> : <><LogIn size={18} /> Log In</>}
          </button>
        </form>

        <div style={{ marginTop: "1.75rem", textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Register as Passenger
          </Link>
        </div>
      </div>
    </div>
  );
}
