import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Erreur de connexion");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin" || data.user.role === "super-admin")
        navigate("/dashboard");
      else if (data.user.role === "user") navigate("/user-dashboard");
      else if (data.user.role === "seller") navigate("/seller");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="input-with-icon">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default SignIn;
