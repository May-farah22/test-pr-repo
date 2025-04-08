import React from "react";

const RecommendedProducts = () => {
  const userPreferences = JSON.parse(localStorage.getItem("userPreferences"));

  return (
    <div className="recommended-container">
      <h2>Produits recommandés pour vous</h2>
      {userPreferences ? (
        <p>
          Nous avons trouvé des produits pour une peau <strong>{userPreferences.skinType}</strong> et qui a besoin de <strong>{userPreferences.concern}</strong>.
        </p>
      ) : (
        <p>Veuillez remplir le formulaire pour voir vos recommandations.</p>
      )}
    </div>
  );
};

export default RecommendedProducts;
