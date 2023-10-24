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

export default function Tasks() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Description for Task 1", completed: false },
        { id: 2, title: "Task 2", description: "Description for Task 2", completed: false },
        { id: 3, title: "Task 3", description: "Description for Task 3", completed: false },
    ]);

    const handleCheckboxChange = (taskId,e) => {
        // Toggle the completed status of the task with the given taskId
        e.stopPropagation(); // Prevent event propagation
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleEditClick = (taskId,e) => {
        // Implement your edit functionality here
        e.stopPropagation();
        console.log(`Edit task with ID ${taskId}`);
    };

    const handleDeleteClick = (taskId,e) => {
        // Implement your delete functionality here
        e.stopPropagation();
        console.log(`Delete task with ID ${taskId}`);
    };

    return (
        <MainContainer>
            <h1>Tasks Page</h1>
            {tasks.map((task) => (
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
                            {task.title}
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
                        <Typography>{task.description}</Typography>
                    </AccordionDetails>
                </StyledAccordion>
            ))}
        </MainContainer>
    );
}
