import React from 'react';
import type { Section, SectionId } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
    isOpen: boolean;
    sections: Section[];
    onClose: () => void;
    onNavigate: (id: SectionId) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, sections, onClose, onNavigate }) => {
    const { t } = useTranslations();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
        e.preventDefault();
        onNavigate(id);
        onClose();
    };

    return (
        <div
            id="mobile-menu"
            className={`md:hidden fixed inset-0 bg-gray-900 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
            aria-hidden={!isOpen}
        >
            <div className="flex flex-col items-center justify-center h-full">
                <nav className="flex flex-col items-center justify-center space-y-8">
                    {sections.map(({ id }, index) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={(e) => handleLinkClick(e, id)}
                            className="mobile-nav-link text-3xl font-bold text-gray-400 hover:text-white focus-visible:text-white focus:outline-none transition-all duration-300"
                            style={{
                                transitionDelay: `${isOpen ? index * 100 + 100 : 0}ms`,
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'translateY(0)' : 'translateY(10px)'
                            }}
                        >
                            {t(`nav.${id}`)}
                        </a>
                    ))}
                </nav>
                <div className="absolute bottom-12">
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
