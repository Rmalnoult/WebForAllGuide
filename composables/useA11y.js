import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Composable pour gérer le focus trap
export function useFocusTrap(containerRef) {
  const previousFocus = ref(null)

  const trapFocus = (e) => {
    if (!containerRef.value) return

    const focusableElements = containerRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement?.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement?.focus()
        e.preventDefault()
      }
    }
  }

  const activate = async () => {
    previousFocus.value = document.activeElement
    await nextTick()
    const firstFocusable = containerRef.value?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()
    document.addEventListener('keydown', trapFocus)
  }

  const deactivate = () => {
    document.removeEventListener('keydown', trapFocus)
    previousFocus.value?.focus()
  }

  return { activate, deactivate }
}

// Composable pour les annonces screen reader
export function useAnnounce() {
  const announcement = ref('')

  const announce = (message, priority = 'polite') => {
    if (process.server) return

    announcement.value = message
    const element = document.createElement('div')
    element.setAttribute('role', 'status')
    element.setAttribute('aria-live', priority)
    element.setAttribute('aria-atomic', 'true')
    element.className = 'sr-only'
    element.textContent = message
    document.body.appendChild(element)

    setTimeout(() => {
      document.body.removeChild(element)
    }, 1000)
  }

  return { announce, announcement }
}

// Composable pour détecter les préférences utilisateur
export function useUserPreferences() {
  const prefersReducedMotion = ref(false)
  const prefersHighContrast = ref(false)
  const prefersDarkMode = ref(false)

  onMounted(() => {
    if (typeof window === 'undefined') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    prefersReducedMotion.value = motionQuery.matches
    prefersHighContrast.value = contrastQuery.matches
    prefersDarkMode.value = darkQuery.matches

    const updateMotion = (e) => { prefersReducedMotion.value = e.matches }
    const updateContrast = (e) => { prefersHighContrast.value = e.matches }
    const updateDark = (e) => { prefersDarkMode.value = e.matches }

    motionQuery.addEventListener('change', updateMotion)
    contrastQuery.addEventListener('change', updateContrast)
    darkQuery.addEventListener('change', updateDark)

    onUnmounted(() => {
      motionQuery.removeEventListener('change', updateMotion)
      contrastQuery.removeEventListener('change', updateContrast)
      darkQuery.removeEventListener('change', updateDark)
    })
  })

  return {
    prefersReducedMotion,
    prefersHighContrast,
    prefersDarkMode
  }
}
