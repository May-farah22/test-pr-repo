import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/products"; 

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClose = () => {
    setShow(false);
    setNewProduct({ name: "", price: "" });
    setEditId(null);
  };

  const handleShow = () => setShow(true);

  // Add or Edit Product
  const handleSaveProduct = async () => {
    try {
      if (editId) {
        
        await axios.put(`${API_URL}/${editId}`, newProduct);
      } else {
        console.log("newProduct",newProduct);
        
        await axios.post(API_URL, newProduct);
      }
      fetchProducts();
      handleClose();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Prepare product for editing
  const handleEditProduct = (product) => {
    setNewProduct({ name: product.name, price: product.price });
    setEditId(product._id);
    handleShow();
  };

  return (
    <div className="products-dashboard-container">
      <div className="products-header">
        <h2>Produits</h2>
        <Button className="products-add-btn" onClick={handleShow}>
          + Ajouter un Produit
        </Button>
      </div>

      <div className="products-table-wrapper">
        <Table striped hover responsive className="products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prix (€)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}€</td>
                <td>
                  <Button className="products-edit-btn" onClick={() => handleEditProduct(product)}>
                    Modifier
                  </Button>
                  <Button className="products-delete-btn" onClick={() => handleDeleteProduct(product._id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Modifier Produit" : "Ajouter Produit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            {editId ? "Modifier" : "Ajouter"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
