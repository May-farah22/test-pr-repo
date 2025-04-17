import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Shop from "./components/Shop";
import About from "./components/About";
import Contact from "./components/Contact";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import Products from "./dashboard/Products";
import Orders from "./dashboard/Orders";
import Users from "./dashboard/Users";
import UserDashboardHome from "./dashboard-users/UserDashboardHome";
import UserOrders from "./dashboard-users/UserOrders";
import UserSettings from "./dashboard-users/UserSettings";
import UserWishlist from "./dashboard-users/UserWishlist.js";
import UserOverview from "./dashboard-users/UserOverview.js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SkinTypeForm from "./pages/SkinTypeForm";
import RecommendedProducts from "./pages/RecommendedProducts";
import ProductDetails from "./pages/ProductDetail.js"; 
import RoleSelection from './pages/RoleSelection';
import SalesDashboardPage from './dashboard/SalesDashboardPage';

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
 path="/select-role" 
 element=
 {<RoleSelection />} />
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



<Route path="/dashboard/charts" element={<SalesDashboardPage />} />

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

        <Route path="/user-dashboard" element={<UserDashboardHome />} />
        <Route path="/user-dashboard/orders" element={<UserOrders />} />
        <Route path="/user-dashboard" element={<UserOverview />} />
        <Route path="/user-dashboard/wishlist" element={<UserWishlist />} />
        <Route path="/user-dashboard/settings" element={<UserSettings />} />
        
                
      </Routes>
    </Router>
  );
};

export default App;
