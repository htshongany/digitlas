export type SectionId = 'home' | 'services' | 'portfolio' | 'contact';

export type Language = 'fr' | 'en';

export interface Section {
    id: SectionId;
}

export interface SectionProps {
    id: SectionId;
    isActive: boolean;
    setActiveSection?: (id: SectionId) => void;
}
