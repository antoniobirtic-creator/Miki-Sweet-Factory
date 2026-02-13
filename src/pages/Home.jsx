import React from "react";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Features from "../components/Features/Features";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Hero sekcija sa sliderom */}
      <HeroSlider />

      {/* 2. Sekcija s prednostima (Feature section) */}
      <Features />

      {/* Ovdje kasnije možemo dodati nove komponente poput <ProductsGrid /> ili <Testimonials /> */}
    </div>
  );
};

export default Home;
