import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { FormInput } from "../common/FormInput";
import { SelectInput } from "../common/SelectInput";
import { dashboardApi } from "../../api/dashboardApi";
import { notificationApi } from "../../api/notificationApi";
import { useToast } from "../../hooks/useToast";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Send, Bell, User } from "lucide-react";

export function CreateNotificationModal({ isOpen, onClose, onSuccess }) {
  const { showSuccess, showError } = useToast();

  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    title: "",
    message: "",
    type: "general",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ user: "", title: "", message: "", type: "general" });
      setErrors({});

      // Fetch passenger bookings to populate user IDs list for convenience
      dashboardApi
        .getStats()
        .then((data) => {
          if (Array.isArray(data.bookingWithPassengers)) {
            const map = new Map();
            data.bookingWithPassengers.forEach((item) => {
              const pDetail = Array.isArray(item.passengerDetails) ? item.passengerDetails[0] : item.passengerDetails;
              if (pDetail && pDetail.user) {
                map.set(pDetail.user, {
                  value: pDetail.user,
                  label: `${pDetail.name || "Passenger"} (${pDetail.phone || pDetail.user})`,
                });
              }
            });
            setUsersList(Array.from(map.values()));
          }
        })
        .catch(() => setUsersList([]));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.user.trim()) errs.user = "Target User ID / Passenger is required";
    if (!formData.title.trim()) errs.title = "Notification title is required";
    if (!formData.message.trim()) errs.message = "Notification message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await notificationApi.createNotification({
        user: formData.user.trim(),
        title: formData.title.trim(),
        message: formData.message.trim(),
        type: formData.type,
      });

      showSuccess("Notification sent successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      showError(err.message || "Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    { value: "general", label: "General Notice" },
    { value: "train_status", label: "Train Status / Delay Alert" },
    { value: "booking", label: "Booking Alert" },
    { value: "cancellation", label: "Cancellation Notice" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create & Send System Notification"
      footer={
        <>
          <button onClick={onClose} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
            {loading ? <LoadingSpinner size={16} color="#fff" /> : <><Send size={16} /> Broadcast Notification</>}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {usersList.length > 0 ? (
          <SelectInput
            label="Target Passenger"
            name="user"
            value={formData.user}
            onChange={handleChange}
            options={usersList}
            error={errors.user}
            placeholder="Select target passenger..."
            required
          />
        ) : (
          <FormInput
            label="Target User ID"
            name="user"
            value={formData.user}
            onChange={handleChange}
            placeholder="e.g. 6ab57d637767fe41c9d2b0f1"
            error={errors.user}
            icon={User}
            required
          />
        )}

        <SelectInput
          label="Notification Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={typeOptions}
          required
        />

        <FormInput
          label="Notification Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Platform 4 Boarding Notice"
          error={errors.title}
          icon={Bell}
          required
        />

        <div className="form-group">
          <label className="form-label">
            Message Body <span style={{ color: "var(--danger)" }}>*</span>
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter detailed notification message for passenger..."
            className="form-textarea"
            style={{ borderColor: errors.message ? "var(--danger)" : undefined }}
            required
          />
          {errors.message && <span className="form-error-msg">{errors.message}</span>}
        </div>
      </form>
    </Modal>
  );
}
