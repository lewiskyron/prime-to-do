import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { MainContainer, Item } from "./comp-styles";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "../pages/Tasks.jsx";
import { Link } from "react-router-dom";
import EditDialog from "./EditDialog";
import { useEffect } from "react";
import { useApi } from "../contexts/ApiProvier.jsx";
// Ensure the path to ListStyles.js is correct

export default function Lists() {
  const [toDoLists, setToDoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = useApi();

  useEffect(() => {
    api
      .get("/GetLists")
      .then((response) => {
        if (response.ok) {
          setToDoLists(response.body);
        } else {
          throw new Error(response.body.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentList, setCurrentList] = useState(toDoLists);

  const navigate = useNavigate();

  const navigateToTask = () => {
    navigate("/tasks");
  };

  const handleEdit = (e) => {
    e.stopPropagation();

    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <MainContainer>
          <Stack spacing={2}>
              {toDoLists.lists && toDoLists.lists.map((list) => (
              <Item key={list.id} onClick={navigateToTask}>
                {list.name}
                <IconButton
                  onClick={handleEdit}
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
                  onClick={handleDelete}
                  size="small"
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
        </MainContainer>
      )}
      {currentList && (
        <EditDialog
          open={dialogOpen}
          handleClose={closeDialog}
          title={currentList.title}
        />
      )}
    </>
  );
}   