import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const role = new URLSearchParams(location.search).get("role") || "user";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fullName || !email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          role, // ensure role is correctly defined
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle the case where the user already exists
        alert(data.msg || "Utilisateur déjà existe");
        return;
      }
  
      // Make sure data.user exists before trying to store it
      if (data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Assuming this is your next page after registration
      } else {
        alert("Erreur: Aucune donnée utilisateur reçue.");
      }
      if (data.user.role === 'admin') navigate('/dashboard');
      else if (data.user.role === "user") navigate('/user-dashboard');
      else if (data.user.role === 'seller') navigate('/seller');
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur serveur");
    }
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
