// src/pages/ExclusiveBenefits.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Gift, Diamond, Heart, Star } from 'lucide-react';
import "../styles/ExclusiveBenefits.css";

const ExclusiveBenefits = () => {
  return (
    <section className="exclusive-benefits py-5">
      <Container>
        <h2 className="text-center mb-4">Discover the exclusive advantages that make the difference</h2>
        <Row className="g-4">
          {[
            { icon: <Gift size={40} color="#f4a9a8" />, title:"Free Samples",text:"Receive free samples with every order"},
            { icon: <Diamond size={40} color="#f4a9a8" />, title: "Premium Products",text: "A rigorous selection of the best brands"},
            { icon: <Heart size={40} color="#f4a9a8" />, title: "Personalized Advice",text:" Recommendations adapted to your skin"},
            { icon: <Star size={40} color="#f4a9a8" />, title: "Loyalty Program",text:"Earn points on every purchase"}
          ].map((item, index) => (
            <Col md={3} key={index}>
              <div className="benefit-card text-center p-4">
                <div className="benefit-icon">{item.icon}</div>
                <h4 className="benefit-title">{item.title}</h4>
                <p className="benefit-text">{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ExclusiveBenefits;
