import { useState } from 'react';
import "../styles/messages.css";
import { FaReply } from 'react-icons/fa'; // Import from Font Awesome
import { 
  FiMail, 
  FiUser, 
  FiClock, 
  FiSearch, 
  FiTrash2, 
  FiArchive,
} from 'react-icons/fi'; // Import from Feather Icons

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      subject: 'Question about my order',
      content: 'Hello, I would like to know when my order will be shipped...',
      date: '2023-06-15 14:30',
      read: false,
      archived: false
    },
    {
      id: 2,
      name: 'Marie Lambert',
      email: 'marie.lambert@example.com',
      subject: 'Product return request',
      content: 'I received the wrong product and would like to return it...',
      date: '2023-06-14 09:15',
      read: true,
      archived: false
    },
    {
      id: 3,
      name: 'Pierre Martin',
      email: 'pierre.martin@example.com',
      subject: 'Feedback about your service',
      content: 'I wanted to share my positive experience with your store...',
      date: '2023-06-12 16:45',
      read: true,
      archived: true
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');

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
      msg.id === message.id ? {...msg, read: true} : msg
    ));
  };

  const handleArchive = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? {...message, archived: !message.archived} : message
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(message => message.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
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
                key={message.id}
                className={`message-preview ${!message.read ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'active' : ''}`}
                onClick={() => handleReadMessage(message)}
              >
                <div className="message-header">
                  <div className="sender-info">
                    <FiUser className="sender-icon" />
                    <span className="sender-name">{message.name}</span>
                  </div>
                  <span className="message-date">
                    <FiClock /> {message.date}
                  </span>
                </div>
                <h4 className="message-subject">{message.subject}</h4>
                <p className="message-excerpt">{message.content.substring(0, 60)}...</p>
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
                    onClick={() => handleArchive(selectedMessage.id)}
                  >
                    <FiArchive /> {selectedMessage.archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(selectedMessage.id)}
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
                  <FiClock /> {selectedMessage.date}
                </div>
              </div>

              <div className="message-body">
                <p>{selectedMessage.content}</p>
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