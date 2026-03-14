import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { api } from "../../services/api";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await api.getSingle("pages", 1184);
        if (data && data.acf) {
          setInfo(data.acf);
        }
      } catch (err) {
        console.error("API Error u Footer.jsx:", err);
      }
    };

    loadContactData();
  }, []);

  return (
    <footer className="miki-footer-main bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* O Nama */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold mb-4 brand-title">
              Miki <span>Sweet Factory</span>
            </h4>
            <p className="footer-description mb-4">
              Ručno rađene slastice u Đakovu. Tradicija, kvaliteta i ljubav
              utkani u svaki zalogaj vaših najdražih torti i kolača.
            </p>
            <div className="social-icons-footer">
              <a
                href={info?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Pratite nas na Facebooku"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href={info?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Pratite nas na Instagramu"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href={info?.whatsapp ? `https://wa.me/${String(info.whatsapp).replace(/\D/g, "")}` : "https://wa.me/385958718497"}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Kontaktirajte nas putem WhatsAppa"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </div>

          {/* Navigacija */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 footer-heading">Navigacija</h5>
            <nav>
              <nav aria-label="Footer Navigation">
                <ul className="list-unstyled footer-links">
                  <li>
                    <Link to="/" aria-label="Idi na početnu stranicu">
                      Početna
                    </Link>
                  </li>
                  <li>
                    <Link to="/torte" aria-label="Pregledaj ponudu torti">
                      Torte
                    </Link>
                  </li>
                  <li>
                    <Link to="/kolaci" aria-label="Pregledaj ponudu kolača">
                      Kolači
                    </Link>
                  </li>
                  <li>
                    <Link to="/kontakt" aria-label="Kontaktirajte nas">
                      Kontakt
                    </Link>
                  </li>
                </ul>
              </nav>
            </nav>
          </div>

          {/* Kontakt */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4 footer-heading">Kontakt</h5>
            <ul className="list-unstyled contact-list">
              <li className="mb-3">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="icon-blue me-2"
                />
                <Link to="/kontakt#mapa" className="contact-link" style={{ textDecoration: 'none' }}>
                  <span className="contact-text">
                    {info?.adresa || "Biskupa J. Čolnića 1a, Đakovo"}
                  </span>
                </Link>
              </li>
              <li className="mb-3">
                <FontAwesomeIcon icon={faPhone} className="icon-blue me-2" />
                <a href={`tel:${info?.telefon?.replace(/\s/g, "") || "+385958718497"}`} className="contact-link">
                  {info?.telefon || "+385 95 871 8497"}
                </a>
              </li>
              <li className="mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="icon-blue me-2" />
                <a href={`mailto:${info?.email || "info@miki-sweet.hr"}`} className="contact-link">
                  {" "}
                  {info?.email || "info@miki-sweet.hr"}
                </a>
              </li>
            </ul>
          </div>

          {/* Radno Vrijeme */}

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4 footer-heading">Radno Vrijeme</h5>
            <div className="working-hours-wrapper">
              <p className="mb-4 text-muted pre-line" style={{ whiteSpace: "pre-line" }}>
                {info?.radno_vrijeme || "Pon - Pet: 08:00 - 18:00\nSubota: 08:00 - 14:00\nNedjelja: Zatvoreno"}
              </p>
              
              <Link
                to="/kontakt#slatki-upit"
                className="btn btn-primary rounded-pill px-4 btn-order-now text-white"
                style={{ backgroundColor: "#ff2d85", borderColor: "#ff2d85" }}
              >
                Naruči odmah
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-25" />

        <div className="row align-items-center footer-bottom-text">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0">
              © {currentYear} <strong>Miki Sweet Factory</strong>. Sva prava
              pridržana. <span className="mx-2">|</span>
              <Link to="/politika-privatnosti" className="text-white-50 text-decoration-none">
                Politika privatnosti
              </Link>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="small mb-0">
              Powered by <strong>Miki</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
