import React from 'react';
import type { Section, SectionId } from '../types';
import { Logo } from './Logo';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    sections: Section[];
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    isDesktop: boolean;
}

const Header: React.FC<HeaderProps> = ({ sections, activeSection, setActiveSection, isMobileMenuOpen, toggleMobileMenu, isDesktop }) => {
    const { t } = useTranslations();

    return (
        <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto">
            <div className="relative bg-gray-800/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg px-4 py-2 flex items-center justify-between">
                <button
                    onClick={() => setActiveSection('home')}
                    className="header-logo-button group flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35e3e2] transition-colors"
                    aria-label={t('header.home_aria')}
                >
                    <Logo className="h-10 w-10" />
                    <span>Digitlas</span>
                </button>
                {isDesktop ? (
                    <div className="flex items-center">
                        <div className="h-6 w-px bg-white/20 mx-2" />
                        <nav aria-label="Navigation principale" className="flex items-center space-x-1">
                            {sections.map(({ id }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveSection(id)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#35e3e2] focus:outline-none whitespace-nowrap ${
                                        activeSection === id ? 'bg-[#1d87af] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                    aria-current={activeSection === id ? 'page' : undefined}
                                >
                                    {t(`nav.${id}`)}
                                </button>
                            ))}
                        </nav>
                        <div className="h-6 w-px bg-white/20 mx-2" />
                        <LanguageSwitcher />
                    </div>
                ) : (
                    <button
                        id="menu-btn"
                        className="p-2 rounded-full hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#35e3e2] focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-controls="mobile-menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-label={isMobileMenuOpen ? t('header.close_menu_aria') : t('header.open_menu_aria')}
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
