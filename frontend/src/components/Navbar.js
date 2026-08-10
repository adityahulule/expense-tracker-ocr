import React from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <span className="logo-emoji">🌾</span>
        <span className="logo-text">Krishi-Dhan</span>
      </div>
      <div className="nav-links">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'add' ? 'active' : ''} 
          onClick={() => setActiveTab('add')}
        >
          Add Investment
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>
      <div className="nav-profile">
        <div className="weather-widget">☀️ 31°C</div>
        <div className="user-avatar">JD</div>
      </div>
    </nav>
  );
};

export default Navbar;