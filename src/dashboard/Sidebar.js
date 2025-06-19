import React from 'react';
import { NavLink, useNavigate,Link } from "react-router-dom";
import '../styles/Sidebar.css';
import { FiBox, FiShoppingBag, FiUsers, FiMessageSquare, FiLogOut, FiSettings, FiBarChart2, FiUser } from 'react-icons/fi';
const Sidebar = () => {
  const navigate = useNavigate();
     const user =  JSON.parse(localStorage.getItem('user'));
     console.log('user',user)
  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('wishlist');

    navigate('/signin');
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
  <Link to="/dashboard" className="logo-link">
    <h2>Glow<span>Care</span>Admin</h2>
  </Link>
      </div>

      <div className="sidebar-menu">
        <NavLink to="/dashboard" end className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
        <FiBarChart2 className="icon"/>
        <span>Dashboard</span>
      </NavLink>


      <NavLink
        to="/dashboard/products"
        className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        <FiBox className="icon" />
        <span>Produits</span>
      </NavLink>


      <NavLink to="/dashboard/orders" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        <FiShoppingBag className="icon" />
        <span>Commandes</span>
      </NavLink>

      <NavLink to="/dashboard/users" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        <FiUsers className="icon" />
        <span>Gestion des utilisateurs</span>
      </NavLink>

      <NavLink to="/dashboard/messages" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        <FiMessageSquare className="icon" />
        <span>Messages</span>
      </NavLink>

      <NavLink to="/dashboard/settings" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        <FiSettings className="icon" />
        <span>Paramètres</span>
      </NavLink>

      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-icon"><FiUser /></div>
          <div>
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        <div className="footer-actions">         
        <button onClick={handleLogout} className="menu-item">
          <FiLogOut className="icon" />
          <span>Déconnexion</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
