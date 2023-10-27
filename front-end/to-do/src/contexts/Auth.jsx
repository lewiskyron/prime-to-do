import React, { createContext, useState, useEffect } from "react";
import { useApi } from "./ApiProvider.jsx"
import { useNavigate } from "react-router-dom";

// Create a Context for authentication data
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State management for user authentication
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Custom hooks for API calls and navigation
  const api = useApi();
  const navigate = useNavigate();

  // Effect for checking local storage for authentication state
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (savedUser) {
      setUsername(savedUser);
      setIsLoggedIn(savedIsLoggedIn);
    }
  }, []);

  // Handler for logging in
  const login = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", "true");
  };

  // Handler for logging out
  const logout = async () => {
    try {
      const response = await api.post("/logout");
      if (response.ok) {
        console.log("Logged out successfully.");
      }
    } catch (error) {
      console.error(`Network error: ${error.message}`);
    }
    // Clear user state and redirect to login
    setUsername(null);
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Prepare the context value
  const contextValue = {
    username,
    isLoggedIn,
    login,
    logout,
  };

  // Provide the context to children
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
