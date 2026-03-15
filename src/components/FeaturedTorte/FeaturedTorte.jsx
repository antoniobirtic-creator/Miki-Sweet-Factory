import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

// Swiper stilovi
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./FeaturedTorte.css";

const FeaturedTorte = () => {
  const [torte, setTorte] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Pozivamo novi endpoint "torte" (bez categories=60 jer CPT ne koristi taj query)
        const data = await api.getCustomType("torte", "?per_page=10");

        setTorte(data);
      } catch (err) {
        console.error("Greška pri dohvaćanju torti:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading)
    return (
      <div className="py-5 text-center">Učitavanje najfinijih torti...</div>
    );

  return (
    <section className="featured-torte py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Naše Najtraženije Torte</h2>
          <p className="text-muted">Izaberite savršen okus za vašu proslavu</p>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]} // Isključi Pagination jer nema smisla kod stalnog skrolanja
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // Obavezno za beskonačni krug
          speed={8000} // Brzina kojom jedan slajd prođe (u ms) - prilagodi po želji
          autoplay={{
            delay: 0, // Nema čekanja između slajdova
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Ovo ostaje kako si tražio
          }}
          allowTouchMove={true} // Dozvoli korisniku da "povuče" traku
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="torte-swiper-linear"
        >
          {torte.map((torta) => {
            const image =
              torta._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder-torta.jpg";
            const acf = torta.acf || {};

            return (
              <SwiperSlide key={torta.id}>
                <div className="torta-card shadow-sm border-0 h-100">
                  <div className="torta-image-wrapper">
                    <img
                      src={image}
                      alt={torta.title.rendered}
                      className="img-fluid"
                      loading="lazy"
                    />
                    {/* Badge za vrijeme izrade iz ACF-a */}
                    {acf.vrijeme_izrade && (
                      <span className="vrijeme-badge">
                        {acf.vrijeme_izrade}
                      </span>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h5
                      className="fw-bold mb-2"
                      dangerouslySetInnerHTML={{ __html: torta.title.rendered }}
                    />
                    <p className="small text-muted mb-3">
                      {acf.kratki_opis || "Domaća torta po narudžbi."}
                    </p>
                    <Link
                      to={`/torte/${torta.slug}`}
                      className="btn-miki-outline-1 btn-sm w-100"
                    >
                      Pogledaj detalje
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedTorte;
