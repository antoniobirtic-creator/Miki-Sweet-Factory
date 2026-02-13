import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import Torte from "./pages/Torte";
import Kontakt from "./pages/Kontakt";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main>
          <Routes>
            {/* Početna ruta gdje je tvoj Slider */}
            <Route path="/" element={<HeroSlider />} />

            {/* Privremene rute da ne bude errora dok ne napraviš stranice */}
            <Route path="/torte" element={<Torte />} />

            <Route
              path="/kolaci"
              element={
                <div style={{ paddingTop: "100px" }}>
                  Stranica s kolačima u izradi...
                </div>
              }
            />
            <Route path="/kontakt" element={<Kontakt />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
