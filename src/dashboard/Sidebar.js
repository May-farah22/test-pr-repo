import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; // Ajoute ce fichier CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="brand">GlowCare</h2>
      <ul>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-home"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/products">
            <i className="fas fa-box"></i> Produits
          </Link>
        </li>
        <li>
          <Link to="/dashboard/orders">
            <i className="fas fa-shopping-cart"></i> Commandes
          </Link>
        </li>
        <li>
          <Link to="/dashboard/users">
            <i className="fas fa-users"></i> Utilisateurs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
