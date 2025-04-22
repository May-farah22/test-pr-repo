import React from 'react';
import '../styles/SellerCommon.css';

const SellerClients = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">👥 Clients</h2>

      <div className="table-search-add">
        <input type="text" placeholder="🔍 Rechercher un client..." />
        <button className="btn-purple">+ Nouveau Client</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Commandes</th>
            <th>Total dépensé</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jean Martin</td>
            <td>jean.martin@email.com</td>
            <td>+33 6 12 34 56 78</td>
            <td>5</td>
            <td>249.99 €</td>
          </tr>
          <tr>
            <td>Sophie Bernard</td>
            <td>sophie.bernard@email.com</td>
            <td>+33 6 98 76 54 32</td>
            <td>2</td>
            <td>89.50 €</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SellerClients;
