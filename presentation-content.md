# Accessibilité Web - Présentation

## Slide 1 : Guide Pratique de l'Accessibilité Web

**Titre:** Guide Pratique de l'Accessibilité Web

**Contenu:**
L'accessibilité, c'est garantir un web utilisable par tous :
- Personnes en situation de handicap
- Seniors
- Utilisateurs mobiles
- Connexions lentes
- Situations temporaires (bras cassé, environnement bruyant, etc.)

---

## Slide 2 : Pourquoi l'accessibilité ?

**Titre:** Pourquoi l'accessibilité est-elle essentielle ?

**Contenu:**
- **15%** de la population mondiale vit avec un handicap ([Source : Nations Unies](https://www.un.org/fr/observances/day-of-persons-with-disabilities/background))
- **2025** : Directive Accessibilité Europe obligatoire
- **96%** des sites web ont des erreurs d'accessibilité
- C'est une obligation légale et morale

---

## Slide 3 : L'effet Curb Cut

**Titre:** Quand on conçoit pour le handicap, tout le monde en profite

**Contenu:**
**Le concept du "Curb Cut"** (rampe de trottoir) : Conçu pour les fauteuils roulants, mais bénéficie à 99% des piétons (valises, poussettes, vélos...)

**Exemples concrets :**
- **Sous-titres vidéo** → Sourds, mais aussi : métro bruyant, apprentissage de langues
- **Navigation clavier** → Handicap moteur, mais aussi : développeurs power users, souris cassée
- **Commande vocale** → Aveugles, mais aussi : mains occupées, multitâche
- **Brosse à dents électrique** → Mobilité réduite (1954), aujourd'hui recommandée pour tous
- **Livres audio** → Aveugles (1932), aujourd'hui 1.3 milliard $ de ventes

**Citation clé :** *L'accessibilité n'est pas une contrainte, c'est de l'innovation déguisée.*

---

## Slide 4 : Outils gratuits pour tester

**Titre:** Outils gratuits pour tester l'accessibilité

**Contenu:**
**Extensions navigateur :**
- **WAVE** - Visualisation des erreurs en temps réel
- **axe DevTools** - Tests automatisés intégrés aux DevTools
- **Lighthouse** - Audit intégré à Chrome avec score d'accessibilité
- **Accessibility Insights** - Suite Microsoft avec tests guidés

**Outils complémentaires :**
- **Colour Contrast Analyser** - Test des ratios WCAG AA/AAA
- **MDN Accessibility** - Documentation de référence complète

**💡 Conseil pro :** Ces outils sont des compléments, pas des remplacements aux tests utilisateurs réels. Aucun outil automatique ne détecte 100% des problèmes.

---

## Slide 5 : Lecteurs d'écran courants

**Titre:** Comprendre les lecteurs d'écran

**Contenu:**
**Les plus utilisés :**
- **NVDA** (Windows) - Gratuit, open source - 41% d'usage
- **JAWS** (Windows) - Payant, professionnel - 40% d'usage
- **VoiceOver** (macOS/iOS) - Intégré - 8% d'usage (Raccourci : Cmd+F5)
- **TalkBack** (Android) - Intégré - Usage mobile

**🧪 Comment tester avec un lecteur d'écran :**
1. Fermez les yeux ou éteignez l'écran
2. Naviguez uniquement au clavier (Tab, flèches, Entrée, Espace)
3. Écoutez attentivement ce qui est annoncé
4. Vérifiez que tout est compréhensible sans voir l'écran

**Note :** 15 minutes de test avec un lecteur d'écran valent plus que des heures d'audit automatique.

---

## Slide 6 : HTML Sémantique - Structure de page

**Titre:** HTML Sémantique : La fondation de l'accessibilité

**Contenu:**
**Utiliser les bons éléments HTML pour structurer le contenu**

**❌ Mauvais :** Divs génériques sans sémantique
```html
<div class="page-header">
  <div class="site-title">Mon Site</div>
  <div class="navigation">...</div>
</div>
```

**✅ Bon :** Éléments sémantiques avec rôles appropriés
```html
<header>
  <h1>Mon Site</h1>
  <nav aria-label="Navigation principale">
    <ul>...</ul>
  </nav>
</header>
<main>Contenu principal</main>
<footer>Pied de page</footer>
```

**Avantages :** Les lecteurs d'écran peuvent créer des repères de navigation et comprendre la structure.

---

## Slide 7 : Hiérarchie des titres

**Titre:** Hiérarchie logique des titres

**Contenu:**
**Une hiérarchie logique (h1 → h2 → h3) permet aux lecteurs d'écran de créer un plan de navigation**

**❌ Mauvais :** Divs stylisées sans hiérarchie
```html
<div class="title-large">Introduction</div>
<div class="title-medium">Section 1</div>
<div class="title-small">Sous-section</div>
```

**✅ Bon :** Hiérarchie logique des titres
```html
<h1>Introduction</h1>
<h2>Techniques de base</h2>
<h3>HTML sémantique</h3>
<h4>Éléments de structure</h4>
```

**Pourquoi :** Les utilisateurs peuvent naviguer de titre en titre et comprendre la structure du document.

---

## Slide 8 : Boutons vs Liens

**Titre:** Boutons vs Éléments cliquables

**Contenu:**
**Utiliser les bons éléments pour les actions**

**Règle d'or :**
- **Boutons** (`<button>`) → Actions (sauvegarder, supprimer, ouvrir modal)
- **Liens** (`<a>`) → Navigation (aller vers une page)

**❌ Mauvais :** Divs cliquables
```html
<div @click="handleSave" style="cursor: pointer;">
  💾 Sauvegarder
</div>
```

**✅ Bon :** Boutons et liens appropriés
```html
<button type="button" @click="handleSave">
  💾 Sauvegarder
</button>
<a href="/profile">
  👤 Voir le profil
</a>
```

**Avantages :** Sémantique correcte + comportements clavier natifs (Espace, Entrée)

---

## Slide 9 : Listes structurées

**Titre:** Listes et données structurées

**Contenu:**
**Les éléments de liste permettent aux lecteurs d'écran d'annoncer le nombre d'éléments**

**❌ Mauvais :** Divs sans structure
```html
<div class="list-title">Ingrédients :</div>
<div>3 œufs</div>
<div>2 cuillères à soupe de lait</div>
```

**✅ Bon :** Listes sémantiques
```html
<h3>Ingrédients :</h3>
<ul>
  <li>3 œufs</li>
  <li>2 cuillères à soupe de lait</li>
</ul>

<h3>Étapes :</h3>
<ol>
  <li>Battre les œufs avec le lait</li>
  <li>Faire chauffer le beurre</li>
</ol>
```

**Avantage :** Les lecteurs d'écran annoncent "Liste de 2 éléments" et permettent la navigation entre items.

---

## Slide 10 : Contrastes de couleurs - WCAG

**Titre:** Contrastes & Couleurs : Critères WCAG

**Contenu:**
**Standards EN 301 549 / WCAG AA :**

- **4.5:1** - Ratio minimum pour texte normal
- **3:1** - Ratio minimum pour texte large (18pt+ ou 14pt+ gras)

**Niveau AAA (recommandé) :**
- **7:1** - Texte normal
- **4.5:1** - Texte large

**Exemples de ratios :**
- Gris clair sur blanc (2.2:1) ❌ Échec
- Jaune sur blanc (1.9:1) ❌ Échec
- Gris foncé sur blanc (7.0:1) ✅ AAA
- Noir sur blanc (21:1) ✅ AAA

**Outil recommandé :** Colour Contrast Analyser (gratuit)

---

## Slide 11 : Information par la couleur

**Titre:** Ne jamais utiliser uniquement la couleur

**Contenu:**
**Principe :** L'information ne doit JAMAIS reposer uniquement sur la couleur

**❌ Mauvais :** Erreurs signalées uniquement en rouge
```html
<input class="input-error" value="Jo">
<!-- Bordure rouge seulement -->
```

**✅ Bon :** Couleur + texte + icônes + ARIA
```html
<input class="input-error"
       value="Jo"
       aria-describedby="name-error">
<div id="name-error" role="alert">
  ❌ Le nom doit contenir au moins 3 caractères
</div>
```

**Avantages :**
- Accessible aux daltoniens (8% des hommes)
- Compréhensible sans la couleur
- Annoncé par les lecteurs d'écran

---

## Slide 12 : Daltonisme et motifs

**Titre:** Daltonisme : Rouge/Vert problématique

**Contenu:**
**8% des hommes et 0.5% des femmes sont daltoniens**

**Problème :** Combinaisons rouge-vert indistinguables

**❌ Mauvais :** Graphique avec rouge/vert uniquement
```css
.data-error { background: #e53e3e; }
.data-success { background: #38a169; }
```

**✅ Bon :** Couleurs distinctes + motifs + icônes
```css
.data-error {
  background: #e53e3e;
  /* Motif rayé */
  background-image: repeating-linear-gradient(45deg, ...);
}
.data-success {
  background: #3182ce; /* Bleu au lieu de vert */
  /* Motif pointillé */
  background-image: radial-gradient(circle, ...);
}
```

**Ajouter des icônes :** ❌ pour erreur, ✅ pour succès

---

## Slide 13 : Thèmes accessibles

**Titre:** Commutateur de thème accessible

**Contenu:**
**Un bon thème doit :**
- Maintenir les ratios de contraste dans tous les modes
- Respecter les préférences système (`prefers-color-scheme`)
- Utiliser des contrôles accessibles (radio buttons, pas divs)

**❌ Mauvais :** Contrastes perdus en mode sombre
```css
.content.dark {
  background: #222;
  color: #555; /* Ratio insuffisant */
}
```

**✅ Bon :** Contrastes maintenus
```css
.content.dark {
  background: #1a202c;
  color: #f7fafc; /* Ratio élevé */
}

@media (prefers-color-scheme: dark) {
  .content.auto {
    background: #1a202c;
    color: #f7fafc;
  }
}
```

---

## Slide 14 : Images accessibles - Alt text

**Titre:** Textes alternatifs pour les images

**Contenu:**
**Les textes alternatifs permettent aux lecteurs d'écran de décrire les images**

**Règles :**
- **Images informatives** → alt descriptif
- **Images décoratives** → alt vide (`alt=""`)
- **Icônes avec texte adjacent** → `aria-hidden="true"` sur l'icône

**❌ Mauvais :**
```html
<img src="laptop.jpg" alt="image">
<img src="star.png" alt="star.png">
```

**✅ Bon :**
```html
<img src="laptop.jpg"
     alt="MacBook Pro 16 pouces, vue de face,
          écran ouvert montrant l'interface macOS">
<img src="star-icon.svg" alt="">
<span>
  <span class="sr-only">Note de </span>4.8/5
  <span class="sr-only"> étoiles</span> (127 avis)
</span>
```

---

## Slide 15 : Galerie d'images accessible

**Titre:** Galerie d'images avec navigation clavier

**Contenu:**
**Une galerie accessible doit supporter la navigation clavier et annoncer les changements**

**❌ Mauvais :** Navigation uniquement à la souris
```html
<div class="thumbnails">
  <img @click="selectImage(index)">
</div>
```

**✅ Bon :** Pattern tablist/tab/tabpanel ARIA
```html
<div role="tablist" aria-label="Images du produit">
  <button role="tab"
          :aria-selected="selected === index"
          :aria-controls="`panel-${index}`"
          :tabindex="selected === index ? 0 : -1"
          @keydown="handleKeydown">
    <img :alt="`${image.alt} - Miniature`">
  </button>
</div>
<div :id="`panel-${selected}`"
     role="tabpanel"
     :aria-labelledby="`tab-${selected}`">
  <img :alt="images[selected].alt">
</div>
```

**Navigation :** Flèches ↑↓, Home, End

---

## Slide 16 : Vidéos accessibles

**Titre:** Vidéos avec sous-titres et contrôles

**Contenu:**
**Les vidéos doivent être accessibles à tous**

**❌ Mauvais :** Lecture automatique sans sous-titres
```html
<video autoplay loop muted>
  <source src="demo.mp4">
</video>
```

**✅ Bon :** Contrôles + sous-titres + transcription
```html
<video controls
       preload="metadata"
       aria-describedby="video-description">
  <source src="demo.mp4">
  <!-- Sous-titres pour malentendants -->
  <track kind="captions"
         src="captions.vtt"
         srclang="fr"
         default>
  <!-- Descriptions audio pour malvoyants -->
  <track kind="descriptions"
         src="descriptions.vtt">
  <a href="transcript.html">Consulter la transcription</a>
</video>
```

**Bonnes pratiques :** Pas d'autoplay, contrôles natifs, transcription disponible

---

## Slide 17 : Graphiques accessibles

**Titre:** Graphiques et données visuelles

**Contenu:**
**Les graphiques SVG doivent avoir des descriptions textuelles et alternatives**

**❌ Mauvais :** SVG sans description
```html
<svg>
  <rect>...</rect>
</svg>
```

**✅ Bon :** SVG avec rôle, titre, description et table alternative
```html
<svg role="img"
     aria-labelledby="chart-title"
     aria-describedby="chart-desc">
  <title id="chart-title">
    Graphique en barres des ventes trimestrielles
  </title>
  <desc id="chart-desc">
    Évolution croissante : Q1: 40k€, Q2: 60k€,
    Q3: 80k€, Q4: 100k€
  </desc>
  <!-- Graphique -->
</svg>

<table>
  <caption>Données détaillées des ventes</caption>
  <!-- Toutes les données en format tableau -->
</table>
```

---

## Slide 18 : Navigation clavier - Raccourcis

**Titre:** Navigation Clavier : Les bases

**Contenu:**
**Raccourcis essentiels :**

- **Tab** → Naviguer entre éléments interactifs
- **Shift + Tab** → Navigation arrière
- **Entrée / Espace** → Activer boutons et liens
- **Échap** → Fermer modales et menus
- **↑ ↓** → Naviguer dans listes et menus

**Principe clé :** Toute fonctionnalité accessible à la souris doit l'être au clavier

---

## Slide 19 : Navigation dans les listes

**Titre:** Navigation par flèches dans les menus

**Contenu:**
**Pattern de navigation optimisé avec "roving tabindex"**

**❌ Mauvais :** Chaque item avec tabindex="0"
```html
<div class="menu">
  <div tabindex="0">Item 1</div>
  <div tabindex="0">Item 2</div>
  <div tabindex="0">Item 3</div>
</div>
<!-- Utilisateur doit Tab 5 fois -->
```

**✅ Bon :** Roving tabindex avec navigation flèches
```html
<div role="menu" @keydown="handleKeydown">
  <div role="menuitem" :tabindex="selected === 0 ? 0 : -1">
    Item 1
  </div>
  <div role="menuitem" :tabindex="selected === 1 ? 0 : -1">
    Item 2
  </div>
</div>
```

**Avantage :** Un seul Tab pour entrer dans le menu, puis flèches ↑↓ pour naviguer

---

## Slide 20 : Styles de focus visibles

**Titre:** Indicateurs de focus : Essentiels

**Contenu:**
**Les utilisateurs clavier ont BESOIN d'indicateurs visuels**

**❌ Mauvais :** Focus supprimé
```css
*:focus {
  outline: none !important; /* JAMAIS faire ça */
}
```

**✅ Bon :** Focus visible avec :focus-visible
```css
button:focus-visible {
  outline: 3px solid #4F46E5;
  outline-offset: 2px;
}

input:focus-visible {
  border-color: #4F46E5;
  outline: 2px solid #4F46E5;
  outline-offset: 1px;
}
```

**Note :** `:focus-visible` n'affiche le focus que pour la navigation clavier, pas au clic souris

---

## Slide 21 : Skip to content

**Titre:** Lien d'évitement (Skip to content)

**Contenu:**
**Permet de sauter la navigation répétitive**

**Problème :** Utilisateurs clavier doivent Tab à travers toute la navigation sur chaque page

**✅ Solution :** Lien d'évitement visible au focus
```html
<a href="#main-content" class="skip-link">
  Aller au contenu principal
</a>
<header>
  <nav aria-label="Navigation principale">
    <!-- 10+ liens... -->
  </nav>
</header>
<main id="main-content">
  <!-- Contenu -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
}
.skip-link:focus {
  top: 1rem;
}
```

**Avantage :** Premier Tab permet de sauter directement au contenu

---

## Slide 22 : Modal avec piège à focus

**Titre:** Modal accessible avec focus trap

**Contenu:**
**Les modales doivent garder le focus à l'intérieur**

**❌ Mauvais :** Focus peut sortir de la modal
```html
<div v-if="modalOpen" @click="close">
  <div>
    <h3>Titre</h3>
    <button @click="close">×</button>
    <button @click="confirm">Confirmer</button>
  </div>
</div>
```

**✅ Bon :** Modal avec ARIA et focus trap
```html
<div role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title"
     @keydown.esc="close"
     @keydown.tab="trapFocus">
  <h2 id="modal-title">Confirmer l'action</h2>
  <button aria-label="Fermer la modal">×</button>
  <button>Confirmer</button>
</div>
```

**Fonctions essentielles :**
- Focus automatique au premier élément
- Piège à focus (Tab circule dans la modal)
- Fermeture par Échap
- Retour du focus à l'élément déclencheur

---

## Slide 23 : Formulaires - Labels

**Titre:** Formulaires : Labels et associations

**Contenu:**
**Chaque champ DOIT avoir un label explicite**

**❌ Mauvais :** Placeholders ne remplacent pas les labels
```html
<input type="email" placeholder="Votre email">
<input type="checkbox">
<span>Se souvenir de moi</span>
```

**✅ Bon :** Labels associés avec for/id
```html
<label for="email-good">Adresse email</label>
<input type="email"
       id="email-good"
       placeholder="exemple@domaine.fr"
       required
       aria-describedby="email-help"
       autocomplete="email">
<div id="email-help">
  Nous ne partagerons jamais votre email
</div>

<input type="checkbox" id="remember-good">
<label for="remember-good">Se souvenir de moi</label>
```

**Avantages :** Cliquer sur le label active le champ, lecteurs d'écran lisent le label

---

## Slide 24 : Validation et erreurs

**Titre:** Messages d'erreur accessibles

**Contenu:**
**Les erreurs doivent être clairement annoncées et associées aux champs**

**❌ Mauvais :** Erreurs visuelles uniquement
```html
<input :class="{ 'error': submitted && !email }">
<div v-if="submitted">Erreur</div>
```

**✅ Bon :** Erreurs associées avec aria-describedby
```html
<!-- Résumé des erreurs au début -->
<div role="alert" aria-labelledby="error-summary-title">
  <h5 id="error-summary-title">Erreurs à corriger :</h5>
  <ul>
    <li><a href="#name-field">Le nom est obligatoire</a></li>
  </ul>
</div>

<label for="name-field">Nom complet *</label>
<input id="name-field"
       :aria-invalid="submitted && !name"
       aria-describedby="name-error">
<div id="name-error" role="alert">
  ❌ Le nom est obligatoire
</div>
```

**Avantages :** Navigation vers les erreurs, annonces immédiates, messages précis

---

## Slide 25 : Groupes de champs

**Titre:** Groupes logiques avec aria-labelledby

**Contenu:**
**Les groupes de champs liés doivent être associés à leurs titres**

**❌ Mauvais :** Structure désorganisée
```html
<form>
  <input type="radio" name="contact" value="email">
  <label>Email</label>
  <input type="checkbox" id="newsletter">
  <label>Newsletter</label>
  <!-- Éléments mélangés sans logique -->
</form>
```

**✅ Bon :** Groupes sémantiques avec aria-labelledby
```html
<form>
  <div role="group" aria-labelledby="personal-info">
    <h5 id="personal-info">Informations personnelles</h5>
    <label for="name">Nom *</label>
    <input id="name" required aria-required="true">
  </div>

  <div role="radiogroup"
       aria-labelledby="contact-method"
       aria-required="true">
    <h5 id="contact-method">Méthode de contact *</h5>
    <input type="radio" name="contact" id="email-opt">
    <label for="email-opt">Email</label>
  </div>
</form>
```

---

## Slide 26 : Validation temps réel

**Titre:** Validation temps réel respectueuse

**Contenu:**
**La validation doit être non intrusive**

**❌ Mauvais :** Validation immédiate sur chaque frappe
```html
<input @input="validateUsername">
<!-- Erreurs qui apparaissent/disparaissent constamment -->
```

**✅ Bon :** Validation sur blur + feedback progressif
```html
<label for="username">Nom d'utilisateur *</label>
<input id="username"
       @blur="validateUsername"
       aria-describedby="username-requirements username-feedback"
       aria-invalid="!!usernameError">

<!-- Instructions visibles -->
<div id="username-requirements">
  <ul>
    <li :class="{ valid: username.length >= 3 }">
      Au moins 3 caractères
    </li>
  </ul>
</div>

<!-- Feedback avec aria-live -->
<div id="username-feedback"
     role="alert"
     aria-live="polite">
  {{ usernameError }}
</div>
```

**Bonnes pratiques :** Validation sur blur, feedback positif/négatif, aria-live="polite"

---

## Slide 27 : ARIA - Introduction

**Titre:** Qu'est-ce qu'ARIA ?

**Contenu:**
**ARIA (Accessible Rich Internet Applications)**

Spécification W3C pour améliorer l'accessibilité des applications web dynamiques.

**Les 3 piliers :**
1. **🏷️ Rôles** → Définissent ce qu'est un élément
   - `role="button"`, `role="navigation"`, `role="alert"`
2. **📊 États** → Décrivent l'état actuel
   - `aria-expanded="true"`, `aria-checked="true"`
3. **🔧 Propriétés** → Informations supplémentaires
   - `aria-label="Menu"`, `aria-describedby="help-text"`

---

## Slide 28 : Les 5 règles d'or d'ARIA

**Titre:** ⚠️ Les 5 règles d'or d'ARIA

**Contenu:**
1. **Première règle :** Ne pas utiliser ARIA si vous pouvez utiliser HTML natif
2. **Deuxième règle :** Ne pas changer la sémantique native sauf si nécessaire
3. **Troisième règle :** Tous les éléments ARIA doivent être utilisables au clavier
4. **Quatrième règle :** Ne pas cacher d'éléments focusables avec `aria-hidden`
5. **Cinquième règle :** Tous les éléments interactifs doivent avoir un nom accessible

**En résumé :** HTML natif d'abord, ARIA quand nécessaire !

---

## Slide 29 : Tabindex - Gestion du focus

**Titre:** Tabindex : Contrôler la navigation clavier

**Contenu:**
**Valeurs de tabindex :**

**✅ tabindex="0"**
- Élément focusable dans l'ordre naturel du DOM
- Pour rendre les éléments custom interactifs focusables

**⚠️ tabindex="-1"**
- Focusable par JavaScript mais pas par Tab
- Pour focus programmatique (modals, alerts)

**❌ tabindex > 0**
- Change l'ordre de navigation (à ÉVITER !)
- Casse l'ordre naturel, source de confusion

**Bonnes pratiques :**
- Les éléments natifs (`<button>`, `<a>`, `<input>`) n'ont pas besoin de tabindex
- JAMAIS de valeurs positives - respectez l'ordre du DOM

---

## Slide 30 : Accordéon accessible

**Titre:** Accordéon avec ARIA

**Contenu:**
**Un accordéon doit utiliser les attributs ARIA appropriés**

**❌ Mauvais :** Divs cliquables sans ARIA
```html
<div @click="toggle">
  <span>Title</span>
  <span>+</span>
</div>
<div v-if="open">Content</div>
```

**✅ Bon :** Boutons avec ARIA complets
```html
<button aria-expanded="false"
        aria-controls="panel-1"
        @click="toggle"
        @keydown.enter="toggle">
  Title
</button>
<div id="panel-1"
     role="region"
     aria-labelledby="button-1"
     :hidden="!open">
  Content
</div>
```

**Navigation clavier :** ↑↓ entre headers, Home, End, Espace/Entrée pour ouvrir

---

## Slide 31 : Menu déroulant accessible

**Titre:** Menu déroulant avec focus et ARIA

**Contenu:**
**Un menu doit supporter navigation clavier et fermeture Échap**

**✅ Bon :** Menu avec role et gestion focus
```html
<button aria-haspopup="true"
        :aria-expanded="open"
        aria-controls="menu"
        @keydown.escape="close">
  Actions ▼
</button>

<div id="menu"
     role="menu"
     v-if="open">
  <button role="menuitem">Modifier</button>
  <button role="menuitem">Supprimer</button>
</div>
```

**Navigation :**
- ↑↓ pour naviguer entre items
- Échap pour fermer
- Entrée/Espace pour sélectionner
- Focus retourne au bouton déclencheur

---

## Slide 32 : Tableau triable accessible

**Titre:** Tableau triable avec aria-sort

**Contenu:**
**Un tableau triable doit indiquer l'état de tri courant**

**✅ Bon :** Boutons de tri avec aria-sort
```html
<table role="table" aria-label="Liste des utilisateurs">
  <thead>
    <tr>
      <th scope="col">
        <button :aria-sort="getSortState('name')"
                aria-describedby="sort-instructions">
          Nom <span>{{ sortIcon }}</span>
        </button>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Alice Martin</th>
      <td>alice@example.com</td>
    </tr>
  </tbody>
</table>

<div id="sort-instructions" aria-live="polite">
  Tableau trié par nom en ordre croissant
</div>
```

**États aria-sort :** `ascending`, `descending`, `none`

---

## Slide 33 : Zones aria-live

**Titre:** Zones dynamiques aria-live

**Contenu:**
**Les zones aria-live annoncent des changements de contenu**

**Deux niveaux de priorité :**

**aria-live="polite"**
- Attend la fin de l'annonce en cours
- Pour informations non urgentes
```html
<div aria-live="polite"
     aria-atomic="true"
     role="status">
  ℹ️ Information : Le compteur est à 5
</div>
```

**aria-live="assertive"**
- Interrompt immédiatement
- Pour alertes urgentes
```html
<div aria-live="assertive"
     aria-atomic="true"
     role="alert">
  ⚠️ ALERTE : Action requise !
</div>
```

**aria-atomic="true"** → Annonce tout le contenu de la région

---

## Slide 34 : Boutons avec icônes

**Titre:** Boutons icônes accessibles

**Contenu:**
**Les boutons uniquement avec icônes doivent avoir un label textuel**

**❌ Mauvais :** Icône seule
```html
<button>
  <span>🗑️</span>
</button>
<!-- Lecteur d'écran annonce "bouton" -->
```

**✅ Bon - 3 approches :**

**1. Avec aria-label**
```html
<button aria-label="Supprimer l'élément">
  <span aria-hidden="true">🗑️</span>
</button>
```

**2. Avec texte visible**
```html
<button>
  <span aria-hidden="true">🔍</span>
  <span>Rechercher</span>
</button>
```

**3. Avec texte masqué visuellement (sr-only)**
```html
<button>
  <span aria-hidden="true">💾</span>
  <span class="sr-only">Enregistrer</span>
</button>
```

---

## Slide 35 : Formulaires avec ARIA

**Titre:** Enrichir les formulaires avec ARIA

**Contenu:**
**Les attributs ARIA fournissent contexte et état**

**Attributs essentiels :**

**aria-label** → Label accessible quand pas de label visible
```html
<input aria-label="Adresse email">
```

**aria-describedby** → Associe une description détaillée
```html
<input aria-describedby="email-desc">
<span id="email-desc">Format : nom@exemple.com</span>
```

**aria-required** → Indique un champ obligatoire
```html
<input aria-required="true">
```

**aria-invalid** → Signale un champ invalide
```html
<input aria-invalid="true" aria-describedby="pwd-error">
<div id="pwd-error" role="alert">Mot de passe trop court</div>
```

**aria-live** → Annonce les changements dynamiques
```html
<span aria-live="polite">{{ submitStatus }}</span>
```

---

## Slide 36 : Performance - Préférences de mouvement

**Titre:** Respect des préférences de mouvement

**Contenu:**
**Les utilisateurs peuvent réduire les animations (vertiges, nausées)**

**❌ Mauvais :** Animations forcées
```css
.animated-card {
  animation: bounce 2s infinite; /* Toujours actif */
}
```

**✅ Bon :** Respect de prefers-reduced-motion
```css
.animated-card {
  transition: transform 0.3s ease;
}
.animated-card:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .animated-card {
    transition: none;
  }
  .animated-card:hover {
    transform: none;
  }
}
```

**Principes :**
- Animations légères au survol uniquement
- Carrousels contrôlés par l'utilisateur (pas d'autoplay)
- Spinners uniquement pendant chargement actif

---

## Slide 37 : Support du zoom

**Titre:** Interface adaptative au zoom

**Contenu:**
**L'interface doit rester fonctionnelle jusqu'à 200% de zoom**

**❌ Mauvais :** Dimensions fixes
```css
.sidebar {
  width: 250px; /* Largeur fixe */
  font-size: 14px; /* Taille fixe */
}
```

**✅ Bon :** Unités relatives et flexibilité
```css
.sidebar {
  width: 15rem; /* Relatif au root font-size */
  min-width: 200px;
  font-size: 1rem; /* S'adapte aux préférences */
}

.content {
  flex: 1; /* Flexible */
  overflow-wrap: break-word;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 100%;
  }
}
```

**Bonnes pratiques :**
- Utiliser rem/em pour les tailles
- Layouts flexibles (flexbox, grid)
- Bouton pour réduire/étendre les sidebars

---

## Slide 38 : Design responsive

**Titre:** Design adaptatif tous appareils

**Contenu:**
**L'interface doit fonctionner sur tous les appareils**

**Cibles tactiles minimum :** 44px × 44px (WCAG 2.1)

**❌ Mauvais :** Interface fixe desktop
```css
.header {
  width: 1200px; /* Largeur fixe */
}
button {
  padding: 4px 8px; /* Trop petit pour tactile */
}
```

**✅ Bon :** Responsive avec media queries
```css
.header {
  width: 100%; /* Fluide */
  max-width: 1200px;
}

.nav-menu {
  display: none; /* Caché sur mobile */
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex;
  }
  .menu-toggle {
    display: none;
  }
}

button {
  min-height: 44px; /* Taille tactile */
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}
```

**Navigation mobile :** Menu hamburger avec aria-expanded

---

## Slide 39 : Lazy loading et optimisation

**Titre:** Optimisation des ressources

**Contenu:**
**Charger intelligemment pour optimiser les performances**

**❌ Mauvais :** Tout chargé immédiatement
```html
<img src="large-image-5mb.jpg">
<video autoplay preload="auto">...</video>
<script src="app-bundle-2mb.js"></script>
```

**✅ Bon :** Lazy loading et optimisations
```html
<!-- Images lazy loading -->
<img src="placeholder-50kb.jpg"
     data-src="optimized-500kb.webp"
     loading="lazy"
     srcset="image-320.webp 320w,
             image-768.webp 768w,
             image-1200.webp 1200w"
     sizes="(max-width: 768px) 100vw, 50vw">

<!-- Vidéos à la demande -->
<video preload="none" poster="thumbnail.jpg">
  <source src="video.webm" type="video/webm">
</video>

<!-- Code splitting -->
<script type="module">
  import('./feature.js').then(m => m.init());
</script>

<!-- Service Worker -->
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
</script>
```

---

## Slide 40 : Métriques de performance

**Titre:** Mesurer l'impact des optimisations

**Contenu:**
**Indicateurs clés de performance :**

**Sans optimisation :**
- First Paint : 3.2s
- Time to Interactive : 4.5s
- Data usage : ~15 MB

**Avec optimisations (lazy loading + cache) :**
- First Paint : 0.8s ✅
- Time to Interactive : 1.2s ✅
- Data usage : ~200 KB ✅

**Techniques appliquées :**
- Lazy loading des images
- Service Worker avec cache
- Code splitting
- Images WebP responsive
- Compression des ressources

**Résultat :** 75% de réduction du temps de chargement

---

## Slide 41 : Récapitulatif - Points clés

**Titre:** Points clés de l'accessibilité web

**Contenu:**
**Les fondamentaux :**
1. **HTML sémantique** → Structure claire avec les bons éléments
2. **Contrastes WCAG** → Minimum 4.5:1 pour texte normal
3. **Navigation clavier** → Tout doit être accessible au clavier
4. **Labels explicites** → Tous les champs avec labels associés
5. **Textes alternatifs** → Images informatives avec alt descriptif
6. **ARIA avec parcimonie** → HTML natif d'abord, ARIA quand nécessaire
7. **Performance respectueuse** → prefers-reduced-motion, lazy loading
8. **Tests utilisateurs** → 15 min avec lecteur d'écran > heures d'audit

**Citation :** *L'accessibilité n'est pas une contrainte, c'est de l'innovation déguisée.*

---

## Slide 42 : Ressources et outils

**Titre:** Ressources pour aller plus loin

**Contenu:**
**Outils de test :**
- WAVE, axe DevTools, Lighthouse
- Colour Contrast Analyser
- Accessibility Insights

**Lecteurs d'écran :**
- NVDA (Windows, gratuit)
- VoiceOver (Mac, Cmd+F5)
- JAWS (Windows, payant)

**Documentation :**
- MDN Web Accessibility
- WCAG 2.1 Guidelines
- WAI-ARIA Authoring Practices

**Standards :**
- EN 301 549 (Europe)
- WCAG 2.1 Level AA (minimum)
- WCAG 2.1 Level AAA (recommandé)

---

## Slide 43 : Prochaines étapes

**Titre:** Comment commencer ?

**Contenu:**
**Étapes concrètes :**

1. **Installer les outils** (WAVE, axe DevTools, Lighthouse)
2. **Tester avec un lecteur d'écran** (15 minutes sur votre site)
3. **Naviguer au clavier uniquement** (débranchez la souris)
4. **Auditer les contrastes** (Colour Contrast Analyser)
5. **Corriger les erreurs critiques** (labels, alt text, focus)
6. **Impliquer des utilisateurs réels** dans les tests
7. **Former l'équipe** aux bonnes pratiques
8. **Intégrer l'accessibilité** dès la conception

**Rappel :** L'accessibilité est un parcours, pas une destination. Chaque amélioration compte !
