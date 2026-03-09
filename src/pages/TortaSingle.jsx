import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { api } from "../services/api";
import { FaClock, FaTag, FaRulerCombined, FaChevronLeft, FaWhatsapp } from "react-icons/fa";
import "./TortaSingle.css";

const TortaSingle = () => {
  const { slug } = useParams();
  const [torta, setTorta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);

  // Lightbox state for gallery
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchTorta = async () => {
      try {
        const dataArray = await api.getCustomType("torte", `?slug=${slug}`);
        const data = dataArray[0];
        setTorta(data);

        // Dohvati kontakt broj za WhatsApp
        try {
          const pagesData = await api.getSingle("pages", 1184);
          if (pagesData && pagesData.acf) {
            setInfo(pagesData.acf);
          }
        } catch (infoErr) {
          console.error("Greška pri dohvaćanju kontakt info:", infoErr);
        }

        // Prepare gallery slides from ACF data
        const mainImg = data._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const rawGallery = data.acf?.photo_gallery?.galerija_torti || [];
        const galleryImgs = Array.isArray(rawGallery) ? rawGallery.flat() : [];

        const allSlides = [];
        if (mainImg) allSlides.push({ src: mainImg });

        galleryImgs.forEach((img) => {
          const src = img.full_image_url || img.url || img.source_url;
          if (src && typeof src === "string" && src !== "") {
            allSlides.push({ src: src });
          }
        });

        // Optional: Remove duplicates if main image was also in gallery
        const uniqueSlides = Array.from(new Set(allSlides.map(s => s.src)))
          .map(src => ({ src }));

        setSlides(uniqueSlides);
      } catch (err) {
        console.error("Greška pri dohvaćanju torte:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTorta();
    }
  }, [slug]);

  if (loading) return <div className="loader-container">Učitavanje...</div>;
  if (!torta) return <div className="error-container">Torta nije pronađena.</div>;

  const handleOpenLightbox = (index) => {
    setImageIndex(index);
    setOpen(true);
  };

  return (
    <main className="torta-single-page pt-5 mt-5">
      <div className="container pb-5">
        <Link to="/torte" className="btn-back mb-4 d-inline-flex align-items-center">
          <FaChevronLeft className="me-2" /> Povratak na torte
        </Link>

        <div className="row g-5">
          {/* Ljeva strana: Glavna slika i Galerija */}
          <section className="col-lg-6">
            <div className="main-image-wrapper mb-4 shadow-sm" onClick={() => slides.length > 0 && handleOpenLightbox(0)}>
              <img
                src={slides[0]?.src || "/placeholder.jpg"}
                alt={torta.title.rendered}
                className="img-fluid rounded-4 main-cake-img"
              />
            </div>

            {/* Thumbnails Galerija */}
            {slides.length > 1 && (
              <div className="gallery-thumbnails d-flex gap-2 overflow-auto pb-2">
                {slides.slice(1).map((slide, idx) => (
                  <div
                    key={idx}
                    className="thumbnail-wrapper rounded-3 overflow-hidden shadow-sm"
                    onClick={() => handleOpenLightbox(idx + 1)}
                  >
                    <img src={slide.src} alt={`Galerija ${idx + 1}`} className="img-fluid" />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Desna strana: Informacije */}
          <section className="col-lg-6">
            <div className="torta-info-card p-4 p-md-5 bg-white shadow-sm rounded-4 h-100">
              <h1 className="display-5 fw-bold mb-3 brand-text">{torta.title.rendered}</h1>

              <div className="price-tag mb-4">
                <span className="fs-3 fw-bold">
                  {torta.acf.cijena_po_komadu ? `${torta.acf.cijena_po_komadu} €` : "Cijena na upit"}
                </span>
                <span className="text-muted ms-2 small">/ komad</span>
              </div>

              <div className="description-box mb-5">
                <p className="lead text-muted">{torta.acf.kratki_opis}</p>
                {torta.content && torta.content.rendered && (
                  <div
                    className="long-description mt-3"
                    dangerouslySetInnerHTML={{ __html: torta.content.rendered }}
                  />
                )}
              </div>

              <hr className="my-4 opacity-25" />

              <div className="specifications row g-3 mb-5">
                {torta.acf.vrijeme_izrade && (
                  <div className="col-sm-6 d-flex align-items-center spec-item">
                    <FaClock className="spec-icon me-3" />
                    <div>
                      <small className="text-muted d-block text-uppercase">Vrijeme izrade</small>
                      <span className="fw-semibold">{torta.acf.vrijeme_izrade}</span>
                    </div>
                  </div>
                )}
                {torta.acf.velicina_torte && (
                  <div className="col-sm-6 d-flex align-items-center spec-item">
                    <FaRulerCombined className="spec-icon me-3" />
                    <div>
                      <small className="text-muted d-block text-uppercase">Preporučena veličina</small>
                      <span className="fw-semibold">{torta.acf.velicina_torte}</span>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/kontakt#slatki-upit"
                className="btn btn-primary btn-lg rounded-pill w-100 shadow-sm btn-order-single text-white mb-3"
              >
                Pošalji upit za tortu
              </Link>

              <a
                href={`https://wa.me/${info?.whatsapp ? String(info.whatsapp).replace(/\D/g, "") : "385958718497"}?text=${encodeURIComponent(`Pozdrav, zanima me torta: ${torta.title.rendered}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-lg rounded-pill w-100 shadow-sm text-white d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
              >
                <FaWhatsapp size={24} />
                Pošalji upit WhatsApp-om
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox is now local to this single page */}
      {slides.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={imageIndex}
        />
      )}
    </main>
  );
};

export default TortaSingle;
