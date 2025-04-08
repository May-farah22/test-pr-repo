// Users.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/user.css';


function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Ici tu peux faire une requête API pour récupérer les utilisateurs
    const fetchUsers = async () => {
      const response = await fetch('/api/users'); // Remplace par ton API réelle
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>Gestion des utilisateurs</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <Link to={`/users/${user.id}`} className="btn-view">
                  Voir
                </Link>
                <button className="btn-disable">Désactiver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
