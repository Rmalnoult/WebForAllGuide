<template>
  <div class="example-toggle card" :data-card-title="title">
    <div class="toggle-header">
      <h3>{{ title }}</h3>

      <!-- Menu déroulant discret -->
      <div class="dropdown-menu" ref="dropdownContainer">
        <button
          class="menu-trigger"
          @click="toggleDropdown"
          @keydown.escape="closeDropdown(true)"
          @keydown.arrow-down.prevent="focusFirstItem"
          type="button"
          :aria-expanded="isDropdownOpen"
          aria-haspopup="true"
          :aria-label="`Options pour l'exemple ${title}`"
          ref="triggerButton"
        >
          <span class="dots" aria-hidden="true">⋯</span>
        </button>

        <div
          v-show="isDropdownOpen"
          class="dropdown-content"
          role="menu"
          :aria-labelledby="triggerId"
          ref="dropdownContent"
          @keydown.escape="closeDropdown(true)"
          @keydown.arrow-down.prevent="focusNextItem"
          @keydown.arrow-up.prevent="focusPreviousItem"
          @keydown.home.prevent="focusFirstItem"
          @keydown.end.prevent="focusLastItem"
        >
          <button
            class="dropdown-item"
            @click="handleExport"
            :disabled="isExporting"
            type="button"
            role="menuitem"
            ref="exportMenuItem"
          >
            <span class="icon" aria-hidden="true">📥</span>
            <span>{{ isExporting ? 'Export en cours...' : 'Exporter en image' }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="examples-container">
      <div class="example bad-example card">
        <h3 class="example-label bad-label">
          <span class="icon" aria-hidden="true">❌</span> Mauvais exemple
        </h3>
        <div class="example-content">
          <slot name="bad"></slot>
        </div>
      </div>

      <div class="example good-example card">
        <h3 class="example-label good-label">
          <span class="icon" aria-hidden="true">✅</span> Bon exemple
        </h3>
        <div class="example-content">
          <slot name="good"></slot>
        </div>
      </div>
    </div>

    <div v-if="explanation" class="example-explanation" role="note">
      <p><strong>Explication :</strong> {{ explanation }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useExportToImage } from '@/composables/useExportToImage'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  explanation: String
})

const { exportCardAsImage } = useExportToImage()
const isExporting = ref(false)
const isDropdownOpen = ref(false)
const triggerId = `dropdown-trigger-${Math.random().toString(36).substr(2, 9)}`

// Refs pour les éléments DOM
const dropdownContainer = ref(null)
const triggerButton = ref(null)
const dropdownContent = ref(null)
const exportMenuItem = ref(null)

// Gestion du menu déroulant
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value

  // Don't auto-focus first item on open to prevent scrolling
  // Focus will be handled by keyboard navigation when needed
}

const closeDropdown = (shouldFocusTrigger = false) => {
  isDropdownOpen.value = false
  if (shouldFocusTrigger) {
    triggerButton.value?.focus({ preventScroll: true })
  }
}

// Navigation clavier dans le menu
const getMenuItems = () => {
  return dropdownContent.value?.querySelectorAll('[role="menuitem"]:not([disabled])') || []
}

const focusFirstItem = () => {
  const items = getMenuItems()
  if (items.length > 0) {
    items[0].focus({ preventScroll: true })
  }
}

const focusLastItem = () => {
  const items = getMenuItems()
  if (items.length > 0) {
    items[items.length - 1].focus({ preventScroll: true })
  }
}

const focusNextItem = () => {
  const items = getMenuItems()
  const currentIndex = Array.from(items).findIndex(item => item === document.activeElement)
  const nextIndex = (currentIndex + 1) % items.length
  items[nextIndex]?.focus({ preventScroll: true })
}

const focusPreviousItem = () => {
  const items = getMenuItems()
  const currentIndex = Array.from(items).findIndex(item => item === document.activeElement)
  const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1
  items[prevIndex]?.focus({ preventScroll: true })
}

// Fermer le menu en cliquant à l'extérieur
const handleClickOutside = (event) => {
  if (isDropdownOpen.value && dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    closeDropdown(false) // Don't steal focus when clicking outside
  }
}

// Fermer le menu avec Escape (global)
const handleGlobalKeydown = (event) => {
  if (event.key === 'Escape' && isDropdownOpen.value) {
    closeDropdown(true) // Return focus when using Escape key
  }
}

const handleExport = async () => {
  isExporting.value = true
  closeDropdown(false) // Fermer le menu après avoir cliqué, don't steal focus

  try {
    const success = await exportCardAsImage(props.title)
    if (success) {
      console.log('Export réussi pour:', props.title)
    } else {
      console.error('Échec de l\'export pour:', props.title)
    }
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
  } finally {
    isExporting.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.example-toggle {
  margin-bottom: 2rem;
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  overflow: hidden;
}

.examples-container .card.example {
  border-radius: 0;
}

.card {
  background: var(--color-bg-secondary);
  padding: 1rem;
}

.toggle-header {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.toggle-header h3 {
  margin: 0;
  font-size: 1.25rem;
  flex: 1;
}

/* Menu déroulant discret */
.dropdown-menu {
  position: relative;
}

.menu-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
}

.menu-trigger:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-text-secondary);
  color: var(--color-text);
}

.menu-trigger:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.menu-trigger[aria-expanded="true"] {
  background: var(--color-bg-secondary);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.dots {
  font-weight: bold;
  letter-spacing: 1px;
}

/* Contenu du menu déroulant */
.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 180px;
  padding: 0.25rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: none;
  border-radius: 0.625rem;
  text-align: left;
  color: var(--color-text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover:not(:disabled) {
  background: var(--color-bg-secondary);
}

.dropdown-item:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
  background: var(--color-primary-light);
}

.dropdown-item:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dropdown-item c-icon {
  flex-shrink: 0;
}

.examples-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.example {
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: 0;
  min-width: 0;
  overflow: hidden;
}

.bad-example {
  border-right: 1px solid var(--color-border);
}

.example-content {
  padding: 1.5rem;
  min-height: 200px;
  overflow-x: auto;
  width: 100%;
}

.example-label {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  margin: 0;
}

.bad-label {
  background: var(--color-error-light);
  color: var(--color-error);
  border: 2px solid var(--color-error);
}

.good-label {
  background: var(--color-success-light);
  color: var(--color-success);
  border: 2px solid var(--color-success);
}

.example-explanation {
  background: var(--color-info-light);
  color: var(--color-text);
  border-top: 2px solid var(--color-info);
  padding: 1rem;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .toggle-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0;
  }

  .dropdown-content {
    right: 0;
    left: auto;
    min-width: 160px;
  }

  .examples-container {
    grid-template-columns: 1fr;
  }

  .bad-example {
    border-right: none;
    border-bottom: 2px solid var(--color-border);
  }

  .example-content {
    padding: 0;
  }

  .card.example {
    padding: 0;
  }

  .example-label {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-trigger,
  .dropdown-item {
    transition: none;
  }
}
</style>