import React, { useState, useEffect } from 'react';
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

  // ✅ Load saved completion state and completed steps
  useEffect(() => {
    const savedSteps = localStorage.getItem('completedSteps');
    const routineFinished = localStorage.getItem('routineFinished') === 'true';

    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    if (routineFinished) {
      setConfirmed(true); // Show the success message if already finished
    }
  }, []);

  // ✅ Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const toggleStep = (step) => {
    setCompletedSteps((prev) =>
      prev.includes(step)
        ? prev.filter((s) => s !== step)
        : [...prev, step]
    );
  };

  const allDone = completedSteps.length === steps.length;
  const progress = confirmed ? 100 : (completedSteps.length / steps.length) * 100;

  const handleFinish = () => {
    setConfirmed(true);

    // ✅ Save finished state
    localStorage.setItem('routineFinished', 'true');

    // ✅ Save history
    const finishedRoutines = JSON.parse(localStorage.getItem('finishedRoutines')) || [];
    const routineRecord = {
      date: new Date().toISOString(),
      steps: completedSteps,
    };
    finishedRoutines.push(routineRecord);
    localStorage.setItem('finishedRoutines', JSON.stringify(finishedRoutines));

    setTimeout(() => {
      onComplete();
      onClose();
    }, 1500);
  };

  const handleCancel = () => {
    onClose();
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
          </>
        )}

        <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mt-3" />
      </Modal.Body>

      <Modal.Footer>
        {!confirmed && (
          <>
            <Button variant="secondary" onClick={handleCancel}>
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
