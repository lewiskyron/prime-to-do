import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { IconButton, TextField, Button, CircularProgress, Typography  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { MainContainer, Item } from "./comp-styles";
import EditDialog from "./EditDialog";
import { useApi } from "../contexts/ApiProvider.jsx";

export default function Lists() {
  // State
  const [toDoLists, setToDoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, CreateDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentList, setCurrentList] = useState(toDoLists);
  const [currentListId, setCurrentListId] = useState(null);
  const [newListName, setNewListName] = useState(""); // New list name input

  const api = useApi();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await api.get(`/GetLists`); 

      if (response.ok) {
        setToDoLists(response.body);
      } else {
        throw new Error(response.body.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Stop loading, whether successful or not
    }
  };

  const handleDelete = async (e, listId) => {
    e.stopPropagation(); // Prevent triggering any parent onClick handlers

    try {
      const response = await api.delete(`/DeleteList/${listId}`);

      if (response.ok) {
        console.log("List deleted successfully!", response.body);
        fetchData(); // Call fetchData after successfully deleting the list
        onClose();
      } else {
        console.error("Error deleting list:", response.body.message);
      }
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  const listData = {
    name: newListName,
  };

  // Handlers
  const handleAddList = async () => {
    try {
      console.log("Data being sent:", listData);
      const response = await api.post("/Addlists", listData); // Adjust the endpoint ('/lists') if needed

      if (response.ok) {
        console.log("List added successfully!", response.body);
        fetchData(); // Refresh the list of lists
        setNewListName(""); // Clear the input field
      } else {
        console.error("Error adding list:", response.body.message);
      }
    } catch (error) {
      console.error("Failed to add list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToTask = (id) => navigate(`/tasks/${id}`);
  const handleEdit = (e, listId, listName) => {
    e.stopPropagation();
    setCurrentListId(listId); // Store the listId
    setCurrentList(listName); // Store the listName
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);
  const onClose = () => CreateDialogOpen(false);

  return (
    <>
      {loading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <MainContainer>
          <Typography variant="h5" style={{ marginBottom: "30px" , marginTop:'40px'}}>
            My Lists
          </Typography>
          <div style={{ marginBottom: "20px", direction:"flex",}}>
            <Stack spacing={2} style={{marginLeft: '19%'}}>
              {toDoLists.lists &&
                toDoLists.lists.map((list) => (
                  <Item key={list.id} onClick={() => navigateToTask(list.id)}>
                    {list.name}
                    <IconButton
                      onClick={(e) => handleEdit(e, list.id, list.name)}
                      color="primary"
                      size="small"
                      style={{
                        position: "absolute",
                        right: "50px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleDelete(e, list.id)}
                      size="small"
                      color="secondary"
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Item>
                ))}
            </Stack>
          </div>
          <div
            className="nav-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "20px",
              marginRight: "10%", // Adjust the percentage as needed
            }}
          >
            <form
              onSubmit={handleAddList}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextField
                type="text"
                label="Enter a new list name"
                variant="outlined"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                style={{ marginBottom: "16px", width: "100%", marginRight: "8px" }}
              />
              <Button 
              className="btn-grad"
                variant="contained"
                color="primary"
                type="submit"
                style={{ width: "50%", marginBottom: "16px" }}
              >
                Add List
              </Button>
            </form>
          </div>
        </MainContainer>
      )}
      {currentList && (
        <EditDialog
          open={dialogOpen}
          handleClose={closeDialog}
          fetchData={fetchData}
          listId={currentListId}
        />
      )}
    </>
  );
}
