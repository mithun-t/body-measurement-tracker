import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const MeasurementForm = ({ open, onClose, addMeasurement }) => {
  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Extract YYYY-MM-DD from ISO string
  };
  const [measurements, setMeasurements] = useState({
    date: getTodayDate(),
    weight: "",
    waist: "",
    bodyFat: "",
    neck: "",
    shoulder: "",
    chest: "",
    biceps: "",
    forearm: "",
    abdomen: "",
    hips: "",
    thighs: "",
    calf: "",
    progressPicture: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "progressPicture") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setMeasurements({
          ...measurements,
          progressPicture: reader.result,
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setMeasurements({
        ...measurements,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const convertedMeasurements = { ...measurements };
    addMeasurement(convertedMeasurements);
    setMeasurements({
      date: "",
      weight: "",
      waist: "",
      bodyFat: "",
      neck: "",
      shoulder: "",
      chest: "",
      biceps: "",
      forearm: "",
      abdomen: "",
      hips: "",
      thighs: "",
      calf: "",
      progressPicture: "",
    });
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Body Measurement</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={measurements.date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            margin="dense"
          />

          <TextField
            label="Weight (kg)"
            type="number"
            name="weight"
            value={measurements.weight}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label={`Waist (cm)`}
            type="number"
            name="waist"
            value={measurements.waist}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Body Fat (%)"
            type="number"
            name="bodyFat"
            value={measurements.bodyFat}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Neck (cm)`}
            type="number"
            name="neck"
            value={measurements.neck}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Shoulder (cm)`}
            type="number"
            name="shoulder"
            value={measurements.shoulder}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Chest (cm)`}
            type="number"
            name="chest"
            value={measurements.chest}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Biceps (cm)`}
            type="number"
            name="biceps"
            value={measurements.biceps}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Forearm (cm)`}
            type="number"
            name="forearm"
            value={measurements.forearm}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Abdomen (cm)`}
            type="number"
            name="abdomen"
            value={measurements.abdomen}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Hips (cm)`}
            type="number"
            name="hips"
            value={measurements.hips}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Thighs (cm)`}
            type="number"
            name="thighs"
            value={measurements.thighs}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Calf (cm)`}
            type="number"
            name="calf"
            value={measurements.calf}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Progress Picture"
            type="file"
            name="progressPicture"
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: "1rem" }}
            fullWidth
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MeasurementForm;
