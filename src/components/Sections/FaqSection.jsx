import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Helmet } from "react-helmet-async";
import "./FaqSection.css";

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await api.getCustomType("faq");
        setFaqs(data);
        setLoading(false);
      } catch (err) {
        console.error("Greška pri dohvaćanju FAQ podataka:", err);
        setError("Nije moguće učitati često postavljana pitanja.");
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const generateSchema = () => {
    if (!faqs || faqs.length === 0) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": stripHtml(item.title.rendered),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": stripHtml(item.content.rendered)
        }
      }))
    };

    return JSON.stringify(schema);
  };

  if (loading) return <div className="faq-loading">Učitavanje pitanja...</div>;
  if (error) return <div className="faq-error">{error}</div>;

  return (
    <section className="faq-section">
      <Helmet>
        {faqs.length > 0 && (
          <script type="application/ld+json">
            {generateSchema()}
          </script>
        )}
      </Helmet>

      <div className="container">
        <h2 className="faq-title">Često postavljana pitanja</h2>
        <div className="faq-accordion accordion" id="faqAccordion">
          {faqs.map((item) => (
            <div className="accordion-item" key={item.id}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${activeId === item.id ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={activeId === item.id}
                >
                  {item.title.rendered}
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${activeId === item.id ? "show" : ""}`}
                aria-labelledby={`heading${item.id}`}
              >
                <div 
                  className="accordion-body"
                  dangerouslySetInnerHTML={{ __html: item.content.rendered }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
