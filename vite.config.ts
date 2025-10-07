import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';
import { removeConsole } from './vite-plugins/remove-console';

export default defineConfig({
  base: '/', 
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(), 
    tailwindcss(), 
    removeConsole(),
    // Compression Gzip
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Compresser les fichiers > 1KB
      deleteOriginFile: false,
    }),
    // Compression Brotli (meilleure que Gzip)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.'),
    }
  },
  build: {
    // Minification avec Terser pour une meilleure compression
    minify: 'terser',
    terserOptions: {
      compress: {
        // Supprimer les console.log en production
        drop_console: true,
        drop_debugger: true,
        // Optimisations supplémentaires
        pure_funcs: ['console.log', 'console.warn'],
        passes: 2,
      },
      mangle: {
        // Préserver les noms de classe pour le debugging si nécessaire
        keep_classnames: false,
        keep_fnames: false,
      },
      format: {
        // Supprimer les commentaires
        comments: false,
      },
    },
    // Minification CSS
    cssMinify: true,
    // Configuration Rollup pour le code splitting
    rollupOptions: {
      output: {
        // Code splitting manuel pour optimiser le cache
        manualChunks: {
          // Séparer les dépendances vendor
          vendor: ['react', 'react-dom'],
          // Séparer les hooks et utilitaires
          utils: ['./hooks/useMediaQuery', './hooks/useTranslations', './hooks/useLazyLoading'],
        },
        // Noms de fichiers avec hash pour le cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimiser la taille des chunks
    chunkSizeWarningLimit: 1000,
    // Sourcemaps pour le debugging (désactivé en prod pour la taille)
    sourcemap: false,
    // Optimisations supplémentaires
    reportCompressedSize: true,
    // Préchargement des modules
    modulePreload: {
      polyfill: true,
    },
  },
  // Optimisations des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [],
  },
});
