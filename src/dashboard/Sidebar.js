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
    navigate('/signin');
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Glow<span>Care</span>Admin</h2>
      </div>

      <div className="sidebar-menu">
        <button className="menu-item active">
          <FiBarChart2 className="icon"/>
          <span>Dashboard</span>
        </button>
        <Link to="/dashboard/products" className="menu-item">
          <FiBox className="icon" />
          <span>Products</span>
        </Link>

        <button className="menu-item">
          <FiShoppingBag className="icon" />
          <span>Orders</span>
        </button>
        <button className="menu-item">
          <FiUsers className="icon" />
          <span>Customers</span>
        </button>
        <button className="menu-item">
          <FiMessageSquare className="icon" />
          <span>Messages</span>
        </button>
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
          <button><FiSettings className="icon" /> <span>Settings</span></button>
          <button onClick={handleLogout} ><FiLogOut className="icon" /> <span>Logout</span></button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
