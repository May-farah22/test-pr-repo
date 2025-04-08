import React from "react";
import '../styles/UserDashboardHome.css'; // Assurez-vous d'ajouter le fichier CSS pour le style

const UserDashboardHome = () => {
  return (
    <div className="user-dashboard-home">
      <div className="user-dashboard-welcome">
        <h2>Bienvenue sur votre tableau de bord, [Nom Utilisateur]!</h2>
        <p>Voici un aperçu rapide de vos informations et commandes sur GlowCare.</p>
      </div>
      
      <div className="user-dashboard-stats">
        <div className="stat-box">
          <h3>Commandes</h3>
          <p>120</p>
        </div>
        <div className="stat-box">
          <h3>Produits Favoris</h3>
          <p>8</p>
        </div>
        <div className="stat-box">
          <h3>Revenus Dépensés</h3>
          <p>2,500€</p>
        </div>
        <div className="stat-box">
          <h3>Notifications</h3>
          <p>3</p>
        </div>
      </div>
      
      <div className="user-dashboard-recent-activity">
        <h3>Activités récentes</h3>
        <ul>
          <li>Commande #1234 reçue</li>
          <li>Produit "Crème hydratante" ajouté à vos favoris</li>
          <li>Nouvelle notification reçue</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboardHome;
