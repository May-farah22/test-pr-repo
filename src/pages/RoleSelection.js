import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiUser, FiSettings, FiShoppingBag } from 'react-icons/fi';
import "../styles/RoleSelection.css";

function RoleSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const action = new URLSearchParams(location.search).get('action');

  const handleSelect = (role) => {
    if (action === 'signin') {
      navigate(`/signin?role=${role}`);
    }
  };

  const roles = [
    { id: 'user', icon: <FiUser className="role-icon" />, title: 'Utilisateur' },
    { id: 'admin', icon: <FiSettings className="role-icon" />, title: 'Administrateur' },
    { id: 'vendor', icon: <FiShoppingBag className="role-icon" />, title: 'Vendeur' }
  ];

  return (
    <Container fluid className="role-selection-container d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} xl={5}>
          <Card className="role-card animate-fade-in">
            <Card.Body className="p-4 p-md-5">
              <div className="role-header text-center mb-4">
                <h2 className="role-title mb-3">Bienvenue</h2>
                <p className="role-subtitle">Choisissez votre profil pour continuer</p>
              </div>
              
              <div className="d-grid gap-3">
                {roles.map((role, index) => (
                  <Button
                    key={role.id}
                    className={`role-btn animate-fade-in delay-${index + 1} d-flex align-items-center`}
                    onClick={() => handleSelect(role.id)}
                  >
                    <div className="role-icon-container me-3">
                      {role.icon}
                    </div>
                    <span className="role-label">{role.title}</span>
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RoleSelection;