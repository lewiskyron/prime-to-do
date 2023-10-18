
import React from 'react'
import { useState } from 'react'
import ListDialog from './ListDialog';


export default function Navbar() {
    return (
        <>
            <nav>
                <div className="nav-left">
                    <span>Welcome</span>
                </div>

                <div className="nav-right">
                    <span className="user-profile">User Profile</span>
                    <button>Logout</button>
                </div>
            </nav>
        </>
    );
};
    
    
    