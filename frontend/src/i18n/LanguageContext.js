import React, { createContext, useContext, useEffect, useState } from 'react';

import en from './en';
import mr from './mr';
import hi from './hi';

const LanguageContext = createContext();

const translations = {
    en,
    mr,
    hi
};

export const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });


    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);


    const changeLanguage = (newLanguage) => {

        if (translations[newLanguage]) {
            setLanguage(newLanguage);
        }

    };


    const t = (key) => {

        return translations[language]?.[key]
            || translations.en[key]
            || key;

    };


    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage: changeLanguage,
                changeLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};


export const useLanguage = () => {

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            'useLanguage must be used inside LanguageProvider'
        );
    }

    return context;
};


export default LanguageContext;