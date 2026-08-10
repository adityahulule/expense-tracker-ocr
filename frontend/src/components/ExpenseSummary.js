import React, { useMemo } from 'react';
import './ExpenseSummary.css';
import ExpenseCharts from './ExpenseCharts';

function ExpenseSummary({ expenses, total }) {
  // 1. Calculate Totals by Category
  const categoryTotals = useMemo(() => {
    const totals = {};
    expenses.forEach((expense) => {
      const category = expense.category || 'Other';
      totals[category] = (totals[category] || 0) + parseFloat(expense.amount || 0);
    });
    return totals;
  }, [expenses]);

  // 2. Calculate Totals by Crop Type (New Farmer Feature)
  const cropTotals = useMemo(() => {
    const totals = {};
    expenses.forEach((expense) => {
      const crop = expense.cropType || 'General Farm';
      totals[crop] = (totals[crop] || 0) + parseFloat(expense.amount || 0);
    });
    return totals;
  }, [expenses]);

  // 3. Indian Currency Formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const categoryEntries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const cropEntries = Object.entries(cropTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="expense-summary">
      <h2 style={{ color: '#14532d' }}>📊 Seasonal Farm Analysis</h2>

      <div className="summary-cards">
        <div className="summary-card total-card" style={{ background: 'linear-gradient(135deg, #14532d, #15803d)' }}>
          <h3>Total Farm Investment</h3>
          <div className="summary-amount">{formatCurrency(total)}</div>
        </div>

        <div className="summary-card count-card">
          <h3>Activity Records</h3>
          <div className="summary-amount">{expenses.length} Bills</div>
        </div>
      </div>

      <div className="analysis-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Crop-Wise Breakdown */}
        <div className="category-breakdown">
          <h3>🌾 Investment by Crop</h3>
          <div className="category-list">
            {cropEntries.map(([crop, amount]) => (
              <div key={crop} className="category-item">
                <div className="category-header">
                  <span className="category-name"><strong>{crop}</strong></span>
                  <span className="category-amount">{formatCurrency(amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="category-breakdown">
          <h3>🚜 Resource Breakdown</h3>
          <div className="category-list">
            {categoryEntries.map(([category, amount]) => {
              const percentage = total > 0 ? (amount / total) * 100 : 0;
              return (
                <div key={category} className="category-item">
                  <div className="category-header">
                    <span className="category-name">{category}</span>
                    <span className="category-amount">{formatCurrency(amount)}</span>
                  </div>
                  <div className="category-bar">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${percentage}%`, backgroundColor: '#15803d' }}
                    ></div>
                  </div>
                  <div className="category-percentage">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="chart-section" style={{ marginTop: '30px' }}>
        <ExpenseCharts expenses={expenses} />
      </div>
    </div>
  );
}

export default ExpenseSummary;