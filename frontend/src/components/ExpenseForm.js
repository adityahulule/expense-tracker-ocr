import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';
import { createExpense } from '../services/expenseService';

function ExpenseForm({ onExpenseAdded, initialCategory }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
category: initialCategory || 'Seeds', // Default for farmers
    merchantName: '',
    cropType: '',
    season: '', // Default season
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

    useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({
        ...prev,
        category: initialCategory
      }));
    }
  }, [initialCategory]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Get the current user from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert("Please log in again.");
      return;
    }
    const user = JSON.parse(userData);

    try {
      // 2. Attach the user.id to the expense data
      const expenseToSave = {
        ...formData,
        userId: user.id, // This matches the 'private Long userId' in Java
        amount: parseFloat(formData.amount),
        expenseDate: new Date().toISOString()
      };

      // 3. Send the complete data
      await createExpense(expenseToSave);

      // Reset form and refresh
      setFormData({ description: '', amount: '', category: 'Seeds', cropType: '', season: 'Kharif' });
      onExpenseAdded(); 
      alert('Investment saved successfully!');
    } catch (error) {
      console.error('Error saving:', error.response?.data);
      alert('Failed to save. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form-container">
      <h2 style={{color: '#14532d'}}>🌱 Add Farm Investment</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="description">Item Description *</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="e.g., 50kg Urea Bag or Labor Wages"
          />
        </div>

        <div className="form-row" style={{display: 'flex', gap: '15px'}}>
          <div className="form-group" style={{flex: 1}}>
            <label htmlFor="amount">Amount (₹) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0.01"
              placeholder="0.00"
            />
          </div>
          <div className="form-group" style={{flex: 1}}>
            <label htmlFor="cropType">Crop Name *</label>
            <input
              type="text"
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              required
              placeholder="e.g., Wheat, Cotton"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Expense Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Seeds">Seeds</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Pesticide">Pesticide</option>
            <option value="Labor">Labor/Wages</option>
            <option value="Fuel">Fuel (Tractor/Pump)</option>
            <option value="Machinery">Machinery Rental</option>
            <option value="Irrigation">Irrigation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="season">Farming Season</label>
          <select
            id="season"
            name="season"
            value={formData.season}
            onChange={handleChange}
          >
            <option value="Kharif">Kharif (Monsoon)</option>
            <option value="Rabi">Rabi (Winter)</option>
            <option value="Zaid">Zaid (Summer)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="merchantName">Seller/Merchant Name</label>
          <input
            type="text"
            id="merchantName"
            name="merchantName"
            value={formData.merchantName}
            onChange={handleChange}
            placeholder="e.g., Local Agri-Center"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading} style={{backgroundColor: '#15803d'}}>
          {loading ? 'Saving...' : '💾 Save Farm Expense'}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;