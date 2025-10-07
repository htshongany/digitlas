import type { Plugin } from 'vite';

export function removeConsole(): Plugin {
  return {
    name: 'remove-console',
    transform(code, id) {
      // Seulement en mode production
      if (process.env.NODE_ENV === 'production') {
        // Supprimer console.log, console.warn, console.error mais garder console.error pour les vraies erreurs
        return {
          code: code
            .replace(/console\.log\([^)]*\);?/g, '')
            .replace(/console\.warn\([^)]*\);?/g, '')
            .replace(/console\.debug\([^)]*\);?/g, ''),
          map: null,
        };
      }
      return null;
    },
  };
}