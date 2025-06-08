import React, { useState, useEffect } from 'react';
import '../styles/ChatPopup.css';
import { FiUser, FiClock } from 'react-icons/fi';
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

  if (!discussion) return <div className="chat-modal-overlay">Chargement...</div>;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="chat-container">
          <div className="chat-content">
            <h2>{discussion.subject || 'Discussion avec support'}</h2>
            <div className="message-meta">
              <p><FiUser /> {discussion.name} ({discussion.email})</p>
              <p><FiClock /> {new Date(discussion.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="message-body">{discussion.message}</div>

            <div className="message-replies">
  {discussion.replies?.map((reply, index) => {
    const isSupport = reply.sender === 'admin' || reply.sender === 'super-admin';
    const senderLabel = isSupport ? 'Support' : 'Vous';

    return (
      <div
        key={index}
        className={`reply-item ${isSupport ? 'admin-reply' : 'user-reply'}`}
      >
        <strong>{senderLabel}:</strong> {reply.content}
      </div>
    );
  })}
</div>


            <textarea
              className="reply-box"
              placeholder="Tapez votre réponse..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn send" onClick={handleReply}>📤 Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
