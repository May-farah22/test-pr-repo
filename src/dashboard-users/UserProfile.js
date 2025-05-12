import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import axios from 'axios';

const ProfilUtilisateur = ({ onClose, onQuitToDashboard }) => {
  const [utilisateur, setUtilisateur] = useState({
    uid: '',
    avatar: '',
    name: '',
    email: '',
    memberSince: '',
    password: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const stored = JSON.parse(localStorage.getItem('user'));
  const img = stored.avatar;
  const avatarUrl =  `http://localhost:5000/uploads/${img}`;

console.log('stored',stored.avatar);
  useEffect(() => {
    if (stored) {
      setUser({
        uid: stored.id,
        name: stored.name,
        email: stored.email,
        avatar: stored.avatar || '',
        memberSince: new Date(stored.joined).toLocaleDateString(),
        password: '',
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUtilisateur((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFichierAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUtilisateur((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stocké = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();

    if (utilisateur.name) {
      formData.append('nom', utilisateur.name);
    }
    if (utilisateur.email) {
      formData.append('email', utilisateur.email);
    }
    if (utilisateur.password) {
      formData.append('password', utilisateur.password);
    }
    if (fichierAvatar) {
      formData.append('image', fichierAvatar);
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/${stocké.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
     
       
  
      const updatedUser = {
        ...stored,
        name: user.name,
        email: user.email,
        avatar:res.data.photo
      };
      localStorage.setItem('user', JSON.stringify(utilisateurMisAJour));
      setUtilisateur((prev) => ({ ...prev, password: '' }));
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
                src={urlAvatar}
                alt="Avatar utilisateur"
                className="avatar-new"
              />
              <label className="avatar-upload-btn-new">
                <input type="file" onChange={handleAvatarChange} accept="image/*" />
                <span>Changer la photo</span>
              </label>
            </div>

            <div className="user-info-new">
              <h2>{utilisateur.name}</h2>
              <p className="email-new">{utilisateur.email}</p>
              <p className="member-since-new">Membre depuis le {utilisateur.memberSince}</p>
            </div>
          </div>

          <form className="profile-form-new" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-section-new">
              <h3>Informations du profil</h3>

              <div className="form-group-new">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={utilisateur.name}
                  onChange={handleInputChange}
                  placeholder="Entrez votre nom complet"
                  required
                />
              </div>

              <div className="form-group-new">
                <label>Adresse email</label>
                <input
                  type="email"
                  name="email"
                  value={utilisateur.email}
                  onChange={handleInputChange}
                  placeholder="Entrez votre adresse email"
                  required
                />
              </div>
            </div>

            <div className="form-section-new">
              <h3>Sécurité</h3>

              <div className="form-group-new">
                <label>Changer le mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={utilisateur.password}
                  onChange={handleInputChange}
                  placeholder="Entrez un nouveau mot de passe"
                />
              </div>
            </div>

            <div className="form-actions-new">
              <button type="submit" className="save-btn-new">Enregistrer les modifications</button>
              <button type="button" className="cancel-btn-new" onClick={onClose}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilUtilisateur;
