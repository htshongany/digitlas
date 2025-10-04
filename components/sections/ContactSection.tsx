import React, { forwardRef } from 'react';
import type { SectionProps } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M16.75 13.96c-.25-.12-1.47-.72-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.38.1-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42-.15 0-.31-.02-.48-.02s-.43.06-.66.31c-.22.25-.86.84-.86 2.04s.88 2.37 1 2.54c.12.17 1.74 2.65 4.22 3.72.59.26 1.05.41 1.41.52.59.18 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.05-.12-.2-.18-.44-.3zM12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18.2a8.2 8.2 0 1 1 8.2-8.2 8.21 8.21 0 0 1-8.2 8.2z"></path>
    </svg>
);


const ContactSection = forwardRef<HTMLDivElement, SectionProps>(({ id, isActive }, ref) => {
    const { t } = useTranslations();
    return (
        <section
            id={id}
            ref={ref}
            role="region"
            aria-labelledby="contact-titre"
            className={`content-section ${isActive ? 'active' : ''}`}
        >
            <span className="font-semibold text-[#35e3e2]">{t('contact.subheading')}</span>
            <h2 id="contact-titre" className="text-5xl md:text-6xl font-extrabold my-4">
                {t('contact.heading')}
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                {t('contact.description')}
            </p>
            <a
                href="https://wa.me/243893082000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-4 text-2xl font-semibold hover:text-[#35e3e2] transition-colors focus-visible:ring-2 focus-visible:ring-[#35e3e2] focus:outline-none rounded-md"
                aria-label={t('contact.cta_aria')}
            >
                <WhatsAppIcon />
                <span>+243 893 082 000</span>
            </a>
        </section>
    );
});

ContactSection.displayName = 'ContactSection';
export default ContactSection;
