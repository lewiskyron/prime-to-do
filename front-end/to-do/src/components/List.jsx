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
// Ensure the path to ListStyles.js is correct

export default function Lists() {

  
  // Sample data
  const toDoLists = [
    {
      id: 1,
      title: "Morning Tasks",
    },
    {
      id: 2,
      title: "Work Tasks",
    },
    {
      id: 3,
      title: "Afternoon Chores",
    },
    {
      id: 4,
      title: "Evening Activities",
    },
    {
      id: 5,
      title: "Workout Schedule",
    },
    {
      id: 6,
      title: "Study Time",
    },
    {
      id: 7,
      title: "Meal Prepping",
    },
    {
      id: 8,
      title: "Family Time",
    },
  ];

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
  }

  return (
    <>
      <MainContainer>
        <Stack spacing={2}>
          {toDoLists.map((list) => (
            <Item key={list.id} onClick={navigateToTask}>
              {list.title}
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
