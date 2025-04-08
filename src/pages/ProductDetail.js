import { useParams } from "react-router-dom";
import { products } from '../components/Shop';
import '../styles/ProductDetails.css';
import React from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  
  if (!product) {
    return <h2>Produit introuvable</h2>;
  }

  return (
    <div className="product-image">
  <img src={product.image} alt={product.name} />


      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">
          <span className="old-price">{product.oldPrice} TND</span>
          <span className="new-price">{product.price} TND</span>
        </p>
        <p className="product-category">{product.category}</p>
        <p className="product-skinType">{product.skinType}</p>
        <p className="product-rating">Noté 5.00 sur 5 basé sur 3 avis client</p>
        <p className="product-availability">Disponible sur commande</p>
        <p className="product-points">
          Achetez ce produit maintenant et gagnez 31 Points, 100 points de fidélité peuvent être convertis en un bon de 2 D.T !
        </p>
        <div className="quantity">
          <label>Quantité :</label>
          <input type="number" value="1" />
        </div>
        <button className="add-to-cart">Ajouter au panier</button>
      </div>

      {/* Description détaillée du produit */}
      <div className="product-description">
        <h3>Description</h3>
        <p>{product.description}</p>

        <h3>Conseils d’utilisation</h3>
        <p>
          Nettoyez le visage et le cou avec la Lotion nettoyante pour Peaux Intolérantes. Appliquez le soin matin et soir. Pressez le tube pour obtenir la dose souhaitée. Après utilisation, enlever l’excédent de produit et refermer.
        </p>

        <h3>Composition</h3>
        <p>
          {product.composition}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
