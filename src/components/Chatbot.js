import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! 👋 Comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const generateBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes("bonjour") || msg.includes("salut")) {
      return "Bonjour ! 😊 Comment puis-je vous assister aujourd'hui ?";
    } else if (msg.includes("produit") || msg.includes("recommandation")) {
      return "Vous pouvez explorer nos produits dans la section Shop 🛍️. Avez-vous besoin d'aide pour trouver quelque chose en particulier ?";
    } else if (msg.includes("livraison") || msg.includes("expédition")) {
      return "Nous offrons la livraison gratuite pour les commandes supérieures à 50€ 🚚. La livraison standard prend de 3 à 5 jours ouvrés.";
    } else if (msg.includes("retour") || msg.includes("remboursement")) {
      return "Nous avons une politique de retour de 30 jours. Faites-le moi savoir si vous souhaitez commencer une demande de retour.";
    } else if (msg.includes("contact") || msg.includes("support")) {
      return "Vous pouvez contacter notre équipe de support via la page Contact ou par email à support@glowcare.com 📩.";
    } else if (msg.includes("promotion") || msg.includes("réduction")) {
      return "Nous proposons régulièrement des promotions ! 💸 Abonnez-vous à notre newsletter pour rester informé(e).";
    } else if (msg.includes("type") && msg.includes("peau")) {
      return "Nous proposons des recommandations de soins de la peau personnalisées ! Essayez notre quiz peau dans la section Shop 💆‍♀️.";
    } else {
      return "Merci pour votre message ! Nous reviendrons vers vous sous peu 😊.";
    }
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    const newMessages = [...messages, { from: "user", text: userMessage }];

    const botReply = generateBotResponse(userMessage);
    const response = { from: "bot", text: botReply };

    setMessages([...newMessages, response]);
    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">Assistant GlowCare 💬</div>
          <div className="chatbox-body">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.from === "bot" ? "bot" : "user"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <Form.Control
              type="text"
              value={userInput}
              placeholder="Tapez votre message..."
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button variant="dark" onClick={handleSend}>
              Envoyer
            </Button>
          </div>
        </div>
      )}
      <Button variant="secondary" className="chat-toggle" onClick={handleToggle}>
        {isOpen ? "×" : "💬"}
      </Button>
    </div>
  );
};

export default Chatbot;
