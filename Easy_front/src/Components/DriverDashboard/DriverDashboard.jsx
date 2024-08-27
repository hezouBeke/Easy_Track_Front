import Driverheader from "./Driverheader";
import Driversidebar from "./Driversidebar";
import DashboardCards from "../Admin/DashboardCards.jsx";
function DriverDashboard () {
    return (
      <div className="flex">
      < Driversidebar />
      <div className="flex flex-col w-full">
        <Driverheader />
        <div className="p-6"> {/* Ajustez la valeur du padding selon vos besoins */}
          <DashboardCards />
        </div>
      </div>
    </div>

    );
}

export default DriverDashboard;