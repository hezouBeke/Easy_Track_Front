import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar.jsx";
import MyGoogleMap from "../MyGoogleMap.jsx";
import Shiptab from "./Shiptab";
import { Box } from "@mui/material";

function AdminDashboard() {
  return (
    <div className="flex">
      <Adminsidebar />
      <div className="flex-1">
        <Adminheader />
        <Box sx={{ width: '100%', height: '400px', mt: '64px' }}>
          <MyGoogleMap />
        </Box>
        <Shiptab />
      </div>
    </div>
  );
}

export default AdminDashboard;
