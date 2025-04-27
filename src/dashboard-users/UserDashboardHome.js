import React, { useState } from 'react';
import '../styles/UserDashboardHome.css';
import Navbar from '../components/Navbar';
import UserProfile from '../dashboard-users/UserProfile'; // ✅ Import du composant
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiSettings } from "react-icons/fi";
import { FaShoppingBag, FaHeart, FaBox, FaUser } from "react-icons/fa";

const UserDashboardHome = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const userName = storedUser?.name || "User";
  const avatarUrl = storedUser?.avatar?.startsWith('http')
    ? storedUser.avatar
    : `http://localhost:5000/${storedUser?.avatar}`;

  const [showProfile, setShowProfile] = useState(false); // ✅ État pour afficher le profil

  return (
    <>
      <Navbar />

      <div className="dashboard-wrapper">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <img src={avatarUrl} alt="User Avatar" className="avatar" />
            <div>
              <h2>{userName}</h2>
              <p>Member since {new Date(storedUser?.joined).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="support-btn">
              <FiMessageSquare size={18} /> Support
            </button>
            <button className="edit-btn" onClick={() => setShowProfile(true)}>
              <FiSettings size={18} /> Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-box">
          <NavLink to="/user-dashboard" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>Overview</NavLink>
          <NavLink to="/user-dashboard/orders" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>Orders</NavLink>
          <NavLink to="/user-dashboard/wishlist" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>Wishlist</NavLink>
        </div>

        <Outlet />

        {/* Main Cards */}
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

      {/* Product section */}
      <section className="product-section">
        <div className="section-header">
          <h2>Your Perfect Match</h2>
          <div className="tabs">
            <button className="tab active">Recommended</button>
            <button className="tab">Popular</button>
            <button className="tab">New Arrivals</button>
          </div>
          <button className="view-all">View All</button>
        </div>

        <div className="product-grid">
          <div className="product-card">
            <span className="badge new">NEW</span>
            <img src="https://via.placeholder.com/200x200" alt="Hydrating Facial Serum" className="product-img" />
            <div className="product-info">
              <p className="brand">GLOWESSENCE</p>
              <h4 className="product-title">Hydrating Facial Serum</h4>
              <p className="category">Facial Serums</p>
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="reviews">(124)</span>
              </div>
              <div className="price-row">
                <span className="price">$39.99</span>
                <button className="add-btn">🛒 Add</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Pop-up profil affiché conditionnellement */}
      {showProfile && (
        <UserProfile 
          onClose={() => setShowProfile(false)}
          onQuitToDashboard={() => navigate('/user-dashboard')}
        />
      )}
    </>
  );
};

export default UserDashboardHome;
