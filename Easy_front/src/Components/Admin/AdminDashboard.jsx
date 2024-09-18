
import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import MyGoogleMap from "../MyGoogleMap";
import OngoingDeliveries from "./OngoingDeliveries";
import TrackingOrder from "../Admin/TrackingOrder ";

function AdminDashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Header */}
      <Adminheader />

      <div className="flex flex-col lg:flex-row w-full">
        {/* Sidebar visible sur grand écran */}
        <div className="hidden lg:block lg:w-[250px]">
          <Adminsidebar />
        </div>

        {/* Contenu principal */}
        <div className="flex-grow p-4 lg:p-6 space-y-8 bg-gray-200">
          {/* Grille pour OngoingDeliveries et MyGoogleMap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
            <OngoingDeliveries />
            <MyGoogleMap />
          </div>

          {/* TrackingOrder occupe toute la largeur */}
          <div className="w-full">
            <TrackingOrder />
          </div>
        </div>
      </div>

      {/* Sidebar visible sur mobile */}
      <div className="lg:hidden">
        <Adminsidebar />
      </div>
    </div>
  );
}

export default AdminDashboard;

