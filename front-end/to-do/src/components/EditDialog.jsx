import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  StyledDialog,
  StyledDialogContent,
  StyledTextField,
} from "../components/comp-styles.jsx";
import { useApi } from "../contexts/ApiProvider.jsx";

export default function EditDialog({ open, handleClose, listId, fetchData }) {
  const [text, setText] = useState("");
  const api = useApi();

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = async () => {
    const updatedListData = {
      name: text,
    };

    try {
      const response = await api.put(`/EditList/${listId}`, updatedListData);

      if (response.ok) {
        console.log("List updated successfully!", response.body);
        fetchData();
        handleClose();
      } else {
        console.error("Error updating list:", response.body.message);
      }
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle>Edit List</DialogTitle>
      <StyledDialogContent>
        <StyledTextField
          label="Text"
          variant="outlined"
          value={text}
          onChange={handleTextChange}
        />
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
