import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [measurementData, setMeasurementData] = useState([]);
  useEffect(() => {
    let savedMeasurements =
      JSON.parse(localStorage.getItem("measurements")) || [];
    savedMeasurements = savedMeasurements.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setMeasurementData(savedMeasurements);
  }, []);

  if (measurementData.length === 0) {
    return <Typography>No data available for the dashboard.</Typography>;
  }

  // Calculate averages
  const averageWeight = (
    measurementData.reduce((acc, curr) => acc + parseFloat(curr.weight), 0) /
    measurementData.length
  ).toFixed(2);
  const averageBodyFat = (
    measurementData.reduce((acc, curr) => acc + curr.bodyFat, 0) /
    measurementData.length
  ).toFixed(2);

  // Prepare data for the weight trend line chart
  const dates = measurementData.map((entry) => entry.date);
  const weights = measurementData.map((entry) => entry.weight);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Weight (kg)",
        data: weights,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weight Trends Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Measurement",
        },
      },
    },
  };

  return (
    <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Measurement Dashboard
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Average Weight (kg):</Typography>
          <Typography variant="h6">{averageWeight}</Typography>
        </Grid>
      </Grid>
      <Line data={data} options={options} />
    </Paper>
  );
};

export default Dashboard;
