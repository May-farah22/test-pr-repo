import React from 'react';
import '../styles/UserOrders.css';
import serumImg from '../assets/images/creme hyd.jpg';
import moisturizerImg from '../assets/images/gel bio.jpg';
import nightCreamImg from '../assets/images/serum roch.jpg';

const ClientOrders = () => {
  return (
    <div className="client-orders-container">
      <h2 className="client-section-title">Your Orders</h2>

      <div className="client-order-card">
        <div className="client-order-header">
          <div>
            <p className="client-order-id">Order #ORD-7231</p>
            <p className="client-order-date">Placed on April 10, 2025</p>
          </div>
          <div className="client-order-status-price">
            <span className="client-order-status">Delivered</span>
            <div className="client-order-total">
              <p>Total</p>
              <strong>$129.99</strong>
            </div>
            <button className="client-details-btn">View Details</button>
          </div>
        </div>
      
      <div className="client-order-item">
        <img src={serumImg} alt="Hydrating Serum" />
        <div className="client-item-info">
          <p>Hydrating Facial Serum</p>
          <small>Qty: 1</small>
        </div>
        <span className="client-item-price">$39.99</span>
      </div>

      <div className="client-order-item">
        <img src={moisturizerImg} alt="Vitamin C Moisturizer" />
        <div className="client-item-info">
          <p>Vitamin C Brightening Moisturizer</p>
          <small>Qty: 1</small>
        </div>
        <span className="client-item-price">$49.99</span>
      </div>

      <div className="client-order-item">
        <img src={nightCreamImg} alt="Night Cream" />
        <div className="client-item-info">
          <p>Retinol Night Repair Cream</p>
          <small>Qty: 1</small>
        </div>
        <span className="client-item-price">$40.01</span>
      </div>
      
      </div>
    </div>
  );
};

export default ClientOrders;
