import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvider.jsx";
import Tasks from "../components/Tasks.jsx";
import { useParams } from "react-router-dom";

export default function TasksPage() {
  const { id } = useParams();

  return (
    <>
      <Tasks listID={id} />
    </>
  );
}
