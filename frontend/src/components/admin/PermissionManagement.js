import React, { useEffect, useState } from 'react';
import { getAllFarmers } from '../../services/adminService';
import axios from 'axios';

import './PermissionManagement.css';

const API_URL =
    process.env.REACT_APP_API_URL ||
    'http://localhost:8081';

function PermissionManagement({ selectedFarmer: farmerFromParent }) {

    const [farmers, setFarmers] = useState([]);

    const [selectedFarmer, setSelectedFarmer] =
        useState(farmerFromParent || '');

    const [permissions, setPermissions] = useState({
        expenseAccess: true,
        ocrAccess: true,
        reminderAccess: true,
        cropManagementAccess: true,
        analyticsAccess: true,
        schemeAccess: true
    });

    const [loadingFarmers, setLoadingFarmers] =
        useState(true);

    const [loadingPermissions, setLoadingPermissions] =
        useState(false);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    // ==========================================
    // LOAD FARMERS
    // ==========================================

    useEffect(() => {

        const loadFarmers = async () => {

            try {

                setLoadingFarmers(true);
                setError('');

                const data = await getAllFarmers();

                const farmerList =
                    Array.isArray(data) ? data : [];

                setFarmers(farmerList);

                // If farmer came from Farmer Management,
                // keep that farmer selected.
                if (farmerFromParent) {

                    setSelectedFarmer(
                        String(farmerFromParent)
                    );

                } else if (
                    farmerList.length > 0
                ) {

                    // Otherwise select first farmer
                    setSelectedFarmer(
                        String(farmerList[0].id)
                    );
                }

            } catch (err) {

                console.error(
                    'Error loading farmers:',
                    err
                );

                setError(
                    'Unable to load farmers.'
                );

            } finally {

                setLoadingFarmers(false);

            }
        };

        loadFarmers();

    }, [farmerFromParent]);


    // ==========================================
    // LOAD SELECTED FARMER PERMISSIONS
    // ==========================================

    useEffect(() => {

        if (!selectedFarmer) {
            return;
        }

        const loadPermissions = async () => {

            try {

                setLoadingPermissions(true);
                setError('');
                setMessage('');

                const response = await axios.get(
                    `${API_URL}/api/admin/permissions/${selectedFarmer}`
                );

                setPermissions({

                    expenseAccess:
                        response.data.expenseAccess,

                    ocrAccess:
                        response.data.ocrAccess,

                    reminderAccess:
                        response.data.reminderAccess,

                    cropManagementAccess:
                        response.data.cropManagementAccess,

                    analyticsAccess:
                        response.data.analyticsAccess,

                    schemeAccess:
                        response.data.schemeAccess

                });

            } catch (err) {

                console.error(
                    'Error loading permissions:',
                    err
                );

                setError(
                    'Unable to load farmer permissions.'
                );

            } finally {

                setLoadingPermissions(false);

            }
        };

        loadPermissions();

    }, [selectedFarmer]);


    // ==========================================
    // TOGGLE PERMISSION
    // ==========================================

    const handleToggle = (permissionName) => {

        setPermissions((previous) => ({

            ...previous,

            [permissionName]:
                !previous[permissionName]

        }));

    };


    // ==========================================
    // SAVE PERMISSIONS
    // ==========================================

    const handleSave = async () => {

        if (!selectedFarmer) {

            setError(
                'Please select a farmer.'
            );

            return;
        }

        try {

            setSaving(true);
            setError('');
            setMessage('');

            await axios.put(
                `${API_URL}/api/admin/permissions/${selectedFarmer}`,
                permissions
            );

            setMessage(
                'Permissions updated successfully!'
            );

        } catch (err) {

            console.error(
                'Error saving permissions:',
                err
            );

            setError(
                'Unable to update permissions.'
            );

        } finally {

            setSaving(false);

        }
    };


    // ==========================================
    // LOADING FARMERS
    // ==========================================

    if (loadingFarmers) {

        return (

            <div className="admin-page">

                <h1>
                    🔐 Permission Management
                </h1>

                <p>
                    Loading farmers...
                </p>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="admin-page">

            {/* HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        🔐 Permission Management
                    </h1>

                    <p>
                        Control which features each
                        farmer can access.
                    </p>

                </div>

            </div>


            {/* SUCCESS MESSAGE */}

            {message && (

                <div
                    style={{
                        marginTop: '20px',
                        padding: '12px 15px',
                        background: '#dcfce7',
                        color: '#166534',
                        borderRadius: '8px'
                    }}
                >
                    ✅ {message}
                </div>

            )}


            {/* ERROR MESSAGE */}

            {error && (

                <div
                    style={{
                        marginTop: '20px',
                        padding: '12px 15px',
                        background: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: '8px'
                    }}
                >
                    ❌ {error}
                </div>

            )}


            {/* MAIN CARD */}

            <div
                style={{
                    background: 'white',
                    marginTop: '25px',
                    padding: '25px',
                    borderRadius: '14px',
                    boxShadow:
                        '0 4px 15px rgba(0,0,0,0.05)'
                }}
            >

                {/* FARMER SELECT */}

                <div
                    style={{
                        marginBottom: '30px'
                    }}
                >

                    <label
                        style={{
                            display: 'block',
                            fontWeight: '600',
                            color: '#334155',
                            marginBottom: '8px'
                        }}
                    >
                        👨‍🌾 Select Farmer
                    </label>


                    <select
                        value={selectedFarmer}
                        onChange={(e) =>
                            setSelectedFarmer(
                                e.target.value
                            )
                        }
                        style={{
                            width: '100%',
                            padding: '12px',
                            border:
                                '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '14px',
                            background: 'white'
                        }}
                    >

                        {farmers.length === 0 ? (

                            <option value="">
                                No farmers available
                            </option>

                        ) : (

                            farmers.map((farmer) => (

                                <option
                                    key={farmer.id}
                                    value={farmer.id}
                                >
                                    {farmer.fullName ||
                                        farmer.name ||
                                        'Unknown Farmer'}
                                    {' — '}
                                    {farmer.email || ''}
                                </option>

                            ))

                        )}

                    </select>

                </div>


                {/* PERMISSIONS */}

                {loadingPermissions ? (

                    <p>
                        Loading permissions...
                    </p>

                ) : (

                    <div>

                        <h2
                            style={{
                                color: '#14532d',
                                marginBottom: '20px'
                            }}
                        >
                            Feature Access
                        </h2>


                        <PermissionRow
                            icon="💰"
                            title="Expense Tracking"
                            description="Allow farmer to add and manage expenses."
                            enabled={
                                permissions.expenseAccess
                            }
                            onToggle={() =>
                                handleToggle(
                                    'expenseAccess'
                                )
                            }
                        />


                        <PermissionRow
                            icon="🧾"
                            title="OCR Receipt Scanner"
                            description="Allow farmer to scan receipts using OCR."
                            enabled={
                                permissions.ocrAccess
                            }
                            onToggle={() =>
                                handleToggle(
                                    'ocrAccess'
                                )
                            }
                        />


                        <PermissionRow
                            icon="🔔"
                            title="Reminders"
                            description="Allow farmer to create and manage reminders."
                            enabled={
                                permissions.reminderAccess
                            }
                            onToggle={() =>
                                handleToggle(
                                    'reminderAccess'
                                )
                            }
                        />


                        <PermissionRow
                            icon="🌾"
                            title="Crop Management"
                            description="Allow farmer to manage crops and farming activities."
                            enabled={
                                permissions.cropManagementAccess
                            }
                            onToggle={() =>
                                handleToggle(
                                    'cropManagementAccess'
                                )
                            }
                        />


                        <PermissionRow
                            icon="📊"
                            title="Expense Analytics"
                            description="Allow farmer to view expense analytics."
                            enabled={
                                permissions.analyticsAccess
                            }
                            onToggle={() =>
                                handleToggle(
                                    'analyticsAccess'
                                )
                            }
                        />


                        <PermissionRow
                            icon="🏛️"
                            title="Government Schemes"
                            description="Allow farmer to view government schemes."
                            enabled={
                                permissions.schemeAccess
                            }
                            onToggle={() =>
                                handleToggle(
                                    'schemeAccess'
                                )
                            }
                        />


                        {/* SAVE */}

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            style={{
                                marginTop: '25px',
                                width: '100%',
                                padding: '13px',
                                border: 'none',
                                borderRadius: '8px',
                                background: '#15803d',
                                color: 'white',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: saving
                                    ? 'not-allowed'
                                    : 'pointer',
                                opacity: saving
                                    ? 0.7
                                    : 1
                            }}
                        >

                            {saving
                                ? 'Saving...'
                                : '💾 Save Permissions'
                            }

                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}


// ==========================================
// PERMISSION ROW
// ==========================================

function PermissionRow({
    icon,
    title,
    description,
    enabled,
    onToggle
}) {

    return (

        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                padding: '18px 0',
                borderBottom:
                    '1px solid #e5e7eb'
            }}
        >

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}
            >

                <div
                    style={{
                        fontSize: '25px',
                        width: '45px',
                        textAlign: 'center'
                    }}
                >
                    {icon}
                </div>

                <div>

                    <h3
                        style={{
                            margin: 0,
                            color: '#334155',
                            fontSize: '16px'
                        }}
                    >
                        {title}
                    </h3>

                    <p
                        style={{
                            margin: '5px 0 0',
                            color: '#64748b',
                            fontSize: '13px'
                        }}
                    >
                        {description}
                    </p>

                </div>

            </div>


            {/* TOGGLE */}

            <button
                onClick={onToggle}
                aria-label={
                    `${title} ${
                        enabled
                            ? 'enabled'
                            : 'disabled'
                    }`
                }
                style={{
                    width: '55px',
                    height: '28px',
                    border: 'none',
                    borderRadius: '20px',
                    background: enabled
                        ? '#16a34a'
                        : '#cbd5e1',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: '0.2s',
                    flexShrink: 0
                }}
            >

                <span
                    style={{
                        position: 'absolute',
                        top: '4px',
                        left: enabled
                            ? '31px'
                            : '4px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'white',
                        transition: '0.2s',
                        boxShadow:
                            '0 1px 3px rgba(0,0,0,0.2)'
                    }}
                />

            </button>

        </div>
    );
}

export default PermissionManagement;