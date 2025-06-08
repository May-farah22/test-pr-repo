import { useState, useEffect } from "react";
import axios from "axios";
import { FiEye, FiEdit, FiSave } from 'react-icons/fi';
import "../styles/order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data);
      } catch (error) {
        console.error('Erreur chargement commandes:', error);
      }
    };
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'orders-status--termine';
      case 'processing':
        return 'orders-status--en-traitement';
      case 'shipped':
        return 'orders-status--expedie';
      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'Terminée';
      case 'processing':
        return 'En Cours';
      case 'shipped':
        return 'Expédiée';
      default:
        return status;
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder({ ...order });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, editingOrder);
      setOrders(orders.map(order => order._id === editingOrder._id ? editingOrder : order));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilteredStatus(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    filteredStatus === "All" || order.status === filteredStatus
  );

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1 className="orders-title">Commandes</h1>
        <div className="orders-filters">
          <select className="orders-filter" value={filteredStatus} onChange={handleFilterChange}>
            <option value="All">Toutes les commandes</option>
            <option value="Completed">Terminées</option>
            <option value="Processing">En Cours</option>
            <option value="Shipped">Expédiées</option>
          </select>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Client</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Total (DT)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id} className="orders-row">
              <td className="orders-id">#{order._id?.slice(-4).toUpperCase()}</td>
              <td className="orders-customer">{order.customer || order.userId}</td>
              <td className="orders-date">{order.date}</td>
              <td className="orders-status">
                <span className={`orders-status-badge ${getStatusClass(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </td>
              <td className="orders-total">{Number(order.total)?.toFixed(2)} DT</td>
              <td className="orders-actions">
                <div className="orders-actions-container">
                  <button className="orders-action-btn orders-action-btn--view">
                    <FiEye className="orders-action-icon" />
                    <span>Voir</span>
                  </button>
                  <button
                    className="orders-action-btn orders-action-btn--edit"
                    onClick={() => handleEditClick(order)}
                  >
                    <FiEdit className="orders-action-icon" />
                    <span>Modifier</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>Modifier la commande #{editingOrder._id?.slice(-4).toUpperCase()}</h3>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  name="customer"
                  disabled
                  value={editingOrder.userId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  disabled
                  value={editingOrder.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Statut</label>
                <select
                  name="status"
                  value={editingOrder.status}
                  onChange={handleInputChange}
                >
                  <option value="Processing">En Cours</option>
                  <option value="Shipped">Expédiée</option>
                  <option value="Completed">Terminée</option>
                </select>
              </div>

              <div className="form-group">
                <label>Total (DT)</label>
                <input
                  type="number"
                  name="total"
                  value={editingOrder.total}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setIsModalOpen(false)} className="modal-cancel-btn">
                Annuler
              </button>
              <button onClick={handleSave} className="modal-save-btn">
                <FiSave /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
