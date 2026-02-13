import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom"; // SNR koristi Link umjesto buttona za internu navigaciju

// Swiper stilovi
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./HeroSlider.css";

const HeroSlider = () => {
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL držimo u varijabli radi lakšeg održavanja
  const API_URL = `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?categories=59&_embed`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Hero API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="hero-placeholder" />;

  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1500}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={heroData.length > 1} // Loop samo ako ima više od 1 slidea
      >
        {heroData.map((slide) => {
          // Sigurno izvlačenje slike
          const wpImage =
            slide._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "fallback-image.jpg";
          const acf = slide.acf; // ACF polja

          return (
            <SwiperSlide key={slide.id}>
              <div
                className="hero-slide-item"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${wpImage})`,
                }}
              >
                <div className="container h-100">
                  <div className="row h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-9">
                      {/* Koristimo ACF za podnaslov ako postoji, inače fallback */}
                      <span className="hero-category text-uppercase mb-3 d-block">
                        {acf?.podnaslov || "Ručno rađene slastice"}
                      </span>

                      <h1
                        className="hero-title display-1 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: slide.title.rendered,
                        }}
                      />

                      <div className="hero-text-wrapper mb-5">
                        <p className="lead">
                          {slide.acf?.kratki_opis ||
                            "Otkrijte čaroliju okusa u svakom zalogaju."}
                        </p>
                      </div>

                      <div className="d-flex gap-3 justify-content-center">
                        <Link to="/torte" className="btn-miki-outline">
                          Torte
                        </Link>
                        <Link to="/kolaci" className="btn-miki-outline">
                          Kolači
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
