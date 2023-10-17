import { useState } from 'react'
import Tasks from './pages/Tasks.jsx'
import Home from './pages/Home.jsx'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export default function App() {
  return (
   <>
   <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
   </Routes>
   </>
  )
}

