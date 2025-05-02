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
        <h2>Update Your Skin Profile</h2>
        <form className="spm-form" onSubmit={handleSubmit}>
          <label className="spm-label">Skin Type:</label>
          <select className="spm-select" value={skinType} onChange={(e) => setSkinType(e.target.value)}>
            <option value="Dry">Dry</option>
            <option value="Oily">Oily</option>
            <option value="Combination">Combination</option>
            <option value="Normal">Normal</option>
          </select>

          <label className="spm-label">Skin Concerns:</label>
          <input
            type="text"
            className="spm-input"
            value={concerns.join(', ')}
            onChange={(e) => setConcerns(e.target.value.split(',').map(s => s.trim()))}
          />

          <label className="spm-label">Sensitivity:</label>
          <select className="spm-select" value={sensitivity} onChange={(e) => setSensitivity(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>

          <div className="spm-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="spm-btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkinProfileModal;
