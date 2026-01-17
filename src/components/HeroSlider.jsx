import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper stilovi
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Dohvaćamo objave iz kategorije 59 (Hero Slider)
    fetch("https://front2.edukacija.online/wp-json/wp/v2/posts?categories=59&_embed")
      .then(res => res.json())
      .then(data => setSlides(data));
  }, []);

  return (
    <div className="hero-slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="container py-5">
              <div className="row align-items-center" style={{ minHeight: '500px' }}>
                
                {/* Slika lijevo */}
                <div className="col-md-6 text-center">
                  <img 
                    src={slide._embedded?.['wp:featuredmedia']?.[0]?.source_url} 
                    alt={slide.title.rendered}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '450px', objectFit: 'cover' }}
                  />
                </div>

                {/* Tekst desno */}
                <div className="col-md-6 px-lg-5">
                  <h1 className="display-4 fw-bold text-dark">
                    {slide.title.rendered}
                  </h1>
                  <div 
                    className="lead my-4 text-muted"
                    dangerouslySetInnerHTML={{ __html: slide.content.rendered }} 
                  />
                  <div className="d-flex gap-3">
                    <button className="btn btn-primary btn-lg">Torte</button>
                    <button className="btn btn-outline-dark btn-lg">Kolači</button>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;