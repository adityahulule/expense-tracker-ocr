import React, { useState } from 'react';
import './ExpenseList.css';
import { deleteExpense, updateExpense } from '../services/expenseService';
import ExpenseFilters from './ExpenseFilters';
import { toast } from 'react-toastify';

// Changed props to match what App.js sends: { expenses, onUpdate }
function ExpenseList({ expenses: allExpenses, loading, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState(allExpenses);
  const [editForm, setEditForm] = useState({});

  React.useEffect(() => {
    setFilteredExpenses(allExpenses);
  }, [allExpenses]);

  const handleViewReceipt = (id) => {
    window.open(`http://localhost:8081/api/expenses/receipt/${id}`, '_blank');
  };

  const handleFilterChange = (filters) => {
    let filtered = [...allExpenses];
    // ... (Your filter logic is perfect, keeping it as is)
    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(expense =>
        (expense.description?.toLowerCase().includes(search)) ||
        (expense.merchantName?.toLowerCase().includes(search)) ||
        (expense.cropType?.toLowerCase().includes(search)) ||
        (expense.category?.toLowerCase().includes(search))
      );
    }
    // (Filtering continued...)
    if (filters.selectedCategory) filtered = filtered.filter(e => e.category === filters.selectedCategory);
    if (filters.selectedCrop) filtered = filtered.filter(e => e.cropType === filters.selectedCrop);
    if (filters.selectedSeason) filtered = filtered.filter(e => e.season === filters.selectedSeason);
    
    setFilteredExpenses(filtered);
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      description: expense.description || '',
      amount: expense.amount || 0,
      category: expense.category || 'General Farming',
      merchantName: expense.merchantName || '',
      cropType: expense.cropType || '',
      season: expense.season || 'Kharif'
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateExpense(id, editForm);
      setEditingId(null);
      toast.success("Record updated successfully");
      onUpdate(); // Refreshes the dashboard
    } catch (error) {
      console.error('Error updating:', error);
      toast.error('Failed to update record');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this farm record?")) {
      try {
        await deleteExpense(id);
        toast.success("Record deleted successfully");
        onUpdate(); // Refreshes the dashboard
      } catch (error) {
        toast.error("Failed to delete record");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  if (loading) return <div className="loading">Loading farm records...</div>;

  return (
    <div className="expense-list">
      <div className="list-header">
        <h2 style={{color: '#14532d'}}>🌾 Farm Records ({filteredExpenses.length})</h2>
        <p className="subtitle">Track your seasonal investments and spending</p>
      </div>
      
      <ExpenseFilters onFilterChange={handleFilterChange} expenses={allExpenses} />

      <div className="expenses-container">
        {filteredExpenses.length === 0 ? (
          <div className="no-results">No records found.</div>
        ) : (
          filteredExpenses.map((expense) => (
            <div key={expense.id} className={`transaction-card ${editingId === expense.id ? 'editing' : ''}`}>
              
              {editingId === expense.id ? (
                <div className="edit-form-inline">
                  <div className="edit-grid">
                    <input type="text" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} placeholder="Description" className="edit-input" />
                    <input type="number" value={editForm.amount} onChange={(e) => setEditForm({...editForm, amount: e.target.value})} placeholder="Amount" className="edit-input" />
                    <input type="text" value={editForm.cropType} onChange={(e) => setEditForm({...editForm, cropType: e.target.value})} placeholder="Crop" className="edit-input" />
                    <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})} className="edit-input">
                      <option value="Seeds">Seeds</option>
                      <option value="Fertilizer">Fertilizer</option>
                      <option value="Labor">Labor</option>
                      <option value="General Farming">General Farming</option>
                    </select>
                    <select value={editForm.season} onChange={(e) => setEditForm({...editForm, season: e.target.value})} className="edit-input">
                      <option value="Kharif">Kharif</option>
                      <option value="Rabi">Rabi</option>
                    </select>
                  </div>
                  <div className="edit-actions">
                    <button onClick={() => handleSaveEdit(expense.id)} className="btn-save">Save</button>
                    <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="card-left">
                    <div className="card-main-info">
                      <h3>{expense.merchantName || expense.description || 'Agriculture Store'}</h3>
                      <div className="badge-row">
                        <span className="badge category">{expense.category}</span>
                        <span className="badge crop">🌾 {expense.cropType || 'Mixed'}</span>
                        <span className="badge season">🗓️ {expense.season}</span>
                      </div>
                      <p className="date-text">📅 {formatDate(expense.expenseDate)}</p>
                    </div>
                  </div>

                  <div className="card-right">
                    <div className="amount-display">{formatCurrency(expense.amount)}</div>
                    <div className="action-buttons">
                      <button className="btn-icon view" onClick={() => handleViewReceipt(expense.id)} title="View Receipt">🖼️</button>
                      <button className="btn-icon edit" onClick={() => handleEdit(expense)} title="Edit">✏️</button>
                      <button className="btn-icon delete" onClick={() => handleDelete(expense.id)} title="Delete">🗑️</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;