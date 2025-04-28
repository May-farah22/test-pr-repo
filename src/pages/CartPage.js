import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CartPage.css";

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
    console.log("cartItems",cartItems.map(item => item._id));
    

    // 🛒 Construction de la commande complète
    const order = {
      customer: user.name || "Client anonyme",
      date: new Date().toISOString().split('T')[0],
      status: "Processing",
      total: parseFloat(getTotal()),
      productIds: cartItems.map(item => item._id) // 🔥 Extraire tous les IDs produits
    };
    console.log("order",order);
    

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
            <button className="checkout-btn" onClick={handleCheckout}>
              Passer la commande
            </button>
            <button className="clear-btn" onClick={handleClearCart}>
              Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
