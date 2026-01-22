import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // SNR trik: Slušamo skrolanje da promijenimo izgled Headera
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top miki-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          MIKI <span>Sweet Factory</span>
        </Link>
        
        <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto nav-links">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Početna</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/torte' ? 'active' : ''}`} to="/torte">Torte</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/kolaci' ? 'active' : ''}`} to="/kolaci">Kolači</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn-kontakt" to="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;