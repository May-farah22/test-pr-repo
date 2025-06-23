import React, { useEffect, useState } from 'react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiUserPlus
} from 'react-icons/fi';
import axios from 'axios';
import "../styles/user.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [, setLoading] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user', // default role
    password: ''
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        let filteredUsers = res.data;
        if (storedUser?.role === 'admin') {
          filteredUsers = res.data.filter(u => u.role === 'user' || u.role === 'seller');
        }
        setCustomers(filteredUsers);
      } catch (error) {
        console.error('Erreur chargement clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (customer) => {
    setEditingCustomer({ ...customer });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer._id !== id));
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${editingCustomer._id}`, editingCustomer);
      setCustomers(customers.map(c =>
        c._id === editingCustomer._id ? res.data : c
      ));
      setIsModalOpen(false);
      alert("Utilisateur mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Échec de la mise à jour de l'utilisateur.");
    }
  };

  const handleAddCustomer = async () => {
    console.log('newCustomer.role', newCustomer.role);
    if (!newCustomer.name || !newCustomer.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users', {
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        password: newCustomer.password,
        role: newCustomer.role,
      });

      setCustomers([...customers, res.data]);
      setIsAddModalOpen(false);
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        role: 'user', // reset to default role
        password: ''
      });

      alert('Vendeur ajouté avec succès');
    } catch (error) {
      console.error("Erreur lors de l'ajout du vendeur :", error);
      alert('Erreur lors de l’ajout. Vérifiez les champs ou l’email déjà utilisé.');
    }
  };

  return (
    <div className="custom-customers-container">
      <div className="custom-customers-header">
        <h1 className="custom-customers-title">Gestion des utilisateurs</h1>
        <div className="custom-customers-actions">
          <div className="custom-search-bar">
            <FiSearch className="custom-search-icon" />
            <input
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="custom-add-customer-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FiUserPlus className="custom-btn-icon" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      <div className="custom-customers-table-container">
        <table className="custom-customers-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Contact</th>
              <th>Rejoint</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer._id}>
                <td className="custom-customer-info">
                  <div className="custom-customer-avatar">
                    <FiUser />
                  </div>
                  <div>
                    <p className="custom-customer-name">{customer.name}</p>
                    <p className="custom-customer-email">{customer.email}</p>
                  </div>
                </td>
                <td>
                  <div className="custom-contact-info">
                    <FiMail className="custom-contact-icon" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="custom-contact-info">
                    <FiPhone className="custom-contact-icon" />
                    <span>{customer.phone}</span>
                  </div>
                </td>
                <td className="custom-joined-date">{customer.joined}</td>
                <td className="custom-role">
                  <span className={`custom-role-tag custom-role-${customer.role}`}>
                    {customer.role === 'user' ? 'Utilisateur' : customer.role === 'seller' ? 'Vendeur' : 'Admin'}
                  </span>
                </td>
                <td className="custom-actions">
                  <button
                    className="custom-action-btn custom-edit"
                    onClick={() => handleEdit(customer)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="custom-action-btn custom-delete"
                    onClick={() => handleDelete(customer._id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="custom-customer-modal">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h3>Modifier l'utilisateur</h3>
            </div>
            <div className="custom-modal-body">
              <div className="custom-form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={editingCustomer?.name || ''}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, name: e.target.value })
                  }
                />
              </div>
              <div className="custom-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editingCustomer?.email || ''}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, email: e.target.value })
                  }
                />
              </div>
              <div className="custom-form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={editingCustomer?.phone || ''}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, phone: e.target.value })
                  }
                />
              </div>
              <div className="custom-form-group">
                <label>Rôle</label>
                <select
                  value={editingCustomer?.role || 'user'}
                  onChange={(e) =>
                    setEditingCustomer({ ...editingCustomer, role: e.target.value })
                  }
                >
                  <option value="user">Utilisateur</option>
                  <option value="seller">Vendeur</option>
                  {storedUser?.role === 'super-admin' && (
                    <option value="admin">Admin</option>
                  )}
                </select>
              </div>
            </div>
            <div className="custom-modal-footer">
              <button
                className="custom-cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
              <button className="custom-save-btn" onClick={handleSave}>
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="custom-customer-modal">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h3>Ajouter un utilisateur</h3>
            </div>
            <div className="custom-modal-body">
              <div className="custom-form-group">
                <label>Nom complet <span className="custom-required">*</span></label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
              </div>
              <div className="custom-form-group">
                <label>Email <span className="custom-required">*</span></label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
              </div>
              <div className="custom-form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
              </div>
              <div className="custom-form-group">
                <label>Rôle</label>
                <select
                  value={newCustomer.role}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, role: e.target.value })
                  }
                >
                  <option value="user">Utilisateur</option>
                  <option value="seller">Vendeur</option>
                  {storedUser?.role === 'super-admin' && (
                    <option value="admin">Admin</option>
                  )}
                </select>
              </div>
              <div className="custom-form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  value={newCustomer.password}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="custom-modal-footer">
              <button
                className="custom-cancel-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Annuler
              </button>
              <button className="custom-save-btn" onClick={handleAddCustomer}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
