import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './App.css';

// Components
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ReceiptUpload from './components/ReceiptUpload';
import ExpenseSummary from './components/ExpenseSummary';
import HeroSection from './components/HeroSection';
import EmptyState from './components/EmptyState';
import InsightCards from './components/InsightCards';
import CategoryGrid from './components/CategoryGrid';
import ReminderPage from './components/Reminder/ReminderPage';

// Authentication
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Services
import { getExpenses } from './services/expenseService';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/* =========================================================
   DASHBOARD
========================================================= */

function DashboardContent() {

  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('');

  /* -------------------------------------------------------
     GET USER
  ------------------------------------------------------- */

  const userData = localStorage.getItem('user');

  const user = userData
    ? JSON.parse(userData)
    : {
        fullName: 'Farmer',
        role: 'USER'
      };

  const isAdmin = user.role === 'ADMIN';


  /* -------------------------------------------------------
     LOAD EXPENSES
  ------------------------------------------------------- */

  const loadData = async () => {

    try {

      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        return;
      }

      const currentUser = JSON.parse(storedUser);

      if (!currentUser.id) {
        console.error('User ID not found.');
        return;
      }

      const data = await getExpenses(currentUser.id);

      setExpenses(data || []);

    } catch (error) {

      console.error(
        'Error loading user expenses:',
        error
      );

      setExpenses([]);

    }
  };


  /* -------------------------------------------------------
     LOAD DATA WHEN DASHBOARD OPENS
  ------------------------------------------------------- */

  useEffect(() => {
    loadData();
  }, []);


  /* -------------------------------------------------------
     TOTAL EXPENSE
  ------------------------------------------------------- */

  const total = expenses.reduce(
    (sum, expense) =>
      sum + parseFloat(expense.amount || 0),
    0
  );


  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  const handleLogout = () => {

    localStorage.removeItem('user');

    window.location.href = '/login';

  };


  /* -------------------------------------------------------
     CHANGE TAB
  ------------------------------------------------------- */

  const handleTabChange = (tab) => {

    setActiveTab(tab);

  };


  /* =======================================================
     UI
  ======================================================= */

  return (

    <div className="dashboard-layout">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <nav className="side-nav">

        {/* LOGO */}

        <div className="logo">
          🌾 Krishi-Dhan
        </div>


        {/* DASHBOARD */}

        <button
          className={
            activeTab === 'list'
              ? 'active'
              : ''
          }
          onClick={() =>
            handleTabChange('list')
          }
        >
          📊 Dashboard
        </button>


        {/* ADD INVESTMENT */}

        <button
          className={
            activeTab === 'add'
              ? 'active'
              : ''
          }
          onClick={() =>
            handleTabChange('add')
          }
        >
          🌱 Add Investment
        </button>


        {/* REMINDERS */}

        <button
          className={
            activeTab === 'reminders'
              ? 'active'
              : ''
          }
          onClick={() =>
            handleTabChange('reminders')
          }
        >
          🔔 Reminders
        </button>


        {/* ADMIN ANALYTICS */}

        {isAdmin && (

          <button
            className={
              activeTab === 'analytics'
                ? 'active'
                : ''
            }
            onClick={() =>
              handleTabChange('analytics')
            }
          >
            📈 Admin Analytics
          </button>

        )}


        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </nav>


      {/* =================================================
          MAIN AREA
      ================================================= */}

      <main className="main-viewport">


        {/* =================================================
            TOP BAR
        ================================================= */}

        <header className="top-bar">

          <div className="welcome-text">

            <h2>
              Hello, {user.fullName}!
            </h2>

            <p>
              {new Date().toLocaleDateString(
                'en-IN',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              )}
            </p>

          </div>


          <div className="top-bar-actions">

            <div className="weather-chip">
              ☀️ 41°C | Pune
            </div>

            <div className="profile-chip">
              {user.fullName
                ? user.fullName.charAt(0).toUpperCase()
                : 'F'}
            </div>

          </div>

        </header>


        {/* =================================================
            DASHBOARD HEADER
        ================================================= */}

        {activeTab === 'list' && (

          <>
            <HeroSection
              totalAmount={total}
            />

            <InsightCards
              expenses={expenses}
            />
          </>

        )}


        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="content-container">


          {/* =================================================
              DASHBOARD
          ================================================= */}

          {activeTab === 'list' && (

            expenses.length === 0 ? (

              <EmptyState
                onAction={setActiveTab}
              />

            ) : (

              <ExpenseList
                expenses={expenses}
                onUpdate={loadData}
              />

            )

          )}


          {/* =================================================
              ADD INVESTMENT
          ================================================= */}

          {activeTab === 'add' && (

            <div className="add-investment-area">

              <CategoryGrid
                onSelect={(category) =>
                  setSelectedCategory(category)
                }
              />


              <div className="form-split">

                <ExpenseForm
                  initialCategory={
                    selectedCategory
                  }
                  onExpenseAdded={
                    loadData
                  }
                />


                <ReceiptUpload
                  onUploadSuccess={
                    loadData
                  }
                />

              </div>

            </div>

          )}


          {/* =================================================
              REMINDERS
          ================================================= */}

          {activeTab === 'reminders' && (

            <ReminderPage />

          )}


          {/* =================================================
              ADMIN ANALYTICS
          ================================================= */}

          {activeTab === 'analytics' && (

            <ExpenseSummary
              expenses={expenses}
            />

          )}

        </div>

      </main>

    </div>

  );
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem('user')
  );


  /* -------------------------------------------------------
     AUTHENTICATION STATE
  ------------------------------------------------------- */

  useEffect(() => {

    const handleStorage = () => {

      setIsAuth(
        !!localStorage.getItem('user')
      );

    };


    window.addEventListener(
      'storage',
      handleStorage
    );


    return () => {

      window.removeEventListener(
        'storage',
        handleStorage
      );

    };

  }, []);


  /* =======================================================
     ROUTES
  ======================================================= */

  return (

    <Router>

      <Routes>


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            isAuth
              ? <Navigate to="/dashboard" />
              : <Login />
          }
        />


        {/* REGISTER */}

        <Route
          path="/register"
          element={
            isAuth
              ? <Navigate to="/dashboard" />
              : <Register />
          }
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            isAuth
              ? <DashboardContent />
              : <Navigate to="/login" />
          }
        />


        {/* DEFAULT */}

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />


        {/* INVALID URL */}

        <Route
          path="*"
          element={
            <Navigate to="/login" />
          }
        />

      </Routes>


      {/* TOAST */}

      <ToastContainer
        position="bottom-right"
      />

    </Router>

  );
}


export default App;