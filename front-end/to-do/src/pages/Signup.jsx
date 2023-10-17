import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

const SignUpPage = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      style={{ 
        background: '#f5f7fa', 
        boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        fontFamily: "'Didact Gothic', sans-serif" 
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
        <TextField label="Full Name" variant="outlined" margin="normal" fullWidth />
        <TextField label="Email Address" variant="outlined" margin="normal" fullWidth />
        <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />
        <Button variant="contained" color="primary" size="large" style={{ marginTop: 16 }}>
          Create Account
        </Button>
      </Box>
    </Box>
  );
}

export default SignUpPage;
