<template>
  <nav aria-label="Navigation principale" class="app-nav">
    <ul role="list">
      <li v-for="item in navItems" :key="item.path">
        <router-link
          :to="item.path"
          :aria-current="$route.path === item.path ? 'page' : undefined"
          @click="announceNavigation(item.label)"
        >
          <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useAnnounce } from '../../composables/useA11y'

const { announce } = useAnnounce()

const navItems = [
  { path: '/', label: 'Accueil', icon: '🏠' },
  { path: '/semantic-html', label: 'HTML Sémantique', icon: '📝' },
  { path: '/keyboard-navigation', label: 'Navigation Clavier', icon: '⌨️' },
  { path: '/media-accessible', label: 'Images & Médias', icon: '🖼️' },
  { path: '/color-contrast', label: 'Contrastes & Couleurs', icon: '🎨' },
  { path: '/accessible-forms', label: 'Formulaires', icon: '📋' },
  { path: '/aria-components', label: 'ARIA & Dynamique', icon: '🔄' },
  { path: '/performance', label: 'Performance', icon: '⚡' }
]

const announceNavigation = (label) => {
  announce(`Navigation vers ${label}`)
}
</script>

<style scoped>
.app-nav {
  background: var(--color-bg-secondary);
  padding: 1rem;
  min-height: 100vh;
  border-right: 2px solid var(--color-border);
}


.app-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.app-nav li {
  margin-bottom: 0.5rem;
}

.app-nav a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.app-nav a:hover {
  background: var(--color-hover);
}

.app-nav a:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.app-nav a[aria-current="page"] {
  background: var(--color-primary);
  color: white;
  font-weight: 600;
}

.app-nav a[aria-current="page"]:hover {
  background: var(--color-primary-dark);
}

.app-nav a[aria-current="page"]:active {
  background: var(--color-primary-darker);
}

.nav-icon {
  font-size: 1.25rem;
  width: 1.5rem;
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .app-nav a {
    transition: none;
  }
}
</style>