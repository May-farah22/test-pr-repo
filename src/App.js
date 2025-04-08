import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import About from "./components/About";
import Contact from "./components/Contact";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import Products from "./dashboard/Products";
import Orders from "./dashboard/Orders";
import Users from "./dashboard/Users";
import UserDashboardLayout from "./dashboard-users/UserDashboardLayout";
import UserDashboardHome from "./dashboard-users/UserDashboardHome";
import UserProfile from "./dashboard-users/UserProfile";
import UserOrders from "./dashboard-users/UserOrders";
import UserSettings from "./dashboard-users/UserSettings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SkinTypeForm from "./pages/SkinTypeForm";
import RecommendedProducts from "./pages/RecommendedProducts";
import ProductDetails from "./pages/ProductDetail.js"; // Crée ce fichier


const App = () => {
  return (
    <Router>
      <Routes>
      <Route
  path="/signin"
  element={
    <>
      <Navbar />
      <SignIn />
    </>
  }
/>
<Route
  path="/signup"
  element={
    <>
      <Navbar />
      <SignUp />
    </>
  }
/>
<Route
  path="/skin-type-form"
  element={
    <>
      <Navbar />
      <SkinTypeForm />
    </>
  }
/>
<Route 
path="/shop" 
element={
  <>
  <Navbar/>
<Shop />
</>
}
/>
<Route
  path="/recommended-products"
  element={
    <>
      <Navbar />
      <RecommendedProducts />
    </>
  }
/>


        {/* Navbar seulement pour les pages publiques */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Navbar />
              <Shop />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
            
          }
        />
     <Route path="/product/:id" element={<ProductDetails />} />

        {/* Dashboard sans Navbar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/user-dashboard" element={<UserDashboardLayout />}>
          <Route index element={<UserDashboardHome />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
