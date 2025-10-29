<template>
  <div class="language-switcher">
    <!-- Screen reader announcement -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ announcement }}
    </div>

    <!-- Language switcher buttons -->
    <div
      role="group"
      :aria-label="$t('language.switchLanguage')"
      class="language-buttons"
    >
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        type="button"
        class="language-button"
        :class="{ 'is-active': locale.code === currentLocale }"
        :aria-current="locale.code === currentLocale ? 'true' : undefined"
        :aria-label="getAriaLabel(locale)"
        :lang="locale.iso"
        @click="switchLanguage(locale.code)"
        @keydown.enter.prevent="switchLanguage(locale.code)"
        @keydown.space.prevent="switchLanguage(locale.code)"
      >
        <span class="flag-icon" aria-hidden="true">{{ locale.code === 'fr' ? '🇫🇷' : '🇬🇧' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { locale, locales, setLocale } = useI18n()
const { t } = useI18n()
const announcement = ref('')

const currentLocale = computed(() => locale.value)

const availableLocales = computed(() => {
  return locales.value.map(loc => {
    if (typeof loc === 'string') {
      return { code: loc, name: loc, iso: loc }
    }
    return loc
  })
})

const getAriaLabel = (locale) => {
  const isCurrent = locale.code === currentLocale.value
  if (locale.code === 'en') {
    return isCurrent ? 'English' : 'English'
  } else {
    return isCurrent ? 'Français' : 'Français'
  }
}

const switchLanguage = async (code) => {
  if (code === currentLocale.value) {
    return
  }

  await setLocale(code)

  // Update HTML lang attribute
  if (process.client) {
    document.documentElement.setAttribute('lang', code === 'fr' ? 'fr-FR' : 'en-US')
  }

  // Announce language change to screen readers
  const languageName = code === 'fr' ? 'Français' : 'English'
  announcement.value = t('language.languageChanged', { language: languageName })

  // Clear announcement after screen readers have read it
  setTimeout(() => {
    announcement.value = ''
  }, 3000)
}
</script>

<style scoped>
.language-switcher {
  border-top: 2px solid var(--color-border);
  padding-top: 0.75rem;
  margin-top: 0.5rem;
}

.language-buttons {
  display: flex;
  gap: 0.75rem;
  padding: 0 1rem;
  justify-content: center;
}

.language-button {
  padding: 0;
  background: var(--color-surface);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.language-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.language-button:focus,
.language-button:focus-visible {
  outline: none;
}

.language-button:active {
  transform: translateY(0) scale(0.96);
}

.language-button.is-active {
  background: var(--color-surface);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.language-button.is-active:hover {
  background: var(--color-surface);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.language-button.is-active:active {
  transform: translateY(0) scale(0.96);
}

.flag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  line-height: 1;
  width: 100%;
  height: 100%;
}

/* Screen reader only text */
.sr-only {
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

@media (prefers-reduced-motion: reduce) {
  .language-button {
    transition: none;
  }

  .language-button:active {
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .language-button {
    box-shadow: 0 0 0 2px var(--color-text);
  }
}

/* Ensure minimum touch target size (44x44px WCAG 2.5.5) */
@media (max-width: 768px) {
  .language-button {
    width: 56px;
    height: 56px;
    min-width: 56px;
    min-height: 56px;
  }

  .flag-icon {
    font-size: 2rem;
  }
}
</style>
