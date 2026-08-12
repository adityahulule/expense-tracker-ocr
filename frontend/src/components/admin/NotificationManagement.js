import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationManagement() {

    const API_URL =
        process.env.REACT_APP_API_URL ||
        'http://localhost:8081';

    const [notifications, setNotifications] = useState([]);
    const [farmers, setFarmers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        farmerId: '',
        title: '',
        message: '',
        type: 'GENERAL',
        active: true
    });


    // ==========================================
    // LOAD NOTIFICATIONS AND FARMERS
    // ==========================================

    const loadData = async () => {

        try {

            setLoading(true);
            setError('');

            const notificationResponse =
                await axios.get(
                    `${API_URL}/api/notifications`
                );

            const farmerResponse =
                await axios.get(
                    `${API_URL}/api/admin/farmers`
                );

            setNotifications(
                Array.isArray(notificationResponse.data)
                    ? notificationResponse.data
                    : []
            );

            setFarmers(
                Array.isArray(farmerResponse.data)
                    ? farmerResponse.data
                    : []
            );

        } catch (err) {

            console.error(
                'Error loading notification data:',
                err
            );

            setError(
                'Unable to load notifications or farmers.'
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadData();

    }, []);


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // ==========================================
    // OPEN ADD FORM
    // ==========================================

    const openAddForm = () => {

        setEditingId(null);

        setFormData({
            farmerId: '',
            title: '',
            message: '',
            type: 'GENERAL',
            active: true
        });

        setError('');
        setMessage('');

        setShowForm(true);
    };


    // ==========================================
    // CLOSE FORM
    // ==========================================

    const closeForm = () => {

        setShowForm(false);
        setEditingId(null);

        setFormData({
            farmerId: '',
            title: '',
            message: '',
            type: 'GENERAL',
            active: true
        });
    };


    // ==========================================
    // CREATE / UPDATE NOTIFICATION
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title.trim()) {

            alert(
                'Please enter notification title.'
            );

            return;
        }

        if (!formData.message.trim()) {

            alert(
                'Please enter notification message.'
            );

            return;
        }

        try {

            setSaving(true);
            setError('');
            setMessage('');

            const notificationData = {

                farmerId:
                    formData.farmerId
                        ? Number(formData.farmerId)
                        : null,

                title:
                    formData.title.trim(),

                message:
                    formData.message.trim(),

                type:
                    formData.type,

                active:
                    formData.active
            };


            // ==================================
            // UPDATE
            // ==================================

            if (editingId) {

                const response =
                    await axios.put(
                        `${API_URL}/api/notifications/${editingId}`,
                        notificationData
                    );

                setNotifications((previous) =>
                    previous.map((notification) =>
                        notification.id === editingId
                            ? response.data
                            : notification
                    )
                );

                setMessage(
                    'Notification updated successfully.'
                );

            }

            // ==================================
            // CREATE
            // ==================================

            else {

                const response =
                    await axios.post(
                        `${API_URL}/api/notifications`,
                        notificationData
                    );

                setNotifications((previous) => [
                    response.data,
                    ...previous
                ]);

                setMessage(
                    'Notification sent successfully.'
                );
            }

            closeForm();

        } catch (err) {

            console.error(
                'Error saving notification:',
                err
            );

            setError(
                err.response?.data ||
                'Unable to save notification.'
            );

        } finally {

            setSaving(false);

        }
    };


    // ==========================================
    // EDIT NOTIFICATION
    // ==========================================

    const handleEdit = (notification) => {

        setEditingId(notification.id);

        setFormData({

            farmerId:
                notification.farmerId || '',

            title:
                notification.title || '',

            message:
                notification.message || '',

            type:
                notification.type || 'GENERAL',

            active:
                notification.active !== false
        });

        setError('');
        setMessage('');

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    // ==========================================
    // DELETE NOTIFICATION
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this notification?'
            );

        if (!confirmDelete) {
            return;
        }

        try {

            setError('');
            setMessage('');

            await axios.delete(
                `${API_URL}/api/notifications/${id}`
            );

            setNotifications((previous) =>
                previous.filter(
                    (notification) =>
                        notification.id !== id
                )
            );

            setMessage(
                'Notification deleted successfully.'
            );

        } catch (err) {

            console.error(
                'Error deleting notification:',
                err
            );

            setError(
                err.response?.data ||
                'Unable to delete notification.'
            );
        }
    };


    // ==========================================
    // ACTIVATE / DEACTIVATE
    // ==========================================

    const toggleActive = async (notification) => {

        try {

            setError('');
            setMessage('');

            const action =
                notification.active
                    ? 'deactivate'
                    : 'activate';

            const response =
                await axios.put(
                    `${API_URL}/api/notifications/${notification.id}/${action}`
                );

            setNotifications((previous) =>
                previous.map((item) =>
                    item.id === notification.id
                        ? response.data
                        : item
                )
            );

            setMessage(
                notification.active
                    ? 'Notification deactivated.'
                    : 'Notification activated.'
            );

        } catch (err) {

            console.error(
                'Error changing notification status:',
                err
            );

            setError(
                'Unable to change notification status.'
            );
        }
    };


    // ==========================================
    // GET FARMER NAME
    // ==========================================

    const getFarmerName = (farmerId) => {

        if (!farmerId) {
            return 'All Farmers';
        }

        const farmer =
            farmers.find(
                (item) =>
                    Number(item.id) ===
                    Number(farmerId)
            );

        if (!farmer) {
            return `Farmer ID: ${farmerId}`;
        }

        return (
            farmer.fullName ||
            farmer.name ||
            farmer.email ||
            `Farmer ID: ${farmerId}`
        );
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div style={styles.loading}>

                <div style={styles.loadingIcon}>
                    🔔
                </div>

                <h2>
                    Loading Notifications...
                </h2>

                <p>
                    Please wait while notifications
                    are loaded.
                </p>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div style={styles.container}>

            {/* ==================================
                HEADER
            ================================== */}

            <div style={styles.header}>

                <div>

                    <h1 style={styles.heading}>
                        🔔 Notification Management
                    </h1>

                    <p style={styles.subtitle}>
                        Send and manage notifications
                        for farmers.
                    </p>

                </div>


                <button
                    style={styles.addButton}
                    onClick={openAddForm}
                >
                    + Create Notification
                </button>

            </div>


            {/* ==================================
                SUCCESS MESSAGE
            ================================== */}

            {message && (

                <div style={styles.success}>
                    ✅ {message}
                </div>

            )}


            {/* ==================================
                ERROR MESSAGE
            ================================== */}

            {error && (

                <div style={styles.error}>
                    ❌ {error}
                </div>

            )}


            {/* ==================================
                FORM
            ================================== */}

            {showForm && (

                <div style={styles.formCard}>

                    <div style={styles.formHeader}>

                        <h2 style={styles.formTitle}>

                            {editingId
                                ? '✏️ Edit Notification'
                                : '📢 Create Notification'}

                        </h2>


                        <button
                            type="button"
                            onClick={closeForm}
                            style={styles.closeButton}
                        >
                            ✕
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* RECIPIENT */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Send To
                            </label>

                            <select
                                name="farmerId"
                                value={
                                    formData.farmerId
                                }
                                onChange={handleChange}
                                style={styles.input}
                            >

                                <option value="">
                                    📢 All Farmers
                                </option>

                                {farmers.map((farmer) => (

                                    <option
                                        key={farmer.id}
                                        value={farmer.id}
                                    >

                                        👨‍🌾{' '}

                                        {farmer.fullName ||
                                            farmer.name ||
                                            farmer.email ||
                                            `Farmer ${farmer.id}`}

                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* TITLE */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Notification Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={
                                    formData.title
                                }
                                onChange={handleChange}
                                placeholder="Enter notification title"
                                style={styles.input}
                                required
                            />

                        </div>


                        {/* MESSAGE */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Message *
                            </label>

                            <textarea
                                name="message"
                                value={
                                    formData.message
                                }
                                onChange={handleChange}
                                placeholder="Enter notification message"
                                rows="5"
                                style={styles.textarea}
                                required
                            />

                        </div>


                        {/* TYPE */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Notification Type
                            </label>

                            <select
                                name="type"
                                value={
                                    formData.type
                                }
                                onChange={handleChange}
                                style={styles.input}
                            >

                                <option value="GENERAL">
                                    📢 General
                                </option>

                                <option value="SCHEME">
                                    🏛️ Government Scheme
                                </option>

                                <option value="EXPENSE">
                                    💰 Expense
                                </option>

                                <option value="REMINDER">
                                    🔔 Reminder
                                </option>

                                <option value="SYSTEM">
                                    ⚙️ System
                                </option>

                            </select>

                        </div>


                        {/* ACTION BUTTONS */}

                        <div style={styles.actions}>

                            <button
                                type="button"
                                onClick={closeForm}
                                style={styles.cancelButton}
                                disabled={saving}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                style={styles.saveButton}
                                disabled={saving}
                            >

                                {saving
                                    ? 'Saving...'
                                    : editingId
                                        ? '💾 Update Notification'
                                        : '📢 Send Notification'}

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ==================================
                EMPTY STATE
            ================================== */}

            {notifications.length === 0 &&
                !showForm && (

                    <div style={styles.empty}>

                        <div style={styles.emptyIcon}>
                            🔔
                        </div>

                        <h2>
                            No Notifications
                        </h2>

                        <p>
                            No notifications have been
                            created yet.
                        </p>

                        <button
                            style={styles.addButton}
                            onClick={openAddForm}
                        >
                            + Create First Notification
                        </button>

                    </div>

                )}


            {/* ==================================
                NOTIFICATION LIST
            ================================== */}

            {notifications.length > 0 && (

                <div style={styles.list}>

                    {notifications.map(
                        (notification) => (

                            <div
                                key={notification.id}
                                style={styles.card}
                            >

                                {/* CARD CONTENT */}

                                <div style={styles.cardTop}>

                                    <div
                                        style={
                                            styles.notificationIcon
                                        }
                                    >
                                        🔔
                                    </div>


                                    <div
                                        style={
                                            styles.cardContent
                                        }
                                    >

                                        <div
                                            style={
                                                styles.titleRow
                                            }
                                        >

                                            <h3
                                                style={
                                                    styles.cardTitle
                                                }
                                            >
                                                {
                                                    notification.title
                                                }
                                            </h3>


                                            <span
                                                style={{
                                                    ...styles.badge,
                                                    backgroundColor:
                                                        notification.active
                                                            ? '#dcfce7'
                                                            : '#fee2e2',
                                                    color:
                                                        notification.active
                                                            ? '#15803d'
                                                            : '#dc2626'
                                                }}
                                            >

                                                {notification.active
                                                    ? 'Active'
                                                    : 'Inactive'}

                                            </span>

                                        </div>


                                        {/* IMPORTANT:
                                            Correct closing tag is </p>
                                        */}

                                        <p
                                            style={
                                                styles.cardMessage
                                            }
                                        >
                                            {
                                                notification.message
                                            }
                                        </p>


                                        {/* META INFORMATION */}

                                        <div
                                            style={
                                                styles.meta
                                            }
                                        >

                                            <span>
                                                👨‍🌾{' '}
                                                <strong>
                                                    To:
                                                </strong>{' '}

                                                {
                                                    getFarmerName(
                                                        notification.farmerId
                                                    )
                                                }

                                            </span>


                                            <span>
                                                🏷️{' '}
                                                <strong>
                                                    Type:
                                                </strong>{' '}

                                                {
                                                    notification.type ||
                                                    'GENERAL'
                                                }

                                            </span>


                                            <span>
                                                📅{' '}

                                                {notification.createdAt
                                                    ? new Date(
                                                        notification.createdAt
                                                    ).toLocaleString(
                                                        'en-IN'
                                                    )
                                                    : 'N/A'}

                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* CARD ACTIONS */}

                                <div
                                    style={
                                        styles.cardActions
                                    }
                                >

                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                notification
                                            )
                                        }
                                        style={
                                            styles.editButton
                                        }
                                    >
                                        ✏️ Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            toggleActive(
                                                notification
                                            )
                                        }
                                        style={
                                            notification.active
                                                ? styles.deactivateButton
                                                : styles.activateButton
                                        }
                                    >

                                        {notification.active
                                            ? '⏸️ Deactivate'
                                            : '▶️ Activate'}

                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                notification.id
                                            )
                                        }
                                        style={
                                            styles.deleteButton
                                        }
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}


// ==========================================
// STYLES
// ==========================================

const styles = {

    container: {
        padding: '10px'
    },

    loading: {
        background: 'white',
        padding: '70px 30px',
        borderRadius: '16px',
        textAlign: 'center',
        border: '1px solid #e2e8f0'
    },

    loadingIcon: {
        fontSize: '50px'
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        gap: '20px'
    },

    heading: {
        margin: 0,
        color: '#14532d',
        fontSize: '30px'
    },

    subtitle: {
        color: '#64748b',
        marginTop: '8px'
    },

    addButton: {
        background: '#15803d',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer'
    },

    success: {
        background: '#dcfce7',
        color: '#166534',
        padding: '12px 15px',
        borderRadius: '8px',
        marginBottom: '20px'
    },

    error: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '12px 15px',
        borderRadius: '8px',
        marginBottom: '20px'
    },

    formCard: {
        background: 'white',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '30px',
        border: '1px solid #e2e8f0',
        boxShadow:
            '0 4px 15px rgba(0,0,0,0.06)'
    },

    formHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
    },

    formTitle: {
        margin: 0,
        color: '#14532d'
    },

    closeButton: {
        border: 'none',
        background: '#f1f5f9',
        borderRadius: '8px',
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        fontSize: '18px'
    },

    formGroup: {
        marginBottom: '18px'
    },

    label: {
        display: 'block',
        marginBottom: '7px',
        fontWeight: '600',
        color: '#334155'
    },

    input: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '15px',
        background: 'white'
    },

    textarea: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '15px',
        resize: 'vertical',
        fontFamily: 'inherit'
    },

    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '25px'
    },

    cancelButton: {
        padding: '12px 22px',
        border: '1px solid #cbd5e1',
        background: '#f8fafc',
        color: '#334155',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    saveButton: {
        padding: '12px 22px',
        border: 'none',
        background: '#15803d',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    empty: {
        background: 'white',
        padding: '60px 30px',
        textAlign: 'center',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
    },

    emptyIcon: {
        fontSize: '55px',
        marginBottom: '15px'
    },

    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },

    card: {
        background: 'white',
        borderRadius: '14px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow:
            '0 3px 10px rgba(0,0,0,0.05)'
    },

    cardTop: {
        display: 'flex',
        gap: '15px'
    },

    notificationIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        background: '#f0fdf4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
        flexShrink: 0
    },

    cardContent: {
        flex: 1
    },

    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
    },

    cardTitle: {
        margin: 0,
        color: '#1e293b'
    },

    badge: {
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700'
    },

    cardMessage: {
        color: '#475569',
        lineHeight: '1.6',
        margin: '8px 0 12px'
    },

    meta: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        color: '#64748b',
        fontSize: '13px'
    },

    cardActions: {
        display: 'flex',
        gap: '10px',
        marginTop: '18px',
        paddingTop: '15px',
        borderTop: '1px solid #e2e8f0'
    },

    editButton: {
        background: '#eff6ff',
        color: '#2563eb',
        border: '1px solid #bfdbfe',
        padding: '9px 15px',
        borderRadius: '7px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    activateButton: {
        background: '#dcfce7',
        color: '#15803d',
        border: '1px solid #bbf7d0',
        padding: '9px 15px',
        borderRadius: '7px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    deactivateButton: {
        background: '#fff7ed',
        color: '#ea580c',
        border: '1px solid #fed7aa',
        padding: '9px 15px',
        borderRadius: '7px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    deleteButton: {
        background: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca',
        padding: '9px 15px',
        borderRadius: '7px',
        cursor: 'pointer',
        fontWeight: '600'
    }
};

export default NotificationManagement;