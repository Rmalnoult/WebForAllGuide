<template>
  <nav aria-label="Breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="item.path"
        class="breadcrumb-item"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <router-link
          v-if="index < breadcrumbs.length - 1"
          :to="item.path"
          itemprop="item"
          class="breadcrumb-link"
        >
          <span itemprop="name">{{ item.label }}</span>
        </router-link>
        <span v-else itemprop="name" aria-current="page" class="breadcrumb-current">
          {{ item.label }}
        </span>
        <meta itemprop="position" :content="String(index + 1)" />
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Map des routes vers leurs labels
const routeLabels = {
  '/': 'Accueil',
  '/semantic-html': 'HTML Sémantique',
  '/keyboard-navigation': 'Navigation Clavier',
  '/media-accessible': 'Images et Médias',
  '/color-contrast': 'Contrastes et Couleurs',
  '/accessible-forms': 'Formulaires Accessibles',
  '/aria-components': 'Composants ARIA',
  '/performance': 'Performance et Adaptabilité'
}

const breadcrumbs = computed(() => {
  const crumbs = []

  // Toujours ajouter l'accueil
  crumbs.push({
    label: 'Accueil',
    path: '/'
  })

  // Si on n'est pas sur la page d'accueil, ajouter la page actuelle
  if (route.path !== '/') {
    const label = routeLabels[route.path] || 'Page'
    crumbs.push({
      label,
      path: route.path
    })
  }

  return crumbs
})
</script>

<style scoped>
.breadcrumb-nav {
  margin-bottom: 1.5rem;
  padding: 0.75rem 0;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin-left: 0.5rem;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.breadcrumb-link {
  color: var(--color-link);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
}

.breadcrumb-link:hover {
  color: var(--color-link-hover);
  text-decoration: underline;
}

.breadcrumb-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.breadcrumb-current {
  color: var(--color-text);
  font-weight: 600;
  padding: 0.25rem 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .breadcrumb {
    font-size: 0.8125rem;
  }

  .breadcrumb-item:not(:last-child)::after {
    margin-left: 0.375rem;
  }
}

/* Animations désactivées si préférence réduite */
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-link {
    transition: none;
  }
}
</style>
