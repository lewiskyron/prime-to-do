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


export default function EditDialog({ open, handleClose, title }) {
    const [text, setText] = useState("");

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        // Do something with the text value
        console.log(text);
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


