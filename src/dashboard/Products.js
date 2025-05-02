import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Products.css";

const BoxProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    oldPrice: "",
    id: "",
    skintype: "",
    category: "",
    status: "",
    image: null,
    rating: "",
    composition: "",
    description: ""
  });
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log('user',storedUser.id)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur chargement produits:", err);
    }
  };

  const handleAddProduct = () => {
    setEditProduct(null);
   
    setFormData({
      name: "",
      price: "",
      stock: "",
      skintype: "",
      category: "",
    
      image: "",
     userId:storedUser.id,
      description: ""
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        setProducts(prev => prev.filter(p => p._id !== productId));
      } catch (err) {
        console.error("Erreur suppression produit :", err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      for (const key in formData) {
        if (formData[key]) submitData.append(key, formData[key]);
      }

      const url = editProduct
        ? `http://localhost:5000/api/products/${editProduct._id}`
        : "http://localhost:5000/api/products";

      const method = editProduct ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: submitData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (editProduct) {
        setProducts(prev =>
          prev.map(p => (p._id === editProduct._id ? res.data : p))
        );
      } else {
        setProducts(prev => [...prev, res.data]);
      }

      setShowModal(false);
    } catch (err) {
      console.error("Erreur soumission produit :", err);
    }
  };

  return (
    <div className="admin-content">
      <div className="page-header">
        <h1>Produits</h1>
        <button className="add-button" onClick={handleAddProduct}>
          + Ajouter un produit
        </button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Produits</th>
            <th>Prix (DT)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price} DT</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="action-button view"
                  onClick={() => console.log("View", product)}
                >
                  Voir
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editProduct ? "Modifier le produit" : "Ajouter un produit"}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-fields">
                <div className="form-column">
                  <div className="form-group">
                    <label>Nom <span className="required">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Prix (DT) <span className="required">*</span></label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
                  </div>
                 
                 
                 
                </div>

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

            

              <div className="form-group full-width">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Description détaillée du produit" />
              </div>

              <div className="form-actions">
                <button type="submit">{editProduct ? "Modifier" : "Ajouter"}</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxProducts;
