import React, { useEffect, useState } from 'react';
import '../styles/SkinProfileModal.css';

const SkinProfileModal = ({ onClose }) => {
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState([]);
  const [sensitivity, setSensitivity] = useState('');
  const token = localStorage.getItem('token');

  // ✅ Charger le profil existant
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/client/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log('data',data)
        setSkinType(data.skinType || '');
        setConcerns(data.concerns || []);
        setSensitivity(data.sensitivity || '');
      } catch (err) {
        console.error('❌ Failed to fetch skin profile:', err);
      }
    };

    fetchProfile();
  }, [token]);

  // ✅ Sauvegarder le profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('skinType', skinType);
      formData.append('concerns', JSON.stringify(concerns));
      formData.append('sensitivity', sensitivity);

      const res = await fetch('http://localhost:5000/api/client/update-form', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Erreur serveur');

      const result = await res.json();
      console.log('✅ Profil mis à jour :', result);
      onClose();
    } catch (error) {
      console.error('❌ Error submitting profile:', error);
    }
  };

  return (
    <div className="spm-overlay">
      <div className="spm-content">
        <h2>Mettre à jour votre profil de peau</h2>
        <form className="spm-form" onSubmit={handleSubmit}>
          <label className="spm-label">Type de peau :</label>
          <select
            className="spm-select"
            value={skinType}
            onChange={(e) => setSkinType(e.target.value)}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="Sèche">Sèche</option>
            <option value="Grasse">Grasse</option>
            <option value="Mixte">Mixte</option>
            <option value="Normale">Normale</option>
          </select>

          <label className="spm-label">Préoccupations cutanées :</label>
          <input
            type="text"
            className="spm-input"
            value={concerns.join(', ')}
            onChange={(e) =>
              setConcerns(e.target.value.split(',').map((s) => s.trim()))
            }
          />

          <label className="spm-label">Sensibilité :</label>
          <select
            className="spm-select"
            value={sensitivity}
            onChange={(e) => setSensitivity(e.target.value)}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="Faible">Faible</option>
            <option value="Modérée">Modérée</option>
            <option value="Élevée">Élevée</option>
          </select>

          <div className="spm-actions">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose} className="spm-btn-cancel">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkinProfileModal;
