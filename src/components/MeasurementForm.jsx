import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Snackbar, Alert, Grid } from "@mui/material";

const BASE_URL = "http://localhost:5063/api";

const MeasurementForm = ({ open, onClose, userId, onMeasurementAdded, editingMeasurement = null }) => {
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
  useEffect(() => {
    if (editingMeasurement) setMeasurements(editingMeasurement);
  }, [editingMeasurement]);
  console.log(editingMeasurement);
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
      const submissionData = {
        ...measurements,
        userId: userId,
        measuredDate: new Date().toISOString().substring(0, 10),
        bodyWeight: parseFloat(measurements.bodyWeight) || 0,
        bodyFatPercentage: parseFloat(measurements.bodyFatPercentage) || 0,
        neck: parseFloat(measurements.neck) || 0,
        shoulder: parseFloat(measurements.shoulder) || 0,
        chest: parseFloat(measurements.chest) || 0,
        biceps: parseFloat(measurements.biceps) || 0,
        forearm: parseFloat(measurements.forearm) || 0,
        waist: parseFloat(measurements.waist) || 0,
        hips: parseFloat(measurements.hips) || 0,
        thighs: parseFloat(measurements.thighs) || 0,
        calves: parseFloat(measurements.calves) || 0,
        progressPicture: measurements.progressPicture || "",
        notes: measurements.notes || "",
      };
      try {
        if (submissionData.id) {
          await axios.put(`${BASE_URL}/BodyMeasurement/${submissionData.id}`, submissionData);
        } else {
          await axios.post(`${BASE_URL}/BodyMeasurement/${userId}`, submissionData);
        }
      } catch (error) {}

      onMeasurementAdded();

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
        <DialogTitle>{editingMeasurement ? "Edit" : "Add"} Body Measurement</DialogTitle>
        <DialogContent>
          <Form measurements={measurements} handleSubmit={handleSubmit} handleChange={handleChange} loading={loading} />
        </DialogContent>
      </Dialog>
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

const Form = ({ measurements, handleSubmit, handleChange, loading }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <TextField label="Weight (kg)" type="number" name="bodyWeight" value={measurements.bodyWeight} onChange={handleChange} fullWidth required margin="dense" step="0.1" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Body Fat (%)" type="number" name="bodyFatPercentage" value={measurements.bodyFatPercentage} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Neck (cm)" type="number" name="neck" value={measurements.neck} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Shoulder (cm)" type="number" name="shoulder" value={measurements.shoulder} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Chest (cm)" type="number" name="chest" value={measurements.chest} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Biceps (cm)" type="number" name="biceps" value={measurements.biceps} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Forearm (cm)" type="number" name="forearm" value={measurements.forearm} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Waist (cm)" type="number" name="waist" value={measurements.waist} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Hips (cm)" type="number" name="hips" value={measurements.hips} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Thighs (cm)" type="number" name="thighs" value={measurements.thighs} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Calves (cm)" type="number" name="calves" value={measurements.calves} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" color="primary" variant="contained" disabled={loading} style={{ marginTop: "1rem" }} fullWidth>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default MeasurementForm;
