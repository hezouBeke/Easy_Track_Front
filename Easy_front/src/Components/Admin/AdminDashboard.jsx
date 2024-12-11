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

        {/* Contenu principal avec ajustement de la grille */}
        <div className="flex-grow p-6 space-y-8 bg-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,2.8fr] gap-4"> {/* Ajout de gap-4 et ajustement de la grille */}
            {/* Colonne pour OngoingDeliveries */}
            <div className="w-lg lg:ml-[-20px]"> {/* Ajout de marge négative pour rapprocher vers la gauche */}
              <OngoingDeliveries />
            </div>

            {/* Colonne pour la carte Google Maps */}
            <div className=" w-[583px] h-[583px] mt-14">
              <MyGoogleMap />
            </div>
          </div>

          {/* TrackingOrder occupe toute la largeur */}
          <div className="w-full ">
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