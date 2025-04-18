import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserOrders.css';

const ClientSettings = () => {
  return (
    <div className="orders-container">
      <h2 className="section-title">Settings</h2>

      <div className="tabs">
        <Link to="/user-dashboard" className="tab-btn">Overview</Link>
        <Link to="/user-dashboard/orders" className="tab-btn active">Orders</Link>
        <Link to="/user-dashboard/wishlist" className="tab-btn">Wishlist</Link>
        <Link to="/user-dashboard/settings" className="tab-btn">Settings</Link>
      </div>

      <div className="card">
        <p><strong>Name:</strong> Farah Mariem</p>
        <p><strong>Email:</strong> farah@example.com</p>
        <button className="routine-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default ClientSettings;
