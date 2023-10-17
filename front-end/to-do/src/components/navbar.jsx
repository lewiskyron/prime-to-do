import React from 'react'
import { useState } from 'react'


export default function Navbar () {
    const [user, setUser] = useState({ name: 'Kyron!' });
    const [tasks, setTasks] = useState([]);

    return (
        <>
        <nav>
            <div className="nav-left">
                <span>Welcome, {user.name}</span>
            </div>
            <div className="nav-right">
                <span className="user-profile">User Profile</span>
                <button>Logout</button>
             </div>
        </nav>
        </>
      );
    };

    
    
    
    
    
    