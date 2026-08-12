import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function LanguageSelector() {

    const {
        language,
        changeLanguage,
        t
    } = useLanguage();


    const handleChange = (e) => {

        changeLanguage(
            e.target.value
        );

    };


    return (

        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >

            <span
                style={{
                    fontSize: '18px'
                }}
            >
                🌐
            </span>


            <select
                value={language}
                onChange={handleChange}
                aria-label={t('language')}
                style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    background: '#ffffff',
                    color: '#1e293b',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none'
                }}
            >

                <option value="en">
                    English
                </option>

                <option value="mr">
                    मराठी
                </option>

                <option value="hi">
                    हिंदी
                </option>

            </select>

        </div>

    );
}

export default LanguageSelector;