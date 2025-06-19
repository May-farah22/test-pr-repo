import React, { useState, useEffect } from 'react';
import '../styles/ChatPopup.css';
import userIcon from '../assets/images/Team-memeber-4.png';
import axios from 'axios';

const ChatPopup = ({ user, onClose }) => {
  const [discussion, setDiscussion] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDiscussion(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch discussion:', error);
      }
    };

    fetchDiscussion();
  }, []);

  const handleReply = async () => {
    if (!replyText.trim()) {
      alert('❌ Reply message is empty!');
      return;
    }

    if (!discussion || !discussion._id) {
      alert('❌ No discussion found.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/messages/${discussion._id}/reply`,
        { reply: replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setDiscussion(res.data);
      setReplyText('');
    } catch (err) {
      console.error('❌ Failed to send reply:', err);
      alert('Failed to send reply.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  if (!discussion) return <div className="chat-popup-modal-overlay">Chargement...</div>;

  return (
    <div className="chat-popup-modal-overlay">
      <div className="chat-popup-modal">
        <button className="chat-popup-close-btn" onClick={onClose}>✖</button>
        <div className="chat-popupt-container">
          {/* Zone des messages (scrollable) */}
          <div className="chat-popup-messages-content">
            <div className="chat-popup-message-meta">
              <div className="chat-popup-user-info">
                <div className="chat-popup-avatar-container">
                  <img 
                    src={userIcon} 
                    alt="User" 
                    className="chat-popup-user-icon"
                  />
                </div>
                <div>
                  <p className="chat-popup-user-name">{discussion.name}</p>
                  <p className="chat-popup-user-email">{discussion.email}</p>
                </div>
              </div>
            </div>

            <div className="chat-popup-message-replies">
              {discussion.replies?.map((reply, index) => {
                const isSupport = reply.sender === 'admin' || reply.sender === 'super-admin';
                const senderLabel = isSupport ? 'Support' : 'Vous';

                return (
                  <div
                    key={index}
                    className={`chat-popup-reply-item ${isSupport ? 'chat-popup-admin-reply' : 'chat-popup-user-reply'}`}
                  >
                    <strong>{senderLabel}:</strong> {reply.content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zone d'envoi (fixe en bas) */}
          <div className="chat-popup-send-area">
            <textarea
              className="chat-popup-reply-box"
              placeholder="Tapez votre réponse..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-popup-btn send" onClick={handleReply}>📤 Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;