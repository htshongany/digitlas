import { useEffect } from 'react';
import type { SectionId } from '../types';

export const useAnchorNavigation = (
  setActiveSection: (id: SectionId) => void,
  isDesktop: boolean
) => {
  useEffect(() => {
    // Fonction pour gérer la navigation par ancre
    const handleAnchorNavigation = () => {
      const hash = window.location.hash.replace('#', '') as SectionId;
      const validSections: SectionId[] = ['home', 'services', 'portfolio', 'contact'];
      
      if (hash && validSections.includes(hash)) {
        // Sur desktop, changer la section active
        if (isDesktop) {
          setActiveSection(hash);
        } else {
          // Sur mobile, scroller vers la section
          const element = document.getElementById(hash);
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
      }
    };

    // Gérer l'ancre au chargement de la page
    handleAnchorNavigation();

    // Écouter les changements d'ancre (bouton retour/avant du navigateur)
    const handleHashChange = () => {
      handleAnchorNavigation();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setActiveSection, isDesktop]);

  // Fonction pour mettre à jour l'URL avec l'ancre
  const updateUrlHash = (sectionId: SectionId) => {
    const newHash = sectionId === 'home' ? '' : `#${sectionId}`;
    
    // Mettre à jour l'URL sans recharger la page
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', window.location.pathname + newHash);
    }
  };

  return { updateUrlHash };
};