import React, { useEffect, useRef } from 'react';
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
    const menuRef = useRef<HTMLDivElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
        e.preventDefault();
        onNavigate(id);
        onClose();
    };

    // Gestion des touches clavier
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Focus sur le premier lien quand le menu s'ouvre
        if (firstLinkRef.current) {
            firstLinkRef.current.focus();
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Ne pas rendre le menu si il n'est pas ouvert pour éviter les problèmes d'accessibilité
    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden fixed inset-0 bg-gray-900 z-40 transition-opacity duration-300 ease-in-out opacity-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
        >
            <div className="flex flex-col items-center justify-center h-full">
                <h2 id="menu-title" className="sr-only">
                    Menu de navigation
                </h2>
                <nav aria-label="Navigation mobile" className="flex flex-col items-center justify-center space-y-8">
                    {sections.map(({ id }, index) => (
                        <a
                            key={id}
                            ref={index === 0 ? firstLinkRef : null}
                            href={`#${id}`}
                            onClick={(e) => handleLinkClick(e, id)}
                            className="mobile-nav-link text-3xl font-bold text-gray-400 hover:text-white focus-visible:text-white focus:outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#35e3e2] rounded-lg px-4 py-2"
                            style={{
                                transitionDelay: `${index * 100 + 100}ms`,
                                opacity: 1,
                                transform: 'translateY(0)'
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
