// src/pages/ExclusiveBenefits.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Gift, Diamond, Heart, Star } from 'lucide-react';
import "../styles/ExclusiveBenefits.css";

const ExclusiveBenefits = () => {
  return ( 
    <section className="exclusive-benefits py-5">
      <Container>
        <h2 className="text-center mb-4">Découvrez les avantages exclusifs qui font la différence</h2>
        <Row className="g-4">
          {[
            { icon: <Gift size={40} color="#f4a9a8" />, title:"Échantillons Gratuits", text:"Recevez des échantillons gratuits avec chaque commande" },
            { icon: <Diamond size={40} color="#f4a9a8" />, title: "Produits Haut de Gamme", text: "Une sélection rigoureuse des meilleures marques" },
            { icon: <Heart size={40} color="#f4a9a8" />, title: "Conseils Personnalisés", text:"Des recommandations adaptées à votre peau" },
            { icon: <Star size={40} color="#f4a9a8" />, title: "Programme de Fidélité", text:"Gagnez des points à chaque achat" }
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
