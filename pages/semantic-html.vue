<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const { getPageSEO } = useSEOConfig()
const seo = getPageSEO('/semantic-html')

useHead(seo)

import PageHeader from '@/components/layout/PageHeader.vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()

// Code block translations (defined locally to bypass i18n module loading issues)
const codeTranslations = {
  fr: {
    pageStructure: {
      badComment: 'Mauvais : divs sans sémantique',
      goodComment: 'Bon : éléments HTML sémantiques',
      siteTitle: 'Mon Site',
      home: 'Accueil',
      about: 'À propos',
      mainNav: 'Navigation principale',
      welcome: 'Bienvenue',
      mainContent: 'Contenu principal...',
      copyright: '© 2025 Mon Site'
    },
    headings: {
      badComment: 'Mauvais : divs avec classes pour le style',
      goodComment: 'Bon : hiérarchie de titres sémantiques',
      intro: 'Introduction',
      content: 'Contenu...',
      section1: 'Section 1',
      section2: 'Section 2',
      subsection: 'Sous-section',
      basicTechniques: 'Techniques de base',
      semanticHTML: 'HTML sémantique',
      structureElements: 'Éléments de structure',
      cssAccessibility: 'CSS et accessibilité'
    },
    buttonsVsLinks: {
      badComment: 'Mauvais : divs et spans cliquables',
      goodComment: 'Bon : boutons pour actions, liens pour navigation',
      save: 'Sauvegarder',
      delete: 'Supprimer',
      profile: 'Voir le profil',
      moreInfo: 'Plus d\'infos'
    },
    lists: {
      badComment: 'Mauvais : divs pour listes',
      goodComment: 'Bon : ul et ol sémantiques',
      ingredientsTitle: 'Ingrédients :',
      eggs: '3 œufs',
      milk: '2 cuillères à soupe de lait',
      seasoning: 'Sel et poivre',
      stepsTitle: 'Étapes :',
      step1: 'Battre les œufs',
      step2: 'Faire chauffer le beurre',
      step3: 'Verser et cuire',
      step1Full: 'Battre les œufs avec le lait',
      step4: 'Plier en deux et servir'
    }
  },
  en: {
    pageStructure: {
      badComment: 'Bad: divs without semantics',
      goodComment: 'Good: semantic HTML elements',
      siteTitle: 'My Site',
      home: 'Home',
      about: 'About',
      mainNav: 'Main navigation',
      welcome: 'Welcome',
      mainContent: 'Main content...',
      copyright: '© 2025 My Site'
    },
    headings: {
      badComment: 'Bad: divs with classes for styling',
      goodComment: 'Good: semantic headings hierarchy',
      intro: 'Introduction',
      content: 'Content...',
      section1: 'Section 1',
      section2: 'Section 2',
      subsection: 'Subsection',
      basicTechniques: 'Basic techniques',
      semanticHTML: 'Semantic HTML',
      structureElements: 'Structure elements',
      cssAccessibility: 'CSS and accessibility'
    },
    buttonsVsLinks: {
      badComment: 'Bad: clickable divs and spans',
      goodComment: 'Good: buttons for actions, links for navigation',
      save: 'Save',
      delete: 'Delete',
      profile: 'View profile',
      moreInfo: 'More info'
    },
    lists: {
      badComment: 'Bad: divs for lists',
      goodComment: 'Good: semantic ul and ol',
      ingredientsTitle: 'Ingredients:',
      eggs: '3 eggs',
      milk: '2 tablespoons of milk',
      seasoning: 'Salt and pepper',
      stepsTitle: 'Steps:',
      step1: 'Beat the eggs',
      step2: 'Heat the butter',
      step3: 'Pour and cook',
      step1Full: 'Beat the eggs with the milk',
      step4: 'Fold in half and serve'
    }
  }
}

// Helper function to get translation based on current locale
const tc = (key) => {
  const currentLocale = locale.value
  const keys = key.split('.')
  let value = codeTranslations[currentLocale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

// Computed code blocks
const codePageStructureBad = computed(() => `<!-- ${tc('pageStructure.badComment')} -->
<div class="page-header">
  <div class="site-title">${tc('pageStructure.siteTitle')}</div>
  <div class="navigation">
    <div>${tc('pageStructure.home')}</div>
    <div>${tc('pageStructure.about')}</div>
  </div>
</div>
<div class="page-content">
  <div class="content-title">${tc('pageStructure.welcome')}</div>
  <div>${tc('pageStructure.mainContent')}</div>
</div>
<div class="page-footer">
  ${tc('pageStructure.copyright')}
</div>`)

const codePageStructureGood = computed(() => `<!-- ${tc('pageStructure.goodComment')} -->
<header>
  <div class="site-title">${tc('pageStructure.siteTitle')}</div>
  <nav aria-label="${tc('pageStructure.mainNav')}">
    <ul>
      <li><a href="/">${tc('pageStructure.home')}</a></li>
      <li><a href="/about">${tc('pageStructure.about')}</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>${tc('pageStructure.welcome')}</h1>
  <p>${tc('pageStructure.mainContent')}</p>
</main>
<footer>
  <p>${tc('pageStructure.copyright')}</p>
</footer>`)

const codeHeadingsBad = computed(() => `<!-- ${tc('headings.badComment')} -->
<div class="title-large">${tc('headings.intro')}</div>
<p>${tc('headings.content')}</p>
<div class="title-medium">${tc('headings.section1')}</div>
<p>${tc('headings.content')}</p>
<div class="title-medium">${tc('headings.section2')}</div>
<p>${tc('headings.content')}</p>
<div class="title-small">${tc('headings.subsection')}</div>
<p>${tc('headings.content')}</p>`)

const codeHeadingsGood = computed(() => `<!-- ${tc('headings.goodComment')} -->
<h1>${tc('headings.intro')}</h1>
<p>${tc('headings.content')}</p>
<h2>${tc('headings.basicTechniques')}</h2>
<p>${tc('headings.content')}</p>
<h3>${tc('headings.semanticHTML')}</h3>
<p>${tc('headings.content')}</p>
<h4>${tc('headings.structureElements')}</h4>
<p>${tc('headings.content')}</p>
<h3>${tc('headings.cssAccessibility')}</h3>
<p>${tc('headings.content')}</p>`)

const codeButtonsVsLinksBad = computed(() => `<!-- ${tc('buttonsVsLinks.badComment')} -->
<div @click="handleSave" style="cursor: pointer;">
  💾 ${tc('buttonsVsLinks.save')}
</div>
<div @click="handleDelete" style="cursor: pointer;">
  🗑️ ${tc('buttonsVsLinks.delete')}
</div>
<span @click="navigateToProfile" style="cursor: pointer;">
  👤 ${tc('buttonsVsLinks.profile')}
</span>`)

const codeButtonsVsLinksGood = computed(() => `<!-- ${tc('buttonsVsLinks.goodComment')} -->
<button type="button" @click="handleSave">
  💾 ${tc('buttonsVsLinks.save')}
</button>
<button type="button" @click="handleDelete">
  🗑️ ${tc('buttonsVsLinks.delete')}
</button>
<a href="/profile">
  👤 ${tc('buttonsVsLinks.profile')}
</a>
<button type="button" @click="toggleModal">
  ℹ️ ${tc('buttonsVsLinks.moreInfo')}
</button>`)

const codeListsBad = computed(() => `<!-- ${tc('lists.badComment')} -->
<div class="list-title">${tc('lists.ingredientsTitle')}</div>
<div>${tc('lists.eggs')}</div>
<div>${tc('lists.milk')}</div>
<div>${tc('lists.seasoning')}</div>

<div class="list-title">${tc('lists.stepsTitle')}</div>
<div>1. ${tc('lists.step1')}</div>
<div>2. ${tc('lists.step2')}</div>
<div>3. ${tc('lists.step3')}</div>`)

const codeListsGood = computed(() => `<!-- ${tc('lists.goodComment')} -->
<h3>${tc('lists.ingredientsTitle')}</h3>
<ul>
  <li>${tc('lists.eggs')}</li>
  <li>${tc('lists.milk')}</li>
  <li>${tc('lists.seasoning')}</li>
</ul>

<h3>${tc('lists.stepsTitle')}</h3>
<ol>
  <li>${tc('lists.step1Full')}</li>
  <li>${tc('lists.step2')}</li>
  <li>${tc('lists.step3')}</li>
  <li>${tc('lists.step4')}</li>
</ol>`)

// Simulated action handlers
function handleSave() {
  alert(t('pages.semanticHtml.buttonsVsLinks.alerts.saved'))
}

function handleDelete() {
  if (confirm(t('pages.semanticHtml.buttonsVsLinks.alerts.deleteConfirm'))) {
    alert(t('pages.semanticHtml.buttonsVsLinks.alerts.deleted'))
  }
}

function navigateToProfile() {
  alert(t('pages.semanticHtml.buttonsVsLinks.alerts.profile'))
}

function toggleModal() {
  alert(t('pages.semanticHtml.buttonsVsLinks.alerts.modal'))
}
</script>

<template>
  <div class="semantic-html">
    <PageHeader
      :title="$t('pages.semanticHtml.title')"
      :description="$t('pages.semanticHtml.description')"
    />

    <ExampleToggle
      :title="$t('pages.semanticHtml.pageStructure.title')"
      :explanation="$t('pages.semanticHtml.pageStructure.explanation')"
    >
      <template #bad>
        <div class="page-structure">
          <div class="page-header">
            <div class="site-title">{{ $t('pages.semanticHtml.pageStructure.bad.siteTitle') }}</div>
            <div class="navigation">
              <div class="nav-item">{{ $t('pages.semanticHtml.pageStructure.bad.nav.home') }}</div>
              <div class="nav-item">{{ $t('pages.semanticHtml.pageStructure.bad.nav.about') }}</div>
              <div class="nav-item">{{ $t('pages.semanticHtml.pageStructure.bad.nav.contact') }}</div>
            </div>
          </div>
          <div class="page-content">
            <div class="content-title">{{ $t('pages.semanticHtml.pageStructure.bad.content.title') }}</div>
            <div>{{ $t('pages.semanticHtml.pageStructure.bad.content.body') }}</div>
          </div>
          <div class="page-footer">
            <div>{{ $t('pages.semanticHtml.pageStructure.bad.footer') }}</div>
          </div>
        </div>
        <div class="code-block">
          <pre><code>{{ codePageStructureBad }}</code></pre>
        </div>
      </template>

      <template #good>
        <div class="page-structure">
          <header class="page-header">
            <div class="site-title">{{ $t('pages.semanticHtml.pageStructure.good.siteTitle') }}</div>
            <nav :aria-label="$t('pages.semanticHtml.pageStructure.good.navLabel')">
              <ul class="navigation">
                <li><a href="/" class="nav-item">{{ $t('pages.semanticHtml.pageStructure.bad.nav.home') }}</a></li>
                <li><a href="/about" class="nav-item">{{ $t('pages.semanticHtml.pageStructure.bad.nav.about') }}</a></li>
                <li><a href="/contact" class="nav-item">{{ $t('pages.semanticHtml.pageStructure.bad.nav.contact') }}</a></li>
              </ul>
            </nav>
          </header>
          <main class="page-content">
            <h1 class="content-title">{{ $t('pages.semanticHtml.pageStructure.good.content.title') }}</h1>
            <p>{{ $t('pages.semanticHtml.pageStructure.good.content.body') }}</p>
          </main>
          <footer class="page-footer">
            <p>{{ $t('pages.semanticHtml.pageStructure.good.footer') }}</p>
          </footer>
        </div>
        <div class="code-block">
          <pre><code>{{ codePageStructureGood }}</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.semanticHtml.headings.title')"
      :explanation="$t('pages.semanticHtml.headings.explanation')"
    >
      <template #bad>
        <article class="article-demo">
          <div class="title-large">{{ $t('pages.semanticHtml.headings.article.h1') }}</div>
          <p>{{ $t('pages.semanticHtml.headings.article.intro') }}</p>

          <div class="title-medium">{{ $t('pages.semanticHtml.headings.article.h2') }}</div>
          <p>{{ $t('pages.semanticHtml.headings.article.techniques') }}</p>

          <div class="title-medium">{{ $t('pages.semanticHtml.headings.article.h3semantic') }}</div>
          <p>{{ $t('pages.semanticHtml.headings.article.semantic') }}</p>

          <div class="title-small">{{ $t('pages.semanticHtml.headings.article.h4') }}</div>
          <p>{{ $t('pages.semanticHtml.headings.article.elements') }}</p>

          <div class="title-medium">{{ $t('pages.semanticHtml.headings.article.h3css') }}</div>
          <p>{{ $t('pages.semanticHtml.headings.article.css') }}</p>
        </article>
        <div class="code-block">
          <pre><code>{{ codeHeadingsBad }}</code></pre>
        </div>
      </template>

      <template #good>
        <article class="article-demo">
          <h1>{{ $t('pages.semanticHtml.headings.article.h1') }}</h1>
          <p>{{ $t('pages.semanticHtml.headings.article.intro') }}</p>

          <h2>{{ $t('pages.semanticHtml.headings.article.h2') }}</h2>
          <p>{{ $t('pages.semanticHtml.headings.article.techniques') }}</p>

          <h3>{{ $t('pages.semanticHtml.headings.article.h3semantic') }}</h3>
          <p>{{ $t('pages.semanticHtml.headings.article.semantic') }}</p>

          <h4>{{ $t('pages.semanticHtml.headings.article.h4') }}</h4>
          <p>{{ $t('pages.semanticHtml.headings.article.elements') }}</p>

          <h3>{{ $t('pages.semanticHtml.headings.article.h3css') }}</h3>
          <p>{{ $t('pages.semanticHtml.headings.article.css') }}</p>
        </article>
        <div class="code-block">
          <pre><code>{{ codeHeadingsGood }}</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.semanticHtml.buttonsVsLinks.title')"
      :explanation="$t('pages.semanticHtml.buttonsVsLinks.explanation')"
    >
      <template #bad>
        <div class="actions-demo">
          <div class="action-item" @click="handleSave" style="cursor: pointer;">
            💾 {{ $t('pages.semanticHtml.buttonsVsLinks.actions.save') }}
          </div>
          <div class="action-item" @click="handleDelete" style="cursor: pointer;">
            🗑️ {{ $t('pages.semanticHtml.buttonsVsLinks.actions.delete') }}
          </div>
          <div class="action-item" @click="navigateToProfile" style="cursor: pointer;">
            👤 {{ $t('pages.semanticHtml.buttonsVsLinks.actions.profile') }}
          </div>
          <span class="action-item" @click="toggleModal" style="cursor: pointer;">
            ℹ️ {{ $t('pages.semanticHtml.buttonsVsLinks.actions.info') }}
          </span>
        </div>
        <div class="code-block">
          <pre><code>{{ codeButtonsVsLinksBad }}</code></pre>
        </div>
      </template>

      <template #good>
        <div class="actions-demo">
          <button type="button" class="action-item" @click="handleSave">
            💾 {{ $t('pages.semanticHtml.buttonsVsLinks.actions.save') }}
          </button>
          <button type="button" class="action-item" @click="handleDelete">
            🗑️ {{ $t('pages.semanticHtml.buttonsVsLinks.actions.delete') }}
          </button>
          <a href="/profile" class="action-item">
            👤 {{ $t('pages.semanticHtml.buttonsVsLinks.actions.profile') }}
          </a>
          <button type="button" class="action-item" @click="toggleModal">
            ℹ️ {{ $t('pages.semanticHtml.buttonsVsLinks.actions.info') }}
          </button>
        </div>
        <div class="code-block">
          <pre><code>{{ codeButtonsVsLinksGood }}</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.semanticHtml.lists.title')"
      :explanation="$t('pages.semanticHtml.lists.explanation')"
    >
      <template #bad>
        <div class="list-demo">
          <div class="list-title">{{ $t('pages.semanticHtml.lists.recipe.ingredients.title') }}</div>
          <div class="list-content">
            <div>{{ $t('pages.semanticHtml.lists.recipe.ingredients.eggs') }}</div>
            <div>{{ $t('pages.semanticHtml.lists.recipe.ingredients.milk') }}</div>
            <div>{{ $t('pages.semanticHtml.lists.recipe.ingredients.seasoning') }}</div>
            <div>{{ $t('pages.semanticHtml.lists.recipe.ingredients.butter') }}</div>
          </div>

          <div class="list-title">{{ $t('pages.semanticHtml.lists.recipe.steps.title') }}</div>
          <div class="list-content">
            <div>1. {{ $t('pages.semanticHtml.lists.recipe.steps.step1') }}</div>
            <div>2. {{ $t('pages.semanticHtml.lists.recipe.steps.step2') }}</div>
            <div>3. {{ $t('pages.semanticHtml.lists.recipe.steps.step3') }}</div>
            <div>4. {{ $t('pages.semanticHtml.lists.recipe.steps.step4') }}</div>
          </div>
        </div>
        <div class="code-block">
          <pre><code>{{ codeListsBad }}</code></pre>
        </div>
      </template>

      <template #good>
        <div class="list-demo">
          <h3>{{ $t('pages.semanticHtml.lists.recipe.ingredients.title') }}</h3>
          <ul>
            <li>{{ $t('pages.semanticHtml.lists.recipe.ingredients.eggs') }}</li>
            <li>{{ $t('pages.semanticHtml.lists.recipe.ingredients.milk') }}</li>
            <li>{{ $t('pages.semanticHtml.lists.recipe.ingredients.seasoning') }}</li>
            <li>{{ $t('pages.semanticHtml.lists.recipe.ingredients.butter') }}</li>
          </ul>

          <h3>{{ $t('pages.semanticHtml.lists.recipe.steps.title') }}</h3>
          <ol>
            <li>{{ $t('pages.semanticHtml.lists.recipe.steps.step1') }}</li>
            <li>{{ $t('pages.semanticHtml.lists.recipe.steps.step2') }}</li>
            <li>{{ $t('pages.semanticHtml.lists.recipe.steps.step3') }}</li>
            <li>{{ $t('pages.semanticHtml.lists.recipe.steps.step4') }}</li>
          </ol>
        </div>
        <div class="code-block">
          <pre><code>{{ codeListsGood }}</code></pre>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<style scoped>
.semantic-html {
  max-width: 100%;
  margin: 0 auto;
}

/* Page structure demo styles */
.page-structure {
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  overflow: hidden;
  font-size: 0.9rem;
}

/* Remove margin from header in examples */
.example-content header {
  margin-bottom: 0;
}

/* Smaller h1 in examples */
.example-content h1 {
  font-size: 1.25rem;
  margin: 0;
}

.page-header {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}

.site-title {
  font-weight: bold;
  margin: 0;
  font-size: 1.25rem;
}

.navigation {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  color: var(--color-primary);
  border-radius: 0.625rem;
}

.nav-item:hover {
  background: var(--color-primary-light);
}

.page-content {
  padding: 1.5rem;
}

.content-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.page-footer {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.85rem;
}

/* Article demo styles */
.article-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.title-large {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.title-medium {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1.5rem 0 0.75rem 0;
}

.title-small {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

.article-demo h1 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.article-demo h2 {
  font-size: 1.25rem;
  margin: 1.5rem 0 0.75rem 0;
}

.article-demo h3 {
  font-size: 1.1rem;
  margin: 1.25rem 0 0.5rem 0;
}

.article-demo h4 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem 0;
}

.article-demo p {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* Actions demo styles */
.actions-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-item {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.action-item:hover {
  background: var(--color-primary-dark);
}

.action-item:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* Lists demo styles */
.list-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.list-title {
  font-weight: bold;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.list-title:first-child {
  margin-top: 0;
}

.list-content div {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.list-demo h3 {
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.list-demo h3:first-child {
  margin-top: 0;
}

.list-demo ul,
.list-demo ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.list-demo li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.code-block {
  background: #1e1e1e;
  color: #e0e0e0;
  border-radius: 0.625rem;
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
  .action-item {
    transition: none;
  }
}
</style>
