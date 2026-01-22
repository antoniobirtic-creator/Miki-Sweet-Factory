import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HeroSlider from './components/HeroSlider/HeroSlider';

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
            <Route path="/torte" element={<div style={{paddingTop: '100px'}}>Stranica s tortama u izradi...</div>} />
            <Route path="/kolaci" element={<div style={{paddingTop: '100px'}}>Stranica s kolačima u izradi...</div>} />
            <Route path="/kontakt" element={<div style={{paddingTop: '100px'}}>Kontakt stranica u izradi...</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;