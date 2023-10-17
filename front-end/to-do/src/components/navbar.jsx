
import React from 'react'
import { useState } from 'react'
import ListDialog from './ListDialog';


export default function Navbar() {
    const [user, setUser] = useState({ name: 'Kyron!' });
    const [tasks, setTasks] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleAddList = () => {
        setDialogOpen(true);
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    }

    return (
        <>
            <nav>
                <div className="nav-left">
                    <span>Welcome, {user.name}</span>
                </div>

                {/* Add Task Button in the Middle */}
                <div className="nav-center">
                    <button onClick={handleAddList}>Add List</button>
                </div>

                <div className="nav-right">
                    <span className="user-profile">User Profile</span>
                    <button>Logout</button>
                </div>
            </nav>
            {isDialogOpen && <ListDialog 
            open={isDialogOpen}
            onClose={handleCloseDialog}/>}
        </>
    );
};
    
    
    