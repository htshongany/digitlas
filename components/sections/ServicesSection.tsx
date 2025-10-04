import React, { forwardRef } from 'react';
import type { SectionProps } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

const SiteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12.5 8 15l-4 4"/><path d="m14 12.5 7.5 7.5"/><path d="m14 12.5-1.5 1.5"/><path d="M8.5 7 6 9.5l-3 3"/><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/></svg>
);

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);

const SeoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);


const ServicesSection = forwardRef<HTMLDivElement, SectionProps>(({ id, isActive }, ref) => {
    const { t, ta } = useTranslations();
    const serviceCards = ta('services.cards');

    const services = [
        { icon: <SiteIcon />, ...serviceCards[0] },
        { icon: <AiIcon />, ...serviceCards[1] },
        { icon: <SeoIcon />, ...serviceCards[2] },
    ];


    return (
        <section
            id={id}
            ref={ref}
            role="region"
            aria-labelledby="services-titre"
            className={`content-section ${isActive ? 'active' : ''}`}
        >
            <div className="text-center">
                <h2 id="services-titre" className="text-5xl md:text-6xl font-extrabold mb-4">
                    {t('services.heading')}
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-20">
                    {t('services.subheading')}
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 text-center">
                {services.map((service) => (
                    <div key={service.title} className="flex flex-col items-center">
                        <div className="text-[#35e3e2] mb-4">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 leading-tight">{service.title}</h3>
                        <p className="text-gray-300">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
});

ServicesSection.displayName = 'ServicesSection';
export default ServicesSection;
