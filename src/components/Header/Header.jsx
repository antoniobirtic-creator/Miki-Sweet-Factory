import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBirthdayCake,
  FaCookie,
  FaEnvelope,
  FaHome,
  FaChevronDown,
  FaUsers,
  FaTimes,
  FaNewspaper,
} from "react-icons/fa";
import { api } from "../../services/api";
import "./Header.css";
import logo from "../../assets/images/logo-1.svg";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prigode, setPrigode] = useState([]);
  const [vrste, setVrste] = useState([]);
  const [vrsteKolaca, setVrsteKolaca] = useState([]);
  const [showKolaciDropdown, setShowKolaciDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [prigodeData, vrsteData, kolaciVrsteData] = await Promise.all([
          api.getCollection("prigode"),
          api.getCollection("vrste"),
          api.getCollection("vrsta_kolaca"),
        ]);
        setPrigode(prigodeData);
        setVrste(vrsteData);
        setVrsteKolaca(kolaciVrsteData);
      } catch (err) {
        console.error("Header categories fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const isHome = location.pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <nav
        className={`header__nav navbar navbar-expand-xl fixed-top ${scrolled || !isHome ? "header__nav--scrolled" : ""} ${isMenuOpen ? "header__nav--open" : ""}`}
      >
        <div className="container">
          <Link className="header__brand" to="/" onClick={closeMenu}>
            <img
              src={logo}
              alt="Miki Logo"
              className="header__logo"
            />
            <div className="header__brand-text">
              <span className="header__miki-name">MIKI</span>
              <span className="header__brand-sub">Sweet Factory</span>
            </div>
          </Link>

          <button
            className={`header__toggle ${isMenuOpen ? "header__toggle--active" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <FaTimes className="header__toggle-icon header__toggle-icon--close" />
            ) : (
              <FaBirthdayCake className="header__toggle-icon header__toggle-icon--cake" />
            )}
          </button>

          {/* Backdrop Overlay */}
          {isMenuOpen && <div className="header__backdrop" onClick={closeMenu}></div>}

          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="header__link nav-link" to="/">
                  <FaHome className="header__icon" /> Početna
                </Link>
              </li>

              {/* PROŠIRENI TORTE DROPDOWN */}
              <li
                className={`nav-item dropdown ${showDropdown ? "show" : ""}`}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link
                  className="header__link header__link--dropdown nav-link"
                  to="/torte"
                >
                  <FaBirthdayCake className="header__icon" /> Torte
                  <FaChevronDown
                    className={`header__arrow ${showDropdown ? "header__arrow--rotate" : ""}`}
                  />
                </Link>

                <ul
                  className={`header__dropdown-menu dropdown-menu ${showDropdown ? "show" : ""}`}
                >
                  <li>
                    <span className="header__dropdown-header">Po Prigodi</span>
                  </li>
                  {prigode.map((p) => (
                    <li key={p.id}>
                      <Link
                        className="dropdown-item"
                        to={`/torte?prigoda=${p.slug}`}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <span className="header__dropdown-header">Po Vrsti</span>
                  </li>
                  {vrste.map((v) => (
                    <li key={v.id}>
                      <Link
                        className="dropdown-item"
                        to={`/torte?vrsta=${v.slug}`}
                      >
                        {v.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li
                className={`nav-item dropdown ${showKolaciDropdown ? "show" : ""}`}
                onMouseEnter={() => setShowKolaciDropdown(true)}
                onMouseLeave={() => setShowKolaciDropdown(false)}
              >
                <Link
                  className="header__link header__link--dropdown nav-link"
                  to="/kolaci"
                >
                  <FaCookie className="header__icon" /> Kolači
                  <FaChevronDown
                    className={`header__arrow ${showKolaciDropdown ? "header__arrow--rotate" : ""}`}
                  />
                </Link>

                <ul
                  className={`header__dropdown-menu dropdown-menu ${showKolaciDropdown ? "show" : ""}`}
                >
                  <li>
                    <span className="header__dropdown-header">Po Vrsti</span>
                  </li>
                  {vrsteKolaca.map((v) => (
                    <li key={v.id}>
                      <Link
                        className="dropdown-item"
                        to={`/kolaci?vrsta=${v.slug}`}
                      >
                        {v.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="header__link nav-link" to="/o-nama">
                  <FaUsers className="header__icon" /> O nama
                </Link>
              </li>

              <li className="nav-item">
                <Link className="header__link nav-link" to="/novosti">
                  <FaNewspaper className="header__icon" /> Novosti
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="header__link header__link--button nav-link"
                  to="/kontakt"
                >
                  <FaEnvelope className="header__icon" /> Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
