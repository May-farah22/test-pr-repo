import React, { useState } from 'react';
import '../styles/SellerCommon.css';

const SellerOrders = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <h2 className="page-title"> Commandes</h2>

      <div className="actions">
  <input type="text" placeholder="Rechercher une commande..." />
  <button className="add-btn" onClick={handleShowForm}>+ Nouvelle Commande</button>
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

      {/* Formulaire Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Ajouter une Nouvelle Commande</h3>
            <form>
              <div className="form-group">
                <label>Nom du Client</label>
                <input type="text" placeholder="Nom du client" required />
              </div>
              <div className="form-group">
                <label>Date de Commande</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Montant</label>
                <input type="number" placeholder="Montant total" required />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select required>
                  <option value="pending">En attente</option>
                  <option value="delivered">Livrée</option>
                  <option value="canceled">Annulée</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit">Ajouter Commande</button>
                <button type="button" onClick={handleCloseForm} className="cancel-btn">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
