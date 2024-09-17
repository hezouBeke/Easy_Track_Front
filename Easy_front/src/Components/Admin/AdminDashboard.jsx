
import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import MyGoogleMap from "../MyGoogleMap";
import OngoingDeliveries from "./OngoingDeliveries";
import TrackingOrder from "../Admin/TrackingOrder ";


function AdminDashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen"> 
      {/* Header sur le dessus */}
      <Adminheader />
      
      <div className="flex flex-col lg:flex-row w-full">
        {/* Sidebar qui est cachée sur mobile et visible sur grands écrans */}
        <div className="w-full lg:w-[250px]">
          <Adminsidebar />
        </div>
        
        {/* Contenu principal */}
        <div className="flex-grow p-6 space-y-8 bg-gray-200">
          {/* Premier grid pour les composants OngoingDeliveries et MyGoogleMap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <OngoingDeliveries />
            <MyGoogleMap />
          </div>

          {/* Deuxième grid pour le composant TrackingOrder */}
          <div className="grid grid-cols-1">
            <TrackingOrder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
