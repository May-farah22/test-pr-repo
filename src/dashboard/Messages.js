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
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/messages/all');
        setMessages(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.name?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'inbox') return matchesSearch && !message.archived;
    if (activeTab === 'archived') return matchesSearch && message.archived;
    return matchesSearch;
  });

  const handleReadMessage = (message) => {
    setSelectedMessage(message);
    setShowReplyBox(false);
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === message._id ? { ...msg, read: true } : msg
      )
    );
  };

 const handleSendReply = async () => {
  if (!replyMessage.trim()) {
    alert('❌ Reply message is empty!');
    return;
  }

  try {

    const token = localStorage.getItem('token'); // or sessionStorage if you used that
console.log('token',token)
    const res = await axios.post(
      `http://localhost:5000/api/messages/${selectedMessage._id}/reply`,
      { reply: replyMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updated = res.data;
console.log('updated',updated)
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === updated._id ? updated : msg
      )
    );

    setSelectedMessage(updated);
    setReplyMessage('');
    setShowReplyBox(false);
  } catch (err) {
    console.error('❌ Failed to send reply:', err);
    alert('Failed to send reply. Make sure you are logged in.');
  }
};


  const handleArchive = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id ? { ...msg, archived: !msg.archived } : msg
      )
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:5000/api/messages/${id}`);
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        if (selectedMessage?._id === id) setSelectedMessage(null);
        alert('✅ Message supprimé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('❌ Impossible de supprimer le message.');
      }
    }
  };

  return (
    <div className="messages-container-custom">
      <div className="messages-header-custom">
        <h1>Messages</h1>
        <div className="search-bar-custom">
          <FiSearch className="search-icon-custom" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="messages-content-custom">
        <div className="messages-sidebar-custom">
          <div className="tabs-custom">
            <button
              className={`tab-custom ${activeTab === 'inbox' ? 'active-custom' : ''}`}
              onClick={() => setActiveTab('inbox')}
            >
              Inbox
              <span className="badge-custom">
                {messages.filter((m) => !m.read && !m.archived).length}
              </span>
            </button>
            <button
              className={`tab-custom ${activeTab === 'archived' ? 'active-custom' : ''}`}
              onClick={() => setActiveTab('archived')}
            >
              Archived
            </button>
          </div>

          <div className="messages-list-custom">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className={`message-preview-custom ${!message.read ? 'unread-custom' : ''} ${selectedMessage?._id === message._id ? 'active-custom' : ''}`}
                onClick={() => handleReadMessage(message)}
              >
                <div className="message-header-custom">
                  <div className="sender-info-custom">
                    <FiUser className="sender-icon-custom" />
                    <span className="sender-name-custom">{message.name}</span>
                  </div>
                  <span className="message-date-custom">
                    <FiClock /> {new Date(message.createdAt).toLocaleString()}
                  </span>
                </div>
                <h4 className="message-subject-custom">{message.subject}</h4>
                <p className="message-excerpt-custom">
                  {message.message.substring(0, 60)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="message-detail-custom">
          {selectedMessage ? (
            <>
              <div className="message-detail-header-custom">
                <h2>{selectedMessage.subject}</h2>
                <div className="message-actions-custom">
                  <button
                    className="action-btn-custom reply-custom"
                    onClick={() => setShowReplyBox(!showReplyBox)}
                  >
                    <FaReply /> Reply
                  </button>
                  <button
                    className="action-btn-custom archive-custom"
                    onClick={() => handleArchive(selectedMessage._id)}
                  >
                    <FiArchive /> {selectedMessage.archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <button
                    className="action-btn-custom delete-custom"
                    onClick={() => handleDelete(selectedMessage._id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>

              <div className="message-meta-custom">
                <div className="sender-custom">
                  <FiUser /> {selectedMessage.name} ({selectedMessage.email})
                </div>
                <div className="date-custom">
                  <FiClock /> {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="message-body-custom">
                <p>{selectedMessage.message}</p>
              </div>

             {selectedMessage.replies.map((reply, index) => (
  <div key={index} className="reply-message-custom">
    <p>
      <strong>{reply.sender}:</strong> {reply.content}
      <br />
      <small>{new Date(reply.createdAt).toLocaleString()}</small>
    </p>
  </div>
))}


              {showReplyBox && (
                <div className="reply-box-custom">
                  <textarea
                    placeholder="Type your reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <button
                    className="send-reply-btn-custom"
                    onClick={handleSendReply}
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-message-selected-custom">
              <FiMail className="icon-custom" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
