<template>
  <nav
    aria-label="Navigation principale"
    class="app-nav"
    role="navigation"
    @keydown="handleNavKeydown"
  >
    <ul role="list">
      <li v-for="(item, index) in navItems" :key="item.path">
        <router-link
          :to="item.path"
          :ref="el => navItemRefs[index] = el"
          :aria-current="$route.path === item.path ? 'page' : undefined"
          :aria-label="`${item.label} - ${item.description}`"
          :tabindex="focusedNavIndex === index ? 0 : -1"
          @click="announceNavigation(item.label)"
          @focus="focusedNavIndex = index"
        >
          <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
          <span class="nav-text">
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-description">{{ item.description }}</span>
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnounce } from '../../composables/useA11y'

const route = useRoute()
const { announce } = useAnnounce()

// Navigation refs and state
const navItemRefs = ref([])
const focusedNavIndex = ref(0)

const navItems = [
  { path: '/', label: 'Accueil', icon: '🏠', description: 'Page d\'accueil et présentation' },
  { path: '/semantic-html', label: 'HTML Sémantique', icon: '📝', description: 'Structure et éléments HTML' },
  { path: '/keyboard-navigation', label: 'Navigation Clavier', icon: '⌨️', description: 'Focus et raccourcis' },
  { path: '/media-accessible', label: 'Images & Médias', icon: '🖼️', description: 'Alt text et sous-titres' },
  { path: '/color-contrast', label: 'Contrastes & Couleurs', icon: '🎨', description: 'Ratios WCAG et daltonisme' },
  { path: '/accessible-forms', label: 'Formulaires', icon: '📋', description: 'Labels et validation' },
  { path: '/aria-components', label: 'ARIA', icon: '🔄', description: 'Attributs et composants ARIA' },
  { path: '/performance', label: 'Performance', icon: '⚡', description: 'Optimisation et adaptabilité' }
]

const announceNavigation = (label) => {
  announce(`Navigation vers ${label}`)
}

// Keyboard navigation for menu items
function handleNavKeydown(event) {
  const itemCount = navItems.length

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusedNavIndex.value = (focusedNavIndex.value + 1) % itemCount
      focusNavItem(focusedNavIndex.value)
      break

    case 'ArrowUp':
      event.preventDefault()
      focusedNavIndex.value = focusedNavIndex.value === 0
        ? itemCount - 1
        : focusedNavIndex.value - 1
      focusNavItem(focusedNavIndex.value)
      break

    case 'Home':
      event.preventDefault()
      focusedNavIndex.value = 0
      focusNavItem(0)
      announce('Début de la navigation')
      break

    case 'End':
      event.preventDefault()
      focusedNavIndex.value = itemCount - 1
      focusNavItem(itemCount - 1)
      announce('Fin de la navigation')
      break

    case 'Enter':
    case ' ':
      // Navigation is handled by router-link, just announce
      if (navItemRefs.value[focusedNavIndex.value]) {
        event.preventDefault()
        navItemRefs.value[focusedNavIndex.value].$el.click()
      }
      break
  }
}

// Focus a specific navigation item
async function focusNavItem(index) {
  await nextTick()
  if (navItemRefs.value[index] && navItemRefs.value[index].$el) {
    navItemRefs.value[index].$el.focus()
  }
}

// Set initial focus based on current route
onMounted(() => {
  const currentIndex = navItems.findIndex(item => item.path === route.path)
  if (currentIndex >= 0) {
    focusedNavIndex.value = currentIndex
  }
})

// Update focus when route changes
watch(() => route.path, (newPath) => {
  const currentIndex = navItems.findIndex(item => item.path === newPath)
  if (currentIndex >= 0) {
    focusedNavIndex.value = currentIndex
  }
})
</script>

<style scoped>
.app-nav {
  background: #0C0C0C;
  padding: 1rem;
  min-height: 100vh;
  border-right: 2px solid var(--color-border);
}

.nav-header {
  padding: 0.5rem 1rem 1rem;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: 1rem;
}

.nav-title {
  font-size: 1.25rem;
  color: white;
  margin: 0;
  font-weight: 600;
}

.nav-hint {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  opacity: 0.8;
  text-align: center;
}

.nav-hint kbd {
  display: inline-block;
  padding: 0.1rem 0.3rem;
  margin: 0 0.1rem;
  font-size: 0.7rem;
  font-family: monospace;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
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
  color: #E8E6E3;
  text-decoration: none;
  border-radius: 0.625rem;
  transition: background-color 0.2s;
}

.app-nav a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.app-nav a:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
  background: rgba(255, 255, 255, 0.1);
}

.app-nav a:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* Visual indicator for keyboard navigation */
.app-nav a[tabindex="0"] {
  position: relative;
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
  flex-shrink: 0;
}

.nav-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.nav-label {
  font-weight: 500;
}

.nav-description {
  font-size: 0.75rem;
  color: #B8B5B0;
  opacity: 0.9;
}

.app-nav a[aria-current="page"] .nav-description {
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 768px) {
  .app-nav {
    padding-top: 4.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-nav a {
    transition: none;
  }
}
</style>