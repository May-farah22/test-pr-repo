import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SkinTypeForm.css";

const SkinTypeForm = () => {
  const [formData, setFormData] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    skinType: "Peau mixte",
    concerns: ["Acné"],
    message: "J'aimerais améliorer ma routine de soin.",
  });

  const [isEditing, setIsEditing] = useState(false);

  const skinTypes = ["Peau sèche", "Peau grasse", "Peau mixte", "Peau sensible"];
  const concernsList = ["Acné", "Taches", "Rides", "Déshydratation"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        concerns: checked
          ? [...prev.concerns, value]
          : prev.concerns.filter((concern) => concern !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulaire soumis avec succès !");
  };

  const handleUpdate = () => {
    if (isEditing) {
      alert("Modifications enregistrées !");
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="container skin-form-container">
      <h2 className="text-center skin-form-title">Déterminez votre type de peau</h2>
      <form onSubmit={handleSubmit}>

        {/* Nom */}
        <div className="mb-3">
          <label className="form-label skin-form-label">Nom</label>
          <input
            type="text"
            name="name"
            className="form-control skin-form-input"
            placeholder="Entrez votre nom"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label skin-form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control skin-form-input"
            placeholder="Entrez votre email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>

        {/* Type de peau */}
        <div className="mb-3">
          <label className="form-label skin-form-label">Type de peau</label>
          <select
            name="skinType"
            className="form-select skin-form-select"
            value={formData.skinType}
            onChange={handleChange}
            disabled={!isEditing}
            required
          >
            <option value="">Sélectionnez votre type de peau</option>
            {skinTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Préoccupations cutanées */}
        <div className="mb-3">
          <label className="form-label skin-form-label">Préoccupations</label>
          <div className="d-flex flex-wrap">
            {concernsList.map((concern, index) => (
              <div key={index} className="form-check me-3">
                <input
                  className="form-check-input skin-form-checkbox"
                  type="checkbox"
                  name="concerns"
                  value={concern}
                  id={`concern-${index}`}
                  checked={formData.concerns.includes(concern)}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <label className="form-check-label skin-form-checkbox-label" htmlFor={`concern-${index}`}>
                  {concern}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="form-label skin-form-label">Message</label>
          <textarea
            name="message"
            className="form-control skin-form-input"
            placeholder="Décrivez vos besoins..."
            rows="3"
            value={formData.message}
            onChange={handleChange}
            disabled={!isEditing}
          ></textarea>
        </div>

        {/* Boutons */}
        <button type="submit" className="btn skin-form-button" disabled={isEditing}>
          Soumettre
        </button>

        <button 
          type="button" 
          className="btn skin-form-update-button mt-2" 
          onClick={handleUpdate}
        >
          {isEditing ? "Sauvegarder" : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
};

export default SkinTypeForm;
