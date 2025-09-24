import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function useKeyboardShortcuts() {
  const router = useRouter()

  const shortcuts = {
    // Navigation shortcuts (Alt + number)
    'Alt+1': () => router.push('/'),
    'Alt+2': () => router.push('/semantic-html'),
    'Alt+3': () => router.push('/keyboard-navigation'),
    'Alt+4': () => router.push('/media-accessible'),
    'Alt+5': () => router.push('/color-contrast'),
    'Alt+6': () => router.push('/accessible-forms'),
    'Alt+7': () => router.push('/aria-components'),
    'Alt+8': () => router.push('/performance'),

    // Focus shortcuts
    'Alt+m': () => {
      const main = document.getElementById('main-content')
      if (main) main.focus()
    },
    'Alt+n': () => {
      const nav = document.getElementById('main-nav')
      if (nav) nav.focus()
    },

    // Help dialog
    'Alt+h': () => {
      showHelpDialog()
    }
  }

  function handleKeydown(event) {
    // Build the key combination string
    let key = ''
    if (event.altKey) key += 'Alt+'
    if (event.ctrlKey) key += 'Ctrl+'
    if (event.shiftKey) key += 'Shift+'
    if (event.metaKey) key += 'Meta+'

    // Add the actual key
    if (event.key === ' ') {
      key += 'Space'
    } else if (event.key.length === 1) {
      key += event.key.toLowerCase()
    } else {
      key += event.key
    }

    // Check if we have a handler for this shortcut
    if (shortcuts[key]) {
      event.preventDefault()
      shortcuts[key]()

      // Announce the action for screen readers
      announceAction(key)
    }
  }

  function announceAction(shortcut) {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.className = 'sr-only'

    const messages = {
      'Alt+1': 'Navigation vers Accueil',
      'Alt+2': 'Navigation vers HTML Sémantique',
      'Alt+3': 'Navigation vers Navigation Clavier',
      'Alt+4': 'Navigation vers Images et Médias',
      'Alt+5': 'Navigation vers Contrastes et Couleurs',
      'Alt+6': 'Navigation vers Formulaires',
      'Alt+7': 'Navigation vers ARIA',
      'Alt+8': 'Navigation vers Performance',
      'Alt+m': 'Focus sur le contenu principal',
      'Alt+n': 'Focus sur la navigation',
      'Alt+h': 'Aide raccourcis clavier'
    }

    announcement.textContent = messages[shortcut] || 'Action effectuée'
    document.body.appendChild(announcement)

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  function showHelpDialog() {
    // Store the element that triggered the modal for focus restoration
    const triggerElement = document.activeElement

    // Create help dialog
    const dialog = document.createElement('div')
    dialog.className = 'keyboard-help-dialog'
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')
    dialog.setAttribute('aria-labelledby', 'help-title')
    dialog.setAttribute('aria-describedby', 'help-content')

    dialog.innerHTML = `
      <div class="dialog-overlay"></div>
      <div class="dialog-content" role="document">
        <h2 id="help-title" tabindex="-1">Raccourcis Clavier</h2>
        <div id="help-content">
          <h3>Navigation</h3>
          <dl class="shortcuts-list">
            <dt><kbd>Alt</kbd> + <kbd>1</kbd></dt>
            <dd>Accueil</dd>
            <dt><kbd>Alt</kbd> + <kbd>2</kbd></dt>
            <dd>HTML Sémantique</dd>
            <dt><kbd>Alt</kbd> + <kbd>3</kbd></dt>
            <dd>Navigation Clavier</dd>
            <dt><kbd>Alt</kbd> + <kbd>4</kbd></dt>
            <dd>Images et Médias</dd>
            <dt><kbd>Alt</kbd> + <kbd>5</kbd></dt>
            <dd>Contrastes</dd>
            <dt><kbd>Alt</kbd> + <kbd>6</kbd></dt>
            <dd>Formulaires</dd>
            <dt><kbd>Alt</kbd> + <kbd>7</kbd></dt>
            <dd>ARIA</dd>
            <dt><kbd>Alt</kbd> + <kbd>8</kbd></dt>
            <dd>Performance</dd>
          </dl>

          <h3>Focus</h3>
          <dl class="shortcuts-list">
            <dt><kbd>Alt</kbd> + <kbd>M</kbd></dt>
            <dd>Aller au contenu principal</dd>
            <dt><kbd>Alt</kbd> + <kbd>N</kbd></dt>
            <dd>Aller à la navigation</dd>
          </dl>

          <h3>Aide</h3>
          <dl class="shortcuts-list">
            <dt><kbd>Alt</kbd> + <kbd>H</kbd></dt>
            <dd>Afficher cette aide</dd>
            <dt><kbd>Échap</kbd></dt>
            <dd>Fermer cette fenêtre</dd>
          </dl>
        </div>
        <button class="dialog-close" type="button" aria-label="Fermer la fenêtre d'aide">
          Fermer (Échap)
        </button>
      </div>
    `

    document.body.appendChild(dialog)

    // Get focusable elements for focus trap
    const dialogContent = dialog.querySelector('.dialog-content')
    const dialogTitle = dialog.querySelector('#help-title')
    const closeButton = dialog.querySelector('.dialog-close')
    const overlay = dialog.querySelector('.dialog-overlay')

    // Set initial focus on the dialog title
    if (dialogTitle) dialogTitle.focus()

    // Function to close the dialog
    const closeDialog = () => {
      dialog.remove()
      // Restore focus to the triggering element
      if (triggerElement) {
        triggerElement.focus()
      }
      // Remove event listeners
      document.removeEventListener('keydown', handleKeydown)
    }

    // Handle click on overlay
    overlay.addEventListener('click', closeDialog)

    // Handle click on close button
    closeButton.addEventListener('click', closeDialog)

    // Handle keyboard events including Escape and Tab trap
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDialog()
      }

      // Implement focus trap
      if (e.key === 'Tab') {
        const focusableElements = dialogContent.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const focusableArray = Array.from(focusableElements)
        const firstFocusable = focusableArray[0]
        const lastFocusable = focusableArray[focusableArray.length - 1]

        if (e.shiftKey) {
          // Shift+Tab
          if (document.activeElement === firstFocusable) {
            e.preventDefault()
            lastFocusable.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault()
            firstFocusable.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeydown)

    // Announce modal opening for screen readers
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'assertive')
    announcement.className = 'sr-only'
    announcement.textContent = 'Fenêtre de raccourcis clavier ouverte. Appuyez sur Échap pour fermer.'
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    shortcuts,
    showHelpDialog
  }
}