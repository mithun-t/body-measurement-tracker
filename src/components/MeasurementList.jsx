import React, { useState, useContext } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Checkbox, FormControlLabel, Snackbar, Alert, Box, Button } from "@mui/material";
import { BASE_URL, fetchData } from "../services/measurementServices.js";
import { UserContext } from "../context/userContext.js";
import { MeasurementContext } from "../context/measurementContext.js";

const formattedDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MeasurementList = ({ measurements, onEdit }) => {
  const { setMeasurements } = useContext(MeasurementContext);
  const { userId } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [showAllColumns, setShowAllColumns] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/BodyMeasurement/${id}`);
      const fetchedMeasurement = await fetchData(userId);
      setMeasurements(fetchedMeasurement);
    } catch (err) {
      setError(err.response?.data || "Failed to delete measurement");
    }
  };

  const sortedData = React.useMemo(() => {
    const sortedArray = [...measurements];
    sortedArray.sort((a, b) => {
      if (sortConfig.key === "date") {
        return (new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])) * (sortConfig.direction === "asc" ? 1 : -1);
      } else {
        return (a[sortConfig.key] < b[sortConfig.key] ? -1 : 1) * (sortConfig.direction === "asc" ? 1 : -1);
      }
    });
    return sortedArray;
  }, [measurements, sortConfig]);

  const handleSortRequest = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleToggleColumns = () => {
    setShowAllColumns((prev) => !prev);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const formatMeasurementToEmpty = (measurement) => {
    return Number(measurement) === 0 ? "" : measurement;
  };
  return (
    <div style={{ marginTop: "2rem" }}>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {measurements.length === 0 ? (
        <Box textAlign="center" p={3}>
          No measurements recorded yet.
        </Box>
      ) : (
        <>
          <FormControlLabel control={<Checkbox checked={showAllColumns} onChange={handleToggleColumns} color="primary" />} label="Display all measurements" />
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "measuredDate"}
                      direction={sortConfig.key === "measuredDate" ? sortConfig.direction : "desc"}
                      onClick={() => handleSortRequest("measuredDate")}
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
                      <TableCell>Neck (cm)</TableCell>
                      <TableCell>Shoulder (cm)</TableCell>
                      <TableCell>Chest (cm)</TableCell>
                      <TableCell>Biceps (cm)</TableCell>
                      <TableCell>Forearm (cm)</TableCell>
                      <TableCell>Hips (cm)</TableCell>
                      <TableCell>Thighs (cm)</TableCell>
                      <TableCell>Calf (cm)</TableCell>
                      <TableCell>Progress Picture</TableCell>
                    </>
                  )}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((measurement) => (
                  <TableRow key={measurement.id}>
                    <TableCell>{formattedDate(measurement.measuredDate)}</TableCell>
                    <TableCell>{formatMeasurementToEmpty(measurement.bodyWeight)}</TableCell>
                    {showAllColumns && (
                      <>
                        <TableCell>{formatMeasurementToEmpty(measurement.waist)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.bodyFatPercentage)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.neck)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.shoulder)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.chest)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.biceps)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.forearm)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.hips)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.thighs)}</TableCell>
                        <TableCell>{formatMeasurementToEmpty(measurement.calves)}</TableCell>
                        <TableCell>
                          {measurement.progressPicture && <img src={measurement.progressPicture} alt="Progress" width="50" height="50" style={{ borderRadius: "50%" }} />}
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      <Box display="flex" gap={1} justifyContent="left">
                        <Button size="small" color="primary" variant="contained" onClick={() => onEdit(measurement.id)}>
                          Edit
                        </Button>
                        <Button color="error" size="small" variant="contained" onClick={() => handleDelete(measurement.id)}>
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default MeasurementList;
