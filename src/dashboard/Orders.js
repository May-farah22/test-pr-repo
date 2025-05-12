import { useState, useEffect } from "react";
import axios from "axios";
import { FiEye, FiEdit, FiSave } from 'react-icons/fi';
import "../styles/order.css";

const Orders = () => {
  const [commandes, setCommandes] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("Toutes");
  const [commandeEnEdition, setCommandeEnEdition] = useState(null);
  const [modalOuvert, setModalOuvert] = useState(false);

  useEffect(() => {
    const recupererCommandes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setCommandes(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error);
      }
    };
    recupererCommandes();
  }, []);

  const traduireStatut = (statut) => {
    switch (statut?.toLowerCase()) {
      case 'processing':
      case 'en traitement':
      case 'en cours':
        return 'En cours';
      case 'shipped':
      case 'expédié':
      case 'expédiée':
        return 'Expédiée';
      case 'completed':
      case 'terminé':
      case 'terminée':
        return 'Terminé';
      default:
        return statut;
    }
  };

  const obtenirClasseStatut = (statut) => {
    switch (traduireStatut(statut)) {
      case 'En cours': return 'orders-status--en-traitement';
      case 'Expédiée': return 'orders-status--expedie';
      case 'Terminé': return 'orders-status--termine';
      default: return '';
    }
  };

  const gererClicEditer = (commande) => {
    setCommandeEnEdition({ ...commande });
    setModalOuvert(true);
  };

  const gererChangementInput = (e) => {
    const { name, value } = e.target;
    setCommandeEnEdition((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const sauvegarderModification = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${commandeEnEdition._id}`, commandeEnEdition);
      setCommandes(commandes.map(c => c._id === commandeEnEdition._id ? commandeEnEdition : c));
      setModalOuvert(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const commandesFiltrees = commandes.filter((commande) =>
    filtreStatut === "Toutes" || traduireStatut(commande.status) === filtreStatut
  );

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1 className="orders-title">Commandes</h1>
        <div className="orders-filters">
          <select className="orders-filter" value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
            <option value="Toutes">Toutes les commandes</option>
            <option value="Terminé">Terminée</option>
            <option value="En cours">En cours</option>
            <option value="Expédiée">Expédiée</option>
          </select>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Client</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Total (DT)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandesFiltrees.map((commande) => (
            <tr key={commande._id} className="orders-row">
              <td className="orders-id">#{commande._id?.slice(-4).toUpperCase()}</td>
              <td className="orders-customer">{commande.customer || commande.userId}</td>
              <td className="orders-date">{commande.date}</td>
              <td className="orders-status">
                <span className={`orders-status-badge ${obtenirClasseStatut(commande.status)}`}>
                  {traduireStatut(commande.status)}
                </span>
              </td>
              <td className="orders-total"> {Number(order.total)?.toFixed(2)} DT</td>
              <td className="orders-actions">
                <div className="orders-actions-container">
                  <button className="orders-action-btn orders-action-btn--view">
                    <FiEye className="orders-action-icon" />
                    <span>Voir</span>
                  </button>
                  <button
                    className="orders-action-btn orders-action-btn--edit"
                    onClick={() => gererClicEditer(commande)}
                  >
                    <FiEdit className="orders-action-icon" />
                    <span>Modifier</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOuvert && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>Modifier la commande #{commandeEnEdition._id?.slice(-4).toUpperCase()}</h3>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  name="customer"
                  disabled
                  value={editingOrder.userId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  disabled
                  value={editingOrder.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Statut</label>
                <select
                  name="status"
                  value={commandeEnEdition.status}
                  onChange={gererChangementInput}
                >
                  <option value="En cours">En cours</option>
                  <option value="Expédiée">Expédiée</option>
                  <option value="Terminé">Terminée</option>
                </select>
              </div>

              <div className="form-group">
                <label>Total (DT)</label>
                <input
                  type="number"
                  name="total"
                  value={commandeEnEdition.total}
                  onChange={gererChangementInput}
                  step="0.01"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setModalOuvert(false)} className="modal-cancel-btn">
                Annuler
              </button>
              <button onClick={sauvegarderModification} className="modal-save-btn">
                <FiSave /> Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
