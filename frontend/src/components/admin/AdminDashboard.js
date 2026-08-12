import React, { useState } from 'react';

import FarmerManagement from './FarmerManagement';
import PermissionManagement from './PermissionManagement';
import SchemeManagement from './SchemeManagement';
import NotificationManagement from './NotificationManagement';
import Monitoring from './Monitoring';
import SystemAnalytics from './SystemAnalytics';

import './Admin.css';

function AdminDashboard() {

    const [activeTab, setActiveTab] = useState('dashboard');

    const userData = localStorage.getItem('user');
    const user = userData
        ? JSON.parse(userData)
        : { fullName: 'Administrator', role: 'ADMIN' };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const renderContent = () => {

        switch (activeTab) {

            case 'farmers':
                return <FarmerManagement />;

            case 'permissions':
                return <PermissionManagement />;

            case 'schemes':
                return <SchemeManagement />;

            case 'notifications':
                return <NotificationManagement />;

            case 'monitoring':
                return <Monitoring />;

            case 'analytics':
                return <SystemAnalytics />;

            case 'dashboard':
            default:
                return (
                    <div className="admin-dashboard">

                        <div className="admin-page-header">
                            <div>
                                <h1>👨‍💼 Admin Dashboard</h1>

                                <p>
                                    Welcome back, {user.fullName}
                                </p>
                            </div>

                            <div className="admin-date">
                                📅 {new Date().toLocaleDateString(
                                    'en-IN',
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }
                                )}
                            </div>
                        </div>

                        {/* Statistics */}

                        <div className="admin-stat-grid">

                            <div className="admin-stat-card">
                                <div className="stat-icon">
                                    👨‍🌾
                                </div>

                                <div>
                                    <h2>0</h2>
                                    <p>Total Farmers</p>
                                </div>
                            </div>

                            <div className="admin-stat-card">
                                <div className="stat-icon">
                                    🌾
                                </div>

                                <div>
                                    <h2>0</h2>
                                    <p>Total Crops</p>
                                </div>
                            </div>

                            <div className="admin-stat-card">
                                <div className="stat-icon">
                                    🧾
                                </div>

                                <div>
                                    <h2>0</h2>
                                    <p>OCR Receipts</p>
                                </div>
                            </div>

                            <div className="admin-stat-card">
                                <div className="stat-icon">
                                    🔔
                                </div>

                                <div>
                                    <h2>0</h2>
                                    <p>Active Reminders</p>
                                </div>
                            </div>

                        </div>

                        {/* Welcome Card */}

                        <div className="admin-welcome-card">

                            <h2>
                                🌾 Krishi-Dhan Administration
                            </h2>

                            <p>
                                Manage farmers, permissions,
                                government schemes,
                                notifications and system
                                activities from this panel.
                            </p>

                        </div>

                        {/* Quick Actions */}

                        <div className="admin-section">

                            <h2>Quick Actions</h2>

                            <div className="quick-action-grid">

                                <button
                                    onClick={() =>
                                        setActiveTab('farmers')
                                    }
                                >
                                    👨‍🌾
                                    <span>
                                        Manage Farmers
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        setActiveTab('permissions')
                                    }
                                >
                                    🔐
                                    <span>
                                        Manage Access
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        setActiveTab('schemes')
                                    }
                                >
                                    🏛️
                                    <span>
                                        Government Schemes
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        setActiveTab('notifications')
                                    }
                                >
                                    📢
                                    <span>
                                        Send Notification
                                    </span>
                                </button>

                            </div>

                        </div>

                    </div>
                );
        }
    };

    return (

        <div className="admin-layout">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    <div>
                        🌾 Krishi-Dhan
                    </div>

                    <small>
                        Administration Panel
                    </small>

                </div>

                <nav className="admin-menu">

                    <button
                        className={
                            activeTab === 'dashboard'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab('dashboard')
                        }
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        className={
                            activeTab === 'farmers'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab('farmers')
                        }
                    >
                        👨‍🌾 Farmer Management
                    </button>

                    <button
                        className={
                            activeTab === 'permissions'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab('permissions')
                        }
                    >
                        🔐 Access Management
                    </button>

                    <button
                        className={
                            activeTab === 'schemes'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab('schemes')
                        }
                    >
                        🏛️ Government Schemes
                    </button>

                    <button
                        className={
                            activeTab === 'notifications'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab('notifications')
                        }
                    >
                        📢 Notifications
                    </button>

                    <button
                        className={
                            activeTab === 'monitoring'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab('monitoring')
                        }
                    >
                        🧾 OCR Monitoring
                    </button>

                    <button
                        className={
                            activeTab === 'analytics'
                                ? 'admin-menu-active'
                                : ''
                        }
                        onClick={() =>
                            setActiveTab('analytics')
                        }
                    >
                        📊 System Analytics
                    </button>

                </nav>

                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </aside>


            {/* MAIN CONTENT */}

            <main className="admin-main">

                <header className="admin-topbar">

                    <div>
                        <h2>Krishi-Dhan</h2>

                        <span>
                            Admin Control Panel
                        </span>
                    </div>

                    <div className="admin-profile">
                        👨‍💼 {user.fullName}
                    </div>

                </header>

                <section className="admin-content">

                    {renderContent()}

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;