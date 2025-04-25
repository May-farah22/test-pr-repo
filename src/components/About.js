import React from "react";
import Footer from "./Footer"; 
import Button from "./ui/Button";
import { Leaf, ShieldCheck, Award, Heart, Globe } from "lucide-react";
import "../styles/About.css";

// Import des images locales
import missionImage from "../assets/images/skii.avif";
import teamMember1 from "../assets/images/team-member-01.jpg";
import teamMember2 from "../assets/images/team2.jpg";
import teamMember3 from "../assets/images/Team-memeber-4.png";
import teamMember4 from "../assets/images/imagesteam3.jpeg";

const About = () => {
  const teamMembers = [
    { id: 1, img: teamMember1, name: "Sophie Martin", position: "Fondatrice & CEO" },
    { id: 2, img: teamMember2, name: "Jean Dupont", position: "Responsable R&D" },
    { id: 3, img: teamMember3, name: "Camille Leroy", position: "Responsable Marketing" },
    { id: 4, img: teamMember4, name: "Thomas Blanc", position: "Responsable Production" }
  ];

  return (
    <div className="about-container min-vh-100 d-flex flex-column bg-light">
      <main className="about-main flex-grow-1">
        {/* Hero Section */}
        <section className="about-hero-section py-5">
          <div className="about-hero-container container">
            <h6 className="about-hero-subtitle text-uppercase text-muted fw-medium">À PROPOS DE NOUS</h6>
            <h1 className="about-hero-title display-4 fw-bold">
              Authenticité, Excellence, <span className="about-hero-highlight">Innovation</span>
            </h1>
            <p className="about-hero-text lead text-secondary">
              Depuis notre création, nous avons pour mission de révolutionner 
              l'industrie cosmétique avec des produits naturels de haute qualité.
            </p>
            <div className="about-hero-cta d-flex gap-3 mt-4">
              <Button variant="dark" size="lg">Découvrir nos valeurs</Button>
              <Button variant="light" size="lg" className="btn-disabled">Notre équipe</Button>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="about-mission-section py-5 bg-white">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-md-6">
                <h5 className="about-mission-subtitle text-uppercase text-primary fw-medium mb-3">Notre Mission</h5>
                <h2 className="about-mission-main-title display-6 fw-bold text-dark mb-4">
                  Beauté authentique, respect de la nature
                </h2>
                <p className="about-mission-text text-secondary mb-4">
                  Nous créons des produits de beauté d'exception en harmonie avec la nature et votre peau.
                </p>
                <p className="about-mission-text text-secondary mb-5">
                  Notre approche allie l'excellence des ingrédients naturels et les avancées scientifiques.
                </p>
                <div className="about-mission-features row g-4">
                  <div className="col-6">
                    <div className="about-mission-feature-item d-flex align-items-center">
                      <div className="about-mission-feature-icon bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                        <Leaf size={24} className="text-primary" />
                      </div>
                      <span className="about-mission-feature-text text-secondary fw-medium">100% Naturel</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="about-mission-feature-item d-flex align-items-center">
                      <div className="about-mission-feature-icon bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                        <ShieldCheck size={24} className="text-primary" />
                      </div>
                      <span className="about-mission-feature-text text-secondary fw-medium">Certifié Bio</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 position-relative">
                <img 
                  src={missionImage} 
                  alt="Notre mission en images" 
                  className="about-mission-image img-fluid rounded shadow"
                />
                <div className="about-mission-vision-card position-absolute bottom-0 end-0 bg-primary p-4 rounded shadow-lg">
                  <p className="about-mission-vision-title text-white fw-bold mb-1">Notre vision 2030</p>
                  <p className="about-mission-vision-text text-white-80 small mb-0">Leader mondial des cosmétiques biologiques</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values-section py-5 bg-light">
          <div className="container">
            <div className="about-values-header text-center mb-5">
              <h5 className="about-values-subtitle text-uppercase text-primary fw-medium">Nos Valeurs</h5>
              <h2 className="about-values-main-title display-5 fw-bold text-dark">Ce qui nous guide au quotidien</h2>
            </div>
            <div className="about-values-grid row g-4">
              <div className="col-md-4">
                <div className="about-values-card p-4 bg-white rounded shadow-sm h-100">
                  <div className="about-values-card-icon bg-primary bg-opacity-10 rounded-circle p-3 mb-4" style={{width: '60px'}}>
                    <Heart size={28} className="text-primary" />
                  </div>
                  <h3 className="about-values-card-title h5 fw-bold mb-3">Passion</h3>
                  <p className="about-values-card-text text-secondary">
                    Nous mettons tout notre cœur dans la création de produits.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="about-values-card p-4 bg-white rounded shadow-sm h-100">
                  <div className="about-values-card-icon bg-primary bg-opacity-10 rounded-circle p-3 mb-4" style={{width: '60px'}}>
                    <Award size={28} className="text-primary" />
                  </div>
                  <h3 className="about-values-card-title h5 fw-bold mb-3">Excellence</h3>
                  <p className="about-values-card-text text-secondary">
                    Aucun compromis sur la qualité de nos formulations.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="about-values-card p-4 bg-white rounded shadow-sm h-100">
                  <div className="about-values-card-icon bg-primary bg-opacity-10 rounded-circle p-3 mb-4" style={{width: '60px'}}>
                    <Globe size={28} className="text-primary" />
                  </div>
                  <h3 className="about-values-card-title h5 fw-bold mb-3">Responsabilité</h3>
                  <p className="about-values-card-text text-secondary">
                    Beauté durable qui respecte la planète.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team-section py-5 bg-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 mb-5 mb-lg-0">
                <h5 className="about-team-subtitle text-uppercase text-primary fw-medium">Notre Équipe</h5>
                <h2 className="about-team-main-title display-5 fw-bold text-dark mb-4">
                  Rencontrez les esprits créatifs derrière notre marque
                </h2>
                <p className="about-team-text text-secondary mb-4">
                  Une équipe passionnée de scientifiques et d'experts en beauté naturelle.
                </p>
                <Button variant="dark" size="lg">Découvrir l'équipe</Button>
              </div>
              <div className="col-lg-7">
                <div className="about-team-grid">
                  <div className="row g-4">
                    {teamMembers.map((member) => (
                      <div className="col-6" key={member.id}>
                        <div className="about-team-member-card p-3 text-center">
                          <img 
                            src={member.img} 
                            alt={member.name}
                            className="about-team-member-img img-fluid rounded-circle mb-3"
                          />
                          <h4 className="about-team-member-name h5 mb-1">{member.name}</h4>
                          <p className="about-team-member-position text-muted small">{member.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats-section py-5 bg-primary text-white">
          <div className="container">
            <div className="about-stats-grid row text-center">
              <div className="col-md-3 col-6 mb-4 mb-md-0">
                <div className="about-stats-number display-4 fw-bold mb-2">10+</div>
                <div className="about-stats-label text-uppercase small">Ans d'expérience</div>
              </div>
              <div className="col-md-3 col-6 mb-4 mb-md-0">
                <div className="about-stats-number display-4 fw-bold mb-2">500+</div>
                <div className="about-stats-label text-uppercase small">Clients satisfaits</div>
              </div>
              <div className="col-md-3 col-6">
                <div className="about-stats-number display-4 fw-bold mb-2">50+</div>
                <div className="about-stats-label text-uppercase small">Produits naturels</div>
              </div>
              <div className="col-md-3 col-6">
                <div className="about-stats-number display-4 fw-bold mb-2">15+</div>
                <div className="about-stats-label text-uppercase small">Pays distribués</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;