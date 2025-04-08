import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css"; // Style pour le Dashboard

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
