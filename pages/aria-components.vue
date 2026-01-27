<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { getPageSEO } = useSEOConfig()
const seo = getPageSEO('/aria-components')

useHead(seo)

import { ref, computed, nextTick } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()

// Accordion state
const badAccordionOpen = ref([false, false, false])
const goodAccordionOpen = ref([false, false, false])

const accordionItems = computed(() => [
  {
    title: t('pages.ariaComponents.faq.questions.q1.title'),
    content: t('pages.ariaComponents.faq.questions.q1.content')
  },
  {
    title: t('pages.ariaComponents.faq.questions.q2.title'),
    content: t('pages.ariaComponents.faq.questions.q2.content')
  },
  {
    title: t('pages.ariaComponents.faq.questions.q3.title'),
    content: t('pages.ariaComponents.faq.questions.q3.content')
  }
])

// Dropdown state
const badDropdownOpen = ref(false)
const goodDropdownOpen = ref(false)
const dropdownTrigger = ref(null)
const firstMenuItem = ref(null)

// Table state
const badSortColumn = ref('name')
const badSortDirection = ref('asc')
const goodSortColumn = ref('name')
const goodSortDirection = ref('asc')
const tableStatusMessage = ref('')

const users = computed(() => [
  { id: 1, name: t('pages.ariaComponents.sortableTable.users.alice.name'), email: 'alice@example.com', role: t('pages.ariaComponents.sortableTable.users.alice.role'), status: t('pages.ariaComponents.sortableTable.users.alice.status') },
  { id: 2, name: t('pages.ariaComponents.sortableTable.users.bob.name'), email: 'bob@example.com', role: t('pages.ariaComponents.sortableTable.users.bob.role'), status: t('pages.ariaComponents.sortableTable.users.bob.status') },
  { id: 3, name: t('pages.ariaComponents.sortableTable.users.charlie.name'), email: 'charlie@example.com', role: t('pages.ariaComponents.sortableTable.users.charlie.role'), status: t('pages.ariaComponents.sortableTable.users.charlie.status') },
  { id: 4, name: t('pages.ariaComponents.sortableTable.users.diana.name'), email: 'diana@example.com', role: t('pages.ariaComponents.sortableTable.users.diana.role'), status: t('pages.ariaComponents.sortableTable.users.diana.status') }
])

// Accordion functions
function toggleBadAccordion(index) {
  badAccordionOpen.value[index] = !badAccordionOpen.value[index]
}

function toggleGoodAccordion(index) {
  goodAccordionOpen.value[index] = !goodAccordionOpen.value[index]
}

function handleAccordionKeydown(event, index) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusNextAccordionHeader(index)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPrevAccordionHeader(index)
      break
    case 'Home':
      event.preventDefault()
      focusAccordionHeader(0)
      break
    case 'End':
      event.preventDefault()
      focusAccordionHeader(accordionItems.value.length - 1)
      break
  }
}

function focusNextAccordionHeader(currentIndex) {
  const nextIndex = currentIndex === accordionItems.value.length - 1 ? 0 : currentIndex + 1
  focusAccordionHeader(nextIndex)
}

function focusPrevAccordionHeader(currentIndex) {
  const prevIndex = currentIndex === 0 ? accordionItems.value.length - 1 : currentIndex - 1
  focusAccordionHeader(prevIndex)
}

function focusAccordionHeader(index) {
  const header = document.getElementById(`accordion-button-${index}`)
  if (header) header.focus()
}

// Dropdown functions
function toggleGoodDropdown() {
  goodDropdownOpen.value = !goodDropdownOpen.value
  if (goodDropdownOpen.value) {
    nextTick(() => {
      firstMenuItem.value?.focus()
    })
  }
}

function closeGoodDropdown() {
  goodDropdownOpen.value = false
  dropdownTrigger.value?.focus()
}

function handleDropdownTriggerKeydown(event) {
  switch (event.key) {
    case 'ArrowDown':
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleGoodDropdown()
      break
    case 'Escape':
      closeGoodDropdown()
      break
  }
}

function handleDropdownMenuKeydown(event) {
  const menuItems = document.querySelectorAll('#dropdown-menu-good button')
  const currentIndex = Array.from(menuItems).indexOf(event.target)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      const nextIndex = currentIndex === menuItems.length - 1 ? 0 : currentIndex + 1
      menuItems[nextIndex].focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1
      menuItems[prevIndex].focus()
      break
    case 'Escape':
      event.preventDefault()
      closeGoodDropdown()
      break
    case 'Home':
      event.preventDefault()
      menuItems[0].focus()
      break
    case 'End':
      event.preventDefault()
      menuItems[menuItems.length - 1].focus()
      break
  }
}

function handleAction(action) {
  alert(`Action: ${action}`)
  badDropdownOpen.value = false
}

function handleGoodAction(action) {
  alert(`Action: ${action}`)
  closeGoodDropdown()
}

// Table functions
function sortBadTable(column) {
  if (badSortColumn.value === column) {
    badSortDirection.value = badSortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    badSortColumn.value = column
    badSortDirection.value = 'asc'
  }
}

function sortGoodTable(column) {
  if (goodSortColumn.value === column) {
    goodSortDirection.value = goodSortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    goodSortColumn.value = column
    goodSortDirection.value = 'asc'
  }

  // Announce sort change
  const direction = goodSortDirection.value === 'asc'
    ? t('pages.ariaComponents.table.sortStatus.ascending')
    : t('pages.ariaComponents.table.sortStatus.descending')
  tableStatusMessage.value = t('pages.ariaComponents.table.sortStatus.message')
    .replace('{column}', column)
    .replace('{direction}', direction)
}

const sortedBadUsers = computed(() => {
  return [...users.value].sort((a, b) => {
    const aValue = a[badSortColumn.value]
    const bValue = b[badSortColumn.value]

    if (badSortDirection.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
})

const sortedGoodUsers = computed(() => {
  return [...users.value].sort((a, b) => {
    const aValue = a[goodSortColumn.value]
    const bValue = b[goodSortColumn.value]

    if (goodSortDirection.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
})

function getSortState(column) {
  if (goodSortColumn.value !== column) return 'none'
  return goodSortDirection.value === 'asc' ? 'ascending' : 'descending'
}

function getSortIcon(column) {
  if (goodSortColumn.value !== column) return 'chevrons-up-down'
  return goodSortDirection.value === 'asc' ? 'chevron-up' : 'chevron-down'
}

// Aria-live demo state
const badLiveContent = ref('')
const politeLiveContent = ref('')
const assertiveLiveContent = ref('')
const liveType = ref('polite')
let liveCounter = 0

// Gallery states
const selectedBadImage = ref(0)
const selectedGoodImage = ref(0)

const galleryImages = computed(() => [
  {
    thumb: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=60&fit=crop&crop=center",
    full: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center",
    alt: t('pages.ariaComponents.gallery.images.laptop1.alt'),
    description: t('pages.ariaComponents.gallery.images.front')
  },
  {
    thumb: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=80&h=60&fit=crop&crop=center",
    full: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&crop=center",
    alt: t('pages.ariaComponents.gallery.images.laptop2.alt'),
    description: t('pages.ariaComponents.gallery.images.open')
  },
  {
    thumb: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=60&fit=crop&crop=center",
    full: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&crop=center",
    alt: t('pages.ariaComponents.gallery.images.laptop3.alt'),
    description: t('pages.ariaComponents.gallery.images.side')
  }
])

function updateBadLiveContent() {
  liveCounter++
  badLiveContent.value = `${t('pages.ariaComponents.liveRegions.bad.updatedContent')} ${liveCounter}`
}

function clearBadLiveContent() {
  badLiveContent.value = ''
  liveCounter = 0
}

function updateGoodLiveContent(type) {
  liveCounter++
  const message = type === 'alert'
    ? `${t('pages.ariaComponents.liveRegions.good.assertiveMessage')} ${liveCounter})`
    : `${t('pages.ariaComponents.liveRegions.good.politeMessage')} ${liveCounter}`

  if (type === 'alert' || liveType.value === 'assertive') {
    assertiveLiveContent.value = message
    setTimeout(() => { assertiveLiveContent.value = '' }, 5000)
  } else {
    politeLiveContent.value = message
    setTimeout(() => { politeLiveContent.value = '' }, 5000)
  }
}

function clearGoodLiveContent() {
  politeLiveContent.value = ''
  assertiveLiveContent.value = ''
  liveCounter = 0
}

// Form ARIA demo variables
const formEmail = ref('')
const formPassword = ref('')
const emailNotifications = ref(true)
const smsNotifications = ref(false)
const termsAccepted = ref(false)
const formSubmitted = ref(false)

const emailInvalid = ref(false)
const emailError = ref('')
const passwordInvalid = ref(false)
const passwordError = ref('')
const submitStatus = ref('')

const formValid = computed(() => {
  return formEmail.value &&
         formPassword.value &&
         !emailInvalid.value &&
         !passwordInvalid.value &&
         termsAccepted.value
})

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formEmail.value) {
    emailInvalid.value = true
    emailError.value = t('pages.ariaComponents.forms.validation.emailRequired')
  } else if (!emailRegex.test(formEmail.value)) {
    emailInvalid.value = true
    emailError.value = t('pages.ariaComponents.forms.validation.emailInvalid')
  } else {
    emailInvalid.value = false
    emailError.value = ''
  }
}

function validatePassword() {
  if (!formPassword.value) {
    passwordInvalid.value = true
    passwordError.value = t('pages.ariaComponents.forms.validation.passwordRequired')
  } else if (formPassword.value.length < 8) {
    passwordInvalid.value = true
    passwordError.value = t('pages.ariaComponents.forms.good.passwordError')
  } else if (!/\d/.test(formPassword.value) || !/[a-zA-Z]/.test(formPassword.value)) {
    passwordInvalid.value = true
    passwordError.value = t('pages.ariaComponents.forms.validation.passwordWeak')
  } else {
    passwordInvalid.value = false
    passwordError.value = ''
  }
}

function handleSearch() {
  alert(t('pages.ariaComponents.forms.searchLaunched'))
}

function submitForm() {
  formSubmitted.value = true
  validateEmail()
  validatePassword()

  if (formValid.value) {
    submitStatus.value = t('pages.ariaComponents.forms.success')
    alert(t('pages.ariaComponents.forms.success') + '!')
  } else {
    submitStatus.value = t('pages.ariaComponents.forms.error')
  }
}

// Focus demo refs and functions
const alertElement = ref(null)

function handleCustomButtonClick() {
  alert(t('pages.ariaComponents.alerts.customButtonClicked'))
}

function handleCustomButtonKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleCustomButtonClick()
  }
}

function handleTabClick() {
  alert(t('pages.ariaComponents.alerts.tabSelected'))
}

function handleTabKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleTabClick()
  }
}

function handleMenuClick() {
  alert(t('pages.ariaComponents.alerts.menuSelected'))
}

function handleMenuKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleMenuClick()
  }
}

function focusAlert() {
  if (alertElement.value) {
    alertElement.value.focus()
    alertElement.value.textContent = t('pages.ariaComponents.tabindex.nonFocusable.alertUpdated')
    setTimeout(() => {
      if (alertElement.value) {
        alertElement.value.textContent = t('pages.ariaComponents.tabindex.nonFocusable.alertMessage')
      }
    }, 2000)
  }
}

// Gallery functions
function selectGoodImage(index) {
  selectedGoodImage.value = index
}

function handleGalleryKeydown(event, index) {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      const prevIndex = index === 0 ? galleryImages.value.length - 1 : index - 1
      selectGoodImage(prevIndex)
      document.getElementById(`gallery-tab-${prevIndex}`).focus()
      break
    case 'ArrowRight':
      event.preventDefault()
      const nextIndex = (index + 1) % galleryImages.value.length
      selectGoodImage(nextIndex)
      document.getElementById(`gallery-tab-${nextIndex}`).focus()
      break
    case 'Home':
      event.preventDefault()
      selectGoodImage(0)
      document.getElementById('gallery-tab-0').focus()
      break
    case 'End':
      event.preventDefault()
      selectGoodImage(galleryImages.value.length - 1)
      document.getElementById(`gallery-tab-${galleryImages.value.length - 1}`).focus()
      break
  }
}

// Combobox / Autocomplete state
const countries = [
  'Afghanistan', 'Albanie', 'Algérie', 'Allemagne', 'Andorre', 'Angola', 'Argentine', 'Arménie', 'Australie', 'Autriche',
  'Belgique', 'Brésil', 'Bulgarie',
  'Canada', 'Chine', 'Colombie', 'Croatie', 'Cuba',
  'Danemark',
  'Égypte', 'Espagne', 'Estonie', 'États-Unis',
  'Finlande', 'France',
  'Grèce',
  'Hongrie',
  'Inde', 'Indonésie', 'Irlande', 'Islande', 'Israël', 'Italie',
  'Japon', 'Jordanie',
  'Kenya',
  'Lettonie', 'Lituanie', 'Luxembourg',
  'Madagascar', 'Malte', 'Maroc', 'Mexique', 'Monaco',
  'Nigéria', 'Norvège', 'Nouvelle-Zélande',
  'Pakistan', 'Pays-Bas', 'Pérou', 'Pologne', 'Portugal',
  'Roumanie', 'Royaume-Uni', 'Russie',
  'Sénégal', 'Serbie', 'Singapour', 'Slovaquie', 'Slovénie', 'Suède', 'Suisse',
  'Thaïlande', 'Tunisie', 'Turquie',
  'Ukraine',
  'Vietnam'
]

const searchQueryBad = ref('')
const suggestionsBad = ref([])
const selectedBad = ref('')

const searchQueryGood = ref('')
const suggestionsGood = ref([])
const selectedIndexGood = ref(-1)
const selectedGood = ref('')

function filterSuggestionsBad() {
  if (!searchQueryBad.value.trim()) {
    suggestionsBad.value = []
    return
  }
  suggestionsBad.value = countries.filter(country =>
    country.toLowerCase().includes(searchQueryBad.value.toLowerCase())
  ).slice(0, 8)
}

function selectBad(item) {
  selectedBad.value = item
  searchQueryBad.value = item
  suggestionsBad.value = []
}

function filterSuggestionsGood() {
  selectedIndexGood.value = -1
  if (!searchQueryGood.value.trim()) {
    suggestionsGood.value = []
    return
  }
  suggestionsGood.value = countries.filter(country =>
    country.toLowerCase().includes(searchQueryGood.value.toLowerCase())
  ).slice(0, 8)
}

function selectNextGood() {
  if (suggestionsGood.value.length === 0) return
  selectedIndexGood.value = selectedIndexGood.value < suggestionsGood.value.length - 1
    ? selectedIndexGood.value + 1
    : 0
}

function selectPrevGood() {
  if (suggestionsGood.value.length === 0) return
  selectedIndexGood.value = selectedIndexGood.value > 0
    ? selectedIndexGood.value - 1
    : suggestionsGood.value.length - 1
}

function confirmSelectionGood() {
  if (selectedIndexGood.value >= 0 && suggestionsGood.value[selectedIndexGood.value]) {
    selectGood(suggestionsGood.value[selectedIndexGood.value])
  }
}

function selectGood(item) {
  selectedGood.value = item
  searchQueryGood.value = item
  suggestionsGood.value = []
  selectedIndexGood.value = -1
}

function closeSuggestionsGood() {
  suggestionsGood.value = []
  selectedIndexGood.value = -1
}

// Toast Notifications state
const badToastVisible = ref(false)
const badToastMessage = ref('')
const goodToastVisible = ref(false)
const goodToastMessage = ref('')
const goodToastType = ref('info')

function showBadToast() {
  badToastMessage.value = t('pages.ariaComponents.toast.good.inaccessibleMessage')
  badToastVisible.value = true
  setTimeout(() => {
    badToastVisible.value = false
  }, 3000)
}

function showGoodInfo() {
  goodToastMessage.value = t('pages.ariaComponents.toast.good.successMessage')
  goodToastType.value = 'info'
  goodToastVisible.value = true
  setTimeout(() => {
    goodToastVisible.value = false
  }, 5000)
}

function showGoodError() {
  goodToastMessage.value = t('pages.ariaComponents.toast.good.errorDetailMessage')
  goodToastType.value = 'error'
  goodToastVisible.value = true
  setTimeout(() => {
    goodToastVisible.value = false
  }, 5000)
}

function dismissGoodToast() {
  goodToastVisible.value = false
}
</script>

<template>
  <div class="aria-components">
    <PageHeader
      :title="$t('pages.ariaComponents.title')"
      :description="$t('pages.ariaComponents.description')"
    />

    <section class="aria-intro">
      <h2 class="section-title">{{ $t('pages.ariaComponents.whatIsAria.title') }}</h2>
      <p>
        <strong>{{ $t('pages.ariaComponents.whatIsAria.intro').split('ARIA (Accessible Rich Internet Applications)')[0] }}ARIA (Accessible Rich Internet Applications)</strong>{{ $t('pages.ariaComponents.whatIsAria.intro').split('ARIA (Accessible Rich Internet Applications)')[1] }}
      </p>

      <div class="aria-principles">
        <div class="principle-card">
          <h3>{{ $t('pages.ariaComponents.principles.roles.title') }}</h3>
          <p>{{ $t('pages.ariaComponents.principles.roles.description') }}</p>
          <code>{{ $t('pages.ariaComponents.principles.roles.example') }}</code>
        </div>
        <div class="principle-card">
          <h3>{{ $t('pages.ariaComponents.principles.states.title') }}</h3>
          <p>{{ $t('pages.ariaComponents.principles.states.description') }}</p>
          <code>{{ $t('pages.ariaComponents.principles.states.example') }}</code>
        </div>
        <div class="principle-card">
          <h3>{{ $t('pages.ariaComponents.principles.properties.title') }}</h3>
          <p>{{ $t('pages.ariaComponents.principles.properties.description') }}</p>
          <code>{{ $t('pages.ariaComponents.principles.properties.example') }}</code>
        </div>
      </div>

      <div class="aria-golden-rules">
        <h3>{{ $t('pages.ariaComponents.goldenRules.title') }}</h3>
        <p class="golden-rule-text">
          <strong>{{ $t('pages.ariaComponents.goldenRules.rule') }}</strong>
        </p>
      </div>
    </section>

    <ExampleToggle
      :title="$t('pages.ariaComponents.forms.title')"
      :explanation="$t('pages.ariaComponents.forms.explanation')"
    >
      <template #bad>
        <div class="form-aria-demo">
          <h4>{{ $t('pages.ariaComponents.forms.bad.title') }}</h4>
          <p>{{ $t('pages.ariaComponents.forms.bad.description') }}</p>

          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.forms.badNoLabel') }} --&gt;
&lt;input type="text" placeholder="{{ $t('pages.ariaComponents.forms.bad.emailPlaceholder') }}"&gt;

&lt;!-- {{ $t('pages.ariaComponents.codeExamples.forms.badIconNotAccessible') }} --&gt;
&lt;button&gt;
  &lt;span class="icon"&gt;🔍&lt;/span&gt;
&lt;/button&gt;

&lt;!-- {{ $t('pages.ariaComponents.codeExamples.forms.badErrorNotAssociated') }} --&gt;
&lt;input type="password"&gt;
&lt;div class="error"&gt;{{ $t('pages.ariaComponents.forms.bad.errorMessage') }}&lt;/div&gt;</code></pre>
          </div>

          <form class="bad-form-aria">
            <div class="form-field">
              <input type="text" :placeholder="$t('pages.ariaComponents.forms.bad.emailPlaceholder')" class="bad-input">
            </div>

            <div class="form-field">
              <button class="bad-icon-button">
                <span>🔍</span>
              </button>
            </div>

            <div class="form-field">
              <input type="password" :placeholder="$t('pages.ariaComponents.forms.good.passwordPlaceholder')" class="bad-input error-input" autocomplete="current-password">
              <div class="error-message">{{ $t('pages.ariaComponents.forms.bad.errorMessage') }}</div>
            </div>

            <div class="form-field">
              <div class="checkbox-group">
                <input type="checkbox" id="bad-terms">
                <span>{{ $t('pages.ariaComponents.forms.good.termsLabel') }} {{ $t('pages.ariaComponents.forms.good.termsLink') }}</span>
              </div>
            </div>
          </form>
        </div>
      </template>

      <template #good>
        <div class="form-aria-demo">
          <h4>{{ $t('pages.ariaComponents.forms.good.title') }}</h4>
          <p>{{ $t('pages.ariaComponents.forms.good.description') }}</p>

          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.forms.goodAriaLabel') }} --&gt;
&lt;input
  type="text"
  aria-label="{{ $t('pages.ariaComponents.forms.good.emailLabel') }}"
  aria-describedby="email-desc"
  aria-required="true"&gt;
&lt;span id="email-desc"&gt;{{ $t('pages.ariaComponents.forms.good.emailHint') }}&lt;/span&gt;

&lt;!-- {{ $t('pages.ariaComponents.codeExamples.forms.goodButtonLabel') }} --&gt;
&lt;button aria-label="{{ $t('pages.ariaComponents.forms.good.submitLabel') }}"&gt;
  &lt;span aria-hidden="true"&gt;🔍&lt;/span&gt;
&lt;/button&gt;

&lt;!-- {{ $t('pages.ariaComponents.codeExamples.forms.goodErrorAssociated') }} --&gt;
&lt;input
  type="password"
  aria-label="{{ $t('pages.ariaComponents.forms.good.passwordLabel') }}"
  aria-invalid="true"
  aria-describedby="pwd-error"
  autocomplete="new-password"&gt;
&lt;div id="pwd-error" role="alert"&gt;
  {{ $t('pages.ariaComponents.forms.good.passwordError') }}
&lt;/div&gt;</code></pre>
          </div>

          <form class="good-form-aria">
            <div class="form-field">
              <label for="good-email" class="sr-only">{{ $t('pages.ariaComponents.forms.good.emailLabel') }}</label>
              <input
                type="email"
                id="good-email"
                :aria-label="$t('pages.ariaComponents.forms.good.emailLabel')"
                aria-describedby="email-desc"
                aria-required="true"
                :aria-invalid="emailInvalid"
                v-model="formEmail"
                @blur="validateEmail"
                :placeholder="$t('pages.ariaComponents.forms.good.emailPlaceholder')"
                class="good-input"
                autocomplete="email"
              >
              <span id="email-desc" class="field-hint">{{ $t('pages.ariaComponents.forms.good.emailHint') }}</span>
              <div v-if="emailError" id="email-error" role="alert" class="error-message">
                {{ emailError }}
              </div>
            </div>

            <div class="form-field">
              <button
                :aria-label="$t('pages.ariaComponents.forms.good.submitLabel')"
                @click="handleSearch"
                class="good-icon-button"
              >
                <span aria-hidden="true">🔍</span>
                <span class="sr-only">{{ $t('pages.ariaComponents.forms.good.submitLabel') }}</span>
              </button>
            </div>

            <div class="form-field">
              <label for="good-password" class="sr-only">{{ $t('pages.ariaComponents.forms.good.passwordLabel') }}</label>
              <input
                type="password"
                id="good-password"
                :aria-label="$t('pages.ariaComponents.forms.good.passwordLabel')"
                aria-describedby="pwd-requirements pwd-error"
                aria-required="true"
                :aria-invalid="passwordInvalid"
                v-model="formPassword"
                @input="validatePassword"
                :placeholder="$t('pages.ariaComponents.forms.good.passwordPlaceholder')"
                class="good-input"
                :class="{ 'error': passwordInvalid }"
                autocomplete="new-password"
              >
              <div id="pwd-requirements" class="field-hint">
                {{ $t('pages.ariaComponents.forms.good.passwordRequirements') }}
              </div>
              <div v-if="passwordError" id="pwd-error" role="alert" class="error-message">
                {{ passwordError }}
              </div>
            </div>

            <div class="form-field">
              <fieldset role="group" aria-labelledby="options-legend">
                <legend id="options-legend">{{ $t('pages.ariaComponents.forms.good.notificationOptions') }}</legend>
                <div class="checkbox-group">
                  <input
                    type="checkbox"
                    id="good-email-notif"
                    v-model="emailNotifications"
                    aria-describedby="email-notif-desc"
                  >
                  <label for="good-email-notif">{{ $t('pages.ariaComponents.forms.good.emailNotification') }}</label>
                </div>
                <span id="email-notif-desc" class="field-hint">
                  {{ $t('pages.ariaComponents.forms.good.emailNotificationHint') }}
                </span>

                <div class="checkbox-group">
                  <input
                    type="checkbox"
                    id="good-sms-notif"
                    v-model="smsNotifications"
                    aria-describedby="sms-notif-desc"
                  >
                  <label for="good-sms-notif">{{ $t('pages.ariaComponents.forms.good.smsNotification') }}</label>
                </div>
                <span id="sms-notif-desc" class="field-hint">
                  {{ $t('pages.ariaComponents.forms.good.smsNotificationHint') }}
                </span>
              </fieldset>
            </div>

            <div class="form-field">
              <div class="checkbox-group">
                <input
                  type="checkbox"
                  id="good-terms"
                  v-model="termsAccepted"
                  aria-required="true"
                  :aria-invalid="!termsAccepted && formSubmitted"
                  aria-describedby="terms-error"
                >
                <label for="good-terms">
                  {{ $t('pages.ariaComponents.forms.good.termsLabel') }} <a href="#" :aria-label="$t('pages.ariaComponents.forms.good.termsLinkLabel')">{{ $t('pages.ariaComponents.forms.good.termsLink') }}</a>
                </label>
              </div>
              <div v-if="!termsAccepted && formSubmitted" id="terms-error" role="alert" class="error-message">
                {{ $t('pages.ariaComponents.forms.validation.termsRequired') }}
              </div>
            </div>

            <div class="form-actions">
              <button
                @click="submitForm"
                :disabled="!formValid"
                aria-describedby="submit-status"
                class="form-submit-button"
              >
                {{ $t('pages.ariaComponents.forms.good.submitButton') }}
              </button>
              <span id="submit-status" class="sr-only" aria-live="polite">
                {{ submitStatus }}
              </span>
            </div>
          </form>

          <div class="aria-attributes-list">
            <h5>{{ $t('pages.ariaComponents.ariaAttributes.title') }}</h5>
            <ul>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.ariaLabel')"></li>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.ariaDescribedby')"></li>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.ariaRequired')"></li>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.ariaInvalid')"></li>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.ariaLabelledby')"></li>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.roleAlert')"></li>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.ariaHidden')"></li>
              <li v-html="$t('pages.ariaComponents.ariaAttributes.ariaLive')"></li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.ariaComponents.accordion.title')"
      :explanation="$t('pages.ariaComponents.accordion.explanation')"
    >
      <template #bad>
        <div class="accordion-demo">
          <h4>{{ $t('pages.ariaComponents.accordion.bad.title') }}</h4>
          <div class="accordion-bad">
            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(0)">
                <span>{{ $t('pages.ariaComponents.faq.questions.q1.title') }}</span>
                <span class="accordion-icon">{{ badAccordionOpen[0] ? '−' : '+' }}</span>
              </div>
              <div v-if="badAccordionOpen[0]" class="accordion-content">
                <p>{{ $t('pages.ariaComponents.faq.questions.q1.content') }}</p>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(1)">
                <span>{{ $t('pages.ariaComponents.faq.questions.q2.title') }}</span>
                <span class="accordion-icon">{{ badAccordionOpen[1] ? '−' : '+' }}</span>
              </div>
              <div v-if="badAccordionOpen[1]" class="accordion-content">
                <p>{{ $t('pages.ariaComponents.faq.questions.q2.content') }}</p>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(2)">
                <span>{{ $t('pages.ariaComponents.faq.questions.q3.title') }}</span>
                <span class="accordion-icon">{{ badAccordionOpen[2] ? '−' : '+' }}</span>
              </div>
              <div v-if="badAccordionOpen[2]" class="accordion-content">
                <p>{{ $t('pages.ariaComponents.faq.questions.q3.content') }}</p>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.accordion.badComment') }} --&gt;
&lt;div class="accordion-header" @click="toggle"&gt;
  &lt;span&gt;Title&lt;/span&gt;
  &lt;span&gt;+&lt;/span&gt;
&lt;/div&gt;
&lt;div v-if="open"&gt;
  Content
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>

      <template #good>
        <div class="accordion-demo">
          <h4>{{ $t('pages.ariaComponents.accordion.good.title') }}</h4>
          <div class="accordion-good">
            <div
              v-for="(item, index) in accordionItems"
              :key="index"
              class="accordion-item"
            >
              <button
                :id="`accordion-button-${index}`"
                class="accordion-header"
                :aria-expanded="goodAccordionOpen[index] ? 'true' : 'false'"
                :aria-controls="`accordion-panel-${index}`"
                @click="toggleGoodAccordion(index)"
                @keydown.enter="toggleGoodAccordion(index)"
                @keydown.space.prevent="toggleGoodAccordion(index)"
                @keydown="handleAccordionKeydown($event, index)"
              >
                <span>{{ item.title }}</span>
                <span class="accordion-icon">{{ goodAccordionOpen[index] ? '−' : '+' }}</span>
              </button>
              <div
                v-if="goodAccordionOpen[index]"
                :id="`accordion-panel-${index}`"
                role="region"
                :aria-labelledby="`accordion-button-${index}`"
                class="accordion-content"
              >
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.accordion.goodComment') }} --&gt;
&lt;button
  id="accordion-button-1"
  aria-expanded="false"
  aria-controls="panel-1"
  @click="toggle"
  @keydown.enter="toggle"
&gt;
  Title
&lt;/button&gt;
&lt;div
  id="panel-1"
  role="region"
  aria-labelledby="accordion-button-1"
  :hidden="!open"
&gt;
  Content
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <section class="tabindex-section">
      <h2 class="section-title">{{ $t('pages.ariaComponents.tabindex.title') }}</h2>
      <p>
        {{ $t('pages.ariaComponents.tabindex.intro') }}
      </p>

      <div class="tabindex-values">
        <div class="tabindex-card">
          <h3 v-html="$t('pages.ariaComponents.tabindex.positive.title')"></h3>
          <p>{{ $t('pages.ariaComponents.tabindex.positive.description') }}</p>
          <code>tabindex="0"</code>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.goodInteractive') }} --&gt;
&lt;div role="button" aria-label="Custom action" tabindex="0"&gt;
  Custom button
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <div class="tabindex-card">
          <h3 v-html="$t('pages.ariaComponents.tabindex.negative.title')"></h3>
          <p>{{ $t('pages.ariaComponents.tabindex.negative.description') }}</p>
          <code>tabindex="-1"</code>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.goodProgrammatic') }} --&gt;
&lt;div role="alert" aria-live="assertive" tabindex="-1"&gt;
  Error message
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <div class="tabindex-card bad">
          <h3 v-html="$t('pages.ariaComponents.tabindex.greaterThanZero.title')"></h3>
          <p>{{ $t('pages.ariaComponents.tabindex.greaterThanZero.description') }}</p>
          <code>tabindex="5"</code>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.badBreaksOrder') }} --&gt;
&lt;button tabindex="3"&gt;Third&lt;/button&gt;
&lt;button tabindex="1"&gt;First&lt;/button&gt;
&lt;button tabindex="2"&gt;Second&lt;/button&gt;</code></pre>
          </div>
        </div>
      </div>

      <div class="tabindex-best-practices">
        <h3>{{ $t('pages.ariaComponents.tabindex.bestPractices.title') }}</h3>
        <ul>
          <li v-html="$t('pages.ariaComponents.tabindex.bestPractices.practice1')"></li>
          <li v-html="$t('pages.ariaComponents.tabindex.bestPractices.practice2')"></li>
          <li v-html="$t('pages.ariaComponents.tabindex.bestPractices.practice3')"></li>
          <li v-html="$t('pages.ariaComponents.tabindex.bestPractices.practice4')"></li>
        </ul>
      </div>

      <!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.interactiveExamples') }} -->
      <div class="focus-examples">
        <h3>{{ $t('pages.ariaComponents.tabindex.interactive.title') }}</h3>
        <p>{{ $t('pages.ariaComponents.tabindex.interactive.description') }}</p>

        <div class="focus-demo-grid">
          <div class="focus-demo-section">
            <h4>{{ $t('pages.ariaComponents.tabindex.focusable.title') }}</h4>

            <!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.nativeFocusable') }} -->
            <button class="demo-button">{{ $t('pages.ariaComponents.tabindex.focusable.nativeButton') }}</button>
            <input type="text" :placeholder="$t('pages.ariaComponents.tabindex.focusable.textInput')" class="demo-input" />
            <a href="#demo" class="demo-link">{{ $t('pages.ariaComponents.tabindex.focusable.link') }}</a>

            <!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.customFocusable') }} -->
            <div role="button" :aria-label="$t('pages.ariaComponents.tabindex.focusable.customButtonLabel')" tabindex="0" class="custom-button" @click="handleCustomButtonClick" @keydown="handleCustomButtonKeydown">
              {{ $t('pages.ariaComponents.tabindex.focusable.customButton') }}
            </div>

            <div role="tab" aria-selected="false" aria-controls="panel-1" tabindex="0" class="custom-tab" @click="handleTabClick" @keydown="handleTabKeydown">
              {{ $t('pages.ariaComponents.tabindex.focusable.customTab') }}
            </div>

            <div role="menuitem" :aria-label="$t('pages.ariaComponents.tabindex.focusable.menuItemLabel')" tabindex="0" class="custom-menuitem" @click="handleMenuClick" @keydown="handleMenuKeydown">
              {{ $t('pages.ariaComponents.tabindex.focusable.menuItem') }}
            </div>
          </div>

          <div class="focus-demo-section">
            <h4>{{ $t('pages.ariaComponents.tabindex.nonFocusable.title') }}</h4>

            <!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.nonFocusable') }} -->
            <div class="demo-text">{{ $t('pages.ariaComponents.tabindex.nonFocusable.simpleText') }}</div>
            <span class="demo-span">{{ $t('pages.ariaComponents.tabindex.nonFocusable.inlineText') }}</span>
            <p class="demo-paragraph">{{ $t('pages.ariaComponents.tabindex.nonFocusable.paragraph') }}</p>

            <!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.disabledElements') }} -->
            <button disabled class="demo-button">{{ $t('pages.ariaComponents.tabindex.nonFocusable.disabledButton') }}</button>
            <input type="text" disabled :placeholder="$t('pages.ariaComponents.tabindex.nonFocusable.disabledInput')" class="demo-input" />

            <!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.hiddenFromSR') }} -->
            <div aria-hidden="true" class="demo-hidden">{{ $t('pages.ariaComponents.tabindex.nonFocusable.hiddenElement') }}</div>

            <!-- {{ $t('pages.ariaComponents.codeExamples.tabindex.programmaticOnly') }} -->
            <div role="alert" aria-live="polite" tabindex="-1" class="demo-alert" ref="alertElement">
              {{ $t('pages.ariaComponents.tabindex.nonFocusable.alertMessage') }}
            </div>

            <button @click="focusAlert" class="demo-button">{{ $t('pages.ariaComponents.tabindex.nonFocusable.focusAlertButton') }}</button>
          </div>
        </div>

        <div class="focus-tips">
          <h4>{{ $t('pages.ariaComponents.tabindex.testingTips.title') }}</h4>
          <ul>
            <li v-html="$t('pages.ariaComponents.tabindex.testingTips.tip1')"></li>
            <li v-html="$t('pages.ariaComponents.tabindex.testingTips.tip2')"></li>
            <li v-html="$t('pages.ariaComponents.tabindex.testingTips.tip3')"></li>
            <li v-html="$t('pages.ariaComponents.tabindex.testingTips.tip4')"></li>
            <li v-html="$t('pages.ariaComponents.tabindex.testingTips.tip5')"></li>
          </ul>
        </div>
      </div>
    </section>

    <ExampleToggle
      :title="$t('pages.ariaComponents.dropdown.title')"
      :explanation="$t('pages.ariaComponents.dropdown.explanation')"
    >
      <template #bad>
        <div class="dropdown-demo">
          <h4>{{ $t('pages.ariaComponents.dropdown.bad.title') }}</h4>
          <div class="dropdown-bad">
            <div class="dropdown-trigger" @click="badDropdownOpen = !badDropdownOpen">
              {{ $t('pages.ariaComponents.dropdown.bad.actions') }} {{ badDropdownOpen ? '▲' : '▼' }}
            </div>
            <div v-if="badDropdownOpen" class="dropdown-menu">
              <div class="dropdown-item" @click="handleAction('edit')">{{ $t('pages.ariaComponents.dropdown.bad.edit') }}</div>
              <div class="dropdown-item" @click="handleAction('copy')">{{ $t('pages.ariaComponents.dropdown.bad.copy') }}</div>
              <div class="dropdown-item" @click="handleAction('delete')">{{ $t('pages.ariaComponents.dropdown.bad.delete') }}</div>
              <div class="dropdown-item" @click="handleAction('share')">{{ $t('pages.ariaComponents.dropdown.bad.share') }}</div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.dropdown.badComment') }} --&gt;
&lt;div @click="open = !open"&gt;
  Actions ▼
&lt;/div&gt;
&lt;div v-if="open"&gt;
  &lt;div @click="action"&gt;Edit&lt;/div&gt;
  &lt;div @click="action"&gt;Delete&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>

      <template #good>
        <div class="dropdown-demo">
          <h4>{{ $t('pages.ariaComponents.dropdown.good.title') }}</h4>
          <div class="dropdown-good">
            <button
              class="dropdown-trigger"
              aria-haspopup="true"
              :aria-expanded="goodDropdownOpen"
              :aria-controls="goodDropdownOpen ? 'dropdown-menu-good' : undefined"
              @click="toggleGoodDropdown"
              @keydown="handleDropdownTriggerKeydown"
              ref="dropdownTrigger"
            >
              {{ $t('pages.ariaComponents.dropdown.good.actions') }} <span aria-hidden="true">▼</span>
            </button>
            <div
              v-show="goodDropdownOpen"
              class="dropdown-popin"
              @click.self="closeGoodDropdown"
            >
              <div
                id="dropdown-menu-good"
                class="dropdown-menu"
                role="menu"
                @keydown="handleDropdownMenuKeydown"
              >
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('edit')"
                  ref="firstMenuItem"
                >
                  {{ $t('pages.ariaComponents.dropdown.good.edit') }}
                </button>
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('copy')"
                >
                  {{ $t('pages.ariaComponents.dropdown.good.copy') }}
                </button>
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('delete')"
                >
                  {{ $t('pages.ariaComponents.dropdown.good.delete') }}
                </button>
                <button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('share')"
                >
                  {{ $t('pages.ariaComponents.dropdown.good.share') }}
                </button>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.dropdown.goodComment') }} --&gt;
&lt;button
  aria-haspopup="true"
  aria-expanded="false"
  aria-controls="menu"
  @keydown.escape="close"
&gt;
  Actions
&lt;/button&gt;
&lt;div
  id="menu"
  role="menu"
  v-if="open"
&gt;
  &lt;button role="menuitem"&gt;Edit&lt;/button&gt;
  &lt;button role="menuitem"&gt;Delete&lt;/button&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.ariaComponents.gallery.title')"
      :explanation="$t('pages.ariaComponents.gallery.explanation')"
    >
      <template #bad>
        <div class="gallery-demo">
          <h4>{{ $t('pages.ariaComponents.gallery.title') }}</h4>
          <div class="gallery-bad">
            <div class="thumbnails-bad">
              <img
                v-for="(image, index) in galleryImages"
                :key="index"
                :src="image.thumb"
                @click="selectedBadImage = index"
                :class="{ active: selectedBadImage === index }"
              />
            </div>
            <div class="main-image-bad">
              <img :src="galleryImages[selectedBadImage].full" />
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.gallery.badComment') }} --&gt;
&lt;div class="thumbnails"&gt;
  &lt;img v-for="image in images"
       :src="image.thumb"
       @click="selectImage(index)"
       :class="{ active: selected === index }" /&gt;
&lt;/div&gt;
&lt;div class="main-image"&gt;
  &lt;img :src="images[selected].full" /&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>

      <template #good>
        <div class="gallery-demo">
          <h4>{{ $t('pages.ariaComponents.gallery.title') }}</h4>
          <div class="gallery-good">
            <div class="thumbnails-good" role="tablist" :aria-label="$t('pages.ariaComponents.gallery.ariaLabel')">
              <button
                v-for="(image, index) in galleryImages"
                :key="index"
                :id="`gallery-tab-${index}`"
                role="tab"
                :aria-selected="selectedGoodImage === index"
                :aria-controls="`gallery-panel-${index}`"
                :tabindex="selectedGoodImage === index ? 0 : -1"
                @click="selectGoodImage(index)"
                @keydown="handleGalleryKeydown($event, index)"
                class="thumbnail-btn"
                :class="{ active: selectedGoodImage === index }"
              >
                <img :src="image.thumb" :alt="`${image.alt} - Miniature`" />
              </button>
            </div>
            <div class="main-image-good">
              <div
                :id="`gallery-panel-${selectedGoodImage}`"
                role="tabpanel"
                :aria-labelledby="`gallery-tab-${selectedGoodImage}`"
              >
                <img
                  :src="galleryImages[selectedGoodImage].full"
                  :alt="galleryImages[selectedGoodImage].alt"
                />
                <p class="image-description">{{ galleryImages[selectedGoodImage].description }}</p>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.gallery.goodComment') }} --&gt;
&lt;div role="tablist" aria-label="{{ $t('pages.ariaComponents.gallery.ariaLabel') }}"&gt;
  &lt;button v-for="(image, index) in images"
          :id="`tab-${index}`"
          role="tab"
          :aria-selected="selected === index"
          :aria-controls="`panel-${index}`"
          :tabindex="selected === index ? 0 : -1"
          @click="selectImage(index)"
          @keydown="handleKeydown($event, index)"&gt;
    &lt;img :src="image.thumb" :alt="`${image.alt} - Miniature`" /&gt;
  &lt;/button&gt;
&lt;/div&gt;

&lt;div :id="`panel-${selected}`"
     role="tabpanel"
     :aria-labelledby="`tab-${selected}`"&gt;
  &lt;img :src="images[selected].full" :alt="images[selected].alt" /&gt;
  &lt;p&gt;&#123;&#123; images[selected].description &#125;&#125;&lt;/p&gt;
&lt;/div&gt;

&lt;!-- Bonnes pratiques :
- Pattern tablist/tab/tabpanel ARIA
- Navigation avec flèches, Home, End
- Focus management avec tabindex
- Descriptions détaillées pour chaque image --&gt;</code></pre>
          </div>
        </div>
      </template>

    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.ariaComponents.sortableTable.title')"
      :explanation="$t('pages.ariaComponents.sortableTable.explanation')"
    >
      <template #bad>
        <div class="table-demo">
          <table class="table-bad">
            <thead>
              <tr>
                <th @click="sortBadTable('name')">
                  {{ $t('pages.ariaComponents.sortableTable.columns.name') }} {{ badSortColumn === 'name' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('email')">
                  {{ $t('pages.ariaComponents.sortableTable.columns.email') }} {{ badSortColumn === 'email' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('role')">
                  {{ $t('pages.ariaComponents.sortableTable.columns.role') }} {{ badSortColumn === 'role' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('status')">
                  {{ $t('pages.ariaComponents.sortableTable.columns.status') }} {{ badSortColumn === 'status' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in sortedBadUsers" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template #good>
        <div class="table-demo">
          <div id="table-status" class="sr-only" aria-live="polite" aria-atomic="true">
            {{ tableStatusMessage }}
          </div>
          <table class="table-good" role="table" :aria-label="$t('pages.ariaComponents.table.ariaLabel')">
            <thead>
              <tr>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('name')"
                    :aria-sort="getSortState('name')"
                    aria-describedby="sort-instructions"
                  >
                    {{ $t('pages.ariaComponents.sortableTable.columns.name') }}
                    <span aria-hidden="true">{{ getSortIcon('name') === 'chevron-up' ? '↑' : getSortIcon('name') === 'chevron-down' ? '↓' : '↕' }}</span>
                  </button>
                </th>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('email')"
                    :aria-sort="getSortState('email')"
                    aria-describedby="sort-instructions"
                  >
                    {{ $t('pages.ariaComponents.sortableTable.columns.email') }}
                    <span aria-hidden="true">{{ getSortIcon('email') === 'chevron-up' ? '↑' : getSortIcon('email') === 'chevron-down' ? '↓' : '↕' }}</span>
                  </button>
                </th>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('role')"
                    :aria-sort="getSortState('role')"
                    aria-describedby="sort-instructions"
                  >
                    {{ $t('pages.ariaComponents.sortableTable.columns.role') }}
                    <span aria-hidden="true">{{ getSortIcon('role') === 'chevron-up' ? '↑' : getSortIcon('role') === 'chevron-down' ? '↓' : '↕' }}</span>
                  </button>
                </th>
                <th scope="col">
                  <button
                    class="sort-button"
                    @click="sortGoodTable('status')"
                    :aria-sort="getSortState('status')"
                    aria-describedby="sort-instructions"
                  >
                    {{ $t('pages.ariaComponents.sortableTable.columns.status') }}
                    <span aria-hidden="true">{{ getSortIcon('status') === 'chevron-up' ? '↑' : getSortIcon('status') === 'chevron-down' ? '↓' : '↕' }}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in sortedGoodUsers" :key="user.id">
                <th scope="row">{{ user.name }}</th>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <span class="status-badge" :class="'status-' + user.status.toLowerCase()">{{ user.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="sort-instructions" class="table-instructions">
            {{ $t('pages.ariaComponents.table.instructions') }}
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.ariaComponents.liveRegions.title')"
      :explanation="$t('pages.ariaComponents.liveRegions.explanation')"
    >
      <template #bad>
        <div class="aria-live-demo">
          <h4>{{ $t('pages.ariaComponents.liveRegions.bad.title') }}</h4>
          <p>{{ $t('pages.ariaComponents.liveRegions.bad.description') }}</p>

          <div class="code-block">
            <pre><code>&lt;!-- Mauvais : pas d'attribut aria-live --&gt;
&lt;div class="status-banner"&gt;
  &lt;p&gt;{{ badLiveContent }}&lt;/p&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="live-controls">
            <button @click="updateBadLiveContent">
              {{ $t('pages.ariaComponents.liveRegions.bad.updateButton') }}
            </button>
            <button @click="clearBadLiveContent">
              {{ $t('pages.ariaComponents.liveRegions.bad.clearButton') }}
            </button>
          </div>

          <div class="live-region-bad">
            <p>{{ badLiveContent || $t('pages.ariaComponents.liveRegions.bad.defaultContent') }}</p>
          </div>

          <div class="live-status">
            <p><strong>{{ $t('pages.ariaComponents.liveRegions.bad.problemsTitle') }}</strong></p>
            <ul>
              <li>{{ $t('pages.ariaComponents.liveRegions.bad.problem1') }}</li>
              <li>{{ $t('pages.ariaComponents.liveRegions.bad.problem2') }}</li>
              <li>{{ $t('pages.ariaComponents.liveRegions.bad.problem3') }}</li>
            </ul>
          </div>
        </div>
      </template>

      <template #good>
        <div class="aria-live-demo">
          <h4>{{ $t('pages.ariaComponents.liveRegions.good.title') }}</h4>
          <p>{{ $t('pages.ariaComponents.liveRegions.good.description') }}</p>

          <div class="code-block">
            <pre><code>&lt;!-- Bon : avec aria-live="polite" pour informations --&gt;
&lt;div
  class="status-banner"
  aria-live="polite"
  aria-atomic="true"
  role="status"
&gt;
  &lt;p&gt;Information : Données mises à jour&lt;/p&gt;
&lt;/div&gt;

&lt;!-- Bon : avec aria-live="assertive" pour alertes --&gt;
&lt;div
  class="alert-banner"
  aria-live="assertive"
  aria-atomic="true"
  role="alert"
&gt;
  &lt;p&gt;Attention : Action requise immédiatement&lt;/p&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="live-controls">
            <label for="live-type">{{ $t('pages.ariaComponents.liveRegions.good.regionTypeLabel') }}</label>
            <select id="live-type" v-model="liveType">
              <option value="polite">{{ $t('pages.ariaComponents.liveRegions.good.politeOption') }}</option>
              <option value="assertive">{{ $t('pages.ariaComponents.liveRegions.good.assertiveOption') }}</option>
              <option value="off">{{ $t('pages.ariaComponents.liveRegions.good.offOption') }}</option>
            </select>

            <button @click="updateGoodLiveContent('info')">
              {{ $t('pages.ariaComponents.liveRegions.good.infoButton') }}
            </button>
            <button @click="updateGoodLiveContent('alert')">
              {{ $t('pages.ariaComponents.liveRegions.good.alertButton') }}
            </button>
            <button @click="clearGoodLiveContent">
              {{ $t('pages.ariaComponents.liveRegions.good.clearButton') }}
            </button>
          </div>

          <div class="live-regions">
            <div
              class="live-region-polite"
              aria-live="polite"
              aria-atomic="true"
              role="status"
            >
              <p>{{ politeLiveContent || $t('pages.ariaComponents.liveRegions.good.politeZone') }}</p>
            </div>

            <div
              class="live-region-assertive"
              aria-live="assertive"
              aria-atomic="true"
              role="alert"
            >
              <p>{{ assertiveLiveContent || $t('pages.ariaComponents.liveRegions.good.assertiveZone') }}</p>
            </div>
          </div>

          <div class="live-status">
            <p><strong>{{ $t('pages.ariaComponents.liveRegions.good.benefitsTitle') }}</strong></p>
            <ul>
              <li v-html="$t('pages.ariaComponents.liveRegions.good.benefit1')"></li>
              <li v-html="$t('pages.ariaComponents.liveRegions.good.benefit2')"></li>
              <li v-html="$t('pages.ariaComponents.liveRegions.good.benefit3')"></li>
              <li v-html="$t('pages.ariaComponents.liveRegions.good.benefit4')"></li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.ariaComponents.iconButtons.title')"
      :explanation="$t('pages.ariaComponents.iconButtons.explanation')"
    >
      <template #bad>
        <div class="icon-buttons-demo">
          <h4>{{ $t('pages.ariaComponents.iconButtons.heading') }}</h4>
          <p>{{ $t('pages.ariaComponents.iconButtons.bad.description') }}</p>

          <div class="button-group">
            <button class="icon-button">
              <span class="icon">🗑️</span>
            </button>
            <button class="icon-button">
              <span class="icon">✏️</span>
            </button>
            <button class="icon-button">
              <span class="icon">⭐</span>
            </button>
            <button class="icon-button">
              <span class="icon">🔍</span>
            </button>
            <button class="icon-button">
              <span class="icon">⚙️</span>
            </button>
          </div>

          <div class="problems-list">
            <h5>{{ $t('pages.ariaComponents.iconButtons.bad.problemsTitle') }}</h5>
            <ul>
              <li>{{ $t('pages.ariaComponents.iconButtons.bad.problem1') }}</li>
              <li>{{ $t('pages.ariaComponents.iconButtons.bad.problem2') }}</li>
              <li>{{ $t('pages.ariaComponents.iconButtons.bad.problem3') }}</li>
              <li>{{ $t('pages.ariaComponents.iconButtons.bad.problem4') }}</li>
            </ul>
          </div>
        </div>
      </template>

      <template #good>
        <div class="icon-buttons-demo">
          <h4>{{ $t('pages.ariaComponents.iconButtons.good.title') }}</h4>
          <p>{{ $t('pages.ariaComponents.iconButtons.good.description') }}</p>

          <div class="button-examples">
            <div class="button-example">
              <h5>{{ $t('pages.ariaComponents.iconButtons.good.approach1Title') }}</h5>
              <div class="button-group">
                <button class="icon-button" :aria-label="$t('pages.ariaComponents.iconButtons.good.deleteLabel')">
                  <span class="icon" aria-hidden="true">🗑️</span>
                </button>
                <button class="icon-button" :aria-label="$t('pages.ariaComponents.iconButtons.good.editLabel')">
                  <span class="icon" aria-hidden="true">✏️</span>
                </button>
                <button class="icon-button" :aria-label="$t('pages.ariaComponents.iconButtons.good.favoriteLabel')">
                  <span class="icon" aria-hidden="true">⭐</span>
                </button>
              </div>
            </div>

            <div class="button-example">
              <h5>{{ $t('pages.ariaComponents.iconButtons.good.approach2Title') }}</h5>
              <div class="button-group">
                <button class="text-icon-button">
                  <span class="icon" aria-hidden="true">🔍</span>
                  <span>{{ $t('pages.ariaComponents.iconButtons.good.searchText') }}</span>
                </button>
                <button class="text-icon-button">
                  <span class="icon" aria-hidden="true">⚙️</span>
                  <span>{{ $t('pages.ariaComponents.iconButtons.good.settingsText') }}</span>
                </button>
              </div>
            </div>

            <div class="button-example">
              <h5>{{ $t('pages.ariaComponents.iconButtons.good.approach3Title') }}</h5>
              <div class="button-group">
                <button class="icon-button">
                  <span class="icon" aria-hidden="true">💾</span>
                  <span class="sr-only">{{ $t('pages.ariaComponents.iconButtons.good.saveText') }}</span>
                </button>
                <button class="icon-button" :title="$t('pages.ariaComponents.iconButtons.good.shareText')">
                  <span class="icon" aria-hidden="true">📤</span>
                  <span class="sr-only">{{ $t('pages.ariaComponents.iconButtons.good.shareText') }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h5>{{ $t('pages.ariaComponents.iconButtons.good.bestPracticesTitle') }}</h5>
            <ul>
              <li>{{ $t('pages.ariaComponents.iconButtons.good.practice1') }}</li>
              <li v-html="$t('pages.ariaComponents.iconButtons.good.practice2')"></li>
              <li>{{ $t('pages.ariaComponents.iconButtons.good.practice3') }}</li>
              <li>{{ $t('pages.ariaComponents.iconButtons.good.practice4') }}</li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.ariaComponents.combobox.title')"
      :explanation="$t('pages.ariaComponents.combobox.explanation')"
    >
      <template #bad>
        <div class="combobox-demo">
          <h4>{{ $t('pages.ariaComponents.combobox.bad.title') }}</h4>
          <div class="search-container-bad">
            <input
              type="text"
              v-model="searchQueryBad"
              @input="filterSuggestionsBad"
              :placeholder="$t('pages.ariaComponents.combobox.bad.placeholder')"
              class="search-input-bad"
            >
            <div v-if="suggestionsBad.length" class="suggestions-bad">
              <div
                v-for="(item, index) in suggestionsBad"
                :key="index"
                @click="selectBad(item)"
                class="suggestion-item-bad"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <p v-if="selectedBad" class="selected-value-bad">
            {{ $t('pages.ariaComponents.combobox.selectedLabel') }} {{ selectedBad }}
          </p>
        </div>
      </template>

      <template #good>
        <div class="combobox-demo">
          <h4>{{ $t('pages.ariaComponents.combobox.good.title') }}</h4>
          <div class="search-container-good">
            <label for="country-search-good" id="search-label-good">
              {{ $t('pages.ariaComponents.combobox.good.label') }}
            </label>
            <input
              id="country-search-good"
              type="text"
              role="combobox"
              v-model="searchQueryGood"
              @input="filterSuggestionsGood"
              @keydown.down.prevent="selectNextGood"
              @keydown.up.prevent="selectPrevGood"
              @keydown.enter="confirmSelectionGood"
              @keydown.escape="closeSuggestionsGood"
              :aria-expanded="suggestionsGood.length > 0"
              aria-autocomplete="list"
              aria-controls="suggestions-list-good"
              :aria-activedescendant="selectedIndexGood >= 0 ? `option-good-${selectedIndexGood}` : ''"
              :placeholder="$t('pages.ariaComponents.combobox.good.placeholder')"
              class="search-input-good"
            >
            <ul
              v-show="suggestionsGood.length"
              id="suggestions-list-good"
              role="listbox"
              class="suggestions-good"
            >
              <li
                v-for="(item, i) in suggestionsGood"
                :key="i"
                role="option"
                :id="`option-good-${i}`"
                :aria-selected="i === selectedIndexGood"
                :class="{ active: i === selectedIndexGood }"
                @click="selectGood(item)"
                class="suggestion-item-good"
              >
                {{ item }}
              </li>
            </ul>
            <div role="status" aria-live="polite" class="sr-only">
              {{ $t('pages.ariaComponents.combobox.good.resultsStatus', { count: suggestionsGood.length }) }}
            </div>
          </div>
          <p v-if="selectedGood" class="selected-value-good">
            {{ $t('pages.ariaComponents.combobox.selectedLabel') }} {{ selectedGood }}
          </p>
        </div>
      </template>

      <template #bad-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.sortableTable.badComment') }} --&gt;
&lt;input type="text" @input="showSuggestions"&gt;
&lt;div v-if="suggestions.length"&gt;
  &lt;div v-for="item in suggestions" @click="select(item)"&gt;
    {{ item }}
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
      </template>

      <template #good-code>
        <div class="code-block">
          <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.sortableTable.goodComment') }} --&gt;
&lt;label for="search" id="search-label"&gt;Rechercher un pays&lt;/label&gt;
&lt;input
  id="search"
  role="combobox"
  :aria-expanded="showSuggestions"
  aria-autocomplete="list"
  aria-controls="suggestions-list"
  :aria-activedescendant="selectedId"
  @keydown.down="selectNext"
  @keydown.up="selectPrev"
  @keydown.enter="confirmSelection"
&gt;

&lt;ul id="suggestions-list" role="listbox" v-show="showSuggestions"&gt;
  &lt;li
    v-for="(item, i) in suggestions"
    role="option"
    :id="`option-${i}`"
    :aria-selected="i === selectedIndex"
  &gt;
    {{ item }}
  &lt;/li&gt;
&lt;/ul&gt;

&lt;div role="status" aria-live="polite"&gt;
  {{ suggestions.length }} résultats disponibles
&lt;/div&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      :title="$t('pages.ariaComponents.toast.title')"
      :explanation="$t('pages.ariaComponents.toast.explanation')"
    >
      <template #bad>
        <div class="toast-demo">
          <h4>{{ $t('pages.ariaComponents.toast.bad.title') }}</h4>
          <p>{{ $t('pages.ariaComponents.toast.bad.description') }}</p>

          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.liveRegions.badComment') }} --&gt;
&lt;div v-if="showToast" class="toast"&gt;
  Votre demande a été enregistrée
&lt;/div&gt;</code></pre>
          </div>

          <button @click="showBadToast" class="toast-button">
            {{ $t('pages.ariaComponents.toast.bad.button') }}
          </button>

          <div v-if="badToastVisible" class="toast-bad">
            {{ badToastMessage }}
          </div>
        </div>
      </template>

      <template #good>
        <div class="toast-demo">
          <h4>{{ $t('pages.ariaComponents.toast.good.title') }}</h4>
          <p>{{ $t('pages.ariaComponents.toast.good.description') }}</p>

          <div class="code-block">
            <pre><code>&lt;!-- {{ $t('pages.ariaComponents.codeExamples.liveRegions.goodInfoComment') }} --&gt;
&lt;div
  v-if="showToast"
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="toast"
&gt;
  &lt;p&gt;Votre demande a été enregistrée&lt;/p&gt;
  &lt;button @click="dismiss" aria-label="Fermer notification"&gt;✕&lt;/button&gt;
&lt;/div&gt;

&lt;!-- {{ $t('pages.ariaComponents.codeExamples.liveRegions.goodAlertComment') }} --&gt;
&lt;div
  v-if="showError"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  class="toast error"
&gt;
  &lt;p&gt;Erreur : action impossible à exécuter&lt;/p&gt;
  &lt;button @click="dismiss" aria-label="Fermer alerte"&gt;✕&lt;/button&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="toast-buttons">
            <button @click="showGoodInfo" class="toast-button info">
              {{ $t('pages.ariaComponents.toast.good.infoButton') }}
            </button>
            <button @click="showGoodError" class="toast-button error">
              {{ $t('pages.ariaComponents.toast.good.errorButton') }}
            </button>
          </div>

          <div
            v-if="goodToastVisible"
            :role="goodToastType === 'error' ? 'alert' : 'status'"
            :aria-live="goodToastType === 'error' ? 'assertive' : 'polite'"
            aria-atomic="true"
            :class="['toast-good', goodToastType]"
          >
            <p>{{ goodToastMessage }}</p>
            <button
              @click="dismissGoodToast"
              :aria-label="goodToastType === 'error' ? $t('pages.ariaComponents.toast.good.closeAlert') : $t('pages.ariaComponents.toast.good.closeNotification')"
              class="toast-close"
            >
              ✕
            </button>
          </div>

          <div class="toast-info">
            <h5>{{ $t('pages.ariaComponents.toast.good.differencesTitle') }}</h5>
            <ul>
              <li v-html="$t('pages.ariaComponents.toast.good.difference1')"></li>
              <li v-html="$t('pages.ariaComponents.toast.good.difference2')"></li>
              <li v-html="$t('pages.ariaComponents.toast.good.difference3')"></li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<style scoped>
.aria-components {
  max-width: 100%;
  margin: 0 auto;
}

header {
  text-align: left;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ARIA Intro section */
.aria-intro {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 2rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.aria-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.principle-card {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.principle-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.principle-card p {
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
}

.principle-card code {
  background: var(--color-bg);
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  display: block;
}

.aria-golden-rules {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 2px solid #f59e0b;
  margin-top: 2rem;
}

.aria-golden-rules h3 {
  color: #92400e;
  margin-bottom: 0.75rem;
}

.golden-rule-text {
  color: #78350f;
  font-size: 1.125rem;
  margin: 0;
}

/* Accordion styles */
.accordion-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.accordion-bad, .accordion-good {
  max-width: 600px;
}

.accordion-item {
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.accordion-item:last-child {
  margin-bottom: 0;
}

.accordion-header {
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--color-bg-secondary);
  color: var(--color-text);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.2s;
}

.accordion-header:hover {
  background: var(--color-primary-light);
}

.accordion-header:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: -3px;
}

.accordion-bad .accordion-header {
  background: var(--color-bg-secondary);
}

.accordion-icon {
  font-weight: bold;
  font-size: 1.2rem;
}

.accordion-content {
  padding: 1.5rem;
  background: var(--color-bg);
  color: var(--color-text);
}

.accordion-content p {
  margin: 0;
  line-height: 1.6;
}


/* Dropdown styles */
.dropdown-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.dropdown-bad, .dropdown-good {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-trigger:hover {
  background: var(--color-primary-dark);
}

.dropdown-trigger:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin-top: 0.25rem;
  padding: 0;
  list-style: none;
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
}

.dropdown-item:hover {
  background: var(--color-bg-secondary);
}

.dropdown-item:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

.dropdown-item:first-child {
  border-radius: 0.625rem 0.5rem 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

.dropdown-good {
  position: relative;
}

.dropdown-popin {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  margin-top: 0.25rem;
}

/* Table styles */
.table-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  overflow-x: auto;
}

.table-bad, .table-good {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-bg);
}

.table-bad th, .table-bad td,
.table-good th, .table-good td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.table-bad th {
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  background: var(--color-bg-secondary);
}

.table-bad th:hover {
  background: var(--color-primary-light);
}

.sort-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text);
}

.sort-button:hover {
  background: var(--color-primary-light);
}

.sort-button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-actif {
  background: #d1fae5;
  color: #065f46;
}

.status-inactif {
  background: #fee2e2;
  color: #991b1b;
}

.status-suspendu {
  background: #fef3c7;
  color: #92400e;
}

.table-instructions {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-bg-secondary);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Aria-live demo styles */
.aria-live-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.live-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.live-controls button {
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
}

.live-controls button:hover {
  background: var(--color-primary-dark);
}

.live-controls button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.live-controls select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background: var(--color-bg);
  color: var(--color-text);
}

.live-region-bad, .live-region-polite, .live-region-assertive {
  min-height: 60px;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.625rem;
  border: 2px solid var(--color-border);
}

.live-region-bad {
  background: #fee2e2;
  border-color: #ef4444;
}

.live-region-polite {
  background: #dbeafe;
  border-color: #3b82f6;
}

.live-region-assertive {
  background: #fee2e2;
  border-color: #ef4444;
}

.live-status {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.live-status ul {
  margin: 0.5rem 0 0 1.5rem;
}

.live-status li {
  margin-bottom: 0.5rem;
}

/* Form ARIA styles */
.form-aria-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.bad-form-aria, .good-form-aria {
  max-width: 500px;
}

.form-field {
  margin-bottom: 1.5rem;
}

.bad-input, .good-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
}

.bad-input:focus, .good-input:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.good-input.error {
  border-color: #ef4444;
}

.field-hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.error-message {
  margin-top: 0.5rem;
  color: #dc2626;
  font-size: 0.875rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-group input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.form-submit-button {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  font-weight: 600;
}

.form-submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-submit-button:not(:disabled):hover {
  background: var(--color-primary-dark);
}

.form-submit-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.bad-icon-button, .good-icon-button {
  padding: 0.75rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 1.25rem;
}

.bad-icon-button:hover, .good-icon-button:hover {
  background: var(--color-primary-dark);
}

.bad-icon-button:focus-visible, .good-icon-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.aria-attributes-list {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.aria-attributes-list h5 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.aria-attributes-list ul {
  list-style: none;
  padding: 0;
}

.aria-attributes-list li {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.aria-attributes-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.aria-attributes-list code {
  background: var(--color-bg);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

/* Tabindex section styles */
.tabindex-section {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 2rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.tabindex-values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tabindex-card {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 2px solid var(--color-border);
}

.tabindex-card.bad {
  border-color: #ef4444;
  background: #fef2f2;
}

.tabindex-card h3 {
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.tabindex-card p {
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
}

.tabindex-card code {
  display: block;
  padding: 0.5rem;
  background: var(--color-bg);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.tabindex-best-practices {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
  margin-top: 2rem;
}

.tabindex-best-practices h3 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.tabindex-best-practices ul {
  list-style: none;
  padding: 0;
}

.tabindex-best-practices li {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.tabindex-best-practices li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}

.inline-code {
  background: var(--color-bg-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875rem;
}

/* Focus examples styles */
.focus-examples {
  margin-top: 2rem;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.focus-examples h3 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.focus-demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.focus-demo-section {
  background: var(--color-bg);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.focus-demo-section h4 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.demo-button, .demo-input, .demo-link {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.demo-button {
  background: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
}

.demo-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.demo-input {
  width: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
}

.demo-link {
  color: var(--color-primary);
  text-decoration: underline;
}

.custom-button, .custom-tab, .custom-menuitem {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: 0.375rem;
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
  text-align: center;
}

.custom-button:focus, .custom-tab:focus, .custom-menuitem:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.demo-text, .demo-span, .demo-paragraph {
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
}

.demo-hidden {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.demo-alert {
  padding: 1rem;
  background: #dbeafe;
  border: 1px solid #3b82f6;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.focus-tips {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-bg);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.focus-tips h4 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.focus-tips ul {
  list-style: none;
  padding: 0;
}

.focus-tips li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.focus-tips li::before {
  content: "💡";
  position: absolute;
  left: 0;
}

.focus-tips kbd {
  background: var(--color-bg-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875rem;
  border: 1px solid var(--color-border);
}

/* Gallery styles */
.gallery-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.gallery-bad, .gallery-good {
  max-width: 600px;
  margin: 0 auto;
}

.thumbnails-bad, .thumbnails-good {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.thumbnails-bad img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.375rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnails-bad img.active {
  border-color: var(--color-primary);
}

.thumbnail-btn {
  padding: 0;
  border: 2px solid transparent;
  border-radius: 0.375rem;
  background: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.thumbnail-btn:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.thumbnail-btn.active {
  border-color: var(--color-primary);
}

.thumbnail-btn img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.375rem;
  display: block;
}

.main-image-bad img, .main-image-good img {
  width: 100%;
  border-radius: 0.625rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-description {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  color: var(--color-text);
}

/* Icon buttons styles */
.icon-buttons-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.icon-button {
  padding: 0.75rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 1.5rem;
  min-width: 3rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button:hover {
  background: var(--color-primary-dark);
}

.icon-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.text-icon-button {
  padding: 0.75rem 1.25rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.text-icon-button:hover {
  background: var(--color-primary-dark);
}

.text-icon-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.problems-list, .best-practices {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.problems-list h5, .best-practices h5 {
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.problems-list ul, .best-practices ul {
  margin: 0.5rem 0 0 1.5rem;
  color: var(--color-text-secondary);
}

.problems-list li, .best-practices li {
  margin-bottom: 0.5rem;
}

.button-examples {
  margin: 2rem 0;
}

.button-example {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.button-example h5 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

/* Combobox styles */
.combobox-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.search-container-bad, .search-container-good {
  position: relative;
  max-width: 400px;
}

.search-container-good label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.search-input-bad, .search-input-good {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
}

.search-input-bad:focus, .search-input-good:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.suggestions-bad, .suggestions-good {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 0.25rem;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
}

.suggestion-item-bad, .suggestion-item-good {
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--color-text);
}

.suggestion-item-bad:hover, .suggestion-item-good:hover {
  background: var(--color-bg-secondary);
}

.suggestion-item-good.active {
  background: var(--color-primary-light);
}

.selected-value-bad, .selected-value-good {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--color-bg-secondary);
  border-radius: 0.375rem;
  color: var(--color-text);
}

/* Toast styles */
.toast-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.toast-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.toast-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  background: var(--color-primary);
  color: white;
}

.toast-button:hover {
  background: var(--color-primary-dark);
}

.toast-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.toast-button.info {
  background: #3b82f6;
}

.toast-button.info:hover {
  background: #2563eb;
}

.toast-button.error {
  background: #ef4444;
}

.toast-button.error:hover {
  background: #dc2626;
}

.toast-bad, .toast-good {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem 1.5rem;
  border-radius: 0.625rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.toast-bad {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #3b82f6;
}

.toast-good {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #3b82f6;
}

.toast-good.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.toast-good p {
  margin: 0;
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  line-height: 1;
  color: inherit;
  opacity: 0.7;
}

.toast-close:hover {
  opacity: 1;
}

.toast-close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.toast-info {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
}

.toast-info h5 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.toast-info ul {
  margin: 0.5rem 0 0 1.5rem;
  color: var(--color-text-secondary);
}

.toast-info li {
  margin-bottom: 0.5rem;
}

.toast-info code {
  background: var(--color-bg);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

/* Code block styles */
.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.625rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.code-block code {
  color: inherit;
  background: none;
}

/* Screen reader only class */
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
</style>
