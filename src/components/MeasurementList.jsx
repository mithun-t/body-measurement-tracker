import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const MeasurementList = ({ measurementData, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Height (cm)</TableCell>
            <TableCell>Weight (kg)</TableCell>
            <TableCell>Waist (cm)</TableCell>
            <TableCell>Body Fat (%)</TableCell>
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
            <TableCell>Actions</TableCell> {/* New Actions Column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {measurementData.map((measurement, index) => (
            <TableRow key={index}>
              <TableCell>{measurement.date}</TableCell>
              <TableCell>{measurement.height}</TableCell>
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
                  />
                )}
              </TableCell>
              <TableCell>
                {/* Edit Button */}
                <IconButton onClick={() => onEdit(index)}>
                  <Edit />
                </IconButton>
                {/* Delete Button */}
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
