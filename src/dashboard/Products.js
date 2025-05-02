import { useState } from "react";
import "../styles/Products.css";

const BoxProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Box S", price: 10, stock: 100 },
    { id: 2, name: "Box M", price: 15, stock: 80 },
    { id: 3, name: "Box L", price: 20, stock: 60 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });

  const handleAddProduct = () => {
    setEditProduct(null);
    setFormData({ name: "", price: "", stock: "" });
    setShowModal(true);
  };

  const handleViewProduct = (product) => {
    // Exemple d'action : afficher un modal, rediriger vers une page de détail, etc.
    console.log("Produit à voir :", product);
    // navigate(`/products/${product.id}`); // si tu utilises React Router
  };
  
  const handleDeleteProduct = (productId) => {
    // Affiche une confirmation avant de supprimer
    const confirmed = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (confirmed) {
      // Ici, tu peux appeler une API ou mettre à jour ton state pour supprimer le produit
      // Exemple si tu utilises un state local :
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      // Modification
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id ? { ...p, ...formData } : p
        )
      );
    } else {
      // Ajout
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    handleCloseModal();
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price} €</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="action-button view"
                  onClick={() => handleViewProduct(product)}
                >
                   Voir
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleDeleteProduct(product.id)}
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
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          {/* Colonne 1 */}
          <div className="form-column">
            <div className="form-group">
              <label>Nom <span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Prix (DT) <span className="required">*</span></label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Ancien prix (DT)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>ID <span className="required">*</span></label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Type de peau <span className="required">*</span></label>
              <input
                type="text"
                name="skintype"
                value={formData.skintype}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Colonne 2 */}
          <div className="form-column">
            <div className="form-group">
              <label>Stock <span className="required">*</span></label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Catégorie</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Statut <span className="required">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Sélectionner</option>
                <option value="in-stock">En stock</option>
                <option value="low-stock">Stock faible</option>
                <option value="out-of-stock">Rupture de stock</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Image 
              </label>
              <input
                type="file"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Note (sur 5)</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Zone Description & Composition */}
        <div className="form-group full-width">
          <label>Composition</label>
          <input
            type="text"
            name="composition"
            value={formData.composition}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Description détaillée du produit"
          />
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
