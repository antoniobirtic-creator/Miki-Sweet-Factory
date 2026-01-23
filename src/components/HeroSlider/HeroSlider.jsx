import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";

import "./HeroSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);

  const CATEGORY_ID = 59;
  const API_URL = `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?categories=59&_embed`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setHeroData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju API-ja:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return null; // Ili neki loading indikator

  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={2000}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {heroData.map((slide) => {
          const wpImage =
            slide._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <SwiperSlide key={slide.id}>
              <div
                className="hero-slide-item"
                style={{ backgroundImage: `url(${wpImage})` }}
              >
                <div className="hero-overlay"></div>
                <div className="container h-100">
                  <div className="row h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8">
                      <h1
                        className="hero-title display-2 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: slide.title.rendered,
                        }}
                      />

                      <div
                        className="hero-text lead mb-5"
                        dangerouslySetInnerHTML={{
                          __html: slide.content.rendered,
                        }}
                      />
                      <div className="d-flex gap-3 justify-content-center">
                        <button className="btn-miki-light">Naša Ponuda</button>
                        <button className="btn-miki-outline">Kontakt</button>
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
