import type { Plugin } from 'vite';

export function inlineCriticalCSS(): Plugin {
  return {
    name: 'inline-critical-css',
    generateBundle(options, bundle) {
      // En mode production seulement
      if (process.env.NODE_ENV !== 'production') return;

      const htmlFiles = Object.keys(bundle).filter(fileName => fileName.endsWith('.html'));
      const cssFiles = Object.keys(bundle).filter(fileName => fileName.endsWith('.css'));

      htmlFiles.forEach(htmlFileName => {
        const htmlChunk = bundle[htmlFileName];
        if (htmlChunk.type === 'asset' && typeof htmlChunk.source === 'string') {
          let htmlContent = htmlChunk.source;

          cssFiles.forEach(cssFileName => {
            const cssChunk = bundle[cssFileName];
            if (cssChunk.type === 'asset' && typeof cssChunk.source === 'string') {
              // Extraire le CSS critique (premiers 14KB environ)
              const cssContent = cssChunk.source.toString();
              const criticalCSS = cssContent.substring(0, 14000); // ~14KB de CSS critique
              
              // Inliner le CSS critique
              const linkTag = `<link rel="stylesheet" crossorigin href="/${cssFileName}">`;
              const inlineStyle = `<style>${criticalCSS}</style>\n<link rel="preload" href="/${cssFileName}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
              
              htmlContent = htmlContent.replace(linkTag, inlineStyle);
            }
          });

          htmlChunk.source = htmlContent;
        }
      });
    },
  };
}