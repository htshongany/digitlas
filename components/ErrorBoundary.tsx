import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });

    // Ici tu peux envoyer l'erreur à un service de monitoring
    // comme Sentry, LogRocket, etc.
  }

  // Fonction pour obtenir les traductions depuis localStorage
  private getTranslations() {
    try {
      const language = localStorage.getItem('language') || 'fr';
      const translations = {
        fr: {
          heading: 'Oups ! Une erreur s\'est produite',
          message: 'Nous sommes désolés, quelque chose s\'est mal passé. Notre équipe a été notifiée et travaille sur le problème.',
          reload_button: '🔄 Recharger la page',
          home_button: '🏠 Retour à l\'accueil',
          details_title: 'Détails de l\'erreur (développement)'
        },
        en: {
          heading: 'Oops! An error occurred',
          message: 'We\'re sorry, something went wrong. Our team has been notified and is working on the issue.',
          reload_button: '🔄 Reload page',
          home_button: '🏠 Back to home',
          details_title: 'Error details (development)'
        }
      };
      return translations[language as keyof typeof translations] || translations.fr;
    } catch {
      // Fallback en français si erreur
      return {
        heading: 'Oups ! Une erreur s\'est produite',
        message: 'Nous sommes désolés, quelque chose s\'est mal passé. Notre équipe a été notifiée et travaille sur le problème.',
        reload_button: '🔄 Recharger la page',
        home_button: '🏠 Retour à l\'accueil',
        details_title: 'Détails de l\'erreur (développement)'
      };
    }
  }

  render() {
    if (this.state.hasError) {
      const t = this.getTranslations();
      
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
          <div className="text-center max-w-2xl">
            <div className="text-8xl font-black mb-6 bg-gradient-to-r from-[#35e3e2] to-[#0f5f7a] bg-clip-text text-transparent">
              500
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {t.heading}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {t.message}
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#0f5f7a] hover:bg-[#0d4d63] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                {t.reload_button}
              </button>
              <a
                href="/"
                className="border-2 border-[#35e3e2] text-[#35e3e2] hover:bg-[#35e3e2] hover:text-gray-900 font-bold py-3 px-6 rounded-full transition-all duration-300 inline-block"
              >
                {t.home_button}
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left bg-gray-800 p-4 rounded-lg">
                <summary className="cursor-pointer text-red-400 font-semibold mb-2">
                  {t.details_title}
                </summary>
                <pre className="text-sm text-gray-300 overflow-auto">
                  {this.state.error?.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;