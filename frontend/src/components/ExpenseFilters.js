import React, { useState } from 'react';
import './ExpenseFilters.css';
import { useLanguage } from '../i18n/LanguageContext';


function ExpenseFilters({ onFilterChange, expenses = [] }) {

  const { language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const [amountRange, setAmountRange] = useState({
    min: '',
    max: ''
  });

  const [sortBy, setSortBy] =
    useState('date-desc');


  // =====================================================
  // TRANSLATIONS
  // =====================================================

  const translations = {

    en: {
      filterFarmRecords: 'Filter Farm Records',
      clearAll: 'Clear All',

      searchItem: 'Search Item',
      searchPlaceholder:
        'Search Urea, Seeds, Vendor...',

      byCrop: 'By Crop',
      allCrops: 'All Crops',

      bySeason: 'By Season',
      allSeasons: 'All Seasons',

      category: 'Category',
      allCategories: 'All Categories',

      fromDate: 'From Date',
      toDate: 'To Date',

      minAmount: 'Minimum Amount',
      maxAmount: 'Maximum Amount',

      sortBy: 'Sort By',

      newestFirst: 'Newest First',
      oldestFirst: 'Oldest First',

      highToLow:
        'Cost: High to Low',

      lowToHigh:
        'Cost: Low to High'
    },


    mr: {
      filterFarmRecords:
        'शेतीच्या नोंदी फिल्टर करा',

      clearAll:
        'सर्व साफ करा',

      searchItem:
        'वस्तू शोधा',

      searchPlaceholder:
        'युरिया, बियाणे, विक्रेता शोधा...',

      byCrop:
        'पिकानुसार',

      allCrops:
        'सर्व पिके',

      bySeason:
        'हंगामानुसार',

      allSeasons:
        'सर्व हंगाम',

      category:
        'श्रेणी',

      allCategories:
        'सर्व श्रेणी',

      fromDate:
        'सुरुवातीची तारीख',

      toDate:
        'शेवटची तारीख',

      minAmount:
        'किमान रक्कम',

      maxAmount:
        'कमाल रक्कम',

      sortBy:
        'क्रमवारी',

      newestFirst:
        'नवीन नोंदी प्रथम',

      oldestFirst:
        'जुन्या नोंदी प्रथम',

      highToLow:
        'खर्च: जास्त ते कमी',

      lowToHigh:
        'खर्च: कमी ते जास्त'
    },


    hi: {
      filterFarmRecords:
        'कृषि रिकॉर्ड फ़िल्टर करें',

      clearAll:
        'सभी साफ करें',

      searchItem:
        'वस्तु खोजें',

      searchPlaceholder:
        'यूरिया, बीज, विक्रेता खोजें...',

      byCrop:
        'फसल के अनुसार',

      allCrops:
        'सभी फसलें',

      bySeason:
        'मौसम के अनुसार',

      allSeasons:
        'सभी मौसम',

      category:
        'श्रेणी',

      allCategories:
        'सभी श्रेणियां',

      fromDate:
        'शुरुआत की तारीख',

      toDate:
        'अंतिम तारीख',

      minAmount:
        'न्यूनतम राशि',

      maxAmount:
        'अधिकतम राशि',

      sortBy:
        'क्रमबद्ध करें',

      newestFirst:
        'नई नोंद पहले',

      oldestFirst:
        'पुरानी नोंद पहले',

      highToLow:
        'खर्च: अधिक से कम',

      lowToHigh:
        'खर्च: कम से अधिक'
    }

  };


  const t =
    translations[language] ||
    translations.en;


  // =====================================================
  // UNIQUE DROPDOWN VALUES
  // =====================================================

  const categories = [
    ...new Set(
      expenses
        .map(e => e.category)
        .filter(Boolean)
    )
  ];


  const crops = [
    ...new Set(
      expenses
        .map(e => e.cropType)
        .filter(Boolean)
    )
  ];


  const seasons = [
    ...new Set(
      expenses
        .map(e => e.season)
        .filter(Boolean)
    )
  ];


  // =====================================================
  // APPLY FILTERS
  // =====================================================

  const applyFilters = (
    overrides = {}
  ) => {

    const currentFilters = {

      searchTerm,

      selectedCategory,

      selectedCrop,

      selectedSeason,

      dateRange,

      amountRange,

      sortBy,

      ...overrides

    };


    onFilterChange(
      currentFilters
    );

  };


  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {

    setSearchTerm('');

    setSelectedCategory('');

    setSelectedCrop('');

    setSelectedSeason('');

    setDateRange({
      start: '',
      end: ''
    });

    setAmountRange({
      min: '',
      max: ''
    });

    setSortBy('date-desc');


    onFilterChange({

      searchTerm: '',

      selectedCategory: '',

      selectedCrop: '',

      selectedSeason: '',

      dateRange: {
        start: '',
        end: ''
      },

      amountRange: {
        min: '',
        max: ''
      },

      sortBy: 'date-desc'

    });

  };


  // =====================================================
  // COMPONENT
  // =====================================================

  return (

    <div className="expense-filters">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="filters-header">

        <h3
          style={{
            color: '#14532d'
          }}
        >

          🔍 {t.filterFarmRecords}

        </h3>


        <button
          onClick={clearFilters}
          className="btn-clear"
        >

          {t.clearAll}

        </button>

      </div>


      {/* =================================================
          FILTER GRID
      ================================================= */}

      <div className="filters-grid">


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.searchItem}
          </label>


          <input
            type="text"
            placeholder={
              t.searchPlaceholder
            }
            value={searchTerm}
            onChange={(e) => {

              const value =
                e.target.value;

              setSearchTerm(value);

              applyFilters({
                searchTerm: value
              });

            }}
            className="filter-input"
          />

        </div>


        {/* =================================================
            CROP
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.byCrop}
          </label>


          <select
            value={selectedCrop}
            onChange={(e) => {

              const value =
                e.target.value;

              setSelectedCrop(value);

              applyFilters({
                selectedCrop: value
              });

            }}
            className="filter-select"
          >

            <option value="">
              {t.allCrops}
            </option>


            {crops.map(
              crop => (

                <option
                  key={crop}
                  value={crop}
                >
                  {crop}
                </option>

              )
            )}

          </select>

        </div>


        {/* =================================================
            SEASON
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.bySeason}
          </label>


          <select
            value={selectedSeason}
            onChange={(e) => {

              const value =
                e.target.value;

              setSelectedSeason(value);

              applyFilters({
                selectedSeason: value
              });

            }}
            className="filter-select"
          >

            <option value="">
              {t.allSeasons}
            </option>


            {seasons.map(
              season => (

                <option
                  key={season}
                  value={season}
                >
                  {season}
                </option>

              )
            )}

          </select>

        </div>


        {/* =================================================
            CATEGORY
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.category}
          </label>


          <select
            value={selectedCategory}
            onChange={(e) => {

              const value =
                e.target.value;

              setSelectedCategory(value);

              applyFilters({
                selectedCategory: value
              });

            }}
            className="filter-select"
          >

            <option value="">
              {t.allCategories}
            </option>


            {categories.map(
              category => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              )
            )}

          </select>

        </div>


        {/* =================================================
            FROM DATE
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.fromDate}
          </label>


          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => {

              const newDateRange = {
                ...dateRange,
                start: e.target.value
              };

              setDateRange(
                newDateRange
              );

              applyFilters({
                dateRange:
                  newDateRange
              });

            }}
            className="filter-input"
          />

        </div>


        {/* =================================================
            TO DATE
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.toDate}
          </label>


          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => {

              const newDateRange = {
                ...dateRange,
                end: e.target.value
              };

              setDateRange(
                newDateRange
              );

              applyFilters({
                dateRange:
                  newDateRange
              });

            }}
            className="filter-input"
          />

        </div>


        {/* =================================================
            MINIMUM AMOUNT
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.minAmount}
          </label>


          <input
            type="number"
            min="0"
            placeholder="₹ 0"
            value={amountRange.min}
            onChange={(e) => {

              const newAmountRange = {
                ...amountRange,
                min: e.target.value
              };

              setAmountRange(
                newAmountRange
              );

              applyFilters({
                amountRange:
                  newAmountRange
              });

            }}
            className="filter-input"
          />

        </div>


        {/* =================================================
            MAXIMUM AMOUNT
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.maxAmount}
          </label>


          <input
            type="number"
            min="0"
            placeholder="₹ 0"
            value={amountRange.max}
            onChange={(e) => {

              const newAmountRange = {
                ...amountRange,
                max: e.target.value
              };

              setAmountRange(
                newAmountRange
              );

              applyFilters({
                amountRange:
                  newAmountRange
              });

            }}
            className="filter-input"
          />

        </div>


        {/* =================================================
            SORT
        ================================================= */}

        <div className="filter-group">

          <label>
            {t.sortBy}
          </label>


          <select
            value={sortBy}
            onChange={(e) => {

              const value =
                e.target.value;

              setSortBy(value);

              applyFilters({
                sortBy: value
              });

            }}
            className="filter-select"
          >

            <option value="date-desc">
              {t.newestFirst}
            </option>

            <option value="date-asc">
              {t.oldestFirst}
            </option>

            <option value="amount-desc">
              {t.highToLow}
            </option>

            <option value="amount-asc">
              {t.lowToHigh}
            </option>

          </select>

        </div>


      </div>

    </div>

  );

}


export default ExpenseFilters;