import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import formattedDate from "./CommonFunctions";

const MeasurementList = ({ measurementData, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });
  const [showAllColumns, setShowAllColumns] = useState(false); // Checkbox state

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

  const sortedData = React.useMemo(() => {
    const sortedArray = [...measurementData];
    sortedArray.sort((a, b) => {
      if (sortConfig.key === "date") {
        return (
          (new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])) *
          (sortConfig.direction === "asc" ? 1 : -1)
        );
      } else {
        return (
          (a[sortConfig.key] < b[sortConfig.key] ? -1 : 1) *
          (sortConfig.direction === "asc" ? 1 : -1)
        );
      }
    });
    return sortedArray;
  }, [measurementData, sortConfig]);

  const handleSortRequest = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleToggleColumns = () => {
    setShowAllColumns((prev) => !prev);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={showAllColumns}
            onChange={handleToggleColumns}
            color="primary"
          />
        }
        label="Display all measurements"
      />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {/* Adjust visible columns based on checkbox */}
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "date"}
                  direction={
                    sortConfig.key === "date" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSortRequest("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "weight"}
                  direction={
                    sortConfig.key === "weight" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSortRequest("weight")}
                >
                  Weight (kg)
                </TableSortLabel>
              </TableCell>
              {showAllColumns &&
                !isMobile && ( // Show additional columns based on checkbox
                  <>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "waist"}
                        direction={
                          sortConfig.key === "waist"
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSortRequest("waist")}
                      >
                        Waist (cm)
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "bodyFat"}
                        direction={
                          sortConfig.key === "bodyFat"
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSortRequest("bodyFat")}
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
                  </>
                )}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((measurement, index) => (
              <TableRow key={index}>
                <TableCell>{formattedDate(measurement.date)}</TableCell>
                <TableCell>{measurement.weight}</TableCell>
                {showAllColumns &&
                  !isMobile && ( // Render additional columns based on checkbox
                    <>
                      <TableCell>{measurement.waist}</TableCell>
                      <TableCell>{measurement.bodyFat}</TableCell>
                      <TableCell>{measurement.neck}</TableCell>
                      <TableCell>{measurement.shoulder}</TableCell>
                      <TableCell>{measurement.chest}</TableCell>
                      <TableCell>{measurement.biceps}</TableCell>
                      <TableCell>{measurement.forearm}</TableCell>
                      <TableCell>{measurement.abdomen}</TableCell>
                      <TableCell>{measurement.hips}</TableCell>
                      <TableCell>{measurement.thighs}</TableCell>
                      <TableCell>{measurement.calf}</TableCell>
                      <TableCell>
                        {measurement.progressPicture && (
                          <img
                            src={measurement.progressPicture}
                            alt="Progress"
                            width="50"
                            height="50"
                            style={{ borderRadius: "50%" }}
                          />
                        )}
                      </TableCell>
                    </>
                  )}
                <TableCell>
                  <IconButton onClick={() => onEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MeasurementList;
