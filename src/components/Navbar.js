import React, { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, User ,Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ()  => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalQuantity);
  }, []);

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
  const getDashboardLink = () => {
    if (!user?.role) return '/';
    switch (user.role) {
      case 'user':
        return '/user-dashboard';
      case 'seller':
        return '/seller';
      case 'admin':
      case 'super-admin':
        return '/dashboard';
      default:
        return '/';
    }
  };

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
            {isLoggedIn && (
              <Link to={getDashboardLink()}>Dashboard</Link>
            )}
          </div>

          {/* Icônes utilisateur */}
          <div className="navbar-icons">
            <button className="icon-btn">
              <Search className="icon mobile-search" />
            </button>
            <button className="icon-btn" onClick={() => navigate("/cart")}>
              <ShoppingBag className="icon" />
                {isLoggedIn && cartCount}
            </button>
            <Link to="/wishlist">
              <button className="icon-btn">
                <Heart className="icon" />
              </button>
            </Link>

            <div className="user-menu" ref={menuRef}>
              <button className="icon-btn" onClick={() => setShowMenu(!showMenu)}>
                <User className="icon" />
              </button>

              <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
                {isLoggedIn ? (
                  <>
                    <button className="dropdown-item" onClick={handleLogout}>Se déconnecter</button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="dropdown-item">Se connecter</Link>
                    <Link to="/signup" className="dropdown-item">S'inscrire</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
