import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier que les champs ne sont pas vides
    if (!fullName || !email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Simuler l'inscription en stockant les infos
    localStorage.setItem("user", JSON.stringify({ fullName, email }));

    // Rediriger vers le formulaire après l'inscription
    navigate("/skin-type-form");
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom complet"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
