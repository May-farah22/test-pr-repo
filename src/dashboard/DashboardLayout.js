import React from 'react';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <DashboardHome />
      </div>
    </div>
  );
};

export default DashboardLayout;
