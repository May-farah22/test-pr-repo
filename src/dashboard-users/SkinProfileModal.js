import React, { useEffect, useState } from 'react';
import '../styles/SkinProfileModal.css';

const SkinProfileModal = ({ onClose }) => {
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState([]);
  const [sensitivity, setSensitivity] = useState('');
  const stored = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:8000/api/skin-type')
      .then(res => res.json())
      .then(data => {
        setSkinType(data.skinType);
        setConcerns(data.concerns);
        setSensitivity(data.sensitivity);
      })
      .catch(err => console.error('❌ Failed to fetch profile:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch( `http://localhost:5000/api/skin-type/${stored.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skinType, concerns, sensitivity }),
      });

      if (!res.ok) throw new Error('Failed to save profile');

      const result = await res.json();
      console.log('✅ Profile updated:', result);
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
