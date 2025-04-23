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
import SalesDashboardPage from "./dashboard/SalesDashboardPage.js";
import SellerDashboard from './sellerDashboard/SellerDashboard';
import SellerProducts from './pages/SellerProducts';
import SellerOrders from './pages/SellerOrders';
import SellerClients from './pages/SellerClients';
import SellerAnalytics from './pages/SellerAnalytics';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public pages with Navbar */}
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
          path="/recommended-products"
          element={
            <>
              <Navbar />
              <RecommendedProducts />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/select-role" element={<RoleSelection />} />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="charts" element={<SalesDashboardPage />} />
        </Route>
        </Route>

        {/* User Dashboard with nested routes */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/user-dashboard" element={<UserDashboardHome />}>
          <Route index element={<UserOverview />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="wishlist" element={<UserWishlist />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
        </Route>
        
        {/* vendeur Dashboard with nested routes */}
        <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
      
        <Route path="/seller" element={<SellerDashboard />}>
          <Route path="products" element={<SellerProducts />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="clients" element={<SellerClients />} />
          <Route path="analytics" element={<SellerAnalytics />} />
        </Route>
        </Route>
      </Routes>
    </Router>
    
  );
};

export default App;
