import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

const BASE_URL = "http://localhost:5063/api";

const formattedDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MeasurementList = ({ userId, onEdit, editData }) => {
  const [measurementData, setMeasurementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [showAllColumns, setShowAllColumns] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  // Fetch measurements
  const fetchMeasurements = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(`${BASE_URL}/BodyMeasurement`, {
      //   params: { userId },
      // });
      const response = await axios.get(`${BASE_URL}/BodyMeasurement`);
      console.log(response);
      setMeasurementData(response.data);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch measurements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData) setEditingMeasurement(editData);
  }, [editData]);

  useEffect(() => {
    fetchMeasurements();
  }, [userId]);

  // Delete measurement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/BodyMeasurement/${id}`);
      fetchMeasurements(); // Refresh the list
    } catch (err) {
      setError(err.response?.data || "Failed to delete measurement");
    }
  };

  // Sorting logic
  const sortedData = React.useMemo(() => {
    const sortedArray = [...measurementData];
    sortedArray.sort((a, b) => {
      if (sortConfig.key === "date") {
        return (new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])) * (sortConfig.direction === "asc" ? 1 : -1);
      } else {
        return (a[sortConfig.key] < b[sortConfig.key] ? -1 : 1) * (sortConfig.direction === "asc" ? 1 : -1);
      }
    });
    return sortedArray;
  }, [measurementData, sortConfig]);

  const handleSortRequest = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleToggleColumns = () => {
    setShowAllColumns((prev) => !prev);
  };

  // Error handling
  const handleCloseError = () => {
    setError(null);
  };

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Error Snackbar */}
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {/* Columns Toggle */}
      <FormControlLabel control={<Checkbox checked={showAllColumns} onChange={handleToggleColumns} color="primary" />} label="Display all measurements" />

      {/* Measurements Table */}
      {measurementData.length === 0 ? (
        <Box textAlign="center" p={3}>
          No measurements recorded yet.
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {/* Table headers remain similar to previous implementation */}
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "date"}
                    direction={sortConfig.key === "date" ? sortConfig.direction : "desc"}
                    onClick={() => handleSortRequest("date")}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "weight"}
                    direction={sortConfig.key === "weight" ? sortConfig.direction : "asc"}
                    onClick={() => handleSortRequest("weight")}
                  >
                    Weight (kg)
                  </TableSortLabel>
                </TableCell>
                {showAllColumns && (
                  <>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "waist"}
                        direction={sortConfig.key === "waist" ? sortConfig.direction : "asc"}
                        onClick={() => handleSortRequest("waist")}
                      >
                        Waist (cm)
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "bodyFatPercentage"}
                        direction={sortConfig.key === "bodyFatPercentage" ? sortConfig.direction : "asc"}
                        onClick={() => handleSortRequest("bodyFatPercentage")}
                      >
                        Body Fat (%)
                      </TableSortLabel>
                    </TableCell>
                    {/* Add other columns as needed */}
                    <TableCell>Neck (cm)</TableCell>
                    <TableCell>Shoulder (cm)</TableCell>
                    <TableCell>Chest (cm)</TableCell>
                    <TableCell>Biceps (cm)</TableCell>
                    <TableCell>Forearm (cm)</TableCell>
                    <TableCell>Abdomen (cm)</TableCell>
                    <TableCell>Hips (cm)</TableCell>
                    <TableCell>Thighs (cm)</TableCell>
                    <TableCell>Calf (cm)</TableCell>
                    <TableCell>Progress Picture</TableCell>
                    <TableCell colSpan={2}>Action</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((measurement) => (
                <TableRow key={measurement.id}>
                  <TableCell>{formattedDate(measurement.measuredDate)}</TableCell>
                  <TableCell>{measurement.bodyWeight}</TableCell>
                  {showAllColumns && ( // Render additional columns based on checkbox
                    <>
                      <TableCell>{measurement.waist}</TableCell>
                      <TableCell>{measurement.bodyFatPercentage}</TableCell>
                      <TableCell>{measurement.neck}</TableCell>
                      <TableCell>{measurement.shoulder}</TableCell>
                      <TableCell>{measurement.chest}</TableCell>
                      <TableCell>{measurement.biceps}</TableCell>
                      <TableCell>{measurement.forearm}</TableCell>
                      <TableCell>{measurement.abdomen}</TableCell>
                      <TableCell>{measurement.hips}</TableCell>
                      <TableCell>{measurement.thighs}</TableCell>
                      <TableCell>{measurement.calves}</TableCell>
                      <TableCell>
                        {measurement.progressPicture && <img src={measurement.progressPicture} alt="Progress" width="50" height="50" style={{ borderRadius: "50%" }} />}
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Button size="small" color="primary" variant="contained" onClick={() => onEdit(measurement.id)}>
                          Edit
                        </Button>
                        <Button color="error" size="small" variant="contained" onClick={() => handleDelete(measurement.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MeasurementList;
