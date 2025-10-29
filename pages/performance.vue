<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

const { t } = useI18n()

const { getPageSEO } = useSEOConfig()
const seo = getPageSEO('/performance')

useHead(seo)

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

// Computed properties for dynamic translations
const zoomOptions = computed(() => [
  { value: '100', label: '100% (normal)' },
  { value: '125', label: '125%' },
  { value: '150', label: '150%' },
  { value: '175', label: '175%' },
  { value: '200', label: '200%' }
])

const deviceOptions = computed(() => [
  { value: 'desktop', label: t('pages.performance.responsive.devices.desktop') },
  { value: 'tablet', label: t('pages.performance.responsive.devices.tablet') },
  { value: 'mobile', label: t('pages.performance.responsive.devices.mobile') }
])

const loadingButtonText = computed(() =>
  isLoading.value ? t('pages.performance.motion.good.stopLoad') : t('pages.performance.motion.good.load')
)

const pulseButtonText = computed(() =>
  showPulse.value ? t('pages.performance.motion.good.stopPulse') : t('pages.performance.motion.good.pulse')
)

const loadingTimeText = computed(() =>
  lazyLoadImages.value ? t('pages.performance.lazyLoading.good.timeFast') : t('pages.performance.lazyLoading.good.timeSlow')
)

const dataSavingsText = computed(() => {
  if (cacheEnabled.value && lazyLoadImages.value) {
    return t('pages.performance.lazyLoading.good.savings.both')
  }
  return t('pages.performance.lazyLoading.good.savings.single')
})

// Functions
function updateMotionPreference() {
  // This would normally be handled by CSS @media (prefers-reduced-motion)
  // Here we simulate the preference change
}

function showFeedback() {
  buttonClicked.value = true
  statusMessage.value = t('pages.performance.motion.good.button')
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
      :title="$t('pages.performance.title')"
      :description="$t('pages.performance.description')"
    />

    <ExampleToggle
      :title="$t('pages.performance.motion.title')"
      :explanation="$t('pages.performance.motion.explanation')"
    >
      <template #bad>
        <div class="motion-demo">
          <h4>{{ $t('pages.performance.motion.bad.heading') }}</h4>
          <div class="motion-examples-bad">
            <div class="animated-card card-bounce">
              <h5>{{ $t('pages.performance.motion.bad.card.title') }}</h5>
              <p>{{ $t('pages.performance.motion.bad.card.description') }}</p>
              <button class="animated-button">{{ $t('pages.performance.motion.bad.button') }}</button>
            </div>

            <div class="animated-elements">
              <div class="spinner-bad"></div>
              <div class="pulse-bad"></div>
              <div class="slide-bad">{{ $t('pages.performance.motion.bad.slide') }}</div>
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
          <h4>{{ $t('pages.performance.motion.good.heading') }}</h4>
          <div class="motion-controls">
            <label>
              <input
                type="checkbox"
                v-model="reducedMotionOverride"
                @change="updateMotionPreference"
              >
              {{ $t('pages.performance.motion.good.simulate') }}
            </label>
          </div>

          <div class="motion-examples-good" :class="{ 'reduced-motion': useReducedMotion }">
            <div class="animated-card card-respectful" @mouseenter="cardHovered = true" @mouseleave="cardHovered = false">
              <h5>{{ $t('pages.performance.motion.good.card.title') }}</h5>
              <p>{{ $t('pages.performance.motion.good.card.description') }}</p>
              <button class="animated-button-good" @click="showFeedback">
                {{ $t('pages.performance.motion.good.button') }}
              </button>
              <div v-if="buttonClicked" class="feedback-message">{{ $t('pages.performance.motion.good.feedback') }}</div>
            </div>

            <div class="animated-elements-good">
              <div class="spinner-good" :class="{ loading: isLoading }"></div>
              <button @click="toggleLoading" class="load-button">
                {{ loadingButtonText }}
              </button>
              <div class="pulse-good" v-if="showPulse"></div>
              <button @click="togglePulse" class="pulse-button">
                {{ pulseButtonText }}
              </button>
            </div>

            <div class="controlled-carousel">
              <button @click="prevSlide" :aria-label="$t('pages.performance.motion.good.prev')">‹</button>
              <div class="carousel-content">
                <div class="carousel-slide">{{ $t('pages.performance.motion.good.slide') }} {{ currentSlide + 1 }}</div>
              </div>
              <button @click="nextSlide" :aria-label="$t('pages.performance.motion.good.next')">›</button>
            </div>
          </div>
        </div>
      </template>

      <div class="code-block">
        <h5>Code d'exemple</h5>
        <div class="code-example">
          <h6>❌ Mauvais : Animations sans respect des préférences</h6>
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.motion.badComment') }} --&gt;
.animated-card {
  animation: bounce 2s infinite; /* {{ $t('pages.performance.codeExamples.motion.alwaysActive') }} */
}

.pulse-element {
  animation: pulse 1.5s infinite; /* {{ $t('pages.performance.codeExamples.motion.noUserControl') }} */
}

&lt;!-- {{ $t('pages.performance.codeExamples.motion.htmlNoControls') }} --&gt;
&lt;div class="auto-carousel"&gt;
  &lt;!-- {{ $t('pages.performance.codeExamples.motion.autoCarousel') }} --&gt;
&lt;/div&gt;</code></pre>

          <h6>✅ Bon : Respect de prefers-reduced-motion</h6>
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.motion.goodComment') }} --&gt;
.animated-card {
  transition: transform 0.3s ease;
}

.animated-card:hover {
  transform: translateY(-2px);
}

/* {{ $t('pages.performance.codeExamples.motion.systemPreferences') }} */
@media (prefers-reduced-motion: reduce) {
  .animated-card {
    transition: none;
  }
  .animated-card:hover {
    transform: none;
  }
}

&lt;!-- {{ $t('pages.performance.codeExamples.motion.htmlWithControls') }} --&gt;
&lt;div class="controlled-carousel"&gt;
  &lt;button aria-label="Slide précédent"&gt;‹&lt;/button&gt;
  &lt;div class="carousel-content"&gt;
    &lt;!-- {{ $t('pages.performance.codeExamples.motion.userControlledContent') }} --&gt;
  &lt;/div&gt;
  &lt;button aria-label="Slide suivant"&gt;›&lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.performance.zoom.title')"
      :explanation="$t('pages.performance.zoom.explanation')"
    >
      <template #bad>
        <div class="zoom-demo">
          <div class="layout-bad">
            <h4>{{ $t('pages.performance.zoom.bad.heading') }}</h4>
            <div class="fixed-layout">
              <div class="sidebar-bad">
                <h5>{{ $t('pages.performance.zoom.bad.menu') }}</h5>
                <ul>
                  <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.home') }}</a></li>
                  <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.products') }}</a></li>
                  <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.services') }}</a></li>
                  <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.contact') }}</a></li>
                </ul>
              </div>
              <div class="content-bad">
                <div class="toolbar-bad">
                  <button>{{ $t('pages.performance.zoom.bad.toolbar.new') }}</button>
                  <button>{{ $t('pages.performance.zoom.bad.toolbar.edit') }}</button>
                  <button>{{ $t('pages.performance.zoom.bad.toolbar.delete') }}</button>
                  <input type="search" :placeholder="$t('pages.performance.zoom.bad.toolbar.search')">
                </div>
                <div class="cards-bad">
                  <div class="card-bad">
                    <h6>{{ $t('pages.performance.zoom.bad.cards.product1.title') }}</h6>
                    <p>{{ $t('pages.performance.zoom.bad.cards.product1.description') }}</p>
                    <div class="price-bad">{{ $t('pages.performance.zoom.bad.cards.product1.price') }}</div>
                  </div>
                  <div class="card-bad">
                    <h6>{{ $t('pages.performance.zoom.bad.cards.product2.title') }}</h6>
                    <p>{{ $t('pages.performance.zoom.bad.cards.product2.description') }}</p>
                    <div class="price-bad">{{ $t('pages.performance.zoom.bad.cards.product2.price') }}</div>
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
              {{ $t('pages.performance.zoom.simulate') }}
              <select v-model="zoomLevel" @change="updateZoom">
                <option v-for="option in zoomOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
            <div class="zoom-indicator">
              📏 {{ $t('pages.performance.zoom.indicator') }} <strong>{{ zoomLevel }}%</strong>
              <span v-if="zoomLevel >= 150" class="zoom-warning">⚠️ {{ $t('pages.performance.zoom.warning') }}</span>
            </div>
          </div>

          <div class="layout-good" :style="{ fontSize: `${zoomLevel}%` }">
            <h4>{{ $t('pages.performance.zoom.good.heading') }}</h4>
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
                  <h5>{{ $t('pages.performance.zoom.good.menu') }}</h5>
                  <ul>
                    <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.home') }}</a></li>
                    <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.products') }}</a></li>
                    <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.services') }}</a></li>
                    <li><a href="#">{{ $t('pages.performance.zoom.bad.nav.contact') }}</a></li>
                  </ul>
                </div>
              </nav>
              <main class="content-good">
                <div class="toolbar-good">
                  <div class="toolbar-actions">
                    <button>{{ $t('pages.performance.zoom.good.toolbar.new') }}</button>
                    <button>{{ $t('pages.performance.zoom.good.toolbar.edit') }}</button>
                    <button>{{ $t('pages.performance.zoom.good.toolbar.delete') }}</button>
                  </div>
                  <div class="toolbar-search">
                    <input type="search" :placeholder="$t('pages.performance.zoom.good.toolbar.search')">
                  </div>
                </div>
                <div class="cards-good">
                  <article class="card-good">
                    <h6>{{ $t('pages.performance.zoom.good.cards.product1.title') }}</h6>
                    <p>{{ $t('pages.performance.zoom.good.cards.product1.description') }}</p>
                    <div class="price-good">{{ $t('pages.performance.zoom.good.cards.product1.price') }}</div>
                  </article>
                  <article class="card-good">
                    <h6>{{ $t('pages.performance.zoom.good.cards.product2.title') }}</h6>
                    <p>{{ $t('pages.performance.zoom.good.cards.product2.description') }}</p>
                    <div class="price-good">{{ $t('pages.performance.zoom.good.cards.product2.price') }}</div>
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
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.zoom.badComment') }} --&gt;
.sidebar {
  width: 250px; /* {{ $t('pages.performance.codeExamples.zoom.fixedWidth') }} */
  font-size: 14px; /* {{ $t('pages.performance.codeExamples.zoom.fixedSize') }} */
}

.content {
  max-width: 800px; /* {{ $t('pages.performance.codeExamples.zoom.noAdapt') }} */
  overflow: hidden; /* {{ $t('pages.performance.codeExamples.zoom.contentCut') }} */
}

&lt;!-- {{ $t('pages.performance.codeExamples.zoom.htmlNoAdaptive') }} --&gt;
&lt;div class="fixed-layout"&gt;
  &lt;div class="sidebar"&gt;Menu&lt;/div&gt;
  &lt;div class="content"&gt;Contenu fixe&lt;/div&gt;
&lt;/div&gt;</code></pre>

          <h6>✅ Bon : Unités relatives et flexibilité</h6>
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.zoom.goodComment') }} --&gt;
.sidebar {
  width: 15rem; /* {{ $t('pages.performance.codeExamples.zoom.relativeUnit') }} */
  min-width: 200px;
  font-size: 1rem; /* {{ $t('pages.performance.codeExamples.zoom.adaptToPreferences') }} */
}

.content {
  flex: 1; /* {{ $t('pages.performance.codeExamples.zoom.flexible') }} */
  max-width: none; /* {{ $t('pages.performance.codeExamples.zoom.noFixedLimit') }} */
  overflow-wrap: break-word; /* {{ $t('pages.performance.codeExamples.zoom.contentManagement') }} */
}

/* {{ $t('pages.performance.codeExamples.zoom.zoomSupport') }} */
@media (max-width: 1024px) {
  .sidebar {
    width: 100%;
    order: 2;
  }
}

&lt;!-- {{ $t('pages.performance.codeExamples.zoom.htmlFlexible') }} --&gt;
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
      :title="$t('pages.performance.responsive.title')"
      :explanation="$t('pages.performance.responsive.explanation')"
    >
      <template #bad>
        <div class="responsive-demo">
          <div class="device-simulator-bad">
            <h4>{{ $t('pages.performance.responsive.bad.heading') }}</h4>
            <div class="fixed-interface">
              <div class="header-bad">
                <div class="logo-bad">{{ $t('pages.performance.responsive.bad.logo') }}</div>
                <div class="nav-bad">
                  <a href="#">{{ $t('pages.performance.responsive.bad.nav.home') }}</a>
                  <a href="#">{{ $t('pages.performance.responsive.bad.nav.about') }}</a>
                  <a href="#">{{ $t('pages.performance.responsive.bad.nav.services') }}</a>
                  <a href="#">{{ $t('pages.performance.responsive.bad.nav.portfolio') }}</a>
                  <a href="#">{{ $t('pages.performance.responsive.bad.nav.blog') }}</a>
                  <a href="#">{{ $t('pages.performance.responsive.bad.nav.contact') }}</a>
                </div>
                <div class="actions-bad">
                  <button>{{ $t('pages.performance.responsive.bad.login') }}</button>
                  <button>{{ $t('pages.performance.responsive.bad.signup') }}</button>
                </div>
              </div>
              <div class="content-section-bad">
                <div class="form-bad">
                  <h5>{{ $t('pages.performance.responsive.bad.form.heading') }}</h5>
                  <div class="form-row-bad">
                    <input type="text" :placeholder="$t('pages.performance.responsive.bad.form.name')">
                    <input type="email" :placeholder="$t('pages.performance.responsive.bad.form.email')">
                  </div>
                  <textarea :placeholder="$t('pages.performance.responsive.bad.form.message')"></textarea>
                  <div class="form-actions-bad">
                    <button>{{ $t('pages.performance.responsive.bad.form.cancel') }}</button>
                    <button>{{ $t('pages.performance.responsive.bad.form.send') }}</button>
                  </div>
                </div>
                <div class="info-bad">
                  <h5>{{ $t('pages.performance.responsive.bad.info.heading') }}</h5>
                  <p>{{ $t('pages.performance.responsive.bad.info.address') }}<br>{{ $t('pages.performance.responsive.bad.info.city') }}<br>{{ $t('pages.performance.responsive.bad.info.phone') }}</p>
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
              {{ $t('pages.performance.responsive.simulate') }}
              <select v-model="deviceType" @change="updateDevice">
                <option v-for="option in deviceOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
          </div>

          <div class="device-simulator-good" :class="deviceType">
            <h4>{{ $t('pages.performance.responsive.good.heading') }}</h4>
            <div class="responsive-interface">
              <header class="header-good">
                <div class="logo-good">{{ $t('pages.performance.responsive.bad.logo') }}</div>
                <button
                  v-if="deviceType !== 'desktop'"
                  class="menu-toggle"
                  @click="mobileMenuOpen = !mobileMenuOpen"
                  :aria-expanded="mobileMenuOpen"
                  aria-controls="responsive-nav"
                >
                  ☰ {{ $t('pages.performance.responsive.good.menu') }}
                </button>
                <nav
                  id="responsive-nav"
                  class="nav-good"
                  :class="{ open: mobileMenuOpen }"
                  v-show="deviceType === 'desktop' || mobileMenuOpen"
                >
                  <a href="#" @click="closeMenu">{{ $t('pages.performance.responsive.bad.nav.home') }}</a>
                  <a href="#" @click="closeMenu">{{ $t('pages.performance.responsive.bad.nav.about') }}</a>
                  <a href="#" @click="closeMenu">{{ $t('pages.performance.responsive.bad.nav.services') }}</a>
                  <a href="#" @click="closeMenu">{{ $t('pages.performance.responsive.bad.nav.portfolio') }}</a>
                  <a href="#" @click="closeMenu">{{ $t('pages.performance.responsive.bad.nav.blog') }}</a>
                  <a href="#" @click="closeMenu">{{ $t('pages.performance.responsive.bad.nav.contact') }}</a>
                </nav>
                <div class="actions-good" v-if="deviceType === 'desktop'">
                  <button>{{ $t('pages.performance.responsive.bad.login') }}</button>
                  <button>{{ $t('pages.performance.responsive.bad.signup') }}</button>
                </div>
              </header>

              <main class="content-section-good">
                <section class="form-section-good">
                  <h5>{{ $t('pages.performance.responsive.good.form.heading') }}</h5>
                  <form class="form-good">
                    <div class="form-row-good">
                      <input type="text" :placeholder="$t('pages.performance.responsive.bad.form.name')" :aria-label="$t('pages.performance.responsive.good.form.nameLabel')">
                      <input type="email" :placeholder="$t('pages.performance.responsive.bad.form.email')" :aria-label="$t('pages.performance.responsive.good.form.emailLabel')">
                    </div>
                    <textarea :placeholder="$t('pages.performance.responsive.good.form.messageLabel')" :aria-label="$t('pages.performance.responsive.good.form.messageLabel')"></textarea>
                    <div class="form-actions-good">
                      <button type="button">{{ $t('pages.performance.responsive.good.form.cancel') }}</button>
                      <button type="submit">{{ $t('pages.performance.responsive.good.form.send') }}</button>
                    </div>
                  </form>
                </section>

                <aside class="info-good">
                  <h5>{{ $t('pages.performance.responsive.good.info.heading') }}</h5>
                  <address>
                    {{ $t('pages.performance.responsive.bad.info.address') }}<br>
                    {{ $t('pages.performance.responsive.bad.info.city') }}<br>
                    <a :href="`tel:${$t('pages.performance.responsive.bad.info.phone').replace(/\s/g, '')}`">{{ $t('pages.performance.responsive.bad.info.phone') }}</a>
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
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.responsive.badComment') }} --&gt;
.header {
  display: flex;
  position: fixed; /* {{ $t('pages.performance.codeExamples.responsive.fixedPosition') }} */
  width: 1200px; /* {{ $t('pages.performance.codeExamples.responsive.fixedWidth') }} */
}

.nav-menu {
  display: flex; /* {{ $t('pages.performance.codeExamples.responsive.overflow') }} */
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* {{ $t('pages.performance.codeExamples.responsive.alwaysTwoColumns') }} */
}

button {
  padding: 4px 8px; /* {{ $t('pages.performance.codeExamples.responsive.tooSmallTouch') }} */
  min-width: auto;
}

&lt;!-- {{ $t('pages.performance.codeExamples.responsive.htmlNoAdaptability') }} --&gt;
&lt;header class="header"&gt;
  &lt;div class="logo"&gt;Logo&lt;/div&gt;
  &lt;nav class="nav-menu"&gt;
    &lt;a href="#"&gt;Link1&lt;/a&gt;&lt;a href="#"&gt;Link2&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;</code></pre>

          <h6>✅ Bon : Design responsive et adaptatif</h6>
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.responsive.goodComment') }} --&gt;
.header {
  display: flex;
  flex-wrap: wrap;
  width: 100%; /* {{ $t('pages.performance.codeExamples.responsive.fluid') }} */
  max-width: 100%;
}

.nav-menu {
  display: none; /* {{ $t('pages.performance.codeExamples.responsive.hiddenByDefault') }} */
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
  min-height: 44px; /* {{ $t('pages.performance.codeExamples.responsive.minTouchTarget') }} */
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}

&lt;!-- {{ $t('pages.performance.codeExamples.responsive.htmlAdaptiveNav') }} --&gt;
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
      :title="$t('pages.performance.lazyLoading.title')"
      :explanation="$t('pages.performance.lazyLoading.explanation')"
    >
      <template #bad>
        <div class="loading-demo">
          <div class="interface-bad">
            <h4>❌ {{ $t('pages.performance.lazyLoading.bad.heading') }}</h4>
            <div class="content-example-bad">
              <p class="problem-explanation">
                <strong>{{ $t('pages.performance.lazyLoading.bad.problem') }}</strong>
              </p>

              <p class="technical-term">
                <strong>📚 {{ $t('pages.performance.lazyLoading.bad.term') }}</strong>
              </p>

              <ul class="simple-list">
                <li>📥 <strong>{{ $t('pages.performance.lazyLoading.bad.issues.problem1') }}</strong></li>
                <li>⏱️ <strong>{{ $t('pages.performance.lazyLoading.bad.issues.problem2') }}</strong></li>
                <li>📱 <strong>{{ $t('pages.performance.lazyLoading.bad.issues.problem3') }}</strong></li>
                <li>🔋 <strong>{{ $t('pages.performance.lazyLoading.bad.issues.problem4') }}</strong></li>
              </ul>

              <div class="visual-example bad">
                <div class="website-example">
                  <div class="resource-item loaded">📄 {{ $t('pages.performance.lazyLoading.bad.resources.html') }}</div>
                  <div class="resource-item loaded">🎨 {{ $t('pages.performance.lazyLoading.bad.resources.css') }}</div>
                  <div class="resource-item loaded">⚙️ {{ $t('pages.performance.lazyLoading.bad.resources.js') }}</div>
                  <div class="resource-item loaded">🖼️ {{ $t('pages.performance.lazyLoading.bad.resources.img1') }}</div>
                  <div class="resource-item loaded">🖼️ {{ $t('pages.performance.lazyLoading.bad.resources.img2') }}</div>
                  <div class="resource-item loaded unnecessary">🖼️ {{ $t('pages.performance.lazyLoading.bad.resources.img3') }}</div>
                  <div class="resource-item loaded unnecessary">🖼️ {{ $t('pages.performance.lazyLoading.bad.resources.img4') }}</div>
                  <div class="resource-item loaded unnecessary">🖼️ {{ $t('pages.performance.lazyLoading.bad.resources.img5') }}</div>
                </div>
                <div class="wait-time bad">
                  ⏱️ {{ $t('pages.performance.lazyLoading.bad.time') }}
                </div>
                <div class="data-usage bad">
                  📊 {{ $t('pages.performance.lazyLoading.bad.data') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="loading-demo">
          <div class="interface-good">
            <h4>✅ {{ $t('pages.performance.lazyLoading.good.heading') }}</h4>
            <div class="content-example-good">
              <p class="solution-explanation">
                <strong>{{ $t('pages.performance.lazyLoading.good.solution') }}</strong>
              </p>

              <p class="technical-term">
                <strong>📚 {{ $t('pages.performance.lazyLoading.good.terms') }}</strong>
              </p>

              <div class="loading-controls-simple">
                <h5>{{ $t('pages.performance.lazyLoading.good.controls.title') }}</h5>
                <label class="checkbox-card">
                  <input type="checkbox" v-model="lazyLoadImages" @change="updateLoadingStrategy">
                  <div class="checkbox-content">
                    <span class="checkbox-icon">👁️</span>
                    <span class="checkbox-label">
                      <strong>{{ $t('pages.performance.lazyLoading.good.controls.lazyLoad.label') }}</strong>
                      <small>{{ $t('pages.performance.lazyLoading.good.controls.lazyLoad.description') }}</small>
                    </span>
                  </div>
                </label>

                <label class="checkbox-card">
                  <input type="checkbox" v-model="cacheEnabled" @change="updateLoadingStrategy">
                  <div class="checkbox-content">
                    <span class="checkbox-icon">💾</span>
                    <span class="checkbox-label">
                      <strong>{{ $t('pages.performance.lazyLoading.good.controls.cache.label') }}</strong>
                      <small>{{ $t('pages.performance.lazyLoading.good.controls.cache.description') }}</small>
                    </span>
                  </div>
                </label>
              </div>

              <div class="visual-example good">
                <div class="website-example">
                  <div class="resource-item loaded">📄 {{ $t('pages.performance.lazyLoading.good.resources.html') }}</div>
                  <div class="resource-item loaded">🎨 {{ $t('pages.performance.lazyLoading.good.resources.css') }}</div>
                  <div class="resource-item loaded">⚙️ {{ $t('pages.performance.lazyLoading.good.resources.js') }}</div>
                  <div class="resource-item loaded">🖼️ {{ $t('pages.performance.lazyLoading.good.resources.img1') }}</div>
                  <div class="resource-item loaded">🖼️ {{ $t('pages.performance.lazyLoading.good.resources.img2') }}</div>
                  <div class="resource-item" :class="{ 'lazy-loaded': lazyLoadImages }">
                    🖼️ {{ $t('pages.performance.lazyLoading.good.resources.img3') }} {{ lazyLoadImages ? $t('pages.performance.lazyLoading.good.resources.lazy') : $t('pages.performance.lazyLoading.good.resources.notLoaded') }}
                  </div>
                  <div class="resource-item" :class="{ 'lazy-loaded': lazyLoadImages }">
                    🖼️ {{ $t('pages.performance.lazyLoading.good.resources.img4') }} {{ lazyLoadImages ? $t('pages.performance.lazyLoading.good.resources.lazy') : $t('pages.performance.lazyLoading.good.resources.notLoaded') }}
                  </div>
                  <div class="resource-item" :class="{ cached: cacheEnabled }">
                    🖼️ {{ $t('pages.performance.lazyLoading.good.resources.imgCached') }} {{ cacheEnabled ? $t('pages.performance.lazyLoading.good.resources.cached') : $t('pages.performance.lazyLoading.good.resources.redownload') }}
                  </div>
                </div>
                <div class="wait-time good">
                  ⏱️ {{ $t('pages.performance.lazyLoading.good.time') }} <strong>{{ loadingTimeText }}</strong>
                </div>
                <div class="data-usage good" v-if="lazyLoadImages || cacheEnabled">
                  📊 {{ $t('pages.performance.lazyLoading.good.dataSaved') }} <strong>{{ dataSavingsText }}</strong>
                </div>
              </div>

              <div class="real-world-benefits">
                <h5>💡 {{ $t('pages.performance.lazyLoading.good.benefits.title') }}</h5>
                <div class="benefit-grid">
                  <div class="benefit-item">
                    <span class="benefit-icon">🚀</span>
                    <strong>{{ $t('pages.performance.lazyLoading.good.benefits.speed.label') }}</strong>
                    <p>{{ $t('pages.performance.lazyLoading.good.benefits.speed.description') }}</p>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">📱</span>
                    <strong>{{ $t('pages.performance.lazyLoading.good.benefits.mobile.label') }}</strong>
                    <p>{{ $t('pages.performance.lazyLoading.good.benefits.mobile.description') }}</p>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">🔋</span>
                    <strong>{{ $t('pages.performance.lazyLoading.good.benefits.battery.label') }}</strong>
                    <p>{{ $t('pages.performance.lazyLoading.good.benefits.battery.description') }}</p>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">♿</span>
                    <strong>{{ $t('pages.performance.lazyLoading.good.benefits.devices.label') }}</strong>
                    <p>{{ $t('pages.performance.lazyLoading.good.benefits.devices.description') }}</p>
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
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.lazyLoading.badComment') }} --&gt;
&lt;img src="photo-tres-lourde-5mo.jpg" alt="Photo"&gt;
&lt;img src="autre-photo-4mo.jpg" alt="Autre photo"&gt;
&lt;img src="encore-une-3mo.jpg" alt="Encore une photo"&gt;

&lt;!-- {{ $t('pages.performance.codeExamples.lazyLoading.resultBefore') }} --&gt;</code></pre>

          <h6>✅ Charger intelligemment</h6>
          <pre><code>&lt;!-- {{ $t('pages.performance.codeExamples.lazyLoading.goodComment') }} --&gt;
&lt;img src="photo-optimisee-500ko.webp"
     alt="Photo"
     loading="lazy"&gt;

&lt;!-- {{ $t('pages.performance.codeExamples.lazyLoading.otherImagesOnScroll') }} --&gt;
&lt;img src="autre-photo-500ko.webp"
     alt="Autre photo"
     loading="lazy"&gt;

&lt;!-- {{ $t('pages.performance.codeExamples.lazyLoading.resultSmart') }} --&gt;</code></pre>
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
