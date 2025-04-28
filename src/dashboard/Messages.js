import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/messages.css";
import { FaReply } from 'react-icons/fa'; 
import { 
  FiMail, 
  FiUser, 
  FiClock, 
  FiSearch, 
  FiTrash2, 
  FiArchive,
} from 'react-icons/fi'; 

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');

  // 🔥 Charger les messages depuis l'API backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/messages');
        setMessages(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          message.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'inbox') return matchesSearch && !message.archived;
    if (activeTab === 'archived') return matchesSearch && message.archived;
    return matchesSearch;
  });

  const handleReadMessage = (message) => {
    setSelectedMessage(message);
    setMessages(messages.map(msg => 
      msg._id === message._id ? {...msg, read: true} : msg
    ));
  };

  const handleArchive = (id) => {
    setMessages(messages.map(message => 
      message._id === id ? {...message, archived: !message.archived} : message
    ));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:5000/api/messages/${id}`);
        setMessages(messages.filter(message => message._id !== id));
        if (selectedMessage?._id === id) setSelectedMessage(null);
        alert('✅ Message supprimé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('❌ Impossible de supprimer le message.');
      }
    }
  };


  return (
    <div className="messages-container">
      <div className="messages-header">
        <h1>Messages</h1>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="messages-content">
        <div className="messages-sidebar">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => setActiveTab('inbox')}
            >
              Inbox
              <span className="badge">
                {messages.filter(m => !m.read && !m.archived).length}
              </span>
            </button>
            <button 
              className={`tab ${activeTab === 'archived' ? 'active' : ''}`}
              onClick={() => setActiveTab('archived')}
            >
              Archived
            </button>
          </div>

          <div className="messages-list">
            {filteredMessages.map(message => (
              <div 
                key={message._id}
                className={`message-preview ${!message.read ? 'unread' : ''} ${selectedMessage?._id === message._id ? 'active' : ''}`}
                onClick={() => handleReadMessage(message)}
              >
                <div className="message-header">
                  <div className="sender-info">
                    <FiUser className="sender-icon" />
                    <span className="sender-name">{message.name}</span>
                  </div>
                  <span className="message-date">
                    <FiClock /> {new Date(message.createdAt).toLocaleString()}
                  </span>
                </div>
                <h4 className="message-subject">{message.subject}</h4>
                <p className="message-excerpt">{message.message.substring(0, 60)}...</p>
              </div>
            ))}
          </div>
        </div>

        <div className="message-detail">
          {selectedMessage ? (
            <>
              <div className="message-detail-header">
                <h2>{selectedMessage.subject}</h2>
                <div className="message-actions">
                  <button className="action-btn reply">
                    <FaReply /> Reply
                  </button>
                  <button 
                    className="action-btn archive"
                    onClick={() => handleArchive(selectedMessage._id)}
                  >
                    <FiArchive /> {selectedMessage.archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(selectedMessage._id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>

              <div className="message-meta">
                <div className="sender">
                  <FiUser /> {selectedMessage.name} ({selectedMessage.email})
                </div>
                <div className="date">
                  <FiClock /> {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="message-body">
                <p>{selectedMessage.message}</p>
              </div>
            </>
          ) : (
            <div className="no-message-selected">
              <FiMail className="icon" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
