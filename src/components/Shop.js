import React, { useState } from "react";
import "../styles/Shop.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Eaumicellaire from "../assets/images/toniques nuxe.jpg";
import Eaumicellaire1 from "../assets/images/tonique garnier.jpg";
import Eaumicellaire2 from "../assets/images/tonique roch.jpg";
import Eaumicellaire3 from "../assets/images/tonique vichy.jpg";
import gelnettoyant from "../assets/images/gel svr.jpg";
import gelnettoyant1 from "../assets/images/gelroch.jpg";
import gelnettoyant2 from "../assets/images/gel cetaphil tp.jpg";
import gelnettoyant3 from "../assets/images/gel bio.jpg";
import HydratingFaceCream from "../assets/images/creme hydr.jpg";
import HydratingFaceCream1 from "../assets/images/creme hyd.jpg";
import HydratingFaceCream2 from "../assets/images/creme hydra.jpg";
import HydratingFaceCream3 from "../assets/images/créme hydra.jpg";
import Serum from "../assets/images/serum roch.jpg";
import Serum1 from "../assets/images/serum ordi.jpg";
import Serum2 from "../assets/images/serum svr.jpg";
import Serum3 from "../assets/images/serum ses.jpg";


export const products  = [
  {
    id: 1,
    name: "Hydrating Face Cream",
    price: 31.384,
    oldPrice: 39.229,
    rating: 4.8,
    skinType: "Peau sèche",
    description: "SVR SEBIACLEAR Gel Moussant est un nettoyant sans savon pour les peaux grasses et sensibles. Il purifie et désincruste la peau sans la dessécher grâce à sa mousse onctueuse. Testé sur les peaux à tendance acnéique. Il élimine les impuretés et l’excès de sébum.",
    category: "Crèmes hydratantes",
    image: HydratingFaceCream1,
    Composition:"Ingrédiant:Avene Thermal Spring Water (Avene Aqua), Mineral Oil (Paraffinum Liquidum), Glycerin, Squalane, Dimethicone, Glyceryl Stearate, Behenyl Alcohol, Serine, Bht, Butyrospermum Parkii (Shea), Butter (Butyrospermum Parkii Butter), Carbomer, Ozokerite, Tetrasodium Edta, Triethanolamine, Water (Aqua), Xanthan Gum. "
  },
  {
    id: 2,
    name: "Hydrating Face Cream",
    price: 29.99,
    rating: 4.8,
    skinType: "Peau sèche",
    category: "Crèmes hydratantes",
    image: HydratingFaceCream,
  },
  {
    id: 3,
    name: "Hydrating Face Cream",
    price: 29.99,
    rating: 4.8,
    skinType: "tous",
    category: "Crèmes hydratantes",
    image: HydratingFaceCream2,
  },
  {
    id: 4,
    name: "Hydrating Face Cream",
    price: 29.99,
    rating: 4.8,
    skinType: "tous",
    category: "Crèmes hydratantes",
    image: HydratingFaceCream3,
  },
  {
    id: 5,
    name: "Gel nettoyant SVR",
    price: 39.99,
    rating: 4.9,
    skinType: "Peau grasse",
    category: "Nettoyants",
    image: gelnettoyant,
  },
  {
    id: 6,
    name: "Gel nettoyant La Roche-Posay",
    price: 39.99,
    rating: 4.9,
    skinType: "Peau grasse",
    category: "Nettoyants",
    image: gelnettoyant1,
  },
  {
    id: 7,
    name: "Gel nettoyant Bioderma",
    price: 39.99,
    rating: 4.9,
    skinType: "tous",
    category: "Nettoyants",
    image: gelnettoyant3,
  },
  {
    id: 8,
    name: "Gel nettoyant Cetaphil",
    price: 39.99,
    rating: 4.9,
    skinType: "tous",
    category: "Nettoyants",
    image: gelnettoyant2,
  },
  {
    id: 9,
    name: "Eaumicellaire Nuxe",
    price: 19.99,
    rating: 4.7,
    skinType: "Tous",
    category: "Toniques",
    image: Eaumicellaire,
  },
  {
    id: 10,
    name: "Eaumicellaire Garnier",
    price: 19.99,
    rating: 4.7,
    skinType: "Tous",
    category: "Toniques",
    image: Eaumicellaire1,
  },
  {
    id: 11,
    name: "Eaumicellaire La Roche",
    price: 19.99,
    rating: 4.7,
    skinType: "Tous",
    category: "Toniques",
    image: Eaumicellaire2,
  },
  {
    id: 12,
    name: "Eaumicellaire Vichy",
    price: 19.99,
    rating: 4.7,
    skinType: "Tous",
    category: "Toniques",
    image: Eaumicellaire3,
  },
  {
    id: 3,
    name: "Serum La Roche-Posay",
    price: 39.99,
    rating: 4.9,
    skinType: "Peau grasse",
    category: "Sérums",
    image: Serum,
  },
  {
    id: 13,
    name: "The Ordinary Serum",
    price: 39.99,
    rating: 4.9,
    skinType: "Peau grasse",
    category: "Sérums",
    image: Serum1,
  },
  {
    id: 14,
    name: "Serum SVR",
    price: 39.99,
    rating: 4.9,
    skinType: "Peau grasse",
    category: "Sérums",
    image: Serum2,
  },
  {
    id: 15,
    name: "Serum Sesderma Vitamine C",
    price: 39.99,
    rating: 4.9,
    skinType: "Peau grasse",
    category: "Sérums",
    image: Serum3,
  },
];

const Shop = () => {
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedSkinType, setSelectedSkinType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous les produits");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  // Extraire les catégories uniques depuis les produits
  const categories = ["Tous les produits", ...new Set(products.map(p => p.category))];

  const priceRanges = [
    { label: "Moins de 20€", min: 0, max: 20 },
    { label: "20€ - 30€", min: 20, max: 30 },
    { label: "30€ - 40€", min: 30, max: 40 },
    { label: "Plus de 40€", min: 40, max: Infinity },
  ];
 
  const skinTypes = [
    "Tous types de peau",
    "Peau sèche",
    "Peau grasse",
    "Peau sensible",
    "Peau mixte",
  ];

  const handlePriceFilter = (range) => {
    setSelectedPrice((prev) =>
      prev.includes(range) ? prev.filter((p) => p !== range) : [...prev, range]
    );
  };

  const handleSkinTypeFilter = (type) => {
    setSelectedSkinType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
  };

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      selectedPrice.length === 0 ||
      selectedPrice.some(
        (range) => product.price >= range.min && product.price <= range.max
      );

    const matchesSkinType =
      selectedSkinType.length === 0 ||
      selectedSkinType.includes(product.skinType) ||
      selectedSkinType.includes("Tous types de peau");

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === "Tous les produits" || 
      product.category === selectedCategory;

    return matchesPrice && matchesSkinType && matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
                  setCurrentPage(1); // Reset à la première page quand on change de catégorie
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
                checked={selectedPrice.some(r => r.label === range.label)}
                onChange={() => handlePriceFilter(range)}
              />
              {range.label}
            </label>
          ))}

          <h4>Type de peau</h4>
          {skinTypes.map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={selectedSkinType.includes(type)}
                onChange={() => handleSkinTypeFilter(type)}
              />
              {type}
            </label>
          ))}
        </div>

        <div className="shop-products">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link to={`/product/${product.id}`} className="product-link">
              <div key={`${product.id}-${product.name}`} className="shop-product-card">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>${product.price.toFixed(2)} ⭐ {product.rating}</p>
                <button type="submit" className="btn btn-primary add-to-cart">
                  Add to Cart 
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
        <button onClick={prevPage} disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          &gt;
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;