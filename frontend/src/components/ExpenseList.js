import React, { useState, useEffect } from 'react';
import './ExpenseList.css';

import {
  deleteExpense,
  updateExpense
} from '../services/expenseService';

import ExpenseFilters from './ExpenseFilters';
import { toast } from 'react-toastify';
import { useLanguage } from '../i18n/LanguageContext';


function ExpenseList({
  expenses: allExpenses = [],
  loading,
  onUpdate
}) {

  const { language } = useLanguage();

  const [editingId, setEditingId] = useState(null);

  const [filteredExpenses, setFilteredExpenses] =
    useState(allExpenses);

  const [editForm, setEditForm] = useState({});


  // =====================================================
  // TRANSLATIONS
  // =====================================================

  const text = {

    en: {
      farmRecords: 'Farm Records',
      trackRecords:
        'Track your seasonal investments and spending',
      noRecords: 'No records found.',
      loading: 'Loading farm records...',

      description: 'Description',
      amount: 'Amount',
      crop: 'Crop',
      category: 'Category',
      season: 'Season',

      save: 'Save',
      cancel: 'Cancel',

      viewReceipt: 'View Receipt',
      edit: 'Edit',
      delete: 'Delete',

      agricultureStore: 'Agriculture Store',
      mixed: 'Mixed',

      seeds: 'Seeds',
      fertilizer: 'Fertilizer',
      labor: 'Labor',
      generalFarming: 'General Farming',

      kharif: 'Kharif',
      rabi: 'Rabi',

      recordUpdated:
        'Record updated successfully',

      updateFailed:
        'Failed to update record',

      confirmDelete:
        'Are you sure you want to delete this farm record?',

      recordDeleted:
        'Record deleted successfully',

      deleteFailed:
        'Failed to delete record',

      notAvailable: 'N/A'
    },


    mr: {
      farmRecords: 'शेतीच्या नोंदी',

      trackRecords:
        'तुमच्या हंगामी गुंतवणुकीचा आणि खर्चाचा मागोवा घ्या',

      noRecords:
        'कोणत्याही नोंदी सापडल्या नाहीत.',

      loading:
        'शेतीच्या नोंदी लोड होत आहेत...',

      description: 'वर्णन',
      amount: 'रक्कम',
      crop: 'पीक',
      category: 'श्रेणी',
      season: 'हंगाम',

      save: 'जतन करा',
      cancel: 'रद्द करा',

      viewReceipt: 'पावती पहा',
      edit: 'बदला',
      delete: 'हटवा',

      agricultureStore: 'कृषी दुकान',
      mixed: 'मिश्र',

      seeds: 'बियाणे',
      fertilizer: 'खत',
      labor: 'मजुरी',
      generalFarming: 'सामान्य शेती',

      kharif: 'खरीप',
      rabi: 'रब्बी',

      recordUpdated:
        'नोंद यशस्वीरित्या अपडेट झाली',

      updateFailed:
        'नोंद अपडेट करता आली नाही',

      confirmDelete:
        'तुम्हाला ही शेतीची नोंद हटवायची आहे का?',

      recordDeleted:
        'नोंद यशस्वीरित्या हटवली',

      deleteFailed:
        'नोंद हटवता आली नाही',

      notAvailable: 'उपलब्ध नाही'
    },


    hi: {
      farmRecords: 'कृषि रिकॉर्ड',

      trackRecords:
        'अपने मौसमी निवेश और खर्च का रिकॉर्ड रखें',

      noRecords:
        'कोई रिकॉर्ड नहीं मिला।',

      loading:
        'कृषि रिकॉर्ड लोड हो रहे हैं...',

      description: 'विवरण',
      amount: 'राशि',
      crop: 'फसल',
      category: 'श्रेणी',
      season: 'मौसम',

      save: 'सहेजें',
      cancel: 'रद्द करें',

      viewReceipt: 'रसीद देखें',
      edit: 'बदलें',
      delete: 'हटाएं',

      agricultureStore: 'कृषि दुकान',
      mixed: 'मिश्रित',

      seeds: 'बीज',
      fertilizer: 'उर्वरक',
      labor: 'मजदूरी',
      generalFarming: 'सामान्य खेती',

      kharif: 'खरीफ',
      rabi: 'रबी',

      recordUpdated:
        'रिकॉर्ड सफलतापूर्वक अपडेट हुआ',

      updateFailed:
        'रिकॉर्ड अपडेट नहीं हो सका',

      confirmDelete:
        'क्या आप इस कृषि रिकॉर्ड को हटाना चाहते हैं?',

      recordDeleted:
        'रिकॉर्ड सफलतापूर्वक हटाया गया',

      deleteFailed:
        'रिकॉर्ड हटाया नहीं जा सका',

      notAvailable: 'उपलब्ध नहीं'
    }

  };


  const currentText =
    text[language] || text.en;


  // =====================================================
  // CATEGORY TRANSLATION
  // =====================================================

  const translateCategory = (category) => {

    if (!category) {
      return currentText.notAvailable;
    }

    const categoryMap = {

      Seeds: currentText.seeds,

      Fertilizer:
        currentText.fertilizer,

      Labor:
        currentText.labor,

      'General Farming':
        currentText.generalFarming

    };

    return categoryMap[category] || category;
  };


  // =====================================================
  // SEASON TRANSLATION
  // =====================================================

  const translateSeason = (season) => {

    if (!season) {
      return currentText.notAvailable;
    }

    if (season === 'Kharif') {
      return currentText.kharif;
    }

    if (season === 'Rabi') {
      return currentText.rabi;
    }

    return season;
  };


  // =====================================================
  // UPDATE WHEN EXPENSES CHANGE
  // =====================================================

  useEffect(() => {

    setFilteredExpenses(
      allExpenses || []
    );

  }, [allExpenses]);


  // =====================================================
  // VIEW RECEIPT
  // =====================================================

  const handleViewReceipt = (id) => {

    window.open(
      `http://localhost:8081/api/expenses/receipt/${id}`,
      '_blank'
    );

  };


  // =====================================================
  // FILTER + SORT
  // =====================================================

  const handleFilterChange = (filters) => {

    let filtered = [
      ...(allExpenses || [])
    ];


    // ===================================================
    // SEARCH
    // ===================================================

    if (filters.searchTerm) {

      const search =
        filters.searchTerm
          .toLowerCase()
          .trim();


      filtered = filtered.filter(
        (expense) =>

          expense.description
            ?.toLowerCase()
            .includes(search)

          ||

          expense.merchantName
            ?.toLowerCase()
            .includes(search)

          ||

          expense.cropType
            ?.toLowerCase()
            .includes(search)

          ||

          expense.category
            ?.toLowerCase()
            .includes(search)

      );

    }


    // ===================================================
    // CATEGORY
    // ===================================================

    if (filters.selectedCategory) {

      filtered = filtered.filter(
        (expense) =>
          expense.category ===
          filters.selectedCategory
      );

    }


    // ===================================================
    // CROP
    // ===================================================

    if (filters.selectedCrop) {

      filtered = filtered.filter(
        (expense) =>
          expense.cropType ===
          filters.selectedCrop
      );

    }


    // ===================================================
    // SEASON
    // ===================================================

    if (filters.selectedSeason) {

      filtered = filtered.filter(
        (expense) =>
          expense.season ===
          filters.selectedSeason
      );

    }


    // ===================================================
    // DATE RANGE
    // ===================================================

    if (filters.dateRange) {

      const {
        start,
        end
      } = filters.dateRange;


      if (start) {

        const startDate =
          new Date(start);

        startDate.setHours(
          0,
          0,
          0,
          0
        );


        filtered = filtered.filter(
          (expense) => {

            const expenseDate =
              new Date(
                expense.expenseDate ||
                expense.createdAt
              );

            return expenseDate >= startDate;

          }
        );

      }


      if (end) {

        const endDate =
          new Date(end);

        endDate.setHours(
          23,
          59,
          59,
          999
        );


        filtered = filtered.filter(
          (expense) => {

            const expenseDate =
              new Date(
                expense.expenseDate ||
                expense.createdAt
              );

            return expenseDate <= endDate;

          }
        );

      }

    }


    // ===================================================
    // AMOUNT RANGE
    // ===================================================

    if (filters.amountRange) {

      const {
        min,
        max
      } = filters.amountRange;


      if (
        min !== '' &&
        min !== undefined
      ) {

        const minimum =
          Number(min);


        filtered = filtered.filter(
          (expense) =>
            Number(expense.amount || 0) >=
            minimum
        );

      }


      if (
        max !== '' &&
        max !== undefined
      ) {

        const maximum =
          Number(max);


        filtered = filtered.filter(
          (expense) =>
            Number(expense.amount || 0) <=
            maximum
        );

      }

    }


    // ===================================================
    // SORT
    // ===================================================

    const sortBy =
      filters.sortBy ||
      'date-desc';


    filtered.sort(
      (a, b) => {

        if (
          sortBy ===
          'amount-desc'
        ) {

          return (
            Number(b.amount || 0) -
            Number(a.amount || 0)
          );

        }


        if (
          sortBy ===
          'amount-asc'
        ) {

          return (
            Number(a.amount || 0) -
            Number(b.amount || 0)
          );

        }


        const dateA =
          new Date(
            a.expenseDate ||
            a.createdAt ||
            0
          ).getTime();


        const dateB =
          new Date(
            b.expenseDate ||
            b.createdAt ||
            0
          ).getTime();


        if (
          sortBy ===
          'date-asc'
        ) {

          return dateA - dateB;

        }


        return dateB - dateA;

      }
    );


    setFilteredExpenses(
      filtered
    );

  };


  // =====================================================
  // EDIT EXPENSE
  // =====================================================

  const handleEdit = (expense) => {

    setEditingId(
      expense.id
    );


    setEditForm({

      description:
        expense.description || '',

      amount:
        expense.amount || 0,

      category:
        expense.category ||
        'General Farming',

      merchantName:
        expense.merchantName || '',

      cropType:
        expense.cropType || '',

      season:
        expense.season || 'Kharif'

    });

  };


  // =====================================================
  // SAVE EDIT
  // =====================================================

  const handleSaveEdit = async (id) => {

    try {

      await updateExpense(
        id,
        editForm
      );


      setEditingId(null);

      setEditForm({});


      toast.success(
        currentText.recordUpdated
      );


      if (
        typeof onUpdate ===
        'function'
      ) {

        await onUpdate();

      }


    } catch (error) {

      console.error(
        'Error updating:',
        error
      );


      toast.error(
        currentText.updateFailed
      );

    }

  };


  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {

    setEditingId(null);

    setEditForm({});

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        currentText.confirmDelete
      );


    if (!confirmed) {
      return;
    }


    try {

      await deleteExpense(id);


      toast.success(
        currentText.recordDeleted
      );


      if (
        typeof onUpdate ===
        'function'
      ) {

        await onUpdate();

      }


    } catch (error) {

      console.error(
        'Error deleting:',
        error
      );


      toast.error(
        currentText.deleteFailed
      );

    }

  };


  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (dateString) => {

    if (!dateString) {

      return currentText.notAvailable;

    }


    const date =
      new Date(dateString);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return currentText.notAvailable;

    }


    return date.toLocaleDateString(
      language === 'mr'
        ? 'mr-IN'
        : language === 'hi'
          ? 'hi-IN'
          : 'en-IN',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    );

  };


  // =====================================================
  // CURRENCY
  // =====================================================

  const formatCurrency = (amount) => {

    return new Intl.NumberFormat(
      'en-IN',
      {
        style: 'currency',
        currency: 'INR'
      }
    ).format(
      Number(amount || 0)
    );

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="loading">

        {currentText.loading}

      </div>

    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="expense-list">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="list-header">

        <h2
          style={{
            color: '#14532d'
          }}
        >

          🌾 {currentText.farmRecords}

          {' '}

          ({filteredExpenses.length})

        </h2>


        <p className="subtitle">

          {currentText.trackRecords}

        </p>

      </div>


      {/* =================================================
          FILTERS
      ================================================= */}

      <ExpenseFilters
        onFilterChange={
          handleFilterChange
        }
        expenses={
          allExpenses
        }
      />


      {/* =================================================
          EXPENSES
      ================================================= */}

      <div className="expenses-container">


        {filteredExpenses.length === 0 ? (

          <div className="no-results">

            {currentText.noRecords}

          </div>

        ) : (

          filteredExpenses.map(
            (expense) => (

              <div
                key={expense.id}
                className={
                  `transaction-card ${
                    editingId === expense.id
                      ? 'editing'
                      : ''
                  }`
                }
              >


                {/* =================================================
                    EDIT MODE
                ================================================= */}

                {editingId === expense.id ? (

                  <div className="edit-form-inline">


                    <div className="edit-grid">


                      {/* DESCRIPTION */}

                      <input
                        type="text"
                        value={
                          editForm.description
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description:
                              e.target.value
                          })
                        }
                        placeholder={
                          currentText.description
                        }
                        className="edit-input"
                      />


                      {/* AMOUNT */}

                      <input
                        type="number"
                        value={
                          editForm.amount
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            amount:
                              e.target.value
                          })
                        }
                        placeholder={
                          currentText.amount
                        }
                        className="edit-input"
                      />


                      {/* CROP */}

                      <input
                        type="text"
                        value={
                          editForm.cropType
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            cropType:
                              e.target.value
                          })
                        }
                        placeholder={
                          currentText.crop
                        }
                        className="edit-input"
                      />


                      {/* CATEGORY */}

                      <select
                        value={
                          editForm.category
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            category:
                              e.target.value
                          })
                        }
                        className="edit-input"
                      >

                        <option value="Seeds">
                          {currentText.seeds}
                        </option>

                        <option value="Fertilizer">
                          {currentText.fertilizer}
                        </option>

                        <option value="Labor">
                          {currentText.labor}
                        </option>

                        <option value="General Farming">
                          {currentText.generalFarming}
                        </option>

                      </select>


                      {/* SEASON */}

                      <select
                        value={
                          editForm.season
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            season:
                              e.target.value
                          })
                        }
                        className="edit-input"
                      >

                        <option value="Kharif">
                          {currentText.kharif}
                        </option>

                        <option value="Rabi">
                          {currentText.rabi}
                        </option>

                      </select>

                    </div>


                    {/* EDIT BUTTONS */}

                    <div className="edit-actions">

                      <button
                        onClick={() =>
                          handleSaveEdit(
                            expense.id
                          )
                        }
                        className="btn-save"
                      >

                        {currentText.save}

                      </button>


                      <button
                        onClick={
                          handleCancelEdit
                        }
                        className="btn-cancel"
                      >

                        {currentText.cancel}

                      </button>

                    </div>

                  </div>


                ) : (

                  /* =================================================
                     NORMAL MODE
                  ================================================= */

                  <>


                    {/* LEFT */}

                    <div className="card-left">

                      <div className="card-main-info">


                        <h3>

                          {
                            expense.merchantName ||
                            expense.description ||
                            currentText.agricultureStore
                          }

                        </h3>


                        {/* BADGES */}

                        <div className="badge-row">


                          {/* CATEGORY */}

                          <span className="badge category">

                            {
                              translateCategory(
                                expense.category
                              )
                            }

                          </span>


                          {/* CROP */}

                          <span className="badge crop">

                            🌾{' '}

                            {
                              expense.cropType ||
                              currentText.mixed
                            }

                          </span>


                          {/* SEASON */}

                          <span className="badge season">

                            🗓️{' '}

                            {
                              translateSeason(
                                expense.season
                              )
                            }

                          </span>

                        </div>


                        {/* DATE */}

                        <p className="date-text">

                          📅{' '}

                          {formatDate(
                            expense.expenseDate ||
                            expense.createdAt
                          )}

                        </p>

                      </div>

                    </div>


                    {/* RIGHT */}

                    <div className="card-right">


                      {/* AMOUNT */}

                      <div className="amount-display">

                        {
                          formatCurrency(
                            expense.amount
                          )
                        }

                      </div>


                      {/* ACTION BUTTONS */}

                      <div className="action-buttons">


                        {/* VIEW RECEIPT */}

                        <button
                          className="btn-icon view"
                          onClick={() =>
                            handleViewReceipt(
                              expense.id
                            )
                          }
                          title={
                            currentText.viewReceipt
                          }
                          aria-label={
                            currentText.viewReceipt
                          }
                        >
                          🖼️
                        </button>


                        {/* EDIT */}

                        <button
                          className="btn-icon edit"
                          onClick={() =>
                            handleEdit(
                              expense
                            )
                          }
                          title={
                            currentText.edit
                          }
                          aria-label={
                            currentText.edit
                          }
                        >
                          ✏️
                        </button>


                        {/* DELETE */}

                        <button
                          className="btn-icon delete"
                          onClick={() =>
                            handleDelete(
                              expense.id
                            )
                          }
                          title={
                            currentText.delete
                          }
                          aria-label={
                            currentText.delete
                          }
                        >
                          🗑️
                        </button>

                      </div>

                    </div>

                  </>

                )}

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}


export default ExpenseList;