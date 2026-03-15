import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import SEO from "../components/Common/SEO";
import "./Novosti.css";

const Novosti = () => {
  const [novosti, setNovosti] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNovosti = async () => {
      try {
        // Fetch posts only from Category ID 257
        const data = await api.getPosts("categories=257");
        setNovosti(data);
      } catch (err) {
        console.error("Greška pri dohvaćanju novosti:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNovosti();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('hr-HR', options);
  };

  const createExcerpt = (htmlString) => {
    // Strip HTML tags for clean text excerpt
    const tmp = document.createElement("DIV");
    tmp.innerHTML = htmlString;
    const text = tmp.textContent || tmp.innerText || "";
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  if (loading) return <div className="loader">Učitavanje...</div>;

  return (
    <div className="novosti-page">
      <SEO 
        title="Novosti | Miki Sweet Factory" 
        description="Pratite najnovije vijesti, recepte i događanja iz Miki Sweet Factory."
        url="/novosti"
      />
      <div className="container py-5 mt-5">
        <header className="novosti-header text-center mb-5">
          <h1 className="display-4 fw-bold">Slatke Novosti</h1>
          <p className="lead text-muted">Budite u toku s našim najnovijim slatkim kreacijama i događajima.</p>
        </header>

        <div className="row g-4">
          {novosti.map((post) => {
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/placeholder.jpg";
            return (
              <div key={post.id} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                <div className="card novosti-card shadow-sm w-100 border-0">
                  <div 
                    className="card-img-wrapper"
                    onClick={() => navigate(`/novosti/${post.slug}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img 
                      src={imageUrl} 
                      className="card-img-top novosti-img" 
                      alt={post.title.rendered} 
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="card-subtitle text-muted mb-2 small">
                      {formatDate(post.date)}
                    </p>
                    <h3 className="card-title h5 mb-3" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <p className="card-text text-muted mb-4 extract-text">
                        {createExcerpt(post.excerpt?.rendered || "")}
                    </p>
                    <button 
                      className="btn mt-auto novosti-btn"
                      onClick={() => navigate(`/novosti/${post.slug}`)}
                    >
                      Pročitaj više
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {novosti.length === 0 && !loading && (
            <div className="col-12 text-center text-muted py-5">
              <p>Trenutno nema objavljenih novosti.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Novosti;
