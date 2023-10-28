import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function MoveTaskDialog({ open, onClose, task, listID, api, AfterMove }) {
    const [lists, setLists] = useState([]);

    const fetchLists = async () => {
        try {
            // Fetch User ID based on listID (Adjust endpoint as necessary)
            let response = await api.get(`/getUserIdByListId/${listID}`);
            if (response.ok) {
                const userId = response.body.userId;
    
                response = await api.get(`/GetLists?userID=${userId}`);
                if (response.ok) {
                    setLists(response.body.lists);
                } else {
                    throw new Error("Failed to fetch lists");
                }
            } else {
                throw new Error("Failed to fetch user ID");
            }
        } catch (error) {
            console.error("Error fetching lists: ", error);
        }
    };

    const handleMoveTask = async (targetListId) => {
        console.log(`Moving task ${task.id} to list ${targetListId}`);
        const response = await api.put(`/moveTask/${task.id}`, {
            new_list_id: targetListId,
        });

        if (response.ok) {
            console.log("Task moved successfully!");
        }
        AfterMove();
        onClose();
    }

    useEffect(() => {
        if (open) {
            fetchLists();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>Move Task to</DialogTitle>
            <DialogContent>
                <List>
                    {lists.map((list) => (
                        <ListItem
                            button
                            key={list.id}
                            onClick={() => handleMoveTask(list.id)}
                        >
                            <ListItemText primary={list.name} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MoveTaskDialog;
