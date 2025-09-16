# Application de Démonstration d'Accessibilité Web

Support interactif pour un tech talk de 20 minutes sur l'accessibilité web.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
pnpm install

# Lancer l'application
pnpm run dev

# Ouvrir dans le navigateur
# http://localhost:5173
```

## 📋 Scripts disponibles

```bash
pnpm run dev      # Serveur de développement
pnpm run build    # Build de production
pnpm run preview  # Prévisualiser le build
pnpm run test     # Lancer les tests Playwright
```

## 🎯 Fonctionnalités

### 8 sections d'exemples interactifs :

1. **HTML Sémantique** - Structure de page, hiérarchie des titres, boutons vs liens
2. **Navigation Clavier** - Focus visible, modal avec focus trap, navigation accessible
3. **Images & Médias** - Alt text appropriés, galerie d'images, vidéos avec sous-titres
4. **Contrastes & Couleurs** - Ratios WCAG, support daltonisme, thèmes adaptatifs
5. **Formulaires** - Labels, validation accessible, messages d'erreur clairs
6. **ARIA & Dynamique** - Accordion, notifications toast, tableaux triables
7. **Performance** - Respect des préférences utilisateur (reduced motion, dark mode)
8. **Page d'accueil** - Vue d'ensemble et navigation rapide

### Chaque exemple propose :

- **Toggle Good/Bad** : Basculer entre les bonnes et mauvaises pratiques
- **Explications** : Comprendre pourquoi c'est important
- **Code en direct** : Voir l'implémentation Vue.js
- **Test en temps réel** : Interagir avec les exemples

## 🔍 Tests d'accessibilité

L'application inclut des tests Playwright avec axe-core pour vérifier :
- La navigation au clavier
- Les contrastes de couleurs
- La structure sémantique
- Les attributs ARIA
- L'accessibilité des formulaires

## 🎨 Thèmes et préférences

L'application respecte automatiquement :
- `prefers-color-scheme` : Mode sombre/clair
- `prefers-reduced-motion` : Animations réduites
- `prefers-contrast` : Mode haut contraste

## 📱 Responsive

- Interface adaptative pour desktop, tablette et mobile
- Zoom jusqu'à 200% sans perte de fonctionnalité
- Touch-friendly pour les appareils tactiles

## ⚡ Performance

- Build optimisé avec Vite
- Code splitting par route
- CSS minimal avec variables CSS
- Pas de dépendances lourdes

## 🛠️ Technologies utilisées

- **Vue 3** avec Composition API
- **Vue Router** pour la navigation
- **Vite** pour le build
- **Playwright** pour les tests
- **axe-core** pour l'audit d'accessibilité

## 📚 Ressources

- [WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [RGAA 4](https://accessibilite.numerique.gouv.fr/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Directive Accessibilité Europe 2025](https://ec.europa.eu/social/main.jsp?catId=1202)

## 🎤 Utilisation pendant le talk

1. **Démarrer l'app** avant la présentation
2. **Naviguer** entre les sections selon le plan du talk
3. **Démontrer** les toggles good/bad en direct
4. **Tester** avec le clavier devant l'audience
5. **Montrer** l'impact avec un lecteur d'écran si possible

## ✅ Checklist pré-présentation

- [ ] Application lancée et accessible
- [ ] Navigateur en mode présentation (zoom adapté)
- [ ] Lecteur d'écran configuré (optionnel)
- [ ] Extensions d'accessibilité installées (WAVE, axe DevTools)
- [ ] Connexion internet stable pour les ressources externes