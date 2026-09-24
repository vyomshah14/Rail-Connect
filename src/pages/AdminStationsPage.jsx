import React, { useState, useEffect } from "react";
import { stationApi } from "../api/stationApi";
import { StationModal } from "../components/admin/StationModal";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { useToast } from "../hooks/useToast";
import { Building2, Plus, Search, Edit2, Trash2, MapPin } from "lucide-react";

export function AdminStationsPage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [stationToDelete, setStationToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { showSuccess, showError } = useToast();

  const loadStations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await stationApi.getStations();
      setStations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load station list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStations();
  }, []);

  const handleOpenAdd = () => {
    setSelectedStation(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (station) => {
    setSelectedStation(station);
    setModalOpen(true);
  };

  const handleOpenDelete = (station) => {
    setStationToDelete(station);
    setDeleteModalOpen(true);
  };

  const handleSaveStation = async (formData) => {
    setSaveLoading(true);
    try {
      if (selectedStation) {
        await stationApi.updateStation(selectedStation._id, formData);
        showSuccess(`Station ${formData.code} updated successfully.`);
      } else {
        await stationApi.createStation(formData);
        showSuccess(`Station ${formData.code} created successfully.`);
      }
      setModalOpen(false);
      loadStations();
    } catch (err) {
      showError(err.message || "Failed to save station.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteStation = async () => {
    if (!stationToDelete) return;
    setDeleteLoading(true);

    try {
      await stationApi.deleteStation(stationToDelete._id);
      showSuccess(`Station ${stationToDelete.code} deleted successfully.`);
      setDeleteModalOpen(false);
      setStationToDelete(null);
      loadStations();
    } catch (err) {
      showError(err.message || "Failed to delete station.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredStations = stations.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.state?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Railway Stations Directory</h1>
          <p className="page-subtitle">
            Manage operational station codes, city nodes, and state territories
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={18} /> Add New Station
        </button>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: "1rem 1.25rem" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search station by name, code, city, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={loadStations} />}

      {loading ? (
        <PageLoader message="Loading station directory..." />
      ) : filteredStations.length === 0 ? (
        <EmptyState
          title="No Stations Found"
          description={
            searchQuery
              ? `No station matches "${searchQuery}".`
              : "No railway stations have been registered yet."
          }
          icon={Building2}
          actionText="Add New Station"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="table-responsive card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Station Name</th>
                <th>City</th>
                <th>State</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map((station) => (
                <tr key={station._id}>
                  <td>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        color: "var(--primary)",
                        backgroundColor: "var(--primary-light)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {station.code}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: "var(--navy)", fontSize: "0.95rem" }}>
                      {station.name}
                    </strong>
                  </td>
                  <td>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <MapPin size={14} color="var(--primary)" /> {station.city}
                    </span>
                  </td>
                  <td>{station.state}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                      <button
                        onClick={() => handleOpenEdit(station)}
                        className="btn btn-sm btn-secondary"
                        title="Edit Station"
                      >
                        <Edit2 size={15} color="var(--primary)" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(station)}
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Station"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Station Modal (Add / Edit) */}
      <StationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveStation}
        station={selectedStation}
        loading={saveLoading}
      />

      {/* Delete Station Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteStation}
        title="Delete Railway Station"
        message={`Are you sure you want to delete station "${stationToDelete?.name}" (${stationToDelete?.code})?`}
        confirmText="Delete Station"
        confirmVariant="danger"
        loading={deleteLoading}
      />
    </div>
  );
}
