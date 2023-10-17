import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f7fa"
    >      
      <Box
        flex={1}
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
        <Typography variant="h5" gutterBottom>
          Login {/* Change the heading to "Login" */}
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: 16 }}
        >
          Login {/* Change the button text to "Login" */}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage; // Export as LoginPage
