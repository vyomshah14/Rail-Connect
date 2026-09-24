import React, { createContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showSuccess = useCallback((msg) => addToast(msg, "success"), [addToast]);
  const showError = useCallback((msg) => addToast(msg, "error"), [addToast]);
  const showWarning = useCallback((msg) => addToast(msg, "warning"), [addToast]);
  const showInfo = useCallback((msg) => addToast(msg, "info"), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.type === "success" && <CheckCircle2 size={20} color="var(--success)" />}
            {toast.type === "error" && <AlertCircle size={20} color="var(--danger)" />}
            {toast.type === "warning" && <AlertTriangle size={20} color="var(--warning)" />}
            {toast.type === "info" && <Info size={20} color="var(--info)" />}
            <div style={{ flex: 1, fontSize: "0.875rem", fontWeight: 500, color: "var(--text-main)" }}>
              {toast.message}
            </div>
            <button onClick={() => removeToast(toast.id)} style={{ color: "var(--text-muted)", padding: "2px" }}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
