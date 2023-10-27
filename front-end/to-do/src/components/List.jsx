import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { MainContainer, Item } from "./comp-styles";
import EditDialog from "./EditDialog";
import ListDialog from './ListDialog';
import { useApi } from "../contexts/ApiProvier.jsx";

export default function Lists() {
  // State
  const [toDoLists, setToDoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, CreateDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentList, setCurrentList] = useState(toDoLists);
  const [currentListId, setCurrentListId] = useState(null);

  const api = useApi();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get("/GetLists");
      
      if (response.ok) {
        setToDoLists(response.body);
      } else {
        throw new Error(response.body.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, listId) => {
    e.stopPropagation(); // Prevent triggering any parent onClick handlers
  
    try {
      const response = await api.delete(`/DeleteList/${listId}`);
  
      if (response.ok) {
        console.log("List deleted successfully!", response.body);
        fetchData();  // Call fetchData after successfully deleting the list
        onClose();
      } else {
        console.error("Error deleting list:", response.body.message);
      }
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };
  
  // Effects
  useEffect(() => {
    fetchData();
  }, []);
  // Handlers
  const handleAddList = () => CreateDialogOpen(true);
  const handleCloseDialog = () => CreateDialogOpen(false);
  const navigateToTask = (id) => navigate(`/tasks/${id}`);
  const handleEdit = (e, listId, listName) => {
    e.stopPropagation();
    setCurrentListId(listId); // Store the listId
    setCurrentList(listName); // Store the listName
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <MainContainer>
          <Stack spacing={2}>
            {toDoLists.lists && toDoLists.lists.map((list) => (
              <Item key={list.id} onClick={() => navigateToTask(list.id)}>
                {list.name}
                <IconButton onClick={(e) => handleEdit(e, list.id, list.name)} size="small" style={{ position: "absolute", right: "50px", top: "50%", transform: "translateY(-50%)" }}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton onClick={(e) => handleDelete(e, list.id)} size="small" style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)" }}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Item>
            ))}
          </Stack>
          <div className="nav-center">
            <button onClick={handleAddList}>Add List</button>
          </div>
        </MainContainer>
      )}
      {currentList && <EditDialog open={dialogOpen} handleClose={closeDialog} fetchData={fetchData} listId={currentListId} />}
      {isDialogOpen && <ListDialog open={isDialogOpen} onClose={handleCloseDialog} fetchData={fetchData} />}
      {}
    </>
  );
}
