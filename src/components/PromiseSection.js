import React from "react";
import { Container, Button } from "react-bootstrap";
import "../styles/PromiseSection.css"; // Import du fichier CSS

import newImage from '../assets/images/rose.png';

const PromiseSection = () => {
  return (
    <section className="promise-section">
      <Container>
        <div className="promise-container">
          {/* Colonne Texte */}
          <div className="promise-text">
            <h2 className="promise-title">PURE + SIMPLE SKINCARE</h2>
            <h3 className="promise-subtitle">OUR PROMISE TO YOU</h3>
            <p className="promise-description">
              We only use raw, highly concentrated ingredients to create products that are intentional, 
              targeted, and handcrafted to make you look and feel good!
            </p>
            <Button variant="outline-dark" className="promise-button">
              READ OUR STORY
            </Button>
          </div>

          {/* Colonne Image */}
          <div className="promise-image-container">
            <img 
              src={newImage} 
              alt="Skincare Products" 
              className="promise-image" 
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PromiseSection;
