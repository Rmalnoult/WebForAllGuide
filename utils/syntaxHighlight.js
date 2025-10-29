// Simple syntax highlighter for HTML, CSS, and JavaScript
export function highlightCode(code, language = 'html') {
  if (!code) return ''

  let highlighted = code

  if (language === 'html') {
    // HTML highlighting
    highlighted = highlighted
      // Match comments first (so they don't get tag highlighting)
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syntax-comment">$1</span>')
      // Match HTML tags with their closing > and highlight them
      .replace(/(&lt;\/?[\w-]+)([^&]*?)(&gt;)/g, (match, openTag, attributes, closeTag) => {
        // Highlight the tag name
        let result = `<span class="syntax-tag">${openTag}</span>`

        // Highlight attributes within the tag
        if (attributes) {
          // Process attributes character by character to handle complex cases
          let processedAttrs = attributes

          // Match all attribute patterns including Vue directives and complex values
          // Handles: attr="value", attr='value', attr, v-bind:attr, @event, :attr, etc.
          processedAttrs = processedAttrs.replace(
            /([@:v-]?[\w-]+(?::[\w-]+)?(?:\.[\w-]+)*)(\s*=\s*)(["'])([^\3]*?)\3/g,
            (match, attrName, equals, quote, value) => {
              return `<span class="syntax-attr">${attrName}</span>${equals}<span class="syntax-string">${quote}${value}${quote}</span>`
            }
          )

          // Match standalone attributes (no value) like 'required', 'disabled', 'novalidate'
          processedAttrs = processedAttrs.replace(
            /\s+([@:v-]?[\w-]+(?::[\w-]+)?(?:\.[\w-]+)*)(?=\s|$)/g,
            (match, attrName) => {
              return ` <span class="syntax-attr">${attrName}</span>`
            }
          )

          result += processedAttrs
        }

        result += `<span class="syntax-tag">${closeTag}</span>`
        return result
      })
  } else if (language === 'css') {
    // CSS highlighting
    highlighted = highlighted
      .replace(/([\w-]+)\s*{/g, '<span class="syntax-selector">$1</span> {')
      .replace(/([\w-]+):/g, '<span class="syntax-property">$1</span>:')
      .replace(/:\s*([^;]+);/g, ': <span class="syntax-value">$1</span>;')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>')
  } else if (language === 'javascript') {
    // JavaScript highlighting
    highlighted = highlighted
      .replace(/\b(const|let|var|function|return|if|else|for|while|async|await|import|export|from|class|extends|switch|case|break|continue|default)\b/g, '<span class="syntax-keyword">$1</span>')
      .replace(/([a-zA-Z_$][\w$]*)\s*\(/g, '<span class="syntax-function">$1</span>(')
      .replace(/(["'`])((?:\\.|(?!\1).)*?)\1/g, '<span class="syntax-string">$1$2$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="syntax-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>')
  }

  return highlighted
}
