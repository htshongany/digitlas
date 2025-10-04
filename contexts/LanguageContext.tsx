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
                // Use relative paths for fetching translations to ensure compatibility with GitHub Pages deployment.
                const [fr, en] = await Promise.all([
                    fetch('./locales/fr.json').then(res => res.json()),
                    fetch('./locales/en.json').then(res => res.json())
                ]);
                setTranslations({ fr, en });
            } catch (error) {
                console.error("Failed to load translations:", error);
            }
        };

        fetchTranslations();
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    // Render children only when translations are loaded to avoid flickering or errors
    if (!translations) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};