import React, { useEffect, useMemo, useState } from 'react';

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import axios from 'axios';

import './SystemAnalytics.css';


function SystemAnalytics({
  farmers = [],
  expenses = [],
  notifications = []
}) {

  // =====================================================
  // TOTAL FARMERS
  // =====================================================

  const [totalFarmers, setTotalFarmers] = useState(
    Array.isArray(farmers) ? farmers.length : 0
  );


  // =====================================================
  // LOAD ADMIN DASHBOARD STATISTICS
  // =====================================================

  useEffect(() => {

    const loadDashboardStats = async () => {

      try {

        const API_URL =
          process.env.REACT_APP_API_URL ||
          'https://expense-tracker-ocr-6.onrender.com';


        const response = await axios.get(
          `${API_URL}/api/admin/dashboard-stats`
        );


        console.log(
          'System Analytics Stats:',
          response.data
        );


        setTotalFarmers(
          Number(
            response.data?.totalFarmers || 0
          )
        );


      } catch (error) {

        console.error(
          'System Analytics Stats Error:',
          error
        );


        // Fallback to farmers prop

        setTotalFarmers(
          Array.isArray(farmers)
            ? farmers.length
            : 0
        );

      }

    };


    loadDashboardStats();

  }, [farmers]);


  // =====================================================
  // BASIC SYSTEM STATISTICS
  // =====================================================

  const totalExpenses =
    expenses.length;


  const totalNotifications =
    notifications.length;


  const totalInvestment =
    expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );


  // =====================================================
  // CATEGORY-WISE EXPENSE
  // =====================================================

  const categoryData = useMemo(() => {

    const totals = {};


    expenses.forEach((expense) => {

      const category =
        expense.category || 'Other';


      totals[category] =
        (totals[category] || 0) +
        Number(expense.amount || 0);

    });


    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      );

  }, [expenses]);


  // =====================================================
  // CROP-WISE EXPENSE
  // =====================================================

  const cropData = useMemo(() => {

    const totals = {};


    expenses.forEach((expense) => {

      const crop =
        expense.cropType ||
        'General Farm';


      totals[crop] =
        (totals[crop] || 0) +
        Number(expense.amount || 0);

    });


    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      );

  }, [expenses]);


  // =====================================================
  // MONTHLY EXPENSE
  // =====================================================

  const monthlyData = useMemo(() => {

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];


    const totals =
      months.map((month) => ({
        month,
        amount: 0
      }));


    expenses.forEach((expense) => {

      const date =
        new Date(
          expense.expenseDate ||
          expense.createdAt
        );


      if (
        !Number.isNaN(
          date.getTime()
        )
      ) {

        const monthIndex =
          date.getMonth();


        totals[monthIndex].amount +=
          Number(
            expense.amount || 0
          );

      }

    });


    return totals;

  }, [expenses]);


  // =====================================================
  // SEASON-WISE EXPENSE
  // =====================================================

  const seasonData = useMemo(() => {

    const totals = {};


    expenses.forEach((expense) => {

      const season =
        expense.season ||
        'Other';


      totals[season] =
        (totals[season] || 0) +
        Number(expense.amount || 0);

    });


    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value
      }));

  }, [expenses]);


  // =====================================================
  // CURRENCY
  // =====================================================

  const formatCurrency = (amount) => {

    return new Intl.NumberFormat(
      'en-IN',
      {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }
    ).format(amount);

  };


  // =====================================================
  // COLORS
  // =====================================================

  const COLORS = [
    '#15803d',
    '#22c55e',
    '#84cc16',
    '#eab308',
    '#f97316',
    '#ef4444',
    '#3b82f6',
    '#8b5cf6'
  ];


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="system-analytics">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="analytics-header">

        <div>

          <h2>
            📊 System Analytics
          </h2>

          <p>
            Overall performance and
            farming expense analysis
          </p>

        </div>

      </div>


      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="analytics-summary">


        {/* FARMERS */}

        <div className="analytics-card farmer-card">

          <div className="analytics-icon">
            👨‍🌾
          </div>

          <div>

            <span>
              Total Farmers
            </span>

            <h3>
              {totalFarmers}
            </h3>

          </div>

        </div>


        {/* INVESTMENT */}

        <div className="analytics-card investment-card">

          <div className="analytics-icon">
            💰
          </div>

          <div>

            <span>
              Total Investment
            </span>

            <h3>
              {formatCurrency(
                totalInvestment
              )}
            </h3>

          </div>

        </div>


        {/* RECORDS */}

        <div className="analytics-card expense-card">

          <div className="analytics-icon">
            📄
          </div>

          <div>

            <span>
              Expense Records
            </span>

            <h3>
              {totalExpenses}
            </h3>

          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div className="analytics-card notification-card">

          <div className="analytics-icon">
            🔔
          </div>

          <div>

            <span>
              Notifications
            </span>

            <h3>
              {totalNotifications}
            </h3>

          </div>

        </div>

      </div>


      {/* =================================================
          MONTHLY INVESTMENT
      ================================================= */}

      <div className="analytics-section">

        <div className="analytics-section-header">

          <h3>
            📈 Monthly Investment
          </h3>

          <span>
            Investment Trend
          </span>

        </div>


        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={monthlyData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
              />

              <YAxis
                tickFormatter={(value) =>
                  `₹${value}`
                }
              />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(value)
                }
              />

              <Bar
                dataKey="amount"
                fill="#15803d"
                radius={[
                  6,
                  6,
                  0,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* =================================================
          TWO COLUMN ANALYTICS
      ================================================= */}

      <div className="analytics-grid">


        {/* CATEGORY */}

        <div className="analytics-section">

          <div className="analytics-section-header">

            <h3>
              📂 Category-wise Investment
            </h3>

          </div>


          {categoryData.length === 0 ? (

            <div className="empty-analytics">

              No expense data available.

            </div>

          ) : (

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    {categoryData.map(
                      (entry, index) => (

                        <Cell
                          key={
                            `category-${index}`
                          }
                          fill={
                            COLORS[
                              index %
                              COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(value)
                    }
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>


        {/* CROP */}

        <div className="analytics-section">

          <div className="analytics-section-header">

            <h3>
              🌾 Crop-wise Investment
            </h3>

          </div>


          {cropData.length === 0 ? (

            <div className="empty-analytics">

              No crop data available.

            </div>

          ) : (

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <BarChart
                  data={cropData}
                  layout="vertical"
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    tickFormatter={(value) =>
                      `₹${value}`
                    }
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                  />

                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(value)
                    }
                  />

                  <Bar
                    dataKey="value"
                    fill="#22c55e"
                    radius={[
                      0,
                      6,
                      6,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          SEASON ANALYSIS
      ================================================= */}

      <div className="analytics-section">

        <div className="analytics-section-header">

          <h3>
            🗓️ Season-wise Investment
          </h3>

        </div>


        {seasonData.length === 0 ? (

          <div className="empty-analytics">

            No season data available.

          </div>

        ) : (

          <div className="season-list">

            {seasonData.map(
              (season) => (

                <div
                  className="season-item"
                  key={season.name}
                >

                  <div>

                    <strong>
                      {season.name}
                    </strong>

                  </div>

                  <span>
                    {formatCurrency(
                      season.value
                    )}
                  </span>

                </div>

              )
            )}

          </div>

        )}

      </div>


    </div>

  );

}


export default SystemAnalytics;