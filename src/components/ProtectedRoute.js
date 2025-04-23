// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("storedUser",storedUser);
console.log("storedUser.role)",storedUser.role);

  if (!storedUser) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(storedUser.role)) return <Navigate to="/not-authorized" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
