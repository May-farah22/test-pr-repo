import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SellerDashboard.css';

const SellerProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    status: 'in-stock',
    description: '',
    image: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id; // 🔥 Correction ici (ton erreur venait de là)

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      // 🔥 Afficher uniquement les produits créés par ce vendeur
      const sellerProducts = res.data.filter(product => product.userId === userId);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  };

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('❌ Vous devez être connecté pour ajouter un produit.');
      return;
    }

    const newProduct = {
      ...formData,
      userId
    };

    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      alert('✅ Produit ajouté avec succès!');
      fetchProducts(); // 🔥 Recharge les produits après ajout
      handleCloseForm();
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: '',
        status: 'in-stock',
        description: '',
        image: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      alert('❌ Erreur lors de l\'ajout du produit.');
    }
  };

  return (
    <div className="product-management">
      <div className="product-header">
        <h2>Gestion des Produits</h2>
        <div className="actions">
          <input type="text" placeholder="Rechercher un produit..." />
          <button className="add-btn" onClick={handleShowForm}>+ Nouveau Produit</button>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nom du produit</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Catégorie</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price} €</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td><span className={`status ${product.status}`}>{product.status}</span></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>Aucun produit disponible.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulaire Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Ajouter un Nouveau Produit</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                {/* Colonne 1 */}
                <div className="form-column">
                  <div className="form-group">
                    <label>Nom du Produit</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Prix (€)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
                  </div>
                  <div className="form-group">
                    <label>Images (URL)</label>
                    <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
                  </div>
                </div>

                {/* Colonne 2 */}
                <div className="form-column">
                  <div className="form-group">
                    <label>Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Catégorie</label>
                    <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Statut</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} required>
                      <option value="in-stock">En stock</option>
                      <option value="low-stock">Stock faible</option>
                      <option value="out-of-stock">Rupture de stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="form-group full-width">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Description détaillée du produit"></textarea>
              </div>

              <div className="form-actions">
                <button type="submit">Ajouter Produit</button>
                <button type="button" onClick={handleCloseForm} className="cancel-btn">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
