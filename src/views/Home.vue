<template>
  <div class="home">
    <header>
      <h1>Guide Pratique de l'Accessibilité Web</h1>
      <p class="lead">
        L'accessibilité, c'est garantir un web utilisable par tous : personnes en situation de handicap,
        seniors, utilisateurs mobiles, connexions lentes, bras cassé, environnement bruyant, etc.
      </p>
    </header>

    <section aria-labelledby="intro-title">
      <h2 id="intro-title">Pourquoi l'accessibilité ?</h2>

      <div class="stats-grid">
        <a href="https://www.un.org/fr/observances/day-of-persons-with-disabilities/background" class="stat-card stat-card-link" target="_blank" rel="noopener">
          <span class="stat-number">15%</span>
          <span class="stat-label">de la population mondiale vit avec un handicap ↗</span>
        </a>
        <a href="https://ec.europa.eu/social/main.jsp?catId=1202" class="stat-card stat-card-link" target="_blank" rel="noopener">
          <span class="stat-number">2025</span>
          <span class="stat-label">Directive Accessibilité Europe ↗</span>
        </a>
        <a href="https://webaim.org/projects/million/#intro" class="stat-card stat-card-link" target="_blank" rel="noopener">
          <span class="stat-number">94.8%</span>
          <span class="stat-label">des sites ont des erreurs d'accessibilité ↗</span>
        </a>
      </div>
    </section>

    <section aria-labelledby="curb-cut-title">
      <div class="curb-cut-intro">
          <div class="curb-cut-text">
            <h2 id="curb-cut-title">Quand on conçoit pour le handicap, on résout des problèmes que tout le monde rencontre</h2>
            <p>
              Les rampes de trottoir ont révolutionné la ville pour les fauteuils roulants,
              mais aussi pour 99% des piétons avec valises, poussettes ou vélos.
            </p>
            <p>
              Une amélioration pour certains profite à tous. Ce concept, né des rampes d'accès dans les rues,
              s'applique parfaitement au web.
            </p>
          </div>
          <div class="curb-cut-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Naked_Pictures_of_Bea_Arthur_0048.jpg/1920px-Naked_Pictures_of_Bea_Arthur_0048.jpg"
              alt="Rampe de trottoir (curb cut) permettant l'accès depuis la rue au trottoir"
              loading="lazy"
            />
            <p class="image-caption">Exemple typique d'une rampe de trottoir (curb cut)</p>
          </div>
        </div>

      <div class="curb-cut-examples">
        <div class="curb-cut-example">
          <h4>♿ Rampes de trottoir</h4>
          <p><strong>Conçues pour :</strong> Personnes en fauteuil roulant</p>
          <p><strong>Bénéficient aussi à :</strong> Parents avec poussettes, cyclistes, livreurs avec diables,
          personnes avec valises à roulettes, skateboards, trottinettes, personnes âgées</p>
        </div>

        <div class="curb-cut-example">
          <h4>🎬 Sous-titres vidéo</h4>
          <p><strong>Conçus pour :</strong> Personnes sourdes ou malentendantes</p>
          <p><strong>Bénéficient aussi à :</strong> Regarder des vidéos dans le métro, apprendre une langue étrangère,
          suivre une conférence dans un environnement bruyant, comprendre des accents difficiles</p>
        </div>

        <div class="curb-cut-example">
          <h4>⌨️ Navigation au clavier</h4>
          <p><strong>Conçue pour :</strong> Personnes ne pouvant pas utiliser une souris</p>
          <p><strong>Bénéficie aussi à :</strong> Développeurs utilisant des raccourcis, utilisateurs avec souris cassée,
          power users préférant le clavier, personnes avec bras dans le plâtre</p>
        </div>

        <div class="curb-cut-example">
          <h4>📱 Commande vocale smartphone</h4>
          <p><strong>Conçue pour :</strong> Personnes aveugles et avec handicap moteur</p>
          <p><strong>Bénéficie aussi à :</strong> Messages en conduisant, sport avec écouteurs,
          mains occupées par des outils, contrôle à distance, multitâche au bureau</p>
        </div>

        <div class="curb-cut-example">
          <h4>🪥 Brosse à dents électrique</h4>
          <p><strong>Conçue pour :</strong> Personnes avec mobilité réduite ou arthrite (1954)</p>
          <p><strong>Bénéficie aussi à :</strong> Meilleur brossage pour tous, recommandée par les dentistes,
          enfants qui apprennent, personnes fatiguées, efficacité supérieure prouvée</p>
        </div>

        <div class="curb-cut-example">
          <h4>🎧 Livres audio</h4>
          <p><strong>Conçus pour :</strong> Personnes aveugles (1932, American Foundation for the Blind)</p>
          <p><strong>Bénéficient aussi à :</strong> Conducteurs, joggers, multitâche, dyslexiques,
          enfants qui apprennent à lire, 1.3 milliard $ de ventes en 2020</p>
        </div>
      </div>

      <p class="accessibility-quote">
        <strong>L'accessibilité n'est pas une contrainte, c'est de l'innovation déguisée.</strong>
      </p>
    </section>

    <section aria-labelledby="tools-title">
      <h2 id="tools-title">Outils gratuits pour tester l'accessibilité</h2>
      <p>Ces outils vous aident à identifier et corriger les problèmes d'accessibilité :</p>

      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🌊</span>
            <h3>WAVE</h3>
          </div>
          <p class="tool-description">Extension navigateur qui visualise les erreurs d'accessibilité directement sur votre page</p>
          <div class="tool-features">
            <span class="tool-feature">✓ Analyse en temps réel</span>
            <span class="tool-feature">✓ Visualisation des erreurs</span>
            <span class="tool-feature">✓ Rapport détaillé</span>
          </div>
          <a href="https://wave.webaim.org/" class="tool-link" target="_blank" rel="noopener">
            Installer WAVE
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🪓</span>
            <h3>axe DevTools</h3>
          </div>
          <p class="tool-description">Extension développeur intégrée aux DevTools, très précise et détaillée</p>
          <div class="tool-features">
            <span class="tool-feature">✓ Intégré aux DevTools</span>
            <span class="tool-feature">✓ Tests automatisés</span>
            <span class="tool-feature">✓ Suggestions de correction</span>
          </div>
          <a href="https://www.deque.com/axe/devtools/" class="tool-link" target="_blank" rel="noopener">
            Installer axe DevTools
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🏮</span>
            <h3>Lighthouse</h3>
          </div>
          <p class="tool-description">Audit intégré à Chrome DevTools, inclut un score d'accessibilité global</p>
          <div class="tool-features">
            <span class="tool-feature">✓ Déjà dans Chrome</span>
            <span class="tool-feature">✓ Score global</span>
            <span class="tool-feature">✓ Recommandations</span>
          </div>
          <a href="https://developer.chrome.com/docs/lighthouse/accessibility/" class="tool-link" target="_blank" rel="noopener">
            Guide Lighthouse
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">📚</span>
            <h3>MDN Accessibility</h3>
          </div>
          <p class="tool-description">Documentation de référence complète sur l'accessibilité web</p>
          <div class="tool-features">
            <span class="tool-feature">✓ Guides détaillés</span>
            <span class="tool-feature">✓ Exemples pratiques</span>
            <span class="tool-feature">✓ Mises à jour régulières</span>
          </div>
          <a href="https://developer.mozilla.org/fr/docs/Web/Accessibility" class="tool-link" target="_blank" rel="noopener">
            Documentation MDN
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🎨</span>
            <h3>Colour Contrast Analyser</h3>
          </div>
          <p class="tool-description">Application gratuite pour tester les contrastes de couleurs selon WCAG</p>
          <div class="tool-features">
            <span class="tool-feature">✓ Test en temps réel</span>
            <span class="tool-feature">✓ Pipette de couleur</span>
            <span class="tool-feature">✓ Ratios WCAG AA/AAA</span>
          </div>
          <a href="https://www.tpgi.com/color-contrast-checker/" class="tool-link" target="_blank" rel="noopener">
            Télécharger CCA
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🔍</span>
            <h3>Accessibility Insights</h3>
          </div>
          <p class="tool-description">Suite d'outils Microsoft pour tests manuels et automatiques approfondis</p>
          <div class="tool-features">
            <span class="tool-feature">✓ Tests guidés</span>
            <span class="tool-feature">✓ Ordre de focus visuel</span>
            <span class="tool-feature">✓ FastPass automatique</span>
          </div>
          <a href="https://accessibilityinsights.io/" class="tool-link" target="_blank" rel="noopener">
            Installer AI
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div class="pro-tip">
        <strong>💡 Conseil pro :</strong> Utilisez ces outils en complément, pas en remplacement des tests utilisateurs réels.
        Aucun outil automatique ne peut détecter 100% des problèmes d'accessibilité.
      </div>
    </section>

    <section aria-labelledby="screen-readers-title">
      <h2 id="screen-readers-title">Lecteurs d'écran courants</h2>
      <p>Comprendre les lecteurs d'écran les plus utilisés pour mieux tester vos interfaces :</p>

      <div class="screen-readers-grid">
        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🖥️</span>
            <h3>NVDA</h3>
            <span class="platform-tag">Windows</span>
          </div>
          <p>Lecteur d'écran gratuit et open source, très populaire</p>
          <div class="screen-reader-stats">
            <span class="stat">✓ Gratuit</span>
            <span class="stat">41% d'usage</span>
          </div>
          <a href="https://www.nvaccess.org/" class="screen-reader-link" target="_blank" rel="noopener">
            Télécharger NVDA
          </a>
        </div>

        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🖥️</span>
            <h3>JAWS</h3>
            <span class="platform-tag">Windows</span>
          </div>
          <p>Lecteur d'écran professionnel, leader historique du marché</p>
          <div class="screen-reader-stats">
            <span class="stat">💰 Payant</span>
            <span class="stat">40% d'usage</span>
          </div>
          <a href="https://www.freedomscientific.com/products/software/jaws/" class="screen-reader-link" target="_blank" rel="noopener">
            Site officiel JAWS
          </a>
        </div>

        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🍎</span>
            <h3>VoiceOver</h3>
            <span class="platform-tag">macOS/iOS</span>
          </div>
          <p>Lecteur d'écran intégré à tous les appareils Apple</p>
          <div class="screen-reader-stats">
            <span class="stat">✓ Intégré</span>
            <span class="stat">8% d'usage</span>
          </div>
          <div class="shortcut-tip">
            <strong>Raccourci :</strong> <kbd>Cmd</kbd> + <kbd>F5</kbd>
          </div>
        </div>

        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🤖</span>
            <h3>TalkBack</h3>
            <span class="platform-tag">Android</span>
          </div>
          <p>Lecteur d'écran par défaut sur Android</p>
          <div class="screen-reader-stats">
            <span class="stat">✓ Intégré</span>
            <span class="stat">Usage mobile</span>
          </div>
          <div class="shortcut-tip">
            <strong>Activation :</strong> Paramètres > Accessibilité
          </div>
        </div>
      </div>

      <div class="testing-tip">
        <h4>🧪 Comment tester avec un lecteur d'écran</h4>
        <ol>
          <li><strong>Fermez les yeux</strong> ou éteignez l'écran</li>
          <li><strong>Naviguez uniquement au clavier</strong> (Tab, flèches, Entrée, Espace)</li>
          <li><strong>Écoutez attentivement</strong> ce qui est annoncé</li>
          <li><strong>Vérifiez que tout est compréhensible</strong> sans voir l'écran</li>
        </ol>
        <p class="testing-note">
          <strong>Note :</strong> 15 minutes de test avec un lecteur d'écran valent plus que des heures d'audit automatique.
        </p>
      </div>
    </section>

    <section aria-labelledby="nav-title">
      <h2 id="nav-title">Navigation rapide</h2>
      <p>Utilisez le menu latéral ou ces raccourcis pour explorer les exemples :</p>

      <nav aria-label="Navigation secondaire">
        <ul class="quick-nav">
          <li v-for="item in quickLinks" :key="item.path">
            <router-link :to="item.path" class="quick-link">
              <span class="quick-icon" aria-hidden="true">{{ item.icon }}</span>
              <span class="quick-title">{{ item.title }}</span>
              <span class="quick-desc">{{ item.description }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </section>

  </div>
</template>

<script setup>
const quickLinks = [
  {
    path: '/semantic-html',
    icon: '📝',
    title: 'HTML Sémantique',
    description: 'Structure, titres, boutons vs liens'
  },
  {
    path: '/keyboard-navigation',
    icon: '⌨️',
    title: 'Navigation Clavier',
    description: 'Focus visible, trap, modal accessible'
  },
  {
    path: '/media-accessible',
    icon: '🖼️',
    title: 'Images & Médias',
    description: 'Alt text, vidéos avec sous-titres'
  },
  {
    path: '/color-contrast',
    icon: '🎨',
    title: 'Contrastes',
    description: 'WCAG, daltonisme, thèmes'
  },
  {
    path: '/accessible-forms',
    icon: '📋',
    title: 'Formulaires',
    description: 'Labels, validation, messages'
  },
  {
    path: '/aria-components',
    icon: '🔄',
    title: 'ARIA',
    description: 'Accordion, toast, tableau triable'
  },
  {
    path: '/performance',
    icon: '⚡',
    title: 'Performance',
    description: 'Reduced motion, zoom, adaptabilité'
  }
]
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  text-align: left;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-text);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

section {
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-card {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: left;
}

.stat-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  cursor: pointer;
}

.stat-card-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--color-primary-light);
}

.stat-card-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-text);
}

.stat-label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.quick-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.quick-nav li {
  display: flex;
}

.quick-link {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.quick-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.quick-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.quick-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.quick-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.quick-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.shortcuts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.shortcuts-list div {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.shortcuts-list dt {
  flex-shrink: 0;
}

kbd {
  display: inline-block;
  padding: 0.2rem 0.4rem;
  font-size: 0.85rem;
  font-family: monospace;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

/* Curb-cut intro with image */
.curb-cut-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.curb-cut-text h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.curb-cut-text p {
  margin-bottom: 1rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.curb-cut-image {
  text-align: left;
}

.curb-cut-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-caption {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-style: italic;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .curb-cut-intro {
    grid-template-columns: 1fr;
  }

  .curb-cut-image {
    order: -1;
  }
}

/* Curb-cut examples */
.curb-cut-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.curb-cut-example {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.curb-cut-example h4 {
  color: var(--color-text);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.curb-cut-example p {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
}

.curb-cut-example p:last-child {
  margin-bottom: 0;
}

.curb-cut-example strong {
  color: var(--color-text);
  display: inline-block;
  margin-right: 0.25rem;
}


/* Accessibility quote */
.accessibility-quote {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-info-light) 100%);
  border-radius: 1rem;
  text-align: left;
  font-size: 1.25rem;
}

.accessibility-quote strong {
  color: var(--color-text);
}

/* Tools section */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tool-card {
  background: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.tool-icon {
  font-size: 1.5rem;
}

.tool-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
}

.tool-description {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.tool-features {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.tool-feature {
  font-size: 0.9rem;
  color: var(--color-success);
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  border: 2px solid var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s, color 0.2s;
}

.tool-link:hover {
  background-color: var(--color-text);
  color: white;
}

.tool-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.pro-tip {
  background: var(--color-warning-light);
  border: 2px solid var(--color-warning);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.pro-tip strong {
  color: var(--color-warning-dark);
}

/* Screen readers section */
.screen-readers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.screen-reader-card {
  background: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.screen-reader-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.screen-reader-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.screen-reader-icon {
  font-size: 1.5rem;
}

.screen-reader-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  flex: 1;
}

.platform-tag {
  background: var(--color-info-light);
  color: var(--color-info-dark);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.screen-reader-stats {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.stat {
  background: var(--color-bg);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
}

.screen-reader-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  border: 2px solid var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s, color 0.2s;
  margin-top: 1rem;
}

.screen-reader-link:hover {
  background-color: var(--color-text);
  color: white;
}

.screen-reader-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.shortcut-tip {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-bg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
}

.testing-tip {
  background: var(--color-info-light);
  border: 2px solid var(--color-info);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 2rem;
}

.testing-tip h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--color-info-dark);
}

.testing-tip ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.testing-tip li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.testing-note {
  margin-bottom: 0;
  font-style: italic;
  background: rgba(255, 255, 255, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .quick-link,
  .tool-card,
  .screen-reader-card,
  .stat-card-link {
    transition: none;
  }
}
</style>
