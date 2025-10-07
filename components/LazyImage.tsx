import React from 'react';
import { useLazyLoading } from '../hooks/useLazyLoading';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
    src, 
    alt, 
    className = '', 
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmI3Mjg0IiBmb250LXNpemU9IjE0Ij5DaGFyZ2VtZW50Li4uPC90ZXh0Pjwvc3ZnPg==' 
}) => {
    const { elementRef, isInView, isLoaded, hasError, handleLoad, handleError } = useLazyLoading();

    return (
        <div className="relative overflow-hidden">
            <img
                ref={elementRef as React.RefObject<HTMLImageElement>}
                src={isInView ? src : placeholder}
                alt={alt}
                className={`transition-all duration-500 ease-out ${
                    isLoaded && !hasError 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-60 scale-105'
                } ${className}`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
            />
            {!isLoaded && isInView && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#35e3e2] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default LazyImage;