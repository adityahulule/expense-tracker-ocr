import React, { useEffect, useState } from 'react';

import FarmerManagement from './FarmerManagement';
import PermissionManagement from './PermissionManagement';
import SchemeManagement from './SchemeManagement';
import NotificationManagement from './NotificationManagement';
import Monitoring from './Monitoring';
import SystemAnalytics from './SystemAnalytics';

import { getAdminDashboardStats } from '../../services/adminService';

import './Admin.css';


function AdminDashboard() {

    const [activeTab, setActiveTab] =
        useState('dashboard');


    // =====================================================
    // SELECTED FARMER
    // =====================================================

    const [
        selectedFarmerForPermission,
        setSelectedFarmerForPermission
    ] = useState(null);


    // =====================================================
    // ANALYTICS DATA
    // =====================================================

    const [farmers, setFarmers] =
        useState([]);

    const [expenses, setExpenses] =
        useState([]);

    const [notifications, setNotifications] =
        useState([]);

    const [analyticsLoading, setAnalyticsLoading] =
        useState(false);


    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    const [stats, setStats] = useState({
        totalFarmers: 0,
        totalCrops: 0,
        expenseRecords: 0,
        activeReminders: 0
    });

    const [statsLoading, setStatsLoading] =
        useState(true);


    // =====================================================
    // USER
    // =====================================================

    const userData =
        localStorage.getItem('user');

    const user = userData
        ? JSON.parse(userData)
        : {
            fullName: 'Administrator',
            role: 'ADMIN'
        };


    // =====================================================
    // LOAD DASHBOARD STATISTICS
    // =====================================================

    const loadDashboardStats = async () => {

        try {

            setStatsLoading(true);

            const data =
                await getAdminDashboardStats();

            console.log(
                'Admin Dashboard Stats:',
                data
            );


            setStats({

                totalFarmers:
                    Number(data?.totalFarmers || 0),

                totalCrops:
                    Number(data?.totalCrops || 0),

                expenseRecords:
                    Number(data?.expenseRecords || 0),

                activeReminders:
                    Number(data?.activeReminders || 0)

            });

        } catch (error) {

            console.error(
                'Dashboard statistics error:',
                error
            );

        } finally {

            setStatsLoading(false);

        }

    };


    // =====================================================
    // LOAD ANALYTICS DATA
    // =====================================================

    const loadAnalyticsData = async () => {

        try {

            setAnalyticsLoading(true);


            // =============================================
            // FARMERS
            // =============================================

            try {

                const farmerResponse =
                    await fetch(
                        'https://expense-tracker-ocr-6.onrender.com/api/users/farmers'
                    );


                if (farmerResponse.ok) {

                    const farmerData =
                        await farmerResponse.json();

                    setFarmers(
                        Array.isArray(farmerData)
                            ? farmerData
                            : []
                    );

                }

            } catch (error) {

                console.error(
                    'Farmer analytics error:',
                    error
                );

            }


            // =============================================
            // EXPENSES
            // =============================================

            try {

                const expenseResponse =
                    await fetch(
                        'https://expense-tracker-ocr-6.onrender.com/api/expenses'
                    );


                if (expenseResponse.ok) {

                    const expenseData =
                        await expenseResponse.json();

                    setExpenses(
                        Array.isArray(expenseData)
                            ? expenseData
                            : []
                    );

                }

            } catch (error) {

                console.error(
                    'Expense analytics error:',
                    error
                );

            }


            // =============================================
            // NOTIFICATIONS
            // =============================================

            try {

                const notificationResponse =
                    await fetch(
                        'https://expense-tracker-ocr-6.onrender.com/api/notifications'
                    );


                if (notificationResponse.ok) {

                    const notificationData =
                        await notificationResponse.json();

                    setNotifications(
                        Array.isArray(notificationData)
                            ? notificationData
                            : []
                    );

                }

            } catch (error) {

                console.error(
                    'Notification analytics error:',
                    error
                );

            }

        } catch (error) {

            console.error(
                'Analytics loading error:',
                error
            );

        } finally {

            setAnalyticsLoading(false);

        }

    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        // Dashboard cards
        loadDashboardStats();

        // Analytics data
        loadAnalyticsData();

    }, []);


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem('user');

        window.location.href = '/login';

    };


    // =====================================================
    // OPEN PERMISSION MANAGEMENT
    // =====================================================

    const handleManagePermissions = (farmerId) => {

        setSelectedFarmerForPermission(
            farmerId
        );

        setActiveTab(
            'permissions'
        );

    };


    // =====================================================
    // RENDER CONTENT
    // =====================================================

    const renderContent = () => {

        switch (activeTab) {


            // ==========================================
            // FARMERS
            // ==========================================

            case 'farmers':

                return (

                    <FarmerManagement
                        onManagePermissions={
                            handleManagePermissions
                        }
                    />

                );


            // ==========================================
            // PERMISSIONS
            // ==========================================

            case 'permissions':

                return (

                    <PermissionManagement
                        selectedFarmer={
                            selectedFarmerForPermission
                        }
                    />

                );


            // ==========================================
            // GOVERNMENT SCHEMES
            // ==========================================

            case 'schemes':

                return (

                    <SchemeManagement />

                );


            // ==========================================
            // NOTIFICATIONS
            // ==========================================

            case 'notifications':

                return (

                    <NotificationManagement />

                );


            // ==========================================
            // OCR MONITORING
            // ==========================================

            case 'monitoring':

                return (

                    <Monitoring />

                );


            // ==========================================
            // SYSTEM ANALYTICS
            // ==========================================

            case 'analytics':

                return (

                    <SystemAnalytics
                        farmers={farmers}
                        expenses={expenses}
                        notifications={
                            notifications
                        }
                    />

                );


            // ==========================================
            // DASHBOARD
            // ==========================================

            case 'dashboard':

            default:

                return (

                    <div className="admin-dashboard">


                        {/* ==================================
                            HEADER
                        ================================== */}

                        <div className="admin-page-header">

                            <div>

                                <h1>
                                    👨‍💼 Admin Dashboard
                                </h1>

                                <p>
                                    Welcome back,{' '}
                                    {user.fullName}
                                </p>

                            </div>


                            <div className="admin-date">

                                📅{' '}

                                {new Date()
                                    .toLocaleDateString(
                                        'en-IN',
                                        {
                                            weekday:
                                                'long',

                                            year:
                                                'numeric',

                                            month:
                                                'long',

                                            day:
                                                'numeric'
                                        }
                                    )}

                            </div>

                        </div>


                        {/* ==================================
                            STATISTICS
                        ================================== */}

                        <div className="admin-stat-grid">


                            {/* FARMERS */}

                            <div className="admin-stat-card">

                                <div className="stat-icon">
                                    👨‍🌾
                                </div>

                                <div>

                                    <h2>

                                        {
                                            statsLoading
                                                ? '...'
                                                : stats.totalFarmers
                                        }

                                    </h2>

                                    <p>
                                        Total Farmers
                                    </p>

                                </div>

                            </div>


                            {/* CROPS */}

                            <div className="admin-stat-card">

                                <div className="stat-icon">
                                    🌾
                                </div>

                                <div>

                                    <h2>

                                        {
                                            statsLoading
                                                ? '...'
                                                : stats.totalCrops
                                        }

                                    </h2>

                                    <p>
                                        Total Crops
                                    </p>

                                </div>

                            </div>


                            {/* EXPENSE RECORDS */}

                            <div className="admin-stat-card">

                                <div className="stat-icon">
                                    🧾
                                </div>

                                <div>

                                    <h2>

                                        {
                                            statsLoading
                                                ? '...'
                                                : stats.expenseRecords
                                        }

                                    </h2>

                                    <p>
                                        Expense Records
                                    </p>

                                </div>

                            </div>


                            {/* ACTIVE REMINDERS */}

                            <div className="admin-stat-card">

                                <div className="stat-icon">
                                    🔔
                                </div>

                                <div>

                                    <h2>

                                        {
                                            statsLoading
                                                ? '...'
                                                : stats.activeReminders
                                        }

                                    </h2>

                                    <p>
                                        Active Reminders
                                    </p>

                                </div>

                            </div>


                        </div>


                        {/* ==================================
                            WELCOME CARD
                        ================================== */}

                        <div className="admin-welcome-card">

                            <h2>
                                🌾 Krishi-Dhan Administration
                            </h2>

                            <p>

                                Manage farmers,
                                permissions,
                                government schemes,
                                notifications and
                                system activities
                                from this panel.

                            </p>

                        </div>


                        {/* ==================================
                            QUICK ACTIONS
                        ================================== */}

                        <div className="admin-section">

                            <h2>
                                Quick Actions
                            </h2>


                            <div className="quick-action-grid">


                                {/* FARMERS */}

                                <button
                                    onClick={() =>
                                        setActiveTab(
                                            'farmers'
                                        )
                                    }
                                >

                                    👨‍🌾

                                    <span>
                                        Manage Farmers
                                    </span>

                                </button>


                                {/* ACCESS */}

                                <button
                                    onClick={() => {

                                        setSelectedFarmerForPermission(
                                            null
                                        );

                                        setActiveTab(
                                            'permissions'
                                        );

                                    }}
                                >

                                    🔐

                                    <span>
                                        Manage Access
                                    </span>

                                </button>


                                {/* SCHEMES */}

                                <button
                                    onClick={() =>
                                        setActiveTab(
                                            'schemes'
                                        )
                                    }
                                >

                                    🏛️

                                    <span>
                                        Government Schemes
                                    </span>

                                </button>


                                {/* NOTIFICATIONS */}

                                <button
                                    onClick={() =>
                                        setActiveTab(
                                            'notifications'
                                        )
                                    }
                                >

                                    📢

                                    <span>
                                        Send Notification
                                    </span>

                                </button>


                                {/* ANALYTICS */}

                                <button
                                    onClick={() =>
                                        setActiveTab(
                                            'analytics'
                                        )
                                    }
                                >

                                    📊

                                    <span>
                                        System Analytics
                                    </span>

                                </button>


                            </div>

                        </div>


                    </div>

                );

        }

    };


    // =====================================================
    // MAIN ADMIN UI
    // =====================================================

    return (

        <div className="admin-layout">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="admin-sidebar">


                {/* LOGO */}

                <div className="admin-logo">

                    <div>
                        🌾 Krishi-Dhan
                    </div>

                    <small>
                        Administration Panel
                    </small>

                </div>


                {/* MENU */}

                <nav className="admin-menu">


                    {/* DASHBOARD */}

                    <button
                        className={
                            activeTab ===
                            'dashboard'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab(
                                'dashboard'
                            )
                        }
                    >

                        🏠 Dashboard

                    </button>


                    {/* FARMERS */}

                    <button
                        className={
                            activeTab ===
                            'farmers'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab(
                                'farmers'
                            )
                        }
                    >

                        👨‍🌾 Farmer Management

                    </button>


                    {/* PERMISSIONS */}

                    <button
                        className={
                            activeTab ===
                            'permissions'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() => {

                            setSelectedFarmerForPermission(
                                null
                            );

                            setActiveTab(
                                'permissions'
                            );

                        }}
                    >

                        🔐 Access Management

                    </button>


                    {/* GOVERNMENT SCHEMES */}

                    <button
                        className={
                            activeTab ===
                            'schemes'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab(
                                'schemes'
                            )
                        }
                    >

                        🏛️ Government Schemes

                    </button>


                    {/* NOTIFICATIONS */}

                    <button
                        className={
                            activeTab ===
                            'notifications'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab(
                                'notifications'
                            )
                        }
                    >

                        📢 Notifications

                    </button>


                    {/* OCR MONITORING */}

                    <button
                        className={
                            activeTab ===
                            'monitoring'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab(
                                'monitoring'
                            )
                        }
                    >

                        🧾 OCR Monitoring

                    </button>


                    {/* SYSTEM ANALYTICS */}

                    <button
                        className={
                            activeTab ===
                            'analytics'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab(
                                'analytics'
                            )
                        }
                    >

                        📊 System Analytics

                    </button>


                </nav>


                {/* LOGOUT */}

                <button
                    className="admin-logout"
                    onClick={
                        handleLogout
                    }
                >

                    🚪 Logout

                </button>


            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="admin-main">


                {/* TOP BAR */}

                <header className="admin-topbar">

                    <div>

                        <h2>
                            Krishi-Dhan
                        </h2>

                        <span>
                            Admin Control Panel
                        </span>

                    </div>


                    <div className="admin-profile">

                        👨‍💼{' '}
                        {user.fullName}

                    </div>

                </header>


                {/* CONTENT */}

                <section className="admin-content">

                    {renderContent()}

                </section>


            </main>


        </div>

    );

}


export default AdminDashboard;