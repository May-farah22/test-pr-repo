import React, { useState } from 'react';
import '../styles/SellerDashboard.css';
import '../styles/SellerCommon.css'; // pour réutiliser les styles modale

const SellerProducts = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="product-management">
      <div className="product-header">
        <h2>Gestion des Produits</h2>
        <div className="actions">
          <input type="text" placeholder="Rechercher un produit..." />
          <button className="add-btn" onClick={handleShowForm}>+ Nouveau Produit</button>
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

{/* Formulaire Modale */}
{showForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Ajouter un Nouveau Produit</h3>
      <form>
        <div className="form-fields">
          {/* Colonne 1 */}
          <div className="form-column">
            <div className="form-group">
              <label>Nom du Produit</label>
              <input type="text" placeholder="Nom du produit" required />
            </div>
            
            <div className="form-group">
              <label>Prix (€)</label>
              <input type="number" step="0.01" placeholder="Prix actuel" required />
            </div>
            
            <div className="form-group">
              <label>Ancien Prix (€)</label>
              <input type="number" step="0.01" placeholder="Prix avant réduction" />
            </div>
            
            <div className="form-group">
              <label>Note</label>
              <input type="number" step="0.1" min="0" max="5" placeholder="Note sur 5" />
            </div>
            
            <div className="form-group">
              <label>Images (URLs)</label>
              <input type="text" placeholder="URLs séparées par des virgules" />
            </div>
          </div>
          
          {/* Colonne 2 */}
          <div className="form-column">
            <div className="form-group">
              <label>Stock</label>
              <input type="number" placeholder="Quantité en stock" required />
            </div>
            
            <div className="form-group">
              <label>Catégorie</label>
              <input type="text" placeholder="Catégorie du produit" required />
            </div>
            
            <div className="form-group">
              <label>Statut</label>
              <select required>
                <option value="in-stock">En stock</option>
                <option value="low-stock">Stock faible</option>
                <option value="out-of-stock">Rupture de stock</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Composition</label>
              <input type="text" placeholder="Ingrédients/composition" />
            </div>
          </div>
        </div>
        
        {/* Champ description (pleine largeur) */}
        <div className="form-group full-width">
          <label>Description</label>
          <textarea placeholder="Description détaillée du produit" rows="4"></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit">Ajouter Produit</button>
          <button type="button" onClick={handleCloseForm} className="cancel-btn">Annuler</button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default SellerProducts;
