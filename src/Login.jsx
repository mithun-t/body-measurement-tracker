import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { UserContext } from "./context/userContext";
import { MeasurementContext } from "./context/measurementContext";
import { BASE_URL, fetchData } from "./services/measurementServices.js";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext(UserContext);

  const { setMeasurements } = useContext(MeasurementContext);
  const handleChange = (e) => {
    const { value, id } = e.target;
    if (id === "userName") {
      setUserName(value);
    } else {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/User/login`, { username: userName, password: password });
      console.log(response);
      if (response.status === 200) {
        alert(response.data.message);
        setUserId(response.data.userId);
        console.log(response.data.userId);
        const fetchedMeasurement = await fetchData(response.data.userId);
        setMeasurements(fetchedMeasurement);
        navigate("/body-measurement-tracker/home");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <TextField id="userName" label="Username" variant="outlined" fullWidth value={userName} onChange={handleChange} />
        <TextField id="password" label="Password" variant="outlined" type="password" fullWidth value={password} onChange={handleChange} />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
