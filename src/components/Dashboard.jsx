import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography, Grid, CircularProgress } from "@mui/material";
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

const BASE_URL = "http://localhost:5063/api";

const Dashboard = () => {
  const [userId, setUserId] = useState(1); // Hardcoded for now, replace with actual user ID
  const [measurementData, setMeasurementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`${BASE_URL}/BodyMeasurement`, {
        //   params: { userId },
        // });
        const response = await axios.get(`${BASE_URL}/BodyMeasurement`);
        const sortedMeasurements = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setMeasurementData(sortedMeasurements);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch measurements");
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error" variant="body1">
        {error}
      </Typography>
    );
  }

  if (measurementData.length === 0) {
    return <Typography>No data available for the dashboard.</Typography>;
  }

  // Calculate averages
  const averageWeight = (
    measurementData.reduce(
      (acc, curr) => acc + parseFloat(curr.bodyWeight),
      0
    ) / measurementData.length
  ).toFixed(2);

  // Prepare data for the weight trend line chart
  const dates = measurementData.map((entry) =>
    new Date(entry.date).toLocaleDateString()
  );
  const weights = measurementData.map((entry) => entry.bodyWeight);

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
