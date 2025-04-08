import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/ClayMaskSection.css"; // Import du CSS avec un nouveau nom

// Images des produits
import oil1 from '../assets/images/fa.jpg';
import oil2 from '../assets/images/ss.jpg';
import oil3 from '../assets/images/yy.jpg';

const MaskCollection = () => {
  const products = [
    { name: "Green-Bast Clay Mask", image: oil1, price: "$20.00" },
    { name: "Hide Clay Mask", image: oil2, price: "$25.00" },
    { name: "Telow Clay Mask", image: oil3, price: "$22.00" }
  ];

  return (
    <section className="mask-collection-section text-center">
      <Container>
        <Row className="g-4 mt-4 justify-content-center">
          <Col md={8}>
            <h1 className="mask-collection-title">THE CLAY MASK GANG</h1>
            <p className="mask-collection-subtitle">Discover our range of fine clay masks.</p>
          </Col>
        </Row>
        {/* Collection de produits */}
        <Row className="g-4 mt-4 justify-content-center">
          {products.map((product, index) => (
            <Col xs={12} sm={6} md={4} key={index} className="d-flex justify-content-center">
              <div className="mask-card">
                <img src={product.image} alt={product.name} className="mask-image img-fluid" />
                <h3 className="mask-name mt-3">{product.name}</h3>
                <p className="mask-price">{product.price}</p>
             <div className="button-container mt-3">
             <Button type="submit" className="btn btn-primary cart-btn me-2">
            ADD TO CART 
          </Button>
          <Button type="submit" className="btn btn-primary buy-btn">
            BUY IT NOW 
          </Button>

        </div>

              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MaskCollection;
