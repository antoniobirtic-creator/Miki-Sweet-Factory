import React from 'react';
import './Torte.css';

const Torte = () => {
  return (
    <div className="torte-page">
      {/* Banner sekcija stranice */}
      <header className="torte-header">
        <div className="container">
          <h1 className="display-3">Naše Torte</h1>
          <p className="lead">Svaki komad je priča za sebe, rađena s ljubavlju i najboljim sastojcima.</p>
        </div>
      </header>

      {/* Grid sa tortama (ovdje će ići API fetch kasnije) */}
<section className="torte-grid container py-5">
  <div className="row g-4">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      /* SNR savjet: Svaki proizvod je zaseban <article> */
      <article key={item} className="col-md-6 col-lg-4">
        <div className="miki-card card h-100">
          
          <figure className="miki-card-figure">
            {/* Ovdje će ići <img /> kad dobijemo API */}
            <div className="miki-card-img-placeholder">
              <span>Miki Slastice</span>
            </div>
            <figcaption className="sr-only">Kategorija: Torte</figcaption>
          </figure>

          <div className="card-body d-flex flex-column">
            <h2 className="h5 card-title text-uppercase">Torta br. {item}</h2>
            <p className="card-text text-muted flex-grow-1">
              Naša autentična receptura koja spaja tradiciju i moderni okus.
            </p>
            <div className="miki-card-footer mt-3">
              <button className="btn-miki-link">Pogledaj detalje</button>
            </div>
          </div>

        </div>
      </article>
    ))}
  </div>
</section>
    </div>
  );
};

export default Torte;