<template>
  <header class="page-header" role="banner">
    <!-- Breadcrumb navigation with schema.org markup -->
    <nav :aria-label="$t('navigation.breadcrumb')" class="breadcrumb">
      <ol itemscope itemtype="https://schema.org/BreadcrumbList">
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <router-link
            :to="localePath('/')"
            :aria-label="$t('navigation.backToHome')"
            itemprop="item"
          >
            <span itemprop="name">{{ $t('navigation.home.label') }}</span>
          </router-link>
          <meta itemprop="position" content="1" />
        </li>
        <li
          v-if="currentPage"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span aria-hidden="true">›</span>
          <span itemprop="name" aria-current="page">{{ currentPage }}</span>
          <meta itemprop="position" content="2" />
        </li>
      </ol>
    </nav>

    <!-- Page title with proper heading hierarchy -->
    <div class="page-title-wrapper">
      <h1 class="page-title" :id="headingId" tabindex="-1">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p v-if="description" class="page-description">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <!-- Page actions -->
    <div v-if="$slots.actions" class="page-actions" role="toolbar" aria-label="Actions de la page">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const currentPage = computed(() => {
  // Remove locale prefix from path for matching
  const cleanPath = route.path.replace(/^\/en/, '')

  const pages = {
    '/semantic-html': t('navigation.semanticHtml.label'),
    '/keyboard-navigation': t('navigation.keyboardNavigation.label'),
    '/media-accessible': t('navigation.mediaAccessible.label'),
    '/color-contrast': t('navigation.colorContrast.label'),
    '/accessible-forms': t('navigation.accessibleForms.label'),
    '/aria-components': t('navigation.ariaComponents.label'),
    '/performance': t('navigation.performance.label')
  }
  return pages[cleanPath] || ''
})

const headingId = computed(() => {
  return `page-heading-${route.path.replace(/\//g, '-') || 'home'}`
})
</script>

<style scoped>
.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-border);
  display: block !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  background: transparent !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 0 !important;
}

/* Breadcrumb navigation */
.breadcrumb {
  margin-bottom: 0.5rem;
}

.breadcrumb ol {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  gap: 0.5rem;
}

.breadcrumb li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.breadcrumb a:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.breadcrumb [aria-current="page"] {
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* Page title */
.page-title-wrapper {
  margin: 0.5rem 0 1.5rem 0;
  text-align: left;
}

.page-title {
  font-size: 2.5rem;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  font-weight: 700;
  text-align: left;
}

.page-title:focus {
  outline: none;
}

.page-title:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
  border-radius: 0.625rem;
}

.page-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* Page actions */
.page-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .breadcrumb {
    font-size: 0.8rem;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .page-header {
    border-bottom-width: 3px;
  }

  .breadcrumb a {
    text-decoration: underline;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .breadcrumb a {
    transition: none;
  }
}
</style>