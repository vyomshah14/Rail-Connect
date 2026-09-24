import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  confirmVariant = "danger",
  loading = false,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button onClick={onClose} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`btn btn-${confirmVariant}`}
            disabled={loading}
          >
            {loading ? <LoadingSpinner size={16} color="#fff" /> : confirmText}
          </button>
        </>
      }
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: confirmVariant === "danger" ? "var(--danger-bg)" : "var(--warning-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: confirmVariant === "danger" ? "var(--danger)" : "var(--warning)",
            flexShrink: 0,
          }}
        >
          <AlertTriangle size={22} />
        </div>
        <div>
          <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: 1.5 }}>
            {message}
          </p>
          {children}
        </div>
      </div>
    </Modal>
  );
}
