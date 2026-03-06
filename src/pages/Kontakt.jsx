import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import { api } from "../services/api";
import Form from "../components/Form/Form";
import "./Kontakt.css";

const Kontakt = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await api.getSingle("pages", 1184);
        if (data && data.acf) {
          setInfo(data.acf);
        }
      } catch (err) {
        console.error("API Error u Kontakt.jsx:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  if (loading) return <div className="loader-container">Slatkiši stižu...</div>;
  if (!info)
    return (
      <div className="error-container">Podaci trenutno nisu dostupni.</div>
    );

  return (
    <main className="kontakt-page-wrapper pt-5 mt-5">
      <div className="container pb-5">
        <div className="row g-5 align-items-stretch">
          <section className="col-lg-5" aria-labelledby="contact-heading">
            <div className="content-card p-4 p-md-5 shadow-lg rounded-4 h-100">
              <header>
                <h1 id="contact-heading" className="display-6 fw-bold mb-2">
                  {info.naslov_kontakta || "Kontaktirajte nas"}
                </h1>
                <p className="text-muted mb-5">
                  Miki Sweet Factory - najbolje torte u Đakovu.
                </p>
              </header>

              <address className="info-list">
                {/* ADRESA */}
                {info.adresa && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.adresa)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="info-item mb-4 clickable-item"
                  >
                    <div className="icon-box me-2">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h6>Adresa</h6>
                      <p>{info.adresa}</p>
                    </div>
                  </a>
                )}

                {/* TELEFON */}
                {info.telefon && (
                  <a
                    href={`tel:${info.telefon.replace(/\s/g, "")}`}
                    className="info-item mb-4 clickable-item"
                  >
                    <div className="icon-box me-2">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <h6>Telefon</h6>
                      <p>{info.telefon}</p>
                    </div>
                  </a>
                )}

                {/* EMAIL */}
                {info.email && (
                  <a
                    href={`mailto:${info.email}`}
                    className="info-item mb-4 clickable-item"
                  >
                    <div className="icon-box me-2">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h6>Email</h6>
                      <p>{info.email}</p>
                    </div>
                  </a>
                )}

                {/* RADNO VRIJEME */}
                <div className="info-item mb-4 clickable-item">
                  <div className="icon-box me-2">
                    <FaClock />
                  </div>
                  <div>
                    <h6>Radno vrijeme</h6>
                    <p className="pre-line m-0">
                      {info.radno_vrijeme}
                    </p>
                  </div>
                </div>

                {/* DOSTAVA */}
                {info.info_dostave && (
                  <article className="delivery-card mt-4 p-3 rounded-3 d-flex align-items-center gap-3 bg-light">
                    <FaTruck className="fs-3 kamion-ikona" />
                    <p className="small mb-0">{info.info_dostave}</p>
                  </article>
                )}
              </address>

              {/* SOCIAL */}
              <nav
                className="social-links-wrapper mt-5"
                aria-label="Social media"
              >
                <div className="social-grid d-flex gap-3 flex-wrap">
                  {info.facebook && (
                    <a
                      href={info.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill fb"
                    >
                      <FaFacebookF /> <span>Facebook</span>
                    </a>
                  )}
                  {info.instagram && (
                    <a
                      href={info.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill ig"
                    >
                      <FaInstagram /> <span>Instagram</span>
                    </a>
                  )}
                  {info.whatsapp && (
                    <a
                      href={`https://wa.me/${String(info.whatsapp).replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill wa"
                    >
                      <FaWhatsapp /> <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </nav>
            </div>
          </section>

          {/* MAPA */}
          <section className="col-lg-7" id="mapa">
            <div
              className="map-container shadow-lg rounded-4 overflow-hidden h-100"
            >
              {info.maps_url ? (
                <iframe
                  title="Miki Sweet Factory Lokacija"
                  src={info.maps_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center bg-light">
                  <p className="text-muted">Karta nije definirana.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Slatki Upit Forma */}
      <Form />
    </main>
  );
};

export default Kontakt;
