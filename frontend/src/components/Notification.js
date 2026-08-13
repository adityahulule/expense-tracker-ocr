import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css';

function Notification() {

const API_URL =
    process.env.REACT_APP_API_URL ||
    'https://expense-tracker-ocr-6.onrender.com';

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    // ==========================================
    // GET LOGGED-IN FARMER ID
    // ==========================================

    const getFarmerId = () => {

        // First check complete user object
        const storedUser =
            localStorage.getItem('user');

        if (storedUser) {

            try {

                const user =
                    JSON.parse(storedUser);

                console.log(
                    'Logged-in user:',
                    user
                );

                // Check common ID names
                return (
                    user.id ||
                    user.userId ||
                    user.farmerId ||
                    user.user_id ||
                    null
                );

            } catch (err) {

                console.error(
                    'Unable to parse user:',
                    err
                );
            }
        }


        // Fallback checks
        return (
            localStorage.getItem('userId') ||
            localStorage.getItem('farmerId') ||
            localStorage.getItem('user_id') ||
            localStorage.getItem('farmer_id') ||
            null
        );
    };


    // ==========================================
    // LOAD NOTIFICATIONS
    // ==========================================

    const loadNotifications = async () => {

        try {

            setLoading(true);
            setError('');

            const farmerId =
                getFarmerId();

            console.log(
                'Farmer ID:',
                farmerId
            );


            if (!farmerId) {

                setNotifications([]);

                setError(
                    'Farmer information not found. Please login again.'
                );

                return;
            }


            const response =
                await axios.get(
                    `${API_URL}/api/notifications/farmer/${farmerId}`
                );


            setNotifications(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );


        } catch (err) {

            console.error(
                'Error loading notifications:',
                err
            );

            setError(
                'Unable to load notifications.'
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadNotifications();

    }, []);


    // ==========================================
    // MARK AS READ
    // ==========================================

    const markAsRead = async (id) => {

        try {

            await axios.put(
                `${API_URL}/api/notifications/${id}/read`
            );


            setNotifications(
                (previous) =>
                    previous.map(
                        (notification) =>
                            notification.id === id
                                ? {
                                    ...notification,
                                    read: true
                                }
                                : notification
                    )
            );

        } catch (err) {

            console.error(
                'Error marking notification as read:',
                err
            );
        }
    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return '';
        }

        try {

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

        } catch (err) {

            return '';
        }
    };


    // ==========================================
    // ICON
    // ==========================================

    const getIcon = (type) => {

        switch (type) {

            case 'SCHEME':
                return '🏛️';

            case 'EXPENSE':
                return '💰';

            case 'REMINDER':
                return '⏰';

            case 'SYSTEM':
                return '⚙️';

            default:
                return '🔔';
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="notification-page">

                <div className="notification-loading">

                    <div className="notification-loading-icon">
                        🔔
                    </div>

                    <h3>
                        Loading notifications...
                    </h3>

                    <p>
                        Please wait.
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="notification-page">

            {/* HEADER */}

            <div className="notification-header">

                <div>

                    <h2>
                        🔔 Notifications
                    </h2>

                    <p>
                        Important updates and messages
                        for you.
                    </p>

                </div>


                <button
                    className="notification-refresh-btn"
                    onClick={loadNotifications}
                >
                    🔄 Refresh
                </button>

            </div>


            {/* ERROR */}

            {error && (

                <div className="notification-error">
                    ⚠️ {error}
                </div>

            )}


            {/* EMPTY */}

            {!error &&
                notifications.length === 0 && (

                    <div className="notification-empty">

                        <div className="notification-empty-icon">
                            🔔
                        </div>

                        <h3>
                            No Notifications
                        </h3>

                        <p>
                            You don't have any
                            notifications right now.
                        </p>

                    </div>

                )}


            {/* NOTIFICATIONS */}

            {notifications.length > 0 && (

                <div className="notification-list">

                    {notifications.map(
                        (notification) => (

                            <div
                                key={notification.id}
                                className={
                                    notification.read
                                        ? 'notification-card read'
                                        : 'notification-card unread'
                                }
                                onClick={() => {

                                    if (
                                        !notification.read
                                    ) {

                                        markAsRead(
                                            notification.id
                                        );

                                    }

                                }}
                            >

                                <div className="notification-icon">

                                    {getIcon(
                                        notification.type
                                    )}

                                </div>


                                <div className="notification-content">

                                    <div className="notification-title-row">

                                        <h3>
                                            {
                                                notification.title
                                            }
                                        </h3>


                                        {!notification.read && (

                                            <span className="unread-badge">
                                                New
                                            </span>

                                        )}

                                    </div>


                                    <p className="notification-message">
                                        {
                                            notification.message
                                        }
                                    </p>


                                    <div className="notification-meta">

                                        <span>
                                            🏷️{' '}
                                            {
                                                notification.type ||
                                                'GENERAL'
                                            }
                                        </span>


                                        <span>
                                            📅{' '}
                                            {
                                                formatDate(
                                                    notification.createdAt
                                                )
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default Notification;