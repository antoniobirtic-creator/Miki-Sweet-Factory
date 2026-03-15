import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import SEO from "../components/Common/SEO";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./About.css";

const About = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await api.getSingle("pages", 2977);
        setPageData(data);

        // Extract images from content for Lightbox
        if (data.content && data.content.rendered) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.content.rendered, "text/html");
          const images = Array.from(doc.querySelectorAll("img")).map(img => img.src);
          setGalleryImages(images.map(src => ({ src })));
        }
      } catch (err) {
        console.error("Greška pri dohvaćanju O nama stranice:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) 
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border" style={{ color: "#ff2d85" }} role="status">
          <span className="visually-hidden">Učitavanje...</span>
        </div>
      </div>
    );
  if (!pageData) return <div className="error-container">Stranica nije pronađena.</div>;

  const heroImage = pageData._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/placeholder.jpg";

  return (
    <main className="about-page pb-5">
      <SEO 
        title={`${pageData.title.rendered} | Miki Sweet Factory`} 
        description="Saznajte više o Miki Sweet Factory, našoj priči, tradiciji i ljubavi prema slasticama."
        image={heroImage}
        url="/o-nama"
      />

      {/* Hero Section */}
      <section 
        className="about-hero position-relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="container position-relative h-100 d-flex flex-column justify-content-center text-center">
          <div className="hero-content text-white mt-5">
            <h1 className="display-3 fw-bold mb-3" dangerouslySetInnerHTML={{ __html: pageData.title.rendered }} />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mt-5 pt-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <article 
              className="about-content mb-5"
              dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
              onClick={(e) => {
                if (e.target.tagName === "IMG") {
                  const clickedSrc = e.target.src;
                  const idx = galleryImages.findIndex(img => img.src === clickedSrc);
                  if (idx !== -1) {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section text-center py-5 mt-5">
        <div className="container">
          <div className="cta-box p-5 rounded-4 shadow-sm mx-auto">
            <h2 className="display-6 fw-bold mb-4 brand-text">Želite li i vi unikatnu tortu za vašu prigodu?</h2>
            <p className="lead text-muted mb-4">
              Javite nam se s povjerenjem i dopustite da vaše slatke snove pretvorimo u stvarnost.
            </p>
            <Link to="/kontakt" className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow-sm btn-about-cta">
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {galleryImages.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={galleryImages}
          index={lightboxIndex}
        />
      )}
    </main>
  );
};

export default About;
