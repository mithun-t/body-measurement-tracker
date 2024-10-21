import React, { useState, useEffect } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// MeasurementForm and MeasurementList in one component
const BodyMeasurementTracker = () => {
  const [open, setOpen] = useState(false); // To handle dialog open/close
  const [measurements, setMeasurements] = useState({
    weight: "",
    bodyFat: "",
    chest: "",
    waist: "",
    arm: "",
    leg: "",
    date: "",
  });
  const [measurementData, setMeasurementData] = useState([]);

  // Fetch saved data from localStorage on component mount
  useEffect(() => {
    const savedMeasurements =
      JSON.parse(localStorage.getItem("measurements")) || [];
    setMeasurementData(savedMeasurements);
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let savedMeasurements =
      JSON.parse(localStorage.getItem("measurements")) || [];
    savedMeasurements.push(measurements);
    localStorage.setItem("measurements", JSON.stringify(savedMeasurements));
    setMeasurementData(savedMeasurements); // Update the list
    setMeasurements({
      weight: "",
      bodyFat: "",
      chest: "",
      waist: "",
      arm: "",
      leg: "",
      date: "",
    });
    setOpen(false); // Close the dialog after submission
  };

  // Handle opening/closing dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* FAB button to open the form in dialog */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Dialog for the Measurement Form */}
      <Dialog open={open} onClose={handleClose}>
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
              label="Body Fat (%)"
              type="number"
              name="bodyFat"
              value={measurements.bodyFat}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Chest (cm)"
              type="number"
              name="chest"
              value={measurements.chest}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Waist (cm)"
              type="number"
              name="waist"
              value={measurements.waist}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Arm (cm)"
              type="number"
              name="arm"
              value={measurements.arm}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Leg (cm)"
              type="number"
              name="leg"
              value={measurements.leg}
              onChange={handleChange}
              fullWidth
              margin="dense"
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

      {/* Measurement List */}
      <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Weight (kg)</TableCell>
              <TableCell>Body Fat (%)</TableCell>
              <TableCell>Chest (cm)</TableCell>
              <TableCell>Waist (cm)</TableCell>
              <TableCell>Arm (cm)</TableCell>
              <TableCell>Leg (cm)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {measurementData.map((measurement, index) => (
              <TableRow key={index}>
                <TableCell>{measurement.date}</TableCell>
                <TableCell>{measurement.weight}</TableCell>
                <TableCell>{measurement.bodyFat}</TableCell>
                <TableCell>{measurement.chest}</TableCell>
                <TableCell>{measurement.waist}</TableCell>
                <TableCell>{measurement.arm}</TableCell>
                <TableCell>{measurement.leg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BodyMeasurementTracker;
