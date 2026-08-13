import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SchemeManagement() {

const API_URL =
    process.env.REACT_APP_API_URL ||
    'https://expense-tracker-ocr-6.onrender.com';

    const [schemes, setSchemes] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        schemeName: '',
        description: '',
        eligibility: '',
        benefits: '',
        department: '',
        year: '',
        officialLink: '',
        status: 'Active'
    });


    // ==========================================
    // LOAD ALL GOVERNMENT SCHEMES
    // ==========================================

    const loadSchemes = async () => {

        try {

            setLoading(true);
            setError('');

            const response = await axios.get(
                `${API_URL}/api/schemes`
            );

            setSchemes(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (err) {

            console.error(
                'Error loading schemes:',
                err
            );

            setError(
                'Unable to load government schemes.'
            );

            setSchemes([]);

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // LOAD ON PAGE OPEN
    // ==========================================

    useEffect(() => {

        loadSchemes();

    }, []);


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({

            schemeName: '',
            description: '',
            eligibility: '',
            benefits: '',
            department: '',
            year: '',
            officialLink: '',
            status: 'Active'

        });

        setEditingId(null);
        setShowForm(false);

    };


    // ==========================================
    // OPEN ADD FORM
    // ==========================================

    const openAddForm = () => {

        setEditingId(null);

        setMessage('');
        setError('');

        setFormData({

            schemeName: '',
            description: '',
            eligibility: '',
            benefits: '',
            department: '',
            year: '',
            officialLink: '',
            status: 'Active'

        });

        setShowForm(true);

    };


    // ==========================================
    // ADD / UPDATE SCHEME
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.schemeName.trim()) {

            alert(
                'Please enter scheme name.'
            );

            return;
        }

        if (!formData.description.trim()) {

            alert(
                'Please enter scheme description.'
            );

            return;
        }

        try {

            setSaving(true);
            setError('');
            setMessage('');


            // ==================================
            // PREPARE DATA
            // ==================================

            const schemeData = {

                schemeName:
                    formData.schemeName.trim(),

                description:
                    formData.description.trim(),

                eligibility:
                    formData.eligibility.trim(),

                benefits:
                    formData.benefits.trim(),

                department:
                    formData.department.trim(),

                year:
                    formData.year
                        ? Number(formData.year)
                        : null,

                officialLink:
                    formData.officialLink.trim(),

                status:
                    formData.status

            };


            // ==================================
            // UPDATE
            // ==================================

            if (editingId) {

                const response =
                    await axios.put(
                        `${API_URL}/api/schemes/${editingId}`,
                        schemeData
                    );


                setSchemes((prev) =>
                    prev.map((scheme) =>
                        scheme.id === editingId
                            ? response.data
                            : scheme
                    )
                );


                setMessage(
                    'Government scheme updated successfully!'
                );

            }

            // ==================================
            // CREATE
            // ==================================

            else {

                const response =
                    await axios.post(
                        `${API_URL}/api/schemes`,
                        schemeData
                    );


                setSchemes((prev) => [

                    response.data,

                    ...prev

                ]);


                setMessage(
                    'Government scheme added successfully!'
                );

            }


            resetForm();

        } catch (err) {

            console.error(
                'Error saving government scheme:',
                err
            );

            setError(
                err.response?.data ||
                'Unable to save government scheme.'
            );

        } finally {

            setSaving(false);

        }
    };


    // ==========================================
    // EDIT SCHEME
    // ==========================================

    const handleEdit = (scheme) => {

        setFormData({

            schemeName:
                scheme.schemeName || '',

            description:
                scheme.description || '',

            eligibility:
                scheme.eligibility || '',

            benefits:
                scheme.benefits || '',

            department:
                scheme.department || '',

            year:
                scheme.year || '',

            officialLink:
                scheme.officialLink || '',

            status:
                scheme.status || 'Active'

        });

        setEditingId(scheme.id);

        setMessage('');
        setError('');

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    };


    // ==========================================
    // DELETE SCHEME
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this government scheme?'
            );

        if (!confirmDelete) {
            return;
        }

        try {

            setError('');
            setMessage('');

            await axios.delete(
                `${API_URL}/api/schemes/${id}`
            );


            setSchemes((prev) =>
                prev.filter(
                    (scheme) =>
                        scheme.id !== id
                )
            );


            setMessage(
                'Government scheme deleted successfully!'
            );

        } catch (err) {

            console.error(
                'Error deleting scheme:',
                err
            );

            setError(
                err.response?.data ||
                'Unable to delete government scheme.'
            );

        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div style={styles.loadingContainer}>

                <div style={styles.loadingIcon}>
                    🏛️
                </div>

                <h2>
                    Loading Government Schemes...
                </h2>

                <p>
                    Please wait while schemes are loaded.
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
                        🏛️ Government Schemes
                    </h1>

                    <p style={styles.subtitle}>
                        Manage government schemes
                        available for farmers.
                    </p>

                </div>


                <button
                    style={styles.addButton}
                    onClick={openAddForm}
                >
                    + Add Scheme
                </button>

            </div>


            {/* ==================================
                SUCCESS MESSAGE
            ================================== */}

            {message && (

                <div style={styles.successMessage}>
                    ✅ {message}
                </div>

            )}


            {/* ==================================
                ERROR MESSAGE
            ================================== */}

            {error && (

                <div style={styles.errorMessage}>
                    ❌ {error}
                </div>

            )}


            {/* ==================================
                ADD / EDIT FORM
            ================================== */}

            {showForm && (

                <div style={styles.formCard}>

                    <div style={styles.formHeader}>

                        <h2 style={styles.formTitle}>

                            {editingId
                                ? '✏️ Edit Government Scheme'
                                : '➕ Add Government Scheme'}

                        </h2>


                        <button
                            type="button"
                            onClick={resetForm}
                            style={styles.closeButton}
                        >
                            ✕
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* SCHEME NAME */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Scheme Name *
                            </label>

                            <input
                                type="text"
                                name="schemeName"
                                value={
                                    formData.schemeName
                                }
                                onChange={handleChange}
                                placeholder="e.g. PM-KISAN"
                                style={styles.input}
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Description *
                            </label>

                            <textarea
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={handleChange}
                                placeholder="Enter scheme description"
                                style={styles.textarea}
                                rows="4"
                                required
                            />

                        </div>


                        {/* ELIGIBILITY */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Eligibility
                            </label>

                            <textarea
                                name="eligibility"
                                value={
                                    formData.eligibility
                                }
                                onChange={handleChange}
                                placeholder="Who can apply for this scheme?"
                                style={styles.textarea}
                                rows="3"
                            />

                        </div>


                        {/* BENEFITS */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Benefits
                            </label>

                            <textarea
                                name="benefits"
                                value={
                                    formData.benefits
                                }
                                onChange={handleChange}
                                placeholder="What benefits are provided?"
                                style={styles.textarea}
                                rows="3"
                            />

                        </div>


                        {/* DEPARTMENT + YEAR */}

                        <div style={styles.formRow}>

                            <div style={styles.formGroup}>

                                <label style={styles.label}>
                                    Department
                                </label>

                                <input
                                    type="text"
                                    name="department"
                                    value={
                                        formData.department
                                    }
                                    onChange={handleChange}
                                    placeholder="e.g. Agriculture Department"
                                    style={styles.input}
                                />

                            </div>


                            <div style={styles.formGroup}>

                                <label style={styles.label}>
                                    Year
                                </label>

                                <input
                                    type="number"
                                    name="year"
                                    value={
                                        formData.year
                                    }
                                    onChange={handleChange}
                                    placeholder="2026"
                                    style={styles.input}
                                    min="1900"
                                    max="2100"
                                />

                            </div>

                        </div>


                        {/* OFFICIAL LINK */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Official Website Link
                            </label>

                            <input
                                type="url"
                                name="officialLink"
                                value={
                                    formData.officialLink
                                }
                                onChange={handleChange}
                                placeholder="https://example.gov.in"
                                style={styles.input}
                            />

                        </div>


                        {/* STATUS */}

                        <div style={styles.formGroup}>

                            <label style={styles.label}>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={handleChange}
                                style={styles.input}
                            >

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>


                        {/* FORM ACTIONS */}

                        <div style={styles.formActions}>

                            <button
                                type="button"
                                onClick={resetForm}
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
                                        ? '💾 Update Scheme'
                                        : '💾 Save Scheme'}

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ==================================
                EMPTY STATE
            ================================== */}

            {schemes.length === 0 &&
                !showForm && (

                    <div style={styles.emptyCard}>

                        <div style={styles.icon}>
                            🏛️
                        </div>

                        <h2 style={styles.emptyTitle}>
                            No Government Schemes Added
                        </h2>

                        <p style={styles.emptyText}>
                            Add government schemes here
                            so farmers can view the
                            schemes and their benefits.
                        </p>

                        <button
                            style={styles.primaryButton}
                            onClick={openAddForm}
                        >
                            + Add First Scheme
                        </button>

                    </div>

                )}


            {/* ==================================
                SCHEME LIST
            ================================== */}

            {schemes.length > 0 && (

                <div style={styles.schemeGrid}>

                    {schemes.map((scheme) => (

                        <div
                            key={scheme.id}
                            style={styles.schemeCard}
                        >

                            {/* CARD HEADER */}

                            <div style={styles.cardHeader}>

                                <div style={styles.schemeIcon}>
                                    🏛️
                                </div>


                                <div
                                    style={
                                        styles.schemeTitleContainer
                                    }
                                >

                                    <h2
                                        style={
                                            styles.schemeTitle
                                        }
                                    >
                                        {scheme.schemeName}
                                    </h2>


                                    <span
                                        style={{
                                            ...styles.statusBadge,

                                            backgroundColor:
                                                scheme.status ===
                                                'Active'
                                                    ? '#dcfce7'
                                                    : '#fee2e2',

                                            color:
                                                scheme.status ===
                                                'Active'
                                                    ? '#15803d'
                                                    : '#dc2626'
                                        }}
                                    >
                                        {scheme.status ||
                                            'Active'}
                                    </span>

                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <p style={styles.description}>
                                {scheme.description}
                            </p>


                            {/* INFORMATION */}

                            <div style={styles.infoBox}>

                                <div
                                    style={
                                        styles.infoItem
                                    }
                                >

                                    <strong>
                                        👨‍🌾 Eligibility
                                    </strong>

                                    <span>
                                        {scheme.eligibility ||
                                            'Not specified'}
                                    </span>

                                </div>


                                <div
                                    style={
                                        styles.infoItem
                                    }
                                >

                                    <strong>
                                        🎁 Benefits
                                    </strong>

                                    <span>
                                        {scheme.benefits ||
                                            'Not specified'}
                                    </span>

                                </div>


                                <div
                                    style={
                                        styles.infoRow
                                    }
                                >

                                    <span>
                                        🏢{' '}
                                        <strong>
                                            Department:
                                        </strong>{' '}
                                        {scheme.department ||
                                            'N/A'}
                                    </span>


                                    <span>
                                        📅{' '}
                                        <strong>
                                            Year:
                                        </strong>{' '}
                                        {scheme.year ||
                                            'N/A'}
                                    </span>

                                </div>

                            </div>


                            {/* OFFICIAL LINK */}

                            {scheme.officialLink && (

                                <a
                                    href={
                                        scheme.officialLink
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.link}
                                >
                                    🔗 View Official Website
                                </a>

                            )}


                            {/* ACTIONS */}

                            <div
                                style={
                                    styles.cardActions
                                }
                            >

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            scheme
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
                                        handleDelete(
                                            scheme.id
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

                    ))}

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

    loadingContainer: {
        background: 'white',
        padding: '70px 30px',
        borderRadius: '16px',
        textAlign: 'center',
        border: '1px solid #e2e8f0',
        boxShadow:
            '0 4px 12px rgba(0,0,0,0.06)'
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
        marginTop: '8px',
        color: '#64748b',
        fontSize: '15px'
    },

    addButton: {
        backgroundColor: '#15803d',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer'
    },

    successMessage: {
        background: '#dcfce7',
        color: '#166534',
        padding: '12px 15px',
        borderRadius: '8px',
        marginBottom: '20px'
    },

    errorMessage: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '12px 15px',
        borderRadius: '8px',
        marginBottom: '20px'
    },

    formCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow:
            '0 4px 15px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
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
        background: '#f1f5f9',
        border: 'none',
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px'
    },

    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '18px',
        flex: 1
    },

    formRow: {
        display: 'flex',
        gap: '20px'
    },

    label: {
        fontWeight: '600',
        color: '#334155',
        marginBottom: '7px'
    },

    input: {
        padding: '12px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '15px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box'
    },

    textarea: {
        padding: '12px',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '15px',
        resize: 'vertical',
        outline: 'none',
        fontFamily: 'inherit',
        width: '100%',
        boxSizing: 'border-box'
    },

    formActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '25px'
    },

    cancelButton: {
        backgroundColor: '#f1f5f9',
        color: '#334155',
        border: '1px solid #cbd5e1',
        padding: '12px 22px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    saveButton: {
        backgroundColor: '#15803d',
        color: 'white',
        border: 'none',
        padding: '12px 22px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    emptyCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '60px 30px',
        textAlign: 'center',
        boxShadow:
            '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
    },

    icon: {
        fontSize: '55px',
        marginBottom: '15px'
    },

    emptyTitle: {
        color: '#1e293b',
        marginBottom: '10px'
    },

    emptyText: {
        color: '#64748b',
        maxWidth: '550px',
        margin: '0 auto',
        lineHeight: '1.6'
    },

    primaryButton: {
        marginTop: '20px',
        backgroundColor: '#15803d',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer'
    },

    schemeGrid: {
        display: 'grid',
        gridTemplateColumns:
            'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px'
    },

    schemeCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow:
            '0 4px 12px rgba(0,0,0,0.07)',
        border: '1px solid #e2e8f0'
    },

    cardHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        marginBottom: '15px'
    },

    schemeIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        backgroundColor: '#f0fdf4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
        flexShrink: 0
    },

    schemeTitleContainer: {
        flex: 1
    },

    schemeTitle: {
        margin: '0 0 8px 0',
        color: '#1e293b',
        fontSize: '20px'
    },

    statusBadge: {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700'
    },

    description: {
        color: '#475569',
        lineHeight: '1.6',
        marginBottom: '18px'
    },

    infoBox: {
        backgroundColor: '#f8fafc',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '15px'
    },

    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginBottom: '12px',
        color: '#475569',
        lineHeight: '1.5'
    },

    infoRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        color: '#475569',
        fontSize: '14px'
    },

    link: {
        display: 'inline-block',
        color: '#15803d',
        fontWeight: '600',
        textDecoration: 'none',
        marginBottom: '18px'
    },

    cardActions: {
        display: 'flex',
        gap: '10px',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '15px'
    },

    editButton: {
        flex: 1,
        backgroundColor: '#eff6ff',
        color: '#2563eb',
        border: '1px solid #bfdbfe',
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },

    deleteButton: {
        flex: 1,
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca',
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    }
};

export default SchemeManagement;