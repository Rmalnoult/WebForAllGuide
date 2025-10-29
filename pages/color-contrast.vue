<script setup>
const { getPageSEO } = useSEOConfig()
const seo = getPageSEO('/color-contrast')

useHead(seo)

import { ref, computed } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Initialize syntax highlighting
useSyntaxHighlight()

const badTheme = ref('light')
const goodTheme = ref('light')

// Computed properties for chart data labels
const chartMonths = computed(() => ({
  jan: t('pages.colorContrast.colorblind.chart.months.jan'),
  feb: t('pages.colorContrast.colorblind.chart.months.feb'),
  mar: t('pages.colorContrast.colorblind.chart.months.mar')
}))
</script>

<template>
  <div class="color-contrast">
    <PageHeader
      :title="$t('pages.colorContrast.title')"
      :description="$t('pages.colorContrast.description')"
    />

    <section aria-labelledby="wcag-stats-title" class="wcag-stats-section">
      <h2 id="wcag-stats-title" class="visually-hidden">{{ $t('pages.colorContrast.wcagStats.title') }}</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-number">{{ $t('pages.colorContrast.wcagStats.normalText.ratio') }}</span>
          <span class="stat-label">{{ $t('pages.colorContrast.wcagStats.normalText.label') }}</span>
          <span class="stat-detail">{{ $t('pages.colorContrast.wcagStats.normalText.detail') }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ $t('pages.colorContrast.wcagStats.largeText.ratio') }}</span>
          <span class="stat-label">{{ $t('pages.colorContrast.wcagStats.largeText.label') }}</span>
          <span class="stat-detail">{{ $t('pages.colorContrast.wcagStats.largeText.detail') }}</span>
        </div>
      </div>
    </section>

    <ExampleToggle
      :title="$t('pages.colorContrast.textContrast.title')"
      :explanation="$t('pages.colorContrast.textContrast.explanation')"
    >
      <template #bad>
        <div class="contrast-demo">
          <div class="text-samples-bad">
            <div class="sample sample-1">
              <p class="light-gray-text">{{ $t('pages.colorContrast.textContrast.bad.sample1') }}</p>
              <small class="ratio">Ratio: 2.2:1</small>
            </div>

            <div class="sample sample-2">
              <p class="medium-gray-text">{{ $t('pages.colorContrast.textContrast.bad.sample2') }}</p>
              <small class="ratio">Ratio: 3.8:1</small>
            </div>

            <div class="sample sample-3">
              <p class="yellow-text">{{ $t('pages.colorContrast.textContrast.bad.sample3') }}</p>
              <small class="ratio">Ratio: 1.9:1</small>
            </div>

            <div class="sample sample-4 red-bg">
              <p class="orange-on-red">{{ $t('pages.colorContrast.textContrast.bad.sample4') }}</p>
              <small class="ratio ratio-light">Ratio: 1.2:1</small>
            </div>

            <div class="sample sample-5 dark-bg">
              <p class="dark-gray-on-dark">{{ $t('pages.colorContrast.textContrast.bad.sample5') }}</p>
              <small class="ratio">Ratio: 2.5:1</small>
            </div>

            <div class="sample sample-6 dark-bg">
              <p class="blue-on-dark">{{ $t('pages.colorContrast.textContrast.bad.sample6') }}</p>
              <small class="ratio">Ratio: 1.8:1</small>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="contrast-demo">
          <div class="text-samples-good">
            <div class="sample sample-1">
              <p class="dark-gray-text">{{ $t('pages.colorContrast.textContrast.good.sample1') }}</p>
              <small class="ratio">Ratio: 7.0:1</small>
            </div>

            <div class="sample sample-2">
              <p class="black-text">{{ $t('pages.colorContrast.textContrast.good.sample2') }}</p>
              <small class="ratio">Ratio: 21:1</small>
            </div>

            <div class="sample sample-3">
              <p class="blue-text">{{ $t('pages.colorContrast.textContrast.good.sample3') }}</p>
              <small class="ratio">Ratio: 5.9:1</small>
            </div>

            <div class="sample sample-4 blue-bg">
              <p class="white-on-blue">{{ $t('pages.colorContrast.textContrast.good.sample4') }}</p>
              <small class="ratio ratio-light">Ratio: 8.6:1</small>
            </div>

            <div class="sample sample-5 dark-bg">
              <p class="white-on-black">{{ $t('pages.colorContrast.textContrast.good.sample5') }}</p>
              <small class="ratio">Ratio: 21:1</small>
            </div>

            <div class="sample sample-6 dark-bg">
              <p class="yellow-on-dark">{{ $t('pages.colorContrast.textContrast.good.sample6') }}</p>
              <small class="ratio">Ratio: 12.3:1</small>
            </div>
          </div>
        </div>
      </template>

      <template #bad-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.textContrast.badComment') }} --&gt;
&lt;style&gt;
  /* Texte gris clair - Ratio 2.2:1 (échec) */
  .light-text {
    color: #d8d8d8;
    background: #ffffff;
  }

  /* Texte gris moyen - Ratio 3.8:1 (échec AA) */
  .medium-text {
    color: #949494;
    background: #ffffff;
  }

  /* Texte jaune - Ratio 1.9:1 (échec) */
  .warning-text {
    color: #e6d800;
    background: #ffffff;
  }

  /* Orange sur rouge - Ratio 1.2:1 (échec) */
  .error-combo {
    color: #ff8c00;
    background: #ff4444;
  }
&lt;/style&gt;

&lt;p class="light-text"&gt;Texte difficile à lire&lt;/p&gt;
&lt;p class="medium-text"&gt;Contraste insuffisant&lt;/p&gt;
&lt;p class="warning-text"&gt;Jaune sur blanc&lt;/p&gt;
&lt;div class="error-combo"&gt;Orange sur rouge&lt;/div&gt;</code></pre>
        </div>
      </template>

      <template #good-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.textContrast.goodComment') }} --&gt;
&lt;style&gt;
  /* Texte gris foncé - Ratio 7.0:1 (AAA) */
  .accessible-text {
    color: #555555;
    background: #ffffff;
  }

  /* Texte noir - Ratio 21:1 (AAA) */
  .high-contrast {
    color: #000000;
    background: #ffffff;
  }

  /* Bleu foncé - Ratio 5.9:1 (AA) */
  .link-text {
    color: #0056b3;
    background: #ffffff;
  }

  /* Blanc sur bleu - Ratio 8.6:1 (AAA) */
  .button-primary {
    color: #ffffff;
    background: #003d82;
  }

  /* Jaune sur noir - Ratio 12.3:1 (AAA) */
  .warning-accessible {
    color: #ffd700;
    background: #1a1a1a;
  }
&lt;/style&gt;

&lt;p class="accessible-text"&gt;Texte facilement lisible&lt;/p&gt;
&lt;p class="high-contrast"&gt;Contraste maximum&lt;/p&gt;
&lt;a class="link-text"&gt;Lien accessible&lt;/a&gt;
&lt;button class="button-primary"&gt;Bouton accessible&lt;/button&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.colorContrast.colorInfo.title')"
      :explanation="$t('pages.colorContrast.colorInfo.explanation')"
    >
      <template #bad>
        <div class="color-info-demo">
          <div class="form-example-bad">
            <h4>{{ $t('pages.colorContrast.colorInfo.form.heading') }}</h4>
            <div class="form-group">
              <label>{{ $t('pages.colorContrast.colorInfo.form.name') }}</label>
              <input type="text" class="input-error" value="Jo">
            </div>
            <div class="form-group">
              <label>{{ $t('pages.colorContrast.colorInfo.form.email') }}</label>
              <input type="email" class="input-valid" value="john@example.com">
            </div>
            <div class="form-group">
              <label>{{ $t('pages.colorContrast.colorInfo.form.password') }}</label>
              <input type="password" class="input-error" value="123" autocomplete="new-password">
            </div>
            <p class="color-legend">🔴 {{ $t('pages.colorContrast.colorInfo.form.legend') }}</p>
          </div>

          <div class="status-example-bad">
            <h4>{{ $t('pages.colorContrast.colorInfo.orders.heading') }}</h4>
            <div class="order-list">
              <div class="order-item">
                <span class="order-number">#1234</span>
                <span class="status-dot status-red" aria-hidden="true">●</span>
              </div>
              <div class="order-item">
                <span class="order-number">#1235</span>
                <span class="status-dot status-yellow" aria-hidden="true">●</span>
              </div>
              <div class="order-item">
                <span class="order-number">#1236</span>
                <span class="status-dot status-green" aria-hidden="true">●</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="color-info-demo">
          <div class="form-example-good">
            <h4>{{ $t('pages.colorContrast.colorInfo.form.heading') }}</h4>
            <div class="form-group">
              <label>{{ $t('pages.colorContrast.colorInfo.form.name') }}</label>
              <input type="text" class="input-error" value="Jo" aria-describedby="name-error">
              <div id="name-error" class="error-message">
                ❌ {{ $t('pages.colorContrast.colorInfo.form.errors.nameMin') }}
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('pages.colorContrast.colorInfo.form.email') }}</label>
              <input type="email" class="input-valid" value="john@example.com" aria-describedby="email-success">
              <div id="email-success" class="success-message">
                ✅ {{ $t('pages.colorContrast.colorInfo.form.success.email') }}
              </div>
            </div>
            <div class="form-group">
              <label>{{ $t('pages.colorContrast.colorInfo.form.password') }}</label>
              <input type="password" class="input-error" value="123" aria-describedby="password-error" autocomplete="new-password">
              <div id="password-error" class="error-message">
                ❌ {{ $t('pages.colorContrast.colorInfo.form.errors.passwordMin') }}
              </div>
            </div>
          </div>

          <div class="status-example-good">
            <h4>{{ $t('pages.colorContrast.colorInfo.orders.heading') }}</h4>
            <div class="order-list">
              <div class="order-item">
                <span class="order-number">#1234</span>
                <span class="status-pending">
                  <span class="status-icon" aria-hidden="true">⏳</span>
                  {{ $t('pages.colorContrast.colorInfo.orders.pending') }}
                </span>
              </div>
              <div class="order-item">
                <span class="order-number">#1235</span>
                <span class="status-processing">
                  <span class="status-icon" aria-hidden="true">🚚</span>
                  {{ $t('pages.colorContrast.colorInfo.orders.processing') }}
                </span>
              </div>
              <div class="order-item">
                <span class="order-number">#1236</span>
                <span class="status-delivered">
                  <span class="status-icon" aria-hidden="true">✅</span>
                  {{ $t('pages.colorContrast.colorInfo.orders.delivered') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #bad-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorOnly.badComment') }} --&gt;
&lt;style&gt;
  .input-error {
    border: 2px solid red; /* Seulement la couleur rouge */
  }

  .input-valid {
    border: 2px solid green; /* Seulement la couleur verte */
  }

  .status-pending { color: red; }
  .status-processing { color: yellow; }
  .status-completed { color: green; }
&lt;/style&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorOnly.formNoIndicators') }} --&gt;
&lt;input class="input-error" value="Jo"&gt;
&lt;input class="input-valid" value="john@example.com"&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorOnly.statusNoText') }} --&gt;
&lt;div class="order"&gt;
  &lt;span&gt;#1234&lt;/span&gt;
  &lt;span class="status-pending"&gt;●&lt;/span&gt; &lt;!-- {{ $t('pages.colorContrast.codeExamples.colorOnly.onlyColor') }} --&gt;
&lt;/div&gt;</code></pre>
        </div>
      </template>

      <template #good-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorOnly.goodComment') }} --&gt;
&lt;style&gt;
  .input-error {
    border: 2px solid #e53e3e;
  }

  .input-valid {
    border: 2px solid #38a169;
  }

  .error-message {
    color: #e53e3e;
  }

  .success-message {
    color: #38a169;
  }
&lt;/style&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorOnly.formExplicitMessages') }} --&gt;
&lt;input class="input-error"
       value="Jo"
       aria-describedby="name-error"&gt;
&lt;div id="name-error" class="error-message"&gt;
  ❌ Le nom doit contenir au moins 3 caractères
&lt;/div&gt;

&lt;input class="input-valid"
       value="john@example.com"
       aria-describedby="email-success"&gt;
&lt;div id="email-success" class="success-message"&gt;
  ✅ Email valide
&lt;/div&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorOnly.statusWithTextIcons') }} --&gt;
&lt;div class="order"&gt;
  &lt;span&gt;#1234&lt;/span&gt;
  &lt;span class="status-pending"&gt;
    &lt;span aria-hidden="true"&gt;⏳&lt;/span&gt;
    En attente
  &lt;/span&gt;
&lt;/div&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.colorContrast.colorblind.title')"
      :explanation="$t('pages.colorContrast.colorblind.explanation')"
    >
      <template #bad>
        <div class="colorblind-demo">
          <h4>{{ $t('pages.colorContrast.colorblind.chart.title') }}</h4>
          <div class="chart-bad">
            <div class="legend-bad">
              <span class="legend-item">
                <span class="legend-color red"></span> {{ $t('pages.colorContrast.colorblind.chart.legend.errors') }}
              </span>
              <span class="legend-item">
                <span class="legend-color green"></span> {{ $t('pages.colorContrast.colorblind.chart.legend.success') }}
              </span>
            </div>
            <div class="chart-bars">
              <div class="bar-group">
                <div class="bar red-bar" style="height: 60px;"></div>
                <div class="bar green-bar" style="height: 40px;"></div>
                <span class="bar-label">{{ chartMonths.jan }}</span>
              </div>
              <div class="bar-group">
                <div class="bar red-bar" style="height: 30px;"></div>
                <div class="bar green-bar" style="height: 70px;"></div>
                <span class="bar-label">{{ chartMonths.feb }}</span>
              </div>
              <div class="bar-group">
                <div class="bar red-bar" style="height: 20px;"></div>
                <div class="bar green-bar" style="height: 80px;"></div>
                <span class="bar-label">{{ chartMonths.mar }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="colorblind-demo">
          <h4>{{ $t('pages.colorContrast.colorblind.chart.title') }}</h4>
          <div class="chart-good">
            <div class="legend-good">
              <span class="legend-item">
                <span class="legend-color error-color"></span>
                {{ $t('pages.colorContrast.colorblind.chart.legend.errors') }}
              </span>
              <span class="legend-item">
                <span class="legend-color success-color"></span>
                {{ $t('pages.colorContrast.colorblind.chart.legend.success') }}
              </span>
            </div>
            <div class="chart-bars">
              <div class="bar-group">
                <div class="bar error-bar striped" style="height: 60px;" :title="$t('pages.colorContrast.colorblind.chart.legend.errors') + ': 60'"></div>
                <div class="bar success-bar dotted" style="height: 40px;" :title="$t('pages.colorContrast.colorblind.chart.legend.success') + ': 40'"></div>
                <span class="bar-label">{{ chartMonths.jan }}</span>
              </div>
              <div class="bar-group">
                <div class="bar error-bar striped" style="height: 30px;" :title="$t('pages.colorContrast.colorblind.chart.legend.errors') + ': 30'"></div>
                <div class="bar success-bar dotted" style="height: 70px;" :title="$t('pages.colorContrast.colorblind.chart.legend.success') + ': 70'"></div>
                <span class="bar-label">{{ chartMonths.feb }}</span>
              </div>
              <div class="bar-group">
                <div class="bar error-bar striped" style="height: 20px;" :title="$t('pages.colorContrast.colorblind.chart.legend.errors') + ': 20'"></div>
                <div class="bar success-bar dotted" style="height: 80px;" :title="$t('pages.colorContrast.colorblind.chart.legend.success') + ': 80'"></div>
                <span class="bar-label">{{ chartMonths.mar }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #bad-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorblind.badComment') }} --&gt;
&lt;style&gt;
  .chart-legend {
    display: flex;
    gap: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Problématique pour daltonisme rouge-vert */
  .legend-red { background: #e53e3e; }
  .legend-green { background: #38a169; }

  .data-error { background: #e53e3e; }
  .data-success { background: #38a169; }
&lt;/style&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorblind.legendColorOnly') }} --&gt;
&lt;div class="chart-legend"&gt;
  &lt;div class="legend-item"&gt;
    &lt;div class="legend-red"&gt;&lt;/div&gt;
    &lt;span&gt;Échecs&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="legend-item"&gt;
    &lt;div class="legend-green"&gt;&lt;/div&gt;
    &lt;span&gt;Succès&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorblind.barsNoVisualDiff') }} --&gt;
&lt;div class="chart"&gt;
  &lt;div class="data-error" style="height: 60px"&gt;&lt;/div&gt;
  &lt;div class="data-success" style="height: 40px"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
      </template>

      <template #good-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorblind.goodComment') }} --&gt;
&lt;style&gt;
  .chart-legend {
    display: flex;
    gap: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Couleurs plus distinctes (bleu au lieu de vert) */
  .legend-error { background: #e53e3e; }
  .legend-success { background: #3182ce; }

  .data-error {
    background: #e53e3e;
    /* Motif rayé pour différenciation */
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.3) 2px,
      rgba(255,255,255,0.3) 4px
    );
  }

  .data-success {
    background: #3182ce;
    /* Motif pointillé pour différenciation */
    background-image: radial-gradient(
      circle,
      rgba(255,255,255,0.3) 1px,
      transparent 1px
    );
    background-size: 4px 4px;
  }
&lt;/style&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorblind.legendExplicitIcons') }} --&gt;
&lt;div class="chart-legend"&gt;
  &lt;div class="legend-item"&gt;
    &lt;div class="legend-error"&gt;&lt;/div&gt;
    &lt;span aria-hidden="true"&gt;❌&lt;/span&gt;
    &lt;span&gt;Échecs&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="legend-item"&gt;
    &lt;div class="legend-success"&gt;&lt;/div&gt;
    &lt;span aria-hidden="true"&gt;✅&lt;/span&gt;
    &lt;span&gt;Succès&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.colorblind.barsWithPatternsTooltips') }} --&gt;
&lt;div class="chart"&gt;
  &lt;div class="data-error"
       style="height: 60px"
       title="Échecs: 60"&gt;&lt;/div&gt;
  &lt;div class="data-success"
       style="height: 40px"
       title="Succès: 40"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.colorContrast.theme.title')"
      :explanation="$t('pages.colorContrast.theme.explanation')"
    >
      <template #bad>
        <div class="theme-demo">
          <div class="theme-switcher-bad">
            <div class="theme-controls-bad">
              <div @click="badTheme = 'light'" :class="{ active: badTheme === 'light' }" class="theme-option">☀️</div>
              <div @click="badTheme = 'dark'" :class="{ active: badTheme === 'dark' }" class="theme-option">🌙</div>
            </div>

            <div :class="`demo-content-bad theme-${badTheme}`">
              <h5>{{ $t('pages.colorContrast.theme.bad.content') }}</h5>
              <p>{{ $t('pages.colorContrast.theme.bad.description') }}</p>
              <button class="demo-button-bad">{{ $t('pages.colorContrast.theme.bad.button') }}</button>
              <div class="demo-card-bad">
                <h6>{{ $t('pages.colorContrast.theme.bad.card.title') }}</h6>
                <p>{{ $t('pages.colorContrast.theme.bad.card.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="theme-demo">
          <div class="theme-switcher-good">
            <fieldset class="theme-controls-good">
              <legend>{{ $t('pages.colorContrast.theme.good.legend') }}</legend>
              <label>
                <input
                  type="radio"
                  name="good-theme"
                  value="light"
                  v-model="goodTheme"
                  aria-describedby="light-theme-desc"
                >
                <span class="theme-label">
                  <span aria-hidden="true">☀️</span>
                  {{ $t('pages.colorContrast.theme.good.light') }}
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="good-theme"
                  value="dark"
                  v-model="goodTheme"
                  aria-describedby="dark-theme-desc"
                >
                <span class="theme-label">
                  <span aria-hidden="true">🌙</span>
                  {{ $t('pages.colorContrast.theme.good.dark') }}
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="good-theme"
                  value="auto"
                  v-model="goodTheme"
                  aria-describedby="auto-theme-desc"
                >
                <span class="theme-label">
                  <span aria-hidden="true">💻</span>
                  {{ $t('pages.colorContrast.theme.good.auto') }}
                </span>
              </label>
            </fieldset>

            <div :class="`demo-content-good theme-${goodTheme}`">
              <h5>{{ $t('pages.colorContrast.theme.good.content') }}</h5>
              <p>{{ $t('pages.colorContrast.theme.good.description') }}</p>
              <button class="demo-button-good">{{ $t('pages.colorContrast.theme.good.button') }}</button>
              <div class="demo-card-good">
                <h6>{{ $t('pages.colorContrast.theme.good.card.title') }}</h6>
                <p>{{ $t('pages.colorContrast.theme.good.card.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #bad-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.darkMode.badComment') }} --&gt;
&lt;style&gt;
  .theme-toggle {
    display: flex;
    gap: 0.5rem;
  }

  .theme-btn {
    padding: 0.75rem;
    cursor: pointer;
    border-radius: 0.625rem;
    border: 2px solid transparent;
  }

  .theme-btn.active {
    border-color: #007bff;
  }

  /* Mauvais contrastes dans les thèmes */
  .content.light {
    background: #f0f0f0;
    color: #ccc; /* Ratio insuffisant */
  }

  .content.dark {
    background: #222;
    color: #555; /* Ratio insuffisant */
  }

  .btn.light {
    background: #ddd;
    color: #bbb; /* Invisible */
  }

  .btn.dark {
    background: #333;
    color: #666; /* Difficile à lire */
  }
&lt;/style&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.darkMode.controlsNotAccessible') }} --&gt;
&lt;div class="theme-toggle"&gt;
  &lt;div class="theme-btn" onclick="setTheme('light')"&gt;☀️&lt;/div&gt;
  &lt;div class="theme-btn" onclick="setTheme('dark')"&gt;🌙&lt;/div&gt;
&lt;/div&gt;

&lt;div class="content light"&gt;
  &lt;h3&gt;Titre peu visible&lt;/h3&gt;
  &lt;p&gt;Texte difficile à lire&lt;/p&gt;
  &lt;button class="btn light"&gt;Action&lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
      </template>

      <template #good-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.darkMode.goodComment') }} --&gt;
&lt;style&gt;
  .theme-controls {
    border: 1px solid #ccc;
    border-radius: 0.625rem;
    padding: 1rem;
  }

  .theme-controls input {
    margin-right: 0.5rem;
  }

  /* Contrastes respectés dans tous les thèmes */
  .content.light {
    background: #ffffff;
    color: #1a1a1a; /* Ratio 21:1 */
  }

  .content.dark {
    background: #1a202c;
    color: #f7fafc; /* Ratio élevé */
  }

  .content.auto {
    background: #ffffff;
    color: #1a1a1a;
  }

  /* Respect des préférences système */
  @media (prefers-color-scheme: dark) {
    .content.auto {
      background: #1a202c;
      color: #f7fafc;
    }
  }

  .btn.light {
    background: #3182ce;
    color: #ffffff; /* Contraste AAA */
  }

  .btn.dark {
    background: #63b3ed;
    color: #1a202c; /* Contraste AAA */
  }

  /* Respect des préférences de mouvement */
  @media (prefers-reduced-motion: reduce) {
    .content {
      transition: none;
    }
  }
&lt;/style&gt;

&lt;!-- {{ $t('pages.colorContrast.codeExamples.darkMode.accessibleControlsFieldset') }} --&gt;
&lt;fieldset class="theme-controls"&gt;
  &lt;legend&gt;Choisir le thème&lt;/legend&gt;

  &lt;label&gt;
    &lt;input type="radio" name="theme" value="light"&gt;
    &lt;span&gt;☀️ Clair&lt;/span&gt;
  &lt;/label&gt;

  &lt;label&gt;
    &lt;input type="radio" name="theme" value="dark"&gt;
    &lt;span&gt;🌙 Sombre&lt;/span&gt;
  &lt;/label&gt;

  &lt;label&gt;
    &lt;input type="radio" name="theme" value="auto"&gt;
    &lt;span&gt;💻 Auto (système)&lt;/span&gt;
  &lt;/label&gt;
&lt;/fieldset&gt;

&lt;div class="content light"&gt;
  &lt;h3&gt;Titre toujours lisible&lt;/h3&gt;
  &lt;p&gt;Texte avec bon contraste&lt;/p&gt;
  &lt;button class="btn light"&gt;Action accessible&lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.colorContrast.links.title')"
      :explanation="$t('pages.colorContrast.links.explanation')"
    >
      <template #bad>
        <div class="link-demo">
          <h4>{{ $t('pages.colorContrast.links.heading') }}</h4>
          <div class="link-content-bad">
            <p>
              {{ $t('pages.colorContrast.links.intro') }}
              <a href="#" class="link-bad">{{ $t('pages.colorContrast.links.learnMore') }}</a>
              {{ $t('pages.colorContrast.links.bestPractices') }}
              <a href="#" class="link-bad">{{ $t('pages.colorContrast.links.wcag') }}</a>
            </p>
            <p>
              {{ $t('pages.colorContrast.links.resources') }}
            </p>
          </div>
        </div>
      </template>

      <template #good>
        <div class="link-demo">
          <h4>{{ $t('pages.colorContrast.links.heading') }}</h4>
          <div class="link-content-good">
            <p>
              {{ $t('pages.colorContrast.links.intro') }}
              <a href="#" class="link-good">{{ $t('pages.colorContrast.links.learnMore') }}</a>
              {{ $t('pages.colorContrast.links.bestPractices') }}
              <a href="#" class="link-good">{{ $t('pages.colorContrast.links.wcag') }}</a>
            </p>
            <p>
              {{ $t('pages.colorContrast.links.resources') }}
            </p>
          </div>
        </div>
      </template>

      <template #bad-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.linkContrast.badComment') }} --&gt;
&lt;style&gt;
  a {
    color: blue;
    text-decoration: none; /* Pas de soulignement ! */
  }

  a:hover {
    color: darkblue; /* Changement de couleur seulement */
  }
&lt;/style&gt;

&lt;p&gt;
  Visitez notre &lt;a href="#"&gt;page de ressources&lt;/a&gt;
  pour en savoir plus.
&lt;/p&gt;</code></pre>
        </div>
      </template>

      <template #good-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.colorContrast.codeExamples.linkContrast.goodComment') }} --&gt;
&lt;style&gt;
  a {
    color: #0066CC;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 2px;
  }

  a:hover, a:focus {
    background: #E6F2FF;
    outline: 2px solid #0066CC;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Indicateur de focus visible */
  a:focus {
    outline-offset: 4px;
  }
&lt;/style&gt;

&lt;p&gt;
  Visitez notre &lt;a href="#"&gt;page de ressources&lt;/a&gt;
  pour en savoir plus.
&lt;/p&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<style scoped>
.color-contrast {
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

/* WCAG Stats Section */
.wcag-stats-section {
  margin-bottom: 3rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-card {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
  text-align: left;
  border: 1px solid var(--color-border);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.stat-detail {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

/* Contrast demo styles */
.contrast-demo {
  /* Remove card styles to avoid nested cards */
  color: var(--color-text);
}

.text-samples-bad, .text-samples-good {
  display: grid;
  gap: 1rem;
}

.sample {
  padding: 1rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  background: white;
  isolation: isolate;
  position: relative;
}

.sample p {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.ratio {
  font-size: 0.85rem;
  color: #666 !important;
  font-weight: normal;
}

/* Bad contrast examples - sur fond blanc */
.text-samples-bad .sample:not(.dark-bg):not(.red-bg) {
  background: white !important;
}

.light-gray-text {
  color: #d8d8d8 !important; /* Ratio 2.2:1 sur blanc */
}

.medium-gray-text {
  color: #949494 !important; /* Ratio 3.8:1 sur blanc */
}

.yellow-text {
  color: #e6d800 !important; /* Ratio 1.9:1 sur blanc */
}

/* Red background for bad sample-4 */
.sample-4.red-bg {
  background: #ff4444 !important;
}

.orange-on-red {
  color: #ff8c00 !important; /* Orange sur rouge */
}

/* Good contrast examples - sur fond blanc */
.text-samples-good .sample:not(.dark-bg):not(.blue-bg) {
  background: white !important;
}

.dark-gray-text {
  color: #555555 !important; /* Ratio 7.0:1 sur blanc */
}

.black-text {
  color: #000000 !important; /* Ratio 21:1 sur blanc */
}

.blue-text {
  color: #0056b3 !important; /* Ratio 5.9:1 sur blanc */
}

/* Blue background for sample-4 */
.sample-4.blue-bg {
  background: #003d82 !important;
}

.white-on-blue {
  color: white !important; /* Blanc sur bleu foncé */
}

.ratio-light {
  color: #ccc !important; /* Ratio text visible sur fond foncé */
}

/* Dark background examples */
.sample-5.dark-bg,
.sample-6.dark-bg {
  background: #1a1a1a !important;
}

.dark-bg .ratio {
  color: #999 !important;
}

/* Bad contrast on dark */
.dark-gray-on-dark {
  color: #4a4a4a !important; /* Gris foncé sur noir - ratio 2.5:1 */
}

.blue-on-dark {
  color: #003d82 !important; /* Bleu foncé sur noir - ratio 1.8:1 */
}

/* Good contrast on dark */
.white-on-black {
  color: #ffffff !important; /* Blanc sur noir - ratio 21:1 */
}

.yellow-on-dark {
  color: #ffd700 !important; /* Jaune sur noir - ratio 12.3:1 */
}

/* Color information demo */
.color-info-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  display: grid;
  gap: 2rem;
}

.form-example-bad, .form-example-good {
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.625rem;
  font-size: 1rem;
}

.input-error {
  border: 2px solid #e53e3e;
}

.input-valid {
  border: 2px solid #38a169;
}

.error-message {
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.9rem;
}

.success-message {
  margin-top: 0.5rem;
  color: #38a169;
  font-size: 0.9rem;
}

.color-legend {
  margin-top: 1rem;
  font-size: 0.9rem;
  font-style: italic;
}

.status-example-bad, .status-example-good {
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  padding: 1.5rem;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.order-number {
  font-weight: 600;
}

.status-dot {
  font-size: 1.5rem;
  display: inline-block;
  margin-left: 0.5rem;
}

.status-red { color: #e53e3e; }
.status-yellow { color: #d69e2e; }
.status-green { color: #38a169; }

.status-pending { color: #d69e2e; font-weight: 500; }
.status-processing { color: #3182ce; font-weight: 500; }
.status-delivered { color: #38a169; font-weight: 500; }

.status-icon {
  margin-right: 0.5rem;
}

/* Colorblind demo */
.colorblind-demo {
  /* Remove card styles to avoid nested cards */
  color: var(--color-text);
}

.chart-bad, .chart-good {
  margin-top: 1rem;
}

.legend-bad, .legend-good {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.red { background: #e53e3e; }
.green { background: #38a169; }
.error-color { background: #e53e3e; }
.success-color { background: #3182ce; }

.legend-icon {
  font-size: 0.9rem;
}

.chart-bars {
  display: flex;
  gap: 1rem;
  align-items: end;
  height: 120px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.bar {
  width: 30px;
  border-radius: 2px 2px 0 0;
}

.red-bar { background: #e53e3e; }
.green-bar { background: #38a169; }

.error-bar {
  background: #e53e3e;
}

.success-bar {
  background: #3182ce;
}

.striped {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.3) 2px,
    rgba(255,255,255,0.3) 4px
  );
}

.dotted {
  background-image: radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px);
  background-size: 4px 4px;
}

.bar-label {
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* Theme demo */
.theme-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.theme-switcher-bad, .theme-switcher-good {
  display: grid;
  gap: 1.5rem;
}

.theme-controls-bad {
  display: flex;
  gap: 0.5rem;
}

.theme-option {
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 0.625rem;
  font-size: 1.5rem;
  background: var(--color-bg-secondary);
  border: 2px solid transparent;
}

.theme-option.active {
  border-color: var(--color-text);
}

.theme-controls-good {
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.theme-controls-good legend {
  font-weight: 600;
  padding: 0 0.5rem;
}

.theme-controls-good label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.625rem;
  transition: background-color 0.2s;
}

.theme-controls-good label:hover {
  background: var(--color-bg-secondary);
}

.theme-controls-good input {
  margin-right: 0.5rem;
}

.theme-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.demo-content-bad, .demo-content-good {
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  transition: all 0.3s;
}

/* Bad theme styles */
.demo-content-bad.theme-light {
  background: #f0f0f0;
  color: #ccc;
}

.demo-content-bad.theme-dark {
  background: #222;
  color: #555;
}

.demo-button-bad {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.625rem;
  margin: 0.5rem 0;
}

.theme-light .demo-button-bad {
  background: #ddd;
  color: #bbb;
}

.theme-dark .demo-button-bad {
  background: #333;
  color: #666;
}

.demo-card-bad {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.625rem;
}

.theme-light .demo-card-bad {
  background: #e0e0e0;
  color: #aaa;
}

.theme-dark .demo-card-bad {
  background: #1a1a1a;
  color: #444;
}

/* Good theme styles */
.demo-content-good.theme-light {
  background: #ffffff !important;
  color: #1a1a1a !important;
}

.demo-content-good.theme-light h5,
.demo-content-good.theme-light h6,
.demo-content-good.theme-light p {
  color: #1a1a1a !important;
}

.demo-content-good.theme-dark {
  background: #1a202c !important;
  color: #f7fafc !important;
}

.demo-content-good.theme-auto {
  background: #ffffff !important;
  color: #1a1a1a !important;
}

@media (prefers-color-scheme: dark) {
  .demo-content-good.theme-auto {
    background: #1a202c !important;
    color: #f7fafc !important;
  }
}

.demo-button-good {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.625rem;
  margin: 0.5rem 0;
  cursor: pointer;
  font-weight: 500;
}

.theme-light .demo-button-good {
  background: #3182ce;
  color: white;
}

.theme-dark .demo-button-good {
  background: #63b3ed;
  color: #1a202c;
}

.theme-auto .demo-button-good {
  background: #3182ce;
  color: white;
}

@media (prefers-color-scheme: dark) {
  .theme-auto .demo-button-good {
    background: #63b3ed;
    color: #1a202c;
  }
}

.demo-card-good {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.625rem;
  border: 1px solid;
}

.theme-light .demo-card-good {
  background: #f7fafc !important;
  border-color: #e2e8f0 !important;
  color: #1a1a1a !important;
}

.theme-dark .demo-card-good {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

.theme-auto .demo-card-good {
  background: #f7fafc !important;
  border-color: #e2e8f0 !important;
  color: #1a1a1a !important;
}

@media (prefers-color-scheme: dark) {
  .theme-auto .demo-card-good {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .demo-content-bad, .demo-content-good {
    transition: none;
  }

  .theme-controls-good label {
    transition: none;
  }
}

/* Code blocks styling */
.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.625rem;
  margin-top: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  padding: 1rem;
  background: transparent;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-block code {
  background: transparent;
  padding: 0;
  font-family: inherit;
  color: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  .code-block {
    background: #2d3748;
    border-color: #4a5568;
  }

  .code-block code {
    color: #e2e8f0;
  }
}

/* Link demo styles */
.link-demo {
  color: var(--color-text);
}

.link-content-bad, .link-content-good {
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  line-height: 1.8;
  font-size: 1.05rem;
}

.link-content-bad p, .link-content-good p {
  margin-bottom: 1rem;
}

.link-content-bad p:last-child, .link-content-good p:last-child {
  margin-bottom: 0;
}

/* Bad link - only color difference */
.link-bad {
  color: blue;
  text-decoration: none;
  cursor: pointer;
}

.link-bad:hover {
  color: darkblue;
}

.link-bad:focus {
  outline: none;
  color: darkblue;
}

/* Good link - underline + color + focus */
.link-good {
  color: #0066CC;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
  cursor: pointer;
}

.link-good:hover {
  background: #E6F2FF;
  outline: 2px solid #0066CC;
  outline-offset: 2px;
  border-radius: 2px;
}

.link-good:focus {
  background: #E6F2FF;
  outline: 2px solid #0066CC;
  outline-offset: 4px;
  border-radius: 2px;
}
</style>
