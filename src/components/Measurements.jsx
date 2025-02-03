import React, { useState, useEffect } from "react";
import axios from "axios";
import { Fab, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MeasurementForm from "./MeasurementForm";
import MeasurementList from "./MeasurementList";

const BASE_URL = "http://localhost:5063/api";

const BodyMeasurementTracker = () => {
  // State management
  const [open, setOpen] = useState(false);
  const [measurementData, setMeasurementData] = useState([]);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [userId, setUserId] = useState(1); // Hardcoded for now, replace with actual user ID

  // Fetch measurements from API
  const fetchMeasurements = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/BodyMeasurement`, {
      //   params: { userId },
      // });
      const response = await axios.get(`${BASE_URL}/BodyMeasurement`);
      // Sort measurements by date in descending order
      const sortedMeasurements = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMeasurementData(sortedMeasurements);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch measurements");
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchMeasurements();
  }, [userId]);

  // Handle opening form for adding new measurement
  const handleClickOpen = () => {
    setEditingMeasurement(null);
    setOpen(true);
  };

  // Handle closing form
  const handleClose = () => {
    setOpen(false);
    setEditingMeasurement(null);
  };

  // Handle edit - prepare for editing
  const handleEdit = async (id) => {
    const response = await axios.get(`${BASE_URL}/BodyMeasurement/${id}`);
    setEditingMeasurement(response.data);
    console.log("L", response.data);
    setOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (index) => {
    setDeleteConfirmation(measurementData[index]);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      await axios.delete(`${BASE_URL}/BodyMeasurement/${deleteConfirmation.id}`);
      // Refresh measurements after delete
      fetchMeasurements();
      // Close confirmation dialog
      setDeleteConfirmation(null);
    } catch (err) {
      setError(err.response?.data || "Failed to delete measurement");
    }
  };

  // Close error snackbar
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div>
      {/* Floating Action Button to open form */}
      <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
        <AddIcon />
      </Fab>

      {/* Measurement Form Component */}
      <MeasurementForm open={open} onClose={handleClose} userId={userId} onMeasurementAdded={fetchMeasurements} editingMeasurement={editingMeasurement} />

      {/* Measurement List Component */}
      <MeasurementList userId={userId} onEdit={handleEdit} onDelete={handleDeleteConfirmation} />

      {/* Error Snackbar */}
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmation} onClose={() => setDeleteConfirmation(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this measurement from {deleteConfirmation?.date ? new Date(deleteConfirmation.date).toLocaleDateString() : "this date"}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BodyMeasurementTracker;
