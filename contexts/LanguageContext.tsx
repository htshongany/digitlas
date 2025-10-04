import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { Language } from '../types';

interface Translations {
    [key: string]: any;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    translations: Record<Language, Translations> | null;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
        return savedLanguage;
    }
    const browserLanguage = navigator.language.split(/[-_]/)[0];
    return browserLanguage === 'fr' ? 'fr' : 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(getInitialLanguage);
    const [translations, setTranslations] = useState<Record<Language, Translations> | null>(null);

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                // Fetch from public folder - these files will be available in production
                const [fr, en] = await Promise.all([
                    fetch('/locales/fr.json').then(res => {
                        if (!res.ok) throw new Error(`Failed to fetch fr.json: ${res.status}`);
                        return res.json();
                    }),
                    fetch('/locales/en.json').then(res => {
                        if (!res.ok) throw new Error(`Failed to fetch en.json: ${res.status}`);
                        return res.json();
                    })
                ]);
                setTranslations({ fr, en });
            } catch (error) {
                console.error("Failed to load translations:", error);
                // Fallback: set empty translations to prevent infinite loading
                setTranslations({ fr: {}, en: {} });
            }
        };

        fetchTranslations();
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    // Show loading state while translations are being fetched
    if (!translations) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};