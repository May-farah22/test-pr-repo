import React, { useState } from 'react';
import '../styles/Profile.css';

const UserProfile = ({ onClose, onQuitToDashboard }) => {
  const [user, setUser] = useState({
    avatar: '',
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 2023',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving user info:', user);
    onClose(); // Fermer le pop-up après sauvegarde
  };

  // Fonction pour gérer le retour au dashboard
  const handleQuit = () => {
    if (onQuitToDashboard) {
      onQuitToDashboard(); // Utilise la prop spécifique si elle existe
    } else {
      onClose(); // Fallback à onClose si onQuitToDashboard n'existe pas
    }
  };

  return (
    <div className="profile-popup-overlay-new">
      <div className="profile-popup-container-new">
        <div className="user-profile-card-new">
          <button className="close-btn-new" onClick={handleQuit}>
            &times;
          </button>

          <div className="profile-header-new">
            <div className="avatar-container-new">
              <img 
                src={user.avatar || 'https://via.placeholder.com/150'} 
                alt="User Avatar" 
                className="avatar-new"
              />
              <label className="avatar-upload-btn-new">
                <input type="file" onChange={handleAvatarChange} accept="image/*" />
                <span>Change Photo</span>
              </label>
            </div>
            
            <div className="user-info-new">
              <h2>{user.name}</h2>
              <p className="email-new">{user.email}</p>
              <p className="member-since-new">Member since {user.memberSince}</p>
            </div>
          </div>

          <form className="profile-form-new" onSubmit={handleSubmit}>
            <div className="form-section-new">
              <h3>Profile Information</h3>
              
              <div className="form-group-new">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={user.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter your full name"
                  required 
                />
              </div>

              <div className="form-group-new">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={user.email} 
                  onChange={handleInputChange} 
                  placeholder="Enter your email"
                  required 
                />
              </div>
            </div>

            <div className="form-section-new">
              <h3>Security</h3>
              
              <div className="form-group-new">
                <label>Change Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={user.password} 
                  onChange={handleInputChange} 
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="form-actions-new">
              <button type="submit" className="save-btn-new">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;