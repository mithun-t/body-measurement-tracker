import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Fab, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MeasurementForm from "./MeasurementForm";
import MeasurementList from "./MeasurementList";
import { UserContext } from "../context/userContext";
import { MeasurementContext } from "../context/measurementContext.js";

const BASE_URL = "http://localhost:5063/api";

const BodyMeasurementTracker = () => {
  const [open, setOpen] = useState(false);
  const [measurementData, setMeasurementData] = useState([]);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const { userId } = useContext(UserContext);
  const { measurements } = useContext(MeasurementContext);

  const fetchMeasurements = async () => {
    try {
      const sortedMeasurements = measurements.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log("response", sortedMeasurements);
      setMeasurementData(sortedMeasurements);
      console.log("measadded", sortedMeasurements);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch measurements");
    }
  };

  useEffect(() => {
    fetchMeasurements();
  }, [measurements]);

  const handleClickOpen = () => {
    setEditingMeasurement(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMeasurement(null);
  };

  const handleEdit = async (id) => {
    const response = await axios.get(`${BASE_URL}/BodyMeasurement/${id}`);
    setEditingMeasurement(response.data);
    console.log("L", response.data);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      await axios.delete(`${BASE_URL}/BodyMeasurement/${deleteConfirmation.id}`);
      fetchMeasurements();
      setDeleteConfirmation(null);
    } catch (err) {
      setError(err.response?.data || "Failed to delete measurement");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
        <AddIcon />
      </Fab>

      <MeasurementForm open={open} onClose={handleClose} userId={userId} onMeasurementAdded={fetchMeasurements} editingMeasurement={editingMeasurement} />

      <MeasurementList measurements={measurements} onEdit={handleEdit} />

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

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
    </>
  );
};

export default BodyMeasurementTracker;
