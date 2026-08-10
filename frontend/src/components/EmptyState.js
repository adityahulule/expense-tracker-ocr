import React from 'react';

const EmptyState = ({ onAction }) => {
  return (
    <div className="empty-state-container">
      {/* Using your line-style art vibes */}
      <div className="empty-icon-circle">
        <img src="/assets/cogwheel.png" alt="Setup" className="floating-cog" />
      </div>
      
      <h2>Your Farm Ledger is Empty</h2>
      <p>Start tracking your investments to see detailed crop analytics and spending trends.</p>
      
      <div className="empty-state-actions">
        <button className="btn-primary" onClick={() => onAction('add')}>
          ➕ Add First Bill
        </button>
        <button className="btn-secondary" onClick={() => onAction('upload')}>
          📷 Scan Receipt
        </button>
      </div>
    </div>
  );
};

export default EmptyState;