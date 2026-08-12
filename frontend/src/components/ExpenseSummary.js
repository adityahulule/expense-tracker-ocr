import React, { useMemo } from 'react';
import './ExpenseSummary.css';
import ExpenseCharts from './ExpenseCharts';


function ExpenseSummary({ expenses = [] }) {

  // =====================================================
  // TOTAL FARM INVESTMENT
  // =====================================================

  const total = useMemo(() => {

    return expenses.reduce(
      (sum, expense) =>
        sum + parseFloat(expense.amount || 0),
      0
    );

  }, [expenses]);


  // =====================================================
  // CATEGORY-WISE TOTAL
  // =====================================================

  const categoryTotals = useMemo(() => {

    const totals = {};

    expenses.forEach((expense) => {

      const category =
        expense.category || 'Other';

      totals[category] =
        (totals[category] || 0) +
        parseFloat(expense.amount || 0);

    });

    return totals;

  }, [expenses]);


  // =====================================================
  // CROP-WISE TOTAL
  // =====================================================

  const cropTotals = useMemo(() => {

    const totals = {};

    expenses.forEach((expense) => {

      const crop =
        expense.cropType || 'General Farm';

      totals[crop] =
        (totals[crop] || 0) +
        parseFloat(expense.amount || 0);

    });

    return totals;

  }, [expenses]);


  // =====================================================
  // SEASON-WISE TOTAL
  // =====================================================

  const seasonTotals = useMemo(() => {

    const totals = {};

    expenses.forEach((expense) => {

      const season =
        expense.season || 'Other';

      totals[season] =
        (totals[season] || 0) +
        parseFloat(expense.amount || 0);

    });

    return totals;

  }, [expenses]);


  // =====================================================
  // CURRENCY FORMAT
  // =====================================================

  const formatCurrency = (amount) => {

    return new Intl.NumberFormat(
      'en-IN',
      {
        style: 'currency',
        currency: 'INR'
      }
    ).format(amount);

  };


  // =====================================================
  // SORT DATA
  // =====================================================

  const categoryEntries =
    Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1]);


  const cropEntries =
    Object.entries(cropTotals)
      .sort((a, b) => b[1] - a[1]);


  const seasonEntries =
    Object.entries(seasonTotals)
      .sort((a, b) => b[1] - a[1]);


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="expense-summary">

      {/* =================================================
          TITLE
      ================================================= */}

      <h2
        style={{
          color: '#14532d'
        }}
      >
        📊 Farm Investment Analysis
      </h2>


      <p
        style={{
          color: '#64748b',
          marginBottom: '25px'
        }}
      >
        Analyze your farm investment,
        crop-wise and resource-wise expenses.
      </p>


      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="summary-cards">

        {/* TOTAL INVESTMENT */}

        <div
          className="summary-card total-card"
          style={{
            background:
              'linear-gradient(135deg, #14532d, #15803d)'
          }}
        >

          <h3>
            💰 Total Farm Investment
          </h3>

          <div className="summary-amount">
            {formatCurrency(total)}
          </div>

        </div>


        {/* ACTIVITY RECORDS */}

        <div className="summary-card count-card">

          <h3>
            📄 Activity Records
          </h3>

          <div className="summary-amount">
            {expenses.length} Bills
          </div>

        </div>

      </div>


      {/* =================================================
          CROP + CATEGORY ANALYSIS
      ================================================= */}

      <div
        className="analysis-grid"
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}
      >


        {/* =================================================
            CROP-WISE BREAKDOWN
        ================================================= */}

        <div className="category-breakdown">

          <h3>
            🌾 Investment by Crop
          </h3>

          <div className="category-list">

            {cropEntries.length === 0 ? (

              <p>
                No crop-wise data available.
              </p>

            ) : (

              cropEntries.map(
                ([crop, amount]) => (

                  <div
                    key={crop}
                    className="category-item"
                  >

                    <div
                      className="category-header"
                    >

                      <span className="category-name">
                        <strong>
                          {crop}
                        </strong>
                      </span>

                      <span className="category-amount">
                        {formatCurrency(amount)}
                      </span>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


        {/* =================================================
            CATEGORY BREAKDOWN
        ================================================= */}

        <div className="category-breakdown">

          <h3>
            🚜 Resource Breakdown
          </h3>

          <div className="category-list">

            {categoryEntries.length === 0 ? (

              <p>
                No expense data available.
              </p>

            ) : (

              categoryEntries.map(
                ([category, amount]) => {

                  const percentage =
                    total > 0
                      ? (amount / total) * 100
                      : 0;

                  return (

                    <div
                      key={category}
                      className="category-item"
                    >

                      <div
                        className="category-header"
                      >

                        <span className="category-name">
                          {category}
                        </span>

                        <span className="category-amount">
                          {formatCurrency(amount)}
                        </span>

                      </div>


                      <div className="category-bar">

                        <div
                          className="category-bar-fill"
                          style={{
                            width:
                              `${percentage}%`,
                            backgroundColor:
                              '#15803d'
                          }}
                        />

                      </div>


                      <div className="category-percentage">

                        {percentage.toFixed(1)}%

                      </div>

                    </div>

                  );

                }
              )

            )}

          </div>

        </div>

      </div>


      {/* =================================================
          SEASON ANALYSIS
      ================================================= */}

      <div
        className="category-breakdown"
        style={{
          marginTop: '20px'
        }}
      >

        <h3>
          🌦️ Investment by Season
        </h3>

        <div className="category-list">

          {seasonEntries.length === 0 ? (

            <p>
              No season-wise data available.
            </p>

          ) : (

            seasonEntries.map(
              ([season, amount]) => {

                const percentage =
                  total > 0
                    ? (amount / total) * 100
                    : 0;

                return (

                  <div
                    key={season}
                    className="category-item"
                  >

                    <div
                      className="category-header"
                    >

                      <span className="category-name">

                        <strong>
                          {season}
                        </strong>

                      </span>

                      <span className="category-amount">
                        {formatCurrency(amount)}
                      </span>

                    </div>


                    <div className="category-bar">

                      <div
                        className="category-bar-fill"
                        style={{
                          width:
                            `${percentage}%`,
                          backgroundColor:
                            '#15803d'
                        }}
                      />

                    </div>


                    <div className="category-percentage">

                      {percentage.toFixed(1)}%

                    </div>

                  </div>

                );

              }
            )

          )}

        </div>

      </div>


      {/* =================================================
          MONTHLY CHART
      ================================================= */}

      <div
        className="chart-section"
        style={{
          marginTop: '30px'
        }}
      >

        <ExpenseCharts
          expenses={expenses}
        />

      </div>

    </div>

  );

}


export default ExpenseSummary;