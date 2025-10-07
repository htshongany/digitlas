# 📋 TODO Liste Performance - Digitlas

## 🔥 PRIORITÉ HAUTE - Impact Immédiat

### 📸 Optimisation Images
- [ ] **Convertir les images PNG en WebP**
  - `og-image.png` (162KB) → WebP (~50KB)
  - `project-0.png` (175KB) → WebP (~55KB)
  - `project-1.png` (188KB) → WebP (~60KB)
  - `project-2.png` (130KB) → WebP (~40KB)
  - `project-3.png` (311KB) → WebP (~95KB)

- [x] **Implémenter lazy loading pour les images** ✅
  - ✅ Créé composant LazyImage avec Intersection Observer
  - ✅ Hook useLazyLoading réutilisable
  - ✅ Animation de chargement avec spinner
  - ✅ Placeholder SVG optimisé
  - ✅ Gestion d'erreur intégrée

- [ ] **Créer des images responsive**
  - Générer plusieurs tailles (320w, 640w, 1024w)
  - Ajouter `srcset` et `sizes`

### ⚙️ Configuration Vite Production
- [x] **Configurer la minification** ✅
  - ✅ Terser avec options avancées (passes: 2)
  - ✅ Suppression console.log/warn/debug en production
  - ✅ Minification CSS activée
  - ✅ Compression Gzip et Brotli
  - ✅ Code splitting (vendor/utils séparés)

- [x] **Optimiser le bundling** ✅
  - ✅ Code splitting vendor/utils/app
  - ✅ Tree shaking automatique
  - ✅ Compression Gzip (-71%) et Brotli (-75%)

- [x] **Supprimer les logs de debug** ✅
  - ✅ Plugin personnalisé remove-console
  - ✅ Suppression automatique en production
  - ✅ Conservation des console.error critiques

---

## ⚡ PRIORITÉ MOYENNE - Optimisations Avancées

### 🎨 CSS & Animations
- [ ] **Optimiser les animations CSS**
  - Utiliser `transform` au lieu de propriétés layout
  - Ajouter `will-change` pour les éléments animés
  - Réduire la complexité des animations

- [ ] **Purger le CSS inutilisé**
  - Configurer PurgeCSS avec Tailwind
  - Supprimer les classes non utilisées

### 🧩 Code Splitting
- [ ] **Lazy loading des composants**
  - `React.lazy()` pour les sections
  - Dynamic imports pour les gros composants
  - Suspense boundaries

- [ ] **Optimiser les hooks**
  - Mémoriser `useMediaQuery` avec useMemo
  - Debounce les resize listeners
  - Cleanup des event listeners

### 📦 Bundle Optimization
- [ ] **Analyser la taille du bundle**
  - Installer `vite-bundle-analyzer`
  - Identifier les dépendances lourdes
  - Remplacer par des alternatives plus légères

---

## 🔧 PRIORITÉ FAIBLE - Améliorations Long Terme

### 🌐 SEO & Métadonnées
- [ ] **Pré-rendu HTML**
  - Installer `vite-plugin-prerender`
  - Générer HTML statique avec contenu
  - Améliorer l'indexation

- [ ] **Schema.org**
  - Ajouter JSON-LD pour les services
  - Structurer les données business
  - Améliorer les rich snippets

### 📊 Monitoring
- [ ] **Web Vitals tracking**
  - Implémenter `web-vitals` library
  - Tracker LCP, FID, CLS
  - Analytics des performances

- [ ] **Service Worker**
  - Cache des assets statiques
  - Stratégie cache-first pour images
  - Offline fallback

---

## 🎯 Actions Rapides (< 30 min chacune)

### Immédiat
- [ ] Ajouter `loading="lazy"` aux images portfolio
- [ ] Configurer minification dans vite.config.ts
- [ ] Supprimer console.log/warn/error
- [ ] Ajouter compression gzip

### Court terme (< 2h chacune)
- [ ] Convertir 1 image en WebP (test)
- [ ] Implémenter lazy loading d'un composant
- [ ] Optimiser le hook useMediaQuery
- [ ] Configurer code splitting basique

### Moyen terme (< 1 jour chacune)
- [ ] Convertir toutes les images en WebP
- [ ] Implémenter images responsive complètes
- [ ] Code splitting avancé
- [ ] Pré-rendu HTML

---

## 📈 Gains Estimés par Action

| Action | Temps | Gain LCP | Gain Bundle | Difficulté |
|--------|-------|----------|-------------|------------|
| Images WebP | 2h | -60% | -50% images | ⭐⭐ |
| Lazy loading | 1h | -30% | 0% | ⭐ |
| Minification | 30min | -10% | -20% | ⭐ |
| Code splitting | 4h | -20% | -30% | ⭐⭐⭐ |
| Console cleanup | 15min | -5% | -1% | ⭐ |

---

## 🛠️ Outils Nécessaires

### Installation
```bash
npm install --save-dev vite-bundle-analyzer
npm install --save-dev vite-plugin-prerender
npm install web-vitals
```

### Outils Externes
- [Squoosh.app](https://squoosh.app/) - Conversion WebP
- [TinyPNG](https://tinypng.com/) - Compression images
- [PageSpeed Insights](https://pagespeed.web.dev/) - Test performance

---

## ✅ Validation

### Tests à faire après chaque optimisation
- [ ] Lighthouse score (Performance)
- [ ] Bundle size analysis
- [ ] Visual regression test
- [ ] Fonctionnalité intacte

### Métriques cibles
- **LCP :** < 1.5s (actuellement ~3.5s)
- **FID :** < 100ms (actuellement ~200ms)
- **CLS :** < 0.1 (actuellement ~0.15)
- **Bundle :** < 300KB (actuellement ~800KB)

---

**Instructions :** Coche les tâches que tu veux que je fasse et dis-moi par lesquelles commencer ! 🚀