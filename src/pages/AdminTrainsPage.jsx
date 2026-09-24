import React, { useState, useEffect, useCallback } from "react";
import { trainApi } from "../api/trainApi";
import { TrainTable } from "../components/trains/TrainTable";
import { TrainModal } from "../components/admin/TrainModal";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { SearchBar } from "../components/trains/SearchBar";
import { Pagination } from "../components/trains/Pagination";
import { PageLoader } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { EmptyState } from "../components/common/EmptyState";
import { useToast } from "../hooks/useToast";
import { Train, Plus } from "lucide-react";

export function AdminTrainsPage() {
  const [trains, setTrains] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalTrains: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [trainToDelete, setTrainToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { showSuccess, showError } = useToast();

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
        limit: 8,
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
      setError(err.message || "Failed to load trains.");
    } finally {
      setLoading(false);
    }
  }, [search, status, sort, order, page]);

  useEffect(() => {
    fetchTrains();
  }, [fetchTrains]);

  const handleOpenAdd = () => {
    setSelectedTrain(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (train) => {
    setSelectedTrain(train);
    setModalOpen(true);
  };

  const handleOpenDelete = (train) => {
    setTrainToDelete(train);
    setDeleteModalOpen(true);
  };

  const handleSaveTrain = async (formData) => {
    setSaveLoading(true);
    try {
      if (selectedTrain) {
        // Update train
        await trainApi.updateTrain(selectedTrain._id, formData);
        showSuccess(`Train #${formData.trainNumber} updated successfully.`);
      } else {
        // Create train
        await trainApi.createTrain(formData);
        showSuccess(`Train #${formData.trainNumber} created successfully.`);
      }
      setModalOpen(false);
      fetchTrains();
    } catch (err) {
      showError(err.message || "Failed to save train.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteTrain = async () => {
    if (!trainToDelete) return;
    setDeleteLoading(true);

    try {
      await trainApi.deleteTrain(trainToDelete._id);
      showSuccess(`Train #${trainToDelete.trainNumber} deleted successfully.`);
      setDeleteModalOpen(false);
      setTrainToDelete(null);
      fetchTrains();
    } catch (err) {
      showError(err.message || "Failed to delete train.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Train Fleet Management</h1>
          <p className="page-subtitle">
            Configure train routes, schedules, seat inventory, and operational status
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={18} /> Add New Train
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        onSearch={() => { setPage(1); fetchTrains(); }}
        onReset={() => { setSearch(""); setStatus(""); setSort(""); setOrder("asc"); setPage(1); }}
      />

      {error && <ErrorMessage message={error} onRetry={fetchTrains} />}

      {loading ? (
        <PageLoader message="Loading train inventory..." />
      ) : trains.length === 0 ? (
        <EmptyState
          title="No Trains Configured"
          description="There are no trains matching your filter criteria. Click 'Add New Train' to configure a train route."
          icon={Train}
          actionText="Add New Train"
          onAction={handleOpenAdd}
        />
      ) : (
        <>
          <TrainTable
            trains={trains}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            isAdmin={true}
          />

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}

      {/* Train Form Modal (Add / Edit) */}
      <TrainModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTrain}
        train={selectedTrain}
        loading={saveLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteTrain}
        title="Delete Train Route"
        message={`Are you sure you want to delete train "${trainToDelete?.trainName}" (#${trainToDelete?.trainNumber})? This cannot be undone.`}
        confirmText="Delete Train"
        confirmVariant="danger"
        loading={deleteLoading}
      />
    </div>
  );
}
