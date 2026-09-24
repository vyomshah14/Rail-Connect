import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  icon: Icon,
  disabled = false,
  min,
  max,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span style={{ color: "var(--danger)" }}>*</span>}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {Icon && (
          <div
            style={{
              position: "absolute",
              left: "12px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <Icon size={18} />
          </div>
        )}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className="form-input"
          style={{
            paddingLeft: Icon ? "2.5rem" : "0.9rem",
            paddingRight: isPassword ? "2.5rem" : "0.9rem",
            borderColor: error ? "var(--danger)" : undefined,
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
            }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="form-error-msg">{error}</span>}
    </div>
  );
}
