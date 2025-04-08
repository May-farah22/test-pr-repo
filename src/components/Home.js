import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"; // Import du hook de navigation


import '../styles/Home.css';
import ClayMaskSection from "../components/ClayMaskSection"; // Assure-toi que ce chemin est correct !
import PromiseSection from "../components/PromiseSection";
import ExclusiveBenefits from "../components/ExclusiveBenefits";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate(); // Hook de navigation

  return (
    <>
      {/* Header avec image de fond */}
      <header className="header-section">
        <Container>
          <Row className="justify-content-end align-items-start">
            <Col md={6} className="text-end header-text">
              <h1 className="header-title">Discover Your Perfect Beauty Routine</h1>
              <p className="header-subtitle">
                Personalized skincare recommendations tailored to your unique needs.
              </p>
              <Button 
                variant="light" 
                size="lg" 
                className="header-button"
                onClick={() => navigate("/shop")} // Redirection vers la page shop
              >
                SHOP COLLECTION
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
                alt="Skincare Products"
                className="promise-image"
              />
            </Col>

            {/* Texte à droite */}
            <Col md={6}>
              <h2 className="promise-title">PURE + SIMPLE SKINCARE</h2>
              <h3 className="promise-subtitle">POWERED BY NATURE, BACKED BY SCIENCE</h3>
              <p className="promise-description">
              High-performance skincare formulated with potent botanical extracts. Targeted solutions designed to nourish, protect, and rejuvenate your skin.
              </p>
              <Button variant="outline-dark" size="lg" className="promise-button">
              LEARN MORE
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
<ExclusiveBenefits/>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
