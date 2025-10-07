import React, { forwardRef } from 'react';
import type { SectionProps } from '../../types';
import { Logo } from '../Logo';
import { useTranslations } from '../../hooks/useTranslations';

const HomeSection = forwardRef<HTMLDivElement, SectionProps>(({ id, isActive, setActiveSection }, ref) => {
    const { t } = useTranslations();
    return (
        <section
            id={id}
            ref={ref}
            role="region"
            aria-labelledby="accueil-titre"
            className={`content-section min-h-[calc(100vh-8rem)] ${isActive ? 'active' : ''}`}
        >
            <div className="flex flex-col items-start self-start gap-2 mb-8 animate-intro-logo">
                <Logo className="h-14 text-[#35e3e2]" />
                <span className="font-semibold text-[#35e3e2] text-xl">{t('home.subheading')}</span>
            </div>
            <h1 id="accueil-titre" className="text-5xl md:text-7xl font-extrabold my-4 animate-intro-heading">
                {t('home.heading')}
            </h1>
            <button
                onClick={() => setActiveSection && setActiveSection('contact')}
                className="mt-8 text-lg font-bold text-white bg-[#0f5f7a] hover:bg-[#0d4d63] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#35e3e2]/50 rounded-full px-8 py-3 self-start animate-intro-cta"
                aria-label={t('home.cta_aria')}
            >
                {t('home.cta')}
            </button>
        </section>
    );
});

HomeSection.displayName = 'HomeSection';
export default HomeSection;