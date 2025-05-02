import React, { useEffect, useState } from "react";
import "../styles/Wishlist.css";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(wishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter(item => item._id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  return (
    <>
      <Navbar />
      <div className="wishlist-wrapper">
        <div className="wishlist-header">
          <h1>💖 Ma Wishlist</h1>
          <p>Découvrez tous vos produits favoris ici !</p>
        </div>
  
        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <p>Votre wishlist est vide.</p>
            <Link to="/shop" className="wishlist-btn">Voir les produits</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div className="wishlist-card" key={item._id}>
                <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                <div className="wishlist-info">
                  <h3>{item.name}</h3>
                  <p className="wishlist-price">{item.price} DT</p>
                  <div className="wishlist-actions">
                    <Link to={`/product/${item._id}`} className="wishlist-btn view">Voir</Link>
                    <button onClick={() => removeFromWishlist(item._id)} className="wishlist-btn remove">
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
  
};

export default Wishlist;
