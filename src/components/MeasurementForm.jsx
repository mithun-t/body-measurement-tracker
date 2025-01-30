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

const BASE_URL = "http://localhost:5063/api";

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
      measuredDate: new Date().toISOString().split("T")[0],
      bodyWeight: "",
      bodyFatPercentage: "",
      neck: "",
      shoulder: "",
      chest: "",
      biceps: "",
      forearm: "",
      waist: "",
      hips: "",
      thighs: "",
      calves: "",
      progressPicture: "",
      notes: "",
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
        bodyFatPercentage: measurements.bodyFatPercentage || null,
        bodyWeight: measurements.bodyWeight || null,
        neck: measurements.neck || null,
        shoulder: measurements.shoulder || null,
        chest: measurements.chest || null,
        biceps: measurements.biceps || null,
        forearm: measurements.forearm || null,
        waist: measurements.waist || null,
        hips: measurements.hips || null,
        thighs: measurements.thighs || null,
        calves: measurements.calves || null,
        progressPicture: measurements.progressPicture || null,
        notes: measurements.notes || null,
      };
      // Send to API
      await axios.post(`${BASE_URL}/BodyMeasurement`, submissionData);

      const response = await axios.get(`${BASE_URL}/BodyMeasurement`);
      console.log(response);
      setMeasurements(response.data);

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
              label="Measured Date"
              type="date"
              name="measuredDate"
              value={measurements.measuredDate}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              margin="dense"
            />

            <TextField
              label="Weight (kg)"
              type="number"
              name="bodyWeight"
              value={measurements.bodyWeight}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
              step="0.1"
            />

            <TextField
              label="Body Fat (%)"
              type="number"
              name="bodyFatPercentage"
              value={measurements.bodyFatPercentage}
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
              label={`Waist (cm)`}
              type="number"
              name="waist"
              value={measurements.waist}
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
              label={`Calves (cm)`}
              type="number"
              name="calves"
              value={measurements.calves}
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
