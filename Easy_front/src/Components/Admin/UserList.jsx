import React from "react";
import Adminsidebar from "./Adminsidebar";
import { Box } from "@mui/material";

const UserList = () => {
    return(
        <>
        
        <Adminsidebar />
        
        <Box sx={{marginLeft:40, marginTop: 100 }}>

            <h1>User List</h1>
        </Box>
        </>
    )
}

export default UserList;