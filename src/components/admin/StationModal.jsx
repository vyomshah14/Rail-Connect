import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { FormInput } from "../common/FormInput";
import { LoadingSpinner } from "../common/LoadingSpinner";

export function StationModal({ isOpen, onClose, onSave, station = null, loading = false }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (station) {
        setFormData({
          name: station.name || "",
          code: station.code || "",
          city: station.city || "",
          state: station.state || "",
        });
      } else {
        setFormData({ name: "", code: "", city: "", state: "" });
      }
      setErrors({});
    }
  }, [isOpen, station]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Station name is required";
    if (!formData.code.trim()) errs.code = "Station code is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      code: formData.code.toUpperCase().trim(),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={station ? "Edit Station" : "Add New Station"}
      footer={
        <>
          <button onClick={onClose} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
            {loading ? <LoadingSpinner size={16} color="#fff" /> : station ? "Update Station" : "Create Station"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <FormInput
          label="Station Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. New Delhi Railway Station"
          error={errors.name}
          required
        />
        <FormInput
          label="Station Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="e.g. NDLS"
          error={errors.code}
          required
        />
        <FormInput
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. New Delhi"
          error={errors.city}
          required
        />
        <FormInput
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="e.g. Delhi"
          error={errors.state}
          required
        />
      </form>
    </Modal>
  );
}
