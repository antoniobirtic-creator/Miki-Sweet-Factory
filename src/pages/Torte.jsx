import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Torte.css";

const Torte = () => {
  const [torte, setTorte] = useState([]);
  const [filtriraneTorte, setFiltriraneTorte] = useState([]);
  const [prigode, setPrigode] = useState([]);
  const [vrste, setVrste] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const aktivnaPrigoda = searchParams.get("prigoda") || "sve";
  const aktivnaVrsta = searchParams.get("vrsta") || "sve";

  useEffect(() => {
    const getData = async () => {
      try {
        const [torteData, prigodeData, vrsteData] = await Promise.all([
          api.getCollection("torte"),
          api.getCollection("prigode"),
          api.getCollection("vrste"),
        ]);

        setTorte(torteData);
        setPrigode(prigodeData);
        setVrste(vrsteData);
      } catch (err) {
        console.error("Greška pri dohvaćanju podataka:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
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



  if (loading) return <div className="loader">Učitavanje...</div>;

  return (
    <div className="torte-page">
      <div className="container">
        <header className="torte-header">
          <h1>Naše Slatke Kreacije</h1>
          <p>Izaberite savršen okus za vašu proslavu</p>
        </header>

        <div className="filters-section">
          {/* PO PRIGODI */}
          <div className="filter-row">
            <span className="filter-label">PO PRIGODI:</span>
            <select
              className="filter-select-mobile"
              value={aktivnaPrigoda}
              onChange={(e) => handleFilterChange("prigoda", e.target.value)}
            >
              <option value="sve">Sve prigode</option>
              {prigode.map((p) => (
                <option key={p.id} value={p.id.toString()}>
                  {p.name}
                </option>
              ))}
            </select>
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

          {/* PO VRSTI */}
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
              onClick={() => navigate(`/torte/${torta.slug}`)}
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
    </div>
  );
};

export default Torte;
