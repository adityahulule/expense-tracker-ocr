import React, { useState } from 'react';
import './ExpenseFilters.css';

function ExpenseFilters({ onFilterChange, expenses }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('date-desc');

  // Get unique values for dropdowns from current data
  const categories = [...new Set(expenses.map(e => e.category).filter(Boolean))];
  const crops = [...new Set(expenses.map(e => e.cropType).filter(Boolean))];
  const seasons = [...new Set(expenses.map(e => e.season).filter(Boolean))];

  const applyFilters = (overrides = {}) => {
    const currentFilters = {
      searchTerm,
      selectedCategory,
      selectedCrop,
      selectedSeason,
      dateRange,
      amountRange,
      sortBy,
      ...overrides
    };
    onFilterChange(currentFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCrop('');
    setSelectedSeason('');
    setDateRange({ start: '', end: '' });
    setAmountRange({ min: '', max: '' });
    setSortBy('date-desc');
    onFilterChange({
      searchTerm: '',
      selectedCategory: '',
      selectedCrop: '',
      selectedSeason: '',
      dateRange: { start: '', end: '' },
      amountRange: { min: '', max: '' },
      sortBy: 'date-desc'
    });
  };

  return (
    <div className="expense-filters">
      <div className="filters-header">
        <h3 style={{ color: '#14532d' }}>🔍 Filter Farm Records</h3>
        <button onClick={clearFilters} className="btn-clear">Clear All</button>
      </div>

      <div className="filters-grid">
        {/* Search */}
        <div className="filter-group">
          <label>Search Item</label>
          <input
            type="text"
            placeholder="Search Urea, Seeds, Vendor..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); applyFilters({ searchTerm: e.target.value }); }}
            className="filter-input"
          />
        </div>

        {/* Crop Filter - NEW */}
        <div className="filter-group">
          <label>By Crop</label>
          <select
            value={selectedCrop}
            onChange={(e) => { setSelectedCrop(e.target.value); applyFilters({ selectedCrop: e.target.value }); }}
            className="filter-select"
          >
            <option value="">All Crops</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Season Filter - NEW */}
        <div className="filter-group">
          <label>By Season</label>
          <select
            value={selectedSeason}
            onChange={(e) => { setSelectedSeason(e.target.value); applyFilters({ selectedSeason: e.target.value }); }}
            className="filter-select"
          >
            <option value="">All Seasons</option>
            {seasons.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); applyFilters({ selectedCategory: e.target.value }); }}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="filter-group">
          <label>From Date</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => { const dr = { ...dateRange, start: e.target.value }; setDateRange(dr); applyFilters({ dateRange: dr }); }}
            className="filter-input"
          />
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label>Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); applyFilters({ sortBy: e.target.value }); }}
            className="filter-select"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Cost: High to Low</option>
            <option value="amount-asc">Cost: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilters;