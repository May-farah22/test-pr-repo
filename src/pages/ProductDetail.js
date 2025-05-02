import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/shop");
  };

  if (!product) {
    return <h2>Chargement du produit...</h2>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
      </div>

      <div className="product-details-info">
        <h2 className="product-details-name">{product.name}</h2>
        <p className="product-details-price">
          {product.oldPrice && <span className="product-details-old-price">{product.oldPrice} TND</span>}
          <span className="product-details-new-price">{product.price} TND</span>
        </p>
        <p className="product-details-category">{product.category}</p>
        <p className="product-details-skinType">{product.skinType}</p>
        <p className="product-details-rating">Noté 5.00 sur 5 basé sur 3 avis client</p>
        <p className="product-details-availability">Disponible sur commande</p>
        <p className="product-details-points">
          Achetez ce produit maintenant et gagnez 31 Points, 100 points de fidélité peuvent être convertis en un bon de 2 D.T !
        </p>
        <div className="product-details-quantity">
          <label>Quantité :</label>
          <input type="number" min="1" defaultValue={1} />
        </div>
        <button className="product-details-add-to-cart" onClick={() => handleAddToCart(product)}>
          Ajouter au panier
        </button>
      </div>

      <div className="product-details-description">
        <h3>Description</h3>
        <p>{product.description}</p>

        <h3>Conseils d’utilisation</h3>
        <p>Nettoyez le visage et le cou avec la Lotion nettoyante pour Peaux Intolérantes...</p>

        <h3>Composition</h3>
        <p>{product.composition}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
