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

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setShowModal(true);
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
            <th>Prix (€)</th>
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
                  className="action-button edit"
                  onClick={() => handleEditProduct(product)}
                >
                  ✏️ Modifier
                </button>
                <button className="action-button delete">🗑 Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editProduct ? "Modifier le produit" : "Ajouter un produit"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prix (€)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit">
                  {editProduct ? "Modifier" : "Ajouter"}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxProducts;
