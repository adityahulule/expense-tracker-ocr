import React, { useEffect, useMemo, useState } from 'react';
import './Monitoring.css';


function Monitoring() {

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');


    // =====================================================
    // LOAD OCR / EXPENSE DATA
    // =====================================================

    useEffect(() => {

        loadMonitoringData();

    }, []);


    const loadMonitoringData = async () => {

        try {

            setLoading(true);
            setError('');


            const response = await fetch(
                'https://expense-tracker-ocr-6.onrender.com/api/expenses'
            );


            if (!response.ok) {

                throw new Error(
                    `Server error: ${response.status}`
                );

            }


            const data =
                await response.json();


            setExpenses(
                Array.isArray(data)
                    ? data
                    : []
            );


        } catch (err) {

            console.error(
                'Monitoring error:',
                err
            );

            setError(
                'Unable to load OCR monitoring data.'
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalProcessed =
        expenses.length;


    /*
     * Currently every expense returned by the
     * OCR/expense system is treated as a processed
     * expense record.
     */

    const successful =
        expenses.length;


    const failed = 0;


    const totalAmount =
        expenses.reduce(
            (sum, expense) =>
                sum +
                Number(
                    expense.amount || 0
                ),
            0
        );


    // =====================================================
    // FORMAT CURRENCY
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
    // DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return 'N/A';
        }


        return new Date(
            date
        ).toLocaleString(
            'en-IN',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        );

    };


    // =====================================================
    // RECENT RECORDS
    // =====================================================

    const recentRecords =
        useMemo(() => {

            return [...expenses]
                .sort(
                    (a, b) =>
                        new Date(
                            b.createdAt ||
                            b.expenseDate ||
                            0
                        ) -
                        new Date(
                            a.createdAt ||
                            a.expenseDate ||
                            0
                        )
                )
                .slice(0, 10);

        }, [expenses]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="monitoring-page">

                <div className="monitoring-loading">

                    🔄 Loading OCR monitoring...

                </div>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="monitoring-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="monitoring-header">

                <div>

                    <h1>
                        🧾 OCR Monitoring
                    </h1>

                    <p>
                        Monitor receipt processing
                        and OCR-generated expense records.
                    </p>

                </div>


                <button
                    className="refresh-monitoring"
                    onClick={
                        loadMonitoringData
                    }
                >

                    🔄 Refresh

                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="monitoring-error">

                    ⚠️ {error}

                </div>

            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="monitoring-stats">


                {/* TOTAL */}

                <div className="monitoring-card total">

                    <div className="monitoring-card-icon">
                        🧾
                    </div>

                    <div>

                        <span>
                            Total Processed
                        </span>

                        <h2>
                            {totalProcessed}
                        </h2>

                    </div>

                </div>


                {/* SUCCESS */}

                <div className="monitoring-card success">

                    <div className="monitoring-card-icon">
                        ✅
                    </div>

                    <div>

                        <span>
                            Successful
                        </span>

                        <h2>
                            {successful}
                        </h2>

                    </div>

                </div>


                {/* FAILED */}

                <div className="monitoring-card failed">

                    <div className="monitoring-card-icon">
                        ❌
                    </div>

                    <div>

                        <span>
                            Failed
                        </span>

                        <h2>
                            {failed}
                        </h2>

                    </div>

                </div>


                {/* AMOUNT */}

                <div className="monitoring-card amount">

                    <div className="monitoring-card-icon">
                        💰
                    </div>

                    <div>

                        <span>
                            Processed Amount
                        </span>

                        <h2>
                            {formatCurrency(
                                totalAmount
                            )}
                        </h2>

                    </div>

                </div>

            </div>


            {/* =================================================
                STATUS
            ================================================= */}

            <div className="ocr-status-card">

                <div>

                    <h3>
                        🟢 OCR System Status
                    </h3>

                    <p>
                        OCR expense processing
                        service is connected to
                        the expense system.
                    </p>

                </div>


                <div className="status-badge">

                    ACTIVE

                </div>

            </div>


            {/* =================================================
                RECENT RECORDS
            ================================================= */}

            <div className="monitoring-table-card">

                <div className="table-header">

                    <div>

                        <h2>
                            Recent OCR Records
                        </h2>

                        <p>
                            Latest processed expense records
                        </p>

                    </div>

                </div>


                {recentRecords.length === 0 ? (

                    <div className="no-monitoring-data">

                        📭

                        <h3>
                            No OCR records found
                        </h3>

                        <p>
                            Process a receipt from
                            the Farmer Dashboard
                            to see the record here.
                        </p>

                    </div>

                ) : (

                    <div className="monitoring-table-wrapper">

                        <table className="monitoring-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Farmer
                                    </th>

                                    <th>
                                        Merchant
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Crop
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {recentRecords.map(
                                    (expense) => (

                                        <tr
                                            key={
                                                expense.id
                                            }
                                        >

                                            <td>
                                                #
                                                {
                                                    expense.id
                                                }
                                            </td>


                                            <td>

                                                {
                                                    expense.userId ||
                                                    'N/A'
                                                }

                                            </td>


                                            <td>

                                                {
                                                    expense.merchantName ||
                                                    expense.description ||
                                                    'N/A'
                                                }

                                            </td>


                                            <td>

                                                {
                                                    expense.category ||
                                                    'Other'
                                                }

                                            </td>


                                            <td>

                                                {
                                                    expense.cropType ||
                                                    'General Farm'
                                                }

                                            </td>


                                            <td className="amount-cell">

                                                {
                                                    formatCurrency(
                                                        expense.amount
                                                    )
                                                }

                                            </td>


                                            <td>

                                                <span className="record-status">

                                                    ✅ Processed

                                                </span>

                                            </td>


                                            <td>

                                                {
                                                    formatDate(
                                                        expense.createdAt ||
                                                        expense.expenseDate
                                                    )
                                                }

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


        </div>

    );

}


export default Monitoring;