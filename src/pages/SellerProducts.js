import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/SellerDashboard.css';

const SellerProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: null,
    skinType: '', // Ajouté ici
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id;

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      const sellerProducts = res.data.filter(product => product.userId === userId);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId, fetchProducts]);

  const handleShowForm = () => {
    setEditingProductId(null); // reset édition
    setFormData({
      name: '',
      price: '',
      stock: '',
      category: '',
      description: '',
      image: null,
      skinType: '', // Réinitialiser le type de peau ici
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProductId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('❌ Vous devez être connecté pour ajouter un produit.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('userId', userId);
    data.append('skinType', formData.skinType); // Ajouté ici
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingProductId) {
        await axios.put(`http://localhost:5000/api/products/${editingProductId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('✅ Produit modifié avec succès!');
      } else {
        await axios.post('http://localhost:5000/api/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('✅ Produit ajouté avec succès!');
      }

      fetchProducts();
      handleCloseForm();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du produit:', error);
      alert('❌ Une erreur est survenue.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("✅ Produit supprimé avec succès.");
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      alert("❌ Erreur lors de la suppression.");
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
      image: null, // l’image n’est pas réutilisée ici
      skinType: product.skinType || '', // Assurer que type de peau est bien assigné
    });
    setShowForm(true);
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
            <th>Type de peau</th> {/* Nouvelle colonne ici */}
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price} DT</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.skinType}</td> {/* Affichage du type de peau */}
                <td className="product-actions">
                  <button onClick={() => handleEdit(product)} className="edit-btn">Modifier</button>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>Aucun produit disponible.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && (
    <div className="modal-overlay">
    <div className="modal-content">
      <h2>Ajouter un produit</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-grid">
          {/* Colonne de gauche */}
          <div className="form-column">
            <div className="form-group">
              <label>Nom <span className="required">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            
            <div className="form-group">
              <label>Prix (DT) <span className="required">*</span></label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
            </div>

            <div className="form-group">
                    <label>Type de peau</label>
                    <select name="skinType" value={formData.skinType} onChange={handleInputChange} className="form-control">
                      <option value="">Sélectionner</option>
                      <option value="sèche">Sèche</option>
                      <option value="grasse">Grasse</option>
                      <option value="mixte">Mixte</option>
                      <option value="sensible">Sensible</option>
                      <option value="normale">Normale</option>
                    </select>
                  </div>
          </div>

          {/* Colonne de droite */}
          <div className="form-column">
            <div className="form-group">
              <label>Stock <span className="required">*</span></label>
              <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
            </div>
            
            <div className="form-group">
              <label>Catégorie</label>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
            </div>
           
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" name="image" accept=".jpg,.jpeg,.png" onChange={handleInputChange} />
                  </div>
          </div>
        </div>

        <div className="form-separator"></div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="- Description détaillée du produit" />
        </div>
        <div className="form-group full-width">
                <label>Composition</label>
                <textarea name="composition" value={formData.composition} onChange={handleInputChange} rows="3" placeholder="Ex : Eau, Glycérine, Vitamine C..." />
              </div>

              <div className="form-group full-width">
                <label>Conseils d'utilisation</label>
                <textarea name="advice" value={formData.advice} onChange={handleInputChange} rows="3" placeholder="Ex : Appliquer matin et soir sur une peau propre." />
              </div>
       <div className="form-actions">
                <button type="submit">{editingProductId ? "Mettre à jour" : "Ajouter Produit"}</button>
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
