import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { api } from "../services/api";
import SEO from "../components/Common/SEO";
import { FaBoxes, FaClipboardList, FaChevronLeft, FaWhatsapp } from "react-icons/fa";
import "./SingleKolac.css";

const SingleKolac = () => {
  const { slug } = useParams();
  const [kolac, setKolac] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);

  // Lightbox state for gallery
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchKolac = async () => {
      try {
        const dataArray = await api.getCustomType("kolaci", `?slug=${slug}`);
        const data = dataArray[0];
        setKolac(data);

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
        const rawGallery = data.acf?.photo_gallery?.galerija_kolaca || [];
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
        console.error("Greška pri dohvaćanju kolača:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchKolac();
    }
  }, [slug]);

  if (loading) return <div className="loader-container">Učitavanje...</div>;
  if (!kolac) return <div className="error-container">Kolač nije pronađen.</div>;

  const handleOpenLightbox = (index) => {
    setImageIndex(index);
    setOpen(true);
  };

  return (
    <main className="kolac-single-page pt-5 mt-5">
      <SEO 
        title={kolac.title.rendered} 
        description={kolac.acf.kratki_opis}
        image={slides[0]?.src}
        url={`/kolaci/${slug}`}
      />
      <div className="container pb-5">
        <Link to="/kolaci" className="btn-back mb-4 d-inline-flex align-items-center">
          <FaChevronLeft className="me-2" /> Povratak na kolače
        </Link>

        <div className="row g-5">
          {/* Ljeva strana: Glavna slika i Galerija */}
          <section className="col-lg-6">
            <div className="main-image-wrapper mb-4 shadow-sm" onClick={() => slides.length > 0 && handleOpenLightbox(0)}>
              <img
                src={slides[0]?.src || "/placeholder.jpg"}
                alt={kolac.title.rendered}
                className="img-fluid rounded-4 main-kolac-img"
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
            <div className="kolac-info-card p-4 p-md-5 bg-white shadow-sm rounded-4 h-100">
              <h1 className="display-5 fw-bold mb-3 brand-text">{kolac.title.rendered}</h1>

              <div className="price-tag mb-4">
                <span className="fs-3 fw-bold">
                  {kolac.acf.cijena ? `${kolac.acf.cijena} €` : "Cijena na upit"}
                </span>
                <span className="text-muted ms-2 small">/ komad</span>
              </div>

              <div className="description-box mb-4">
                <p className="lead text-muted">{kolac.acf.kratki_opis}</p>
                {kolac.content && kolac.content.rendered && (
                  <div
                    className="long-description mt-3"
                    dangerouslySetInnerHTML={{ __html: kolac.content.rendered }}
                  />
                )}
              </div>

              <hr className="my-4 opacity-25" />

              <div className="specifications row g-3 mb-4">
                {kolac.acf.min_narudzba && (
                  <div className="col-sm-6 d-flex align-items-center spec-item">
                    <FaBoxes className="spec-icon me-3" />
                    <div>
                      <small className="text-muted d-block text-uppercase">Minimalna narudžba</small>
                      <span className="fw-semibold">{kolac.acf.min_narudzba} kom</span>
                    </div>
                  </div>
                )}
                {kolac.acf.sastojci && (
                  <div className="col-sm-12 d-flex align-items-start spec-item mt-3">
                    <FaClipboardList className="spec-icon me-3 mt-1" />
                    <div>
                      <small className="text-muted d-block text-uppercase">Sastojci</small>
                      <span className="fw-semibold">{kolac.acf.sastojci}</span>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/kontakt#slatki-upit"
                className="btn btn-primary btn-lg rounded-pill w-100 shadow-sm btn-order-single text-white mb-3"
              >
                Pošalji upit za kolače
              </Link>

              <a
                href={`https://wa.me/${info?.whatsapp ? String(info.whatsapp).replace(/\D/g, "") : "385958718497"}?text=${encodeURIComponent(`Pozdrav, zanima me kolač: ${kolac.title.rendered}`)}`}
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

      {/* Lightbox for gallery */}
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

export default SingleKolac;
