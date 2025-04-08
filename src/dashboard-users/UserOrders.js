import '../styles/UserOrders.css';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Vous pouvez utiliser des modals avec react-bootstrap

const UserOrders = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: 1, status: 'En attente', date: '2025-03-25', total: 30, items: ['Produit 1', 'Produit 2'] },
    { id: 2, status: 'Expédiée', date: '2025-03-24', total: 50, items: ['Produit 3'] },
    { id: 3, status: 'Livrée', date: '2025-03-23', total: 20, items: ['Produit 4', 'Produit 5'] },
  ]; // Exemple de données

  const handleModalShow = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const filteredOrders = orders.filter((order) => {
    return (filter === 'all' || order.status === filter) &&
      (order.status.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search));
  });

  return (
    <div className="user-orders">
      <div className="orders-header">
        <h2>Mes Commandes</h2>
        <div className="orders-filters">
          <input
            type="text"
            placeholder="Rechercher"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">Toutes les commandes</option>
            <option value="En attente">En attente</option>
            <option value="Expédiée">Expédiée</option>
            <option value="Livrée">Livrée</option>
          </select>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <p>Aucune commande trouvée.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>${order.total}</td>
                  <td>
                    <Button
                      className="view-details-btn"
                      onClick={() => handleModalShow(order)}
                    >
                      Voir détails
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal pour les détails de la commande */}
      {selectedOrder && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Détails de la commande {selectedOrder.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Total:</strong> ${selectedOrder.total}</p>
            <p><strong>Articles:</strong></p>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserOrders;
