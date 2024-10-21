import React from "react";
import Adminsidebar from "./Adminsidebar";
import { Box } from "@mui/material";

const CoursierList = () => {
    return(
        <>
        <Adminsidebar />
        <Box sx={{marginLeft:40, marginTop: 100 }}>
            <h1>Coursier List</h1>
        </Box>
        </>
    )
}

export default CoursierList;