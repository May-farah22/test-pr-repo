import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import '../styles/Charts.css';

const revenueData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 9500 },
  { name: 'Mar', revenue: 15500 },
  { name: 'Apr', revenue: 18000 },
  { name: 'May', revenue: 14000 },
  { name: 'Jun', revenue: 20000 },
];

const categoryData = [
  { name: 'Skincare', value: 340 },
  { name: 'Handcare', value: 250 },
  { name: 'Haircare', value: 200 },
  { name: 'Body Care', value: 150 },
  { name: 'Fragrance', value: 100 },
];

const COLORS = ['#a78bfa', '#fcd34d', '#c4b5fd', '#bae6fd', '#fda4af'];

const SalesDashboardPage = () => {
  return (
    <div className="chart-page">
      <div className="chart-grid">
        <div className="chart-card">
          <h2>Sales Revenue</h2>
          <p>Monthly sales revenue overview</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="revenue" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Sales by Category</h2>
          <p>Product category distribution</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardPage;
