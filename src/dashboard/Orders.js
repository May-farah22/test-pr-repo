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
        console.log('res',res.data)
        setOrders(res.data);
      } catch (error) {
        console.error('Erreur chargement commandes:', error);
      }
    };
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'orders-status--completed';
      case 'processing': return 'orders-status--processing';
      case 'shipped': return 'orders-status--shipped';
      default: return '';
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
        <h1 className="orders-title">Orders</h1>
        <div className="orders-filters">
          <select className="orders-filter" value={filteredStatus} onChange={handleFilterChange}>
            <option value="All">All Orders</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
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
                  {order.status}
                </span>
              </td>
              <td className="orders-total">${order.total?.toFixed(2)}</td>
              <td className="orders-actions">
                <div className="orders-actions-container">
                  <button className="orders-action-btn orders-action-btn--view">
                    <FiEye className="orders-action-icon" />
                    <span>View</span>
                  </button>
                  <button
                    className="orders-action-btn orders-action-btn--edit"
                    onClick={() => handleEditClick(order)}
                  >
                    <FiEdit className="orders-action-icon" />
                    <span>Edit</span>
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
              <h3>Edit Order #{editingOrder._id?.slice(-4).toUpperCase()}</h3>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Customer</label>
                <input
                  type="text"
                  name="customer"
                  value={editingOrder.customer}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={editingOrder.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={editingOrder.status}
                  onChange={handleInputChange}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
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
                Cancel
              </button>
              <button onClick={handleSave} className="modal-save-btn">
                <FiSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
