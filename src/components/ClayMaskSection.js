import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/ClayMaskSection.css";

// Images des produits
import oil1 from '../assets/images/fa.jpg';
import oil2 from '../assets/images/ss.jpg';
import oil3 from '../assets/images/yy.jpg';

const MaskCollection = () => {
  const products = [
    { name: "Green-Bast Clay Mask", image: oil1, price: "20,00 DT" },
    { name: "Hide Clay Mask", image: oil2, price: "25,00 DT" },
    { name: "Telow Clay Mask", image: oil3, price: "22,00 DT" }
  ];
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(item => item._id === product._id);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Produit ajouté au panier !");
  };


  return (
    <section className="mask-collection-section text-center">
      <Container>
        <Row className="g-4 mt-4 justify-content-center">
          <Col md={8}>
            <h1 className="mask-collection-title">LA BANDE DES MASQUES D’ARGILE</h1>
            <p className="mask-collection-subtitle">Découvrez notre gamme de masques à l’argile de qualité.</p>
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
                <div className="mask-buttons">
                <button
                    className="product-details-add-to-cart btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Ajouter au panier
                  </button>
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
