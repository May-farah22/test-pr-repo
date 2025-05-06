import React from 'react';
import { Link ,useNavigate } from "react-router-dom";
import '../styles/Sidebar.css';
import { FiBox, FiShoppingBag, FiUsers, FiMessageSquare, FiLogOut, FiSettings, FiBarChart2, FiUser } from 'react-icons/fi';
const Sidebar = () => {
  const navigate = useNavigate();
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
        <Link to="/dashboard" className="menu-item active">
          <FiBarChart2 className="icon"/>
          <span>Dashboard</span>
        </Link>
        <Link to="/dashboard/products" className="menu-item ">
        <FiBox className="icon" />
        <span>Products</span>
      </Link>

      <Link to="/dashboard/orders" className="menu-item ">
        <FiShoppingBag className="icon" />
        <span>Orders</span>
      </Link>

      <Link to="/dashboard/users" className="menu-item ">
        <FiUsers className="icon" />
        <span>Customers</span>
      </Link>

      <Link to="/dashboard/Messages" className="menu-item ">
        <FiMessageSquare className="icon" />
        <span>Messages</span>
      </Link>
      <Link to="/dashboard/settings" className="menu-item">
          <FiSettings className="icon" />
          <span>Settings</span>
        </Link>
      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-icon"><FiUser /></div>
          <div>
            <p className="user-name">Admin User</p>
            <p className="user-email">admin@glowcare.com</p>
          </div>
        </div>
        <div className="footer-actions">         
        <button onClick={handleLogout} className="menu-item">
          <FiLogOut className="icon" />
          <span>Logout</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
