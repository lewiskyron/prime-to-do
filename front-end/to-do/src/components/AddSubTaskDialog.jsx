import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import React, { useState, useEffect } from 'react';
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


const AddSubTaskDialog = ({ open, onClose, onAdd }) => {
  const [subtaskName, setSubtaskName] = useState("");

  const handleAdd = () => {
    onAdd(subtaskName);
    setSubtaskName("");
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Subtask</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Subtask Name"
          type="text"
          fullWidth
          value={subtaskName}
          onChange={(e) => setSubtaskName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddSubTaskDialog;
