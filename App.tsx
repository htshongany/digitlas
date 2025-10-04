import React, { useState, useEffect, useRef } from 'react';
import type { SectionId, Section } from './types';
import { useMediaQuery } from './hooks/useMediaQuery';
import { LanguageProvider } from './contexts/LanguageContext';
import { useTranslations } from './hooks/useTranslations';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import SideIndicator from './components/SideIndicator';
import HomeSection from './components/sections/HomeSection';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ContactSection from './components/sections/ContactSection';

const sections: Section[] = [
    { id: 'home' },
    { id: 'services' },
    { id: 'portfolio' },
    { id: 'contact' },
];

const AppContent: React.FC = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [activeSection, setActiveSection] = useState<SectionId>('home');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t, language } = useTranslations();

    useEffect(() => {
        document.documentElement.lang = language;
        document.title = t('meta.title');
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t('meta.description'));
        }
    }, [language, t]);

    const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});

    useEffect(() => {
        if (isDesktop) {
            if(isMobileMenuOpen) setMobileMenuOpen(false);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id as SectionId);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
        );

        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref instanceof Element) {
                observer.observe(ref);
            }
        });

        return () => {
            Object.values(sectionRefs.current).forEach((ref) => {
                if (ref instanceof Element) {
                    observer.unobserve(ref);
                }
            });
        };
    }, [isDesktop, isMobileMenuOpen]);

    useEffect(() => {
        if (!isDesktop) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            const currentIndex = sections.findIndex(s => s.id === activeSection);
            let nextIndex = currentIndex;

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                nextIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                nextIndex = Math.max(currentIndex - 1, 0);
            }

            if (nextIndex !== currentIndex) {
                setActiveSection(sections[nextIndex].id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDesktop, activeSection]);
    
    const handleSetActiveSection = (id: SectionId) => {
        if(isDesktop) {
            setActiveSection(id);
        } else {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 8 * parseFloat(getComputedStyle(document.documentElement).fontSize);
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <>
            <Header
                sections={sections}
                activeSection={activeSection}
                setActiveSection={handleSetActiveSection}
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={() => setMobileMenuOpen(!isMobileMenuOpen)}
                isDesktop={isDesktop}
            />
            <MobileMenu
                isOpen={isMobileMenuOpen}
                sections={sections}
                onClose={() => setMobileMenuOpen(false)}
                onNavigate={handleSetActiveSection}
            />
            <div className="relative w-full h-full flex">
                <main className="w-full md:h-full overflow-y-auto p-6 pt-32 md:p-24 md:pt-28">
                    <div className="w-full max-w-5xl mx-auto">
                        <HomeSection id="home" isActive={activeSection === 'home'} setActiveSection={handleSetActiveSection} ref={el => { sectionRefs.current.home = el; }} />
                        <ServicesSection id="services" isActive={activeSection === 'services'} ref={el => { sectionRefs.current.services = el; }} />
                        <PortfolioSection id="portfolio" isActive={activeSection === 'portfolio'} ref={el => { sectionRefs.current.portfolio = el; }} />
                        <ContactSection id="contact" isActive={activeSection === 'contact'} ref={el => { sectionRefs.current.contact = el; }} />
                    </div>
                </main>
            </div>
            {isDesktop && <SideIndicator sections={sections} activeSection={activeSection} />}
        </>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
};

export default App;
