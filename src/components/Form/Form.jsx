import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { api } from "../../services/api";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";
import "./Form.css";

/**
 * Komponenta za kontakt formu s podrškom za EmailJS, WhatsApp integraciju,
 * SEO Schema Markup, Honeypot zaštitu od spama te dinamičnu background galeriju.
 */
const Form = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [bgImages, setBgImages] = useState([]);

  // Dohvaćanje slika iz HeroSlider API-ja
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const data = await api.getPosts("categories=59");
        const images = data
          .map(
            (slide) =>
              slide._embedded?.["wp:featuredmedia"]?.[0]?.source_url
          )
          .filter(Boolean); // Filtriramo null/undefined
        setBgImages(images);
      } catch (error) {
        console.error("API Error dohvata slika za formu:", error);
      }
    };
    fetchHeroImages();
  }, []);

  /**
   * Pomoćna funkcija za validaciju podataka prije slanja.
   * @param {string} type - Kanal slanja ('email' ili 'whatsapp')
   * @returns {Object|null} - Vraća podatke ako su validni, inače null.
   */
  const validateData = (type) => {
    const formData = new FormData(formRef.current);
    const name = formData.get("user_name").trim();
    const email = formData.get("user_email").trim();
    const message = formData.get("message").trim();
    const phone = formData.get("user_phone")?.trim() || "";
    const cakeType = formData.get("cake_type")?.trim() || "";
    const botCheck = formData.get("_honey");

    // 1. Honeypot provjera (ne šaljemo ništa ako je bot popunio skriveno polje)
    if (botCheck) {
      console.warn("Spam detected");
      setResult("success"); // Prevarimo bota
      formRef.current.reset();
      return null;
    }

    // 2. Osnovna validacija (Ime i poruka su uvijek obavezni)
    if (!name || !message) {
      alert("Molimo unesite vaše ime i narudžbu.");
      return null;
    }

    // 3. Email je obavezan samo za Email kanal
    if (type === "email" && !email) {
      alert("Molimo unesite email adresu za slanje pošte.");
      return null;
    }

    return { name, email, phone, cakeType, message };
  };

  /**
   * Šalje formu putem EmailJS servisa.
   */
  const sendEmail = async (e) => {
    e.preventDefault();
    const data = validateData("email");
    if (!data) return;

    setLoading(true);
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: data.name,
          user_email: data.email,
          user_phone: data.phone,
          cake_type: data.cakeType,
          message: data.message,
        },
        PUBLIC_KEY
      );
      setResult("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setResult("error");
    } finally {
      setLoading(false);
      setTimeout(() => setResult(null), 5000);
    }
  };

  /**
   * Generira i otvara WhatsApp poruku s podacima iz forme.
   */
  const handleWhatsApp = (e) => {
    e.preventDefault();
    const data = validateData("whatsapp");
    if (!data) return;

    const waNumber = "385958718497";
    const waText = `*Novi upit s weba*\n\n*Ime i prezime:* ${data.name}\n*Email:* ${
      data.email || "Nije naveden"
    }\n*Mobitel:* ${data.phone || "Nije naveden"}\n*Vrsta slastice:* ${data.cakeType || "Nije odabrano"}\n*Opis:* ${data.message}`;

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`,
      "_blank"
    );
  };

  return (
    <div className="contact-form-wrapper" id="slatki-upit">
      {/* Background Slider */}
      {bgImages.length > 0 && (
        <div className="contact-form-bg-slider">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={2000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={bgImages.length > 1}
            allowTouchMove={false}
            className="w-100 h-100"
          >
            {bgImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className="bg-slide-item"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Ovdje dodajemo prozirni tamni overlay preko slajdera */}
          <div className="bg-overlay"></div>
        </div>
      )}

      {/* SEO: Structured Data za Google pretragu */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Bakery",
          name: "Miki Sweet Factory",
          description: "Domaće torte i kolači po narudžbi u Đakovu.",
          telephone: "+385958718497",
          areaServed: "Đakovo i okolica, Hrvatska",
          openingHours: "Mo-Fr 08:00-20:00, Sa 08:00-20:00",
        })}
      </script>

      <div className="container contact-form-inner position-relative py-5">
        <form ref={formRef} className="glassmorphism-form mx-auto">
          <div className="form-header text-center mb-4">
            <h2 className="form-title text-white fw-bold mb-2">
              Pošaljite slatki upit
            </h2>
            <p className="form-subtitle text-white-50 small">
              Ispunite obrazac, a mi ćemo vam se javiti u najkraćem roku.
            </p>
          </div>

          {/* HONEYPOT - Skriveno za ljude */}
          <div className="hp-field d-none">
            <input type="text" name="_honey" tabIndex="-1" autoComplete="off" />
          </div>

          <div className="row g-3">
            {/* Ime i Prezime */}
            <div className="col-md-6 form-group">
              <label htmlFor="user_name" className="form-label text-white small">
                Ime i Prezime
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="form-control glass-input"
                placeholder="Vaše ime"
              />
            </div>

            {/* Email */}
            <div className="col-md-6 form-group">
              <label htmlFor="user_email" className="form-label text-white small">
                Email adresa
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                className="form-control glass-input"
                placeholder="primjer@mail.com"
              />
            </div>

            {/* Broj mobitela */}
            <div className="col-md-6 form-group">
              <label htmlFor="user_phone" className="form-label text-white small">
                Broj mobitela
              </label>
              <input
                type="tel"
                id="user_phone"
                name="user_phone"
                className="form-control glass-input"
                placeholder="+385 9x xxx xxxx"
              />
            </div>

            {/* Vrsta slastice */}
            <div className="col-md-6 form-group">
              <label htmlFor="cake_type" className="form-label text-white small">
                Vrsta slastice
              </label>
              <select
                id="cake_type"
                name="cake_type"
                className="form-select glass-input"
              >
                <option value="">Odaberite...</option>
                <option value="Torta">Torta</option>
                <option value="Kolači">Kolači</option>
                <option value="Slatki stol">Slatki stol</option>
                <option value="Ostalo">Ostalo</option>
              </select>
            </div>



            {/* Opis */}
            <div className="col-12 form-group text-area-group">
              <label htmlFor="message" className="form-label text-white small">
                Opis vaše idealne slastice
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control glass-input"
                rows="4"
                placeholder="Recite nam detalje..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="col-12 form-actions mt-4 text-center d-flex justify-content-center gap-3">
              <button
                type="button"
                onClick={sendEmail}
                className="btn-submit-form d-flex align-items-center gap-2"
                disabled={loading}
              >
                <FaEnvelope /> {loading ? "Slanje..." : "Email narudžba"}
              </button>
              
              <button
                 type="button"
                 onClick={handleWhatsApp}
                 className="btn-submit-form whatsapp-btn d-flex align-items-center gap-2 px-4"
                 title="Pošalji upit putem WhatsApp-a"
              >
                 <FaWhatsapp /> WhatsApp
              </button>
            </div>
          </div>

          {/* Feedback poruke */}
          {result === "success" && (
            <div className="alert alert-success mt-3 small text-center" role="alert">
              Uspješno poslano! Javit ćemo se ubrzo.
            </div>
          )}
          {result === "error" && (
            <div className="alert alert-danger mt-3 small text-center" role="alert">
              Došlo je do greške pri slanju.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
