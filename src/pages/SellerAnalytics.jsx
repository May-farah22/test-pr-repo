import React from 'react';
import '../styles/SellerCommon.css';

const SellerAnalytics = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">📊 Analytique</h2>

      <div className="table-search-add">
        <input type="text" placeholder="🔍 Rechercher..." />
        <button className="btn-purple">+ Exporter</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Métrique</th>
            <th>Valeur</th>
            <th>Variation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Revenu total</td>
            <td>12 548,75 €</td>
            <td><span className="status in-stock">+12.5%</span></td>
          </tr>
          <tr>
            <td>Commandes</td>
            <td>184</td>
            <td><span className="status in-stock">+8.2%</span></td>
          </tr>
          <tr>
            <td>Panier moyen</td>
            <td>68.15 €</td>
            <td><span className="status in-stock">+2.3%</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SellerAnalytics;
