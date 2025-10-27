# Guide Pratique d'Accessibilité Web

> Guide interactif et complet des bonnes pratiques d'accessibilité web, démontrant l'implémentation concrète des standards WCAG 2.1 niveau AA avec Nuxt 3 (Vue.js).

[![Nuxt](https://img.shields.io/badge/Nuxt-3.19-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.55-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-005A9C)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📖 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Développement](#-développement)
- [Tests](#-tests)
- [Build de production](#-build-de-production)
- [Architecture](#-architecture)
- [Accessibilité](#-accessibilité)
- [Performance](#-performance)
- [Guide d'Utilisation](#-guide-dutilisation)
- [Dépannage](#-dépannage)
- [Ressources](#-ressources)

---

## 🎯 Aperçu

Cette application Nuxt 3 est un guide pratique et interactif des bonnes pratiques d'accessibilité web. Construite avec Vue.js, elle permet aux développeurs, designers et décideurs de découvrir, comprendre et apprendre à implémenter l'accessibilité numérique à travers des exemples concrets et comparatifs.

### Objectifs

- **Démontrer** visuellement les différences entre bonnes et mauvaises pratiques d'accessibilité
- **Expliquer** pourquoi l'accessibilité est essentielle pour tous les utilisateurs
- **Enseigner** comment implémenter correctement l'accessibilité
- **Permettre** de tester en temps réel avec le clavier et comprendre l'expérience des lecteurs d'écran
- **Inspirer** les équipes à intégrer l'accessibilité dès la phase de conception
- **Servir** de référence pratique pour les développements futurs

---

## ✨ Fonctionnalités

### 8 sections d'exemples interactifs

1. **HTML Sémantique**
   - Structure de page avec landmarks
   - Hiérarchie des titres
   - Distinction boutons vs liens
   - Éléments natifs vs divs stylisés

2. **Navigation Clavier**
   - Indicateurs de focus visibles
   - Modal avec focus trap
   - Navigation au Tab et flèches
   - Skip links (liens d'évitement)

3. **Images & Médias**
   - Alt text appropriés et contextuels
   - Images décoratives vs informatives
   - Galerie d'images accessible
   - Vidéos avec sous-titres et transcription

4. **Contrastes & Couleurs**
   - Ratios de contraste WCAG AA/AAA
   - Support du daltonisme
   - Thèmes adaptatifs (clair/sombre)
   - Informations non basées sur la couleur seule

5. **Formulaires Accessibles**
   - Labels explicites et associés
   - Validation accessible
   - Messages d'erreur clairs
   - Instructions et aide contextuelle

6. **Composants ARIA**
   - Accordéon accessible
   - Notifications toast avec aria-live
   - Tableaux triables
   - Widgets personnalisés

7. **Performance & Adaptabilité**
   - Respect de `prefers-reduced-motion`
   - Support de `prefers-contrast`
   - Mode sombre (`prefers-color-scheme`)
   - Responsive et mobile-first

8. **Page d'accueil**
   - Vue d'ensemble du site
   - Navigation rapide vers les sections
   - Statistiques d'accessibilité
   - Effet "curb cut" expliqué

### Fonctionnalités interactives

- **Toggle Good/Bad** : Basculer entre exemples accessibles et inaccessibles
- **Code en direct** : Affichage du code source avec coloration syntaxique
- **Export image** : Capturer les exemples pour les slides
- **Raccourcis clavier** : Navigation rapide (? pour l'aide)
- **Annonces vocales** : Changements de route annoncés aux lecteurs d'écran

### Caractéristiques techniques

- ✅ **Navigation clavier complète** sur tous les éléments interactifs
- ✅ **Liens d'évitement** (skip links) pour accès rapide au contenu
- ✅ **Focus trap** dans les modales et dialogues
- ✅ **Respect des préférences utilisateur** (animations, contraste, thème)
- ✅ **Mobile-first** avec menu burger accessible
- ✅ **Zero-cookie** et respect de la vie privée (Plausible Analytics)
- ✅ **ARIA approprié** sur les composants dynamiques
- ✅ **SEO optimisé** avec meta tags dynamiques

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** : version 18.x ou supérieure ([Télécharger](https://nodejs.org/))
- **pnpm** : gestionnaire de paquets rapide ([Installation](https://pnpm.io/installation))
  ```bash
  npm install -g pnpm
  ```

### Recommandations

- Éditeur de code : **VS Code** avec extensions Vue
- Navigateur : **Chrome/Firefox** avec outils de développement
- Lecteur d'écran : **NVDA** (Windows) ou **VoiceOver** (macOS) pour les tests

---

## 📦 Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd a11y-demo
```

### 2. Installer les dépendances

```bash
pnpm install
```

Cette commande installe :
- **Nuxt 3** : framework Vue.js fullstack avec SSR
- **Vue 3** : framework JavaScript réactif (intégré à Nuxt)
- **@vueuse/core** : utilitaires composables Vue
- **html2canvas** : export d'images
- **Playwright** : tests end-to-end
- **axe-playwright** : tests d'accessibilité automatisés

### 3. Installer les navigateurs pour les tests (optionnel)

```bash
pnpm exec playwright install
```

---

## 🚀 Développement

### Démarrer le serveur de développement

```bash
pnpm run dev
```

L'application sera accessible à : **http://localhost:3000**

Le serveur de développement Nuxt offre :
- ⚡ Hot Module Replacement (HMR) instantané
- 🔍 Rapport d'erreurs détaillés dans le navigateur
- 🎨 Support CSS avec auto-prefixing

### Mode développement avec accès réseau

Pour tester sur mobile ou autre appareil du réseau local :

```bash
pnpm run dev --host
```

L'application sera accessible via votre IP locale (ex: http://192.168.1.X:5173)

### Structure des scripts disponibles

```bash
pnpm run dev          # Serveur de développement
pnpm run build        # Build de production
pnpm run preview      # Prévisualiser le build de production
pnpm run test         # Lancer les tests Playwright
pnpm run test:ui      # Tests avec interface graphique
pnpm run test:headed  # Tests en mode navigateur visible
```

---

## 🧪 Tests

### Tests d'accessibilité automatisés

L'application utilise **Playwright** avec **axe-playwright** pour vérifier automatiquement :

- ✅ Navigation au clavier sur tous les éléments interactifs
- ✅ Contrastes de couleurs (ratios WCAG AA)
- ✅ Structure sémantique HTML (landmarks, headings)
- ✅ Attributs ARIA corrects et cohérents
- ✅ Labels et descriptions sur les formulaires
- ✅ Alternatives textuelles pour les images

### Lancer les tests

```bash
# Tests en mode headless (sans interface)
pnpm run test

# Tests avec interface graphique interactive
pnpm run test:ui

# Tests en mode navigateur visible
pnpm run test:headed
```

### Structure des tests

Les tests sont organisés par page dans `/tests/` :

```
tests/
├── home.spec.js              # Page d'accueil
├── semantic-html.spec.js     # HTML sémantique
├── keyboard-navigation.spec.js
├── media-accessible.spec.js
├── color-contrast.spec.js
├── accessible-forms.spec.js
├── aria-components.spec.js
└── performance.spec.js
```

### Exemple de test d'accessibilité

```javascript
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test('page should be accessible', async ({ page }) => {
  await page.goto('/')
  await injectAxe(page)
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true }
  })
})
```

---

## 🏗️ Build de production

### Créer un build optimisé

```bash
pnpm run build
```

Cette commande génère un dossier `/dist` contenant :
- 📦 Bundles JavaScript minifiés avec code splitting
- 🎨 CSS optimisé et minifié
- 🖼️ Assets optimisés et avec hash de cache
- 📄 Fichier HTML avec preloading des ressources

### Prévisualiser le build

```bash
pnpm run preview
```

Le build sera servi localement sur http://localhost:4173

### Métriques de performance

Le build de production est optimisé pour :
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s
- **Bundle size** : < 200 KB (gzipped)
- **Lighthouse Score** : > 95/100

### Déploiement

L'application peut être déployée sur :
- **Netlify** : Drag & drop du dossier `/dist`
- **Vercel** : Import du repository GitHub
- **GitHub Pages** : Configuration dans les Settings
- **Serveur web** : Servir le contenu de `/dist`

⚠️ **Important** : Configurez les redirections pour Vue Router (SPA mode)

Exemple de configuration Netlify (`/public/_redirects`) :
```
/* /index.html 200
```

---

## 🏛️ Architecture

### Structure du projet

```
a11y-demo/
├── public/                 # Assets statiques
├── src/
│   ├── assets/            # Images, fonts
│   ├── components/
│   │   ├── common/        # Composants réutilisables
│   │   │   ├── SimpleModal.vue
│   │   │   ├── AboutModal.vue
│   │   │   ├── CodeBlock.vue
│   │   │   └── ExampleToggle.vue
│   │   └── layout/        # Composants de layout
│   │       ├── AppNavigation.vue
│   │       └── PageHeader.vue
│   ├── composables/       # Hooks Vue réutilisables
│   │   ├── useA11y.js
│   │   ├── useFocusTrap.js
│   │   ├── useKeyboardShortcuts.js
│   │   ├── useSEO.js
│   │   ├── useSyntaxHighlight.js
│   │   └── useExportToImage.js
│   ├── router/
│   │   └── index.js       # Configuration Vue Router
│   ├── styles/
│   │   ├── variables.css  # Design tokens (couleurs, espacements)
│   │   └── global.css     # Styles globaux
│   ├── utils/
│   │   └── syntaxHighlight.js
│   ├── views/             # Pages (routes)
│   │   ├── Home.vue
│   │   ├── SemanticHTML.vue
│   │   ├── KeyboardNavigation.vue
│   │   ├── MediaAccessible.vue
│   │   ├── ColorContrast.vue
│   │   ├── AccessibleForms.vue
│   │   ├── ARIAComponents.vue
│   │   └── Performance.vue
│   ├── App.vue            # Composant racine
│   └── main.js            # Point d'entrée
├── tests/                 # Tests Playwright
├── .gitignore
├── package.json
├── vite.config.js         # Configuration Vite
├── playwright.config.js   # Configuration Playwright
└── README.md
```

### Composables clés

#### `useA11y.js` - Gestion des préférences utilisateur

```javascript
// Détecte et réagit aux préférences système
export function useUserPreferences() {
  const prefersReducedMotion = usePreferredReducedMotion()
  const prefersHighContrast = useMediaQuery('(prefers-contrast: high)')
  const prefersDarkMode = usePreferredColorScheme()
  return { prefersReducedMotion, prefersHighContrast, prefersDarkMode }
}
```

#### `useFocusTrap.js` - Gestion du focus dans les modales

```javascript
// Piège le focus à l'intérieur d'un élément
export function useFocusTrap(containerRef, options = {}) {
  // Implémentation complète dans le fichier source
}
```

#### `useKeyboardShortcuts.js` - Raccourcis clavier globaux

```javascript
// Enregistre des raccourcis clavier accessibles
export function useKeyboardShortcuts() {
  // ? = afficher l'aide
  // Esc = fermer les modales
}
```

#### `useSEO.js` - Gestion dynamique du SEO

```javascript
// Met à jour title, meta descriptions et Open Graph
export function useSEO() {
  const setPageMeta = (title, description) => {
    document.title = title
    // ...
  }
}
```

### Design System

L'application utilise des **CSS Custom Properties** pour un theming cohérent :

```css
/* src/styles/variables.css */
:root {
  /* Couleurs principales */
  --color-primary: #1441D0;
  --color-primary-dark: #0F34A5;

  /* Couleurs fonctionnelles */
  --color-success: #067a06;
  --color-error: #d11a2a;
  --color-warning: #9d5f00;

  /* Typographie */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 1rem;

  /* Espacements */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Layout */
  --sidebar-width: 280px;
  --border-radius: 0.625rem;
}
```

### Optimisations de performance

1. **Code Splitting** : Lazy loading des routes
   ```javascript
   const SemanticHTML = () => import('./views/SemanticHTML.vue')
   ```

2. **Composants légers** : Pas de bibliothèques UI lourdes
3. **CSS minimal** : Variables CSS natives, pas de preprocesseur
4. **Images optimisées** : Lazy loading et formats modernes
5. **Tree shaking** : Vite élimine automatiquement le code mort

---

## ♿ Accessibilité

### Conformité WCAG 2.1

L'application vise la conformité **niveau AA** :

- ✅ **1.1.1** - Contenu non textuel : Alt text sur toutes les images
- ✅ **1.3.1** - Information et relations : HTML sémantique correct
- ✅ **1.4.3** - Contraste : Ratio minimum de 4.5:1 pour le texte
- ✅ **2.1.1** - Clavier : Toutes les fonctions accessibles au clavier
- ✅ **2.4.1** - Contourner des blocs : Skip links présents
- ✅ **2.4.3** - Parcours du focus : Ordre logique et visible
- ✅ **2.4.7** - Focus visible : Indicateurs de focus proéminents
- ✅ **3.2.1** - Au focus : Pas de changements de contexte inattendus
- ✅ **4.1.2** - Nom, rôle, valeur : ARIA approprié sur les composants

### Fonctionnalités d'accessibilité implémentées

#### Skip Links (Liens d'évitement)

```vue
<div class="skip-links">
  <a href="#main-content" class="skip-link">
    Aller au contenu principal
  </a>
  <a href="#main-nav" class="skip-link">
    Aller à la navigation
  </a>
</div>
```

#### Annonces pour lecteurs d'écran

```vue
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  {{ routeAnnouncement }}
</div>
```

#### Focus Trap dans les modales

```vue
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  @keydown.esc="closeModal"
>
  <!-- Contenu de la modale -->
</div>
```

#### Landmarks ARIA

```vue
<aside role="complementary" aria-label="Barre latérale de navigation">
<main role="main" aria-label="Contenu principal">
<footer role="contentinfo">
```

### Tests d'accessibilité manuels

#### Avec le clavier

1. Naviguer avec **Tab** / **Shift+Tab**
2. Activer avec **Enter** / **Espace**
3. Fermer les modales avec **Échap**
4. Utiliser les flèches dans les widgets (accordéon, tabs)

#### Avec un lecteur d'écran

**NVDA (Windows)** :
```
Ctrl + Alt + N     # Démarrer NVDA
Flèche bas/haut    # Naviguer
Enter              # Activer
Insert + F7        # Liste des landmarks
```

**VoiceOver (macOS)** :
```
Cmd + F5           # Activer/désactiver VoiceOver
Ctrl + Option + →  # Naviguer
Ctrl + Option + Espace # Activer
Ctrl + Option + U  # Rotor (navigation)
```

---

## ⚡ Performance

### Métriques cibles

| Métrique | Cible | Actuel |
|----------|-------|--------|
| First Contentful Paint | < 1.5s | ~0.8s |
| Largest Contentful Paint | < 2.5s | ~1.2s |
| Time to Interactive | < 3.5s | ~1.8s |
| Cumulative Layout Shift | < 0.1 | ~0.02 |
| Total Blocking Time | < 300ms | ~150ms |

### Optimisations implémentées

1. **Route-based code splitting** : Chaque page charge uniquement son code
2. **Lazy loading des images** : Images chargées à la demande
3. **CSS minimal** : ~15 KB de CSS total (non minifié)
4. **Pas de dépendances lourdes** : Bundle JavaScript < 100 KB
5. **Preloading sélectif** : Ressources critiques préchargées

### Audit de performance

Utilisez **Lighthouse** dans Chrome DevTools :

1. Ouvrir DevTools (`F12`)
2. Onglet "Lighthouse"
3. Cocher "Performance" et "Accessibility"
4. "Generate report"

Scores attendus :
- Performance : > 95
- Accessibility : > 95
- Best Practices : > 95
- SEO : > 95

---

## 💡 Guide d'Utilisation

### Explorer le guide

Ce guide est conçu pour être exploré de manière **autonome et interactive** :

1. **Parcourir les sections** via le menu latéral
2. **Comparer** les exemples bons et mauvais avec le toggle
3. **Examiner le code** source de chaque exemple
4. **Tester** avec le clavier et les lecteurs d'écran
5. **Apprendre** en lisant les explications détaillées

### Utilisation pour des présentations (optionnel)

Ce guide peut également servir de support pour des présentations ou formations sur l'accessibilité :

#### Préparation

1. **Démarrer l'application** : `pnpm run dev`
2. **Tester l'affichage** sur l'écran de projection
3. **Préparer les outils** : DevTools, extensions WAVE/axe
4. **Optionnel** : Tester avec un lecteur d'écran (NVDA/VoiceOver)

#### Structure de démonstration suggérée

**Pour chaque section** :
1. Montrer le **mauvais exemple** et expliquer les problèmes
2. Basculer vers le **bon exemple** et montrer les différences
3. Afficher le **code source** pour voir l'implémentation
4. **Tester en direct** avec le clavier ou lecteur d'écran

**Sections clés à présenter** :
- HTML Sémantique (fondamental)
- Navigation Clavier (démo interactive)
- Formulaires (cas d'usage concret)
- Contrastes (visuel impactant)
- ARIA (composants modernes)

### Raccourcis clavier

- **Tab** / **Shift+Tab** : Navigation entre éléments
- **Espace** : Activer boutons et checkboxes
- **Enter** : Activer liens et boutons
- **Échap** : Fermer les modales

### Conseils d'apprentissage

✅ **Recommandé** :
- Prendre le temps d'explorer chaque exemple
- Tester personnellement avec le clavier
- Lire les explications pour comprendre le "pourquoi"
- Consulter le code pour voir le "comment"
- Essayer avec un lecteur d'écran pour comprendre l'expérience utilisateur

💡 **Astuce** :
- 15 minutes avec un lecteur d'écran valent plus que des heures de lecture théorique

---

## 🔧 Dépannage

### Le serveur de dev ne démarre pas

**Erreur** : `Port 5173 is already in use`

**Solution** :
```bash
# Tuer le processus sur le port 5173
lsof -ti:5173 | xargs kill -9

# Ou utiliser un autre port
pnpm run dev -- --port 3000
```

---

### Les tests Playwright échouent

**Erreur** : `browserType.launch: Executable doesn't exist`

**Solution** : Installer les navigateurs Playwright
```bash
pnpm exec playwright install
```

---

### Les images ne se chargent pas

**Erreur** : Images externes (Wikimedia) bloquées

**Solution** : Vérifier la connexion internet ou utiliser des images locales

---

### Hot Module Replacement (HMR) ne fonctionne pas

**Solution** :
```bash
# Nettoyer le cache Vite
rm -rf node_modules/.vite

# Redémarrer le serveur
pnpm run dev
```

---

### Build de production échoue

**Erreur** : Out of memory

**Solution** : Augmenter la mémoire Node.js
```bash
NODE_OPTIONS=--max-old-space-size=4096 pnpm run build
```

---

### Problèmes de focus visible

**Symptôme** : Focus outline non visible sur certains éléments

**Solution** : Vérifier les styles globaux
```css
/* Assurer que outline n'est pas désactivé */
*:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
```

---

### Lecteur d'écran n'annonce pas les changements

**Solution** : Vérifier les attributs ARIA
```vue
<!-- Doit avoir aria-live="polite" ou "assertive" -->
<div role="status" aria-live="polite" aria-atomic="true">
  {{ announcement }}
</div>
```

---

## 📚 Ressources

### Standards et guidelines

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Référence complète WCAG
- [WCAG 2.2 (2023)](https://www.w3.org/WAI/WCAG22/quickref/) - Dernière version
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - Patterns ARIA
- [RGAA 4.1](https://accessibilite.numerique.gouv.fr/) - Référentiel français
- [Section 508](https://www.section508.gov/) - Standard US fédéral

### Outils de test

- [axe DevTools](https://www.deque.com/axe/devtools/) - Extension navigateur
- [WAVE](https://wave.webaim.org/) - Évaluation visuelle
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) - Audit automatisé
- [NVDA](https://www.nvaccess.org/) - Lecteur d'écran gratuit (Windows)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/) - Test de contraste

### Documentation technique

- [Vue.js Accessibility Guide](https://vuejs.org/guide/best-practices/accessibility.html)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Playwright Testing Guide](https://playwright.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [A11Y Project](https://www.a11yproject.com/) - Checklist et ressources

### Articles et blogs

- [WebAIM Articles](https://webaim.org/articles/)
- [Deque Blog](https://www.deque.com/blog/)
- [The A11Y Project](https://www.a11yproject.com/posts/)
- [24 Accessibility](https://www.24a11y.com/) - Calendrier de l'avent a11y

### Communautés

- [A11Y Slack](https://web-a11y.slack.com/) - Communauté internationale
- [ARIA Working Group](https://www.w3.org/WAI/ARIA/) - Groupe de travail W3C

### Règlementation

- [European Accessibility Act 2025](https://ec.europa.eu/social/main.jsp?catId=1202)
- [Americans with Disabilities Act (ADA)](https://www.ada.gov/)
- [RGPD et accessibilité](https://www.cnil.fr/)

---

## 🤝 Contribution

Si vous souhaitez contribuer à ce projet :

1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'feat: Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines de contribution

- Respecter les standards WCAG 2.1 AA
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les changements dans le README
- Utiliser des commits conventionnels ([Conventional Commits](https://www.conventionalcommits.org/))

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

---

## 👨‍💻 Auteur

**Romain Malnoult**
Tech Lead Design System & Accessibilité

- LinkedIn : [romainmalnoult](https://www.linkedin.com/in/romainmalnoult/)
- Site : [Démo Accessibilité](https://votre-site.com)

---

## 🙏 Remerciements

- **Nuxt Team** pour le framework fullstack incroyable
- **Vue.js Team** pour le framework réactif
- **Deque Systems** pour axe-core et les outils d'accessibilité
- **W3C WAI** pour les guidelines et standards
- **La communauté a11y** pour le partage de connaissances

---

**Dernière mise à jour** : Octobre 2025
**Version** : 1.0.0

---

⭐ Si ce projet vous aide à comprendre l'accessibilité web, n'hésitez pas à le partager !
