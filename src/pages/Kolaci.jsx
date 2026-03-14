import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import SEO from "../components/Common/SEO";
import "./Kolaci.css";

const Kolaci = () => {
  const [kolaci, setKolaci] = useState([]);
  const [filtriraniKolaci, setFiltriraniKolaci] = useState([]);
  const [vrste, setVrste] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const aktivnaVrsta = searchParams.get("vrsta") || "sve";

  useEffect(() => {
    const getData = async () => {
      try {
        const [kolaciData, vrsteData] = await Promise.all([
          api.getCollection("kolaci"),
          api.getCollection("vrsta_kolaca"),
        ]);

        setKolaci(kolaciData);
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
    let temp = [...kolaci];
    if (aktivnaVrsta !== "sve")
      temp = temp.filter((k) => k.vrsta_kolaca?.includes(parseInt(aktivnaVrsta)));
    setFiltriraniKolaci(temp);
  }, [aktivnaVrsta, kolaci]);

  const handleFilterChange = (key, value) => {
    const newParams = Object.fromEntries([...searchParams]);
    if (value === "sve") delete newParams[key];
    else newParams[key] = value;
    setSearchParams(newParams);
  };

  if (loading) return <div className="loader">Učitavanje...</div>;

  return (
    <div className="kolaci-page">
      <SEO 
        title="Ponuda kolača" 
        description="Pogledajte našu bogatu ponudu kolača za sve prigode."
        url="/kolaci"
      />
      <div className="container">
        <header className="kolaci-header">
          <h1>Naše Slatke Kreacije</h1>
          <p>Izaberite savršen okus za vašu proslavu</p>
        </header>

        <div className="filters-section">
          {/* PO VRSTI */}
          <div className="filter-row">
            <span className="filter-label">PO VRSTI:</span>
            <select
              className="filter-select-mobile"
              value={aktivnaVrsta}
              onChange={(e) => handleFilterChange("vrsta", e.target.value)}
            >
              <option value="sve">Sve vrste</option>
              {vrste.map((v) => (
                <option key={v.id} value={v.id.toString()}>
                  {v.name}
                </option>
              ))}
            </select>
            <div className="filter-pills">
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

        <div className="kolaci-gallery">
          {filtriraniKolaci.map((kolac) => (
            <div
              key={kolac.id}
              className="kolac-item"
              onClick={() => navigate(`/kolaci/${kolac.slug}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="kolac-img-box">
                <img
                  src={
                    kolac._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg"
                  }
                  alt={kolac.title.rendered}
                />
              </div>
              <div className="kolac-details">
                <h3>{kolac.title.rendered}</h3>
                {kolac.acf.kratki_opis && (
                  <p className="kolac-desc">{kolac.acf.kratki_opis}</p>
                )}
                <div className="kolac-footer">
                  <span className="kolac-price">
                    {kolac.acf.cijena
                      ? `${kolac.acf.cijena} €`
                      : "Cijena na upit"}
                  </span>
                  <span className="kolac-size">
                    Min: {kolac.acf.min_narudzba || "-"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kolaci;
