<template>
  <div class="performance">
    <header>
      <h1>Performance & Adaptabilité</h1>
      <p class="lead">
        Créer des interfaces qui s'adaptent aux préférences et besoins de chaque utilisateur
      </p>
    </header>

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
          </div>

          <div class="layout-good" :style="{ fontSize: `${zoomLevel}%` }">
            <h4>Interface adaptative</h4>
            <div class="flexible-layout">
              <nav class="sidebar-good" :class="{ collapsed: sidebarCollapsed }">
                <button
                  class="sidebar-toggle"
                  @click="sidebarCollapsed = !sidebarCollapsed"
                  :aria-expanded="!sidebarCollapsed"
                  aria-controls="main-nav"
                >
                  {{ sidebarCollapsed ? '☰' : '✕' }}
                </button>
                <div id="main-nav" class="nav-content" v-show="!sidebarCollapsed">
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
                    <p>Description qui s'adapte à la taille</p>
                    <div class="price-good">19.99€</div>
                  </article>
                  <article class="card-good">
                    <h6>Produit 2</h6>
                    <p>Description qui s'adapte à la taille</p>
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
  max-width: 1200px;
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
      title="Optimisation des ressources et lazy loading"
      explanation="Charger les ressources de manière intelligente pour optimiser les performances, surtout sur connexions lentes ou appareils limités."
    >
      <template #bad>
        <div class="loading-demo">
          <div class="interface-bad">
            <h4>Chargement non optimisé</h4>
            <div class="content-example-bad">
              <p>❌ Problèmes de performance :</p>
              <ul>
                <li>🖼️ Images HD chargées immédiatement (5MB chacune)</li>
                <li>📹 Vidéos préchargées en arrière-plan</li>
                <li>📦 Bundle JavaScript monolithique (2MB)</li>
                <li>🔄 Pas de mise en cache</li>
              </ul>
              <div class="loading-simulation">
                <div class="loading-bar-bad">
                  <div class="loading-progress" style="width: 100%; background: #dc3545;"></div>
                </div>
                <span class="loading-text">Chargement... 15.3 MB / 15.3 MB</span>
              </div>
              <div class="resource-list-bad">
                <div class="resource-item">image1-hd.jpg - 5.2 MB ⏳</div>
                <div class="resource-item">image2-hd.jpg - 4.8 MB ⏳</div>
                <div class="resource-item">video-bg.mp4 - 3.1 MB ⏳</div>
                <div class="resource-item">app.bundle.js - 2.2 MB ⏳</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="loading-demo">
          <div class="interface-good">
            <h4>Chargement optimisé</h4>
            <div class="content-example-good">
              <p>✅ Optimisations actives :</p>
              <ul>
                <li>🖼️ Images lazy loading avec placeholder (50KB → 500KB)</li>
                <li>📹 Vidéos chargées à la demande</li>
                <li>📦 Code splitting et chunks (200KB initial)</li>
                <li>💾 Service Worker avec cache intelligent</li>
              </ul>

              <div class="loading-controls">
                <label>
                  <input type="checkbox" v-model="lazyLoadImages" @change="updateLoadingStrategy">
                  Lazy loading des images
                </label>
                <label>
                  <input type="checkbox" v-model="cacheEnabled" @change="updateLoadingStrategy">
                  Cache activé
                </label>
                <label>
                  Qualité d'image :
                  <select v-model="imageQuality" @change="updateLoadingStrategy">
                    <option value="auto">Auto (selon connexion)</option>
                    <option value="low">Basse (data saver)</option>
                    <option value="high">Haute</option>
                  </select>
                </label>
              </div>

              <div class="loading-simulation">
                <div class="loading-bar-good">
                  <div class="loading-progress" :style="{ width: loadingProgress + '%', background: '#28a745' }"></div>
                </div>
                <span class="loading-text">{{ loadingProgress < 100 ? `Chargement initial... ${(loadingProgress * 2).toFixed(0)} KB / 200 KB` : 'Prêt - Ressources chargées à la demande' }}</span>
              </div>

              <div class="resource-list-good">
                <div class="resource-item" :class="{ loaded: loadingProgress > 25 }">
                  <span>app.core.js - 50 KB</span>
                  <span class="status">{{ loadingProgress > 25 ? '✅' : '⏳' }}</span>
                </div>
                <div class="resource-item" :class="{ loaded: loadingProgress > 50 }">
                  <span>styles.critical.css - 15 KB</span>
                  <span class="status">{{ loadingProgress > 50 ? '✅' : '⏳' }}</span>
                </div>
                <div class="resource-item" :class="{ 'lazy-loaded': lazyLoadImages }">
                  <span>images - {{ lazyLoadImages ? 'Chargées au scroll' : '500 KB' }}</span>
                  <span class="status">{{ lazyLoadImages ? '⏸️' : '⏳' }}</span>
                </div>
                <div class="resource-item cached" v-if="cacheEnabled">
                  <span>Depuis le cache - 0 KB</span>
                  <span class="status">⚡</span>
                </div>
              </div>

              <div class="performance-metrics">
                <div class="metric">
                  <span class="metric-label">First Paint:</span>
                  <span class="metric-value" :class="{ good: lazyLoadImages }">{{ lazyLoadImages ? '0.8s' : '3.2s' }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Interactivité:</span>
                  <span class="metric-value" :class="{ good: cacheEnabled }">{{ cacheEnabled ? '1.2s' : '4.5s' }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Data usage:</span>
                  <span class="metric-value good">{{ imageQuality === 'low' ? '~200 KB' : imageQuality === 'auto' ? '~500 KB' : '~2 MB' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="code-block">
        <h5>Code d'exemple</h5>
        <div class="code-example">
          <h6>❌ Mauvais : Chargement non optimisé</h6>
          <pre><code>&lt;!-- HTML qui charge tout immédiatement --&gt;
&lt;img src="/images/large-image.jpg" alt="Image"&gt;
&lt;video src="video-3mb.mp4" autoplay preload="auto"&gt;&lt;/video&gt;

&lt;!-- JavaScript monolithique --&gt;
&lt;script src="app-bundle-2mb.js"&gt;&lt;/script&gt;

/* CSS avec ressources lourdes */
.background {
  background-image: url('heavy-bg-2mb.jpg');
}

<!-- Pas de mise en cache -->
&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>

          <h6>✅ Bon : Chargement optimisé et intelligent</h6>
          <pre><code>&lt;!-- HTML avec lazy loading --&gt;
&lt;img src="placeholder-50kb.jpg"
     data-src="optimized-image-500kb.webp"
     alt="Image"
     loading="lazy"&gt;

&lt;video preload="none" poster="thumbnail.jpg"&gt;
  &lt;source src="video-compressed.webm" type="video/webm"&gt;
  &lt;source src="video-compressed.mp4" type="video/mp4"&gt;
&lt;/video&gt;

&lt;!-- Code splitting et modules --&gt;
&lt;script type="module"&gt;
  // Chargement à la demande
  import('./feature-module.js').then(module => {
    module.init();
  });
&lt;/script&gt;

/* CSS avec media queries pour les ressources */
@media (min-width: 768px) {
  .background {
    background-image: url('bg-optimized.webp');
  }
}

&lt;!-- Service Worker pour la mise en cache --&gt;
&lt;script&gt;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
&lt;/script&gt;

&lt;!-- Optimisation des ressources critiques --&gt;
&lt;link rel="preload" href="critical.css" as="style"&gt;
&lt;link rel="prefetch" href="non-critical.js"&gt;

&lt;!-- Responsive images avec srcset --&gt;
&lt;img srcset="image-320.webp 320w,
             image-768.webp 768w,
             image-1200.webp 1200w"
     sizes="(max-width: 768px) 100vw, 50vw"
     src="image-768.webp"
     alt="Description"
     loading="lazy"&gt;</code></pre>
        </div>
      </div>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()

// Motion preferences
const reducedMotionOverride = ref(false)
const useReducedMotion = computed(() => {
  if (reducedMotionOverride.value) return true
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
  // Start loading simulation
  simulateLoading()

  // Listen for changes in system reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mediaQuery.matches) {
    preferences.value.reduceMotion = true
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

<style scoped>
.performance {
  max-width: 1200px;
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
.reduced-motion .spinner-good {
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

.layout-bad, .layout-good {
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  overflow: hidden;
}

.fixed-layout, .flexible-layout {
  display: flex;
  min-height: 300px;
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
}
</style>