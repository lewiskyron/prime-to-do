import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.jsx";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useApi } from "../contexts/ApiProvider.jsx";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login , isLoggedIn} = useContext(AuthContext);
  const api = useApi();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", loginData);

      if (response.ok) {
        login(response.body.username);
      } else {
        setError(response.message || "Login failed Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // <-- Redirect to home page if user is logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f7fa"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={4}
        bgcolor="white"
        borderRadius="16px"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
        mx="270px"
      >
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            variant="outlined"
            margin="normal"
            fullWidth
            name="login"
            value={loginData.login}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: 16 }}
            >
              Login
            </Button>
          </div>
         
        </form>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: 16 }}
        >
          New user?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#1976D2" }}>
            Click here
          </Link>{" "}
          to sign up.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
