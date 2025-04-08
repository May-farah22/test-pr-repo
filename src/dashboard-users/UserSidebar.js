import React from "react";
import { Link } from "react-router-dom";
import '../styles/UserSidebar.css';  // Assurez-vous d'importer le fichier CSS

const UserSidebar = () => {
  return (
    <nav className="user-sidebar">
      <div className="logo">
        <h1 className="logo-text">GlowCare</h1> {/* Nom du projet */}
      </div>
      <ul>
        <li><Link to="/user-dashboard" activeClassName="active">Accueil</Link></li>
        <li><Link to="/user-dashboard/profile" activeClassName="active">Mon Profil</Link></li>
        <li><Link to="/user-dashboard/orders" activeClassName="active">Mes Commandes</Link></li>
        <li><Link to="/user-dashboard/settings" activeClassName="active">Paramètres</Link></li>
      </ul>
    </nav>
  );
};

export default UserSidebar;
