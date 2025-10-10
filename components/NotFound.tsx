import { useEffect, useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);
  const { t, language } = useTranslations();

  // Fallback translations si les traductions ne sont pas chargées
  const fallbackTranslations = {
    fr: {
      heading: 'Page non trouvée',
      message: 'Désolé, la page que vous recherchez n\'existe pas ou a été déplacée. Retournez à l\'accueil pour découvrir nos services.',
      home_button: '🏠 Retour à l\'accueil',
      contact_button: '📞 Nous contacter',
      countdown: 'Redirection automatique dans {seconds} secondes...'
    },
    en: {
      heading: 'Page not found',
      message: 'Sorry, the page you are looking for does not exist or has been moved. Return to the homepage to discover our services.',
      home_button: '🏠 Back to home',
      contact_button: '📞 Contact us',
      countdown: 'Automatic redirect in {seconds} seconds...'
    }
  };

  const getTranslation = (key: string) => {
    const translation = t(`errors.404.${key}`);
    // Si la traduction retourne la clé (pas trouvée), utiliser le fallback
    if (translation.startsWith('errors.404.')) {
      const fallback = fallbackTranslations[language as keyof typeof fallbackTranslations] || fallbackTranslations.fr;
      return fallback[key as keyof typeof fallback] || translation;
    }
    return translation;
  };

  useEffect(() => {
    // Analytics pour tracker les 404 côté React
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'page_view', {
        page_title: `404 - ${t('errors.404.title')} (React)`,
        page_location: window.location.href
      });
    }

    // Countdown et redirection
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [t]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-2xl animate-fadeIn">
        <div className="text-8xl font-black mb-6 bg-gradient-to-r from-[#35e3e2] to-[#0f5f7a] bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-4xl font-bold mb-4">
          {getTranslation('heading')}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          {getTranslation('message')}
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-[#0f5f7a] hover:bg-[#0d4d63] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
          >
            {getTranslation('home_button')}
          </button>
          <a
            href="/#contact"
            className="border-2 border-[#35e3e2] text-[#35e3e2] hover:bg-[#35e3e2] hover:text-gray-900 font-bold py-3 px-6 rounded-full transition-all duration-300 inline-block"
          >
            {getTranslation('contact_button')}
          </a>
        </div>
        
        <div className="mt-8 text-gray-400">
          <p>{getTranslation('countdown').replace('{seconds}', countdown.toString())}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;