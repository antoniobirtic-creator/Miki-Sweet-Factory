import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToAnchor from "./components/ScrollToAnchor";
import Home from "./pages/Home"; // Uvozimo Home stranicu
import Torte from "./pages/Torte";
import Kontakt from "./pages/Kontakt";

function App() {
  return (
    <Router>
      <ScrollToAnchor />
      <div className="app-wrapper">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/torte" element={<Torte />} />
            <Route path="/kontakt" element={<Kontakt />} />

            <Route
              path="/kolaci"
              element={
                <div className="container py-5 mt-5">Stranica u izradi...</div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
