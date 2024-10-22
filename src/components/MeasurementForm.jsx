import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const MeasurementForm = ({ open, onClose, addMeasurement }) => {
  const [measurements, setMeasurements] = useState({
    date: "",
    height: "",
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

  const [unit, setUnit] = useState("cm"); // Unit state to track selected unit (cm or inches)

  // Convert inches to centimeters
  const inchesToCm = (inches) => inches * 2.54;

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

  // Handle unit change (cm or inches)
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert all applicable values to cm if unit is inches
    const convertedMeasurements = { ...measurements };
    if (unit === "inches") {
      convertedMeasurements.height = inchesToCm(measurements.height);
      convertedMeasurements.waist = inchesToCm(measurements.waist);
      convertedMeasurements.neck = inchesToCm(measurements.neck);
      convertedMeasurements.shoulder = inchesToCm(measurements.shoulder);
      convertedMeasurements.chest = inchesToCm(measurements.chest);
      convertedMeasurements.biceps = inchesToCm(measurements.biceps);
      convertedMeasurements.forearm = inchesToCm(measurements.forearm);
      convertedMeasurements.abdomen = inchesToCm(measurements.abdomen);
      convertedMeasurements.hips = inchesToCm(measurements.hips);
      convertedMeasurements.thighs = inchesToCm(measurements.thighs);
      convertedMeasurements.calf = inchesToCm(measurements.calf);
    }

    addMeasurement(convertedMeasurements); // Call the addMeasurement method from parent
    setMeasurements({
      date: "",
      height: "",
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
          {/* Unit selection dropdown */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="unit-label">Measurement Unit</InputLabel>
            <Select
              labelId="unit-label"
              value={unit}
              onChange={handleUnitChange}
            >
              <MenuItem value="cm">Centimeters (cm)</MenuItem>
              <MenuItem value="inches">Inches (in)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={`Height (${unit})`}
            type="number"
            name="height"
            value={measurements.height}
            onChange={handleChange}
            fullWidth
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
            label={`Waist (${unit})`}
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
            label={`Neck (${unit})`}
            type="number"
            name="neck"
            value={measurements.neck}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Shoulder (${unit})`}
            type="number"
            name="shoulder"
            value={measurements.shoulder}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Chest (${unit})`}
            type="number"
            name="chest"
            value={measurements.chest}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Biceps (${unit})`}
            type="number"
            name="biceps"
            value={measurements.biceps}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Forearm (${unit})`}
            type="number"
            name="forearm"
            value={measurements.forearm}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Abdomen (${unit})`}
            type="number"
            name="abdomen"
            value={measurements.abdomen}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Hips (${unit})`}
            type="number"
            name="hips"
            value={measurements.hips}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Thighs (${unit})`}
            type="number"
            name="thighs"
            value={measurements.thighs}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label={`Calf (${unit})`}
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
