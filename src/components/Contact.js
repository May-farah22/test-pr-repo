import React, { useState } from "react";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Clock,Send } from "lucide-react"; 
import "../styles/Contact.css"; // Chemin corrigé pour le fichier CSS
import axios from "axios";

  const Contact = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value});
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("formData",formData);
      
      try {
        const res = await axios.post('http://localhost:5000/api/messages', formData);
        if (res.status === 201) {
          alert("✅ Message envoyé avec succès !");
          setFormData({ name: "", email: "", subject: "", message: "" });
        }
      } catch (error) {
        console.error(error);
        alert("❌ Erreur lors de l'envoi du message.");
      }
    };
  
return (
    <div className="min-vh-100 d-flex flex-column bg-light">

      <main className="flex-grow-1">
    {/* Hero Section */}
<section className="hero-section">
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <h1 className="display-4 fw-bold mb-4">Contactez-nous</h1>
    <p className="lead">
      Notre équipe est là pour répondre à toutes vos questions.
    </p>
  </div>
</section>


{/* Contact Cards Section */}
<section className="contact-cards-section py-5">
  <div className="container">
    <div className="row g-4">
      {/* Adresse */}
      <div className="col-md-6 col-lg-3">
        <div className="contact-card shadow-sm">
          <div className="card-body text-center">
            <div className="contact-card-icon">
              <MapPin className="icon" size={24} />
            </div>
            <h3 className="h5 fw-bold mb-3">Notre Adresse</h3>
            <p className="text-muted mb-0">
              123 Avenue des Champs-Élysées<br />
              75008 Paris, France
            </p>
          </div>
        </div>
      </div>

      {/* Téléphone */}
      <div className="col-md-6 col-lg-3">
        <div className="contact-card shadow-sm">
          <div className="card-body text-center">
            <div className="contact-card-icon">
              <Phone className="icon" size={24} />
            </div>
            <h3 className="h5 fw-bold mb-3">Téléphone</h3>
            <p className="text-muted mb-1">+33 1 23 45 67 89</p>
            <p className="text-muted mb-0">Service client: 0800 123 456</p>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="col-md-6 col-lg-3">
        <div className="contact-card shadow-sm">
          <div className="card-body text-center">
            <div className="contact-card-icon">
              <Mail className="icon" size={24} />
            </div>
            <h3 className="h5 fw-bold mb-3">Email</h3>
            <p className="text-muted mb-1">info@glowvare.com</p>
            <p className="text-muted mb-0">support@glowvare.com</p>
          </div>
        </div>
      </div>

      {/* Heures d'Ouverture */}
      <div className="col-md-6 col-lg-3">
        <div className="contact-card shadow-sm">
          <div className="card-body text-center">
            <div className="contact-card-icon">
              <Clock className="icon" size={24} />
            </div>
            <h3 className="h5 fw-bold mb-3">Heures d'Ouverture</h3>
            <p className="text-muted mb-1">Lun - Ven: 9h00 - 18h00</p>
            <p className="text-muted mb-0">Sam: 10h00 - 16h00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Contact Form and Map Section */}
<section className="py-5 contact-map-section">
  <div className="container">
    <div className="row g-5">
      <div className="col-lg-6">
        <h2 className="h3 fw-bold mb-4">Envoyez-nous un message</h2>
        <p className="text-muted mb-4">
          Nous sommes impatients de vous entendre. Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Nom</label>
              <input type="text" className="form-control" id="name"  required value={formData.name} onChange={handleChange} placeholder="Votre nom" />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required value={formData.email} onChange={handleChange} placeholder="votre@email.com" />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Sujet</label>
            <input type="text" className="form-control" id="subject" required value={formData.subject} onChange={handleChange} placeholder="Sujet de votre message" />
          </div>
          
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              required value={formData.message} onChange={handleChange}
              placeholder="Votre message..."
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary form-button">
            Envoyer <Send size={16} className="ms-2" />
          </button>
        </form>
      </div>

      <div className="col-lg-6">
  <h2 className="h3 fw-bold mb-4">Notre emplacement</h2>
  <p className="text-muted mb-4">
    Venez nous rendre visite dans notre boutique-concept au cœur de Paris.
  </p>
  
  <div className="map-container">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.3354330160472316!3d48.87456857928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e38f817b573%3A0x48d69c30470e7aeb!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sen!2sfr!4v1632910416405!5m2!1sen!2sfr" 
      allowFullScreen
      loading="lazy"
      title="GlowCare Store Location"
    ></iframe>
  </div>
</div>
    </div>
  </div>
</section>

 {/* FAQ Section */}
        <section className="faq-section py-5">
          <div className="container">
            <h2 className="faq-title text-center mb-5">Questions fréquentes sur les soins de la peau</h2>
            
            <div className="faq-grid">
              {/* Question 1 */}
              <div className="faq-card">
                <h3 className="faq-question">Quel type de soin convient à ma peau ?</h3>
                <p className="faq-answer">
                Cela dépend de votre type de peau (sèche, grasse, mixte ou sensible). Vous pouvez utiliser notre test de peau pour obtenir des recommandations personnalisées.
                </p>
              </div>

              {/* Question 2 */}
              <div className="faq-card">
                <h3 className="faq-question">Quelle est la différence entre une crème hydratante et un sérum ?</h3>
                <p className="faq-answer">
                Le sérum est plus concentré en actifs et pénètre en profondeur, tandis que la crème hydratante protège la barrière cutanée en surface.
                </p>
              </div>

              {/* Question 3 */}
              <div className="faq-card">
                <h3 className="faq-question">Quel est le délai de livraison ?</h3>
                <p className="faq-answer">
                  Les délais de livraison varient selon votre localisation. En général, 2-5 jours ouvrables en France métropolitaine.
                </p>
              </div>

              {/* Question 4 */}
              <div className="faq-card">
                <h3 className="faq-question">Vos produits sont-ils testés sur les animaux ?</h3>
                <p className="faq-answer">
                  Non, tous nos produits sont cruelty-free et certifiés par Leaping Bunny et PETA.
                </p>
              </div>
            </div>
          </div>
        </section>
        
      </main>

      {/* Footer Section avec un background distinct */}
      <div >
        <Footer />
      </div>
    </div>
  );
};

export default Contact;

