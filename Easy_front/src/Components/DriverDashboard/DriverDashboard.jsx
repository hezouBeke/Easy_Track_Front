import Driverheader from "./Driverheader";
import Driversidebar from "./Driversidebar";
import MyGoogleMap from "../MyGoogleMap.jsx";
function DriverDashboard () {
    return (
      <div className="flex">
      <Driversidebar />
    <Driverheader/>
    <MyGoogleMap />

    </div>
    );
}

export default DriverDashboard;