import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { username, isLoggedIn, logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const welcomeMessage = isLoggedIn ? `Welcome ${username}!` : 'Welcome to PrimeTodo';

  return (
    <>
      <nav>
        <div className="nav-left">
          <span>{welcomeMessage}</span>
        </div>

        <div className="nav-right">
          <span className="user-profile"></span>
          {isLoggedIn && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>
    </>
  );
}
