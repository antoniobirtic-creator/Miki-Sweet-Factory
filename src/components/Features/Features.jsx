import React from "react";
import { Link } from "react-router-dom"; // SNR: koristi Link za interne rute
import { FaCheckCircle, FaAward, FaHeart } from "react-icons/fa";
import "./Features.css";

const Features = ({ data }) => {
  if (!data) return <div className="loader">Učitavanje...</div>;

  const list = data.features_list || {};

  const items = [
    {
      title: list.item_1_title,
      text: list.item_1_text,
      icon: <FaCheckCircle />,
    },
    { title: list.item_2_title, text: list.item_2_text, icon: <FaAward /> },
    { title: list.item_3_title, text: list.item_3_text, icon: <FaHeart /> },
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="row align-items-center">
          {/* LIJEVO: Tekstualni sadržaj */}
          <div className="col-lg-6">
            <span className="features__subtitle">{data.features_subtitle}</span>
            <h2 className="features__title">{data.features_title}</h2>
            <p className="features__description">{data.features_description}</p>

            <div className="features__list">
              {items.map((item, index) => (
                <div className="features__item" key={index}>
                  <div className="features__icon-box">{item.icon}</div>
                  <div>
                    <h4 className="features__item-title">{item.title}</h4>
                    <p className="features__item-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* DODANO: Gumb koji vodi na O nama */}
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
                    typeof data.features_image === "string"
                      ? data.features_image
                      : "/images/o_nama.jpg"
                  }
                  alt="Miki Sweet Factory"
                  className="features__main-image"
                />
                <div className="features__badge">
                  <span className="features__badge-number">100%</span>
                  <span className="features__badge-text">Domaće</span>
                </div>
              </div>
              {/* DODANO: Element za sivu pozadinu iza slike */}
              <div className="features__image-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
