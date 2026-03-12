import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { api } from '../../services/api';
import { FaStar } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import './ReviewsSection.css';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getCollection('recenzije');
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) return null;

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="section-title">Što kažu naši kupci</h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={8000} // Slow transition for "flow" effect
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="reviews-swiper"
        >
          {reviews.map((review) => {
            const stars = parseInt(review.acf?.recenzija_stars) || 5;

            return (
              <SwiperSlide key={review.id}>
                <div className="review-card">
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="star-icon"
                        style={{ color: i < stars ? '#ffc107' : '#e4e5e9' }}
                      />
                    ))}
                  </div>

                  <div className="review-text">
                    "{review.acf?.recenzija_tekst}"
                  </div>

                  <div className="review-footer">
                    <span className="client-name">{review.title.rendered}</span>
                    <span className="product-type">{review.acf?.recenzija_proizvod}</span>
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

export default ReviewsSection;
