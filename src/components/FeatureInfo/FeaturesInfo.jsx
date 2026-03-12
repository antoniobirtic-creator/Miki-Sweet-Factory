import React from 'react';
import { FaUtensils, FaBirthdayCake, FaGift } from 'react-icons/fa';
import './FeaturesInfo.css';

const FeaturesInfo = () => {
  const features = [
    {
      icon: <FaUtensils className="feature-info-icon" />,
      title: "SVEČANE PRIGODE",
      text: "Vaši najvažniji trenuci zaslužuju najslađe uspomene. Kreiramo personalizirane torte i bogate desertne stolove za vjenčanja, krštenja i krizme, prilagođene vašem stilu i željama."
    },
    {
      icon: <FaBirthdayCake className="feature-info-icon" />,
      title: "ROĐENDANSKA ČAROLIJA",
      text: "Od dječjih snova do elegantnih jubilarnih proslava. Naše rođendanske torte izrađene su od najkvalitetnijih namirnica s puno ljubavi i pažnje prema svakom detalju."
    },
    {
      icon: <FaGift className="feature-info-icon" />,
      title: "POKLON PAKETI",
      text: "Tražite savršen poklon? Naši Selection Box kolači i personalizirani slatki paketi idealan su način da nekome uljepšate dan ili zahvalite poslovnim partnerima."
    }
  ];

  return (
    <section className="features-info-section">
      <div className="container">
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4">
              <div className="feature-info-card">
                <div className="feature-info-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-info-title">{feature.title}</h3>
                <p className="feature-info-text">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesInfo;
