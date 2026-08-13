import React from 'react';
import './InsightCards.css';
import { useLanguage } from '../i18n/LanguageContext';

const InsightCards = ({ expenses }) => {

  const { t } = useLanguage();

  // =====================================================
  // FIND TOP CROP
  // =====================================================

  const cropTotals = expenses.reduce(
    (acc, curr) => {

      const amount =
        Number(curr.amount) || 0;

      const crop =
        curr.cropType || 'Unknown';

      acc[crop] =
        (acc[crop] || 0) + amount;

      return acc;

    },
    {}
  );

  const topCrop =
    Object.entries(cropTotals)
      .sort(
        (a, b) => b[1] - a[1]
      )[0] || ['None', 0];


  // =====================================================
  // FIND MAJOR EXPENSE CATEGORY
  // =====================================================

  const catTotals = expenses.reduce(
    (acc, curr) => {

      const category =
        curr.category || 'Other';

      const amount =
        Number(curr.amount) || 0;

      acc[category] =
        (acc[category] || 0) + amount;

      return acc;

    },
    {}
  );

  const topCat =
    Object.entries(catTotals)
      .sort(
        (a, b) => b[1] - a[1]
      )[0] || ['None', 0];


  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatAmount = (amount) => {

    return Number(amount || 0)
      .toLocaleString('en-IN');

  };


  // =====================================================
  // COMPONENT
  // =====================================================

  return (

    <div className="insights-container">


      {/* =================================================
          TOP CROP INVESTMENT
      ================================================= */}

      <div className="insight-card">

        <div className="insight-icon">
          🌾
        </div>

        <div className="insight-info">

          <span>
            {t('topCropInvestment')}
          </span>

          <h3>
            {topCrop[0] === 'None'
              ? t('noData')
              : topCrop[0]
            }
          </h3>

          <p>
            ₹{formatAmount(topCrop[1])}
          </p>

        </div>

      </div>


      {/* =================================================
          MAJOR EXPENSE CATEGORY
      ================================================= */}

      <div className="insight-card">

        <div className="insight-icon">
          ⚠️
        </div>

        <div className="insight-info">

          <span>
            {t('majorExpenseCategory')}
          </span>

          <h3>
            {topCat[0] === 'None'
              ? t('noData')
              : topCat[0]
            }
          </h3>

          <p>
            ₹{formatAmount(topCat[1])}
          </p>

        </div>

      </div>


      {/* =================================================
          ACTIVE SEASON
      ================================================= */}

      <div className="insight-card">

        <div className="insight-icon">
          📅
        </div>

        <div className="insight-info">

          <span>
            {t('activeSeason')}
          </span>

          <h3>
            Kharif 2026
          </h3>

          <p>
            {t('investmentPeriod')}
          </p>

        </div>

      </div>

    </div>

  );

};

export default InsightCards;