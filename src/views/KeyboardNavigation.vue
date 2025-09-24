<template>
  <div class="keyboard-navigation">
    <header>
      <h1>Navigation Clavier</h1>
      <p class="lead">
        Permettre à tous les utilisateurs de naviguer efficacement sans souris
      </p>
    </header>

    <section aria-labelledby="keyboard-shortcuts-title">
      <h2 id="keyboard-shortcuts-title">Raccourcis clavier</h2>
      <dl class="shortcuts-list">
        <div>
          <dt><kbd>Tab</kbd></dt>
          <dd>Naviguer entre les éléments interactifs</dd>
        </div>
        <div>
          <dt><kbd>Shift + Tab</kbd></dt>
          <dd>Navigation arrière</dd>
        </div>
        <div>
          <dt><kbd>Entrée</kbd> / <kbd>Espace</kbd></dt>
          <dd>Activer les boutons et liens</dd>
        </div>
        <div>
          <dt><kbd>Échap</kbd></dt>
          <dd>Fermer les modales et menus</dd>
        </div>
        <div>
          <dt><kbd>↑ ↓</kbd></dt>
          <dd>Naviguer dans les listes et menus</dd>
        </div>
      </dl>
    </section>

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
          <div class="code-block">
            <pre><code>&lt;!-- Mauvais : navigation Tab uniquement --&gt;
&lt;div class="menu"&gt;
  &lt;div tabindex="0"&gt;🏠 Accueil&lt;/div&gt;
  &lt;div tabindex="0"&gt;📋 Projets&lt;/div&gt;
  &lt;div tabindex="0"&gt;👥 Équipe&lt;/div&gt;
  &lt;div tabindex="0"&gt;📊 Stats&lt;/div&gt;
  &lt;div tabindex="0"&gt;⚙️ Paramètres&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Utilisateur doit Tab 5 fois --&gt;
&lt;!-- Pas de navigation par flèches --&gt;
&lt;!-- Pas de sémantique de menu --&gt;</code></pre>
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
          <div class="code-block">
            <pre><code>&lt;!-- Bon : navigation par flèches avec roving tabindex --&gt;
&lt;div
  role="menu"
  @keydown="handleKeydown"
&gt;
  &lt;div
    v-for="(item, i) in items"
    role="menuitem"
    :tabindex="selected === i ? 0 : -1"
    @focus="selected = i"
    :class="{ selected: selected === i }"
  &gt;
    {{ item }}
  &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
function handleKeydown(e) {
  switch(e.key) {
    case 'ArrowDown':
      selected = (selected + 1) % items.length
      break
    case 'ArrowUp':
      selected = selected === 0
        ? items.length - 1
        : selected - 1
      break
    case 'Enter':
      selectItem(selected)
      break
  }
}
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Styles de focus visibles"
      explanation="Les utilisateurs qui naviguent au clavier ont besoin d'indicateurs visuels clairs pour savoir où ils se trouvent sur la page."
    >
      <template #bad>
        <div class="focus-demo">
          <p>Essayez de naviguer avec Tab dans cette zone :</p>
          <div class="controls-bad">
            <button type="button" class="btn-no-focus">Bouton 1</button>
            <button type="button" class="btn-no-focus">Bouton 2</button>
            <a href="#" class="link-no-focus">Lien vers la page</a>
            <input type="text" class="input-no-focus" placeholder="Saisissez du texte" />
            <button type="button" class="btn-no-focus">Valider</button>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- Mauvais : focus supprimé avec CSS --&gt;
&lt;style&gt;
  /* ❌ Supprime tous les indicateurs de focus */
  *:focus {
    outline: none !important;
  }

  button:focus,
  a:focus,
  input:focus {
    outline: none !important;
  }
&lt;/style&gt;

&lt;!-- ❌ Problèmes d'accessibilité : --&gt;
&lt;button&gt;Bouton 1&lt;/button&gt;        &lt;!-- Pas de type, focus invisible --&gt;
&lt;button&gt;Bouton 2&lt;/button&gt;        &lt;!-- Pas de type, focus invisible --&gt;
&lt;a href="#"&gt;Lien&lt;/a&gt;           &lt;!-- Focus invisible --&gt;
&lt;input type="text" /&gt;         &lt;!-- Focus invisible --&gt;

&lt;!-- Navigation clavier impossible à suivre visuellement --&gt;</code></pre>
          </div>
        </div>
      </template>

      <template #good>
        <div class="focus-demo">
          <p>Essayez de naviguer avec Tab dans cette zone :</p>
          <div class="controls-good">
            <button type="button" class="btn-good-focus">Bouton 1</button>
            <button type="button" class="btn-good-focus">Bouton 2</button>
            <a href="#" class="link-good-focus">Lien vers la page</a>
            <input type="text" class="input-good-focus" placeholder="Saisissez du texte" />
            <button type="button" class="btn-good-focus">Valider</button>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- Bon : indicateurs de focus visibles --&gt;
&lt;style&gt;
  button:focus-visible {
    outline: 3px solid #4F46E5;
    outline-offset: 2px;
  }

  input:focus-visible {
    border-color: #4F46E5;
    outline: 2px solid #4F46E5;
    outline-offset: 1px;
  }
&lt;/style&gt;

&lt;button type="button"&gt;Bouton 1&lt;/button&gt;
&lt;button type="button"&gt;Bouton 2&lt;/button&gt;
&lt;a href="#"&gt;Lien vers la page&lt;/a&gt;
&lt;input type="text" placeholder="Saisissez du texte" /&gt;</code></pre>
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
          <div class="code-block">
            <pre><code>&lt;!-- Mauvais : pas de lien d'évitement --&gt;
&lt;header&gt;
  &lt;nav&gt;
    &lt;a href="#"&gt;Accueil&lt;/a&gt;
    &lt;a href="#"&gt;Produits&lt;/a&gt;
    &lt;a href="#"&gt;Services&lt;/a&gt;
    &lt;!-- 10+ liens de navigation... --&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;!-- L'utilisateur doit traverser toute la nav --&gt;
  &lt;h1&gt;Contenu principal&lt;/h1&gt;
&lt;/main&gt;</code></pre>
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
          <div class="code-block">
            <pre><code>&lt;!-- Bon : lien d'évitement visible au focus --&gt;
&lt;style&gt;
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
  }

  .skip-link:focus {
    top: 1rem;
  }
&lt;/style&gt;

&lt;a href="#main-content" class="skip-link"&gt;
  Aller au contenu principal
&lt;/a&gt;
&lt;header&gt;
  &lt;nav aria-label="Navigation principale"&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="/"&gt;Accueil&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/produits"&gt;Produits&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/services"&gt;Services&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main id="main-content"&gt;
  &lt;h1&gt;Contenu principal&lt;/h1&gt;
&lt;/main&gt;</code></pre>
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
          <button type="button" @click="openBadModal" class="open-modal-btn">
            Ouvrir modal (mauvais exemple)
          </button>

          <div v-if="badModalOpen" class="modal-overlay-bad" @click="closeBadModal">
            <div class="modal-content-bad" @click.stop>
              <div class="modal-header">
                <h3>Confirmer l'action</h3>
                <button type="button" @click="closeBadModal" class="close-btn">×</button>
              </div>
              <div class="modal-body">
                <p>Êtes-vous sûr de vouloir continuer ?</p>
                <input type="text" placeholder="Raison (optionnel)" />
              </div>
              <div class="modal-footer">
                <button type="button" @click="closeBadModal">Annuler</button>
                <button type="button" @click="confirmBadModal">Confirmer</button>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- Mauvais : modal sans gestion du focus --&gt;
&lt;div v-if="modalOpen" class="modal-overlay" @click="close"&gt;
  &lt;div class="modal-content" @click.stop&gt;
    &lt;div class="modal-header"&gt;
      &lt;h3&gt;Confirmer l'action&lt;/h3&gt;
      &lt;button @click="close"&gt;×&lt;/button&gt;
    &lt;/div&gt;
    &lt;div class="modal-body"&gt;
      &lt;p&gt;Êtes-vous sûr de vouloir continuer ?&lt;/p&gt;
      &lt;input type="text" placeholder="Raison" /&gt;
    &lt;/div&gt;
    &lt;div class="modal-footer"&gt;
      &lt;button @click="close"&gt;Annuler&lt;/button&gt;
      &lt;button @click="confirm"&gt;Confirmer&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- ❌ Problèmes :
  - Pas de type="button" (soumettrait un form)
  - Pas de role="dialog" ni aria-modal
  - Focus peut sortir de la modal (Tab)
  - Pas de gestion de la touche Échap
  - Focus non restauré à la fermeture
  - Pas d'aria-label sur le bouton fermer
  - Pas d'aria-labelledby pour le titre --&gt;</code></pre>
          </div>
        </div>
      </template>

      <template #good>
        <div class="modal-demo">
          <button type="button" @click="openGoodModal" class="open-modal-btn" ref="goodModalTrigger">
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
                <button type="button" @click="closeGoodModal" class="close-btn" aria-label="Fermer la modal">×</button>
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
                <button type="button" @click="closeGoodModal" @keydown.tab="handleGoodModalTab">Annuler</button>
                <button
                  type="button"
                  @click="confirmGoodModal"
                  @keydown.tab="handleGoodModalTab"
                  ref="goodModalLastButton"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- Bon : modal avec piège à focus --&gt;
&lt;div
  v-if="modalOpen"
  class="modal-overlay"
  @click="closeModal"
  @keydown.esc="closeModal"
&gt;
  &lt;div
    class="modal-content"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    @click.stop
  &gt;
    &lt;header class="modal-header"&gt;
      &lt;h2 id="modal-title"&gt;Confirmer l'action&lt;/h2&gt;
      &lt;button
        type="button"
        @click="closeModal"
        aria-label="Fermer la modal"
        class="close-btn"
      &gt;×&lt;/button&gt;
    &lt;/header&gt;

    &lt;div class="modal-body"&gt;
      &lt;p&gt;Êtes-vous sûr de vouloir continuer ?&lt;/p&gt;
      &lt;input
        ref="firstInput"
        type="text"
        placeholder="Raison (optionnel)"
        @keydown.tab="handleFocusTrap"
      /&gt;
    &lt;/div&gt;

    &lt;footer class="modal-footer"&gt;
      &lt;button
        type="button"
        @click="closeModal"
        @keydown.tab="handleFocusTrap"
      &gt;Annuler&lt;/button&gt;
      &lt;button
        type="button"
        ref="lastButton"
        @click="confirmAction"
        @keydown.tab="handleFocusTrap"
      &gt;Confirmer&lt;/button&gt;
    &lt;/footer&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
// Fonctions essentielles :
// - Focus automatique sur premier élément
// - Piège à focus (Tab/Shift+Tab)
// - Fermeture par Échap
// - Retour du focus à l'élément déclencheur
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()

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

/* Keyboard shortcuts */
.shortcuts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.shortcuts-list div {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.shortcuts-list dt {
  flex-shrink: 0;
}

kbd {
  display: inline-block;
  padding: 0.2rem 0.4rem;
  font-size: 0.85rem;
  font-family: monospace;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
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

.menu-item-good.selected:hover {
  background: var(--color-primary-dark);
}

.menu-item-good.selected:active {
  background: var(--color-primary-darker);
}

.hint {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
  margin-top: 0.5rem;
}

.code-block {
  background: #1e1e1e;
  color: #e0e0e0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
  border: 1px solid var(--color-border);
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.code-block code {
  white-space: pre;
  word-wrap: normal;
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