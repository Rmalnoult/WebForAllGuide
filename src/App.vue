<script setup>
import { RouterView, useRoute } from 'vue-router'
import AppNavigation from './components/layout/AppNavigation.vue'
import AboutModal from './components/common/AboutModal.vue'
import { useUserPreferences } from './composables/useA11y'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'
import { useSEO } from './composables/useSEO'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

const { prefersReducedMotion, prefersHighContrast, prefersDarkMode } = useUserPreferences()
const { showHelpDialog } = useKeyboardShortcuts()
useSEO() // Initialize SEO management
const route = useRoute()
const routeAnnouncement = ref('')
const isMobileMenuOpen = ref(false)
const showAboutModal = ref(false)

const appClass = computed(() => {
  const classes = ['app']
  if (prefersHighContrast.value) classes.push('high-contrast')
  if (prefersDarkMode.value) classes.push('dark-mode')
  if (prefersReducedMotion.value) classes.push('reduced-motion')
  if (isMobileMenuOpen.value) classes.push('mobile-menu-open')
  return classes.join(' ')
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }
}

// Close menu on escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
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

  // Close mobile menu on route change
  closeMobileMenu()

  // Clear announcement after screen readers have read it
  setTimeout(() => {
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

    <!-- Mobile burger button -->
    <button
      class="burger-button"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="main-nav"
      aria-label="Menu de navigation"
      @click="toggleMobileMenu"
    >
      <span class="burger-icon" aria-hidden="true">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </span>
      <span class="sr-only">{{ isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
    </button>

    <div class="app-layout">
      <!-- Mobile backdrop overlay -->
      <div
        v-if="isMobileMenuOpen"
        class="mobile-backdrop"
        @click="closeMobileMenu"
        aria-hidden="true"
      ></div>

      <!-- Sidebar navigation -->
      <aside
        id="main-nav"
        :class="['app-sidebar', { 'mobile-open': isMobileMenuOpen }]"
        role="complementary"
        aria-label="Barre latérale de navigation"
      >
        <AppNavigation @open-about="showAboutModal = true" />
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

        <!-- Footer -->
        <footer class="app-footer" role="contentinfo">
          <p class="copyright">
            © {{ new Date().getFullYear() }} Romain Malnoult. Tous droits réservés.
          </p>
        </footer>
      </main>
    </div>

    <!-- About Modal -->
    <AboutModal v-model="showAboutModal" />
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
  border-radius: 0 0 0.625rem 0;
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
  background: #0C0C0C;
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
  display: flex;
  flex-direction: column;
}

/* Footer */
.app-footer {
  margin-top: auto;
  padding-top: 3rem;
  padding-bottom: 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.copyright {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  opacity: 0.8;
}

/* Mobile burger button - stays fixed while scrolling */
.burger-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1002; /* Above sidebar (1000) and backdrop (999) */
  display: none;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.95) !important;
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  cursor: pointer;
  transition: left 0.3s ease-in-out, background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.burger-button:hover {
  background: rgba(248, 248, 248, 0.98) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.burger-button:active {
  background: rgba(240, 240, 240, 0.98) !important;
  transform: scale(0.98);
}

.burger-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.burger-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0.25rem 0;
}

.burger-line {
  display: block;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

/* Burger animation when open - move to right side of menu */
.mobile-menu-open .burger-button {
  left: calc(280px - 3rem - 1rem);
  background: rgba(255, 255, 255, 0.98) !important;
}

.mobile-menu-open .burger-button:hover {
  background: rgba(248, 248, 248, 1) !important;
}

.mobile-menu-open .burger-button:active {
  background: rgba(240, 240, 240, 1) !important;
}

.mobile-menu-open .burger-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.mobile-menu-open .burger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-open .burger-line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile backdrop */
.mobile-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* Responsive */
@media (max-width: 768px) {
  .burger-button {
    display: block;
  }

  .mobile-backdrop {
    display: block;
  }

  .app-layout {
    grid-template-columns: 1fr;
  }

  .app-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    max-width: 80vw;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    border-right: 1px solid var(--color-border);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  }

  .app-sidebar.mobile-open {
    transform: translateX(0);
  }

  .app-main {
    padding: 5rem 1rem 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .burger-button {
    transition: none;
  }

  .burger-button:hover {
    transform: none;
  }

  .burger-line {
    transition: none;
  }

  .app-sidebar {
    transition: none;
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