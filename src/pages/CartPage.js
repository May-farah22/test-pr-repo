import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";

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

  return (
    <div className="cart-container">
      <h1 className="cart-title">Mon Panier</h1>

      {cartItems.length === 0 ? (
        <p className="empty-message">Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Quantité : {item.quantity}</p>
                  <p>Prix : {item.price} €</p>
                  <button className="remove-btn" onClick={() => handleRemoveItem(index)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total : {getTotal()} €</h3>
            <button className="checkout-btn">Passer la commande</button>
            <button className="clear-btn" onClick={handleClearCart}>Vider le panier</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
