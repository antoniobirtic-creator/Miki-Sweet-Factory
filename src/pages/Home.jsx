import React, { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Features from "../components/Features/Features";
import FeaturedTorte from "../components/FeaturedTorte/FeaturedTorte";
import FaqSection from "../components/Sections/FaqSection";
import SEO from "../components/Common/SEO";
import { api } from "../services/api";

const Home = () => {
  const [acfData, setAcfData] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const data = await api.getSingle("pages", 612);

        if (data && data.acf) {
          let updatedAcf = { ...data.acf };

          if (typeof updatedAcf.features_image === "number") {
            try {
              const mediaData = await api.getMedia(updatedAcf.features_image);
              updatedAcf.features_image = mediaData.source_url;
            } catch (mediaErr) {
              console.error(
                "Greška pri dohvaćanju slike u Home.jsx:",
                mediaErr,
              );
            }
          }

          setAcfData(updatedAcf);
        }
      } catch (err) {
        console.error("WP Fetch error u Home.jsx:", err);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="home-page">
      <SEO 
        title="Domaće torte i slastice" 
        description="Miki Sweet Factory - najbolje torte u Đakovu rađene s ljubavlju."
      />
      <HeroSlider />
      <Features data={acfData} />
      <FeaturedTorte />
      <FaqSection />
    </div>
  );
};

export default Home;
