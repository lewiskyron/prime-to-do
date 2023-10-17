import { useState } from "react";
import Tasks from "./pages/Tasks.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/Signup.jsx";
import LoginPage from "./pages/Login.jsx";
import ApiProvider from "./contexts/ApiProvier.jsx";

export default function App() {
  return (
    <>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ApiProvider>
    </>
  );
}
