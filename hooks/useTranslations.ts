import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const get = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

export const useTranslations = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslations must be used within a LanguageProvider');
    }
    const { language, setLanguage, translations } = context;

    const t = (key: string): string => {
        if (!translations) {
            return key;
        }
        const translation = get(translations[language], key);
        if (typeof translation === 'string') {
            return translation;
        }
        console.warn(`Translation key not found: ${key}`);
        return key;
    };
    
    const ta = (key: string): any[] => {
        if (!translations) {
            return [];
        }
        const translation = get(translations[language], key);
        if (Array.isArray(translation)) {
            return translation;
        }
        console.warn(`Translation array not found for key: ${key}`);
        return [];
    };

    return { t, ta, language, setLanguage };
};