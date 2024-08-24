import Customerheader from "./Customerheader";
import Customersidebar from "./Customersidebar";
import MyGoogleMap from "../MyGoogleMap.jsx";
function CustomerDashboard(){
    return (
      <div className="flex">
    
      <Customerheader/>
      <Customersidebar />
          <MyGoogleMap />
        
     
    </div>
    );
}
export default CustomerDashboard;
