import React from "react";
import  { Facebook, Instagram, Twitter } from 'lucide-react';
import "../styles/Footer.css";


const Footer = () => {
  return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row">
          {/* Colonne 1 : GlowVare */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">GlowCare</h3>
            <p className="text-muted small mb-4">
              Discover your perfect beauty routine with personalized skincare recommendations.
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

          {/* Colonne 2 : Shop */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">Shop</h3>
            <ul className="list-unstyled">
              <li><a href="/all-products" className="text-muted small text-decoration-none">All Products</a></li>
              <li><a href="/skincare" className="text-muted small text-decoration-none">Skincare</a></li>
              <li><a href="/makeup" className="text-muted small text-decoration-none">Makeup</a></li>
              <li><a href="/hair-care" className="text-muted small text-decoration-none">Hair Care</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Help */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">Help</h3>
            <ul className="list-unstyled">
              <li><a href="/contact" className="text-muted small text-decoration-none">Contact Us</a></li>
              <li><a href="/faq" className="text-muted small text-decoration-none">FAQ</a></li>
              <li><a href="/shipping" className="text-muted small text-decoration-none">Shipping</a></li>
              <li><a href="/returns" className="text-muted small text-decoration-none">Returns</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h3 className="h5 mb-3">Newsletter</h3>
            <p className="text-muted small mb-3">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <div className="input-group">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter your email"
              />
              <button type="submit" className="btn btn-primary btn-subscribe btn-sm">
                Subscribe 
              </button>


            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top pt-4 mt-4 text-center">
          <p className="text-muted small">
            &copy; {new Date().getFullYear()} GlowCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
