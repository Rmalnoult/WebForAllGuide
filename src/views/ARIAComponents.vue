<template>
  <div class="aria-components">
    <header>
      <h1>Composants ARIA</h1>
      <p class="lead">
        Créer des interfaces interactives accessibles avec les bonnes attributions ARIA
      </p>
    </header>

    <ExampleToggle
      title="Accordéon accessible"
      explanation="Un accordéon doit utiliser les attributs ARIA appropriés, supporter la navigation clavier et annoncer les changements d'état."
    >
      <template #bad>
        <div class="accordion-demo">
          <div class="accordion-bad">
            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(0)">
                <span>Qu'est-ce que l'accessibilité web ?</span>
                <span class="accordion-icon">{{ badAccordionOpen[0] ? '−' : '+' }}</span>
              </div>
              <div v-if="badAccordionOpen[0]" class="accordion-content">
                <p>L'accessibilité web consiste à rendre les sites et applications utilisables par tous, y compris les personnes en situation de handicap.</p>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(1)">
                <span>Pourquoi est-ce important ?</span>
                <span class="accordion-icon">{{ badAccordionOpen[1] ? '−' : '+' }}</span>
              </div>
              <div v-if="badAccordionOpen[1]" class="accordion-content">
                <p>15% de la population mondiale vit avec un handicap. L'accessibilité améliore l'expérience pour tous et est souvent une obligation légale.</p>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(2)">
                <span>Comment commencer ?</span>
                <span class="accordion-icon">{{ badAccordionOpen[2] ? '−' : '+' }}</span>
              </div>
              <div v-if="badAccordionOpen[2]" class="accordion-content">
                <p>Commencez par apprendre les guidelines WCAG, utilisez des outils d'audit, et testez avec de vrais utilisateurs.</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="accordion-demo">
          <div class="accordion-good">
            <div v-for="(item, index) in accordionItems" :key="index" class="accordion-item">
              <h3>
                <button
                  :id="`accordion-header-${index}`"
                  class="accordion-header"
                  :aria-expanded="goodAccordionOpen[index]"
                  :aria-controls="`accordion-panel-${index}`"
                  @click="toggleGoodAccordion(index)"
                  @keydown="handleAccordionKeydown($event, index)"
                >
                  <span>{{ item.title }}</span>
                  <span class="accordion-icon" aria-hidden="true">
                    {{ goodAccordionOpen[index] ? '−' : '+' }}
                  </span>
                </button>
              </h3>
              <div
                :id="`accordion-panel-${index}`"
                class="accordion-content"
                role="region"
                :aria-labelledby="`accordion-header-${index}`"
                :aria-hidden="!goodAccordionOpen[index]"
                v-show="goodAccordionOpen[index]"
              >
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Notifications toast"
      explanation="Les notifications toast doivent être annoncées aux lecteurs d'écran, permettre la fermeture manuelle, et respecter les préférences de mouvement."
    >
      <template #bad>
        <div class="toast-demo">
          <div class="toast-controls">
            <button @click="showBadToast('success')">Succès</button>
            <button @click="showBadToast('error')">Erreur</button>
            <button @click="showBadToast('info')">Information</button>
          </div>

          <div class="toast-container-bad">
            <div
              v-for="toast in badToasts"
              :key="toast.id"
              :class="`toast toast-${toast.type}`"
            >
              <span class="toast-icon">{{ getToastIcon(toast.type) }}</span>
              <span class="toast-message">{{ toast.message }}</span>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="toast-demo">
          <div class="toast-controls">
            <button @click="showGoodToast('success')">Succès</button>
            <button @click="showGoodToast('error')">Erreur</button>
            <button @click="showGoodToast('info')">Information</button>
          </div>

          <div
            class="toast-container-good"
            aria-live="polite"
            aria-label="Notifications"
            role="region"
          >
            <div
              v-for="toast in goodToasts"
              :key="toast.id"
              :class="`toast toast-${toast.type}`"
              role="alert"
              :aria-labelledby="`toast-${toast.id}-title`"
              :aria-describedby="`toast-${toast.id}-message`"
            >
              <div class="toast-content">
                <span
                  :id="`toast-${toast.id}-title`"
                  class="toast-icon"
                  :aria-label="getToastTypeLabel(toast.type)"
                >
                  {{ getToastIcon(toast.type) }}
                </span>
                <span :id="`toast-${toast.id}-message`" class="toast-message">
                  {{ toast.message }}
                </span>
              </div>
              <button
                class="toast-close"
                @click="dismissGoodToast(toast.id)"
                :aria-label="`Fermer la notification ${toast.type}`"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Menu déroulant accessible"
      explanation="Un menu déroulant doit supporter la navigation clavier, fermer avec Échap, et maintenir le focus de manière appropriée."
    >
      <template #bad>
        <div class="dropdown-demo">
          <div class="dropdown-bad">
            <div class="dropdown-trigger" @click="badDropdownOpen = !badDropdownOpen">
              Actions {{ badDropdownOpen ? '▲' : '▼' }}
            </div>
            <div v-if="badDropdownOpen" class="dropdown-menu">
              <div class="dropdown-item" @click="handleAction('edit')">Modifier</div>
              <div class="dropdown-item" @click="handleAction('copy')">Copier</div>
              <div class="dropdown-item" @click="handleAction('delete')">Supprimer</div>
              <div class="dropdown-item" @click="handleAction('share')">Partager</div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="dropdown-demo">
          <div class="dropdown-good">
            <button
              class="dropdown-trigger"
              :aria-expanded="goodDropdownOpen"
              aria-haspopup="true"
              :aria-controls="goodDropdownOpen ? 'dropdown-menu-good' : undefined"
              @click="toggleGoodDropdown"
              @keydown="handleDropdownTriggerKeydown"
              ref="dropdownTrigger"
            >
              Actions
              <span aria-hidden="true">{{ goodDropdownOpen ? '▲' : '▼' }}</span>
            </button>
            <ul
              v-if="goodDropdownOpen"
              id="dropdown-menu-good"
              class="dropdown-menu"
              role="menu"
              :aria-labelledby="goodDropdownOpen ? 'dropdown-trigger' : undefined"
              @keydown="handleDropdownMenuKeydown"
            >
              <li role="none">
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('edit')"
                  ref="firstMenuItem"
                >
                  <span aria-hidden="true">✏️</span>
                  Modifier
                </button>
              </li>
              <li role="none">
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('copy')"
                >
                  <span aria-hidden="true">📋</span>
                  Copier
                </button>
              </li>
              <li role="none">
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('delete')"
                >
                  <span aria-hidden="true">🗑️</span>
                  Supprimer
                </button>
              </li>
              <li role="none">
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('share')"
                >
                  <span aria-hidden="true">🔗</span>
                  Partager
                </button>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Tableau triable accessible"
      explanation="Un tableau triable doit indiquer l'état de tri courant, permettre la navigation clavier, et annoncer les changements aux lecteurs d'écran."
    >
      <template #bad>
        <div class="table-demo">
          <table class="table-bad">
            <thead>
              <tr>
                <th @click="sortBadTable('name')">
                  Nom {{ badSortColumn === 'name' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('email')">
                  Email {{ badSortColumn === 'email' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('role')">
                  Rôle {{ badSortColumn === 'role' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('status')">
                  Statut {{ badSortColumn === 'status' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in sortedBadUsers" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template #good>
        <div class="table-demo">
          <div id="table-status" class="sr-only" aria-live="polite" aria-atomic="true">
            {{ tableStatusMessage }}
          </div>
          <table class="table-good" role="table" aria-label="Liste des utilisateurs">
            <thead>
              <tr>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('name')"
                    :aria-sort="getSortState('name')"
                    aria-describedby="sort-instructions"
                  >
                    Nom
                    <span aria-hidden="true" class="sort-icon">
                      {{ getSortIcon('name') }}
                    </span>
                  </button>
                </th>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('email')"
                    :aria-sort="getSortState('email')"
                    aria-describedby="sort-instructions"
                  >
                    Email
                    <span aria-hidden="true" class="sort-icon">
                      {{ getSortIcon('email') }}
                    </span>
                  </button>
                </th>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('role')"
                    :aria-sort="getSortState('role')"
                    aria-describedby="sort-instructions"
                  >
                    Rôle
                    <span aria-hidden="true" class="sort-icon">
                      {{ getSortIcon('role') }}
                    </span>
                  </button>
                </th>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('status')"
                    :aria-sort="getSortState('status')"
                    aria-describedby="sort-instructions"
                  >
                    Statut
                    <span aria-hidden="true" class="sort-icon">
                      {{ getSortIcon('status') }}
                    </span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in sortedGoodUsers" :key="user.id">
                <th scope="row">{{ user.name }}</th>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <span class="status" :class="`status-${user.status.toLowerCase()}`">
                    {{ user.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="sort-instructions" class="table-instructions">
            Cliquez sur les en-têtes de colonnes pour trier le tableau. Utilisez Tab pour naviguer entre les boutons de tri.
          </div>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'

// Accordion state
const badAccordionOpen = ref([false, false, false])
const goodAccordionOpen = ref([false, false, false])

const accordionItems = [
  {
    title: "Qu'est-ce que l'accessibilité web ?",
    content: "L'accessibilité web consiste à rendre les sites et applications utilisables par tous, y compris les personnes en situation de handicap."
  },
  {
    title: "Pourquoi est-ce important ?",
    content: "15% de la population mondiale vit avec un handicap. L'accessibilité améliore l'expérience pour tous et est souvent une obligation légale."
  },
  {
    title: "Comment commencer ?",
    content: "Commencez par apprendre les guidelines WCAG, utilisez des outils d'audit, et testez avec de vrais utilisateurs."
  }
]

// Toast state
const badToasts = ref([])
const goodToasts = ref([])
let toastIdCounter = 0

// Dropdown state
const badDropdownOpen = ref(false)
const goodDropdownOpen = ref(false)
const dropdownTrigger = ref(null)
const firstMenuItem = ref(null)

// Table state
const badSortColumn = ref('name')
const badSortDirection = ref('asc')
const goodSortColumn = ref('name')
const goodSortDirection = ref('asc')
const tableStatusMessage = ref('')

const users = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
  { id: 2, name: 'Bob Dupont', email: 'bob@example.com', role: 'Utilisateur', status: 'Inactif' },
  { id: 3, name: 'Charlie Leroy', email: 'charlie@example.com', role: 'Modérateur', status: 'Actif' },
  { id: 4, name: 'Diana Moreau', email: 'diana@example.com', role: 'Utilisateur', status: 'Suspendu' }
]

// Accordion functions
function toggleBadAccordion(index) {
  badAccordionOpen.value[index] = !badAccordionOpen.value[index]
}

function toggleGoodAccordion(index) {
  goodAccordionOpen.value[index] = !goodAccordionOpen.value[index]
}

function handleAccordionKeydown(event, index) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusNextAccordionHeader(index)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPrevAccordionHeader(index)
      break
    case 'Home':
      event.preventDefault()
      focusAccordionHeader(0)
      break
    case 'End':
      event.preventDefault()
      focusAccordionHeader(accordionItems.length - 1)
      break
  }
}

function focusNextAccordionHeader(currentIndex) {
  const nextIndex = currentIndex === accordionItems.length - 1 ? 0 : currentIndex + 1
  focusAccordionHeader(nextIndex)
}

function focusPrevAccordionHeader(currentIndex) {
  const prevIndex = currentIndex === 0 ? accordionItems.length - 1 : currentIndex - 1
  focusAccordionHeader(prevIndex)
}

function focusAccordionHeader(index) {
  const header = document.getElementById(`accordion-header-${index}`)
  if (header) header.focus()
}

// Toast functions
function showBadToast(type) {
  const messages = {
    success: 'Opération réussie !',
    error: 'Une erreur est survenue.',
    info: 'Information importante.'
  }

  const toast = {
    id: ++toastIdCounter,
    type,
    message: messages[type]
  }

  badToasts.value.push(toast)

  setTimeout(() => {
    const index = badToasts.value.findIndex(t => t.id === toast.id)
    if (index > -1) badToasts.value.splice(index, 1)
  }, 3000)
}

function showGoodToast(type) {
  const messages = {
    success: 'Opération réussie !',
    error: 'Une erreur est survenue.',
    info: 'Information importante.'
  }

  const toast = {
    id: ++toastIdCounter,
    type,
    message: messages[type]
  }

  goodToasts.value.push(toast)

  // Auto-dismiss after 5 seconds for non-error toasts
  if (type !== 'error') {
    setTimeout(() => {
      dismissGoodToast(toast.id)
    }, 5000)
  }
}

function dismissGoodToast(id) {
  const index = goodToasts.value.findIndex(t => t.id === id)
  if (index > -1) goodToasts.value.splice(index, 1)
}

function getToastIcon(type) {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  }
  return icons[type]
}

function getToastTypeLabel(type) {
  const labels = {
    success: 'Succès',
    error: 'Erreur',
    info: 'Information'
  }
  return labels[type]
}

// Dropdown functions
function toggleGoodDropdown() {
  goodDropdownOpen.value = !goodDropdownOpen.value
  if (goodDropdownOpen.value) {
    nextTick(() => {
      firstMenuItem.value?.focus()
    })
  }
}

function closeGoodDropdown() {
  goodDropdownOpen.value = false
  dropdownTrigger.value?.focus()
}

function handleDropdownTriggerKeydown(event) {
  switch (event.key) {
    case 'ArrowDown':
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleGoodDropdown()
      break
    case 'Escape':
      closeGoodDropdown()
      break
  }
}

function handleDropdownMenuKeydown(event) {
  const menuItems = document.querySelectorAll('#dropdown-menu-good button')
  const currentIndex = Array.from(menuItems).indexOf(event.target)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      const nextIndex = currentIndex === menuItems.length - 1 ? 0 : currentIndex + 1
      menuItems[nextIndex].focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1
      menuItems[prevIndex].focus()
      break
    case 'Escape':
      event.preventDefault()
      closeGoodDropdown()
      break
    case 'Home':
      event.preventDefault()
      menuItems[0].focus()
      break
    case 'End':
      event.preventDefault()
      menuItems[menuItems.length - 1].focus()
      break
  }
}

function handleAction(action) {
  alert(`Action: ${action}`)
  badDropdownOpen.value = false
}

function handleGoodAction(action) {
  alert(`Action: ${action}`)
  closeGoodDropdown()
}

// Table functions
function sortBadTable(column) {
  if (badSortColumn.value === column) {
    badSortDirection.value = badSortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    badSortColumn.value = column
    badSortDirection.value = 'asc'
  }
}

function sortGoodTable(column) {
  if (goodSortColumn.value === column) {
    goodSortDirection.value = goodSortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    goodSortColumn.value = column
    goodSortDirection.value = 'asc'
  }

  // Announce sort change
  const direction = goodSortDirection.value === 'asc' ? 'croissant' : 'décroissant'
  tableStatusMessage.value = `Tableau trié par ${column} en ordre ${direction}`
}

const sortedBadUsers = computed(() => {
  return [...users].sort((a, b) => {
    const aValue = a[badSortColumn.value]
    const bValue = b[badSortColumn.value]

    if (badSortDirection.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
})

const sortedGoodUsers = computed(() => {
  return [...users].sort((a, b) => {
    const aValue = a[goodSortColumn.value]
    const bValue = b[goodSortColumn.value]

    if (goodSortDirection.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
})

function getSortState(column) {
  if (goodSortColumn.value !== column) return 'none'
  return goodSortDirection.value === 'asc' ? 'ascending' : 'descending'
}

function getSortIcon(column) {
  if (goodSortColumn.value !== column) return '↕️'
  return goodSortDirection.value === 'asc' ? '↑' : '↓'
}
</script>

<style scoped>
.aria-components {
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

/* Accordion styles */
.accordion-demo {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.accordion-bad, .accordion-good {
  max-width: 600px;
}

.accordion-item {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.accordion-item:last-child {
  margin-bottom: 0;
}

.accordion-header {
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--color-bg-secondary);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.2s;
}

.accordion-header:hover {
  background: var(--color-primary-light);
}

.accordion-header:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: -3px;
}

.accordion-bad .accordion-header {
  background: var(--color-bg-secondary);
}

.accordion-icon {
  font-weight: bold;
  font-size: 1.2rem;
}

.accordion-content {
  padding: 1.5rem;
  background: white;
}

.accordion-content p {
  margin: 0;
  line-height: 1.6;
}

/* Toast styles */
.toast-demo {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  position: relative;
  min-height: 200px;
}

.toast-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.toast-controls button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-weight: 500;
}

.toast-controls button:hover {
  background: var(--color-primary-dark);
}

.toast-container-bad, .toast-container-good {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
}

.toast {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 500;
  animation: toast-slide-in 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-success {
  background: var(--color-success);
}

.toast-error {
  background: var(--color-error);
}

.toast-info {
  background: var(--color-info);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.toast-icon {
  font-size: 1.2rem;
}

.toast-message {
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  line-height: 1;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.toast-close:focus-visible {
  outline: 2px solid white;
}

/* Dropdown styles */
.dropdown-demo {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.dropdown-bad, .dropdown-good {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-trigger:hover {
  background: var(--color-primary-dark);
}

.dropdown-trigger:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin-top: 0.25rem;
  padding: 0;
  list-style: none;
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-item:hover {
  background: var(--color-bg-secondary);
}

.dropdown-item:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

.dropdown-item:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

/* Table styles */
.table-demo {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  overflow-x: auto;
}

.table-bad, .table-good {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.table-bad th, .table-bad td,
.table-good th, .table-good td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.table-bad th {
  background: var(--color-bg-secondary);
  cursor: pointer;
  user-select: none;
}

.table-bad th:hover {
  background: var(--color-primary-light);
}

.sort-button {
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.sort-button:hover {
  background: var(--color-primary-light);
}

.sort-button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

.sort-icon {
  margin-left: 0.5rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-actif {
  background: var(--color-success-light);
  color: var(--color-success);
}

.status-inactif {
  background: var(--color-border);
  color: var(--color-text-secondary);
}

.status-suspendu {
  background: var(--color-error-light);
  color: var(--color-error);
}

.table-instructions {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes toast-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast {
    animation: none;
  }

  .accordion-header,
  .dropdown-item,
  .sort-button {
    transition: none;
  }
}

@media (max-width: 768px) {
  .toast-container-bad,
  .toast-container-good {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    margin-top: 1rem;
  }

  .table-demo {
    padding: 1rem;
  }

  .table-bad th, .table-bad td,
  .table-good th, .table-good td {
    padding: 0.5rem;
  }
}
</style>