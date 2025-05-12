import React, { useEffect, useState } from 'react';
import '../styles/UserOrders.css';

const ListeSouhaitsClient = () => {
  const [listeSouhaits, setListeSouhaits] = useState([]);

  useEffect(() => {
    const souhaitsStockés = localStorage.getItem('wishlist');

    if (souhaitsStockés) {
      setListeSouhaits(JSON.parse(souhaitsStockés));
    }
  }, []);

  return (
    <div className="client-wishlist-container">
      <h2 className="client-section-title">Votre Liste de Souhaits</h2>

      <div className="client-wishlist-items">
        {listeSouhaits.length === 0 ? (
          <p>Aucun article dans votre liste de souhaits.</p>
        ) : (
          listeSouhaits.map((article, index) => (
            <div className="client-wishlist-item" key={index}>
              <img
                src={article.image.startsWith('http') ? article.image : `http://localhost:5000/${article.image}`}
                alt={article.title}
              />
              <div className="client-item-info">
                <p>{article.title}</p>
              </div>
              <span className="client-item-price">{article.price.toFixed(2)} DT</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListeSouhaitsClient;
