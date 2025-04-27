import React from 'react';
import '../styles/UserOrders.css';
import aloeVeraImage from '../assets/images/creme hyd.jpg'; // Importer l'image

const ClientWishlist = () => {
  return (
    <div className="client-wishlist-container">
      <h2 className="client-section-title">Your Wishlist</h2>

      <div className="client-wishlist-items">
        <div className="client-wishlist-item">
          <img src={aloeVeraImage} alt="Soothing Aloe Vera Gel" /> {/* Utiliser l'image importée */}
          <div className="client-item-info">
            <p>Soothing Aloe Vera Gel</p>
          </div>
          <span className="client-item-price">$14.99</span>
        </div>
      </div>
    </div>
  );
};

export default ClientWishlist;
