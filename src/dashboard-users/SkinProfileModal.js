import React, { useState } from 'react';
import '../styles/SkinProfileModal.css';

const SkinProfileModal = ({ onClose }) => {
  const [skinType, setSkinType] = useState('Combination');
  const [concerns, setConcerns] = useState(['Dehydration', 'Fine Lines']);
  const [sensitivity, setSensitivity] = useState('Moderate');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ skinType, concerns, sensitivity });
    onClose();
  };

  return (
    <div className="spm-overlay">
      <div className="spm-content">
        <h2>Mettre à jour votre profil de peau</h2>
        <form className="spm-form" onSubmit={handleSubmit}>
          <label className="spm-label">Type de peau :</label>
          <select className="spm-select" value={skinType} onChange={(e) => setSkinType(e.target.value)}>
            <option value="Dry">Sèche</option>
            <option value="Oily">Grasse</option>
            <option value="Combination">Mixte</option>
            <option value="Normal">Normale</option>
          </select>

          <label className="spm-label">Préoccupations cutanées :</label>
          <input
            type="text"
            className="spm-input"
            value={concerns.join(', ')}
            onChange={(e) => setConcerns(e.target.value.split(',').map(s => s.trim()))}
          />

          <label className="spm-label">Sensibilité :</label>
          <select className="spm-select" value={sensitivity} onChange={(e) => setSensitivity(e.target.value)}>
            <option value="Low">Faible</option>
            <option value="Moderate">Modérée</option>
            <option value="High">Élevée</option>
          </select>

          <div className="spm-actions">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose} className="spm-btn-cancel">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkinProfileModal;
