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
    </section>

    <section aria-labelledby="curb-cut-title">
      <h2 id="curb-cut-title">L'effet bordure de trottoir (curb cut effect)</h2>

      <div class="curb-cut-intro">
        <div class="curb-cut-text">
          <p>
            Quand on conçoit pour le handicap, on résout des problèmes que tout le monde rencontre.
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

/* Curb-cut intro with image */
.curb-cut-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.curb-cut-text p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.curb-cut-image {
  text-align: center;
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
  border: 1px solid var(--color-border);
}

.curb-cut-example h4 {
  color: var(--color-primary);
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
  text-align: center;
  font-size: 1.25rem;
}

.accessibility-quote strong {
  color: var(--color-primary);
}

@media (prefers-reduced-motion: reduce) {
  .quick-link {
    transition: none;
  }
}
</style>
