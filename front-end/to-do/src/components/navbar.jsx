
import React from 'react'
import { useState } from 'react'
import ListDialog from './ListDialog';
import { useApi } from '../contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/Auth.jsx";


export default function Navbar() {

    const navigate = useNavigate();
    const {username, isLoggedIn, logout} = React.useContext(AuthContext);
    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    return (
        <>
            <nav>
                <div className="nav-left">
                    <span>Welcome</span>
                </div>

                <div className="nav-right">
                    <span className="user-profile">User Profile</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    );
};
    
    
    