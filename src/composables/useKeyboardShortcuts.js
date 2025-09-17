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
    // Create help dialog
    const dialog = document.createElement('div')
    dialog.className = 'keyboard-help-dialog'
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-labelledby', 'help-title')
    dialog.setAttribute('aria-describedby', 'help-content')

    dialog.innerHTML = `
      <div class="dialog-overlay" onclick="this.parentElement.remove()"></div>
      <div class="dialog-content">
        <h2 id="help-title">Raccourcis Clavier</h2>
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
        <button class="dialog-close" onclick="this.closest('.keyboard-help-dialog').remove()">
          Fermer (Échap)
        </button>
      </div>
    `

    document.body.appendChild(dialog)

    // Focus on close button
    const closeButton = dialog.querySelector('.dialog-close')
    if (closeButton) closeButton.focus()

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        dialog.remove()
        document.removeEventListener('keydown', handleEscape)
      }
    }
    document.addEventListener('keydown', handleEscape)
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