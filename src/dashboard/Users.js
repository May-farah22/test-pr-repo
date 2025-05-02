import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiEdit, FiTrash2, FiSearch,  FiPlus, FiUserPlus } from 'react-icons/fi';
import "../styles/user.css";

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      orders: 12,
      joined: '2023-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Marie Lambert',
      email: 'marie.lambert@example.com',
      phone: '+33 6 98 76 54 32',
      orders: 5,
      joined: '2023-03-22',
      status: 'active'
    },
    {
      id: 3,
      name: 'Pierre Martin',
      email: 'pierre.martin@example.com',
      phone: '+33 6 45 67 89 01',
      orders: 0,
      joined: '2023-05-10',
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (customer) => {
    setEditingCustomer({...customer});
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const handleSave = () => {
    setCustomers(customers.map(customer =>
      customer.id === editingCustomer.id ? editingCustomer : customer
    ));
    setIsModalOpen(false);
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert('Please fill in all required fields');
      return;
    }

    setCustomers([...customers, {
      ...newCustomer,
      id: Math.max(...customers.map(c => c.id)) + 1,
      orders: 0,
      joined: new Date().toISOString().split('T')[0]
    }]);
    setIsAddModalOpen(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      status: 'active'
    });
  };

  return (
    <div className="custom-customers-container">
      <div className="custom-customers-header">
        <h1 className="custom-customers-title">Customers</h1>
        <div className="custom-customers-actions">
          <div className="custom-search-bar">
            <FiSearch className="custom-search-icon" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="custom-add-customer-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FiUserPlus className="custom-btn-icon" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      <div className="custom-customers-table-container">
        <table className="custom-customers-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Orders</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
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
                <td className="custom-orders-count">{customer.orders}</td>
                <td className="custom-joined-date">{customer.joined}</td>
                <td>
                  <span className={`custom-status-badge ${customer.status}`}>
                    {customer.status}
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
                    onClick={() => handleDelete(customer.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="custom-customer-modal">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h3>Edit Customer</h3>
              
            </div>
            <div className="custom-modal-body">
              <div className="custom-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editingCustomer?.name || ''}
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                />
              </div>
              <div className="custom-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editingCustomer?.email || ''}
                  onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                />
              </div>
              <div className="custom-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={editingCustomer?.phone || ''}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                />
              </div>
              <div className="custom-form-group">
                <label>Status</label>
                <select
                  value={editingCustomer?.status || 'active'}
                  onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="custom-modal-footer">
              <button className="custom-cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="custom-save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="custom-customer-modal">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h3>Add New Customer</h3>
              
            </div>
            <div className="custom-modal-body">
              <div className="custom-form-group">
                <label>Full Name <span className="custom-required">*</span></label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                />
              </div>
              <div className="custom-form-group">
                <label>Email <span className="custom-required">*</span></label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                />
              </div>
              <div className="custom-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                />
              </div>
              <div className="custom-form-group">
                <label>Status</label>
                <select
                  value={newCustomer.status}
                  onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="custom-modal-footer">
              <button 
                className="custom-cancel-btn" 
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="custom-save-btn" 
                onClick={handleAddCustomer}
                disabled={!newCustomer.name || !newCustomer.email}
              >
                <FiPlus className="custom-btn-icon" />
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
