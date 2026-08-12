import React from 'react';
import './HeroSection.css';
import heroImg from '../assets/images/hero-farm.jpg';
import { useLanguage } from '../i18n/LanguageContext';


const HeroSection = ({ totalAmount }) => {

  const { t } = useLanguage();


  const formattedAmount =
    Number(totalAmount || 0).toLocaleString('en-IN');


  return (
    <div
      className="hero-card"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0,0,0,0.7),
            rgba(0,0,0,0.1)
          ),
          url(${heroImg})
        `
      }}
    >

      <div className="hero-content">

        {/* LIVE FARM TRACKING */}

        <span className="status-badge">
          {t('liveFarmTracking')}
        </span>


        {/* TITLE */}

        <h1>
          {t('smartAgricultureLedger')}
        </h1>


        {/* TOTAL INVESTMENT */}

        <p>
          {t('totalInvestmentSeason')}
        </p>


        {/* AMOUNT */}

        <h2 className="total-display">
          ₹{formattedAmount}
        </h2>

      </div>

    </div>
  );
};


export default HeroSection;