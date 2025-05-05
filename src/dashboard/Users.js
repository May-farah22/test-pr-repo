import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiEdit, FiTrash2, FiSearch, FiPlus, FiUserPlus } from 'react-icons/fi';
import "../styles/user.css";

const Vendors = () => {
  const [vendors, setVendors] = useState([
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
  const [editingVendor, setEditingVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  });

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (vendor) => {
    setEditingVendor({ ...vendor });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(vendor => vendor.id !== id));
    }
  };

  const handleSave = () => {
    setVendors(vendors.map(vendor =>
      vendor.id === editingVendor.id ? editingVendor : vendor
    ));
    setIsModalOpen(false);
  };

  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.email) {
      alert('Please fill in all required fields');
      return;
    }

    setVendors([...vendors, {
      ...newVendor,
      id: Math.max(...vendors.map(v => v.id)) + 1,
      orders: 0,
      joined: new Date().toISOString().split('T')[0]
    }]);
    setIsAddModalOpen(false);
    setNewVendor({
      name: '',
      email: '',
      phone: '',
      status: 'active'
    });
  };

  return (
    <div className="custom-customers-container">
      <div className="custom-customers-header">
        <h1 className="custom-customers-title">Vendors</h1>
        <div className="custom-customers-actions">
          <div className="custom-search-bar">
            <FiSearch className="custom-search-icon" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="custom-add-customer-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FiUserPlus className="custom-btn-icon" />
            <span>Add Vendor</span>
          </button>
        </div>
      </div>

      <div className="custom-customers-table-container">
        <table className="custom-customers-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Contact</th>
              <th>Orders</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map(vendor => (
              <tr key={vendor.id}>
                <td className="custom-customer-info">
                  <div className="custom-customer-avatar">
                    <FiUser />
                  </div>
                  <div>
                    <p className="custom-customer-name">{vendor.name}</p>
                    <p className="custom-customer-email">{vendor.email}</p>
                  </div>
                </td>
                <td>
                  <div className="custom-contact-info">
                    <FiMail className="custom-contact-icon" />
                    <span>{vendor.email}</span>
                  </div>
                  <div className="custom-contact-info">
                    <FiPhone className="custom-contact-icon" />
                    <span>{vendor.phone}</span>
                  </div>
                </td>
                <td className="custom-orders-count">{vendor.orders}</td>
                <td className="custom-joined-date">{vendor.joined}</td>
                <td>
                  <span className={`custom-status-badge ${vendor.status}`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="custom-actions">
                  <button
                    className="custom-action-btn custom-edit"
                    onClick={() => handleEdit(vendor)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="custom-action-btn custom-delete"
                    onClick={() => handleDelete(vendor.id)}
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
              <h3>Edit Vendor</h3>
            </div>
            <div className="custom-modal-body">
              <div className="custom-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editingVendor?.name || ''}
                  onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })}
                />
              </div>
              <div className="custom-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editingVendor?.email || ''}
                  onChange={(e) => setEditingVendor({ ...editingVendor, email: e.target.value })}
                />
              </div>
              <div className="custom-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={editingVendor?.phone || ''}
                  onChange={(e) => setEditingVendor({ ...editingVendor, phone: e.target.value })}
                />
              </div>
              <div className="custom-form-group">
                <label>Status</label>
                <select
                  value={editingVendor?.status || 'active'}
                  onChange={(e) => setEditingVendor({ ...editingVendor, status: e.target.value })}
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
              <h3>Add New Vendor</h3>
            </div>
            <div className="custom-modal-body">
              <div className="custom-form-group">
                <label>Full Name <span className="custom-required">*</span></label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                />
              </div>
              <div className="custom-form-group">
                <label>Email <span className="custom-required">*</span></label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                />
              </div>
              <div className="custom-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={newVendor.phone}
                  onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                />
              </div>
              <div className="custom-form-group">
                <label>Status</label>
                <select
                  value={newVendor.status}
                  onChange={(e) => setNewVendor({ ...newVendor, status: e.target.value })}
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
                onClick={handleAddVendor}
                disabled={!newVendor.name || !newVendor.email}
              >
                <FiPlus className="custom-btn-icon" />
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;
