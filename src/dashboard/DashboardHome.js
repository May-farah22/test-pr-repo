import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import SalesDashboardPage from './SalesDashboardPage';

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
            {change.isPositive ? "↑" : "↓"} {change.value} vs previous month
          </div>
        )}
        {subtext && !change && <div className="stat-subtext">{subtext}</div>}
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);

  // Charger les stats et les commandes depuis l'API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Appels API pour récupérer les données dynamiques
        const ordersRes = await axios.get('http://localhost:5000/api/orders');
        
        const productRes =await axios.get('http://localhost:5000/api/products');
        
        // Calcul dynamique des stats :
        const totalRevenue = ordersRes.data.reduce((sum, order) => sum + order.total, 0);
        const customersSet = new Set(ordersRes.data.map(order => order.customer));
        const totalOrders = ordersRes.data.length;
        const totalProducts = productRes.data.length; // ⚠️ Ici tu peux faire une autre API pour compter les produits

        setOrders(ordersRes.data);

        setStats([
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: "💲",
            iconBg: "#f0f4ff",
            change: { value: "12.5%", isPositive: true },
          },
          {
            label: "Orders",
            value: `${totalOrders}`,
            icon: "🛒",
            iconBg: "#f3f7ff",
            change: { value: "8.2%", isPositive: true },
          },
          {
            label: "Customers",
            value: `${customersSet.size}`,
            icon: "👥",
            iconBg: "#e6f6f3",
            subtext: "Total registered users",
          },
          {
            label: "Products",
            value: `${totalProducts}`,
            icon: "📦",
            iconBg: "#fff7e6",
            subtext: "Active products",
          }
        ]);

      } catch (error) {
        console.error("Erreur lors du chargement des données du dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      
      {/* Nouveau Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-text">
          <h1>Dashboard</h1>
          <p>Welcome back to your admin dashboard</p>
        </div>
        <div className="dashboard-header-buttons">
          <button className="btn-outline">Download Report</button>
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

      {/* Graphique de ventes */}
      <div className="chart-card">
        <SalesDashboardPage />
      </div>

      {/* Commandes récentes dynamiques */}
      <div className="orders-section">
        <h2 className="orders-title">Recent Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 6).map((order, i) => ( // ⚡ Juste les 6 derniers
              <tr key={i}>
                <td>#{order._id.slice(-4).toUpperCase()}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DashboardHome;
