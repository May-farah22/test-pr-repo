import React from 'react';
import '../styles/UserOrders.css';
import { ShoppingCart, Favorite, Loyalty } from '@mui/icons-material';  // Importation des icônes

const AperçuClient = () => {
  return (
    <div className="client-orders-container">
      <h2 className="client-section-title">Aperçu du Tableau de Bord</h2>

      <div className="client-dashboard-cards">
        <div className="client-dashboard-card">
          <ShoppingCart className="client-card-icon" /> {/* Icône pour Commandes Totales */}
          <h3>Total des Commandes</h3>
          <p className="client-bold">12</p>
        </div>
        <div className="client-dashboard-card">
          <Favorite className="client-card-icon" /> {/* Icône pour Articles en Liste de Souhaits */}
          <h3>Articles en Liste de Souhaits</h3>
          <p className="client-bold">5</p>
        </div>
        <div className="client-dashboard-card">
          <Loyalty className="client-card-icon" /> {/* Icône pour Points de Fidélité */}
          <h3>Points de Fidélité</h3>
          <p className="client-bold">230</p>
        </div>
      </div>
    </div>
  );
};

export default AperçuClient;
