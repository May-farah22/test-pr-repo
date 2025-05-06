import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import axios from 'axios';

const UserProfile = ({ onClose, onQuitToDashboard }) => {
  const [user, setUser] = useState({
    uid: '',
    avatar: '',
    name: '',
    email: '',
    memberSince: '',
    password: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const stored = JSON.parse(localStorage.getItem('user'));
  const img = localStorage.getItem('userPhoto');
  const avatarUrl =  `http://localhost:5000/uploads/${img}`;

console.log('stored',img);
  useEffect(() => {
    if (stored) {
      setUser({
        uid: stored.id,
        name: stored.name,
        email: stored.email,
        avatar: localStorage.getItem('userPhoto') || '',
        memberSince: new Date(stored.joined).toLocaleDateString(),
        password: '',
      });
    }
  }, []);

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
      setAvatarFile(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    if (user.name ) {
      formData.append('nom', user.name);
    }
  
    if (user.email ) {
      formData.append('email', user.email);
    }
  
    if (user.password ) {
      formData.append('password', user.password);
    }
  
    if (avatarFile) {
      formData.append('image', avatarFile);
    }
  
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/${stored.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
     
        localStorage.setItem('userPhoto',res.data.photo);
      console.log('avatarFile',res.data.photo)
  
      const updatedUser = {
        ...stored,
        name: user.name,
        email: user.email,
        avatar:res.data.photo
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser((prev) => ({ ...prev, password: '' }));
      alert('Profil mis à jour avec succès !');
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du profil");
    }
  };
  

  return (
    <div className="profile-popup-overlay-new">
      <div className="profile-popup-container-new">
        <div className="user-profile-card-new">
          <div className="profile-header-new">
            <div className="avatar-container-new">
              <img
                src={avatarUrl}
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

          <form className="profile-form-new" onSubmit={handleSubmit} encType="multipart/form-data">
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
              <button type="button" className="cancel-btn-new" onClick={onClose}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
