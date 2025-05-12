// pages/UserDashboardHome.jsx
import React, { useState } from 'react';
import '../styles/UserDashboardHome.css';
import Navbar from '../components/Navbar';
import UserProfile from '../dashboard-users/UserProfile';
import RoutineModal from '../dashboard-users/RoutineModal';
import SkinProfileModal from '../dashboard-users/SkinProfileModal';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { FaShoppingBag, FaHeart, FaBox, FaUser } from 'react-icons/fa';

const UserDashboardHome = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const img = storedUser.avatar;
  const navigate = useNavigate();
  const [showSkinModal, setShowSkinModal] = useState(false);
  console.log('storedUser', storedUser)

  const handleRoutineComplete = () => {
    console.log("Routine terminée !");
  };

  console.log('img', img)
  const userName = storedUser?.name || 'Utilisateur';
  const avatarUrl = `http://localhost:5000/uploads/${img}`;

  const [showProfile, setShowProfile] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [routineCompleted] = useState(false);

  return (
    <>
      <Navbar />

      <div className="dashboard-wrapper">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <img src={avatarUrl} alt="Avatar utilisateur" className="avatar" />
            <div>
              <h2>{userName}</h2>
              <p>
                Membre depuis{' '}
                {new Date(storedUser?.joined).toLocaleString('fr-FR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="edit-btn" onClick={() => setShowProfile(true)}>
              <FiSettings size={18} /> Profil
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-box">
          <NavLink
            to="/user-dashboard"
            className={({ isActive }) => (isActive ? 'tab-btn active' : 'tab-btn')}
          >
            Vue d'ensemble
          </NavLink>
          <NavLink
            to="/user-dashboard/orders"
            className={({ isActive }) => (isActive ? 'tab-btn active' : 'tab-btn')}
          >
            Commandes
          </NavLink>
          <NavLink
            to="/user-dashboard/wishlist"
            className={({ isActive }) => (isActive ? 'tab-btn active' : 'tab-btn')}
          >
            Liste de souhaits
          </NavLink>
        </div>

        <Outlet />

        {/* Main Cards */}
        <div className="dashboard-cards">
          {/* Skin Profile */}
          <div className="card">
            <h3>Votre profil de peau</h3>
            <p>
              <strong>Type de peau :</strong> <span className="tag">Mixte</span>
            </p>
            <p>
              <strong>Préoccupations :</strong>
            </p>
            <div className="tags">
              <span className="tag">Déshydratation</span>
              <span className="tag">Éruptions occasionnelles</span>
              <span className="tag">Ridules</span>
            </div>
            <p>
              <strong>Sensibilité :</strong> <span className="bold">Modérée</span>
            </p>
            <p className="update-text">
              Dernière mise à jour : 15 mars 2025{' '}
              <span className="update-link" onClick={() => setShowSkinModal(true)}>Modifier</span>
            </p>
          </div>

          {/* Skincare Routine */}
          <div className="card skincare-card">
            <h3>Routine de soin</h3>

            <div className="routine-header">
              <span>Progression quotidienne</span>
              <span className="bold">{routineCompleted ? '100%' : '75%'}</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: routineCompleted ? '100%' : '75%' }}
              ></div>
            </div>

            <ul className="routine-list">
              <li className="done">
                <span className="icon">✔</span> Nettoyage
              </li>
              <li className="done">
                <span className="icon">✔</span> Tonique
              </li>
              <li className="done">
                <span className="icon">✔</span> Traitement
              </li>
              <li className={routineCompleted ? 'done' : 'pending'}>
                <span className="icon">{routineCompleted ? '✔' : '○'}</span> Hydratation
              </li>
              <li className={routineCompleted ? 'done' : 'pending'}>
                <span className="icon">{routineCompleted ? '✔' : '○'}</span> Écran solaire
              </li>
            </ul>

            <button
              className="routine-btn btn btn-primary"
              onClick={() => setShowRoutineModal(true)}
              disabled={routineCompleted}
            >
              {routineCompleted ? "Routine terminée" : "Terminer la routine d’aujourd’hui"}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3>Actions rapides</h3>
            <div className="actions-grid">
              <div className="action-box">
                <FaShoppingBag size={20} /> <br />
                Boutique
                <br />
                <small>Parcourir les produits</small>
              </div>
              <div className="action-box">
                <FaHeart size={20} /> <br />
                Favoris
                <br />
                <small>Voir les articles enregistrés</small>
              </div>
              <div className="action-box">
                <FaBox size={20} /> <br />
                Commandes
                <br />
                <small>Suivre les colis</small>
              </div>
              <div className="action-box">
                <FaUser size={20} /> <br />
                Profil
                <br />
                <small>Mettre à jour les informations</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show User Profile */}
      {showProfile && (
        <UserProfile
          onClose={() => setShowProfile(false)}
          onQuitToDashboard={() => navigate('/user-dashboard')}
        />
      )}

      <RoutineModal
        show={showRoutineModal}
        onClose={() => setShowRoutineModal(false)}
        onComplete={handleRoutineComplete}
      />
      {showSkinModal && <SkinProfileModal onClose={() => setShowSkinModal(false)} />}
    </>
  );
};

export default UserDashboardHome;
