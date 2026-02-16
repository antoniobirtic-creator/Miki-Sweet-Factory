import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox"; // Dodano
import "yet-another-react-lightbox/styles.css"; // Dodano
import "./Torte.css";

const Torte = () => {
  const [torte, setTorte] = useState([]);
  const [filtriraneTorte, setFiltriraneTorte] = useState([]);
  const [prigode, setPrigode] = useState([]);
  const [vrste, setVrste] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const aktivnaPrigoda = searchParams.get("prigoda") || "sve";
  const aktivnaVrsta = searchParams.get("vrsta") || "sve";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [torteRes, prigodeRes, vrsteRes] = await Promise.all([
          fetch(
            "https://front2.edukacija.online/backend/wp-json/wp/v2/torte?_embed&per_page=100",
          ),
          fetch(
            "https://front2.edukacija.online/backend/wp-json/wp/v2/prigode",
          ),
          fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/vrste"),
        ]);
        const torteData = await torteRes.json();
        const prigodeData = await prigodeRes.json();
        const vrsteData = await vrsteRes.json();

        setTorte(torteData);
        setPrigode(prigodeData);
        setVrste(vrsteData);
        setLoading(false);
      } catch (err) {
        console.error("Greška:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let temp = [...torte];
    if (aktivnaPrigoda !== "sve")
      temp = temp.filter((t) => t.prigode?.includes(parseInt(aktivnaPrigoda)));
    if (aktivnaVrsta !== "sve")
      temp = temp.filter((t) => t.vrste?.includes(parseInt(aktivnaVrsta)));
    setFiltriraneTorte(temp);
  }, [aktivnaPrigoda, aktivnaVrsta, torte]);

  const handleFilterChange = (key, value) => {
    const newParams = Object.fromEntries([...searchParams]);
    if (value === "sve") delete newParams[key];
    else newParams[key] = value;
    setSearchParams(newParams);
  };

  // Funkcija za pripremu slika i otvaranje Lightboxa
  const openGallery = (torta) => {
    const mainImg = torta._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const galleryImgs = torta.acf.galerija_torti || [];

    // Spajamo glavnu sliku s ostalima iz galerije
    const allSlides = [];
    if (mainImg) allSlides.push({ src: mainImg });

    galleryImgs.forEach((imgUrl) => {
      // Provjera formata (URL ili Objekt) ovisno o ACF postavkama
      const src = typeof imgUrl === "string" ? imgUrl : imgUrl.url;
      if (src) allSlides.push({ src });
    });

    setSlides(allSlides);
    setOpen(true);
  };

  if (loading) return <div className="loader">Učitavanje...</div>;

  return (
    <div className="torte-page">
      <div className="container">
        <header className="torte-header">
          <h1>Naše Slatke Kreacije</h1>
          <p>Izaberite savršen okus za vašu proslavu</p>
        </header>

        <div className="filters-section">
          <div className="filter-row">
            <span className="filter-label">PO PRIGODI:</span>
            <div className="filter-pills">
              <button
                className={aktivnaPrigoda === "sve" ? "pill active" : "pill"}
                onClick={() => handleFilterChange("prigoda", "sve")}
              >
                Sve
              </button>
              {prigode.map((p) => (
                <button
                  key={p.id}
                  className={
                    aktivnaPrigoda === p.id.toString() ? "pill active" : "pill"
                  }
                  onClick={() => handleFilterChange("prigoda", p.id.toString())}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">PO VRSTI:</span>
            <div className="filter-pills secondary">
              <button
                className={aktivnaVrsta === "sve" ? "pill active" : "pill"}
                onClick={() => handleFilterChange("vrsta", "sve")}
              >
                Sve vrste
              </button>
              {vrste.map((v) => (
                <button
                  key={v.id}
                  className={
                    aktivnaVrsta === v.id.toString() ? "pill active" : "pill"
                  }
                  onClick={() => handleFilterChange("vrsta", v.id.toString())}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="torte-gallery">
          {filtriraneTorte.map((torta) => (
            <div
              key={torta.id}
              className="torta-item"
              onClick={() => openGallery(torta)}
              style={{ cursor: "pointer" }}
            >
              <div className="torta-img-box">
                <img
                  src={
                    torta._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg"
                  }
                  alt={torta.title.rendered}
                />
                {torta.acf.vrijeme_izrade && (
                  <div className="torta-badge-time">
                    {torta.acf.vrijeme_izrade}
                  </div>
                )}
              </div>
              <div className="torta-details">
                <h3>{torta.title.rendered}</h3>
                <p className="torta-desc">{torta.acf.kratki_opis}</p>
                <div className="torta-footer">
                  <span className="torta-price">
                    {torta.acf.cijena_po_komadu
                      ? `${torta.acf.cijena_po_komadu} €`
                      : "Cijena na upit"}
                  </span>
                  <span className="torta-size">{torta.acf.velicina_torte}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Komponenta */}
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} />
    </div>
  );
};

export default Torte;
