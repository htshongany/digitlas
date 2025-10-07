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
        <div 
            className={`flex items-center text-sm font-semibold bg-white/10 rounded-full p-1 ${className}`}
            role="group"
            aria-label="Sélecteur de langue"
        >
            <button
                onClick={() => handleLanguageChange('fr')}
                className={`px-3 py-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35e3e2] ${language === 'fr' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                aria-pressed={language === 'fr'}
                aria-label="Changer la langue en français"
            >
                FR
            </button>
            <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35e3e2] ${language === 'en' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
                aria-pressed={language === 'en'}
                aria-label="Switch language to English"
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
