import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const BASE_URL = "http://localhost:5147/api";

const MeasurementForm = ({
  open,
  onClose,
  userId,
  onMeasurementAdded,
  editingMeasurement = null,
}) => {
  const [measurements, setMeasurements] = useState(
    editingMeasurement || {
      userId: userId,
      date: new Date().toISOString().split("T")[0],
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
    }
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare the data for submission
      const submissionData = {
        ...measurements,
        userId: userId,
        waist: measurements.waist || null,
        bodyFat: measurements.bodyFat || null,
        neck: measurements.neck || null,
        shoulder: measurements.shoulder || null,
        chest: measurements.chest || null,
        biceps: measurements.biceps || null,
        forearm: measurements.forearm || null,
        abdomen: measurements.abdomen || null,
        hips: measurements.hips || null,
        thighs: measurements.thighs || null,
        calf: measurements.calf || null,
        progressPicture: measurements.progressPicture || null,
      };

      // Send to API
      const response = await axios.post(
        `${BASE_URL}/BodyMeasurement`,
        submissionData
      );

      // Notify parent component
      onMeasurementAdded();

      // Reset form and close
      onClose();
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {editingMeasurement ? "Edit" : "Add"} Body Measurement
        </DialogTitle>
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
              InputLabelProps={{ shrink: true }}
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
              step="0.1"
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
              disabled={loading}
              style={{ marginTop: "1rem" }}
              fullWidth
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default MeasurementForm;
