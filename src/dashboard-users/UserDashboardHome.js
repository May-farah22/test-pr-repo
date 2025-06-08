// pages/UserDashboardHome.jsx
import React, { useState , useEffect } from 'react';
import '../styles/UserDashboardHome.css';
import Navbar from '../components/Navbar';
import UserProfile from '../dashboard-users/UserProfile';
import RoutineModal from '../dashboard-users/RoutineModal';
import SkinProfileModal from '../dashboard-users/SkinProfileModal';
import ChatPopup from '../dashboard-users/ChatPopup';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

const UserDashboardHome = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const img = storedUser.avatar;
  const navigate = useNavigate();
  const [showSkinModal, setShowSkinModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
const [profile, setProfile] = useState(null);
  const [routineCompleted, setRoutineCompleted] = useState(false);
  const handleRoutineComplete = () => {
    console.log("Routine terminée !");
  };
  const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/client/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Failed to fetch profile');
    const data = await res.json();
    setProfile(data);
  } catch (error) {
    console.error("❌ Error fetching skin profile:", error);
  }
};
 useEffect(() => {
  
    

    fetchProfile();
  }, []);

  const userName = storedUser?.name || 'Utilisateur';
  const avatarUrl = `http://localhost:5000/uploads/${img}`;

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
            <button
              className="edit-btn"
              onClick={() => setShowMessages(true)}
              style={{ marginLeft: '10px' }}
            >
              💬 Messages
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
        {profile ? (
          <>
            <p>
              <strong>Type de peau :</strong>{' '}
              <span className="tag">{profile.skinType}</span>
            </p>
            <p>
              <strong>Préoccupations :</strong>
            </p>
            <div className="tags">
              {profile.concerns?.map((c, i) => (
                <span key={i} className="tag">{c}</span>
              ))}
            </div>
            <p>
              <strong>Sensibilité :</strong>{' '}
              <span className="bold">{profile.sensitivity || 'N/A'}</span>
            </p>
            <p className="update-text">
              Dernière mise à jour :{' '}
              {new Date(profile.updatedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}{' '}
              <span className="update-link" onClick={() => setShowSkinModal(true)}>
                Modifier
              </span>
            </p>
          </>
        ) : (
          <p>Chargement du profil...</p>
        )}
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
          <li className="done"><span className="icon">✔</span> Nettoyage</li>
          <li className="done"><span className="icon">✔</span> Tonique</li>
          <li className="done"><span className="icon">✔</span> Traitement</li>
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
          {routineCompleted
            ? 'Routine terminée'
            : 'Terminer la routine d’aujourd’hui'}
        </button>
      </div>
    </div>
  
      </div>

      {/* Modals */}
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

      {showSkinModal && (
        <SkinProfileModal onClose={() => setShowSkinModal(false)} />
      )}

      {/* Chat Pop-up */}
      {showMessages && (
        <ChatPopup user={storedUser} onClose={() => setShowMessages(false)} />
      )}
    </>
  );
};

export default UserDashboardHome;
