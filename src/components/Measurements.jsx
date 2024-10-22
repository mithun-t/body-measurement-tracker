import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MeasurementForm from "./MeasurementForm";
import MeasurementList from "./MeasurementList";

const BodyMeasurementTracker = () => {
  const [open, setOpen] = useState(false);
  const [measurementData, setMeasurementData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // For edit mode

  // Fetch saved data from localStorage on component mount
  useEffect(() => {
    const savedMeasurements =
      JSON.parse(localStorage.getItem("measurements")) || [];
    setMeasurementData(savedMeasurements);
  }, []);

  // Handle adding or editing a measurement
  const addMeasurement = (newMeasurement) => {
    if (editingIndex !== null) {
      // Editing existing measurement
      const updatedMeasurements = measurementData.map((item, index) =>
        index === editingIndex ? newMeasurement : item
      );
      setMeasurementData(updatedMeasurements);
      localStorage.setItem("measurements", JSON.stringify(updatedMeasurements));
      setEditingIndex(null); // Reset after editing
    } else {
      // Adding new measurement
      const updatedMeasurements = [...measurementData, newMeasurement];
      setMeasurementData(updatedMeasurements);
      localStorage.setItem("measurements", JSON.stringify(updatedMeasurements));
    }
    setOpen(false); // Close form after adding/editing
  };

  // Handle opening form for editing
  const handleEdit = (index) => {
    setEditingIndex(index); // Set the index of the measurement to be edited
    setOpen(true); // Open the form for editing
  };

  // Handle deleting a measurement
  const handleDelete = (index) => {
    const updatedMeasurements = measurementData.filter((_, i) => i !== index);
    setMeasurementData(updatedMeasurements);
    localStorage.setItem("measurements", JSON.stringify(updatedMeasurements));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditingIndex(null); // Reset editing index if adding new measurement
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Floating Action Button to open form */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Measurement Form Component */}
      <MeasurementForm
        open={open}
        onClose={handleClose}
        addMeasurement={addMeasurement}
        initialData={
          editingIndex !== null ? measurementData[editingIndex] : null
        } // Pass initial data for editing
      />

      {/* Measurement List Component */}
      <MeasurementList
        measurementData={measurementData}
        onEdit={handleEdit} // Pass edit handler
        onDelete={handleDelete} // Pass delete handler
      />
    </div>
  );
};

export default BodyMeasurementTracker;
