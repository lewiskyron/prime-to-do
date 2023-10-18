import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  StyledDialog,
  StyledDialogContent,
  StyledTextField,
} from "../components/comp-styles.jsx";
import { useApi } from "../contexts/ApiProvier.jsx";

export default function ListDialog({ onClose, open , fetchData}) {
  const [text, setText] = useState("");
  

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const api = useApi();

  const listData = {
    name: text,
    user_id: 0,
  };

  async function handleSave() {
    try {
      // Assuming you have the list data in a variable called `listData`
      const response = await api.post("/Addlists", listData); // Adjust the endpoint ('/lists') if needed

      if (response.ok) {
        // Handle successful response, e.g., show a success message or update the UI
        console.log("List added successfully!", response.body);
        
        fetchData();
        // Close the dialog or perform cleanup
        onClose();
      } else {
        // Handle error response, e.g., show an error message
        console.error("Error adding list:", response.body.message);
      }
    } catch (error) {
      // Handle unexpected errors, e.g., network issues
      console.error("Failed to add list:", error);
    }
  }
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>Add New List</DialogTitle>
      <StyledDialogContent>
        <StyledTextField
          label="List name"
          variant="outlined"
          value={text}
          onChange={handleTextChange}
        />
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
