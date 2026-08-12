import React, { useState } from 'react';
import './ReceiptUpload.css';
import { uploadReceipt } from '../services/expenseService';
import { useLanguage } from '../i18n/LanguageContext';


function ReceiptUpload({ onExpenseAdded }) {

    const { language } = useLanguage();

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [ocrResult, setOcrResult] = useState(null);


    // =====================================================
    // TRANSLATIONS
    // =====================================================

    const translations = {

        en: {

            uploadReceipt: 'Upload Receipt',

            description:
                "Upload a receipt image and we'll automatically extract expense information using OCR.",

            chooseReceipt:
                '📁 Choose Receipt Image',

            processing:
                '🔍 Processing OCR...',

            uploadProcess:
                '🔍 Upload & Process Receipt',

            ocrResult:
                'OCR Result',

            processed:
                'The receipt has been processed and the expense has been saved.',

            merchant:
                'Merchant',

            amount:
                'Amount',

            descriptionLabel:
                'Description',

            category:
                'Category',

            crop:
                'Crop',

            season:
                'Season',

            notAvailable:
                'N/A',

            generalFarm:
                'General Farm',

            success:
                'Receipt processed successfully!',

            selectImage:
                'Please select an image file.',

            selectReceipt:
                'Please select a receipt image.',

            loginAgain:
                'Please log in again.',

            invalidSession:
                'User session is invalid. Please login again.',

            userNotFound:
                'User information not found. Please login again.',

            failed:
                'Failed to process receipt. Please try again.',

            tips:
                '💡 Tips for best results:',

            tip1:
                'Use clear, well-lit images',

            tip2:
                'Ensure text is readable and not blurry',

            tip3:
                'Include the full receipt in the image',

            tip4:
                'Supported formats: JPG, PNG, GIF'

        },


        mr: {

            uploadReceipt:
                'पावती अपलोड करा',

            description:
                'पावतीचा फोटो अपलोड करा आणि OCR च्या मदतीने खर्चाची माहिती आपोआप काढा.',

            chooseReceipt:
                '📁 पावतीचा फोटो निवडा',

            processing:
                '🔍 OCR प्रक्रिया सुरू आहे...',

            uploadProcess:
                '🔍 पावती अपलोड करा आणि प्रक्रिया करा',

            ocrResult:
                'OCR निकाल',

            processed:
                'पावतीवर प्रक्रिया झाली आणि खर्च जतन करण्यात आला.',

            merchant:
                'विक्रेता',

            amount:
                'रक्कम',

            descriptionLabel:
                'वर्णन',

            category:
                'श्रेणी',

            crop:
                'पीक',

            season:
                'हंगाम',

            notAvailable:
                'उपलब्ध नाही',

            generalFarm:
                'सामान्य शेती',

            success:
                'पावती यशस्वीरित्या प्रक्रिया झाली!',

            selectImage:
                'कृपया फोटो फाइल निवडा.',

            selectReceipt:
                'कृपया पावतीचा फोटो निवडा.',

            loginAgain:
                'कृपया पुन्हा लॉगिन करा.',

            invalidSession:
                'वापरकर्ता सत्र चुकीचे आहे. कृपया पुन्हा लॉगिन करा.',

            userNotFound:
                'वापरकर्त्याची माहिती सापडली नाही. कृपया पुन्हा लॉगिन करा.',

            failed:
                'पावती प्रक्रिया करता आली नाही. कृपया पुन्हा प्रयत्न करा.',

            tips:
                '💡 चांगल्या निकालासाठी सूचना:',

            tip1:
                'स्वच्छ आणि पुरेशा प्रकाशातील फोटो वापरा',

            tip2:
                'फोटोतील मजकूर स्पष्ट आणि न धूसर असावा',

            tip3:
                'पूर्ण पावती फोटोमध्ये दिसली पाहिजे',

            tip4:
                'समर्थित फॉरमॅट: JPG, PNG, GIF'

        },


        hi: {

            uploadReceipt:
                'रसीद अपलोड करें',

            description:
                'रसीद की फोटो अपलोड करें और OCR की मदद से खर्च की जानकारी अपने आप निकालें।',

            chooseReceipt:
                '📁 रसीद की फोटो चुनें',

            processing:
                '🔍 OCR प्रक्रिया चल रही है...',

            uploadProcess:
                '🔍 रसीद अपलोड करें और प्रक्रिया करें',

            ocrResult:
                'OCR परिणाम',

            processed:
                'रसीद की प्रक्रिया पूरी हो गई और खर्च सहेजा गया।',

            merchant:
                'विक्रेता',

            amount:
                'राशि',

            descriptionLabel:
                'विवरण',

            category:
                'श्रेणी',

            crop:
                'फसल',

            season:
                'मौसम',

            notAvailable:
                'उपलब्ध नहीं',

            generalFarm:
                'सामान्य खेती',

            success:
                'रसीद सफलतापूर्वक प्रोसेस हुई!',

            selectImage:
                'कृपया एक इमेज फाइल चुनें।',

            selectReceipt:
                'कृपया रसीद की फोटो चुनें।',

            loginAgain:
                'कृपया फिर से लॉगिन करें।',

            invalidSession:
                'यूजर सेशन गलत है। कृपया फिर से लॉगिन करें।',

            userNotFound:
                'यूजर की जानकारी नहीं मिली। कृपया फिर से लॉगिन करें।',

            failed:
                'रसीद प्रोसेस नहीं हो सकी। कृपया फिर प्रयास करें।',

            tips:
                '💡 बेहतर परिणाम के लिए सुझाव:',

            tip1:
                'साफ और अच्छी रोशनी वाली फोटो का उपयोग करें',

            tip2:
                'फोटो का टेक्स्ट साफ और बिना धुंधला होना चाहिए',

            tip3:
                'पूरी रसीद फोटो में दिखाई देनी चाहिए',

            tip4:
                'समर्थित फॉर्मेट: JPG, PNG, GIF'

        }

    };


    const t =
        translations[language] ||
        translations.en;


    // =====================================================
    // FILE CHANGE
    // =====================================================

    const handleFileChange = (e) => {

        const selectedFile =
            e.target.files?.[0];


        if (!selectedFile) {
            return;
        }


        // Check image

        if (
            !selectedFile.type.startsWith(
                'image/'
            )
        ) {

            setFile(null);

            setPreview(null);

            setOcrResult(null);

            setError(
                t.selectImage
            );

            setSuccess('');

            return;
        }


        // Set file

        setFile(
            selectedFile
        );

        setError('');

        setSuccess('');

        setOcrResult(null);


        // Preview

        const reader =
            new FileReader();


        reader.onloadend = () => {

            setPreview(
                reader.result
            );

        };


        reader.readAsDataURL(
            selectedFile
        );

    };


    // =====================================================
    // SUBMIT / OCR
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!file) {

            setError(
                t.selectReceipt
            );

            return;

        }


        // Get logged-in user

        const userDataString =
            localStorage.getItem(
                'user'
            );


        if (!userDataString) {

            setError(
                t.loginAgain
            );

            return;

        }


        let userData;


        try {

            userData =
                JSON.parse(
                    userDataString
                );

        } catch (err) {

            console.error(
                'Invalid user data:',
                err
            );

            setError(
                t.invalidSession
            );

            return;

        }


        if (!userData?.id) {

            setError(
                t.userNotFound
            );

            return;

        }


        setLoading(true);

        setError('');

        setSuccess('');

        setOcrResult(null);


        try {

            // ==========================================
            // SEND RECEIPT TO BACKEND OCR
            // ==========================================

            const result =
                await uploadReceipt(
                    file,
                    userData.id
                );


            console.log(
                'OCR Response:',
                result
            );


            // ==========================================
            // SAVE OCR RESULT
            // ==========================================

            setOcrResult(
                result
            );


            setSuccess(
                t.success
            );


            // ==========================================
            // CLEAR FILE
            // ==========================================

            setFile(null);

            setPreview(null);


            // ==========================================
            // REFRESH EXPENSE LIST
            // ==========================================

            if (
                typeof onExpenseAdded ===
                'function'
            ) {

                await onExpenseAdded();

            }


            // Reset file input

            if (
                e.target &&
                typeof e.target.reset ===
                'function'
            ) {

                e.target.reset();

            }


        } catch (error) {

            console.error(
                'Error uploading receipt:',
                error
            );


            const errorMessage =
                error?.response?.data?.error ||

                error?.response?.data?.message ||

                (
                    typeof error?.response?.data ===
                    'string'
                        ? error.response.data
                        : null
                ) ||

                error?.message ||

                t.failed;


            setError(
                errorMessage
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // FORMAT AMOUNT
    // =====================================================

    const formatAmount = (amount) => {

        if (
            amount === null ||
            amount === undefined ||
            amount === ''
        ) {

            return t.notAvailable;

        }


        return `₹${Number(amount).toLocaleString(
            'en-IN',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="receipt-upload-container">


            {/* TITLE */}

            <h2>

                📷 {t.uploadReceipt}

            </h2>


            {/* DESCRIPTION */}

            <p className="upload-description">

                {t.description}

            </p>


            <form
                onSubmit={handleSubmit}
                className="upload-form"
            >


                {/* ERROR */}

                {error && (

                    <div className="error-message">

                        ⚠️ {error}

                    </div>

                )}


                {/* SUCCESS */}

                {success && (

                    <div className="success-message">

                        ✅ {success}

                    </div>

                )}


                {/* FILE INPUT */}

                <div className="file-input-wrapper">

                    <input
                        type="file"
                        id="receipt-file"
                        accept="image/*"
                        onChange={
                            handleFileChange
                        }
                        className="file-input"
                    />


                    <label
                        htmlFor="receipt-file"
                        className="file-label"
                    >

                        {file
                            ? file.name
                            : t.chooseReceipt}

                    </label>

                </div>


                {/* IMAGE PREVIEW */}

                {preview && (

                    <div className="preview-container">

                        <img
                            src={preview}
                            alt={
                                t.uploadReceipt
                            }
                            className="preview-image"
                        />

                    </div>

                )}


                {/* UPLOAD BUTTON */}

                <button
                    type="submit"
                    className="btn-upload"
                    disabled={
                        loading ||
                        !file
                    }
                >

                    {loading
                        ? t.processing
                        : t.uploadProcess}

                </button>


            </form>


            {/* =================================================
                OCR RESULT
            ================================================= */}

            {ocrResult && (

                <div className="ocr-result-card">


                    <h3>

                        ✅ {t.ocrResult}

                    </h3>


                    <p className="ocr-result-info">

                        {t.processed}

                    </p>


                    <div className="ocr-result-grid">


                        {/* MERCHANT */}

                        <div className="ocr-result-item">

                            <span>
                                {t.merchant}
                            </span>

                            <strong>

                                {
                                    ocrResult.merchantName ||
                                    t.notAvailable
                                }

                            </strong>

                        </div>


                        {/* AMOUNT */}

                        <div className="ocr-result-item">

                            <span>
                                {t.amount}
                            </span>

                            <strong>

                                {
                                    formatAmount(
                                        ocrResult.amount
                                    )
                                }

                            </strong>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="ocr-result-item">

                            <span>
                                {t.descriptionLabel}
                            </span>

                            <strong>

                                {
                                    ocrResult.description ||
                                    t.notAvailable
                                }

                            </strong>

                        </div>


                        {/* CATEGORY */}

                        <div className="ocr-result-item">

                            <span>
                                {t.category}
                            </span>

                            <strong>

                                {
                                    ocrResult.category ||
                                    t.notAvailable
                                }

                            </strong>

                        </div>


                        {/* CROP */}

                        <div className="ocr-result-item">

                            <span>
                                {t.crop}
                            </span>

                            <strong>

                                {
                                    ocrResult.cropType ||
                                    t.generalFarm
                                }

                            </strong>

                        </div>


                        {/* SEASON */}

                        <div className="ocr-result-item">

                            <span>
                                {t.season}
                            </span>

                            <strong>

                                {
                                    ocrResult.season ||
                                    t.notAvailable
                                }

                            </strong>

                        </div>


                    </div>

                </div>

            )}


            {/* =================================================
                TIPS
            ================================================= */}

            <div className="upload-tips">


                <h3>

                    {t.tips}

                </h3>


                <ul>

                    <li>
                        {t.tip1}
                    </li>

                    <li>
                        {t.tip2}
                    </li>

                    <li>
                        {t.tip3}
                    </li>

                    <li>
                        {t.tip4}
                    </li>

                </ul>


            </div>

        </div>

    );

}


export default ReceiptUpload;