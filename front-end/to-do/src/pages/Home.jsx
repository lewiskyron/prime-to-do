import React, { useContext, useEffect, useState } from 'react';
import Lists from '../components/list.jsx';
import { AuthContext } from '../contexts/Auth';
import { useApi } from '../contexts/ApiProvider.jsx';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { username, isLoggedIn, logout } = useContext(AuthContext);
  const [userID, setUserID] = useState(null);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (!isLoggedIn) {
      // If not logged in, redirect them to the login page
      navigate('/login');
    } else {
      // If logged in, fetch the UserID for the logged-in user
      fetchUserID();
    }
  }, [isLoggedIn, navigate]);

  const fetchUserID = async () => {
    try {
      const response = await api.get(`/users?username=${username}`);
      if (response.ok) {
        setUserID(response.body.id);
        console.log("got userID", response.body.id);
      }
    } catch (error) {
      console.error(`Network error: ${error.message}`);
    }
  };

  return (
    <>
      <Lists userID={userID}  />
    </>
  );
}
