import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvier.jsx";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox component
import IconButton from '@mui/material/IconButton'; // Import IconButton component
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon component
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon component
import { styled } from '@mui/material/styles';
import { MainContainer } from "./comp-styles.jsx";
import TextField from '@mui/material/TextField'; // Import TextField component
import Button from '@mui/material/Button'; // Import Button component
import Box from '@mui/material/Box'; // Import Box component

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    width: '80%',
    margin: `${theme.spacing(4)}px auto`,
    padding: theme.spacing(2),
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      borderRadius: '16px',
    },
  }));


  export default function Accordion(){
    const handleTaskNameChange = (e) => {
        setNewTaskName(e.target.value);

    };

    const handleCheckboxChange = (taskId,e) => {
        e.stopPropagation(); // Prevent event propagation
    };


    const handleEditClick = (taskId,e) => {
        e.stopPropagation();
        console.log(`Edit task with ID ${taskId}`);
    };

    const handleDeleteClick = (taskId,e) => {
        e.stopPropagation();
        console.log(`Delete task with ID ${taskId}`);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        PostTasks(newTaskName, listID);

    };

    return(
        <>
         <MainContainer  paddingTop={0}>
            
            <h1>Tasks Page</h1>
            <Box 
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="87%"
            >
                <form onSubmit={handleAddTask}
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
            {tasks.tasks && tasks.tasks.map((task) => (
                <StyledAccordion key={task.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${task.id}-content`}
                        id={`panel${task.id}-header`}
                    >
                        <Checkbox
                            checked={task.completed}
                            onClick={(e) => handleCheckboxChange(task.id,e)}
                        />
                        <Typography
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                                flex: 1, // Expand to fill available space
                                marginLeft: "10px", // Add some space between checkbox and text
                            }}
                        >
                            {task.name}
                        </Typography>
                        <IconButton
                            onClick={(e) => handleEditClick(task.id,e)}
                            color="primary"
                            aria-label="Edit Task"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={(e) => handleDeleteClick(task.id,e)}
                            color="secondary"
                            aria-label="Delete Task"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </AccordionSummary>
                    <AccordionDetails>
                        {task.subtasks && task.subtasks.length > 0 && renderChildren(task.subtasks)}
                    </AccordionDetails>
                </StyledAccordion>
            ))}
        </MainContainer> 
        </>
    )

  }


