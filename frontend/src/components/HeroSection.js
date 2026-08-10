import React from 'react';
import './HeroSection.css';
import heroImg from '../assets/images/hero-farm.jpg';

const HeroSection = ({ totalAmount }) => {
  return (
    <div className="hero-card" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${heroImg})` }}>
      <div className="hero-content">
        <span className="status-badge">Live Farm Tracking</span>
        <h1>Smart Agriculture Ledger</h1>
        <p>Total Investment this Season:</p>
        <h2 className="total-display">₹{totalAmount.toLocaleString()}</h2>
      </div>
    </div>
  );
};

export default HeroSection;