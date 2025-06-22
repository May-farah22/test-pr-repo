import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Shop.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedPriceLabels, setSelectedPriceLabels] = useState([]);
  const [selectedSkinType, setSelectedSkinType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous les produits");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  // ✅ Static skin types
  const skinTypes = [
    {
      _id: "1",
      type: "mixte",
      description: "Zone T grasse et joues sèches ou normales.",
    },
    {
      _id: "2",
      type: "normale",
      description: "Équilibrée, ni trop grasse ni trop sèche, peu de problèmes.",
    },
    {
      _id: "3",
      type: "sèche",
      description: "Peau rugueuse, terne, tiraillements, manque d'hydratation.",
    },
    {
      _id: "4",
      type: "grasse",
      description: "Brillance, pores dilatés, sujette aux imperfections.",
    },
    {
      _id: "5",
      type: "sensible",
      description: "Réagit facilement, rougeurs, picotements, démangeaisons.",
    },
    
    {
      _id: "all",
      type: "Tous types de peau",
      description: "Produits convenant à tout type de peau.",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["Tous les produits", ...new Set(products.map(p => p.category))];

  const priceRanges = [
    { label: "Moins de 20DT", min: 0, max: 20 },
    { label: "20DT - 30DT", min: 20, max: 30 },
    { label: "30DT - 40DT", min: 30, max: 40 },
    { label: "Plus de 40DT", min: 40, max: Infinity },
  ];

  const handlePriceFilter = (label) => {
    setSelectedPriceLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleSkinTypeFilter = (type) => {
    setSelectedSkinType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(item => item._id === product._id);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Produit ajouté au panier !");
  };

  const handleAddToWishlist = (product) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = existingWishlist.some(item => item._id === product._id);

    if (!isAlreadyInWishlist) {
      existingWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      alert("Produit ajouté à la wishlist !");
    } else {
      alert("Ce produit est déjà dans votre wishlist !");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      selectedPriceLabels.length === 0 ||
      priceRanges
        .filter((r) => selectedPriceLabels.includes(r.label))
        .some((range) => product.price >= range.min && product.price <= range.max);

    const matchesSkinType =
      selectedSkinType.length === 0 ||
      selectedSkinType.includes(product.skinType) ||
      selectedSkinType.includes("Tous types de peau");

    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tous les produits" || product.category === selectedCategory;

    return matchesPrice && matchesSkinType && matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="shop-container">
      <h1 className="shop-title">Notre Collection</h1>
      <p className="shop-subtitle">
        Découvrez notre collection de produits de beauté naturels et efficaces.
      </p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher des produits..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="shop-content">
        <div className="shop-filters">
          <h3>Filtres</h3>

          <h4>Catégories</h4>
          <ul>
            {categories.map(category => (
              <li
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </li>
            ))}
          </ul>

          <h4>Prix</h4>
          {priceRanges.map((range) => (
            <label key={range.label}>
              <input
                type="checkbox"
                checked={selectedPriceLabels.includes(range.label)}
                onChange={() => handlePriceFilter(range.label)}
              />
              {range.label}
            </label>
          ))}

          <h4>Type de peau</h4>
          {skinTypes.map((typeObj) => (
            <label key={typeObj._id}>
              <input
                type="checkbox"
                checked={selectedSkinType.includes(typeObj.type)}
                onChange={() => handleSkinTypeFilter(typeObj.type)}
              />
              {typeObj.type}
            </label>
          ))}
        </div>

        <div className="shop-products">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link to={`/product/${product._id}`} className="product-link" key={product._id}>
                <div className="shop-product-card">
                  <div
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(product);
                    }}
                  >
                    ❤️
                  </div>
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                  />
                  <h4>{product.name}</h4>
                  <p>{product.price.toFixed(2)} DT ⭐ {product.rating}</p>
                  <button
                    className="btn btn-primary add-to-cart"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucun produit ne correspond aux filtres sélectionnés.</p>
          )}
        </div>
      </div>

      <div className="pagination bottom-pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>&gt;</button>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
