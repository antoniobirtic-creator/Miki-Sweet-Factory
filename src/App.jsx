import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToAnchor from "./components/ScrollToAnchor";
import Home from "./pages/Home"; // Uvozimo Home stranicu
import Torte from "./pages/Torte";
import TortaSingle from "./pages/TortaSingle";
import Kolaci from "./pages/Kolaci";
import SingleKolac from "./pages/SingleKolac";
import Kontakt from "./pages/Kontakt";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SEO from "./components/Common/SEO";
import Novosti from "./pages/Novosti";
import SingleNovost from "./pages/SingleNovost";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SEO />
      <ScrollToAnchor />
      <div className="app-wrapper">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/torte" element={<Torte />} />
            <Route path="/torte/:slug" element={<TortaSingle />} />
            <Route path="/kolaci" element={<Kolaci />} />
            <Route path="/kolaci/:slug" element={<SingleKolac />} />
            <Route path="/novosti" element={<Novosti />} />
            <Route path="/novosti/:slug" element={<SingleNovost />} />
            <Route path="/o-nama" element={<About />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/politika-privatnosti" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
