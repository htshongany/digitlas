import React from 'react';
import type { Section, SectionId } from '../types';

interface SideIndicatorProps {
    sections: Section[];
    activeSection: SectionId;
}

const SideIndicator: React.FC<SideIndicatorProps> = ({ sections, activeSection }) => {
    return (
        <aside role="presentation" className="hidden md:flex fixed top-0 right-0 h-full items-center justify-center w-24 z-30">
            <div className="relative h-1/3 flex items-center">
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-800"></div>
                <ul className="space-y-12">
                    {sections.map(({ id }) => (
                        <li key={id}>
                            <div className={`h-2 w-2 rounded-full transition-all ${
                                activeSection === id ? 'bg-[#1d87af] scale-150' : 'bg-gray-600'
                            }`}></div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default SideIndicator;