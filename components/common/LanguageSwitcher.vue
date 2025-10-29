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

    <!-- Language dropdown -->
    <div class="language-dropdown" ref="dropdownRef">
      <button
        ref="triggerRef"
        type="button"
        class="language-trigger"
        :aria-label="$t('language.switchLanguage')"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        :aria-controls="isOpen ? 'language-listbox' : undefined"
        @click="toggleDropdown"
        @keydown.enter="toggleDropdown"
        @keydown.space.prevent="toggleDropdown"
        @keydown.down.prevent="openAndFocusFirst"
        @keydown.up.prevent="openAndFocusLast"
        @keydown.escape="closeDropdown"
      >
        <span class="current-language">
          <span class="flag-icon" aria-hidden="true">{{ getFlagIcon(currentLocale) }}</span>
          <span class="language-name">{{ getCurrentLanguageName() }}</span>
        </span>
        <svg
          class="chevron-icon"
          :class="{ 'chevron-open': isOpen }"
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <Transition name="dropdown">
        <ul
          v-if="isOpen"
          id="language-listbox"
          ref="listboxRef"
          role="listbox"
          :aria-label="$t('language.switchLanguage')"
          :aria-activedescendant="focusedOptionId"
          class="language-listbox"
          @keydown.down.prevent="focusNext"
          @keydown.up.prevent="focusPrevious"
          @keydown.home.prevent="focusFirst"
          @keydown.end.prevent="focusLast"
          @keydown.escape.prevent="closeAndFocusTrigger"
          @keydown.enter.prevent="selectFocused"
          @keydown.space.prevent="selectFocused"
        >
          <li
            v-for="(locale, index) in availableLocales"
            :id="`language-option-${locale.code}`"
            :key="locale.code"
            role="option"
            :aria-selected="locale.code === currentLocale"
            :class="[
              'language-option',
              {
                'is-selected': locale.code === currentLocale,
                'is-focused': focusedIndex === index
              }
            ]"
            :lang="locale.iso"
            @click="selectLanguage(locale.code)"
            @mouseenter="focusedIndex = index"
          >
            <span class="flag-icon" aria-hidden="true">{{ getFlagIcon(locale.code) }}</span>
            <span class="language-name">{{ locale.name }}</span>
            <svg
              v-if="locale.code === currentLocale"
              class="check-icon"
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3332 4L5.99984 11.3333L2.6665 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { locale, locales, setLocale } = useI18n()
const { t } = useI18n()
const announcement = ref('')
const isOpen = ref(false)
const focusedIndex = ref(0)
const dropdownRef = ref(null)
const triggerRef = ref(null)
const listboxRef = ref(null)

const currentLocale = computed(() => locale.value)

const availableLocales = computed(() => {
  return locales.value.map(loc => {
    if (typeof loc === 'string') {
      return { code: loc, name: loc, iso: loc }
    }
    return loc
  })
})

const focusedOptionId = computed(() => {
  if (focusedIndex.value >= 0 && focusedIndex.value < availableLocales.value.length) {
    return `language-option-${availableLocales.value[focusedIndex.value].code}`
  }
  return undefined
})

const getFlagIcon = (code) => {
  const flags = {
    fr: '🇫🇷',
    en: '🇬🇧',
    es: '🇪🇸',
    it: '🇮🇹',
    de: '🇩🇪',
    nl: '🇳🇱',
    ar: '🇸🇦',
    ja: '🇯🇵',
    pt: '🇵🇹'
  }
  return flags[code] || '🌐'
}

const getCurrentLanguageName = () => {
  const locale = availableLocales.value.find(l => l.code === currentLocale.value)
  return locale?.name || currentLocale.value
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    // Set focus to current locale when opening
    const currentIndex = availableLocales.value.findIndex(l => l.code === currentLocale.value)
    focusedIndex.value = currentIndex >= 0 ? currentIndex : 0
  }
}

const openAndFocusFirst = () => {
  isOpen.value = true
  focusedIndex.value = 0
}

const openAndFocusLast = () => {
  isOpen.value = true
  focusedIndex.value = availableLocales.value.length - 1
}

const closeDropdown = () => {
  isOpen.value = false
}

const closeAndFocusTrigger = () => {
  closeDropdown()
  triggerRef.value?.focus()
}

const focusNext = () => {
  focusedIndex.value = (focusedIndex.value + 1) % availableLocales.value.length
}

const focusPrevious = () => {
  focusedIndex.value = focusedIndex.value <= 0
    ? availableLocales.value.length - 1
    : focusedIndex.value - 1
}

const focusFirst = () => {
  focusedIndex.value = 0
}

const focusLast = () => {
  focusedIndex.value = availableLocales.value.length - 1
}

const selectFocused = () => {
  if (focusedIndex.value >= 0 && focusedIndex.value < availableLocales.value.length) {
    const locale = availableLocales.value[focusedIndex.value]
    selectLanguage(locale.code)
  }
}

const selectLanguage = async (code) => {
  if (code === currentLocale.value) {
    closeAndFocusTrigger()
    return
  }

  await switchLanguage(code)
  closeAndFocusTrigger()
}

const switchLanguage = async (code) => {
  await setLocale(code)

  // Update HTML lang and dir attributes
  if (process.client) {
    const langMap = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
      it: 'it-IT',
      de: 'de-DE',
      nl: 'nl-NL',
      ar: 'ar',
      ja: 'ja-JP',
      pt: 'pt-PT'
    }
    document.documentElement.setAttribute('lang', langMap[code] || code)

    // Set text direction for RTL languages
    if (code === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
    }
  }

  // Announce language change to screen readers
  const languageNames = {
    fr: 'Français',
    en: 'English',
    es: 'Español',
    it: 'Italiano',
    de: 'Deutsch',
    nl: 'Nederlands',
    ar: 'العربية',
    ja: '日本語',
    pt: 'Português'
  }
  const languageName = languageNames[code] || code
  announcement.value = t('language.languageChanged', { language: languageName })

  // Clear announcement after screen readers have read it
  setTimeout(() => {
    announcement.value = ''
  }, 3000)
}

// Click outside to close
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-switcher {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  margin-top: 0.5rem;
}

.language-dropdown {
  position: relative;
  width: 100%;
}

/* Trigger button */
.language-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: var(--color-sidebar-text);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 44px;
}

.language-trigger:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.language-trigger:focus-visible {
  outline: 2px solid #4C6EF5;
  outline-offset: 2px;
  border-color: #4C6EF5;
}

.language-trigger:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.98);
}

.current-language {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1;
}

.flag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  line-height: 1;
  width: 1.5rem;
  height: 1.5rem;
}

.language-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.chevron-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
  opacity: 0.7;
}

.chevron-open {
  transform: rotate(180deg);
}

/* Dropdown listbox */
.language-listbox {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  list-style: none;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  box-shadow: 0 10px 38px -10px rgba(0, 0, 0, 0.35),
              0 10px 20px -15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
}

/* Dropdown option */
.language-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.375rem;
  color: var(--color-sidebar-text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  min-height: 44px;
}

.language-option:hover,
.language-option.is-focused {
  background: rgba(255, 255, 255, 0.08);
}

.language-option:active {
  background: rgba(255, 255, 255, 0.12);
  transform: scale(0.98);
}

.language-option.is-selected {
  background: rgba(76, 110, 245, 0.12);
  color: #4C6EF5;
  font-weight: 600;
}

.language-option.is-selected:hover,
.language-option.is-selected.is-focused {
  background: rgba(76, 110, 245, 0.18);
}

.language-option .language-name {
  flex: 1;
}

.check-icon {
  flex-shrink: 0;
  color: #4C6EF5;
}

/* Transitions */
.dropdown-enter-active {
  transition: all 0.15s ease-out;
}

.dropdown-leave-active {
  transition: all 0.1s ease-in;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(4px);
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

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .language-trigger,
  .language-option,
  .chevron-icon {
    transition: none;
  }

  .language-trigger:active,
  .language-option:active {
    transform: none;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: none;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 1;
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .language-trigger {
    border: 2px solid var(--color-sidebar-text);
  }

  .language-listbox {
    border: 2px solid var(--color-sidebar-text);
  }

  .language-option.is-selected {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .language-trigger {
    min-height: 48px;
    padding: 0.75rem 1rem;
  }

  .language-option {
    min-height: 48px;
    padding: 0.75rem 1rem;
  }
}
</style>
