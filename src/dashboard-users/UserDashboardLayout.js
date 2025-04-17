import React from "react";
import { Outlet } from "react-router-dom"; 
import "../styles/UserDashboardHome.css"; 



const UserDashboardLayout = () => {
  return (

      <div className="user-dashboard-content">
        <Outlet /> 
      </div>
    
  );
};

export default UserDashboardLayout;
