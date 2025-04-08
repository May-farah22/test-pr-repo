import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar"; // Assure-toi que ce composant existe bien
import "../styles/UserDashboardHome.css"; // Vérifie si ce fichier CSS est bien chargé



const UserDashboardLayout = () => {
  return (
    <div className="user-dashboard">
      <UserSidebar />
      <div className="user-dashboard-content">
        <Outlet /> {/* Cela affichera les sous-pages (profile, orders, settings) */}
      </div>
    </div>
  );
};

export default UserDashboardLayout;
