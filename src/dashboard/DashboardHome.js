import React from 'react';
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
          <div
            className={`stat-change ${change.isPositive ? "positive" : "negative"}`}
          >
            {change.isPositive ? "↑" : "↓"} {change.value} vs previous month
          </div>
        )}
        {subtext && !change && <div className="stat-subtext">{subtext}</div>}
      </div>
    </div>
  );
};
const DashboardHome = () => {
  const orders = [
    { id: '#1023', customer: 'Amel K.', date: '12 Apr 2025', total: '$59.99', status: 'Shipped' },
    { id: '#1022', customer: 'Youssef B.', date: '11 Apr 2025', total: '$120.00', status: 'Pending' },
    { id: '#1021', customer: 'Safe M.', date: '10 Apr 2025', total: '$89.50', status: 'Delivered' },
    { id: '#1023', customer: 'Farah B.', date: '12 sep 2025', total: '$59.99', status: 'Shipped' },
    { id: '#1022', customer: 'Amir B.', date: '1 Apr 2025', total: '$120.00', status: 'Pending' },
    { id: '#1021', customer: 'Salma M.', date: '20 mai 2025', total: '$89.50', status: 'Delivered' },
  ];

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
      <button className="btn-filled">Add Product</button>
    </div>
    </div>
    

    <div className="stats-grid">
  <StatCard
    label="Total Revenue"
    value="$89,421.63"
    icon="💲"
    iconBg="#f0f4ff"
    change={{ value: "12.5%", isPositive: true }}
  />
  <StatCard
    label="Orders"
    value="1,832"
    icon="🛒"
    iconBg="#f3f7ff"
    change={{ value: "8.2%", isPositive: true }}
  />
  <StatCard
    label="Customers"
    value="4,591"
    icon="👥"
    iconBg="#e6f6f3"
    subtext="Total registered users"
  />
  <StatCard
    label="Products"
    value="312"
    icon="📦"
    iconBg="#fff7e6"
    subtext="Active products"
  />
</div>

        <div className="chart-card">
        <SalesDashboardPage />
      </div>



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
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
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
