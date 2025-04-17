import '../styles/RoleSelection.css';
import { useNavigate, useLocation } from 'react-router-dom';

function RoleSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const action = new URLSearchParams(location.search).get('action');

  const handleSelect = (role) => {
    if (action === 'signin') {
      navigate(`/signin?role=${role}`);
    } else {
      navigate(`/signup?role=${role}`);
    }
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-card">
        <h2>Qui êtes-vous ?</h2>
        <p>Sélectionnez votre rôle pour continuer</p>
        <div className="role-selection-buttons">
          <button className="role-btn" onClick={() => handleSelect('user')}>Utilisateur</button>
          <button className="role-btn" onClick={() => handleSelect('admin')}>Administrateur</button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
