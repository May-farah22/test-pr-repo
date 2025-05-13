import React, { useState } from 'react';
import '../styles/ChatPopup.css';
import { FiUser, FiClock } from 'react-icons/fi';

const initialMessages = [
  {
    id: 1,
    sender: "Alice",
    email: "alice@example.com",
    subject: "Commande non reçue",
    date: "12 mai 2025",
    preview: "Bonjour, je n'ai pas encore reçu ma commande...",
    content: "Bonjour, je vous écris car ma commande passée le 5 mai n'est toujours pas arrivée. Merci de vérifier.",
    replies: []
  },
  {
    id: 2,
    sender: "Bob",
    email: "bob@example.com",
    subject: "Demande de remboursement",
    date: "11 mai 2025",
    preview: "Je souhaite demander un remboursement...",
    content: "Bonjour, suite à un problème avec ma commande, je souhaite demander un remboursement.",
    replies: []
  },
];

const ChatPopup = ({ onClose }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessageId, setSelectedMessageId] = useState(initialMessages[0].id);
  const [replyText, setReplyText] = useState('');

  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);

  const handleReply = () => {
    if (replyText.trim()) {
      const updatedMessages = messages.map(msg =>
        msg.id === selectedMessageId
          ? { ...msg, replies: [...msg.replies, replyText] }
          : msg
      );
      setMessages(updatedMessages);
      setReplyText('');
    }
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="chat-container">
          <div className="chat-sidebar">
            <h3>Inbox</h3>
            <div className="message-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-item ${selectedMessageId === msg.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMessageId(msg.id)}
                >
                  <div className="message-header"><FiUser /> {msg.sender}</div>
                  <div className="message-date"><FiClock size={12} /> {msg.date}</div>
                  <div className="message-subject">{msg.subject}</div>
                  <div className="message-preview">{msg.preview}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-content">
            {selectedMessage && (
              <>
                <h2>{selectedMessage.subject}</h2>
                <div className="message-meta">
                  <p><FiUser /> {selectedMessage.sender} ({selectedMessage.email})</p>
                  <p><FiClock /> {selectedMessage.date}</p>
                </div>
                <div className="message-body">{selectedMessage.content}</div>

                {/* Affichage des réponses */}
                <div className="message-replies">
                  {selectedMessage.replies.map((reply, index) => (
                    <div key={index} className="reply-item">
                      <strong>Vous :</strong> {reply}
                    </div>
                  ))}
                </div>

                <div className="chat-actions">
                  <button className="btn reply">↩️ Reply</button>
                  <button className="btn archive">📁 Archive</button>
                  <button className="btn delete">🗑️ Delete</button>
                </div>

                <textarea
                  className="reply-box"
                  placeholder="Tapez votre réponse..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleReply()}
                />
                <button className="btn send" onClick={handleReply}>📤 Envoyer</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
