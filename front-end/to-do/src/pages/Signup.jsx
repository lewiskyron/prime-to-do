import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useApi } from "../contexts/ApiProvider.jsx";

const SignUpPage = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const api = useApi();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the `api` object from useApi
      const response = await api.post("/signup", {
        username: userDetails.fullName, // Assuming fullName as username
        email: userDetails.email,
        password: userDetails.password,
      });

      if (response.ok) {
        console.log("Success:", response);
        navigate("/login");

        // Handle success (e.g., show message, redirect)
      } else {
        console.error("Error:", errorData.message);
        // Handle errors (e.g., show error message)
      }
    } catch (error) {
      console.error('Request failed', error);
      // Handle network errors
    }
  };


  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      style={{
        background: "#f5f7fa",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
        fontFamily: "'Didact Gothic', sans-serif",
      }}
      paddingRight={10}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={4}
      >
        <Typography variant="h4" gutterBottom>
          Prime To-Do
        </Typography>
        <Typography variant="body1">
          Your ultimate to-do list manager.
        </Typography>
      </Box>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={4}
        bgcolor="white"
        borderRadius="16px" // Rounded border
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" // Box shadow
        width="80%" // You can adjust this width to make the box narrower or wider
        mx="auto" // Center the box if it's narrower than its container
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            margin="normal"
            fullWidth
            name="fullName"
            value={userDetails.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            value={userDetails.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: 16 }}
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpPage;
