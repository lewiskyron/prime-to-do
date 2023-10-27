import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useApi } from "../contexts/ApiProvier.jsx";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '80%', // Adjust width as per requirement
    maxWidth: '500px', // Set maximum width
    borderRadius: theme.spacing(2),
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
  },
  // Additional styles can be added here
}));

const StyledButton = styled(Button)(({ theme }) => ({
}));

const EditTaskDialog = ({ open, handleClose, fetchData, task }) => {
  const [taskName, setTaskName] = useState("");
  const api = useApi();

  useEffect(() => {
    if (task) {
      setTaskName(task.name || "");
    } else {
      setTaskName("");
    }
  }, [task]);




  

  const handleSave = async () => {
    try {
      // Assuming the API endpoint to update the task
      const response = await api.put(`/EditTask/${task.id}`, { name: taskName });
      if (response.ok) {
        fetchData(); // Refresh tasks
        handleClose(); // Close dialog

      } else {
        // Handle API response error
        console.error('Failed to update task', response.body.message);
      }
    } catch (error) {
      // Handle errors in communication
      console.error('Error updating task', error);
    }
  };

    const handleTextChange = (e) => {
        setTaskName(e.target.value);

    }

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task Name"
          type="text"
          fullWidth
          variant="outlined"
          value={taskName}
          onChange={handleTextChange}
        />
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleClose}>Cancel</StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleSave}>Save</StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default EditTaskDialog;
