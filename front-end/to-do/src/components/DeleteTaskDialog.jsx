import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

// Styled Buttons
const ActionButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#FFFFFF',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
}));

const DeleteButton = styled(ActionButton)({
  backgroundColor: '#ff6b6b',
  '&:hover': {
    backgroundColor: '#ff4757',
  },
});

const DeleteTaskDialog = ({ open, onClose, onConfirmDelete, task }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Task"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this task? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ActionButton onClick={onClose} color="primary">
          Cancel
        </ActionButton>
        <DeleteButton onClick={() => onConfirmDelete(task.id)} color="secondary" autoFocus>
          Delete
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
