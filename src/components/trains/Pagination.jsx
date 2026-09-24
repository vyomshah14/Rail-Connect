import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "1.75rem",
        paddingTop: "1rem",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 500 }}>
        Page <strong style={{ color: "var(--navy)" }}>{currentPage}</strong> of{" "}
        <strong style={{ color: "var(--navy)" }}>{totalPages}</strong>
      </span>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary btn-sm"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary btn-sm"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
