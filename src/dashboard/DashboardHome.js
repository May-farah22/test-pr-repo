import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import SalesDashboardPage from './SalesDashboardPage';

// Carte statistique (StatCard)
const StatCard = ({ label, value, icon, iconBg, subtext, change }) => {
  return (
    <div className="stat-card-new">
      <div className="icon-wrapper" style={{ backgroundColor: iconBg }}>
        <span className="icon">{icon}</span>
      </div>
      <div className="stat-text">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {change && (
          <div className={`stat-change ${change.isPositive ? "positive" : "negative"}`}>
            {change.isPositive ? "↑" : "↓"} {change.value} par rapport au mois précédent
          </div>
        )}
        {subtext && !change && <div className="stat-subtext">{subtext}</div>}
      </div>
    </div>
  );
};

// Composant principal du tableau de bord
const DashboardHome = () => {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);

  // Charger les statistiques et les commandes depuis l’API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersRes = await axios.get('http://localhost:5000/api/orders');
        const userRes = await axios.get('http://localhost:5000/api/users');
        const productRes = await axios.get('http://localhost:5000/api/products');

        const totalRevenue = ordersRes.data.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = ordersRes.data.length;
        const totalProducts = productRes.data.length;
        const totalUsers = userRes.data.length;
        setOrders(ordersRes.data);

        setStats([
          {
            label: "Revenue total",
            value: `${totalRevenue.toFixed(2)}DT`,
            icon: "DT",
            iconBg: "#f0f4ff",
            change: { value: "12.5%", isPositive: true },
          },
          {
            label: "Commandes",
            value: `${totalOrders}`,
            icon: "🛒",
            iconBg: "#f3f7ff",
            change: { value: "8.2%", isPositive: true },
          },
          {
            label: "Clients",
            value: `${totalUsers}`,
            icon: "👥",
            iconBg: "#e6f6f3",
            subtext: "Utilisateurs enregistrés",
          },
          {
            label: "Produits",
            value: `${totalProducts}`,
            icon: "📦",
            iconBg: "#fff7e6",
            subtext: "Produits actifs",
          }
        ]);

      } catch (error) {
        console.error("Erreur lors du chargement des données du tableau de bord :", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">

      {/* En-tête du tableau de bord */}
      <div className="dashboard-header">
        <div className="dashboard-header-text">
          <h1>Tableau de bord</h1>
          <p>Bienvenue dans votre tableau de bord administrateur</p>
        </div>
      </div>

      {/* Statistiques dynamiques */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconBg={stat.iconBg}
            subtext={stat.subtext}
            change={stat.change}
          />
        ))}
      </div>

      {/* Graphique des ventes */}
      <div className="chart-card">
        <SalesDashboardPage />
      </div>

      {/* Commandes récentes dynamiques */}
      <div className="orders-section">
  <h2 className="orders-title">Commandes récentes</h2>
  <table className="orders-table">
    <thead>
      <tr>
        <th>ID Commande</th>
        <th>Client</th>
        <th>Date</th>
        <th>Total</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      {orders.slice(0, 6).map((order, i) => {
        const statusClass = order.status ? order.status.trim().toLowerCase() : '';
        return (
          <tr key={i}>
            <td>#{order._id.slice(-4).toUpperCase()}</td>
            <td>{order.customer}</td>
            <td>{order.date}</td>
            <td>{order.total.toFixed(2)}DT</td>
            <td>
              <span className={`status ${statusClass}`}>
                {order.status}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default DashboardHome;
