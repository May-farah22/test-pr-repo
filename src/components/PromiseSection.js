import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../styles/PromiseSection.css";

import newImage from '../assets/images/rose.png';

const PromiseSection = () => {
  return (
    <section className="promise-section">
      <Container>
        <div className="promise-container">
          {/* Colonne Texte */}
          <div className="promise-text">
            <h2 className="promise-title">SOINS SIMPLES & PURS</h2>
            <h3 className="promise-subtitle">NOTRE PROMESSE POUR VOUS</h3>
            <p className="promise-description">
              Nous utilisons uniquement des ingrédients bruts et hautement concentrés pour créer des produits 
              intentionnels, ciblés et faits main, conçus pour vous faire sentir et paraître radieuse !
            </p>
            <Link to="/about">
              <Button variant="outline-dark" className="promise-button">
                DÉCOUVRIR NOTRE HISTOIRE
              </Button>
            </Link>
          </div>

          {/* Colonne Image */}
          <div className="promise-image-container">
            <img 
              src={newImage} 
              alt="Produits de soin" 
              className="promise-image" 
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PromiseSection;
