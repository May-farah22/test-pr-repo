import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import ajouté
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SkinTypeForm.css";

const SkinTypeForm = () => {
  const navigate = useNavigate(); // ✅ Hook pour la navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skinType: "",
    concerns: [],
    message: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [skinTypes, setSkinTypes] = useState([]);

  const concernsList = ["Acné", "Taches", "Rides", "Déshydratation"];

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setFormData((prev) => ({
            ...prev,
            name: user.name || "",
            email: user.email || "",
          }));
        } catch (error) {
          console.error("Erreur parsing user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        concerns: checked
          ? [...prev.concerns, value]
          : prev.concerns.filter((concern) => concern !== value),
      }));
    } else if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("user", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("skinType", formData.skinType);
      formDataToSend.append("message", formData.message);
     formDataToSend.append("concerns", JSON.stringify(formData.concerns));

      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      const res = await fetch("http://localhost:5000/api/client/update-form", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (res.ok) {
        alert("Modifications enregistrées !");
        setIsEditing(false);
        navigate('/user-dashboard'); // ✅ Redirection ici
      } else {
        alert("Erreur lors de l'enregistrement des modifications.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
  };

  const handleUpdate = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchSkinTypes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/skinType");
        const data = await response.json();
        setSkinTypes(data);
      } catch (error) {
        console.error("Erreur récupération types de peau :", error);
      }
    };
    fetchSkinTypes();
  }, []);

  return (
    <div className="container skin-form-container">
      <h2 className="text-center skin-form-title">Déterminez votre type de peau</h2>
      <form onSubmit={handleSubmit}>

        {/* Nom */}
        <div className="mb-3">
          <label className="form-label skin-form-label">
            Nom <span className="text-danger">*</span>
          </label>
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
          <label className="form-label skin-form-label">
            Email <span className="text-danger">*</span>
          </label>
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
          <label className="form-label skin-form-label">
            Type de peau <span className="text-danger">*</span>
          </label>
          <select
            name="skinType"
            className="form-select skin-form-select"
            value={formData.skinType}
            onChange={handleChange}
            disabled={!isEditing}
            required
          >
            <option value="">Sélectionnez votre type de peau</option>
            {skinTypes.map((typeObj, index) => (
              <option key={index} value={typeObj.type}>
                {typeObj.type}
              </option>
            ))}
          </select>
        </div>

        {/* Préoccupations */}
        <div className="mb-3">
          <label className="form-label skin-form-label">
            Préoccupations <span className="text-danger">*</span>
          </label>
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
                <label
                  className="form-check-label skin-form-checkbox-label"
                  htmlFor={`concern-${index}`}
                >
                  {concern}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="form-label skin-form-label">
            Message <span className="text-danger"></span>
          </label>
          <textarea
            name="message"
            className="form-control skin-form-input"
            placeholder="Décrivez vos besoins..."
            rows="3"
            value={formData.message}
            onChange={handleChange}
            disabled={!isEditing}
            required
          ></textarea>
        </div>

        {/* Upload photo */}
        <div className="mb-3">
          <label className="form-label skin-form-label">
            Photo de votre visage <span className="text-danger">*</span>
          </label>
          <div
            className={`dropzone ${isEditing ? "active" : "disabled"}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (!isEditing) return;
              const file = e.dataTransfer.files[0];
              if (file) {
                setFormData({ ...formData, photo: file });
                setPhotoPreview(URL.createObjectURL(file));
              }
            }}
            onClick={() => {
              if (!isEditing) return;
              document.getElementById("photoUpload").click();
            }}
          >
            <input
              id="photoUpload"
              type="file"
              name="photo"
              accept="image/*"
              className="d-none"
              onChange={handleChange}
              disabled={!isEditing}
            />
            <p className="text-muted">Cliquez ou glissez une image ici</p>
          </div>

          {photoPreview && (
            <div className="mt-3 text-center">
              <p className="skin-form-label">Aperçu :</p>
              <img
                src={photoPreview}
                alt="Aperçu du visage"
                className="img-thumbnail preview-image"
              />
            </div>
          )}
        </div>

        {/* Boutons */}
        <button type="submit" className="btn skin-form-button">
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
