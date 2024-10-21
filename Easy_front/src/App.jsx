import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import UserList from "./Components/Admin/UserList";
import CoursierList from "./Components/Admin/CoursierList";
import ColisList from "./Components/Admin/ColisList";
import Colis from "./Components/Admin/Colis";
import Expeditions from "./Components/Admin/Expeditions";
import ExpeditionList from "./Components/Admin/ExpeditionList";
import Stats from "./Components/Admin/Stats";
import Hisrotiques from "./Components/Admin/Historiques";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/colis-list" element={<ColisList />} />
        <Route path="/coursiers-list" element={<CoursierList />} />
        <Route path="/expeditions-list" element={<ExpeditionList />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/createshipment" element={<CreateExpedition />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/admin/clients" element={<Customer />} />
        <Route path="/dashboard/admin/stats" element={<Stats />} />
        <Route path="/dashboard/admin/coursiers" element={<Coursiers />} />
        <Route path="/dashboard/admin/colis" element={<Colis />} />
        <Route path="/dashboard/admin/expeditions" element={<Expeditions />} />
        <Route path="/dashboard/admin/historique" element={<Hisrotiques />} />
        {/* Redirection de la racine vers Home */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        {/* Gestion des routes non trouvées : redirection vers Home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
