import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', price: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produit ajouté :", product);
    navigate('/dashboard/products');
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter / Modifier un Produit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom du produit</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input type="number" name="price" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Enregistrer</button>
      </form>
    </div>
  );
};

export default ProductForm;
