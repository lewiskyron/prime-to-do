import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvier.jsx";
import Tasks  from "../components/Tasks.jsx";

export default function TasksPage () {
  
    return (
      <>
        <Tasks />
      </>
    )
  }