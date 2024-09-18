
import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import MyGoogleMap from "../MyGoogleMap";
import OngoingDeliveries from "./OngoingDeliveries";
import TrackingOrder from "../Admin/TrackingOrder ";


function AdminDashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen"> 
      {/* Header en haut */}
      <Adminheader />
      
      <div className="flex flex-col lg:flex-row w-full">
        {/* Sidebar cachée sur mobile */}
        <div className="hidden lg:block lg:w-[250px]">
          <Adminsidebar />
        </div>
        
        {/* Contenu principal */}
        <div className="flex-grow p-6 space-y-8 bg-gray-200">
          {/* Grid pour OngoingDeliveries et MyGoogleMap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <OngoingDeliveries />
            <MyGoogleMap />
          </div>

          {/* TrackingOrder en pleine largeur */}
          <div className="grid grid-cols-1">
            <TrackingOrder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
