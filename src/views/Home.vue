<template>
  <div class="home">
    <header>
      <h1>Démonstration d'Accessibilité Web</h1>
      <p class="lead">
        Support interactif pour le tech talk de 20 minutes sur l'accessibilité
      </p>
    </header>

    <section aria-labelledby="intro-title">
      <h2 id="intro-title">Pourquoi l'accessibilité ?</h2>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-number">15%</span>
          <span class="stat-label">de la population vit avec un handicap</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">2025</span>
          <span class="stat-label">Directive Accessibilité Europe</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">4.5:1</span>
          <span class="stat-label">Ratio de contraste WCAG AA</span>
        </div>
      </div>

      <h3>L'effet bordure de trottoir</h3>
      <p>
        Une amélioration pour certains profite à tous : les rampes d'accès aident
        les personnes en fauteuil roulant, mais aussi les parents avec poussettes,
        les livreurs, les cyclistes...
      </p>
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

    <section aria-labelledby="keyboard-shortcuts-title">
      <h2 id="keyboard-shortcuts-title">Raccourcis clavier</h2>
      <dl class="shortcuts-list">
        <div>
          <dt><kbd>Tab</kbd></dt>
          <dd>Naviguer entre les éléments interactifs</dd>
        </div>
        <div>
          <dt><kbd>Shift + Tab</kbd></dt>
          <dd>Navigation arrière</dd>
        </div>
        <div>
          <dt><kbd>Entrée</kbd> / <kbd>Espace</kbd></dt>
          <dd>Activer les boutons et liens</dd>
        </div>
        <div>
          <dt><kbd>Échap</kbd></dt>
          <dd>Fermer les modales et menus</dd>
        </div>
        <div>
          <dt><kbd>↑ ↓</kbd></dt>
          <dd>Naviguer dans les listes et menus</dd>
        </div>
      </dl>
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
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
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
  text-align: center;
  border: 2px solid var(--color-border);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
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

.quick-link {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
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
  color: var(--color-primary);
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

@media (prefers-reduced-motion: reduce) {
  .quick-link {
    transition: none;
  }
}
</style>