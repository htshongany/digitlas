import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
    const { language, setLanguage } = useTranslations();

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <div className={`flex items-center text-sm font-semibold bg-white/10 rounded-full p-1 ${className}`}>
            <button
                onClick={() => handleLanguageChange('fr')}
                className={`px-3 py-1 rounded-full transition-colors ${language === 'fr' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                aria-current={language === 'fr'}
            >
                FR
            </button>
            <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                aria-current={language === 'en'}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
