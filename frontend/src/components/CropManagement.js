import React, { useEffect, useState } from 'react';
import './CropManagement.css';
import { useLanguage } from '../i18n/LanguageContext';

import {
    getCrops,
    createCrop,
    updateCrop,
    deleteCrop
} from '../services/cropService';


function CropManagement() {

    const { language } = useLanguage();

    const [crops, setCrops] = useState([]);

    const [showForm, setShowForm] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [searchTerm, setSearchTerm] =
        useState('');

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState('');

    const [formData, setFormData] = useState({
        cropName: '',
        variety: '',
        season: 'Kharif',
        landArea: '',
        landUnit: 'Acre',
        sowingDate: '',
        expectedHarvestDate: '',
        irrigationType: 'Rainfed',
        status: 'Planned',
        fieldLocation: '',
        notes: ''
    });


    // =====================================================
    // TRANSLATIONS
    // =====================================================

    const translations = {

        en: {
            title: '🌾 Crop Management',
            subtitle: 'Manage your crops, farming activities and harvest information.',
            addCrop: '➕ Add Crop',
            editCrop: '✏️ Edit Crop',

            cropName: 'Crop Name',
            variety: 'Crop Variety',
            season: 'Season',
            landArea: 'Land Area',
            landUnit: 'Unit',
            sowingDate: 'Sowing Date',
            harvestDate: 'Expected Harvest Date',
            irrigation: 'Irrigation Type',
            status: 'Crop Status',
            location: 'Field / Location',
            notes: 'Notes',

            save: '💾 Save Crop',
            update: '💾 Update Crop',
            cancel: 'Cancel',

            search: '🔍 Search crop...',
            noCrops: 'No crops added yet.',

            planned: 'Planned',
            growing: 'Growing',
            harvested: 'Harvested',

            rainfed: 'Rainfed',
            drip: 'Drip Irrigation',
            sprinkler: 'Sprinkler',
            canal: 'Canal',
            other: 'Other',

            kharif: 'Kharif',
            rabi: 'Rabi',
            zaid: 'Zaid',

            acre: 'Acre',
            hectare: 'Hectare',

            cropAdded: 'Crop added successfully.',
            cropUpdated: 'Crop updated successfully.',
            cropDeleted: 'Crop deleted successfully.',

            confirmDelete:
                'Are you sure you want to delete this crop?',

            totalCrops: 'Total Crops',
            growingCrops: 'Growing Crops',
            harvestedCrops: 'Harvested Crops',
            totalLand: 'Total Land',

            field: 'Field',
            harvest: 'Harvest',

            edit: 'Edit',
            delete: 'Delete',

            loading: 'Loading crops...',
            saving: 'Saving...',
            loadingError: 'Unable to load crops.',
            operationError: 'Something went wrong.'
        },


        mr: {
            title: '🌾 पीक व्यवस्थापन',
            subtitle:
                'तुमची पिके, शेतीची कामे आणि कापणीची माहिती व्यवस्थापित करा.',

            addCrop: '➕ पीक जोडा',
            editCrop: '✏️ पीक बदला',

            cropName: 'पिकाचे नाव',
            variety: 'पिकाची जात',
            season: 'हंगाम',
            landArea: 'जमिनीचे क्षेत्रफळ',
            landUnit: 'एकक',
            sowingDate: 'पेरणीची तारीख',
            harvestDate: 'अपेक्षित कापणी तारीख',
            irrigation: 'सिंचन प्रकार',
            status: 'पिकाची स्थिती',
            location: 'शेत / ठिकाण',
            notes: 'नोंद',

            save: '💾 पीक जतन करा',
            update: '💾 पीक अपडेट करा',
            cancel: 'रद्द करा',

            search: '🔍 पीक शोधा...',
            noCrops: 'अजून कोणतेही पीक जोडलेले नाही.',

            planned: 'नियोजित',
            growing: 'वाढत आहे',
            harvested: 'कापणी झाली',

            rainfed: 'पावसावर आधारित',
            drip: 'ठिबक सिंचन',
            sprinkler: 'तुषार सिंचन',
            canal: 'कालवा',
            other: 'इतर',

            kharif: 'खरीप',
            rabi: 'रब्बी',
            zaid: 'उन्हाळी',

            acre: 'एकर',
            hectare: 'हेक्टर',

            cropAdded: 'पीक यशस्वीरित्या जोडले.',
            cropUpdated: 'पीक यशस्वीरित्या अपडेट झाले.',
            cropDeleted: 'पीक यशस्वीरित्या हटवले.',

            confirmDelete:
                'तुम्हाला हे पीक हटवायचे आहे का?',

            totalCrops: 'एकूण पिके',
            growingCrops: 'वाढणारी पिके',
            harvestedCrops: 'कापणी झालेली पिके',
            totalLand: 'एकूण जमीन',

            field: 'शेत',
            harvest: 'कापणी',

            edit: 'बदला',
            delete: 'हटवा',

            loading: 'पिके लोड होत आहेत...',
            saving: 'जतन होत आहे...',
            loadingError: 'पिके लोड करता आली नाहीत.',
            operationError: 'काहीतरी चूक झाली.'
        },


        hi: {
            title: '🌾 फसल प्रबंधन',
            subtitle:
                'अपनी फसलों, कृषि गतिविधियों और कटाई की जानकारी प्रबंधित करें।',

            addCrop: '➕ फसल जोड़ें',
            editCrop: '✏️ फसल बदलें',

            cropName: 'फसल का नाम',
            variety: 'फसल की किस्म',
            season: 'मौसम',
            landArea: 'भूमि क्षेत्र',
            landUnit: 'इकाई',
            sowingDate: 'बुवाई की तारीख',
            harvestDate: 'अनुमानित कटाई तारीख',
            irrigation: 'सिंचाई प्रकार',
            status: 'फसल की स्थिति',
            location: 'खेत / स्थान',
            notes: 'नोट्स',

            save: '💾 फसल सहेजें',
            update: '💾 फसल अपडेट करें',
            cancel: 'रद्द करें',

            search: '🔍 फसल खोजें...',
            noCrops: 'अभी तक कोई फसल नहीं जोड़ी गई है।',

            planned: 'नियोजित',
            growing: 'बढ़ रही है',
            harvested: 'कटाई हो गई',

            rainfed: 'बारिश आधारित',
            drip: 'ड्रिप सिंचाई',
            sprinkler: 'स्प्रिंकलर',
            canal: 'नहर',
            other: 'अन्य',

            kharif: 'खरीफ',
            rabi: 'रबी',
            zaid: 'जायद',

            acre: 'एकड़',
            hectare: 'हेक्टेयर',

            cropAdded: 'फसल सफलतापूर्वक जोड़ी गई।',
            cropUpdated: 'फसल सफलतापूर्वक अपडेट हुई।',
            cropDeleted: 'फसल सफलतापूर्वक हटाई गई।',

            confirmDelete:
                'क्या आप इस फसल को हटाना चाहते हैं?',

            totalCrops: 'कुल फसलें',
            growingCrops: 'बढ़ रही फसलें',
            harvestedCrops: 'कटाई हुई फसलें',
            totalLand: 'कुल भूमि',

            field: 'खेत',
            harvest: 'कटाई',

            edit: 'बदलें',
            delete: 'हटाएं',

            loading: 'फसलें लोड हो रही हैं...',
            saving: 'सहेजा जा रहा है...',
            loadingError: 'फसलें लोड नहीं हो सकीं।',
            operationError: 'कुछ गलत हो गया।'
        }
    };


    const t =
        translations[language] ||
        translations.en;


    // =====================================================
    // GET CURRENT USER
    // =====================================================

    const getCurrentUserId = () => {

        const userData =
            localStorage.getItem('user');

        if (!userData) {
            return null;
        }

        try {

            const user =
                JSON.parse(userData);

            return user?.id || null;

        } catch (error) {

            console.error(
                'Invalid user data:',
                error
            );

            return null;
        }
    };


    // =====================================================
    // LOAD CROPS FROM MYSQL
    // =====================================================

    const loadCrops = async () => {

        setLoading(true);
        setError('');

        try {

            const userId =
                getCurrentUserId();

            if (!userId) {

                setError(
                    'User not found. Please login again.'
                );

                setCrops([]);

                return;
            }

            const data =
                await getCrops(userId);

            setCrops(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                'Error loading crops:',
                err
            );

            setError(
                t.loadingError
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD ON PAGE OPEN
    // =====================================================

    useEffect(() => {

        loadCrops();

    }, []);


    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setFormData({

            cropName: '',
            variety: '',
            season: 'Kharif',
            landArea: '',
            landUnit: 'Acre',
            sowingDate: '',
            expectedHarvestDate: '',
            irrigationType: 'Rainfed',
            status: 'Planned',
            fieldLocation: '',
            notes: ''

        });

        setEditingId(null);
        setShowForm(false);
        setError('');

    };


    // =====================================================
    // ADD / UPDATE CROP
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.cropName.trim()) {

            alert(
                `${t.cropName} is required.`
            );

            return;
        }


        const userId =
            getCurrentUserId();

        if (!userId) {

            alert(
                'Please login again.'
            );

            return;
        }


        setSaving(true);
        setError('');


        try {

            const cropData = {

                ...formData,

                userId: userId,

                landArea:
                    formData.landArea
                        ? Number(formData.landArea)
                        : null

            };


            // =================================================
            // UPDATE
            // =================================================

            if (editingId) {

                await updateCrop(
                    editingId,
                    cropData
                );

                alert(
                    t.cropUpdated
                );

            }


            // =================================================
            // CREATE
            // =================================================

            else {

                await createCrop(
                    cropData
                );

                alert(
                    t.cropAdded
                );

            }


            // Reload from MySQL

            await loadCrops();

            resetForm();

        } catch (err) {

            console.error(
                'Crop save error:',
                err
            );

            const message =
                err?.response?.data ||
                t.operationError;

            setError(
                typeof message === 'string'
                    ? message
                    : t.operationError
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // EDIT CROP
    // =====================================================

    const handleEdit = (crop) => {

        setFormData({

            cropName:
                crop.cropName || '',

            variety:
                crop.variety || '',

            season:
                crop.season || 'Kharif',

            landArea:
                crop.landArea ?? '',

            landUnit:
                crop.landUnit || 'Acre',

            sowingDate:
                crop.sowingDate || '',

            expectedHarvestDate:
                crop.expectedHarvestDate || '',

            irrigationType:
                crop.irrigationType ||
                'Rainfed',

            status:
                crop.status ||
                'Planned',

            fieldLocation:
                crop.fieldLocation || '',

            notes:
                crop.notes || ''

        });


        setEditingId(
            crop.id
        );

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    };


    // =====================================================
    // DELETE CROP
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                t.confirmDelete
            );

        if (!confirmed) {
            return;
        }


        try {

            setError('');

            await deleteCrop(id);

            alert(
                t.cropDeleted
            );

            await loadCrops();

        } catch (err) {

            console.error(
                'Delete crop error:',
                err
            );

            setError(
                t.operationError
            );

        }

    };


    // =====================================================
    // TRANSLATE VALUES
    // =====================================================

    const translateSeason = (season) => {

        if (season === 'Kharif')
            return t.kharif;

        if (season === 'Rabi')
            return t.rabi;

        if (season === 'Zaid')
            return t.zaid;

        return season;
    };


    const translateStatus = (status) => {

        if (status === 'Planned')
            return t.planned;

        if (status === 'Growing')
            return t.growing;

        if (status === 'Harvested')
            return t.harvested;

        return status;
    };


    const translateIrrigation = (
        irrigation
    ) => {

        if (irrigation === 'Rainfed')
            return t.rainfed;

        if (irrigation === 'Drip')
            return t.drip;

        if (irrigation === 'Sprinkler')
            return t.sprinkler;

        if (irrigation === 'Canal')
            return t.canal;

        if (irrigation === 'Other')
            return t.other;

        return irrigation;
    };


    const translateUnit = (unit) => {

        if (unit === 'Acre')
            return t.acre;

        if (unit === 'Hectare')
            return t.hectare;

        return unit;
    };


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredCrops =
        crops.filter((crop) => {

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();

            if (!search) {
                return true;
            }

            return (

                crop.cropName
                    ?.toLowerCase()
                    .includes(search)

                ||

                crop.variety
                    ?.toLowerCase()
                    .includes(search)

                ||

                crop.fieldLocation
                    ?.toLowerCase()
                    .includes(search)

                ||

                crop.season
                    ?.toLowerCase()
                    .includes(search)

                ||

                crop.status
                    ?.toLowerCase()
                    .includes(search)

            );

        });


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalCrops =
        crops.length;


    const growingCrops =
        crops.filter(
            crop =>
                crop.status ===
                'Growing'
        ).length;


    const harvestedCrops =
        crops.filter(
            crop =>
                crop.status ===
                'Harvested'
        ).length;


    const totalLand =
        crops.reduce(
            (sum, crop) =>
                sum +
                Number(
                    crop.landArea || 0
                ),
            0
        );


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="crop-management">


            {/* HEADER */}

            <div className="crop-header">

                <div>

                    <h2>
                        {t.title}
                    </h2>

                    <p>
                        {t.subtitle}
                    </p>

                </div>


                <button
                    className="add-crop-button"
                    onClick={() =>
                        setShowForm(
                            !showForm
                        )
                    }
                >

                    {showForm
                        ? t.cancel
                        : t.addCrop}

                </button>

            </div>


            {/* ERROR */}

            {error && (

                <div
                    style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}
                >
                    ⚠️ {error}
                </div>

            )}


            {/* STATISTICS */}

            <div className="crop-stats">

                <div className="crop-stat-card">

                    <div className="crop-stat-icon">
                        🌱
                    </div>

                    <div>

                        <span>
                            {t.totalCrops}
                        </span>

                        <strong>
                            {totalCrops}
                        </strong>

                    </div>

                </div>


                <div className="crop-stat-card">

                    <div className="crop-stat-icon">
                        🌿
                    </div>

                    <div>

                        <span>
                            {t.growingCrops}
                        </span>

                        <strong>
                            {growingCrops}
                        </strong>

                    </div>

                </div>


                <div className="crop-stat-card">

                    <div className="crop-stat-icon">
                        🌾
                    </div>

                    <div>

                        <span>
                            {t.harvestedCrops}
                        </span>

                        <strong>
                            {harvestedCrops}
                        </strong>

                    </div>

                </div>


                <div className="crop-stat-card">

                    <div className="crop-stat-icon">
                        📐
                    </div>

                    <div>

                        <span>
                            {t.totalLand}
                        </span>

                        <strong>
                            {totalLand.toFixed(2)}
                        </strong>

                    </div>

                </div>

            </div>


            {/* FORM */}

            {showForm && (

                <div className="crop-form-card">

                    <h3>

                        {editingId
                            ? t.editCrop
                            : t.addCrop}

                    </h3>


                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="crop-form-grid">


                            {/* CROP NAME */}

                            <div className="crop-form-group">

                                <label>
                                    {t.cropName}
                                </label>

                                <input
                                    type="text"
                                    name="cropName"
                                    value={
                                        formData.cropName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder={
                                        t.cropName
                                    }
                                    required
                                />

                            </div>


                            {/* VARIETY */}

                            <div className="crop-form-group">

                                <label>
                                    {t.variety}
                                </label>

                                <input
                                    type="text"
                                    name="variety"
                                    value={
                                        formData.variety
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder={
                                        t.variety
                                    }
                                />

                            </div>


                            {/* SEASON */}

                            <div className="crop-form-group">

                                <label>
                                    {t.season}
                                </label>

                                <select
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


                            {/* LAND AREA */}

                            <div className="crop-form-group">

                                <label>
                                    {t.landArea}
                                </label>

                                <div className="land-input">

                                    <input
                                        type="number"
                                        name="landArea"
                                        value={
                                            formData.landArea
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                    />

                                    <select
                                        name="landUnit"
                                        value={
                                            formData.landUnit
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="Acre">
                                            {t.acre}
                                        </option>

                                        <option value="Hectare">
                                            {t.hectare}
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* SOWING DATE */}

                            <div className="crop-form-group">

                                <label>
                                    {t.sowingDate}
                                </label>

                                <input
                                    type="date"
                                    name="sowingDate"
                                    value={
                                        formData.sowingDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* HARVEST DATE */}

                            <div className="crop-form-group">

                                <label>
                                    {t.harvestDate}
                                </label>

                                <input
                                    type="date"
                                    name="expectedHarvestDate"
                                    value={
                                        formData.expectedHarvestDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* IRRIGATION */}

                            <div className="crop-form-group">

                                <label>
                                    {t.irrigation}
                                </label>

                                <select
                                    name="irrigationType"
                                    value={
                                        formData.irrigationType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Rainfed">
                                        {t.rainfed}
                                    </option>

                                    <option value="Drip">
                                        {t.drip}
                                    </option>

                                    <option value="Sprinkler">
                                        {t.sprinkler}
                                    </option>

                                    <option value="Canal">
                                        {t.canal}
                                    </option>

                                    <option value="Other">
                                        {t.other}
                                    </option>

                                </select>

                            </div>


                            {/* STATUS */}

                            <div className="crop-form-group">

                                <label>
                                    {t.status}
                                </label>

                                <select
                                    name="status"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Planned">
                                        {t.planned}
                                    </option>

                                    <option value="Growing">
                                        {t.growing}
                                    </option>

                                    <option value="Harvested">
                                        {t.harvested}
                                    </option>

                                </select>

                            </div>


                            {/* LOCATION */}

                            <div className="crop-form-group full-width">

                                <label>
                                    {t.location}
                                </label>

                                <input
                                    type="text"
                                    name="fieldLocation"
                                    value={
                                        formData.fieldLocation
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder={
                                        t.location
                                    }
                                />

                            </div>


                            {/* NOTES */}

                            <div className="crop-form-group full-width">

                                <label>
                                    {t.notes}
                                </label>

                                <textarea
                                    name="notes"
                                    value={
                                        formData.notes
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="3"
                                    placeholder={
                                        t.notes
                                    }
                                />

                            </div>

                        </div>


                        {/* FORM BUTTONS */}

                        <div className="crop-form-actions">

                            <button
                                type="submit"
                                className="save-crop-button"
                                disabled={saving}
                            >

                                {saving
                                    ? t.saving
                                    : editingId
                                        ? t.update
                                        : t.save}

                            </button>


                            <button
                                type="button"
                                className="cancel-crop-button"
                                onClick={
                                    resetForm
                                }
                                disabled={saving}
                            >

                                {t.cancel}

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* SEARCH */}

            <div className="crop-search">

                <input
                    type="text"
                    value={
                        searchTerm
                    }
                    onChange={(e) =>
                        setSearchTerm(
                            e.target.value
                        )
                    }
                    placeholder={
                        t.search
                    }
                />

            </div>


            {/* LOADING */}

            {loading ? (

                <div className="no-crops">

                    🌾

                    <h3>
                        {t.loading}
                    </h3>

                </div>

            ) : (


                /* CROP LIST */

                <div className="crop-list">

                    {filteredCrops.length === 0 ? (

                        <div className="no-crops">

                            🌱

                            <h3>
                                {t.noCrops}
                            </h3>

                        </div>

                    ) : (

                        filteredCrops.map(
                            (crop) => (

                                <div
                                    className="crop-card"
                                    key={
                                        crop.id
                                    }
                                >


                                    {/* HEADER */}

                                    <div className="crop-card-header">

                                        <div>

                                            <h3>

                                                🌾{' '}

                                                {
                                                    crop.cropName
                                                }

                                            </h3>


                                            {crop.variety && (

                                                <span className="crop-variety">

                                                    {
                                                        crop.variety
                                                    }

                                                </span>

                                            )}

                                        </div>


                                        <span
                                            className={
                                                `crop-status ${(
                                                    crop.status ||
                                                    'Planned'
                                                ).toLowerCase()}`
                                            }
                                        >

                                            {
                                                translateStatus(
                                                    crop.status
                                                )
                                            }

                                        </span>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="crop-details">


                                        <div>

                                            <span>
                                                {t.season}
                                            </span>

                                            <strong>
                                                {
                                                    translateSeason(
                                                        crop.season
                                                    )
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                {t.landArea}
                                            </span>

                                            <strong>

                                                {
                                                    crop.landArea ||
                                                    0
                                                }{' '}

                                                {
                                                    translateUnit(
                                                        crop.landUnit
                                                    )
                                                }

                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                {t.irrigation}
                                            </span>

                                            <strong>
                                                {
                                                    translateIrrigation(
                                                        crop.irrigationType
                                                    )
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                {t.field}
                                            </span>

                                            <strong>
                                                {
                                                    crop.fieldLocation ||
                                                    '-'
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                {t.sowingDate}
                                            </span>

                                            <strong>
                                                {
                                                    crop.sowingDate ||
                                                    '-'
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                {t.harvest}
                                            </span>

                                            <strong>
                                                {
                                                    crop.expectedHarvestDate ||
                                                    '-'
                                                }
                                            </strong>

                                        </div>

                                    </div>


                                    {/* NOTES */}

                                    {crop.notes && (

                                        <div className="crop-notes">

                                            📝{' '}

                                            {
                                                crop.notes
                                            }

                                        </div>

                                    )}


                                    {/* ACTIONS */}

                                    <div className="crop-card-actions">

                                        <button
                                            className="edit-crop-button"
                                            onClick={() =>
                                                handleEdit(
                                                    crop
                                                )
                                            }
                                        >

                                            ✏️{' '}
                                            {t.edit}

                                        </button>


                                        <button
                                            className="delete-crop-button"
                                            onClick={() =>
                                                handleDelete(
                                                    crop.id
                                                )
                                            }
                                        >

                                            🗑️{' '}
                                            {t.delete}

                                        </button>

                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

            )}

        </div>

    );

}


export default CropManagement;