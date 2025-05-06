import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CartPage.css";
import Navbar from '../components/Navbar';
import { FaTrashAlt, FaEuroSign, FaBoxOpen } from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("❌ Vous devez être connecté pour passer une commande.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    console.log("cartItems", cartItems.map(item => item._id));

    const order = {
      user: user.id || "Client anonyme",
      date: new Date().toISOString().split('T')[0],
      status: "Processing",
      total: parseFloat(getTotal()),
      productIds: cartItems.map(item => item._id)
    };
    console.log("order", order);

    try {
      const res = await axios.post('http://localhost:5000/api/orders', order);

      if (res.status === 201) {
        alert("✅ Commande passée avec succès !");
        handleClearCart();
      }
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      alert("❌ Une erreur est survenue lors de la commande.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="cartpage-container">
        <h1 className="cartpage-title">Mon Panier</h1>

        {cartItems.length === 0 ? (
          <>
            {/* Animation de chargement simple */}
            <div className="loading-animation">
              <div className="spinner"></div>
              <p>Chargement...</p>
            </div>

            <p className="cartpage-empty-message">Votre panier est vide.</p>
          </>
        ) : (
          <>
            <div className="cartpage-items">
              {cartItems.map((item, index) => (
                <div className="cartpage-item" key={index}>
                  <img src={item.image} alt={item.name} className="cartpage-item-image" />
                  <div className="cartpage-item-details">
                    <h2>{item.name}</h2>
                    <p><FaBoxOpen /> Quantité : {item.quantity}</p>
                    <p><FaEuroSign /> Prix : {item.price} DT</p>
                    <button className="cartpage-remove-btn" onClick={() => handleRemoveItem(index)}>
                      <FaTrashAlt /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cartpage-total">
            <h3>Total : {getTotal()} DT</h3>
            <button className="cartpage-checkout-btn" onClick={handleCheckout}>
              Passer la commande
            </button>
            <button className="cartpage-clear-btn" onClick={handleClearCart}>
              Vider le panier
            </button>
          </div>

          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
