import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import heroData from '../data/heroData.json';
import './HeroSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {heroData.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="container hero-slide-container">
              <div className="row align-items-center">
                
                <div className="col-md-6">
                  <img 
                    src={slide.image} 
                    alt={slide.title.rendered}
                    className="hero-image shadow-lg"
                  />
                </div>

                <div className="col-md-6 ps-md-5">
                  <h1 className="hero-title display-4 mb-4">
                    {slide.title.rendered}
                  </h1>
                  <div 
                    className="hero-text mb-4"
                    dangerouslySetInnerHTML={{ __html: slide.content.rendered }} 
                  />
                  <div className="d-flex gap-3">
                    <button className="btn-miki-primary">Torte</button>
                    <button className="btn-miki-primary">Kolači</button>
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