import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvier.jsx";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MainContainer } from "./comp-styles.jsx";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    width: '80%',  // Set the width to 80% of its parent
    margin: `${theme.spacing(4)}px auto`,  // Center the accordion horizontally and add vertical spacing
    padding: theme.spacing(2),  // Add padding inside the accordion
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      borderRadius: '16px',
    },
  }));

export default function Tasks() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Description for Task 1" },
        { id: 2, title: "Task 2", description: "Description for Task 2" },
        { id: 3, title: "Task 3", description: "Description for Task 3" },
    ]);

    return (
        <MainContainer>
            <h1>Tasks Page</h1>
            {tasks.map(task => (
                <StyledAccordion key={task.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${task.id}-content`}
                        id={`panel${task.id}-header`}
                    >
                        <Typography>{task.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {task.description}
                        </Typography>
                    </AccordionDetails>
                </StyledAccordion>
            ))}
        </MainContainer>
    );
}
