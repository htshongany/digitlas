import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';
import { removeConsole } from './vite-plugins/remove-console';
import { inlineCriticalCSS } from './vite-plugins/inline-critical-css';

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
    inlineCriticalCSS(),
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
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        // Supprimer le code mort
        dead_code: true,
        unused: true,
      },
      mangle: {
        // Préserver les noms de classe pour le debugging si nécessaire
        keep_classnames: false,
        keep_fnames: false,
        safari10: true,
      },
      format: {
        // Supprimer les commentaires
        comments: false,
      },
    },
    // Minification CSS avec options avancées
    cssMinify: 'esbuild',
    // Configuration Rollup avec tree shaking et code splitting
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
      },
      output: {
        // Code splitting manuel pour optimiser le cache
        manualChunks: (id) => {
          // Vendor chunk pour les dépendances
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            return 'vendor-libs';
          }
          // Utils chunk pour les hooks
          if (id.includes('/hooks/') || id.includes('/contexts/')) {
            return 'utils';
          }
          // Components chunk
          if (id.includes('/components/')) {
            return 'components';
          }
        },
        // Noms de fichiers avec hash pour le cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Optimisations externes
      external: [],
    },
    // Optimiser la taille des chunks
    chunkSizeWarningLimit: 500, // Plus strict
    // Sourcemaps pour le debugging (désactivé en prod pour la taille)
    sourcemap: false,
    // Optimisations supplémentaires
    reportCompressedSize: true,
    // Préchargement des modules
    modulePreload: {
      polyfill: true,
    },
    // Target moderne pour de meilleures optimisations
    target: 'es2020',
  },
  // Optimisations des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [],
  },
});
