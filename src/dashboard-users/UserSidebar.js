// components/UserSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaHeart, FaUserCog } from 'react-icons/fa';
import '../styles/UserSidebar.css';

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <h3 className="sidebar-title">Mon espace</h3>
      <nav>
        <NavLink to="/user-dashboard" className="sidebar-link">
          <FaHome /> Vue d'ensemble
        </NavLink>
        <NavLink to="/user-dashboard/orders" className="sidebar-link">
          <FaBox /> Commandes
        </NavLink>
        <NavLink to="/user-dashboard/wishlist" className="sidebar-link">
          <FaHeart /> Liste de souhaits
        </NavLink>
        <NavLink to="/user-dashboard/settings" className="sidebar-link">
          <FaUserCog /> Paramètres
        </NavLink>
      </nav>
    </div>
  );
};

export default UserSidebar;
