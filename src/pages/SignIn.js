import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import'../styles/SignIn.css';
const SignIn = () => {
// eslint-disable-next-line no-unused-vars
const [email, setEmail] = useState("");
// eslint-disable-next-line no-unused-vars
const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'authentification
    localStorage.setItem("isAuthenticated", "true");

    // Rediriger vers le formulaire après connexion
    navigate("/skin-type-form");
    };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default SignIn;
