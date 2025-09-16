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
    </ExampleToggle>

    <ExampleToggle
      title="Gestion des préférences utilisateur"
      explanation="Respecter et mémoriser les préférences d'accessibilité de l'utilisateur pour personnaliser l'expérience."
    >
      <template #bad>
        <div class="preferences-demo">
          <div class="interface-bad">
            <h4>Interface sans options</h4>
            <div class="content-example-bad">
              <p>Cette interface impose ses choix :</p>
              <ul>
                <li>Taille de police fixe</li>
                <li>Contraste standard seulement</li>
                <li>Animations toujours activées</li>
                <li>Lecture automatique</li>
              </ul>
              <div class="media-bad">
                <video autoplay muted loop style="width: 200px; height: 150px; background: #ddd;">
                  <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
                    📹 Vidéo en lecture automatique
                  </div>
                </video>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="preferences-demo">
          <div class="interface-good">
            <h4>Interface personnalisable</h4>

            <details class="preferences-panel" :open="preferencesOpen">
              <summary @click="preferencesOpen = !preferencesOpen">
                ⚙️ Préférences d'accessibilité
              </summary>

              <div class="preferences-content">
                <div class="preference-group">
                  <h6>Affichage</h6>
                  <label>
                    Taille du texte :
                    <select v-model="preferences.fontSize" @change="savePreferences">
                      <option value="small">Petit</option>
                      <option value="normal">Normal</option>
                      <option value="large">Grand</option>
                      <option value="extra-large">Très grand</option>
                    </select>
                  </label>

                  <label>
                    Contraste :
                    <select v-model="preferences.contrast" @change="savePreferences">
                      <option value="normal">Normal</option>
                      <option value="high">Élevé</option>
                      <option value="extra-high">Très élevé</option>
                    </select>
                  </label>
                </div>

                <div class="preference-group">
                  <h6>Animations</h6>
                  <label>
                    <input
                      type="checkbox"
                      v-model="preferences.reduceMotion"
                      @change="savePreferences"
                    >
                    Réduire les animations
                  </label>
                </div>

                <div class="preference-group">
                  <h6>Médias</h6>
                  <label>
                    <input
                      type="checkbox"
                      v-model="preferences.autoplay"
                      @change="savePreferences"
                    >
                    Lecture automatique des vidéos
                  </label>
                </div>

                <button @click="resetPreferences" class="reset-button">
                  Réinitialiser les préférences
                </button>
              </div>
            </details>

            <div
              class="content-example-good"
              :class="{
                [`font-${preferences.fontSize}`]: true,
                [`contrast-${preferences.contrast}`]: true,
                'reduced-motion': preferences.reduceMotion
              }"
            >
              <p>Cette interface s'adapte à vos préférences :</p>
              <ul>
                <li>Taille de police : {{ preferences.fontSize }}</li>
                <li>Contraste : {{ preferences.contrast }}</li>
                <li>Animations : {{ preferences.reduceMotion ? 'réduites' : 'normales' }}</li>
                <li>Lecture auto : {{ preferences.autoplay ? 'activée' : 'désactivée' }}</li>
              </ul>

              <div class="media-good">
                <div class="video-placeholder" style="width: 200px; height: 150px; background: #ddd; display: flex; align-items: center; justify-content: center; border-radius: 0.5rem;">
                  <div style="text-align: center; color: #666;">
                    📹 Vidéo<br>
                    <button v-if="!preferences.autoplay" @click="playVideo" style="margin-top: 0.5rem;">
                      ▶️ Lecture
                    </button>
                    <div v-else style="margin-top: 0.5rem;">Lecture auto</div>
                  </div>
                </div>
              </div>

              <div class="status-message" role="status" aria-live="polite">
                {{ statusMessage }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'

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

// User preferences
const preferencesOpen = ref(false)
const preferences = ref({
  fontSize: 'normal',
  contrast: 'normal',
  reduceMotion: false,
  autoplay: false
})

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

function savePreferences() {
  localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences.value))
  statusMessage.value = 'Préférences sauvegardées'
  setTimeout(() => {
    statusMessage.value = ''
  }, 3000)
}

function loadPreferences() {
  const saved = localStorage.getItem('accessibilityPreferences')
  if (saved) {
    preferences.value = { ...preferences.value, ...JSON.parse(saved) }
  }
}

function resetPreferences() {
  preferences.value = {
    fontSize: 'normal',
    contrast: 'normal',
    reduceMotion: false,
    autoplay: false
  }
  localStorage.removeItem('accessibilityPreferences')
  statusMessage.value = 'Préférences réinitialisées'
  setTimeout(() => {
    statusMessage.value = ''
  }, 3000)
}

function playVideo() {
  statusMessage.value = 'Vidéo en cours de lecture'
  setTimeout(() => {
    statusMessage.value = ''
  }, 2000)
}

// Detect user's reduced motion preference
onMounted(() => {
  loadPreferences()

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

/* Motion demo styles */
.motion-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  min-height: 400px;
}

.motion-controls {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
  cursor: pointer;
  animation: pulse 1.5s infinite;
}

.animated-button-good {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
  animation: slide 3s linear infinite;
}

.auto-carousel {
  overflow: hidden;
  width: 200px;
  height: 100px;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
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
  border-radius: 0.25rem;
  cursor: pointer;
}

.feedback-message {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-success);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
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
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.zoom-controls, .device-controls {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: 0.5rem;
}

.zoom-controls select, .device-controls select {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
}

.layout-bad, .layout-good {
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
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
  border-radius: 0.25rem;
}

.cards-bad, .cards-good {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.card-bad, .card-good {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg);
  color: var(--color-text);
}

.price-bad, .price-good {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-top: 0.5rem;
}

/* Responsive demo styles */
.responsive-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.device-simulator-bad, .device-simulator-good {
  border: 2px solid var(--color-border);
  border-radius: 1rem;
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
  border-radius: 0.25rem;
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
  border-radius: 0.25rem;
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
  border-radius: 0.25rem;
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
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}

.form-actions-good button[type="submit"] {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Preferences demo styles */
.preferences-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.interface-bad, .interface-good {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.preference-group h6 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--color-primary);
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
  border-radius: 0.25rem;
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
  border-radius: 0.25rem;
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
  border-radius: 0.25rem;
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