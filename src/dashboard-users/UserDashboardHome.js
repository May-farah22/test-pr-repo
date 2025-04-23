import React from 'react';
import '../styles/UserDashboardHome.css';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';
import { FiMessageSquare, FiSettings } from "react-icons/fi";
import { FaShoppingBag, FaHeart, FaBox, FaUser } from "react-icons/fa";

const UserDashboardHome = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")); // ✅ Now it's an object
  const userName = storedUser?.name || "User";
  
  console.log("storedUser:", storedUser);
const avatarUrl = storedUser?.avatar?.startsWith('http')
  ? storedUser.avatar
  : `http://localhost:5000/${storedUser.avatar}`;
  return (
    <>
    <Navbar />

    <div className="dashboard-wrapper">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="avatar"
          />
          <div>
            <h2>{userName}</h2>
            <p>Member since {new Date(storedUser?.joined).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="profile-actions">
        <button className="support-btn">
          <FiMessageSquare size={18} /> Support
        </button>
        <button className="edit-btn">
          <FiSettings size={18} />  Profile
        </button>
      </div>
      </div>

      <div className="tabs-box">
  <NavLink to="/user-dashboard" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>Overview</NavLink>
  <NavLink to="/user-dashboard/orders" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>Orders</NavLink>
  <NavLink to="/user-dashboard/wishlist" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>Wishlist</NavLink>
  <NavLink to="/user-dashboard/settings" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>Settings</NavLink>
      </div>




      {/* Main Content */}
      <div className="dashboard-cards">
        {/* Skin Profile */}
        <div className="card">
          <h3>Your Skin Profile</h3>
          <p><strong>Skin Type:</strong> <span className="tag">Combination</span></p>
          <p><strong>Skin Concerns:</strong></p>
          <div className="tags">
            <span className="tag">Dehydration</span>
            <span className="tag">Occasional Breakouts</span>
            <span className="tag">Fine Lines</span>
          </div>
          <p><strong>Sensitivity:</strong> <span className="bold">Moderate</span></p>
          <p className="update-text">Last updated: March 15, 2025 <span className="update-link">Update</span></p>
        </div>

{/* Skincare Routine */}
<div className="card skincare-card">
  <h3>Skincare Routine</h3>

  <div className="routine-header">
    <span>Daily Progress</span>
    <span className="bold">75%</span>
  </div>

  <div className="progress-bar">
    <div className="progress" style={{ width: '75%' }}></div>
  </div>

  <ul className="routine-list">
    <li className="done"><span className="icon">✔</span> Cleansing</li>
    <li className="done"><span className="icon">✔</span> Toning</li>
    <li className="done"><span className="icon">✔</span> Treatment</li>
    <li className="pending"><span className="icon">○</span> Moisturizing</li>
    <li className="pending"><span className="icon">○</span> Sunscreen</li>
  </ul>

  <button className="routine-btn">Complete Today's Routine</button>
</div>


       {/* Quick Actions */}
<div className="card">
  <h3>Quick Actions</h3>
  <div className="actions-grid">
    <div className="action-box">
      <FaShoppingBag size={20} /> <br />
      Shop<br /><small>Browse products</small>
    </div>
    <div className="action-box">
      <FaHeart size={20} /> <br />
      Wishlist<br /><small>View saved items</small>
    </div>
    <div className="action-box">
      <FaBox size={20} /> <br />
      Orders<br /><small>Track packages</small>
    </div>
    <div className="action-box">
      <FaUser size={20} /> <br />
      Profile<br /><small>Update details</small>
    </div>
  </div>
        </div>
      </div>
    </div>
    <section class="product-section">
  <div class="section-header">
    <h2>Your Perfect Match</h2>
    <div class="tabs">
      <button class="tab active">Recommended</button>
      <button class="tab">Popular</button>
      <button class="tab">New Arrivals</button>
    </div>
    <button class="view-all">View All</button>
  </div>

  <div class="product-grid">
    <div class="product-card">
      <span class="badge new">NEW</span>
      <img src="https://via.placeholder.com/200x200" alt="Hydrating Facial Serum" class="product-img" />
      <div class="product-info">
        <p class="brand">GLOWESSENCE</p>
        <h4 class="product-title">Hydrating Facial Serum</h4>
        <p class="category">Facial Serums</p>
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="reviews">(124)</span>
        </div>
        <div class="price-row">
          <span class="price">$39.99</span>
          <button class="add-btn">🛒 Add</button>
        </div>
      </div>
    </div>
    
  </div>
</section>
    </>
  );
};

export default UserDashboardHome;
