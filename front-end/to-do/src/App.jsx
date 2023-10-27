import { useState } from "react";
import TasksPage from "./pages/TasksPage.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/Signup.jsx";
import LoginPage from "./pages/Login.jsx";
import ApiProvider from "./contexts/ApiProvier.jsx";
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'

export default function App() {
  return (
    <>
      <ApiProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/:id" element={<TasksPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ApiProvider>
      <Footer />
    </>
  );
}
