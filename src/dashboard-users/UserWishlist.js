import React, { useEffect, useState } from 'react';
import '../styles/UserOrders.css';

const ClientWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');

    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  return (
    <div className="client-wishlist-container">
      <h2 className="client-section-title">Your Wishlist</h2>

      <div className="client-wishlist-items">
        {wishlist.length === 0 ? (
          <p>No items in your wishlist.</p>
        ) : (
          wishlist.map((item, index) => (
            <div className="client-wishlist-item" key={index}>
              <img
                src={item.image.startsWith('http') ? item.image : `http://localhost:5000/${item.image}`}
                alt={item.title}
              />
              <div className="client-item-info">
                <p>{item.title}</p>
              </div>
              <span className="client-item-price">${item.price.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientWishlist;
