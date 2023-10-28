import React, { useContext, useEffect, useState } from 'react';
import Lists from '../components/list.jsx';
import { AuthContext } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Set the mounted state to true once the component is mounted

    if (hasMounted) {
      // Only check login status after the component has mounted
      if (!isLoggedIn) {
        navigate('/login');
      }
    }
  }, [isLoggedIn, navigate, hasMounted]);

  // Show loader while the component is mounting or authentication is being checked
  if (!hasMounted || !isLoggedIn) {
    return <div className="loader"></div>;
  }

  // If logged in and mounted, render the Lists component
  return <Lists />;
}

