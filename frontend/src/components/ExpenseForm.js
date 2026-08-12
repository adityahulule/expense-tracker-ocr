import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';
import { createExpense } from '../services/expenseService';
import { useLanguage } from '../i18n/LanguageContext';


function ExpenseForm({
  onExpenseAdded,
  initialCategory
}) {

  const { language } = useLanguage();


  // =====================================================
  // TRANSLATIONS
  // =====================================================

  const translations = {

    en: {
      title: 'Add Farm Investment',
      description: 'Item Description',
      descriptionPlaceholder:
        'e.g., 50kg Urea Bag or Labor Wages',

      amount: 'Amount (₹)',
      amountPlaceholder: '0.00',

      cropName: 'Crop Name',
      cropPlaceholder:
        'e.g., Wheat, Cotton',

      expenseCategory:
        'Expense Category',

      farmingSeason:
        'Farming Season',

      sellerName:
        'Seller/Merchant Name',

      sellerPlaceholder:
        'e.g., Local Agri-Center',

      save: 'Save Farm Expense',
      saving: 'Saving...',

      seeds: 'Seeds',
      fertilizer: 'Fertilizer',
      pesticide: 'Pesticide',
      labor: 'Labor/Wages',
      fuel: 'Fuel (Tractor/Pump)',
      machinery: 'Machinery Rental',
      irrigation: 'Irrigation',
      other: 'Other',

      kharif: 'Kharif (Monsoon)',
      rabi: 'Rabi (Winter)',
      zaid: 'Zaid (Summer)',

      loginAgain:
        'Please log in again.',

      saved:
        'Investment saved successfully!',

      failed:
        'Failed to save. Please try again.'
    },


    mr: {
      title: 'शेतीची गुंतवणूक जोडा',

      description:
        'वस्तूचे वर्णन',

      descriptionPlaceholder:
        'उदा. 50 किलो युरिया बॅग किंवा मजुरी',

      amount:
        'रक्कम (₹)',

      amountPlaceholder:
        '0.00',

      cropName:
        'पिकाचे नाव',

      cropPlaceholder:
        'उदा. गहू, कापूस',

      expenseCategory:
        'खर्चाची श्रेणी',

      farmingSeason:
        'शेतीचा हंगाम',

      sellerName:
        'विक्रेता / दुकानदाराचे नाव',

      sellerPlaceholder:
        'उदा. स्थानिक कृषी केंद्र',

      save:
        'शेतीचा खर्च जतन करा',

      saving:
        'जतन होत आहे...',

      seeds:
        'बियाणे',

      fertilizer:
        'खत',

      pesticide:
        'कीटकनाशक',

      labor:
        'मजुरी',

      fuel:
        'इंधन (ट्रॅक्टर/पंप)',

      machinery:
        'यंत्रसामग्री भाडे',

      irrigation:
        'सिंचन',

      other:
        'इतर',

      kharif:
        'खरीप (पावसाळा)',

      rabi:
        'रब्बी (हिवाळा)',

      zaid:
        'झायड (उन्हाळा)',

      loginAgain:
        'कृपया पुन्हा लॉगिन करा.',

      saved:
        'गुंतवणूक यशस्वीरित्या जतन झाली!',

      failed:
        'खर्च जतन करता आला नाही. कृपया पुन्हा प्रयत्न करा.'
    },


    hi: {
      title:
        'कृषि निवेश जोड़ें',

      description:
        'वस्तु का विवरण',

      descriptionPlaceholder:
        'उदा. 50 किलो यूरिया बैग या मजदूरी',

      amount:
        'राशि (₹)',

      amountPlaceholder:
        '0.00',

      cropName:
        'फसल का नाम',

      cropPlaceholder:
        'उदा. गेहूं, कपास',

      expenseCategory:
        'खर्च की श्रेणी',

      farmingSeason:
        'खेती का मौसम',

      sellerName:
        'विक्रेता / दुकानदार का नाम',

      sellerPlaceholder:
        'उदा. स्थानीय कृषि केंद्र',

      save:
        'कृषि खर्च सहेजें',

      saving:
        'सहेजा जा रहा है...',

      seeds:
        'बीज',

      fertilizer:
        'उर्वरक',

      pesticide:
        'कीटनाशक',

      labor:
        'मजदूरी',

      fuel:
        'ईंधन (ट्रैक्टर/पंप)',

      machinery:
        'मशीनरी किराया',

      irrigation:
        'सिंचाई',

      other:
        'अन्य',

      kharif:
        'खरीफ (मानसून)',

      rabi:
        'रबी (सर्दी)',

      zaid:
        'जायद (गर्मी)',

      loginAgain:
        'कृपया फिर से लॉगिन करें।',

      saved:
        'निवेश सफलतापूर्वक सहेजा गया!',

      failed:
        'खर्च सहेजा नहीं जा सका। कृपया फिर प्रयास करें।'
    }

  };


  const t =
    translations[language] ||
    translations.en;


  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] =
    useState({

      description: '',

      amount: '',

      category:
        initialCategory ||
        'Seeds',

      merchantName: '',

      cropType: '',

      season: ''

    });


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState('');


  // =====================================================
  // UPDATE CATEGORY
  // =====================================================

  useEffect(() => {

    if (initialCategory) {

      setFormData(prev => ({

        ...prev,

        category:
          initialCategory

      }));

    }

  }, [initialCategory]);


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setError('');


    // ===================================================
    // VALIDATE USER
    // ===================================================

    const userData =
      localStorage.getItem('user');


    if (!userData) {

      setError(
        t.loginAgain
      );

      setLoading(false);

      return;

    }


    let user;


    try {

      user =
        JSON.parse(userData);

    } catch (error) {

      setError(
        t.loginAgain
      );

      setLoading(false);

      return;

    }


    if (!user?.id) {

      setError(
        t.loginAgain
      );

      setLoading(false);

      return;

    }


    // ===================================================
    // VALIDATE AMOUNT
    // ===================================================

    const numericAmount =
      parseFloat(
        formData.amount
      );


    if (
      !numericAmount ||
      numericAmount <= 0
    ) {

      setError(
        t.failed
      );

      return;

    }


    setLoading(true);


    try {

      // =================================================
      // EXPENSE DATA
      // =================================================

      const expenseToSave = {

        ...formData,

        userId:
          user.id,

        amount:
          numericAmount,

        expenseDate:
          new Date().toISOString()

      };


      // =================================================
      // SAVE
      // =================================================

      await createExpense(
        expenseToSave
      );


      // =================================================
      // RESET FORM
      // =================================================

      setFormData({

        description: '',

        amount: '',

        category:
          initialCategory ||
          'Seeds',

        merchantName: '',

        cropType: '',

        season: 'Kharif'

      });


      // =================================================
      // REFRESH DASHBOARD
      // =================================================

      if (
        typeof onExpenseAdded ===
        'function'
      ) {

        await onExpenseAdded();

      }


      // =================================================
      // SUCCESS
      // =================================================

      alert(
        t.saved
      );


    } catch (error) {

      console.error(
        'Error saving expense:',
        error?.response?.data ||
        error
      );


      setError(
        error?.response?.data?.message ||
        t.failed
      );


    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="expense-form-container">


      {/* =================================================
          TITLE
      ================================================= */}

      <h2
        style={{
          color: '#14532d'
        }}
      >

        🌱 {t.title}

      </h2>


      <form
        onSubmit={handleSubmit}
        className="expense-form"
      >


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div className="form-group">

          <label htmlFor="description">

            {t.description} *

          </label>


          <input
            type="text"
            id="description"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            required
            placeholder={
              t.descriptionPlaceholder
            }
          />

        </div>


        {/* =================================================
            AMOUNT + CROP
        ================================================= */}

        <div
          className="form-row"
          style={{
            display: 'flex',
            gap: '15px'
          }}
        >


          {/* AMOUNT */}

          <div
            className="form-group"
            style={{
              flex: 1
            }}
          >

            <label htmlFor="amount">

              {t.amount} *

            </label>


            <input
              type="number"
              id="amount"
              name="amount"
              value={
                formData.amount
              }
              onChange={
                handleChange
              }
              required
              step="0.01"
              min="0.01"
              placeholder={
                t.amountPlaceholder
              }
            />

          </div>


          {/* CROP */}

          <div
            className="form-group"
            style={{
              flex: 1
            }}
          >

            <label htmlFor="cropType">

              {t.cropName} *

            </label>


            <input
              type="text"
              id="cropType"
              name="cropType"
              value={
                formData.cropType
              }
              onChange={
                handleChange
              }
              required
              placeholder={
                t.cropPlaceholder
              }
            />

          </div>

        </div>


        {/* =================================================
            CATEGORY
        ================================================= */}

        <div className="form-group">

          <label htmlFor="category">

            {t.expenseCategory}

          </label>


          <select
            id="category"
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
          >

            <option value="Seeds">
              {t.seeds}
            </option>

            <option value="Fertilizer">
              {t.fertilizer}
            </option>

            <option value="Pesticide">
              {t.pesticide}
            </option>

            <option value="Labor">
              {t.labor}
            </option>

            <option value="Fuel">
              {t.fuel}
            </option>

            <option value="Machinery">
              {t.machinery}
            </option>

            <option value="Irrigation">
              {t.irrigation}
            </option>

            <option value="Other">
              {t.other}
            </option>

          </select>

        </div>


        {/* =================================================
            SEASON
        ================================================= */}

        <div className="form-group">

          <label htmlFor="season">

            {t.farmingSeason}

          </label>


          <select
            id="season"
            name="season"
            value={
              formData.season
            }
            onChange={
              handleChange
            }
          >

            <option value="Kharif">
              {t.kharif}
            </option>

            <option value="Rabi">
              {t.rabi}
            </option>

            <option value="Zaid">
              {t.zaid}
            </option>

          </select>

        </div>


        {/* =================================================
            SELLER
        ================================================= */}

        <div className="form-group">

          <label htmlFor="merchantName">

            {t.sellerName}

          </label>


          <input
            type="text"
            id="merchantName"
            name="merchantName"
            value={
              formData.merchantName
            }
            onChange={
              handleChange
            }
            placeholder={
              t.sellerPlaceholder
            }
          />

        </div>


        {/* =================================================
            SAVE BUTTON
        ================================================= */}

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
          style={{
            backgroundColor:
              '#15803d'
          }}
        >

          {loading
            ? t.saving
            : `💾 ${t.save}`}

        </button>

      </form>

    </div>

  );

}


export default ExpenseForm;