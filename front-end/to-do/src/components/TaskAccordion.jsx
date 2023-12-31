import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  width: "80%",
  margin: `${theme.spacing(4)}px auto`,
  marginLeft:"1%",
  padding: theme.spacing(2),
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    borderRadius: "16px",
  },
}));

const TaskAccordion = ({ task, onEdit, onDelete, onCheckboxChange, onAdd, onMove}) => {
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${task.id}-content`}
        id={`panel${task.id}-header`}
      >
        <Checkbox
          checked={task.completed}
          onClick={(e) => onCheckboxChange(task.id, e)}
        />
        <Typography
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            flex: 1,
            marginLeft: "0.5%",
            alignSelf: "center",
            fontSize: "1.1rem",
            fontWeight: "400",
          }}
        >
          {task.name}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onAdd(task);
          }}
          color="primary"
          aria-label="Add Subtask"
        >
          <AddIcon />
        </IconButton>
        <IconButton
          onClick={(e) => onEdit(task, e)}
          color="primary"
          aria-label="Edit Task"
        >
          <EditIcon />
        </IconButton>

        {!task.parent_id && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onMove(task);
            }}
            color="primary"
            aria-label="Move Task"
          >
            <ArrowForwardIcon />
          </IconButton>
        )}

        <IconButton
          onClick={(e) => onDelete(task, e)}
          color="secondary"
          aria-label="Delete Task"
        >
          <DeleteIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        {task.subtasks &&
          task.subtasks.map((subtask) => (
            <TaskAccordion
              key={subtask.id}
              task={subtask}
              onEdit={onEdit}
              onDelete={onDelete}
              onCheckboxChange={onCheckboxChange}
              onAdd={onAdd}
            />
          ))}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default TaskAccordion;
