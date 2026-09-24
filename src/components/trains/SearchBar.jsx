import React from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";

export function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  order,
  setOrder,
  onSearch,
  onReset,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        padding: "1.25rem",
        marginBottom: "1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        alignItems: "end",
      }}
    >
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Search size={15} /> Search Train
        </label>
        <input
          type="text"
          placeholder="Train name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Filter size={15} /> Status
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
          <option value="">All Statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="boarding">Boarding</option>
          <option value="departed">Departed</option>
          <option value="in_transit">In Transit</option>
          <option value="arriving">Arriving</option>
          <option value="arrived">Arrived</option>
          <option value="delayed">Delayed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <ArrowUpDown size={15} /> Sort By
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="form-select">
          <option value="">Default Order</option>
          <option value="name">Train Name</option>
          <option value="departure">Departure Time</option>
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Order</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)} className="form-select">
          <option value="asc">Ascending (A-Z / Early)</option>
          <option value="desc">Descending (Z-A / Late)</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
          Search
        </button>
        {onReset && (
          <button type="button" onClick={onReset} className="btn btn-secondary">
            Reset
          </button>
        )}
      </div>
    </form>
  );
}
