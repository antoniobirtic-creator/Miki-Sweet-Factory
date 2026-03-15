import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { api } from "../services/api";
import SEO from "../components/Common/SEO";
import { FaChevronLeft, FaCalendarAlt } from "react-icons/fa";
import "./SingleNovost.css";

const SingleNovost = () => {
  const { slug } = useParams();
  const [novost, setNovost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchNovost = async () => {
      try {
        const dataArray = await api.getPosts(`slug=${slug}`);
        if (dataArray && dataArray.length > 0) {
          setNovost(dataArray[0]);
        }
      } catch (err) {
        console.error("Greška pri dohvaćanju novosti:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNovost();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('hr-HR', options);
  };

  if (loading) return <div className="loader-container">Učitavanje...</div>;
  if (!novost) return <div className="error-container">Novost nije pronađena.</div>;

  const heroImage = novost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/placeholder.jpg";

  // Parse gallery from ACF array of arrays
  const rawGallery = novost.acf?.photo_gallery?.galerija_objave_ || novost.acf?.galerija_objave || [];
  const galleryArray = Array.isArray(rawGallery) ? rawGallery.flat() : [];
  const galleryImgs = galleryArray.map(img => {
    if (typeof img === 'string') return { src: img };
    return { src: img.full_image_url || img.url || img.source_url };
  }).filter(img => img.src);

  return (
    <main className="single-novost-page pb-5">
      <SEO
        title={`${novost.title.rendered} | Miki Sweet Factory`}
        description={novost.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, "").substring(0, 150) || "Najnovije vijesti iz Miki Sweet Factory"}
        image={heroImage}
        url={`/novosti/${slug}`}
      />

      {/* Hero Section */}
      <section
        className="novost-hero position-relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="container position-relative h-100 d-flex flex-column justify-content-end pb-5">
          <Link to="/novosti" className="btn-back-light mb-auto mt-5 pt-3 d-inline-flex align-items-center">
            <FaChevronLeft className="me-2" /> Povratak na sve novosti
          </Link>
          <div className="hero-content text-white mt-auto">
            <span className="badge bg-primary mb-3 py-2 px-3 fs-6">Novost</span>
            <h1 className="display-4 fw-bold mb-3" dangerouslySetInnerHTML={{ __html: novost.title.rendered }} />
            <div className="meta-data d-flex align-items-center text-white-50">
              <FaCalendarAlt className="me-2" />
              <span>{formatDate(novost.date)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <article
              className="novost-content mb-5"
              dangerouslySetInnerHTML={{ __html: novost.content.rendered }}
            />

            {/* ACF Galerija */}
            {galleryImgs && galleryImgs.length > 0 && (
              <div className="novost-gallery mt-5 pt-4 border-top">
                <h3 className="mb-4 fw-bold">Galerija</h3>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                  }}
                  className="rounded-4 overflow-hidden"
                >
                  {galleryImgs.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="gallery-slide-img"
                        style={{ backgroundImage: `url(${img.src})`, cursor: "pointer" }}
                        onClick={() => {
                          setImageIndex(index);
                          setOpen(true);
                        }}
                      ></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery */}
      {galleryImgs && galleryImgs.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={galleryImgs}
          index={imageIndex}
        />
      )}
    </main>
  );
};

export default SingleNovost;
