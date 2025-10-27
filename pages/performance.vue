<script setup>
const { getPageSEO } = useSEOConfig()
const seo = getPageSEO('/performance')

useHead(seo)

import { ref, computed, onMounted, watch } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()

// Motion preferences
const reducedMotionOverride = ref(false)
const useReducedMotion = computed(() => {
  if (reducedMotionOverride.value) return true
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const cardHovered = ref(false)
const buttonClicked = ref(false)
const isLoading = ref(false)
const showPulse = ref(false)
const currentSlide = ref(0)

// Zoom simulation
const zoomLevel = ref('100')
const sidebarCollapsed = ref(false)

// Responsive simulation
const deviceType = ref('desktop')
const mobileMenuOpen = ref(false)

// Lazy loading and optimization
const lazyLoadImages = ref(true)
const cacheEnabled = ref(true)
const imageQuality = ref('auto')
const loadingProgress = ref(0)

const statusMessage = ref('')

// Functions
function updateMotionPreference() {
  // This would normally be handled by CSS @media (prefers-reduced-motion)
  // Here we simulate the preference change
}

function showFeedback() {
  buttonClicked.value = true
  statusMessage.value = 'Bouton cliqué !'
  setTimeout(() => {
    buttonClicked.value = false
    statusMessage.value = ''
  }, 2000)
}

function toggleLoading() {
  isLoading.value = !isLoading.value
  statusMessage.value = isLoading.value ? 'Chargement en cours...' : 'Chargement terminé'
}

function togglePulse() {
  showPulse.value = !showPulse.value
  statusMessage.value = showPulse.value ? 'Pulsation activée' : 'Pulsation désactivée'
}

function prevSlide() {
  currentSlide.value = currentSlide.value === 0 ? 3 : currentSlide.value - 1
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % 4
}

function updateZoom() {
  statusMessage.value = `Zoom ajusté à ${zoomLevel.value}%`
}

function updateDevice() {
  mobileMenuOpen.value = false
  statusMessage.value = `Affichage ${deviceType.value} simulé`
}

function closeMenu() {
  mobileMenuOpen.value = false
}

function updateLoadingStrategy() {
  statusMessage.value = 'Stratégie de chargement mise à jour'
  // Simulate loading progress when options change
  if (loadingProgress.value === 100) {
    simulateLoading()
  }
  setTimeout(() => {
    statusMessage.value = ''
  }, 2000)
}

function simulateLoading() {
  loadingProgress.value = 0
  const interval = setInterval(() => {
    loadingProgress.value += 10
    if (loadingProgress.value >= 100) {
      clearInterval(interval)
    }
  }, 200)
}

// Detect user's reduced motion preference
onMounted(() => {
  if (typeof window === 'undefined') return

  // Start loading simulation
  simulateLoading()

  // Listen for changes in system reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mediaQuery.matches) {
    reducedMotionOverride.value = true
  }
})

// Watch for device type changes to adjust layout
watch(deviceType, (newType) => {
  if (newType === 'desktop') {
    mobileMenuOpen.value = false
    sidebarCollapsed.value = false
  } else {
    sidebarCollapsed.value = true
  }
})
</script>

<template>
  <div class="performance">
    <PageHeader
      title="Performance & Adaptabilité"
      description="Créer des interfaces qui s'adaptent aux préférences et besoins de chaque utilisateur"
    />

    <ExampleToggle
      title="Respect des préférences de mouvement"
      explanation="Les utilisateurs peuvent configurer leur système pour réduire les animations. Il faut respecter cette préférence pour éviter les nausées et distractions."
    >
      <template #bad>
        <div class="motion-demo">
          <h4>Animations par défaut</h4>
          <div class="motion-examples-bad">
            <div class="animated-card card-bounce">
              <h5>Carte qui rebondit</h5>
              <p>Cette animation se déclenche constamment</p>
              <button class="animated-button">Clic moi !</button>
            </div>

            <div class="animated-elements">
              <div class="spinner-bad"></div>
              <div class="pulse-bad"></div>
              <div class="slide-bad">Glissement permanent</div>
            </div>

            <div class="auto-carousel">
              <div class="carousel-track">
                <div class="carousel-slide">Slide 1</div>
                <div class="carousel-slide">Slide 2</div>
                <div class="carousel-slide">Slide 3</div>
                <div class="carousel-slide">Slide 4</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="motion-demo">
          <h4>Animations respectueuses</h4>
          <div class="motion-controls">
            <label>
              <input
                type="checkbox"
                v-model="reducedMotionOverride"
                @change="updateMotionPreference"
              >
              Simuler "Réduire les animations" (prefers-reduced-motion)
            </label>
          </div>

          <div class="motion-examples-good" :class="{ 'reduced-motion': useReducedMotion }">
            <div class="animated-card card-respectful" @mouseenter="cardHovered = true" @mouseleave="cardHovered = false">
              <h5>Carte respectueuse</h5>
              <p>Animation légère au survol uniquement</p>
              <button class="animated-button-good" @click="showFeedback">
                Clic moi !
              </button>
              <div v-if="buttonClicked" class="feedback-message">Merci !</div>
            </div>

            <div class="animated-elements-good">
              <div class="spinner-good" :class="{ loading: isLoading }"></div>
              <button @click="toggleLoading" class="load-button">
                {{ isLoading ? 'Arrêter' : 'Charger' }}
              </button>
              <div class="pulse-good" v-if="showPulse"></div>
              <button @click="togglePulse" class="pulse-button">
                {{ showPulse ? 'Arrêter pulsation' : 'Démarrer pulsation' }}
              </button>
            </div>

            <div class="controlled-carousel">
              <button @click="prevSlide" aria-label="Slide précédent">‹</button>
              <div class="carousel-content">
                <div class="carousel-slide">Slide {{ currentSlide + 1 }}</div>
              </div>
              <button @click="nextSlide" aria-label="Slide suivant">›</button>
            </div>
          </div>
        </div>
      </template>

      <div class="code-block">
        <h5>Code d'exemple</h5>
        <div class="code-example">
          <h6>❌ Mauvais : Animations sans respect des préférences</h6>
          <pre><code><!-- CSS qui force les animations -->
.animated-card {
  animation: bounce 2s infinite; /* Toujours actif */
}

.pulse-element {
  animation: pulse 1.5s infinite; /* Pas de contrôle utilisateur */
}

<!-- HTML sans contrôles -->
&lt;div class="auto-carousel"&gt;
  <!-- Carousel qui défile automatiquement sans possibilité d'arrêt -->
&lt;/div&gt;</code></pre>

          <h6>✅ Bon : Respect de prefers-reduced-motion</h6>
          <pre><code><!-- CSS qui respecte les préférences utilisateur -->
.animated-card {
  transition: transform 0.3s ease;
}

.animated-card:hover {
  transform: translateY(-2px);
}

/* Respect des préférences système */
@media (prefers-reduced-motion: reduce) {
  .animated-card {
    transition: none;
  }
  .animated-card:hover {
    transform: none;
  }
}

<!-- HTML avec contrôles utilisateur -->
&lt;div class="controlled-carousel"&gt;
  &lt;button aria-label="Slide précédent"&gt;‹&lt;/button&gt;
  &lt;div class="carousel-content"&gt;
    <!-- Contenu contrôlé par l'utilisateur -->
  &lt;/div&gt;
  &lt;button aria-label="Slide suivant"&gt;›&lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </ExampleToggle>

    <ExampleToggle
      title="Support du zoom et des grandes tailles de police"
      explanation="L'interface doit rester fonctionnelle et lisible jusqu'à 200% de zoom. Les textes doivent s'adapter aux préférences de taille de police de l'utilisateur."
    >
      <template #bad>
        <div class="zoom-demo">
          <div class="layout-bad">
            <h4>Interface fixe</h4>
            <div class="fixed-layout">
              <div class="sidebar-bad">
                <h5>Menu</h5>
                <ul>
                  <li><a href="#">Accueil</a></li>
                  <li><a href="#">Produits</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div class="content-bad">
                <div class="toolbar-bad">
                  <button>Nouveau</button>
                  <button>Modifier</button>
                  <button>Supprimer</button>
                  <input type="search" placeholder="Rechercher...">
                </div>
                <div class="cards-bad">
                  <div class="card-bad">
                    <h6>Produit 1</h6>
                    <p>Description courte</p>
                    <div class="price-bad">19.99€</div>
                  </div>
                  <div class="card-bad">
                    <h6>Produit 2</h6>
                    <p>Description courte</p>
                    <div class="price-bad">24.99€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="zoom-demo">
          <div class="zoom-controls">
            <label>
              Simuler le zoom :
              <select v-model="zoomLevel" @change="updateZoom">
                <option value="100">100% (normal)</option>
                <option value="125">125%</option>
                <option value="150">150%</option>
                <option value="175">175%</option>
                <option value="200">200%</option>
              </select>
            </label>
            <div class="zoom-indicator">
              📏 Taille du texte : <strong>{{ zoomLevel }}%</strong>
              <span v-if="zoomLevel >= 150" class="zoom-warning">⚠️ La mise en page s'adapte automatiquement</span>
            </div>
          </div>

          <div class="layout-good" :style="{ fontSize: `${zoomLevel}%` }">
            <h4>Interface adaptative</h4>
            <div class="flexible-layout" :class="{ 'zoom-large': zoomLevel >= 150 }">
              <nav class="sidebar-good" :class="{ collapsed: sidebarCollapsed || zoomLevel >= 150 }">
                <button
                  class="sidebar-toggle"
                  @click="sidebarCollapsed = !sidebarCollapsed"
                  :aria-expanded="!sidebarCollapsed && zoomLevel < 150"
                  aria-controls="main-nav"
                >
                  {{ (sidebarCollapsed || zoomLevel >= 150) ? '☰' : '✕' }}
                </button>
                <div id="main-nav" class="nav-content" v-show="!sidebarCollapsed && zoomLevel < 150">
                  <h5>Menu</h5>
                  <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Produits</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                  </ul>
                </div>
              </nav>
              <main class="content-good">
                <div class="toolbar-good">
                  <div class="toolbar-actions">
                    <button>Nouveau</button>
                    <button>Modifier</button>
                    <button>Supprimer</button>
                  </div>
                  <div class="toolbar-search">
                    <input type="search" placeholder="Rechercher...">
                  </div>
                </div>
                <div class="cards-good">
                  <article class="card-good">
                    <h6>Produit 1</h6>
                    <p>Description adaptative</p>
                    <div class="price-good">19.99€</div>
                  </article>
                  <article class="card-good">
                    <h6>Produit 2</h6>
                    <p>Description adaptative</p>
                    <div class="price-good">24.99€</div>
                  </article>
                </div>
              </main>
            </div>
          </div>
        </div>
      </template>

      <div class="code-block">
        <h5>Code d'exemple</h5>
        <div class="code-example">
          <h6>❌ Mauvais : Tailles fixes qui ne s'adaptent pas</h6>
          <pre><code><!-- CSS avec dimensions fixes -->
.sidebar {
  width: 250px; /* Largeur fixe */
  font-size: 14px; /* Taille fixe */
}

.content {
  max-width: 800px; /* Ne s'adapte pas au zoom */
  overflow: hidden; /* Contenu coupé au zoom */
}

<!-- HTML sans structure adaptative -->
&lt;div class="fixed-layout"&gt;
  &lt;div class="sidebar"&gt;Menu&lt;/div&gt;
  &lt;div class="content"&gt;Contenu fixe&lt;/div&gt;
&lt;/div&gt;</code></pre>

          <h6>✅ Bon : Unités relatives et flexibilité</h6>
          <pre><code><!-- CSS avec unités relatives -->
.sidebar {
  width: 15rem; /* Unité relative au root font-size */
  min-width: 200px;
  font-size: 1rem; /* S'adapte aux préférences */
}

.content {
  flex: 1; /* Flexible */
  max-width: none; /* Pas de limite fixe */
  overflow-wrap: break-word; /* Gestion du contenu */
}

/* Support du zoom jusqu'à 200% */
@media (max-width: 1024px) {
  .sidebar {
    width: 100%;
    order: 2;
  }
}

<!-- HTML avec structure flexible -->
&lt;div class="flexible-layout"&gt;
  &lt;aside class="sidebar" aria-label="Navigation"&gt;
    &lt;button aria-expanded="false" aria-controls="nav-menu"&gt;
      Toggle Menu
    &lt;/button&gt;
    &lt;nav id="nav-menu"&gt;Menu adaptatif&lt;/nav&gt;
  &lt;/aside&gt;
  &lt;main class="content"&gt;Contenu adaptatif&lt;/main&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </ExampleToggle>

    <ExampleToggle
      title="Design adaptatif et responsive"
      explanation="L'interface doit fonctionner sur tous les appareils et orientations, avec des contrôles de taille appropriée pour le tactile."
    >
      <template #bad>
        <div class="responsive-demo">
          <div class="device-simulator-bad">
            <h4>Interface fixe desktop</h4>
            <div class="fixed-interface">
              <div class="header-bad">
                <div class="logo-bad">Logo</div>
                <div class="nav-bad">
                  <a href="#">Accueil</a>
                  <a href="#">À propos</a>
                  <a href="#">Services</a>
                  <a href="#">Portfolio</a>
                  <a href="#">Blog</a>
                  <a href="#">Contact</a>
                </div>
                <div class="actions-bad">
                  <button>Connexion</button>
                  <button>Inscription</button>
                </div>
              </div>
              <div class="content-section-bad">
                <div class="form-bad">
                  <h5>Contactez-nous</h5>
                  <div class="form-row-bad">
                    <input type="text" placeholder="Nom">
                    <input type="email" placeholder="Email">
                  </div>
                  <textarea placeholder="Message"></textarea>
                  <div class="form-actions-bad">
                    <button>Annuler</button>
                    <button>Envoyer</button>
                  </div>
                </div>
                <div class="info-bad">
                  <h5>Nos coordonnées</h5>
                  <p>123 Rue de la Paix<br>75001 Paris<br>+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="responsive-demo">
          <div class="device-controls">
            <label>
              Simuler l'appareil :
              <select v-model="deviceType" @change="updateDevice">
                <option value="desktop">Desktop (1200px+)</option>
                <option value="tablet">Tablette (768px)</option>
                <option value="mobile">Mobile (375px)</option>
              </select>
            </label>
          </div>

          <div class="device-simulator-good" :class="deviceType">
            <h4>Interface adaptive</h4>
            <div class="responsive-interface">
              <header class="header-good">
                <div class="logo-good">Logo</div>
                <button
                  v-if="deviceType !== 'desktop'"
                  class="menu-toggle"
                  @click="mobileMenuOpen = !mobileMenuOpen"
                  :aria-expanded="mobileMenuOpen"
                  aria-controls="responsive-nav"
                >
                  ☰ Menu
                </button>
                <nav
                  id="responsive-nav"
                  class="nav-good"
                  :class="{ open: mobileMenuOpen }"
                  v-show="deviceType === 'desktop' || mobileMenuOpen"
                >
                  <a href="#" @click="closeMenu">Accueil</a>
                  <a href="#" @click="closeMenu">À propos</a>
                  <a href="#" @click="closeMenu">Services</a>
                  <a href="#" @click="closeMenu">Portfolio</a>
                  <a href="#" @click="closeMenu">Blog</a>
                  <a href="#" @click="closeMenu">Contact</a>
                </nav>
                <div class="actions-good" v-if="deviceType === 'desktop'">
                  <button>Connexion</button>
                  <button>Inscription</button>
                </div>
              </header>

              <main class="content-section-good">
                <section class="form-section-good">
                  <h5>Contactez-nous</h5>
                  <form class="form-good">
                    <div class="form-row-good">
                      <input type="text" placeholder="Nom" aria-label="Votre nom">
                      <input type="email" placeholder="Email" aria-label="Votre email">
                    </div>
                    <textarea placeholder="Votre message" aria-label="Votre message"></textarea>
                    <div class="form-actions-good">
                      <button type="button">Annuler</button>
                      <button type="submit">Envoyer</button>
                    </div>
                  </form>
                </section>

                <aside class="info-good">
                  <h5>Nos coordonnées</h5>
                  <address>
                    123 Rue de la Paix<br>
                    75001 Paris<br>
                    <a href="tel:+33123456789">+33 1 23 45 67 89</a>
                  </address>
                </aside>
              </main>
            </div>
          </div>
        </div>
      </template>

      <div class="code-block">
        <h5>Code d'exemple</h5>
        <div class="code-example">
          <h6>❌ Mauvais : Interface fixe non responsive</h6>
          <pre><code><!-- CSS rigide -->
.header {
  display: flex;
  position: fixed; /* Problématique sur mobile */
  width: 1200px; /* Largeur fixe */
}

.nav-menu {
  display: flex; /* Déborde sur mobile */
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Toujours 2 colonnes */
}

button {
  padding: 4px 8px; /* Trop petit pour le tactile */
  min-width: auto;
}

<!-- HTML sans adaptabilité -->
&lt;header class="header"&gt;
  &lt;div class="logo"&gt;Logo&lt;/div&gt;
  &lt;nav class="nav-menu"&gt;
    &lt;a href="#"&gt;Link1&lt;/a&gt;&lt;a href="#"&gt;Link2&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;</code></pre>

          <h6>✅ Bon : Design responsive et adaptatif</h6>
          <pre><code><!-- CSS responsive -->
.header {
  display: flex;
  flex-wrap: wrap;
  width: 100%; /* Fluide */
  max-width: 100%;
}

.nav-menu {
  display: none; /* Caché par défaut sur mobile */
}

.nav-menu.open {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex !important;
    flex-direction: row;
  }
  .menu-toggle {
    display: none;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

button {
  min-height: 44px; /* Target tactile minimum */
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}

<!-- HTML avec navigation adaptative -->
&lt;header class="header"&gt;
  &lt;div class="logo"&gt;Logo&lt;/div&gt;
  &lt;button class="menu-toggle"
          aria-expanded="false"
          aria-controls="nav-menu"&gt;
    ☰ Menu
  &lt;/button&gt;
  &lt;nav id="nav-menu" class="nav-menu"&gt;
    &lt;a href="#"&gt;Accueil&lt;/a&gt;
    &lt;a href="#"&gt;Services&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;</code></pre>
        </div>
      </div>
    </ExampleToggle>

    <ExampleToggle
      title="Lazy Loading : charger uniquement les ressources visibles"
      explanation="Le lazy loading (chargement différé) permet de charger les images et ressources uniquement quand l'utilisateur en a besoin, plutôt que tout télécharger d'un coup au chargement de la page."
    >
      <template #bad>
        <div class="loading-demo">
          <div class="interface-bad">
            <h4>❌ Tout charger d'un coup (Eager Loading)</h4>
            <div class="content-example-bad">
              <p class="problem-explanation">
                <strong>Exemple concret :</strong> Un site e-commerce avec 50 produits charge toutes les images immédiatement, même celles en bas de page que l'utilisateur ne verra peut-être jamais.
              </p>

              <p class="technical-term">
                <strong>📚 Terme technique :</strong> <em>Eager Loading</em> = chargement immédiat de toutes les ressources
              </p>

              <ul class="simple-list">
                <li>📥 <strong>Problème 1 :</strong> 50 images × 200 Ko = 10 Mo téléchargés immédiatement</li>
                <li>⏱️ <strong>Problème 2 :</strong> Temps d'attente de 8-15 secondes avant de voir la page</li>
                <li>📱 <strong>Problème 3 :</strong> Consomme inutilement le forfait data mobile</li>
                <li>🔋 <strong>Problème 4 :</strong> Sollicite le processeur et vide la batterie</li>
              </ul>

              <div class="visual-example bad">
                <div class="website-example">
                  <div class="resource-item loaded">📄 HTML (20 Ko)</div>
                  <div class="resource-item loaded">🎨 CSS (50 Ko)</div>
                  <div class="resource-item loaded">⚙️ JavaScript (200 Ko)</div>
                  <div class="resource-item loaded">🖼️ Image 1 visible (200 Ko)</div>
                  <div class="resource-item loaded">🖼️ Image 2 visible (200 Ko)</div>
                  <div class="resource-item loaded unnecessary">🖼️ Image 3 en bas de page (200 Ko)</div>
                  <div class="resource-item loaded unnecessary">🖼️ Image 4 en bas de page (200 Ko)</div>
                  <div class="resource-item loaded unnecessary">🖼️ Image 5 en bas de page (200 Ko)</div>
                </div>
                <div class="wait-time bad">
                  ⏱️ Temps de chargement total : <strong>8 secondes</strong>
                </div>
                <div class="data-usage bad">
                  📊 Données consommées : <strong>1.27 Mo</strong> (dont 600 Ko inutiles)
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="loading-demo">
          <div class="interface-good">
            <h4>✅ Chargement progressif (Lazy Loading + Cache)</h4>
            <div class="content-example-good">
              <p class="solution-explanation">
                <strong>Exemple concret :</strong> Le même site e-commerce charge d'abord le contenu visible, puis les images suivantes uniquement quand l'utilisateur scroll.
              </p>

              <p class="technical-term">
                <strong>📚 Termes techniques :</strong>
                <em>Lazy Loading</em> = chargement différé •
                <em>Cache HTTP</em> = mémoire temporaire du navigateur
              </p>

              <div class="loading-controls-simple">
                <h5>Testez les optimisations :</h5>
                <label class="checkbox-card">
                  <input type="checkbox" v-model="lazyLoadImages" @change="updateLoadingStrategy">
                  <div class="checkbox-content">
                    <span class="checkbox-icon">👁️</span>
                    <span class="checkbox-label">
                      <strong>Lazy Loading activé</strong>
                      <small>Charge les images au scroll (attribut loading="lazy")</small>
                    </span>
                  </div>
                </label>

                <label class="checkbox-card">
                  <input type="checkbox" v-model="cacheEnabled" @change="updateLoadingStrategy">
                  <div class="checkbox-content">
                    <span class="checkbox-icon">💾</span>
                    <span class="checkbox-label">
                      <strong>Cache HTTP activé</strong>
                      <small>Stocke en mémoire pour ne pas re-télécharger (Cache-Control)</small>
                    </span>
                  </div>
                </label>
              </div>

              <div class="visual-example good">
                <div class="website-example">
                  <div class="resource-item loaded">📄 HTML (20 Ko) - Chargé</div>
                  <div class="resource-item loaded">🎨 CSS (50 Ko) - Chargé</div>
                  <div class="resource-item loaded">⚙️ JavaScript (200 Ko) - Chargé</div>
                  <div class="resource-item loaded">🖼️ Image 1 visible (200 Ko) - Chargé</div>
                  <div class="resource-item loaded">🖼️ Image 2 visible (200 Ko) - Chargé</div>
                  <div class="resource-item" :class="{ 'lazy-loaded': lazyLoadImages }">
                    🖼️ Image 3 {{ lazyLoadImages ? '(chargée au scroll)' : '(non chargée encore)' }}
                  </div>
                  <div class="resource-item" :class="{ 'lazy-loaded': lazyLoadImages }">
                    🖼️ Image 4 {{ lazyLoadImages ? '(chargée au scroll)' : '(non chargée encore)' }}
                  </div>
                  <div class="resource-item" :class="{ cached: cacheEnabled }">
                    🖼️ Image déjà vue {{ cacheEnabled ? '(en cache, 0 Ko)' : '(à re-télécharger)' }}
                  </div>
                </div>
                <div class="wait-time good">
                  ⏱️ Temps de chargement initial : <strong>{{ lazyLoadImages ? '2 secondes' : '5 secondes' }}</strong>
                </div>
                <div class="data-usage good" v-if="lazyLoadImages || cacheEnabled">
                  📊 Données économisées : <strong>{{ cacheEnabled && lazyLoadImages ? '600 Ko (47%)' : '200 Ko (16%)' }}</strong>
                </div>
              </div>

              <div class="real-world-benefits">
                <h5>💡 Impact sur l'accessibilité :</h5>
                <div class="benefit-grid">
                  <div class="benefit-item">
                    <span class="benefit-icon">🚀</span>
                    <strong>Rapidité (FCP)</strong>
                    <p>First Contentful Paint plus rapide = page visible immédiatement</p>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">📱</span>
                    <strong>Données mobiles</strong>
                    <p>Essentiel pour les utilisateurs avec forfait limité ou réseau lent (3G)</p>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">🔋</span>
                    <strong>Batterie</strong>
                    <p>Moins de transfert réseau = économie d'énergie significative</p>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">♿</span>
                    <strong>Vieux appareils</strong>
                    <p>Moins de ressources à traiter = fonctionne sur matériel ancien</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="code-block">
        <h5>Pour les développeurs : exemples de code</h5>
        <div class="code-example">
          <h6>❌ Tout charger d'un coup</h6>
          <pre><code>&lt;!-- Toutes les images se chargent immédiatement --&gt;
&lt;img src="photo-tres-lourde-5mo.jpg" alt="Photo"&gt;
&lt;img src="autre-photo-4mo.jpg" alt="Autre photo"&gt;
&lt;img src="encore-une-3mo.jpg" alt="Encore une photo"&gt;

&lt;!-- Résultat : 12 Mo à télécharger avant de voir la page ! --&gt;</code></pre>

          <h6>✅ Charger intelligemment</h6>
          <pre><code>&lt;!-- L'attribut loading="lazy" charge l'image seulement quand elle est visible --&gt;
&lt;img src="photo-optimisee-500ko.webp"
     alt="Photo"
     loading="lazy"&gt;

&lt;!-- Les autres images ne se chargeront que si l'utilisateur scroll jusque là --&gt;
&lt;img src="autre-photo-500ko.webp"
     alt="Autre photo"
     loading="lazy"&gt;

&lt;!-- Résultat : 500 Ko au début, le reste seulement si nécessaire ! --&gt;</code></pre>
        </div>
      </div>
    </ExampleToggle>
  </div>
</template>

<style scoped>
.performance {
  max-width: 100%;
  margin: 0 auto;
}

header {
  text-align: left;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
}

/* Motion demo styles */
.motion-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  min-height: 400px;
}

.motion-controls {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: 0.625rem;
}

.motion-controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.motion-examples-bad, .motion-examples-good {
  display: grid;
  gap: 1.5rem;
}

.animated-card {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  background: var(--color-bg);
  color: var(--color-text);
  position: relative;
  overflow: hidden;
}

.card-bounce {
  animation: bounce 2s infinite;
}

.card-respectful {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-respectful:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.animated-button {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  animation: pulse 1.5s infinite;
}

.animated-button-good {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.animated-button-good:hover {
  background: var(--color-primary-dark);
}

.animated-elements {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.animated-elements-good {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.spinner-bad {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-good {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.spinner-good.loading {
  opacity: 1;
  animation: spin 1s linear infinite;
}

.pulse-bad {
  width: 40px;
  height: 40px;
  background: var(--color-error);
  border-radius: 50%;
  animation: pulse 1s infinite;
}

.pulse-good {
  width: 40px;
  height: 40px;
  background: var(--color-success);
  border-radius: 50%;
  animation: pulse 1s infinite;
}

.slide-bad {
  padding: 1rem;
  background: var(--color-warning);
  color: white;
  border-radius: 0.625rem;
  animation: slide 3s linear infinite;
}

.auto-carousel {
  overflow: hidden;
  width: 200px;
  height: 100px;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
}

.carousel-track {
  display: flex;
  width: 400%;
  animation: autoSlide 8s linear infinite;
}

.carousel-slide {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  font-weight: 500;
}

.controlled-carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.controlled-carousel button {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
}

.carousel-content {
  width: 200px;
  height: 100px;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-secondary);
  font-weight: 500;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.carousel-content .carousel-slide {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.load-button, .pulse-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: 0.625rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.load-button:hover, .pulse-button:hover {
  background: var(--color-text);
  color: white;
}

.feedback-message {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-success);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.625rem;
  font-size: 0.9rem;
  animation: fadeInOut 2s ease-in-out;
}

/* Reduced motion overrides */
.reduced-motion .card-respectful,
.reduced-motion .animated-button-good,
.reduced-motion .spinner-good,
.reduced-motion .carousel-content,
.reduced-motion .carousel-content .carousel-slide {
  transition: none;
  animation: none;
}

.reduced-motion .card-respectful:hover {
  transform: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reduced-motion .pulse-good {
  animation: none;
  opacity: 0.7;
}

/* Zoom demo styles */
.zoom-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.zoom-controls, .device-controls {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: 0.625rem;
}

.zoom-controls select, .device-controls select {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
}

.zoom-indicator {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: var(--color-bg);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.zoom-warning {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-warning);
  color: white;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.layout-bad, .layout-good {
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  overflow: hidden;
}

.fixed-layout, .flexible-layout {
  display: flex;
  min-height: 300px;
}

.flexible-layout.zoom-large {
  flex-direction: column;
}

.flexible-layout.zoom-large .sidebar-good {
  width: 100%;
  border-right: none;
  border-bottom: 1px solid var(--color-border);
}

.flexible-layout.zoom-large .cards-good {
  grid-template-columns: 1fr;
}

.flexible-layout.zoom-large .toolbar-good {
  flex-direction: column;
  align-items: stretch;
}

.flexible-layout.zoom-large .toolbar-search {
  max-width: none;
}

.sidebar-bad, .sidebar-good {
  background: var(--color-bg-secondary);
  width: 200px;
  padding: 1rem;
  border-right: 1px solid var(--color-border);
  flex-shrink: 0;
}

.sidebar-good {
  position: relative;
  transition: width 0.3s ease;
}

.sidebar-good.collapsed {
  width: 60px;
  overflow: hidden;
}

.sidebar-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
}

.nav-content {
  transition: opacity 0.3s ease;
}

.sidebar-good.collapsed .nav-content {
  opacity: 0;
}

.content-bad, .content-good {
  flex: 1;
  padding: 1rem;
}

.toolbar-bad, .toolbar-good {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.toolbar-good {
  justify-content: space-between;
}

.toolbar-actions {
  display: flex;
  gap: 0.5rem;
}

.toolbar-search {
  flex: 1;
  max-width: 300px;
}

.toolbar-search input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
}

.cards-bad, .cards-good {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.card-bad, .card-good {
  padding: 1rem;
  border-radius: 0.625rem;
  background: var(--color-bg-secondary);
  color: var(--color-text);
}

.price-bad, .price-good {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text);
  margin-top: 0.5rem;
}

/* Responsive demo styles */
.responsive-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.device-simulator-bad, .device-simulator-good {
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  overflow: hidden;
  margin-top: 1rem;
}

.device-simulator-good.mobile {
  max-width: 375px;
  margin: 1rem auto;
}

.device-simulator-good.tablet {
  max-width: 768px;
  margin: 1rem auto;
}

.fixed-interface, .responsive-interface {
  background: var(--color-bg);
  color: var(--color-text);
}

.header-bad, .header-good {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: 1rem;
}

.logo-bad, .logo-good {
  font-weight: bold;
  font-size: 1.25rem;
}

.nav-bad, .nav-good {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-good a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--color-text);
  border-radius: 0.625rem;
  transition: background-color 0.2s;
}

.nav-good a:hover {
  background: var(--color-primary-light);
}

.menu-toggle {
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
}

.actions-bad, .actions-good {
  display: flex;
  gap: 0.5rem;
}

.content-section-bad, .content-section-good {
  padding: 1.5rem;
  display: grid;
  gap: 2rem;
}

.form-bad, .form-good {
  max-width: 500px;
}

.form-row-bad, .form-row-good {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row-bad input, .form-row-good input,
.form-bad textarea, .form-good textarea {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  font-size: 1rem;
}

.form-actions-bad, .form-actions-good {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.form-actions-bad button, .form-actions-good button {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 1rem;
}

.form-actions-good button[type="submit"] {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-text);
}

/* Preferences demo styles */
.preferences-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.interface-bad, .interface-good {
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  overflow: hidden;
}

.preferences-panel {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.preferences-panel summary {
  cursor: pointer;
  font-weight: 600;
  list-style: none;
}

.preferences-panel summary::-webkit-details-marker {
  display: none;
}

.preferences-content {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.preference-group {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.preference-group h6 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--color-text);
}

.preference-group label {
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.preference-group select {
  margin-left: 0.5rem;
  padding: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
}

.preference-group input[type="checkbox"] {
  margin-right: 0.5rem;
}

.reset-button {
  grid-column: 1 / -1;
  padding: 0.75rem 1.5rem;
  background: var(--color-error);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  justify-self: start;
}

.content-example-bad, .content-example-good {
  padding: 1.5rem;
}

.content-example-good.font-small { font-size: 0.875rem; }
.content-example-good.font-normal { font-size: 1rem; }
.content-example-good.font-large { font-size: 1.125rem; }
.content-example-good.font-extra-large { font-size: 1.25rem; }

.content-example-good.contrast-high {
  color: #000;
  background: #fff;
}

.content-example-good.contrast-extra-high {
  color: #000;
  background: #fff;
  font-weight: 600;
}

.status-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-info-light);
  border-radius: 0.625rem;
  font-style: italic;
  min-height: 1.5rem;
}

/* Device-specific styles */
@media (max-width: 768px) {
  .device-simulator-good.desktop .content-section-good {
    grid-template-columns: 1fr;
  }

  .device-simulator-good.desktop .form-row-good {
    grid-template-columns: 1fr;
  }

  .device-simulator-good.desktop .nav-good {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-bg);
    color: var(--color-text);
    border-top: 1px solid var(--color-border);
    flex-direction: column;
    padding: 1rem;
    display: none;
  }

  .device-simulator-good.desktop .nav-good.open {
    display: flex;
  }
}

/* Mobile simulation */
.device-simulator-good.mobile .header-good {
  flex-direction: column;
  align-items: stretch;
}

.device-simulator-good.mobile .nav-good {
  flex-direction: column;
  background: var(--color-bg);
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
  margin-top: 1rem;
  padding-top: 1rem;
  display: none;
}

.device-simulator-good.mobile .nav-good.open {
  display: flex;
}

.device-simulator-good.mobile .content-section-good {
  grid-template-columns: 1fr;
}

.device-simulator-good.mobile .form-row-good {
  grid-template-columns: 1fr;
}

.device-simulator-good.mobile .form-actions-good {
  flex-direction: column;
}

/* Tablet simulation */
.device-simulator-good.tablet .content-section-good {
  grid-template-columns: 1fr;
}

/* Loading and optimization styles */
.loading-demo {
  padding: 1rem;
}

.loading-simulation {
  margin: 1.5rem 0;
}

.loading-bar-bad,
.loading-bar-good {
  width: 100%;
  height: 24px;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.loading-progress {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 0.625rem;
}

.loading-text {
  display: block;
  text-align: left;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.resource-list-bad,
.resource-list-good {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: var(--color-bg);
  border-radius: 0.625rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.resource-item:last-child {
  margin-bottom: 0;
}

.resource-item.loaded {
  background: #d4edda;
  color: #155724;
}

.resource-item.lazy-loaded {
  background: #fff3cd;
  color: #856404;
}

.resource-item.cached {
  background: #cce5ff;
  color: #004085;
}

.resource-item .status {
  font-size: 1.1rem;
}

.loading-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.loading-controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.loading-controls select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
}

.performance-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.metric {
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  text-align: left;
}

.metric-label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.metric-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #dc3545;
}

.metric-value.good {
  color: #28a745;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
  40%, 43% { transform: translate3d(0, -30px, 0); }
  70% { transform: translate3d(0, -15px, 0); }
  90% { transform: translate3d(0, -4px, 0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slide {
  0% { transform: translateX(-100px); }
  50% { transform: translateX(100px); }
  100% { transform: translateX(-100px); }
}

@keyframes autoSlide {
  0% { transform: translateX(0); }
  25% { transform: translateX(-25%); }
  50% { transform: translateX(-50%); }
  75% { transform: translateX(-75%); }
  100% { transform: translateX(0); }
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}

/* Code block styles */
.code-block {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.code-block h5 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
  font-size: 1.1rem;
}

.code-example h6 {
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.code-example h6:first-child {
  margin-top: 0;
}

.code-block pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.625rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  white-space: pre;
}

/* Lazy loading demo styles */
.problem-explanation,
.solution-explanation {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  border-left: 4px solid var(--color-primary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.technical-term {
  background: var(--color-info-light);
  padding: 1rem;
  border-radius: 0.625rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  border-left: 4px solid var(--color-primary);
}

.technical-term em {
  color: var(--color-primary);
  font-style: italic;
  font-weight: 600;
}

.simple-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  padding: 1rem;
}

.simple-list li {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: var(--color-bg);
  border-radius: 0.625rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.simple-list li:last-child {
  margin-bottom: 0;
}

.visual-example {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
  margin: 1.5rem 0;
  border: 2px solid var(--color-border);
}

.visual-example.bad {
  border-color: var(--color-error);
}

.visual-example.good {
  border-color: var(--color-success);
}

.website-example {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.resource-item {
  padding: 0.75rem 1rem;
  background: var(--color-bg);
  border-radius: 0.625rem;
  font-size: 0.9rem;
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
}

.resource-item.loaded {
  opacity: 1;
  border-color: var(--color-success);
  background: rgba(40, 167, 69, 0.05);
}

.resource-item.loaded.unnecessary {
  border-color: var(--color-error);
  background: rgba(220, 53, 69, 0.05);
}

.resource-item.lazy-loaded {
  opacity: 1;
  border-color: var(--color-warning);
  background: rgba(255, 193, 7, 0.1);
}

.resource-item.cached {
  opacity: 1;
  border-color: var(--color-primary);
  background: rgba(0, 123, 255, 0.1);
}

.wait-time {
  padding: 1rem;
  border-radius: 0.625rem;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
}

.wait-time.bad {
  background: rgba(220, 53, 69, 0.1);
  border: 2px solid var(--color-error);
  color: var(--color-error);
}

.wait-time.good {
  background: rgba(40, 167, 69, 0.1);
  border: 2px solid var(--color-success);
  color: var(--color-success);
}

.data-usage {
  padding: 1rem;
  border-radius: 0.625rem;
  text-align: center;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.data-usage.bad {
  background: rgba(220, 53, 69, 0.1);
  border: 2px solid var(--color-error);
  color: var(--color-error);
}

.data-usage.good {
  background: rgba(0, 123, 255, 0.1);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.loading-controls-simple {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.loading-controls-simple h5 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.checkbox-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.75rem 0;
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox-card:hover {
  border-color: var(--color-primary);
  background: rgba(0, 123, 255, 0.05);
}

.checkbox-card input[type="checkbox"] {
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.checkbox-card input[type="checkbox"]:checked + .checkbox-content {
  color: var(--color-primary);
}

.checkbox-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.checkbox-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.checkbox-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checkbox-label strong {
  font-size: 1rem;
  display: block;
}

.checkbox-label small {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  display: block;
}

.real-world-benefits {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.real-world-benefits h5 {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
  text-align: center;
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.benefit-item {
  background: var(--color-bg);
  padding: 1.5rem;
  border-radius: 0.625rem;
  text-align: center;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.benefit-item:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.75rem;
}

.benefit-item strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.benefit-item p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Respect user's reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .card-respectful:hover {
    transform: none;
  }

  .sidebar-good {
    transition: none;
  }

  .benefit-item:hover {
    transform: none;
  }

  .resource-item {
    transition: none;
  }
}
</style>