import React, { useState, useEffect, useCallback } from "react";
import { trainApi } from "../api/trainApi";
import { SearchBar } from "../components/trains/SearchBar";
import { TrainCard } from "../components/trains/TrainCard";
import { Pagination } from "../components/trains/Pagination";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { Train, LayoutGrid, List } from "lucide-react";

export function TrainsPage() {
  const [trains, setTrains] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalTrains: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' | 'table'

  const fetchTrains = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await trainApi.getTrains({
        search,
        status,
        sort,
        order,
        page,
        limit: 6,
      });

      setTrains(data.trains || []);
      if (data.pagination) {
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalTrains: data.pagination.totalTrains,
        });
      }
    } catch (err) {
      setError(err.message || "Failed to load trains. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, status, sort, order, page]);

  useEffect(() => {
    fetchTrains();
  }, [fetchTrains]);

  const handleSearchSubmit = () => {
    setPage(1);
    fetchTrains();
  };

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setSort("");
    setOrder("asc");
    setPage(1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Train Schedule & Search</h1>
          <p className="page-subtitle">
            Explore active train schedules, station routes, and real-time seat availability
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => setViewMode("cards")}
            className={`btn btn-sm ${viewMode === "cards" ? "btn-primary" : "btn-secondary"}`}
            title="Card Grid View"
          >
            <LayoutGrid size={16} /> Grid View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`btn btn-sm ${viewMode === "table" ? "btn-primary" : "btn-secondary"}`}
            title="Table View"
          >
            <List size={16} /> Table View
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        onSearch={handleSearchSubmit}
        onReset={handleReset}
      />

      {error && <ErrorMessage message={error} onRetry={fetchTrains} />}

      {loading ? (
        <PageLoader message="Fetching train schedules..." />
      ) : trains.length === 0 ? (
        <EmptyState
          title="No Trains Found"
          description="No trains match your search criteria. Try adjusting your search query or filters."
          icon={Train}
          actionText="Reset Filters"
          onAction={handleReset}
        />
      ) : (
        <>
          {viewMode === "cards" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {trains.map((train) => (
                <TrainCard key={train._id} train={train} />
              ))}
            </div>
          ) : (
            <div className="table-responsive card" style={{ padding: 0, overflow: "hidden" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Train No.</th>
                    <th>Train Name</th>
                    <th>Route</th>
                    <th>Dep - Arr</th>
                    <th>Available Seats</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.map((train) => (
                    <tr key={train._id}>
                      <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--primary)" }}>
                        #{train.trainNumber}
                      </td>
                      <td><strong>{train.trainName}</strong></td>
                      <td>
                        {train.source?.name || train.source?.code} &rarr; {train.destination?.name || train.destination?.code}
                      </td>
                      <td>{train.departureTime} - {train.arrivalTime}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: train.availableSeats > 0 ? "var(--success)" : "var(--danger)" }}>
                          {train.availableSeats} / {train.totalSeats}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${train.status}`}>{train.status}</span>
                      </td>
                      <td>
                        <a href={`/trains/${train._id}`} className="btn btn-sm btn-primary">
                          Book
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
}
