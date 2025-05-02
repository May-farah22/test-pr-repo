import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar, Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import "../styles/RoutineModal.css";

const steps = [
  "Cleansing",
  "Toning",
  "Treatment",
  "Moisturizing",
  "Sunscreen"
];

const RoutineModal = ({ show, onClose, onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const toggleStep = (step) => {
    setCompletedSteps((prev) =>
      prev.includes(step)
        ? prev.filter((s) => s !== step)
        : [...prev, step]
    );
  };

  const allDone = completedSteps.length === steps.length;
  const progress = (completedSteps.length / steps.length) * 100;

  const handleFinish = () => {
    setConfirmed(true);
    setTimeout(() => {
      onComplete();
      onClose();
      // Réinitialiser les étapes pour décocher toutes les cases
      setCompletedSteps([]); // Vide la liste des étapes complétées
      setConfirmed(false); // Réinitialiser l'état de confirmation
    }, 1500);
  };
  

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Complete Your Skincare Routine</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {confirmed ? (
          <Alert variant="success" className="d-flex align-items-center gap-2">
            <FaCheckCircle size={24} /> Routine completed successfully! 🌟
          </Alert>
        ) : (
          <>
            <p>Check each step as you complete it:</p>

            {steps.map((step, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={`step-${index}`}
                label={step}
                checked={completedSteps.includes(step)}
                onChange={() => toggleStep(step)}
                className="mb-2"
              />
            ))}

            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mt-3" />
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!confirmed && (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleFinish} disabled={!allDone}>
              Finish Routine
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RoutineModal;
