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
import AdminDashboard from './components/admin/AdminDashboard';

// Authentication
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Services
import { getExpenses } from './services/expenseService';
import { getUserPermissions } from './services/permissionService';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/* =========================================================
   FARMER DASHBOARD
========================================================= */

function DashboardContent() {

  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Farmer permissions
  const [permissions, setPermissions] = useState(null);
  const [permissionLoading, setPermissionLoading] = useState(true);


  /* =========================================================
     GET CURRENT USER
  ========================================================= */

  const userData = localStorage.getItem('user');

  const user = userData
    ? JSON.parse(userData)
    : {
        fullName: 'Farmer',
        role: 'USER'
      };

  const isAdmin = user.role === 'ADMIN';


  /* =========================================================
     LOAD EXPENSES
  ========================================================= */

  const loadData = async () => {

    try {

      const storedUser =
        localStorage.getItem('user');

      if (!storedUser) {
        return;
      }

      const currentUser =
        JSON.parse(storedUser);

      if (!currentUser.id) {

        console.error(
          'User ID not found.'
        );

        return;
      }

      const data =
        await getExpenses(currentUser.id);

      setExpenses(data || []);

    } catch (error) {

      console.error(
        'Error loading user expenses:',
        error
      );

      setExpenses([]);
    }
  };


  /* =========================================================
     LOAD FARMER PERMISSIONS
  ========================================================= */

  const loadPermissions = async () => {

    try {

      // Admin doesn't need farmer permissions
      if (isAdmin) {

        setPermissionLoading(false);

        return;
      }

      const storedUser =
        localStorage.getItem('user');

      if (!storedUser) {

        setPermissionLoading(false);

        return;
      }

      const currentUser =
        JSON.parse(storedUser);

      if (!currentUser.id) {

        console.error(
          'User ID not found.'
        );

        setPermissionLoading(false);

        return;
      }

      const data =
        await getUserPermissions(
          currentUser.id
        );

      setPermissions(data);

    } catch (error) {

      console.error(
        'Error loading permissions:',
        error
      );

      /*
       * If permissions cannot be loaded,
       * don't give unrestricted access.
       */
      setPermissions({
        expenseAccess: false,
        ocrAccess: false,
        reminderAccess: false,
        cropManagementAccess: false,
        analyticsAccess: false,
        schemeAccess: false
      });

    } finally {

      setPermissionLoading(false);

    }
  };


  /* =========================================================
     LOAD DATA WHEN DASHBOARD OPENS
  ========================================================= */

  useEffect(() => {

    loadData();
    loadPermissions();

  }, []);


  /* =========================================================
     TOTAL EXPENSE
  ========================================================= */

  const total = expenses.reduce(
    (sum, expense) =>
      sum + parseFloat(
        expense.amount || 0
      ),
    0
  );


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {

    localStorage.removeItem('user');

    window.location.href = '/login';

  };


  /* =========================================================
     CHANGE TAB
  ========================================================= */

  const handleTabChange = (tab) => {

    setActiveTab(tab);

  };


  /* =========================================================
     PERMISSION LOADING
  ========================================================= */

  if (
    !isAdmin &&
    permissionLoading
  ) {

    return (

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f0fdf4'
        }}
      >

        <div
          style={{
            textAlign: 'center'
          }}
        >

          <div
            style={{
              fontSize: '45px'
            }}
          >
            🌾
          </div>

          <h2
            style={{
              color: '#14532d'
            }}
          >
            Loading Krishi-Dhan...
          </h2>

          <p>
            Checking your feature access...
          </p>

        </div>

      </div>

    );
  }


  /* =========================================================
     UI
  ========================================================= */

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


        {/* =================================================
            EXPENSE ACCESS
        ================================================= */}

        {permissions?.expenseAccess !== false && (

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

        )}


        {/* =================================================
            REMINDER ACCESS
        ================================================= */}

        {permissions?.reminderAccess !== false && (

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

        )}


        {/* =================================================
            FARMER ANALYTICS
        ================================================= */}

        {permissions?.analyticsAccess !== false && (

          <button
            className={
              activeTab === 'farmerAnalytics'
                ? 'active'
                : ''
            }
            onClick={() =>
              handleTabChange(
                'farmerAnalytics'
              )
            }
          >
            📈 My Analytics
          </button>

        )}


        {/* =================================================
            ADMIN ANALYTICS
        ================================================= */}

        {isAdmin && (

          <button
            className={
              activeTab === 'analytics'
                ? 'active'
                : ''
            }
            onClick={() =>
              handleTabChange(
                'analytics'
              )
            }
          >
            📈 Admin Analytics
          </button>

        )}


        {/* =================================================
            LOGOUT
        ================================================= */}

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
                ? user.fullName
                    .charAt(0)
                    .toUpperCase()
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

            permissions?.expenseAccess !== false ? (

              <div className="add-investment-area">

                <CategoryGrid
                  onSelect={(category) =>
                    setSelectedCategory(category)
                  }
                />


                <div className="form-split">

                  {/* Expense Form */}

                  <ExpenseForm
                    initialCategory={
                      selectedCategory
                    }
                    onExpenseAdded={
                      loadData
                    }
                  />


                  {/* OCR */}

                  {permissions?.ocrAccess !== false && (

                    <ReceiptUpload
                      onUploadSuccess={
                        loadData
                      }
                    />

                  )}

                </div>

              </div>

            ) : (

              <AccessDenied
                feature="Expense Tracking"
              />

            )

          )}


          {/* =================================================
              REMINDERS
          ================================================= */}

          {activeTab === 'reminders' && (

            permissions?.reminderAccess !== false ? (

              <ReminderPage />

            ) : (

              <AccessDenied
                feature="Reminders"
              />

            )

          )}


          {/* =================================================
              FARMER ANALYTICS
          ================================================= */}

          {activeTab === 'farmerAnalytics' && (

            permissions?.analyticsAccess !== false ? (

              <ExpenseSummary
                expenses={expenses}
              />

            ) : (

              <AccessDenied
                feature="Expense Analytics"
              />

            )

          )}


          {/* =================================================
              ADMIN ANALYTICS
          ================================================= */}

          {activeTab === 'analytics' && isAdmin && (

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
   ACCESS DENIED COMPONENT
========================================================= */

function AccessDenied({ feature }) {

  return (

    <div
      style={{
        background: 'white',
        borderRadius: '15px',
        padding: '60px 30px',
        textAlign: 'center',
        boxShadow:
          '0 4px 15px rgba(0,0,0,0.05)',
        marginTop: '20px'
      }}
    >

      <div
        style={{
          fontSize: '55px',
          marginBottom: '15px'
        }}
      >
        🔒
      </div>

      <h2
        style={{
          color: '#14532d'
        }}
      >
        Access Restricted
      </h2>

      <p
        style={{
          color: '#64748b'
        }}
      >
        You don't currently have access
        to <strong>{feature}</strong>.
      </p>

      <p
        style={{
          color: '#94a3b8',
          fontSize: '13px'
        }}
      >
        Please contact the administrator
        if you need access.
      </p>

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


  const [user, setUser] = useState(() => {

    const storedUser =
      localStorage.getItem('user');

    return storedUser
      ? JSON.parse(storedUser)
      : null;

  });


  /* =======================================================
     AUTHENTICATION STATE
  ======================================================= */

  useEffect(() => {

    const handleStorage = () => {

      const storedUser =
        localStorage.getItem('user');

      if (storedUser) {

        setUser(
          JSON.parse(storedUser)
        );

        setIsAuth(true);

      } else {

        setUser(null);
        setIsAuth(false);

      }

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
     DEFAULT PAGE AFTER LOGIN
  ======================================================= */

  const getHomeRoute = () => {

    if (!user) {
      return '/login';
    }

    if (user.role === 'ADMIN') {
      return '/admin';
    }

    return '/dashboard';

  };


  return (

    <Router>

      <Routes>


        {/* =================================================
            LOGIN
        ================================================= */}

        <Route
          path="/login"
          element={
            isAuth
              ? (
                <Navigate
                  to={getHomeRoute()}
                  replace
                />
              )
              : <Login />
          }
        />


        {/* =================================================
            REGISTER
        ================================================= */}

        <Route
          path="/register"
          element={
            isAuth
              ? (
                <Navigate
                  to={getHomeRoute()}
                  replace
                />
              )
              : <Register />
          }
        />


        {/* =================================================
            FARMER DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            isAuth &&
            user?.role !== 'ADMIN'

              ? <DashboardContent />

              : isAuth

                ? (
                  <Navigate
                    to="/admin"
                    replace
                  />
                )

                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
          }
        />


        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin"
          element={
            isAuth &&
            user?.role === 'ADMIN'

              ? <AdminDashboard />

              : isAuth

                ? (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                )

                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
          }
        />


        {/* =================================================
            DEFAULT
        ================================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to={getHomeRoute()}
              replace
            />
          }
        />


        {/* =================================================
            INVALID URL
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={getHomeRoute()}
              replace
            />
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