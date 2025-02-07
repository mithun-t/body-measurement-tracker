import React, { useState, useContext } from "react";
import axios from "axios";
import { Fab, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MeasurementForm from "./MeasurementForm";
import MeasurementList from "./MeasurementList";
import { UserContext } from "../context/userContext";
import { MeasurementContext } from "../context/measurementContext.js";
import { BASE_URL } from "../services/measurementServices.js";

const BodyMeasurementTracker = () => {
  const [open, setOpen] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);
  const { measurements } = useContext(MeasurementContext);

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

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
        <AddIcon />
      </Fab>

      <MeasurementForm open={open} onClose={handleClose} userId={userId} editingMeasurement={editingMeasurement} />
      <MeasurementList measurements={measurements} onEdit={handleEdit} />

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default BodyMeasurementTracker;
