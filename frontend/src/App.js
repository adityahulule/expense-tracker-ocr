import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ReceiptUpload from './components/ReceiptUpload';
import ExpenseSummary from './components/ExpenseSummary';
import { getExpenses } from './services/expenseService';
import HeroSection from './components/HeroSection';
import EmptyState from './components/EmptyState';
import InsightCards from './components/InsightCards';
import CategoryGrid from './components/CategoryGrid';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardContent() {
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : { fullName: 'Farmer', role: 'USER' };
  const isAdmin = user.role === 'ADMIN';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      try {
          // 1. Get user from storage
          const userData = localStorage.getItem('user');
          if (!userData) return;
          
          const user = JSON.parse(userData);
          
          // 2. Pass the user.id to the service
          // Make sure user.id exists (depends on your Login response)
          const data = await getExpenses(user.id); 
          
          setExpenses(data || []);
      } catch (error) {
          console.error('Error loading user expenses:', error);
      }
  };

  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-layout">
      <nav className="side-nav">
        <div className="logo">🌾 Krishi-Dhan</div>
        <button className={activeTab === 'list' ? 'active' : ''} onClick={() => setActiveTab('list')}>Dashboard</button>
        <button className={activeTab === 'add' ? 'active' : ''} onClick={() => setActiveTab('add')}>Add Investment</button>
        {isAdmin && <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>Admin Analytics</button>}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
      <main className="main-viewport">
        <header className="top-bar">
          <div className="welcome-text">
            <h2>Hello, {user.fullName}!</h2>
            <p>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="top-bar-actions">
            <div className="weather-chip">☀️ 41°C | Pune</div>
            <div className="profile-chip">{user.fullName.charAt(0)}</div>
          </div>
        </header>
        <HeroSection totalAmount={total} />
        <InsightCards expenses={expenses} />
        <div className="content-container">
          {activeTab === 'list' && (expenses.length === 0 ? <EmptyState onAction={setActiveTab} /> : <ExpenseList expenses={expenses} onUpdate={loadData} />)}
          {activeTab === 'add' && (
            <div className="add-investment-area">
              <CategoryGrid onSelect={(cat) => setSelectedCategory(cat)} />
              <div className="form-split">
                <ExpenseForm initialCategory={selectedCategory} onExpenseAdded={loadData} />
                <ReceiptUpload onUploadSuccess={loadData} />
              </div>
            </div>
          )}
          {activeTab === 'analytics' && <ExpenseSummary expenses={expenses} />}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('user'));

  useEffect(() => {
    const handleStorage = () => setIsAuth(!!localStorage.getItem('user'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuth ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={isAuth ? <DashboardContent /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;