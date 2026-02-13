import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBirthdayCake,
  FaCookie,
  FaCalendarAlt,
  FaEnvelope,
  FaHome,
  FaChevronDown,
  FaUsers,
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  const isHome = location.pathname === "/";

  return (
    <header className="header">
      <nav
        className={`header__nav navbar navbar-expand-xl fixed-top ${scrolled || !isHome ? "header__nav--scrolled" : ""}`}
      >
        <div className="container">
          <Link className="header__brand" to="/">
            <img
              src="/images/logo-1.svg"
              alt="Miki Logo"
              className="header__logo"
            />
            <div className="header__brand-text">
              <span className="header__miki-name">MIKI</span>
              <span className="header__brand-sub">Sweet Factory</span>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="header__link nav-link" to="/">
                  <FaHome className="header__icon" /> Početna
                </Link>
              </li>

              <li className="nav-item">
                <Link className="header__link nav-link" to="/o-nama">
                  <FaUsers className="header__icon" /> O nama
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
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/torte?prigoda=vjencanja"
                    >
                      Vjenčanja
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/torte?prigoda=rodendani"
                    >
                      Dječji rođendani
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/torte?prigoda=krstenja"
                    >
                      Krštenja i Pričesti
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/torte?prigoda=godisnjice"
                    >
                      Godišnjice
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/torte?prigoda=korporativne"
                    >
                      Korporativne proslave
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <span className="header__dropdown-header">Po Vrsti</span>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/torte?vrsta=cokoladne">
                      Čokoladne (Premium)
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/torte?vrsta=vocne">
                      Lagane Voćne
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/torte?vrsta=cheesecake"
                    >
                      Cheesecake varijacije
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/torte?vrsta=bez-glutena"
                    >
                      Bez glutena / Vegan
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="header__link nav-link" to="/kolaci">
                  <FaCookie className="header__icon" /> Kolači
                </Link>
              </li>
              <li className="nav-item">
                <Link className="header__link nav-link" to="/blagdani">
                  <FaCalendarAlt className="header__icon" /> Blagdani
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
