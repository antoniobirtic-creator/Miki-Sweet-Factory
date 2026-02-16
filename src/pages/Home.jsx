import React, { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Features from "../components/Features/Features";

const Home = () => {
  const [acfData, setAcfData] = useState(null);

  useEffect(() => {
    fetch(
      "https://front2.edukacija.online/backend/wp-json/wp/v2/pages/612?_embed",
    )
      .then((res) => res.json())
      .then(async (data) => {
        if (data && data.acf) {
          let updatedAcf = { ...data.acf };

          if (typeof updatedAcf.features_image === "number") {
            try {
              const mediaRes = await fetch(
                `https://front2.edukacija.online/backend/wp-json/wp/v2/media/${updatedAcf.features_image}`,
              );
              const mediaData = await mediaRes.json();
              updatedAcf.features_image = mediaData.source_url;
            } catch (err) {
              console.error("Greška pri dohvaćanju slike:", err);
            }
          }

          setAcfData(updatedAcf);
        }
      })
      .catch((err) => console.error("WP Fetch error:", err));
  }, []);

  return (
    <div className="home-page">
      <HeroSlider />
      <Features data={acfData} />
    </div>
  );
};

export default Home;
