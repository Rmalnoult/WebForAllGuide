import { onMounted, onUpdated, nextTick } from 'vue'
import { highlightCode } from '@/utils/syntaxHighlight'

export function useSyntaxHighlight() {
  const applyHighlighting = async () => {
    await nextTick()

    // Find all code blocks that haven't been highlighted yet
    const codeBlocks = document.querySelectorAll('.code-block code:not([data-highlighted])')

    codeBlocks.forEach((codeElement) => {
      // Detect language from parent class or default to HTML
      const parent = codeElement.closest('.code-block')
      let language = 'html'

      if (parent) {
        // Check for language class
        const langClass = Array.from(parent.classList).find(cls => cls.startsWith('language-'))
        if (langClass) {
          language = langClass.replace('language-', '')
        }

        // Check for specific content patterns
        const content = codeElement.innerHTML
        // Only detect pure CSS (not HTML with <style> tags)
        if (!content.includes('&lt;') && content.includes('{') && content.includes(':') && content.includes(';')) {
          language = 'css'
        } else if (!content.includes('&lt;') && (content.includes('function') || content.includes('const ') || content.includes('let ') || content.includes('var '))) {
          // Only detect pure JavaScript (not HTML with <script> tags)
          language = 'javascript'
        }
      }

      // Apply highlighting
      const originalCode = codeElement.innerHTML
      const highlightedCode = highlightCode(originalCode, language)
      codeElement.innerHTML = highlightedCode
      codeElement.setAttribute('data-highlighted', 'true')
      codeElement.setAttribute('data-language', language)

      // Add copy button if not present
      if (parent && !parent.querySelector('.copy-button')) {
        const copyButton = document.createElement('button')
        copyButton.className = 'copy-button'
        copyButton.textContent = 'Copier'
        copyButton.setAttribute('aria-label', `Copier le code ${language}`)

        copyButton.addEventListener('click', async () => {
          try {
            // Get the raw text without HTML tags
            const rawCode = originalCode
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/<[^>]*>/g, '') // Remove any HTML tags from highlighting

            await navigator.clipboard.writeText(rawCode)
            copyButton.textContent = '✓ Copié'

            setTimeout(() => {
              copyButton.textContent = 'Copier'
            }, 2000)
          } catch (error) {
            console.error('Failed to copy code:', error)
          }
        })

        parent.appendChild(copyButton)
      }
    })
  }

  onMounted(() => {
    applyHighlighting()
  })

  onUpdated(() => {
    applyHighlighting()
  })

  return {
    applyHighlighting
  }
}