<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const { getPageSEO } = useSEOConfig()
const seo = getPageSEO('/')

useHead(seo)

import { onMounted, onUnmounted, computed } from 'vue'

// FAQ Schema.org structured data for better SEO
const faqSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": t('pages.ariaComponents.faq.questions.q1.title'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('pages.ariaComponents.faq.questions.q1.content')
      }
    },
    {
      "@type": "Question",
      "name": t('pages.ariaComponents.faq.questions.q2.title'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('pages.ariaComponents.faq.questions.q2.content')
      }
    },
    {
      "@type": "Question",
      "name": t('pages.ariaComponents.faq.questions.q3.title'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('pages.ariaComponents.faq.questions.q3.content')
      }
    }
  ]
}))

let scriptElement = null

onMounted(() => {
  // Inject FAQ schema into document head
  scriptElement = document.createElement('script')
  scriptElement.type = 'application/ld+json'
  scriptElement.textContent = JSON.stringify(faqSchema.value)
  document.head.appendChild(scriptElement)
})

onUnmounted(() => {
  // Clean up when component unmounts
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement)
  }
})

const quickLinks = computed(() => [
  {
    path: localePath('/color-contrast'),
    icon: '🎨',
    title: t('pages.home.quickNav.links.contrast.title'),
    description: t('pages.home.quickNav.links.contrast.description')
  },
  {
    path: localePath('/media-accessible'),
    icon: '🖼️',
    title: t('pages.home.quickNav.links.media.title'),
    description: t('pages.home.quickNav.links.media.description')
  },
  {
    path: localePath('/aria-components'),
    icon: '🔄',
    title: t('pages.home.quickNav.links.aria.title'),
    description: t('pages.home.quickNav.links.aria.description')
  },
  {
    path: localePath('/keyboard-navigation'),
    icon: '⌨️',
    title: t('pages.home.quickNav.links.keyboard.title'),
    description: t('pages.home.quickNav.links.keyboard.description')
  },
  {
    path: localePath('/accessible-forms'),
    icon: '📋',
    title: t('pages.home.quickNav.links.forms.title'),
    description: t('pages.home.quickNav.links.forms.description')
  },
  {
    path: localePath('/semantic-html'),
    icon: '📝',
    title: t('pages.home.quickNav.links.semantic.title'),
    description: t('pages.home.quickNav.links.semantic.description')
  },
  {
    path: localePath('/performance'),
    icon: '⚡',
    title: t('pages.home.quickNav.links.performance.title'),
    description: t('pages.home.quickNav.links.performance.description')
  }
])
</script>

<template>
  <div class="home">
    <header>
      <h1>{{ $t('pages.home.title') }}</h1>
      <p class="lead">
        {{ $t('pages.home.lead') }}
      </p>
    </header>

    <section aria-labelledby="intro-title">
      <h2 id="intro-title">{{ $t('pages.home.whyAccessibility') }}</h2>

      <div class="stats-grid">
        <a href="https://www.un.org/fr/observances/day-of-persons-with-disabilities/background" class="stat-card stat-card-link" target="_blank" rel="noopener">
          <span class="stat-number">15%</span>
          <span class="stat-label">{{ $t('pages.home.stats.disability') }} ↗</span>
        </a>
        <a href="https://ec.europa.eu/social/main.jsp?catId=1202" class="stat-card stat-card-link" target="_blank" rel="noopener">
          <span class="stat-number">2025</span>
          <span class="stat-label">{{ $t('pages.home.stats.directive') }} ↗</span>
        </a>
        <a href="https://webaim.org/projects/million/#intro" class="stat-card stat-card-link" target="_blank" rel="noopener">
          <span class="stat-number">94.8%</span>
          <span class="stat-label">{{ $t('pages.home.stats.errors') }} ↗</span>
        </a>
      </div>
    </section>

    <section aria-labelledby="curb-cut-title">
      <div class="curb-cut-intro">
          <div class="curb-cut-text">
            <h3 id="curb-cut-title">{{ $t('pages.home.curbCut.title') }}</h3>
            <p>
              {{ $t('pages.home.curbCut.intro1') }}
            </p>
            <p>
              {{ $t('pages.home.curbCut.intro2') }}
            </p>
          </div>
          <div class="curb-cut-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Naked_Pictures_of_Bea_Arthur_0048.jpg/1920px-Naked_Pictures_of_Bea_Arthur_0048.jpg"
              :alt="$t('pages.home.curbCut.imageCaption')"
              loading="lazy"
            />
            <p class="image-caption">{{ $t('pages.home.curbCut.imageCaption') }}</p>
          </div>
        </div>

      <div class="curb-cut-examples">
        <div class="curb-cut-example">
          <h4>♿ {{ $t('pages.home.curbCut.examples.ramps.title') }}</h4>
          <p><strong>{{ $t('pages.ariaComponents.forms.bad.emailPlaceholder').split(' ')[0] }} :</strong> {{ $t('pages.home.curbCut.examples.ramps.designedFor') }}</p>
          <p><strong>{{ $t('pages.home.curbCut.examples.ramps.benefitsAlso').split(',')[0] }} :</strong> {{ $t('pages.home.curbCut.examples.ramps.benefitsAlso') }}</p>
        </div>

        <div class="curb-cut-example">
          <h4>🎬 {{ $t('pages.home.curbCut.examples.captions.title') }}</h4>
          <p><strong>Conçus pour :</strong> {{ $t('pages.home.curbCut.examples.captions.designedFor') }}</p>
          <p><strong>Bénéficient aussi à :</strong> {{ $t('pages.home.curbCut.examples.captions.benefitsAlso') }}</p>
        </div>

        <div class="curb-cut-example">
          <h4>⌨️ {{ $t('pages.home.curbCut.examples.keyboard.title') }}</h4>
          <p><strong>Conçue pour :</strong> {{ $t('pages.home.curbCut.examples.keyboard.designedFor') }}</p>
          <p><strong>Bénéficie aussi à :</strong> {{ $t('pages.home.curbCut.examples.keyboard.benefitsAlso') }}</p>
        </div>

        <div class="curb-cut-example">
          <h4>📱 {{ $t('pages.home.curbCut.examples.voice.title') }}</h4>
          <p><strong>Conçue pour :</strong> {{ $t('pages.home.curbCut.examples.voice.designedFor') }}</p>
          <p><strong>Bénéficie aussi à :</strong> {{ $t('pages.home.curbCut.examples.voice.benefitsAlso') }}</p>
        </div>

        <div class="curb-cut-example">
          <h4>🪥 {{ $t('pages.home.curbCut.examples.toothbrush.title') }}</h4>
          <p><strong>Conçue pour :</strong> {{ $t('pages.home.curbCut.examples.toothbrush.designedFor') }}</p>
          <p><strong>Bénéficie aussi à :</strong> {{ $t('pages.home.curbCut.examples.toothbrush.benefitsAlso') }}</p>
        </div>

        <div class="curb-cut-example">
          <h4>🎧 {{ $t('pages.home.curbCut.examples.audiobooks.title') }}</h4>
          <p><strong>Conçus pour :</strong> {{ $t('pages.home.curbCut.examples.audiobooks.designedFor') }}</p>
          <p><strong>Bénéficient aussi à :</strong> {{ $t('pages.home.curbCut.examples.audiobooks.benefitsAlso') }}</p>
        </div>
      </div>

      <p class="accessibility-quote">
        <strong>{{ $t('pages.home.curbCut.quote') }}</strong>
      </p>
    </section>

    <section aria-labelledby="tools-title">
      <h2 id="tools-title">{{ $t('pages.home.tools.title') }}</h2>
      <p>{{ $t('pages.home.tools.intro') }}</p>

      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🌊</span>
            <h3>{{ $t('pages.home.tools.wave.name') }}</h3>
          </div>
          <p class="tool-description">{{ $t('pages.home.tools.wave.description') }}</p>
          <div class="tool-features">
            <span class="tool-feature">✓ {{ $t('pages.home.tools.wave.features.realtime') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.wave.features.visualization') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.wave.features.report') }}</span>
          </div>
          <a href="https://wave.webaim.org/" class="tool-link" target="_blank" rel="noopener">
            {{ $t('pages.home.tools.wave.link') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🪓</span>
            <h3>{{ $t('pages.home.tools.axe.name') }}</h3>
          </div>
          <p class="tool-description">{{ $t('pages.home.tools.axe.description') }}</p>
          <div class="tool-features">
            <span class="tool-feature">✓ {{ $t('pages.home.tools.axe.features.integrated') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.axe.features.automated') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.axe.features.suggestions') }}</span>
          </div>
          <a href="https://www.deque.com/axe/devtools/" class="tool-link" target="_blank" rel="noopener">
            {{ $t('pages.home.tools.axe.link') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🏮</span>
            <h3>{{ $t('pages.home.tools.lighthouse.name') }}</h3>
          </div>
          <p class="tool-description">{{ $t('pages.home.tools.lighthouse.description') }}</p>
          <div class="tool-features">
            <span class="tool-feature">✓ {{ $t('pages.home.tools.lighthouse.features.builtin') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.lighthouse.features.score') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.lighthouse.features.recommendations') }}</span>
          </div>
          <a href="https://developer.chrome.com/docs/lighthouse/accessibility/" class="tool-link" target="_blank" rel="noopener">
            {{ $t('pages.home.tools.lighthouse.link') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">📚</span>
            <h3>{{ $t('pages.home.tools.mdn.name') }}</h3>
          </div>
          <p class="tool-description">{{ $t('pages.home.tools.mdn.description') }}</p>
          <div class="tool-features">
            <span class="tool-feature">✓ {{ $t('pages.home.tools.mdn.features.guides') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.mdn.features.examples') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.mdn.features.updates') }}</span>
          </div>
          <a href="https://developer.mozilla.org/fr/docs/Web/Accessibility" class="tool-link" target="_blank" rel="noopener">
            {{ $t('pages.home.tools.mdn.link') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🎨</span>
            <h3>{{ $t('pages.home.tools.cca.name') }}</h3>
          </div>
          <p class="tool-description">{{ $t('pages.home.tools.cca.description') }}</p>
          <div class="tool-features">
            <span class="tool-feature">✓ {{ $t('pages.home.tools.cca.features.realtime') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.cca.features.picker') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.cca.features.ratios') }}</span>
          </div>
          <a href="https://www.tpgi.com/color-contrast-checker/" class="tool-link" target="_blank" rel="noopener">
            {{ $t('pages.home.tools.cca.link') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="tool-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🔍</span>
            <h3>{{ $t('pages.home.tools.insights.name') }}</h3>
          </div>
          <p class="tool-description">{{ $t('pages.home.tools.insights.description') }}</p>
          <div class="tool-features">
            <span class="tool-feature">✓ {{ $t('pages.home.tools.insights.features.guided') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.insights.features.focus') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.insights.features.fastpass') }}</span>
          </div>
          <a href="https://accessibilityinsights.io/" class="tool-link" target="_blank" rel="noopener">
            {{ $t('pages.home.tools.insights.link') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div class="pro-tip">
        <strong>💡 {{ $t('pages.home.tools.proTip').split(':')[0] }} :</strong> {{ $t('pages.home.tools.proTip').split(':').slice(1).join(':').trim() }}
      </div>

      <div class="featured-tool">
        <div class="tool-card game-card">
          <div class="tool-header">
            <span class="tool-icon" aria-hidden="true">🎮</span>
            <h3>{{ $t('pages.home.tools.game.name') }}</h3>
            <span class="featured-badge">{{ $t('pages.home.tools.game.badge') }}</span>
          </div>
          <p class="tool-description">{{ $t('pages.home.tools.game.description') }}</p>
          <div class="tool-features">
            <span class="tool-feature">✓ {{ $t('pages.home.tools.game.features.quiz') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.game.features.cases') }}</span>
            <span class="tool-feature">✓ {{ $t('pages.home.tools.game.features.learning') }}</span>
          </div>
          <a href="https://accessible-game-jam.com/" class="tool-link game-link" target="_blank" rel="noopener">
            {{ $t('pages.home.tools.game.link') }}
            <span aria-hidden="true">🎯</span>
          </a>
        </div>
      </div>
    </section>

    <section aria-labelledby="screen-readers-title">
      <h2 id="screen-readers-title">{{ $t('pages.home.screenReaders.title') }}</h2>
      <p>{{ $t('pages.home.screenReaders.intro') }}</p>

      <div class="screen-readers-grid">
        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🖥️</span>
            <h3>{{ $t('pages.home.screenReaders.nvda.name') }}</h3>
            <span class="platform-tag">{{ $t('pages.home.screenReaders.nvda.platform') }}</span>
          </div>
          <p>{{ $t('pages.home.screenReaders.nvda.description') }}</p>
          <div class="screen-reader-stats">
            <span class="stat">✓ {{ $t('pages.home.screenReaders.nvda.free') }}</span>
            <span class="stat">{{ $t('pages.home.screenReaders.nvda.usage') }}</span>
          </div>
          <a href="https://www.nvaccess.org/" class="screen-reader-link" target="_blank" rel="noopener">
            {{ $t('pages.home.screenReaders.nvda.link') }}
          </a>
        </div>

        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🖥️</span>
            <h3>{{ $t('pages.home.screenReaders.jaws.name') }}</h3>
            <span class="platform-tag">{{ $t('pages.home.screenReaders.jaws.platform') }}</span>
          </div>
          <p>{{ $t('pages.home.screenReaders.jaws.description') }}</p>
          <div class="screen-reader-stats">
            <span class="stat">💰 {{ $t('pages.home.screenReaders.jaws.paid') }}</span>
            <span class="stat">{{ $t('pages.home.screenReaders.jaws.usage') }}</span>
          </div>
          <a href="https://www.freedomscientific.com/products/software/jaws/" class="screen-reader-link" target="_blank" rel="noopener">
            {{ $t('pages.home.screenReaders.jaws.link') }}
          </a>
        </div>

        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🍎</span>
            <h3>{{ $t('pages.home.screenReaders.voiceover.name') }}</h3>
            <span class="platform-tag">{{ $t('pages.home.screenReaders.voiceover.platform') }}</span>
          </div>
          <p>{{ $t('pages.home.screenReaders.voiceover.description') }}</p>
          <div class="screen-reader-stats">
            <span class="stat">✓ {{ $t('pages.home.screenReaders.voiceover.builtin') }}</span>
            <span class="stat">{{ $t('pages.home.screenReaders.voiceover.usage') }}</span>
          </div>
          <div class="shortcut-tip">
            <strong>{{ $t('pages.home.screenReaders.voiceover.shortcut') }}</strong> <kbd>Cmd</kbd> + <kbd>F5</kbd>
          </div>
        </div>

        <div class="screen-reader-card">
          <div class="screen-reader-header">
            <span class="screen-reader-icon" aria-hidden="true">🤖</span>
            <h3>{{ $t('pages.home.screenReaders.talkback.name') }}</h3>
            <span class="platform-tag">{{ $t('pages.home.screenReaders.talkback.platform') }}</span>
          </div>
          <p>{{ $t('pages.home.screenReaders.talkback.description') }}</p>
          <div class="screen-reader-stats">
            <span class="stat">✓ {{ $t('pages.home.screenReaders.talkback.builtin') }}</span>
            <span class="stat">{{ $t('pages.home.screenReaders.talkback.usage') }}</span>
          </div>
          <div class="shortcut-tip">
            <strong>{{ $t('pages.home.screenReaders.talkback.activation') }}</strong>
          </div>
        </div>
      </div>

      <div class="testing-tip">
        <h4>🧪 {{ $t('pages.home.screenReaders.testing.title') }}</h4>
        <ol>
          <li><strong>{{ $t('pages.home.screenReaders.testing.steps.close').split(' ')[0] }}</strong> {{ $t('pages.home.screenReaders.testing.steps.close').split(' ').slice(1).join(' ') }}</li>
          <li><strong>{{ $t('pages.home.screenReaders.testing.steps.keyboard').split(' ')[0] }}</strong> {{ $t('pages.home.screenReaders.testing.steps.keyboard').split(' ').slice(1).join(' ') }}</li>
          <li><strong>{{ $t('pages.home.screenReaders.testing.steps.listen').split(' ')[0] }}</strong> {{ $t('pages.home.screenReaders.testing.steps.listen').split(' ').slice(1).join(' ') }}</li>
          <li><strong>{{ $t('pages.home.screenReaders.testing.steps.verify').split(' ')[0] }}</strong> {{ $t('pages.home.screenReaders.testing.steps.verify').split(' ').slice(1).join(' ') }}</li>
        </ol>
        <p class="testing-note">
          <strong>{{ $t('pages.home.screenReaders.testing.note').split(':')[0] }} :</strong> {{ $t('pages.home.screenReaders.testing.note').split(':').slice(1).join(':').trim() }}
        </p>
      </div>
    </section>

    <section aria-labelledby="nav-title">
      <h2 id="nav-title">{{ $t('pages.home.quickNav.title') }}</h2>
      <p>{{ $t('pages.home.quickNav.intro') }}</p>

      <nav aria-label="Navigation secondaire">
        <ul class="quick-nav">
          <li v-for="item in quickLinks" :key="item.path">
            <router-link :to="item.path" class="quick-link">
              <span class="quick-icon" aria-hidden="true">{{ item.icon }}</span>
              <span class="quick-title">{{ item.title }}</span>
              <span class="quick-desc">{{ item.description }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </section>

  </div>
</template>

<style scoped>
.home {
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
  color: var(--color-text);
  margin-bottom: 0;
}

.subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

section {
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-card {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
  text-align: left;
}

.stat-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  cursor: pointer;
}

.stat-card-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--color-primary-light);
}

.stat-card-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-text);
}

.stat-label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.quick-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.quick-nav li {
  display: flex;
}

.quick-link {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.quick-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.quick-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.quick-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.quick-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.quick-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.shortcuts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
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
  border-radius: 0.625rem;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

/* Curb-cut intro with image */
.curb-cut-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.curb-cut-text h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.curb-cut-text p {
  margin-bottom: 1rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.curb-cut-image {
  text-align: left;
}

.curb-cut-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 0.625rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-caption {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-style: italic;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .curb-cut-intro {
    grid-template-columns: 1fr;
  }

  .curb-cut-image {
    order: -1;
  }
}

/* Curb-cut examples */
.curb-cut-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.curb-cut-example {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
}

.curb-cut-example h4 {
  color: var(--color-text);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.curb-cut-example p {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
}

.curb-cut-example p:last-child {
  margin-bottom: 0;
}

.curb-cut-example strong {
  color: var(--color-text);
  display: inline-block;
  margin-right: 0.25rem;
}


/* Accessibility quote */
.accessibility-quote {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-info-light) 100%);
  border-radius: 0.625rem;
  text-align: left;
  font-size: 1.25rem;
}

.accessibility-quote strong {
  color: var(--color-text);
}

/* Tools section */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tool-card {
  background: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.tool-icon {
  font-size: 1.5rem;
}

.tool-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
}

.tool-description {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.tool-features {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.tool-feature {
  font-size: 0.9rem;
  color: var(--color-success);
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  border: 2px solid var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.625rem;
  transition: background-color 0.2s, color 0.2s;
}

.tool-link:hover {
  background-color: var(--color-text);
  color: white;
}

.tool-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.pro-tip {
  background: var(--color-warning-light);
  border: 2px solid var(--color-warning);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.pro-tip strong {
  color: var(--color-warning-dark);
}

/* Featured tool section */
.featured-tool {
  margin-top: 2rem;
}

.game-card {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-info-light) 50%, var(--color-success-light) 100%);
  border: 2px solid var(--color-primary);
  position: relative;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.featured-badge {
  background: var(--color-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.625rem;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: auto;
}

.game-link {
  background-color: var(--color-primary);
  color: white;
  border: none;
  font-weight: 600;
}

.game-link:hover {
  background-color: var(--color-primary-dark);
  color: white;
}

/* Screen readers section */
.screen-readers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.screen-reader-card {
  background: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.screen-reader-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.screen-reader-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.screen-reader-icon {
  font-size: 1.5rem;
}

.screen-reader-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
  flex: 1;
}

.platform-tag {
  background: var(--color-info-light);
  color: var(--color-info-dark);
  padding: 0.25rem 0.75rem;
  border-radius: 0.625rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.screen-reader-stats {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.stat {
  background: var(--color-bg);
  padding: 0.25rem 0.75rem;
  border-radius: 0.625rem;
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
}

.screen-reader-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  border: 2px solid var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.625rem;
  transition: background-color 0.2s, color 0.2s;
  margin-top: 1rem;
}

.screen-reader-link:hover {
  background-color: var(--color-text);
  color: white;
}

.screen-reader-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.shortcut-tip {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-bg);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
}

.testing-tip {
  background: var(--color-info-light);
  border: 2px solid var(--color-info);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 2rem;
}

.testing-tip h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--color-info-dark);
}

.testing-tip ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.testing-tip li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.testing-note {
  margin-bottom: 0;
  font-style: italic;
  background: rgba(255, 255, 255, 0.5);
  padding: 1rem;
  border-radius: 0.625rem;
  margin-top: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .quick-link,
  .tool-card,
  .screen-reader-card,
  .stat-card-link {
    transition: none;
  }
}
</style>
