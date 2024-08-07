import MyGoogleMap from "../MyGoogleMap.jsx"
import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar.jsx";
import {Box} from "@mui/material"

function AdminDashboard() {
  return (
    <div>
      <Adminheader /> 
      
      <Box sx={{ width: '100%', height: '400px' }}>
        <MyGoogleMap />
      </Box>
      
      <Adminsidebar /> 
     
    </div>
  );
}



export default AdminDashboard;
