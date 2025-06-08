import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import '../styles/Charts.css';

const revenueData = [
  { name: 'Janvier', revenue: 1200 },
  { name: 'Fevrier', revenue: 9500 },
  { name: 'Mars', revenue: 1550},
  { name: 'Avril', revenue: 1800 },
  { name: 'May', revenue: 1400 },
  { name: 'Juin', revenue: 2000 },
];

const categoryData = [
  { name: 'Skincare', value: 340 },
  { name: 'Handcare', value: 250 },
  { name: 'Eyecare', value: 200 },
  { name: 'Body Care', value: 150 },
  { name: 'Fragrance', value: 100 },
];

const COLORS = ['#a78bfa', '#fcd34d', '#c4b5fd', '#bae6fd', '#fda4af'];

const SalesDashboardPage = () => {
  return (
    <div className="chart-page">
      <div className="chart-grid">
        <div className="chart-card">
          <h2>Chiffre d'affaires</h2>
          <p>Aperçu du chiffre d'affaires mensuel</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}`} />
              <Tooltip formatter={(value) => `${value}`} />
              <Bar dataKey="revenue" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Ventes par catégorie</h2>
          <p>Répartition des catégories de produits</p>
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
