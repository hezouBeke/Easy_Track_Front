import Customerheader from "./Customerheader";
import Customersidebar from "./Customersidebar";
function CustomerDashboard(){
    return (
      <div className="flex">
      <Customersidebar />
    <Customerheader/>
     
    </div>
    );
}
export default CustomerDashboard;
