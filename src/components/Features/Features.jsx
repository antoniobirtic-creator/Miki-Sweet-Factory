import React from "react";
import { FaCheckCircle, FaAward, FaHeart } from "react-icons/fa";
import "./Features.css";

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="row align-items-center">
          {/* LIJEVA STRANA: Sadržaj */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="features__content">
              <span className="features__subtitle">Tradicija iz Đakova</span>
              <h2 className="features__title">
                Slastice rađene s <br /> <span>ljubavlju i pažnjom</span>
              </h2>
              <p className="features__description">
                U Miki Sweet Factory-u svaka torta priča svoju priču. Koristimo
                samo najbolje lokalne namirnice kako bismo osigurali vrhunsku
                kvalitetu i okus koji se pamti.
              </p>

              <div className="features__list">
                <div className="features__item">
                  <div className="features__icon-box">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="features__item-title">Prirodni sastojci</h4>
                    <p className="features__item-text">
                      Bez umjetnih aroma i gotovih smjesa. Samo pravo maslo,
                      jaja i čokolada.
                    </p>
                  </div>
                </div>

                <div className="features__item">
                  <div className="features__icon-box">
                    <FaAward />
                  </div>
                  <div>
                    <h4 className="features__item-title">Vrhunski dizajn</h4>
                    <p className="features__item-text">
                      Svaki detalj je ručno izrađen prema vašim željama i
                      prigodi.
                    </p>
                  </div>
                </div>

                <div className="features__item">
                  <div className="features__icon-box">
                    <FaHeart />
                  </div>
                  <div>
                    <h4 className="features__item-title">
                      Obiteljska receptura
                    </h4>
                    <p className="features__item-text">
                      Recepti koji se prenose generacijama, usavršeni modernim
                      tehnikama.
                    </p>
                  </div>
                </div>
              </div>

              <a href="/o-nama" className="btn-miki-primary">
                Saznajte više
              </a>
            </div>
          </div>

          {/* DESNA STRANA: Vizualni dio */}
          <div className="col-lg-6">
            <div className="features__image-wrapper">
              <div className="features__main-image-container ">
                <img
                  src="/images/o_nama.jpg"
                  alt="Miki Sweet Factory Torta"
                  className="features__main-image"
                />
                {/* Floating Badge (Roza kocka sa slike) */}
                <div className="features__badge">
                  <span className="features__badge-number">100%</span>
                  <span className="features__badge-text">
                    Domaće & <br /> Svježe
                  </span>
                </div>
              </div>
              {/* Ukrasni element iza slike */}
              <div className="features__image-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
