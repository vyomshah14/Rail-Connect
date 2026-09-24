import React, { useState, useEffect } from "react";
import { passengerApi } from "../api/passengerApi";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { FormInput } from "../components/common/FormInput";
import { SelectInput } from "../components/common/SelectInput";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { User, Phone, Calendar, Shield, Trash2, Edit, Save, Plus } from "lucide-react";

export function ProfilePage() {
  const { user, fetchPassengerProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await passengerApi.getMyPassenger();
      setProfile(data);
      setFormData({
        name: data.name || user?.name || "",
        age: data.age || "",
        gender: data.gender || "male",
        phone: data.phone || "",
      });
      setIsEditing(false);
    } catch (err) {
      // Profile not found (404) -> setup mode
      setProfile(null);
      setFormData({
        name: user?.name || "",
        age: "",
        gender: "male",
        phone: "",
      });
      setIsEditing(true); // Open edit mode to create
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Passenger name is required";
    if (!formData.age || Number(formData.age) < 1 || Number(formData.age) > 120) {
      errs.age = "Please enter a valid age (1-120)";
    }
    if (!formData.gender) errs.gender = "Gender is required";
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      errs.phone = "Please enter a valid phone number (10+ digits)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim(),
      };

      if (profile) {
        // Update existing profile
        const res = await passengerApi.updateMyPassenger(payload);
        showSuccess("Passenger profile updated successfully.");
        setProfile(res.passenger || res);
      } else {
        // Create new profile
        const res = await passengerApi.createPassenger(payload);
        showSuccess("Passenger profile created successfully.");
        setProfile(res.passenger || res);
      }

      await fetchPassengerProfile();
      setIsEditing(false);
    } catch (err) {
      showError(err.message || "Failed to save profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProfile = async () => {
    setDeleteLoading(true);
    try {
      await passengerApi.deleteMyPassenger();
      showSuccess("Passenger profile deleted successfully.");
      setProfile(null);
      setFormData({ name: user?.name || "", age: "", gender: "male", phone: "" });
      setIsEditing(true);
      await fetchPassengerProfile();
      setDeleteModalOpen(false);
    } catch (err) {
      showError(err.message || "Failed to delete profile.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <PageLoader message="Loading profile..." />;

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Passenger Profile</h1>
          <p className="page-subtitle">
            Manage your personal travel credentials for booking verification
          </p>
        </div>

        {profile && !isEditing && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary btn-sm">
              <Edit size={16} /> Edit Profile
            </button>
            <button onClick={() => setDeleteModalOpen(true)} className="btn btn-outline-danger btn-sm">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Account Info Box */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--navy) 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 800,
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : "P"}
        </div>

        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ffffff" }}>{user?.name}</h2>
          <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>{user?.email}</p>
          <span className="badge badge-passenger" style={{ marginTop: "0.4rem", display: "inline-block" }}>
            Role: {user?.role}
          </span>
        </div>
      </div>

      {/* Form or Display View */}
      <div className="card" style={{ padding: "2rem" }}>
        {isEditing ? (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
              {profile ? "Edit Passenger Details" : "Create Passenger Profile"}
            </h3>

            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              error={errors.name}
              icon={User}
              required
            />

            <FormInput
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 25"
              error={errors.age}
              min="1"
              max="120"
              required
            />

            <SelectInput
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genderOptions}
              error={errors.gender}
              required
            />

            <FormInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9876543210"
              error={errors.phone}
              icon={Phone}
              required
            />

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
              {profile && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                  disabled={submitting}
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <LoadingSpinner size={18} color="#fff" /> : profile ? "Save Changes" : "Create Profile"}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)" }}>
              Verified Passenger Information
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.25rem",
                backgroundColor: "var(--bg-subtle)",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Passenger Name
                </span>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.2rem" }}>
                  {profile.name}
                </p>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Age
                </span>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.2rem" }}>
                  {profile.age} years
                </p>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Gender
                </span>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.2rem", textTransform: "capitalize" }}>
                  {profile.gender}
                </p>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                  Phone Number
                </span>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)", marginTop: "0.2rem" }}>
                  {profile.phone}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteProfile}
        title="Delete Passenger Profile"
        message="Are you sure you want to delete your passenger profile? You will not be able to book new tickets without a profile."
        confirmText="Delete Profile"
        confirmVariant="danger"
        loading={deleteLoading}
      />
    </div>
  );
}
