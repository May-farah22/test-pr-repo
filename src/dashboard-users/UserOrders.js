import React, { useEffect, useState } from 'react';
import '../styles/UserOrders.css';
import axios from 'axios';

const ClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Récupérer le userId depuis localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);

      const fetchOrders = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/orders/${storedUser.id}`);
          console.log('res',res.data)
          setOrders(res.data);
        } catch (error) {
          console.error('Erreur lors du chargement des commandes :', error);
        }
      };

      fetchOrders();
    }
  }, []);

  return (
    <div className="client-orders-container">
      <h2 className="client-section-title">Your Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div className="client-order-card" key={index}>
            <div className="client-order-header">
              <div>
                <p className="client-order-id">Order #{order?.orderId || order?._id}</p>
                <p className="client-order-date">
                  Placed on {new Date(order?.date).toLocaleDateString()}
                </p>
              </div>
              <div className="client-order-status-price">
                <span className="client-order-status">{order?.status}</span>
                <div className="client-order-total">
                  <p>Total</p>
                  <strong>${order?.total?.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {Array.isArray(order.items) && order.items.map((item, i) => (
              <div className="client-order-item" key={i}>
                <img
                  src={
                    item.image?.startsWith('http')
                      ? item.image
                      : `${process.env.PUBLIC_URL}${item.image}`
                  }
                  alt={item.name}
                />
                <div className="client-item-info">
                  <p>{item.name}</p>
                  <small>Qty: {item.quantity}</small>
                </div>
                <span className="client-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ClientOrders;
