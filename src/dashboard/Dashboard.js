import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard/products">Gestion des Produits</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
