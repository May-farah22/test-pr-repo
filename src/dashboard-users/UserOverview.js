import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/UserOrders.css';

const ClientOverview = () => {
  return (
    <div className="orders-container">
      <h2 className="section-title">Dashboard Overview</h2>

      <div className="tabs">
        <NavLink to="/user-dashboard" className={({ isActive }) => isActive ? "tab active" : "tab"}>Overview</NavLink>
        <NavLink to="/user-dashboard/orders" className={({ isActive }) => isActive ? "tab active" : "tab"}>Orders</NavLink>
        <NavLink to="/user-dashboard/wishlist" className={({ isActive }) => isActive ? "tab active" : "tab"}>Wishlist</NavLink>
        <NavLink to="/user-dashboard/settings" className={({ isActive }) => isActive ? "tab active" : "tab"}>Settings</NavLink>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p className="bold">12</p>
        </div>
        <div className="card">
          <h3>Wishlist Items</h3>
          <p className="bold">5</p>
        </div>
        <div className="card">
          <h3>Loyalty Points</h3>
          <p className="bold">230</p>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
