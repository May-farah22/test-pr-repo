import React, { useState } from "react";
import chatIcon from "../assets/images/images.png";
import "../styles/Chatbot.css";

const Chatbot = () => {
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState([
  { from: "bot", text: "Bonjour 👋 Je suis GlowCare, comment puis-je vous aider ?" }
]);
const [input, setInput] = useState("");
const [isTyping, setIsTyping] = useState(false);

const toggleChat = () => setIsOpen(!isOpen);

const handleSend = () => {
  if (!input.trim()) return;
  const userMessage = { from: "user", text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput("");
  setIsTyping(true);
  setTimeout(() => {
    const reply = generateReply(input);
    setMessages(prev => [...prev, { from: "bot", text: reply }]);
    setIsTyping(false);
  }, 1000);
};

const generateReply = (text) => {
  const msg = text.toLowerCase();
  if (msg.includes("bonjour") || msg.includes("salut")) return "Bonjour 😊 Comment puis-je vous aider ?";
  if (msg.includes("produit")) return "Vous pouvez découvrir nos produits dans la section Shop 🛍️.";
  if (msg.includes("livraison")) return "La livraison est gratuite dès 50€, et prend 3-5 jours ouvrés.";
  if (msg.includes("retour")) return "Vous pouvez retourner les produits sous 30 jours.";
  return "Merci pour votre message ! Nous reviendrons vers vous sous peu.";
};

return (
  <div className="chatbot-popup-container">
    <div className={`chatbot-popup ${isOpen ? "open" : ""}`}>
      <div className="chatbot-header">
        GlowCare Assistant
        <button className="close-btn" onClick={toggleChat}>×</button>
      </div>
      <div className="chatbot-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from}`}>
            {msg.from === "bot" && (
               <img src={chatIcon} alt="Chat" />
            )}
            <span>{msg.text}</span>
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
             <img src={chatIcon} alt="Chat" />
            <span className="typing-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        )}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Votre message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>

    <button className="chatbot-icon-button" onClick={toggleChat}>
    <img src={chatIcon} alt="Chat" />

    </button>
  </div>
);
};

export default Chatbot;
