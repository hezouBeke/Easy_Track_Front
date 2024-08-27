import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import DashboardCards from "./DashboardCards";
import MyGoogleMap from "../MyGoogleMap";
import OngoingDeliveries from "./OngoingDeliveries";
import TrackingOrder from "../Admin/TrackingOrder ";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen">  
      <Adminheader />
      <div className="flex flex-col w-full">
      <Adminsidebar />
        <div className="p-6 flex flex-col space-y-8">
          <DashboardCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <OngoingDeliveries />
            <MyGoogleMap />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
            <TrackingOrder />
            </div>
          </div>
        </div>
      </div>
      <div >
      </div>
    </div>
  );
}

export default AdminDashboard;
