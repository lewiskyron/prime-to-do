// EditDialog.jsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { 
    StyledDialog, 
    StyledDialogContent, 
    StyledTextField 
} from '../components/comp-styles.jsx'; 
import { useApi } from "../contexts/ApiProvier.jsx";


export default function EditDialog({ open, handleClose, listId, fetchData }) {
    const [text, setText] = useState("");

    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const api = useApi();

    async function handleSave(){
        // Do something with the text value
        const updatedListData = {
            name: text
        };
        try {
            console.log("currentList: ", )
            const response = await api.put(`/EditList/${listId}`, updatedListData);
        
            if (response.ok) {
              console.log("List updated successfully!", response.body);
              fetchData();  // Refresh the lists after updating
              handleClose();
            } else {
              console.error("Error updating list:", response.body.message);
            }
          } catch (error) {
            console.error("Failed to update list:", error);
          }
        handleClose();
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


