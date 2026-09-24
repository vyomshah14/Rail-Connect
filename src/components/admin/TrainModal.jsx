import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { FormInput } from "../common/FormInput";
import { SelectInput } from "../common/SelectInput";
import { stationApi } from "../../api/stationApi";
import { LoadingSpinner } from "../common/LoadingSpinner";

export function TrainModal({ isOpen, onClose, onSave, train = null, loading = false }) {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    departureTime: "08:00 AM",
    arrivalTime: "04:00 PM",
    totalSeats: 100,
    availableSeats: 100,
    status: "scheduled",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Fetch stations for source/destination dropdown selection
      stationApi
        .getStations()
        .then((data) => setStations(data || []))
        .catch(() => setStations([]));

      if (train) {
        setFormData({
          trainNumber: train.trainNumber || "",
          trainName: train.trainName || "",
          source: typeof train.source === "object" ? train.source?._id : train.source || "",
          destination: typeof train.destination === "object" ? train.destination?._id : train.destination || "",
          departureTime: train.departureTime || "08:00 AM",
          arrivalTime: train.arrivalTime || "04:00 PM",
          totalSeats: train.totalSeats || 100,
          availableSeats: train.availableSeats || 100,
          status: train.status || "scheduled",
        });
      } else {
        setFormData({
          trainNumber: "",
          trainName: "",
          source: "",
          destination: "",
          departureTime: "08:00 AM",
          arrivalTime: "04:00 PM",
          totalSeats: 100,
          availableSeats: 100,
          status: "scheduled",
        });
      }
      setErrors({});
    }
  }, [isOpen, train]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.trainNumber.trim()) errs.trainNumber = "Train number is required";
    if (!formData.trainName.trim()) errs.trainName = "Train name is required";
    if (!formData.source) errs.source = "Source station is required";
    if (!formData.destination) errs.destination = "Destination station is required";
    if (formData.source && formData.source === formData.destination) {
      errs.destination = "Destination cannot be same as source station";
    }
    if (!formData.departureTime) errs.departureTime = "Departure time is required";
    if (!formData.arrivalTime) errs.arrivalTime = "Arrival time is required";
    if (Number(formData.totalSeats) <= 0) errs.totalSeats = "Seats must be greater than 0";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      totalSeats: Number(formData.totalSeats),
      availableSeats: Number(formData.availableSeats),
    });
  };

  const stationOptions = stations.map((s) => ({
    value: s._id,
    label: `${s.name} (${s.code}) - ${s.city}`,
  }));

  const statusOptions = [
    { value: "scheduled", label: "Scheduled" },
    { value: "boarding", label: "Boarding" },
    { value: "departed", label: "Departed" },
    { value: "in_transit", label: "In Transit" },
    { value: "arriving", label: "Arriving" },
    { value: "arrived", label: "Arrived" },
    { value: "delayed", label: "Delayed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={train ? "Edit Train" : "Add New Train"}
      footer={
        <>
          <button onClick={onClose} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
            {loading ? <LoadingSpinner size={16} color="#fff" /> : train ? "Update Train" : "Create Train"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
        <FormInput
          label="Train Number"
          name="trainNumber"
          value={formData.trainNumber}
          onChange={handleChange}
          placeholder="e.g. 12951"
          error={errors.trainNumber}
          required
        />
        <FormInput
          label="Train Name"
          name="trainName"
          value={formData.trainName}
          onChange={handleChange}
          placeholder="e.g. Rajdhani Express"
          error={errors.trainName}
          required
        />

        <SelectInput
          label="Source Station"
          name="source"
          value={formData.source}
          onChange={handleChange}
          options={stationOptions}
          error={errors.source}
          placeholder="Select Source Station"
          required
        />

        <SelectInput
          label="Destination Station"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          options={stationOptions}
          error={errors.destination}
          placeholder="Select Destination Station"
          required
        />

        <FormInput
          label="Departure Time"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          placeholder="e.g. 04:30 PM"
          error={errors.departureTime}
          required
        />

        <FormInput
          label="Arrival Time"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          placeholder="e.g. 08:30 AM"
          error={errors.arrivalTime}
          required
        />

        <FormInput
          label="Total Seats"
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          error={errors.totalSeats}
          required
        />

        <FormInput
          label="Available Seats"
          type="number"
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleChange}
          error={errors.availableSeats}
          required
        />

        <div style={{ gridColumn: "1 / -1" }}>
          <SelectInput
            label="Operational Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
        </div>
      </form>
    </Modal>
  );
}
