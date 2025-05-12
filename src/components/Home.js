import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import '../styles/Home.css';
import ClayMaskSection from "../components/ClayMaskSection";
import PromiseSection from "../components/PromiseSection";
import ExclusiveBenefits from "../components/ExclusiveBenefits";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* En-tête avec image de fond */}
      <header className="header-section">
        <Container>
          <Row className="justify-content-end align-items-start">
            <Col md={6} className="text-end header-text">
              <h1 className="header-title">Découvrez votre routine beauté idéale</h1>
              <p className="header-subtitle">
                Des recommandations de soins personnalisées, adaptées à vos besoins uniques.
              </p>
              <Button 
                variant="light" 
                size="lg" 
                className="header-button"
                onClick={() => navigate("/shop")}
              >
                VOIR LA COLLECTION
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Sections */}
      <ClayMaskSection />
      <PromiseSection />

      {/* Nouvelle section inspirée de la capture */}
      <section className="promise-section">
        <Container>
          <Row className="align-items-center">
            {/* Image à gauche */}
            <Col md={6} className="text-center">
              <img 
                src={require('../assets/images/girl.jpg')}
                alt="Produits de soin"
                className="promise-image"
              />
            </Col>

            {/* Texte à droite */}
            <Col md={6}>
              <h2 className="promise-title">SOINS SIMPLES & PURS</h2>
              <h3 className="promise-subtitle">PROPULSÉS PAR LA NATURE, VALIDÉS PAR LA SCIENCE</h3>
              <p className="promise-description">
                Des soins hautes performances formulés avec des extraits botaniques puissants. Des solutions ciblées conçues pour nourrir, protéger et régénérer votre peau.
              </p>
              <Button variant="outline-dark" size="lg" className="promise-button">
                EN SAVOIR PLUS
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <ExclusiveBenefits />
      <Chatbot />
      <Footer />
    </>
  );
};

export default Home;
