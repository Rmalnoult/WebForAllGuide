<template>
  <div class="semantic-html">
    <header>
      <h1>HTML Sémantique</h1>
      <p class="lead">
        Utiliser les bons éléments HTML pour structurer le contenu de manière compréhensible
      </p>
    </header>

    <ExampleToggle
      title="Structure de page"
      explanation="Une structure sémantique claire aide les lecteurs d'écran à naviguer et comprendre le contenu. Les éléments de sectionnement (header, nav, main, footer) créent des repères importants."
    >
      <template #bad>
        <div class="page-structure">
          <div class="page-header">
            <div class="site-title">Mon Site</div>
            <div class="navigation">
              <div class="nav-item">Accueil</div>
              <div class="nav-item">À propos</div>
              <div class="nav-item">Contact</div>
            </div>
          </div>
          <div class="page-content">
            <div class="content-title">Bienvenue</div>
            <div>Contenu principal de la page...</div>
          </div>
          <div class="page-footer">
            <div>© 2024 Mon Site</div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="page-structure">
          <header class="page-header">
            <h1 class="site-title">Mon Site</h1>
            <nav aria-label="Navigation principale">
              <ul class="navigation">
                <li><a href="/" class="nav-item">Accueil</a></li>
                <li><a href="/about" class="nav-item">À propos</a></li>
                <li><a href="/contact" class="nav-item">Contact</a></li>
              </ul>
            </nav>
          </header>
          <main class="page-content">
            <h1 class="content-title">Bienvenue</h1>
            <p>Contenu principal de la page...</p>
          </main>
          <footer class="page-footer">
            <p>© 2024 Mon Site</p>
          </footer>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Hiérarchie des titres"
      explanation="Une hiérarchie logique des titres (h1 → h2 → h3) permet aux lecteurs d'écran de créer un plan de navigation et aux utilisateurs de comprendre la structure du contenu."
    >
      <template #bad>
        <article class="article-demo">
          <div class="title-large">Introduction à l'accessibilité</div>
          <p>L'accessibilité web est importante...</p>

          <div class="title-medium">Techniques de base</div>
          <p>Voici quelques techniques...</p>

          <div class="title-medium">HTML sémantique</div>
          <p>Le HTML sémantique...</p>

          <div class="title-small">Éléments de structure</div>
          <p>Les éléments comme header, nav...</p>

          <div class="title-medium">CSS et accessibilité</div>
          <p>Le CSS peut améliorer...</p>
        </article>
      </template>

      <template #good>
        <article class="article-demo">
          <h1>Introduction à l'accessibilité</h1>
          <p>L'accessibilité web est importante...</p>

          <h2>Techniques de base</h2>
          <p>Voici quelques techniques...</p>

          <h3>HTML sémantique</h3>
          <p>Le HTML sémantique...</p>

          <h4>Éléments de structure</h4>
          <p>Les éléments comme header, nav...</p>

          <h3>CSS et accessibilité</h3>
          <p>Le CSS peut améliorer...</p>
        </article>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Boutons vs éléments cliquables"
      explanation="Utiliser les bons éléments pour les actions : boutons pour les actions, liens pour la navigation. Cela garantit la bonne sémantique et les comportements clavier attendus."
    >
      <template #bad>
        <div class="actions-demo">
          <div class="action-item" @click="handleSave" style="cursor: pointer;">
            💾 Sauvegarder
          </div>
          <div class="action-item" @click="handleDelete" style="cursor: pointer;">
            🗑️ Supprimer
          </div>
          <div class="action-item" @click="navigateToProfile" style="cursor: pointer;">
            👤 Voir le profil
          </div>
          <span class="action-item" @click="toggleModal" style="cursor: pointer;">
            ℹ️ Plus d'infos
          </span>
        </div>
      </template>

      <template #good>
        <div class="actions-demo">
          <button type="button" class="action-item" @click="handleSave">
            💾 Sauvegarder
          </button>
          <button type="button" class="action-item" @click="handleDelete">
            🗑️ Supprimer
          </button>
          <a href="/profile" class="action-item">
            👤 Voir le profil
          </a>
          <button type="button" class="action-item" @click="toggleModal">
            ℹ️ Plus d'infos
          </button>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Listes et données structurées"
      explanation="Utiliser les éléments de liste appropriés permet aux lecteurs d'écran d'annoncer le nombre d'éléments et de faciliter la navigation."
    >
      <template #bad>
        <div class="list-demo">
          <div class="list-title">Ingrédients pour une omelette :</div>
          <div class="list-content">
            <div>3 œufs</div>
            <div>2 cuillères à soupe de lait</div>
            <div>Sel et poivre</div>
            <div>1 cuillère à soupe de beurre</div>
          </div>

          <div class="list-title">Étapes :</div>
          <div class="list-content">
            <div>1. Battre les œufs avec le lait</div>
            <div>2. Faire chauffer le beurre</div>
            <div>3. Verser les œufs et cuire</div>
            <div>4. Plier en deux et servir</div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="list-demo">
          <h3>Ingrédients pour une omelette :</h3>
          <ul>
            <li>3 œufs</li>
            <li>2 cuillères à soupe de lait</li>
            <li>Sel et poivre</li>
            <li>1 cuillère à soupe de beurre</li>
          </ul>

          <h3>Étapes :</h3>
          <ol>
            <li>Battre les œufs avec le lait</li>
            <li>Faire chauffer le beurre</li>
            <li>Verser les œufs et cuire</li>
            <li>Plier en deux et servir</li>
          </ol>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import ExampleToggle from '@/components/common/ExampleToggle.vue'

// Simulated action handlers
function handleSave() {
  alert('Sauvegardé !')
}

function handleDelete() {
  if (confirm('Êtes-vous sûr de vouloir supprimer ?')) {
    alert('Supprimé !')
  }
}

function navigateToProfile() {
  alert('Navigation vers le profil (simulated)')
}

function toggleModal() {
  alert('Modal ouverte (simulated)')
}
</script>

<style scoped>
.semantic-html {
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

/* Page structure demo styles */
.page-structure {
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  overflow: hidden;
  font-size: 0.9rem;
}

.page-header {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.site-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.navigation {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  color: var(--color-primary);
  border-radius: 0.25rem;
}

.nav-item:hover {
  background: var(--color-primary-light);
}

.page-content {
  padding: 1.5rem;
}

.content-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.page-footer {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.85rem;
}

/* Article demo styles */
.article-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.title-large {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.title-medium {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1.5rem 0 0.75rem 0;
}

.title-small {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

.article-demo h1 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.article-demo h2 {
  font-size: 1.25rem;
  margin: 1.5rem 0 0.75rem 0;
}

.article-demo h3 {
  font-size: 1.1rem;
  margin: 1.25rem 0 0.5rem 0;
}

.article-demo h4 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem 0;
}

.article-demo p {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* Actions demo styles */
.actions-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-item {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.action-item:hover {
  background: var(--color-primary-dark);
}

.action-item:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* Lists demo styles */
.list-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.list-title {
  font-weight: bold;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.list-title:first-child {
  margin-top: 0;
}

.list-content div {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.list-demo h3 {
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.list-demo h3:first-child {
  margin-top: 0;
}

.list-demo ul,
.list-demo ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.list-demo li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

@media (prefers-reduced-motion: reduce) {
  .action-item {
    transition: none;
  }
}
</style>