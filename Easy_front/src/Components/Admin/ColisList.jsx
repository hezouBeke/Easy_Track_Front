import React from "react";
import Adminsidebar from "./Adminsidebar";
import { Box } from "@mui/material";

const ColisList = () => {
    return(
        <>
        
        <Adminsidebar />
        
        <Box sx={{marginLeft:40, marginTop: 100 }}>
            <h1>Colis List</h1>
        </Box>
        </>
    )
}

export default ColisList;