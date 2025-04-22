import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet /> {/* C’est ici que les sous-pages s’affichent dynamiquement */}
      </div>
    </div>
  );
};

export default DashboardLayout;
