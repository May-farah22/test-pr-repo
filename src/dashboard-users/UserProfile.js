import React, { useState } from "react";
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Farah Mariem Boussaadia",
    email: "farah@example.com",
    phone: "+1234567890",
    address: "123 Rue Exemple, Paris",
    profilePic: "/images/default-profile.jpg", // Remplacer par une image par défaut ou personnalisée
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleChangeProfilePic = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser({ ...user, profilePic: URL.createObjectURL(file) });
    }
  };

  const handleSubmitProfile = (event) => {
    event.preventDefault();
    // Logic to save the updated profile
    setIsEditing(false);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    // Logic to change the password
    alert("Mot de passe changé avec succès.");
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>Mon Profil</h2>
        <button className="edit-profile-btn" onClick={handleEditProfile}>
          {isEditing ? "Annuler" : "Modifier le Profil"}
        </button>
      </div>

      <div className="profile-details">
        <div className="profile-pic">
          <img src={user.profilePic} alt="Profile" />
          <input type="file" onChange={handleChangeProfilePic} />
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmitProfile}>
            <div className="profile-info">
              <div className="info-item">
                <h3>Nom:</h3>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="info-item">
                <h3>Email:</h3>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="info-item">
                <h3>Téléphone:</h3>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
              <div className="info-item">
                <h3>Adresse:</h3>
                <input
                  type="text"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="save-profile-btn">
              Enregistrer les modifications
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-item">
              <h3>Nom:</h3>
              <p>{user.name}</p>
            </div>
            <div className="info-item">
              <h3>Email:</h3>
              <p>{user.email}</p>
            </div>
            <div className="info-item">
              <h3>Téléphone:</h3>
              <p>{user.phone}</p>
            </div>
            <div className="info-item">
              <h3>Adresse:</h3>
              <p>{user.address}</p>
            </div>
          </div>
        )}
      </div>

      <div className="profile-settings">
        <h3>Paramètres de sécurité</h3>
        <form onSubmit={handleChangePassword}>
          <div className="info-item">
            <label htmlFor="new-password">Nouveau mot de passe:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="info-item">
            <label htmlFor="confirm-password">Confirmer le mot de passe:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="change-password-btn">
            Changer le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
