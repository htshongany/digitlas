import React, { Suspense, lazy } from 'react';
import type { SectionId } from '../types';

// Lazy loading des sections non critiques
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const PortfolioSection = lazy(() => import('./sections/PortfolioSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

interface LazySectionProps {
  sectionId: SectionId;
  isActive: boolean;
  sectionRefs: React.MutableRefObject<any>;
}

const SectionFallback = () => (
  <div className="content-section flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-2 border-[#35e3e2] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const LazySection: React.FC<LazySectionProps> = ({ sectionId, isActive, sectionRefs }) => {
  const commonProps = {
    id: sectionId as SectionId,
    isActive,
    ref: (el: HTMLElement | null) => { 
      sectionRefs.current[sectionId as keyof typeof sectionRefs.current] = el; 
    }
  };

  return (
    <Suspense fallback={<SectionFallback />}>
      {sectionId === 'services' && <ServicesSection {...commonProps} />}
      {sectionId === 'portfolio' && <PortfolioSection {...commonProps} />}
      {sectionId === 'contact' && <ContactSection {...commonProps} />}
    </Suspense>
  );
};

export default LazySection;