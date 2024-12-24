import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';  // Assure-toi que le chemin d'importation est correct

// Importation des composants
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Homepage/Home";
import CustomerDashboard from "./Components/CustomerDashboard/CustomerDashboard";
import DriverDashboard from "./Components/DriverDashboard/DriverDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CreateExpedition from "./Components/Admin/CreateExpedition";
import ResetPassword from "./Components/ResetPassword ";
import Customer from "./Components/Admin/Customer";
import Coursiers from "./Components/Admin/Coursiers";
import Colis from "./Components/Admin/Colis";
import Expeditions from "./Components/Admin/Expeditions";
import ExpeditionList from "./Components/Admin/ExpeditionList";
import UserList from "./Components/Admin/UserList";
import CoursierList from "./Components/Admin/CoursierList";
import ColisList from "./Components/Admin/ColisList";
import Stats from "./Components/Admin/Stats";
import Hisrotiques from "./Components/Admin/Historiques";
import ConfirmationPage from "./Components/DriverDashboard/ConfirmationPage";
import RelayOptions from "./Components/DriverDashboard/RelayOptions";
import Entercolis from "./Components/DriverDashboard/Entercolis";
import CreateColis from "./Components/Admin/CreateColis";


function App() {
  return (
    <Router>
 <Routes>
    {/* Routes publiques */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/" element={<Navigate replace to="/home" />} />
    <Route path="*" element={<Navigate to="/home" />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    
    {/* Routes protégées : dashboard admin */}
    <Route path="/dashboard/admin" element={<PrivateRoute element={AdminDashboard} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/createshipment" element={<PrivateRoute element={CreateExpedition} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/createparcel" element={<PrivateRoute element={CreateColis} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/clients" element={<PrivateRoute element={Customer} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/stats" element={<PrivateRoute element={Stats} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/coursiers" element={<PrivateRoute element={Coursiers} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/colis" element={<PrivateRoute element={Colis} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/expeditions" element={<PrivateRoute element={Expeditions} allowedRoles={['Admin']} />} />
    <Route path="/dashboard/admin/historiques" element={<PrivateRoute element={Hisrotiques} allowedRoles={['Admin']} />} />
    <Route path="/coursiers-list" element={<PrivateRoute element={CoursierList} allowedRoles={['Admin']} />} />
    <Route path="/colis-list" element={<PrivateRoute element={ColisList} allowedRoles={['Admin']} />} />
    <Route path="/expeditions-list" element={<PrivateRoute element={ExpeditionList} allowedRoles={['Admin']} />} />
    <Route path="/user-list" element={<PrivateRoute element={UserList } allowedRoles={['Admin']} />} />


    {/* Routes protégées : dashboard coursier */}
    <Route path="/dashboard/driver" element={<PrivateRoute element={DriverDashboard} allowedRoles={['Coursier']} />} />
    <Route path="/delevry" element={<PrivateRoute element={ConfirmationPage} allowedRoles={['Coursier']} />} />
    <Route path="/relay" element={<PrivateRoute element={RelayOptions} allowedRoles={['Coursier']} />} />
    <Route path="/enter-code" element={<PrivateRoute element={Entercolis} allowedRoles={['Coursier']} />} />
    
    {/* Routes protégées : dashboard client */}
    <Route path="/dashboard/customer" element={<PrivateRoute element={CustomerDashboard} allowedRoles={['Client']} />} />
  </Routes>
  </Router>
  );
}

export default App;
