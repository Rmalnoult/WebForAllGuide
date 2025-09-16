<template>
  <div class="keyboard-navigation">
    <header>
      <h1>Navigation Clavier</h1>
      <p class="lead">
        Permettre à tous les utilisateurs de naviguer efficacement sans souris
      </p>
    </header>

    <ExampleToggle
      title="Styles de focus visibles"
      explanation="Les utilisateurs qui naviguent au clavier ont besoin d'indicateurs visuels clairs pour savoir où ils se trouvent sur la page."
    >
      <template #bad>
        <div class="focus-demo">
          <p>Essayez de naviguer avec Tab dans cette zone :</p>
          <div class="controls-bad">
            <button class="btn-no-focus">Bouton 1</button>
            <button class="btn-no-focus">Bouton 2</button>
            <a href="#" class="link-no-focus">Lien vers la page</a>
            <input type="text" class="input-no-focus" placeholder="Saisissez du texte" />
            <button class="btn-no-focus">Valider</button>
          </div>
        </div>
      </template>

      <template #good>
        <div class="focus-demo">
          <p>Essayez de naviguer avec Tab dans cette zone :</p>
          <div class="controls-good">
            <button class="btn-good-focus">Bouton 1</button>
            <button class="btn-good-focus">Bouton 2</button>
            <a href="#" class="link-good-focus">Lien vers la page</a>
            <input type="text" class="input-good-focus" placeholder="Saisissez du texte" />
            <button class="btn-good-focus">Valider</button>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Lien d'évitement (Skip to content)"
      explanation="Les liens d'évitement permettent aux utilisateurs de clavier de passer directement au contenu principal sans devoir parcourir toute la navigation."
    >
      <template #bad>
        <div class="skip-demo">
          <div class="demo-page-bad">
            <div class="demo-header">
              <div class="demo-logo">Logo du site</div>
              <div class="demo-nav">
                <a href="#">Accueil</a>
                <a href="#">Produits</a>
                <a href="#">Services</a>
                <a href="#">À propos</a>
                <a href="#">Blog</a>
                <a href="#">Contact</a>
                <a href="#">Support</a>
                <a href="#">Mon compte</a>
              </div>
            </div>
            <div class="demo-main" id="main-content-bad">
              <h2>Contenu principal</h2>
              <p>L'utilisateur doit naviguer à travers tous les liens de navigation...</p>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="skip-demo">
          <div class="demo-page-good">
            <a href="#main-content-good" class="skip-link">Aller au contenu principal</a>
            <div class="demo-header">
              <div class="demo-logo">Logo du site</div>
              <div class="demo-nav">
                <a href="#">Accueil</a>
                <a href="#">Produits</a>
                <a href="#">Services</a>
                <a href="#">À propos</a>
                <a href="#">Blog</a>
                <a href="#">Contact</a>
                <a href="#">Support</a>
                <a href="#">Mon compte</a>
              </div>
            </div>
            <div class="demo-main" id="main-content-good">
              <h2>Contenu principal</h2>
              <p>L'utilisateur peut accéder directement ici grâce au lien d'évitement !</p>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Modal avec piège à focus"
      explanation="Les modales doivent garder le focus à l'intérieur et permettre de les fermer avec la touche Échap. Le focus doit retourner à l'élément qui a ouvert la modal."
    >
      <template #bad>
        <div class="modal-demo">
          <button @click="openBadModal" class="open-modal-btn">
            Ouvrir modal (mauvais exemple)
          </button>

          <div v-if="badModalOpen" class="modal-overlay-bad" @click="closeBadModal">
            <div class="modal-content-bad" @click.stop>
              <div class="modal-header">
                <h3>Confirmer l'action</h3>
                <button @click="closeBadModal" class="close-btn">×</button>
              </div>
              <div class="modal-body">
                <p>Êtes-vous sûr de vouloir continuer ?</p>
                <input type="text" placeholder="Raison (optionnel)" />
              </div>
              <div class="modal-footer">
                <button @click="closeBadModal">Annuler</button>
                <button @click="confirmBadModal">Confirmer</button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="modal-demo">
          <button @click="openGoodModal" class="open-modal-btn" ref="goodModalTrigger">
            Ouvrir modal (bon exemple)
          </button>

          <div
            v-if="goodModalOpen"
            class="modal-overlay-good"
            @click="closeGoodModal"
            @keydown.esc="closeGoodModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="good-modal-title"
          >
            <div class="modal-content-good" @click.stop>
              <div class="modal-header">
                <h3 id="good-modal-title">Confirmer l'action</h3>
                <button @click="closeGoodModal" class="close-btn" aria-label="Fermer la modal">×</button>
              </div>
              <div class="modal-body">
                <p>Êtes-vous sûr de vouloir continuer ?</p>
                <input
                  type="text"
                  placeholder="Raison (optionnel)"
                  ref="goodModalFirstInput"
                  @keydown.tab="handleGoodModalTab"
                />
              </div>
              <div class="modal-footer">
                <button @click="closeGoodModal" @keydown.tab="handleGoodModalTab">Annuler</button>
                <button
                  @click="confirmGoodModal"
                  @keydown.tab="handleGoodModalTab"
                  ref="goodModalLastButton"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Navigation au clavier dans les listes"
      explanation="Les listes navigables au clavier permettent d'utiliser les flèches directionnelles pour se déplacer entre les éléments, en plus de la navigation Tab classique."
    >
      <template #bad>
        <div class="list-nav-demo">
          <p>Menu avec navigation Tab uniquement :</p>
          <div class="menu-bad">
            <div class="menu-item-bad" tabindex="0">🏠 Accueil</div>
            <div class="menu-item-bad" tabindex="0">📋 Projets</div>
            <div class="menu-item-bad" tabindex="0">👥 Équipe</div>
            <div class="menu-item-bad" tabindex="0">📊 Statistiques</div>
            <div class="menu-item-bad" tabindex="0">⚙️ Paramètres</div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="list-nav-demo">
          <p>Menu avec navigation par flèches :</p>
          <div
            class="menu-good"
            role="menu"
            @keydown="handleMenuKeydown"
          >
            <div
              v-for="(item, index) in menuItems"
              :key="index"
              class="menu-item-good"
              role="menuitem"
              :tabindex="selectedMenuItem === index ? 0 : -1"
              @click="selectMenuItem(index)"
              @focus="selectedMenuItem = index"
              :class="{ selected: selectedMenuItem === index }"
            >
              {{ item }}
            </div>
          </div>
          <p class="hint">💡 Utilisez ↑ ↓ pour naviguer, Entrée pour sélectionner</p>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'

// Modal states
const badModalOpen = ref(false)
const goodModalOpen = ref(false)
const goodModalTrigger = ref(null)
const goodModalFirstInput = ref(null)
const goodModalLastButton = ref(null)

// Menu navigation
const selectedMenuItem = ref(0)
const menuItems = ['🏠 Accueil', '📋 Projets', '👥 Équipe', '📊 Statistiques', '⚙️ Paramètres']

// Bad modal functions
function openBadModal() {
  badModalOpen.value = true
}

function closeBadModal() {
  badModalOpen.value = false
}

function confirmBadModal() {
  alert('Action confirmée (mauvais exemple)')
  badModalOpen.value = false
}

// Good modal functions
async function openGoodModal() {
  goodModalOpen.value = true
  await nextTick()
  if (goodModalFirstInput.value) {
    goodModalFirstInput.value.focus()
  }
}

function closeGoodModal() {
  goodModalOpen.value = false
  if (goodModalTrigger.value) {
    goodModalTrigger.value.focus()
  }
}

function confirmGoodModal() {
  alert('Action confirmée (bon exemple)')
  closeGoodModal()
}

function handleGoodModalTab(event) {
  // Simple focus trap implementation
  if (event.shiftKey) {
    // Shift + Tab - going backward
    if (event.target === goodModalFirstInput.value) {
      event.preventDefault()
      goodModalLastButton.value?.focus()
    }
  } else {
    // Tab - going forward
    if (event.target === goodModalLastButton.value) {
      event.preventDefault()
      goodModalFirstInput.value?.focus()
    }
  }
}

// Menu navigation functions
function selectMenuItem(index) {
  selectedMenuItem.value = index
  alert(`Sélectionné : ${menuItems[index]}`)
}

function handleMenuKeydown(event) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedMenuItem.value = (selectedMenuItem.value + 1) % menuItems.length
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedMenuItem.value = selectedMenuItem.value === 0 ? menuItems.length - 1 : selectedMenuItem.value - 1
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectMenuItem(selectedMenuItem.value)
      break
  }
}
</script>

<style scoped>
.keyboard-navigation {
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

/* Focus demo styles */
.focus-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.controls-bad, .controls-good {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

/* Bad focus styles */
.btn-no-focus, .link-no-focus {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
}

.btn-no-focus:focus, .link-no-focus:focus {
  outline: none !important;
}

.input-no-focus {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.input-no-focus:focus {
  outline: none !important;
}

/* Good focus styles */
.btn-good-focus, .link-good-focus {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
}

.btn-good-focus:focus-visible, .link-good-focus:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.input-good-focus {
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
}

.input-good-focus:focus-visible {
  border-color: var(--color-primary);
  outline: 2px solid var(--color-focus);
  outline-offset: 1px;
}

/* Skip link demo styles */
.skip-demo {
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.demo-page-bad, .demo-page-good {
  position: relative;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  z-index: 1000;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 1rem;
}

.demo-header {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.demo-logo {
  font-weight: bold;
  font-size: 1.25rem;
}

.demo-nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.demo-nav a {
  padding: 0.5rem;
  text-decoration: none;
  color: var(--color-primary);
  border-radius: 0.25rem;
}

.demo-nav a:hover {
  background: var(--color-primary-light);
}

.demo-main {
  padding: 1.5rem;
}

/* Modal styles */
.modal-demo {
  position: relative;
}

.open-modal-btn {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.modal-overlay-bad, .modal-overlay-good {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content-bad, .modal-content-good {
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: 0.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.close-btn:focus-visible {
  outline: 2px solid var(--color-focus);
}

.modal-body {
  padding: 1.5rem;
}

.modal-body input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  margin-top: 1rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 0 1.5rem 1.5rem;
}

.modal-footer button {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  cursor: pointer;
}

.modal-footer button:last-child {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Menu navigation styles */
.list-nav-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.menu-bad, .menu-good {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 1rem 0;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.menu-item-bad, .menu-item-good {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.menu-item-bad:hover, .menu-item-good:hover {
  background: var(--color-primary-light);
}

.menu-item-bad:focus, .menu-item-good:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 1px;
}

.menu-item-good.selected {
  background: var(--color-primary);
  color: white;
}

.hint {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
  margin-top: 0.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .skip-link {
    transition: none;
  }

  .menu-item-bad, .menu-item-good {
    transition: none;
  }
}
</style>