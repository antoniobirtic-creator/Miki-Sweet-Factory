import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaAward, FaHeart } from "react-icons/fa";
import "./Features.css";

const Features = ({ data }) => {
  if (!data || !data.features_list) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="spinner-border" style={{ color: "#ff2d85" }} role="status">
          <span className="visually-hidden">Učitavanje...</span>
        </div>
      </div>
    );
  }

  const {
    features_subtitle,
    features_title,
    features_description,
    features_image,
    features_list,
  } = data;

  const items = [
    {
      title: features_list.item_1_title,
      text: features_list.item_1_text,
      icon: <FaCheckCircle />,
    },
    {
      title: features_list.item_2_title,
      text: features_list.item_2_text,
      icon: <FaAward />,
    },
    {
      title: features_list.item_3_title,
      text: features_list.item_3_text,
      icon: <FaHeart />,
    },
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="row align-items-center">
          {/* LIJEVO: Tekstualni sadržaj */}
          <div className="col-lg-6">
            <span className="features__subtitle">{features_subtitle}</span>
            <h2 className="features__title">{features_title}</h2>
            <p className="features__description">{features_description}</p>

            <div className="features__list">
              {items.map(
                (item, index) =>
                  // Provjera postoji li title prije rendera itema
                  item.title && (
                    <div className="features__item" key={index}>
                      <div className="features__icon-box">{item.icon}</div>
                      <div>
                        <h4 className="features__item-title">{item.title}</h4>
                        <p className="features__item-text">{item.text}</p>
                      </div>
                    </div>
                  ),
              )}
            </div>

            <div className="mt-4">
              <Link to="/o-nama" className="btn-miki-primary">
                Saznajte više
              </Link>
            </div>
          </div>

          {/* DESNO: Slika s dekoracijom */}
          <div className="col-lg-6">
            <div className="features__image-wrapper">
              <div className="features__image-container">
                <img
                  src={
                    typeof features_image === "string" && features_image !== ""
                      ? features_image
                      : "/images/o_nama.jpg" // Fallback slika
                  }
                  alt="Miki Sweet Factory"
                  className="features__main-image"
                />
                <div className="features__badge">
                  <span className="features__badge-number">100%</span>
                  <span className="features__badge-text">Domaće</span>
                </div>
              </div>
              <div className="features__image-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
