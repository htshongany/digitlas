import React, { forwardRef } from 'react';
import type { SectionProps } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';
import LazyImage from '../LazyImage';

const PortfolioSection = forwardRef<HTMLDivElement, SectionProps>(({ id, isActive }, ref) => {
    const { t, ta } = useTranslations();
    const projects = ta('portfolio.projects');

    return (
        <section
            id={id}
            ref={ref}
            role="region"
            aria-labelledby="portfolio-titre"
            className={`content-section ${isActive ? 'active' : ''}`}
        >
            <span className="font-semibold text-[#35e3e2]">{t('portfolio.subheading')}</span>
            <h2 id="portfolio-titre" className="text-5xl md:text-6xl font-extrabold my-4">
                {t('portfolio.heading')}
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                    <figure key={project.title || index} className="group relative overflow-hidden rounded-lg shadow-lg">
                        <LazyImage 
                            src={project.image} 
                            alt={project.alt} 
                            className="aspect-video w-full h-full object-cover bg-gray-800 transition-transform duration-300 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-white text-lg font-bold">{project.title}</h3>
                            <p className="text-[#35e3e2] text-sm">{project.category}</p>
                        </div>
                    </figure>
                ))}
            </div>
        </section>
    );
});

PortfolioSection.displayName = 'PortfolioSection';
export default PortfolioSection;