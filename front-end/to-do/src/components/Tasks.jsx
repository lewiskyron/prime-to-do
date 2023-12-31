import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvider.jsx";
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
import AddSubTaskDialog from "./AddSubTaskDialog.jsx"; // Import AddSubTaskDialog component
import MoveTaskDialog from "./MoveTaskDialog.jsx"; // Import MoveTaskDialog component

export default function Tasks({ listID }) {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [isAddSubtaskDialogOpen, setIsAddSubtaskDialogOpen] = useState(false);
  const [parentTaskId, setParentTaskId] = useState(null);
  const [isMoveTaskDialogOpen, setIsMoveTaskDialogOpen] = useState(false);

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

  const handleCheckboxChange = async (taskId, e) => {
    e.stopPropagation();

    const updateTasksRecursively = async (tasksToUpdate, parentId = null) => {
      let allSubtasksCompleted = true;

      const updatedTasks = await Promise.all(
        tasksToUpdate.map(async (task) => {
          let updatedTask = { ...task };

          // Check if the current task or subtask is the one being interacted with
          if (task.id === taskId) {
            updatedTask.completed = !task.completed;
            await api.put(`/TaskCompleted/${taskId}`, {
              completed: updatedTask.completed,
            });
          }

          // Recursively update subtasks
          if (task.subtasks && task.subtasks.length > 0) {
            updatedTask.subtasks = await updateTasksRecursively(
              task.subtasks,
              task.id
            );
            allSubtasksCompleted = updatedTask.subtasks.every(
              (sub) => sub.completed
            );
          }

          return updatedTask;
        })
      );

      // Automatically mark the parent as completed if all subtasks are completed
      if (parentId !== null && allSubtasksCompleted) {
        const parentIndex = updatedTasks.findIndex(
          (task) => task.id === parentId
        );
        if (parentIndex !== -1) {
          updatedTasks[parentIndex].completed = true;
          // Update the parent task completion status in the backend
          await api.put(`/TaskCompleted/${parentId}`, { completed: true });
        }
      }

      return updatedTasks;
    };

    const updatedTasks = await updateTasksRecursively([...tasks.tasks]);
    setTasks({ tasks: updatedTasks });
  };

  const handleEditClick = async (task, e) => {
    e.stopPropagation();
    setCurrentTask(task);
    setIsEditTaskDialogOpen(true);
  };

  const handleMoveTaskClick = (task) => {
    setCurrentTask(task);
    setIsMoveTaskDialogOpen(true);
  };


  const AfterMove = () => {
    fetchTasks();
  };
  

  const handleDeleteClick = (task, e) => {
    e.stopPropagation();
    setCurrentTask(task);
    setIsDeleteTaskDialogOpen(true);
  };

  const handleConfirmDelete = async (taskId) => {
    try {
      console.log(`Deleting task with ID ${taskId}`);
      const response = await api.delete(`/DeleteTask/${taskId}`);
      if (response.ok) {
        fetchTasks(); // Re-fetch tasks to update the list after deletion
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

  const handleAddSubtaskClick = (task) => {
    console.log("Add subtask clicked for task:", task.id);
    setParentTaskId(task.id);
    setIsAddSubtaskDialogOpen(true);
  };

  const handleAddSubtask = async (subtaskName) => {
    try {
      if (!subtaskName.trim()) {
        alert("Please enter a valid subtask name!");
        return;
      }

      const response = await api.post("/AddSubtasks", {
        name: subtaskName,
        parent_id: parentTaskId,
        list_id: listID, // Assuming listID is available in your component's scope
      });

      if (response.ok) {
        fetchTasks(); // Assuming you have a function to refresh the list of tasks
        console.log("Subtask added successfully!");
      } else {
        // Handle the error according to your API response structure
        throw new Error(response.body.message || "Error adding subtask");
      }
    } catch (error) {
      console.error("Failed to add subtask:", error);
      alert("Failed to add subtask: " + error.message);
    } finally {
      setIsAddSubtaskDialogOpen(false); // Close the dialog in any case
    }
  };

  return (
    <MainContainer paddingTop={0}>
      <h1 style={{ marginBottom: "4%", marginTop: "4%" }}>Tasks Page</h1>
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
            className="btn-grad"
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
              onAdd={handleAddSubtaskClick}
              onMove={handleMoveTaskClick}
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
          <MoveTaskDialog
            open={isMoveTaskDialogOpen}
            onClose={() => setIsMoveTaskDialogOpen(false)}
            task={currentTask}
            listID={listID}
            api={api}
            AfterMove={AfterMove}
          />
        </>
      )}
      <AddSubTaskDialog
        open={isAddSubtaskDialogOpen}
        onClose={() => setIsAddSubtaskDialogOpen(false)}
        onAdd={handleAddSubtask}
      />
    </MainContainer>
  );
}
