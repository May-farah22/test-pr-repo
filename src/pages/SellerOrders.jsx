import React from 'react';
import '../styles/SellerCommon.css';

const SellerOrders = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">📦 Commandes</h2>

      <div className="table-search-add">
        <input type="text" placeholder="🔍 Rechercher une commande..." />
        <button className="btn-purple">+ Nouveau Produit</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Date</th>
            <th>Montant</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1001</td>
            <td>Jean Dupont</td>
            <td>15/04/2025</td>
            <td>89.99 €</td>
            <td><span className="status delivered">Livrée</span></td>
          </tr>
          <tr>
            <td>#1002</td>
            <td>Marie Claire</td>
            <td>14/04/2025</td>
            <td>39.50 €</td>
            <td><span className="status pending">En attente</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrders;
