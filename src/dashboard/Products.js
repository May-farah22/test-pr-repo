import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import '../styles/Products.css'; // Assurez-vous que le chemin est correct

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Crème hydratante", price: 25 },
    { id: 2, name: "Sérum vitamine C", price: 40 },
  ]);

  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleClose = () => {
    setShow(false);
    setNewProduct({ name: "", price: "" });
    setEditIndex(null);
  };

  const handleShow = () => setShow(true);

  const handleAddProduct = () => {
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = { ...newProduct, id: products[editIndex].id };
      setProducts(updatedProducts);
    } else {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
    handleShow();
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Produits</h2>
      <Button
        className="custom-add-btn"
        style={{ backgroundColor: 'transparent', border: 'none' }}
        onClick={handleShow}
      >
        Ajouter un Produit
      </Button>

      <Table striped bordered hover className="mt-3">
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
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}€</td>
              <td>
                <Button
                  className="custom-edit-btn"
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                  onClick={() => handleEditProduct(index)}
                >
                  Modifier
                </Button>{" "}
                <Button
                  className="custom-delete-btn"
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Modifier Produit" : "Ajouter Produit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le prix"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;