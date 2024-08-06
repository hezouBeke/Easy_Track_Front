import React  from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Homepage/Home";
import CustomerDashboard from "./Components/Homepage/CustomerDashboard";
import DriverDashboard from "./Components/Homepage/DriverDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";

function App() {
  return ( 
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/customer" element={<CustomerDashboard />} />
      <Route path="/dashboard/driver" element={<DriverDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
     </Routes>
  </Router>
  )
}

export default App
