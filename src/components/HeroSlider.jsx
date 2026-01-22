import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'; // Dodaj EffectFade
import 'swiper/css/effect-fade'; // Importiraj CSS za fade

import heroData from "../data/heroData.json";
import "./HeroSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay,EffectFade]}
        effect="fade" // Ovo mijenja način prijelaza
        speed={2000} // Fade traje 2 sekunde
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide-item"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay"></div> {/* Tamni sloj */}
              <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center text-center">
                  <div className="col-lg-8">
                    <h1 className="hero-title display-2 mb-4">
                      {slide.title.rendered}
                    </h1>
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
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
