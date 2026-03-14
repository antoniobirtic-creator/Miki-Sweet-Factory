import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import SEO from "../components/Common/SEO";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const fetchPolicy = async () => {
      try {
        const data = await api.getSingle("pages", 2843);
        if (data && data.content) {
          setContent(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Greška pri dohvaćanju politike privatnosti:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  if (loading) {
    return (
      <div className="privacy-policy-page pt-5 mt-5">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Učitavanje...</span>
          </div>
          <p className="mt-3 text-muted">Učitavanje politike privatnosti...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="privacy-policy-page pt-5 mt-5">
        <div className="container py-5 text-center">
          <h2 className="text-danger">Strana nije pronađena</h2>
          <p className="text-muted">Nažalost, nismo uspjeli učitati politiku privatnosti. Pokušajte ponovno kasnije.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="privacy-policy-page pt-5 mt-5">
      <SEO 
        title={content.title?.rendered || "Politika Privatnosti"} 
        description="Pravila privatnosti i zaštita osobnih podataka Miki Sweet Factory."
        url="/politika-privatnosti"
      />
      <div className="container py-5">
        <header className="privacy-policy-header">
          <h1>{content.title?.rendered || "Politika Privatnosti"}</h1>
        </header>

        <section className="privacy-policy-content mx-auto" style={{ maxWidth: '900px' }}>
          <div dangerouslySetInnerHTML={{ __html: content.content.rendered }} />
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
