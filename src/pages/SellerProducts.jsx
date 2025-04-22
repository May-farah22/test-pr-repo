import React from 'react';
import '../styles/SellerDashboard.css';

const SellerProducts = () => {
  return (
    <div className="product-management">
    <div className="product-header">
      <h2>Gestion des Produits</h2>
      <div className="actions">
        <input type="text" placeholder="Rechercher un produit..." />
        <button className="add-btn">+ Nouveau Produit</button>
      </div>
    </div>

    <table className="product-table">
<thead>
  <tr>
    <th>Nom du produit</th>
    <th>Prix</th>
    <th>Stock</th>
    <th>Catégorie</th>
    <th>Statut</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Crème Hydratante Premium</td>
    <td>49.99 €</td>
    <td>150</td>
    <td>Hydratant</td>
    <td><span className="status in-stock">En stock</span></td>
  </tr>
  <tr>
    <td>Sérum Anti-âge</td>
    <td>89.99 €</td>
    <td>75</td>
    <td>Soin Anti-âge</td>
    <td><span className="status low-stock">Stock faible</span></td>
  </tr>
</tbody>
</table>
</div>
  );
};

export default SellerProducts;
