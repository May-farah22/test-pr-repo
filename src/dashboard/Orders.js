// Orders.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/order.css';


function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Ici tu peux faire une requête API pour récupérer les commandes
    const fetchOrders = async () => {
      const response = await fetch('/api/orders'); // Remplace par ton API réelle
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Gestion des commandes</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID de commande</th>
            <th>Client</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>{order.status}</td>
              <td>
                <Link to={`/orders/${order.id}`} className="btn-view">
                  Voir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
