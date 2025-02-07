import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Snackbar, Alert, Grid } from "@mui/material";
import { MeasurementContext } from "../context/measurementContext";
import { fetchData } from "../services/measurementServices.ts";

const BASE_URL = "http://localhost:5063/api";

const MeasurementForm = ({ open, onClose, userId, editingMeasurement = null }) => {
  const { setMeasurements } = useContext(MeasurementContext);

  const [measurementsData, setMeasurementsData] = useState(
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
  const clearMeasurements = () =>
    setMeasurementsData({
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
    });
  useEffect(() => {
    if (editingMeasurement) setMeasurementsData(editingMeasurement);
  }, [editingMeasurement]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "progressPicture") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setMeasurementsData({
          ...measurementsData,
          progressPicture: reader.result,
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setMeasurementsData({
        ...measurementsData,
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
        ...measurementsData,
        userId: userId,
        measuredDate: new Date(measurementsData.measuredDate).toISOString().substring(0, 10),
        bodyWeight: parseFloat(measurementsData.bodyWeight) || 0,
        bodyFatPercentage: parseFloat(measurementsData.bodyFatPercentage) || 0,
        neck: parseFloat(measurementsData.neck) || 0,
        shoulder: parseFloat(measurementsData.shoulder) || 0,
        chest: parseFloat(measurementsData.chest) || 0,
        biceps: parseFloat(measurementsData.biceps) || 0,
        forearm: parseFloat(measurementsData.forearm) || 0,
        waist: parseFloat(measurementsData.waist) || 0,
        hips: parseFloat(measurementsData.hips) || 0,
        thighs: parseFloat(measurementsData.thighs) || 0,
        calves: parseFloat(measurementsData.calves) || 0,
        progressPicture: measurementsData.progressPicture || "",
        notes: measurementsData.notes || "",
      };
      try {
        if (submissionData.id) {
          await axios.put(`${BASE_URL}/BodyMeasurement/${submissionData.id}`, submissionData);
        } else {
          await axios.post(`${BASE_URL}/BodyMeasurement/${userId}`, submissionData);
        }
      } catch (error) {}
      const fetchedMeasurement = await fetchData(userId);
      setMeasurements(fetchedMeasurement);
      onClose();
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    } finally {
      clearMeasurements();
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
          <Form measurementsData={measurementsData} handleSubmit={handleSubmit} handleChange={handleChange} loading={loading} />
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

const Form = ({ measurementsData, handleSubmit, handleChange, loading }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Measured Date"
              type="date"
              name="measuredDate"
              value={measurementsData.measuredDate}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Weight (kg)"
              type="number"
              name="bodyWeight"
              value={measurementsData.bodyWeight}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
              step="0.1"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Body Fat (%)" type="number" name="bodyFatPercentage" value={measurementsData.bodyFatPercentage} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Neck (cm)" type="number" name="neck" value={measurementsData.neck} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Shoulder (cm)" type="number" name="shoulder" value={measurementsData.shoulder} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Chest (cm)" type="number" name="chest" value={measurementsData.chest} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Biceps (cm)" type="number" name="biceps" value={measurementsData.biceps} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Forearm (cm)" type="number" name="forearm" value={measurementsData.forearm} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Waist (cm)" type="number" name="waist" value={measurementsData.waist} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Hips (cm)" type="number" name="hips" value={measurementsData.hips} onChange={handleChange} fullWidth margin="dense" />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Thighs (cm)" type="number" name="thighs" value={measurementsData.thighs} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Calves (cm)" type="number" name="calves" value={measurementsData.calves} onChange={handleChange} fullWidth margin="dense" />
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
