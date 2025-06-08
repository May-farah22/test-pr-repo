import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SellerCommon.css';

const SellerOrders = () => {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id;
  const fetchSellerOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/seller/${userId}`);
      console.log("res",res.data);
      
      setOrders(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchSellerOrders();
    }
  }, [userId]);

  

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="page-container">
      <h2 className="page-title">Commandes</h2>

      <div className="actions">
        <input type="text" placeholder="Rechercher une commande..." />
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
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index}>
                <td>#{order._id.slice(-4).toUpperCase()}</td>
                <td>{order.customer}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.total} DT</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>Aucune commande disponible.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulaire Modal (non connecté encore) */}
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
