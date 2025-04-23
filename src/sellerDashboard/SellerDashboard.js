import React from 'react';
import '../styles/SellerDashboard.css';
import { NavLink, Outlet} from 'react-router-dom';



const SellerDashboard = () => {
  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord vendeur</h1>
        <div className="top-actions">
          <button className="notification-btn">🔔 Notifications</button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="card">
          <p>Revenu Total</p>
          <h2>12.548,75 €</h2>
          <span className="up">↑ 12.5% 30 derniers jours</span>
        </div>
        <div className="card">
          <p>Commandes</p>
          <h2>184</h2>
          <span className="up">↑ 8.2% 7 derniers jours</span>
        </div>
        <div className="card">
          <p>Produits Actifs</p>
          <h2>32</h2>
          <span className="stock">En stock</span>
        </div>
        <div className="card">
          <p>Avis Clients</p>
          <h2>4.8</h2>
          <span className="up">↑ 0.3% Note moyenne</span>
        </div>
      </div>
      {/* Menu de navigation */}
    
      <nav className="seller-nav">
        <NavLink to="products">Produits</NavLink>
        <NavLink to="orders">Commandes</NavLink>
      </nav>

      {/* Zone dynamique */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboard;
