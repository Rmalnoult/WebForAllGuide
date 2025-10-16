<script setup>
import { RouterView, useRoute } from 'vue-router'
import AppNavigation from './components/layout/AppNavigation.vue'
import { useUserPreferences } from './composables/useA11y'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'
import { computed, ref, watch } from 'vue'

const { prefersReducedMotion, prefersHighContrast, prefersDarkMode } = useUserPreferences()
const { showHelpDialog } = useKeyboardShortcuts()
const route = useRoute()
const routeAnnouncement = ref('')

const appClass = computed(() => {
  const classes = ['app']
  if (prefersHighContrast.value) classes.push('high-contrast')
  if (prefersDarkMode.value) classes.push('dark-mode')
  if (prefersReducedMotion.value) classes.push('reduced-motion')
  return classes.join(' ')
})

// Announce route changes for screen readers
watch(() => route.path, (newPath) => {
  const pageNames = {
    '/': 'Page d\'accueil',
    '/semantic-html': 'HTML Sémantique',
    '/keyboard-navigation': 'Navigation Clavier',
    '/media-accessible': 'Images et Médias',
    '/color-contrast': 'Contrastes et Couleurs',
    '/accessible-forms': 'Formulaires accessibles',
    '/aria-components': 'Composants ARIA',
    '/performance': 'Performance et adaptabilité'
  }
  routeAnnouncement.value = `Navigation vers ${pageNames[newPath] || 'nouvelle page'}`

  // Focus main content for accessibility
  setTimeout(() => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
    }
    routeAnnouncement.value = ''
  }, 100)
})
</script>

<template>
  <div :class="appClass" role="application" aria-label="Démo d'accessibilité web">
    <!-- Skip links -->
    <div class="skip-links">
      <a href="#main-content" class="skip-link">
        Aller au contenu principal
      </a>
      <a href="#main-nav" class="skip-link">
        Aller à la navigation
      </a>
    </div>

    <div class="app-layout">
      <!-- Sidebar navigation -->
      <aside
        id="main-nav"
        class="app-sidebar"
        role="complementary"
        aria-label="Barre latérale de navigation"
      >
        <AppNavigation />
      </aside>

      <!-- Main content area -->
      <main
        id="main-content"
        class="app-main"
        role="main"
        aria-label="Contenu principal"
        tabindex="-1"
      >
        <!-- Announcements for screen readers -->
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="sr-only"
        >
          {{ routeAnnouncement }}
        </div>

        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
@import './styles/global.css';

.app {
  min-height: 100vh;
  position: relative;
}

/* Skip links */
.skip-links {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.skip-link {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background: var(--color-primary);
  color: white;
  padding: 1rem 1.5rem;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0 0 0.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.skip-link:focus {
  position: absolute;
  left: 0;
  top: 0;
  width: auto;
  height: auto;
  z-index: 10000;
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.skip-link:nth-child(2):focus {
  left: 200px;
}

.app-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.app-sidebar {
  background: #1D252B;
  border-right: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.app-main {
  --main-padding: 2rem;
  padding: 2rem;
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
  }

  .app-sidebar {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
}

/* High contrast mode */
.high-contrast {
  filter: contrast(1.2);
}

.high-contrast button,
.high-contrast input,
.high-contrast select {
  border-width: 2px !important;
}
</style>