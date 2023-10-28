import React, { useContext, useEffect, useState } from 'react';
import Lists from '../components/list.jsx';
import { AuthContext } from '../contexts/Auth';
import { useApi } from '../contexts/ApiProvider.jsx';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { username, isLoggedIn, logout } = useContext(AuthContext);
  const [hasMounted, setHasMounted] = useState(false);
  const [userID, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in only after the component has mounted
    if (hasMounted) {
      if (!isLoggedIn) {
        // If not logged in, redirect them to the login page
        navigate('/login');
      } else {
        // If logged in, fetch the UserID for the logged-in user
        fetchUserID();
      }
    } else {
      // Component is still mounting, set hasMounted to true
      setHasMounted(true);
    }
  }, [isLoggedIn, navigate, hasMounted]);

  const fetchUserID = async () => {
    try {
      const response = await api.get(`/users?username=${username}`);
      if (response.ok) {
        setUserID(response.body.id);
        console.log("got userID", response.body.id);
        setIsLoading(false); // Set loading to false when data is fetched
      }
    } catch (error) {
      console.error(`Network error: ${error.message}`);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <>
    {isLoading ? (
      <div className="loader"></div> 
    ) : (
      <Lists userID={userID} />
    )}
  </>
);
}
