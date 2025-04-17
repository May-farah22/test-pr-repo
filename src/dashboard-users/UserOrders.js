// ClientOrders.js
import React from 'react';
import '../styles/UserOrders.css';
import { Link } from 'react-router-dom';
import serumImg from '../assets/images/creme hyd.jpg';
import moisturizerImg from '../assets/images/gel bio.jpg';
import nightCreamImg from '../assets/images/serum roch.jpg';


const ClientOrders = () => {
  return (
    <div className="orders-container">
      <h2 className="section-title">Your Orders</h2>

      <div className="order-card">
        <div className="order-header">
          <div>
            <p className="order-id">Order #ORD-7231</p>
            <p className="order-date">Placed on April 10, 2025</p>
          </div>
          <div className="order-status-price">
            <span className="order-status">Delivered</span>
            <div className="order-total">
              <p>Total</p>
              <strong>$129.99</strong>
            </div>
            <button className="details-btn">View Details</button>
          </div>
        </div>
        <div className="tabs">
        <Link to="/user-dashboard" className="tab-btn">Overview</Link>
        <Link to="/user-dashboard/orders" className="tab-btn active">Orders</Link>
        <Link to="/user-dashboard/wishlist" className="tab-btn">Wishlist</Link>
        <Link to="/user-dashboard/settings" className="tab-btn">Settings</Link>
      </div>
      <div className="order-item">
  <img src={serumImg} alt="Hydrating Serum" />
  <div className="item-info">
    <p>Hydrating Facial Serum</p>
    <small>Qty: 1</small>
  </div>
  <span className="item-price">$39.99</span>
</div>

<div className="order-item">
  <img src={moisturizerImg} alt="Vitamin C Moisturizer" />
  <div className="item-info">
    <p>Vitamin C Brightening Moisturizer</p>
    <small>Qty: 1</small>
  </div>
  <span className="item-price">$49.99</span>
</div>

<div className="order-item">
  <img src={nightCreamImg} alt="Night Cream" />
  <div className="item-info">
    <p>Retinol Night Repair Cream</p>
    <small>Qty: 1</small>
  </div>
  <span className="item-price">$40.01</span>
        </div>
      </div>
    </div>
  );
};

export default ClientOrders;
