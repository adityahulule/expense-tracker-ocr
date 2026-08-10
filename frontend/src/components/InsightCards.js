import React from 'react';
import './InsightCards.css';

const InsightCards = ({ expenses }) => {
  // Logic to find highest spending crop
  const cropTotals = expenses.reduce((acc, curr) => {
    acc[curr.cropType] = (acc[curr.cropType] || 0) + curr.amount;
    return acc;
  }, {});

  const topCrop = Object.entries(cropTotals).sort((a, b) => b[1] - a[1])[0] || ["None", 0];

  // Logic to find most expensive category
  const catTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0] || ["None", 0];

  return (
    <div className="insights-container">
      <div className="insight-card">
        <div className="insight-icon">🌾</div>
        <div className="insight-info">
          <span>Top Crop Investment</span>
          <h3>{topCrop[0]}</h3>
          <p>₹{topCrop[1].toLocaleString()}</p>
        </div>
      </div>

      <div className="insight-card">
        <div className="insight-icon">⚠️</div>
        <div className="insight-info">
          <span>Major Expense Category</span>
          <h3>{topCat[0]}</h3>
          <p>₹{topCat[1].toLocaleString()}</p>
        </div>
      </div>

      <div className="insight-card highlight">
        <div className="insight-icon">📅</div>
        <div className="insight-info">
          <span>Active Season</span>
          <h3>Kharif 2026</h3>
          <p>Investment Period</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCards;