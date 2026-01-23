import React, { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider/HeroSlider";

const Home = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    // Vučemo stranicu 612
    fetch(
      "https://front2.edukacija.online/backend/wp-json/wp/v2/pages/612?_embed",
    )
      .then((res) => res.json())
      .then((data) => setPage(data));
  }, []);

  return (
    <div className="home-page">
      <HeroSlider />

      {page && (
        <article className="wp-content-wrapper py-5">
          <div className="container">
            {/* Naslov stranice iz WP-a */}
            <h2 className="brand-heading mb-5 text-center">
              {page.title.rendered}
            </h2>

            {/* Ovdje "curi" sav tvoj sadržaj iz WP-a */}
            <div
              className="wp-dynamic-content"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          </div>
        </article>
      )}
    </div>
  );
};

export default Home;
