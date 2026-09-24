import React from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "../common/StatusBadge";
import { Edit2, Trash2, Eye } from "lucide-react";

export function TrainTable({ trains, onEdit, onDelete, isAdmin = false }) {
  if (!trains || trains.length === 0) return null;

  return (
    <div className="table-responsive card" style={{ padding: 0, overflow: "hidden" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Train</th>
            <th>Route</th>
            <th>Schedule</th>
            <th>Seats</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => {
            const source = train.source?.name || train.source?.code || "N/A";
            const dest = train.destination?.name || train.destination?.code || "N/A";

            return (
              <tr key={train._id}>
                <td>
                  <div>
                    <strong style={{ color: "var(--navy)" }}>{train.trainName}</strong>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--primary)" }}>
                      #{train.trainNumber}
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: "0.875rem" }}>
                    {source} &rarr; {dest}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>
                    <div>Dep: {train.departureTime}</div>
                    <div style={{ color: "var(--text-muted)" }}>Arr: {train.arrivalTime}</div>
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      fontWeight: 700,
                      color: train.availableSeats > 0 ? "var(--success)" : "var(--danger)",
                    }}
                  >
                    {train.availableSeats} / {train.totalSeats}
                  </span>
                </td>
                <td>
                  <StatusBadge status={train.status} />
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                    <Link
                      to={`/trains/${train._id}`}
                      className="btn btn-sm btn-secondary"
                      title="View Details"
                    >
                      <Eye size={15} />
                    </Link>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => onEdit(train)}
                          className="btn btn-sm btn-secondary"
                          title="Edit Train"
                        >
                          <Edit2 size={15} color="var(--primary)" />
                        </button>
                        <button
                          onClick={() => onDelete(train)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Train"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
