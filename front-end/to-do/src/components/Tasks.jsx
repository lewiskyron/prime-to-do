import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvier.jsx";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { MainContainer } from "./comp-styles.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TaskAccordion from "./TaskAccordion.jsx"; // Import TaskAccordion component
import EditTaskDialog from "./EditTaskDialog.jsx"; // Import EditTaskDialog component
import DeleteTaskDialog from "./DeleteTaskDialog.jsx"; // Import DeleteTaskDialog component

export default function Tasks({ listID }) {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(tasks);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);

  const api = useApi();

  const fetchTasks = async () => {
    try {
      console.log(`Fetching tasks for list with ID ${listID}`);
      const response = await api.get(`/GetTasks/${listID}`);
      if (response.ok) {
        console.log("Tasks fetched successfully!");
        setTasks(response.body);
      } else {
        throw new Error(response.body.message);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const postTasks = async (name, listID) => {
    try {
      if (!name.trim()) {
        alert("Please enter a valid task name!");
        return;
      }
      const response = await api.post(`/AddTask/${listID}`, {
        name: name,
        list_id: listID,
      });

      if (response.ok) {
        setNewTaskName("");
        fetchTasks();
        console.log("Task Added successfully!");
      } else {
        throw new Error(response.body.message);
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);



  const handleTaskNameChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleCheckboxChange = (taskId, e) => {
    e.stopPropagation();
  };

  const handleEditClick = async (task,e) => {
    e.stopPropagation();
    setCurrentTask(task);
    setIsEditTaskDialogOpen(true);
  };

  const handleDeleteClick = (task, e) => {
    e.stopPropagation();
    setCurrentTask(task)
    setIsDeleteTaskDialogOpen(true);
  };

  const handleConfirmDelete = async (taskId) => {
    try {
      console.log(`Deleting task with ID ${taskId}`);
      const response = await api.delete(`/DeleteTask/${taskId}`);
      if (response.ok) {
        fetchTasks();  // Re-fetch tasks to update the list after deletion
        console.log("Task deleted successfully!");
      } else {
        throw new Error(response.body.message);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
    setIsDeleteTaskDialogOpen(false);
  };


  const handleAddTask = async (e) => {
    e.preventDefault();
    postTasks(newTaskName, listID);
  };

  return (
    <MainContainer paddingTop={0}>
      <h1>Tasks Page</h1>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="87%"
      >
        <form
          onSubmit={handleAddTask}
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <TextField
            type="text"
            label="Enter a new task"
            variant="outlined"
            value={newTaskName}
            onChange={handleTaskNameChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginLeft: "16px" }}
          >
            Add Task
          </Button>
        </form>
      </Box>
      {tasks.tasks &&
        tasks.tasks
          .filter((task) => task.parent_id === null)
          .map((task) => (
            <TaskAccordion
              key={task.id}
              task={task}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
      {currentTask && (
        <>
          <EditTaskDialog
            open={isEditTaskDialogOpen}
            handleClose={() => setIsEditTaskDialogOpen(false)}
            fetchData={fetchTasks}
            task={currentTask}
          />
          <DeleteTaskDialog
            open={isDeleteTaskDialogOpen}
            onClose={() => setIsDeleteTaskDialogOpen(false)}
            onConfirmDelete={handleConfirmDelete}
            task={currentTask}
          />
        </>
      )}
    </MainContainer>
  );
}
