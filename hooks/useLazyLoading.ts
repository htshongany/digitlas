import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadingOptions {
    rootMargin?: string;
    threshold?: number;
}

export const useLazyLoading = (options: UseLazyLoadingOptions = {}) => {
    const { rootMargin = '100px', threshold = 0.1 } = options;
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [rootMargin, threshold]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return {
        elementRef,
        isInView,
        isLoaded,
        hasError,
        handleLoad,
        handleError
    };
};