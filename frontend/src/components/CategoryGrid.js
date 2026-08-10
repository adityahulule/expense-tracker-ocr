import React from 'react';
import './CategoryGrid.css';
// Ensure these paths match your folder structure exactly
import fertilizerIcon from '../assets/icons/fertilizer.png';
import fuelIcon from '../assets/icons/gas-station.png';
import laborIcon from '../assets/icons/labor.png';
import seedIcon from '../assets/icons/flax-seed.png';
import pestIcon from '../assets/icons/pesticide.png';
import irrigateIcon from '../assets/icons/irrigation.png';

const categories = [
  { id: 'seeds', name: 'Seeds', icon: seedIcon },
  { id: 'fertilizer', name: 'Fertilizer', icon: fertilizerIcon },
  { id: 'pesticide', name: 'Pesticide', icon: pestIcon },
  { id: 'labor', name: 'Labor', icon: laborIcon },
  { id: 'fuel', name: 'Fuel', icon: fuelIcon },
  { id: 'irrigation', name: 'Irrigation', icon: irrigateIcon },
];

const CategoryGrid = ({ onSelect }) => {
  return (
    <div className="category-section">
      <h3 className="section-title">Select Expense Category</h3>
      <div className="category-grid">
        {categories.map(cat => (
          <div key={cat.id} className="cat-item" onClick={() => onSelect(cat.name)}>
            <div className="icon-box">
              <img src={cat.icon} alt={cat.name} />
            </div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;