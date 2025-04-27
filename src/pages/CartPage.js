import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";
import Navbar from '../components/Navbar';
import { FaTrashAlt, FaEuroSign, FaBoxOpen } from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
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

  const LoadingAnimation = () => (
    <div className="cartpage-loading-animation">
      <div className="cartpage-dot"></div>
      <div className="cartpage-dot"></div>
      <div className="cartpage-dot"></div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="cartpage-container">
        <h1 className="cartpage-title">Mon Panier</h1>

        {cartItems.length === 0 ? (
          <>
            <LoadingAnimation />
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
                    <p><FaEuroSign /> Prix : {item.price} €</p>
                    <button className="cartpage-remove-btn" onClick={() => handleRemoveItem(index)}>
                      <FaTrashAlt /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cartpage-total">
              <h3>Total : {getTotal()} €</h3>
              <button className="cartpage-checkout-btn">Passer la commande</button>
              <button className="cartpage-clear-btn" onClick={handleClearCart}>Vider le panier</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
