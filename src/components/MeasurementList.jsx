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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import formattedDate from "./CommonFunctions";

const MeasurementList = ({ measurementData, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

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

  return (
    <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {[
              { label: "Date", key: "date" },
              { label: "Weight (kg)", key: "weight" },
              { label: "Waist (cm)", key: "waist" },
              { label: "Body Fat (%)", key: "bodyFat" },
              { label: "Neck (cm)", key: "neck" },
              { label: "Shoulder (cm)", key: "shoulder" },
              { label: "Chest (cm)", key: "chest" },
              { label: "Biceps (cm)", key: "biceps" },
              { label: "Forearm (cm)", key: "forearm" },
              { label: "Abdomen (cm)", key: "abdomen" },
              { label: "Hips (cm)", key: "hips" },
              { label: "Thighs (cm)", key: "thighs" },
              { label: "Calf (cm)", key: "calf" },
              { label: "Progress Picture", key: "progressPicture" },
            ].map((column) => (
              <TableCell key={column.key}>
                <TableSortLabel
                  active={sortConfig.key === column.key}
                  direction={
                    sortConfig.key === column.key ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSortRequest(column.key)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>{" "}
            {/* Actions column without sorting */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((measurement, index) => (
            <TableRow key={index}>
              <TableCell>{formattedDate(measurement.date)}</TableCell>
              <TableCell>{measurement.weight}</TableCell>
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
  );
};

export default MeasurementList;
