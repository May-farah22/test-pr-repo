import React from "react";
import { Facebook, Instagram, Twitter } from 'lucide-react';
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row">
          {/* Colonne 1 : GlowCare */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">GlowCare</h3>
            <p className="text-muted small mb-4">
              Découvrez votre routine beauté idéale grâce à des recommandations de soins personnalisées.
            </p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-decoration-none text-dark">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-decoration-none text-dark">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-decoration-none text-dark">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Boutique */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">Boutique</h3>
            <ul className="list-unstyled">
              <li><a href="/all-products" className="text-muted small text-decoration-none">Tous les produits</a></li>
              <li><a href="/skincare" className="text-muted small text-decoration-none">Soins de la peau</a></li>
              <li><a href="/hair-care" className="text-muted small text-decoration-none">Soins capillaires</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Aide */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">Aide</h3>
            <ul className="list-unstyled">
              <li><a href="/contact" className="text-muted small text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-muted small text-decoration-none">A propos</a></li>
              <li><a href="/shipping" className="text-muted small text-decoration-none">Livraison</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Localisation */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">Notre localisation</h3>
            <div className="map-responsive">
              <iframe
                title="GlowCare Localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999651288949!2d2.2922926156743896!3d48.85884407928748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdeb456a5c3%3A0x6bbd7b9cba4cb0f4!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1713815526814!5m2!1sen!2sfr"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top pt-4 mt-4 text-center">
          <p className="text-muted small">
            &copy; {new Date().getFullYear()} GlowCare. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
