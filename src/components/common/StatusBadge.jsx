import React from "react";

export function StatusBadge({ status, type = "train" }) {
  if (!status) return null;

  const formattedStatus = status.replace("_", " ");

  let badgeClass = `badge badge-${status}`;

  return <span className={badgeClass}>{formattedStatus}</span>;
}
