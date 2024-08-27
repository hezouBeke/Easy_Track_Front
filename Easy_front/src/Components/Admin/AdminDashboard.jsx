import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import DashboardCards from "./DashboardCards";

function AdminDashboard() {
  return (
    <div className="flex">
      <Adminsidebar />
      <div className="flex flex-col w-full">
        <Adminheader />
        <div className="p-6"> {/* Ajustez la valeur du padding selon vos besoins */}
          <DashboardCards />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
