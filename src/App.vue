<script setup>
import { RouterView } from 'vue-router'
import AppNavigation from './components/layout/AppNavigation.vue'
import { useUserPreferences } from './composables/useA11y'
import { computed } from 'vue'

const { prefersReducedMotion, prefersHighContrast, prefersDarkMode } = useUserPreferences()

const appClass = computed(() => {
  const classes = ['app']
  if (prefersHighContrast.value) classes.push('high-contrast')
  if (prefersDarkMode.value) classes.push('dark-mode')
  if (prefersReducedMotion.value) classes.push('reduced-motion')
  return classes.join(' ')
})
</script>

<template>
  <div :class="appClass">
    <a href="#main-content" class="sr-only sr-only-focusable">
      Aller au contenu principal
    </a>

    <div class="app-layout">
      <aside class="app-sidebar">
        <AppNavigation />
      </aside>

      <main id="main-content" class="app-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
@import './styles/global.css';

.app {
  min-height: 100vh;
}

.app-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.app-sidebar {
  background: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.app-main {
  padding: 2rem;
  max-width: 1200px;
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