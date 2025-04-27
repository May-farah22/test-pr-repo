import React from 'react';
import '../styles/UserOrders.css';
import { ShoppingCart, Favorite, Loyalty } from '@mui/icons-material';  // Importer les icônes

const ClientOverview = () => {
  return (
    <div className="client-orders-container">
      <h2 className="client-section-title">Dashboard Overview</h2>

      <div className="client-dashboard-cards">
        <div className="client-dashboard-card">
          <ShoppingCart className="client-card-icon" /> {/* Icône pour Total Orders */}
          <h3>Total Orders</h3>
          <p className="client-bold">12</p>
        </div>
        <div className="client-dashboard-card">
          <Favorite className="client-card-icon" /> {/* Icône pour Wishlist Items */}
          <h3>Wishlist Items</h3>
          <p className="client-bold">5</p>
        </div>
        <div className="client-dashboard-card">
          <Loyalty className="client-card-icon" /> {/* Icône pour Loyalty Points */}
          <h3>Loyalty Points</h3>
          <p className="client-bold">230</p>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
