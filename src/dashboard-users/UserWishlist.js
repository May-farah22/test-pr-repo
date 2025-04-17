import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserOrders.css';

const ClientWishlist = () => {
  return (
    <div className="orders-container">
      <h2 className="section-title">Your Wishlist</h2>

      <div className="tabs">
        <Link to="/user-dashboard" className="tab-btn">Overview</Link>
        <Link to="/user-dashboard/orders" className="tab-btn active">Orders</Link>
        <Link to="/user-dashboard/wishlist" className="tab-btn">Wishlist</Link>
        <Link to="/user-dashboard/settings" className="tab-btn">Settings</Link>
      </div>
      <div className="order-items">
        <div className="order-item">
          <img src="https://via.placeholder.com/60" alt="Product" />
          <div className="item-info">
            <p>Soothing Aloe Vera Gel</p>
          </div>
          <span className="item-price">$14.99</span>
        </div>
      </div>
    </div>
  );
};

export default ClientWishlist;
