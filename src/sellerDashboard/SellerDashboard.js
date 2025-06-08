import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/SellerDashboard.css';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    if (storedUser?._id || storedUser?.id) {
      fetchDashboardData(storedUser._id || storedUser.id);
    }
  }, []);

  const fetchDashboardData = async (userId) => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/orders/seller/${userId}`),
        axios.get('http://localhost:5000/api/products')
      ]);

      const sellerProducts = productsRes.data.filter(p => p.userId === userId);

      setOrders(ordersRes.data);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard vendeur:', error);
    }
  };

  const getTotalRevenue = () => {
    return orders.reduce((acc, order) => acc + order.total, 0).toFixed(2);
  };

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord vendeur</h1>
        <div className="top-actions">
          <button className="notification-btn">🔔 Notifications</button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="card">
          <p>Revenu Total</p>
          <h2>{getTotalRevenue()} </h2>
          <span className="up">↑ 12.5% 30 derniers jours</span> {/* Plus tard rendre ça dynamique */}
        </div>
        <div className="card">
          <p>Commandes</p>
          <h2>{orders.length}</h2>
          <span className="up">↑ 8.2% 7 derniers jours</span>
        </div>
        <div className="card">
          <p>Produits Actifs</p>
          <h2>{products.length}</h2>
          <span className="stock">En stock</span>
        </div>
        <div className="card">
          <p>Avis Clients</p>
          <h2>4.8</h2> {/* Tu peux plus tard le calculer depuis une vraie table de reviews */}
          <span className="up">↑ 0.3% Note moyenne</span>
        </div>
      </div>

      {/* Menu de navigation */}
      <nav className="seller-nav">
        <NavLink to="products">Produits</NavLink>
        <NavLink to="orders">Commandes</NavLink>
      </nav>

      {/* Zone dynamique */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboard;
