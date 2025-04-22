import React, { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, User ,Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ()  => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="logo-text">GlowCare</Link>
          </div>

          {/* Liens de navigation */}
          <div className="navbar-links">
            <Link to="/">Accueil</Link>
            <Link to="/shop">Boutique</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">À Propos</Link>
          </div>

          {/* Icônes utilisateur */}
          <div className="navbar-icons">
            <button className="icon-btn">
              <Search className="icon mobile-search" />
            </button>
            <button className="icon-btn">
              <ShoppingBag className="icon" />
            </button>
            <button className="icon-btn">
              <Heart className="icon" />
            </button>


            <div className="user-menu" ref={menuRef}>
  <button className="icon-btn" onClick={() => setShowMenu(!showMenu)}>
    <User className="icon" />
  </button>

  <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
  <Link to="/select-role?action=signin" className="dropdown-item">Se connecter</Link>
  <Link to="/select-role?action=signup" className="dropdown-item">S'inscrire</Link>
</div>

</div>

          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
