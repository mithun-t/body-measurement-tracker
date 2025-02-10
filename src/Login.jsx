import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { UserContext } from "./context/userContext";
import { MeasurementContext } from "./context/measurementContext";
import { BASE_URL, fetchData } from "./services/measurementServices.js";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { setUserId } = useContext(UserContext);

  const { setMeasurements } = useContext(MeasurementContext);
  const handleChange = (e) => {
    const { value, id } = e.target;
    if (id === "userName") {
      setUserName(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (!userName || !password) {
        setIsLoading(false);
        return;
      }
      const response = await axios.post(`${BASE_URL}/User/login`, { username: userName, password: password });
      console.log(response);
      if (response.status === 200) {
        setUserId(response.data.userId);
        console.log(response.data.userId);
        const fetchedMeasurement = await fetchData(response.data.userId);
        setMeasurements(fetchedMeasurement);
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/body-measurement-tracker/home");
          }
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert(error.response.data.message);
      }
    }
    setIsLoading(false);
  };
  const handleRegisterOrLogin = () => {
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setIsRegister(!isRegister);
  };
  const handleRegister = async () => {
    setIsLoading(true);
    if (!userName || !password || !confirmPassword) {
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Failed!",
        text: "Password not matched",
        icon: "error",
        confirmButtonText: "OK",
      });
      setIsLoading(false);
      return;
    }
    const registerData = { username: userName, password: password };
    try {
      const response = await axios.post(`${BASE_URL}/User/register`, registerData);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "User registered",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleRegisterOrLogin();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to register user",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <TextField id="userName" label="Username" variant="outlined" fullWidth value={userName} onChange={handleChange} />
        <TextField id="password" label="Password" variant="outlined" type="password" fullWidth value={password} onChange={handleChange} />
        {isRegister && <TextField id="confirmPassword" label="Confirm password" variant="outlined" type="password" fullWidth value={confirmPassword} onChange={handleChange} />}

        {isRegister ? (
          <Button variant="contained" color="primary" onClick={handleRegister} fullWidth disabled={isLoading}>
            Register
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth disabled={isLoading}>
            Login
          </Button>
        )}
        <Button variant="text" color="primary" onClick={handleRegisterOrLogin}>
          {!isRegister ? "Register" : "Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
