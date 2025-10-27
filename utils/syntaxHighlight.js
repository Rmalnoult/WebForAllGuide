// Simple syntax highlighter for HTML, CSS, and JavaScript
export function highlightCode(code, language = 'html') {
  if (!code) return ''

  let highlighted = code

  if (language === 'html') {
    // HTML highlighting
    highlighted = highlighted
      .replace(/(&lt;\/?[\w-]+)/g, '<span class="syntax-tag">$1</span>')
      .replace(/([\w-]+)=["']/g, '<span class="syntax-attr">$1</span>=<span class="syntax-string">"')
      .replace(/["'](?=&gt;|>)/g, '</span>"')
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syntax-comment">$1</span>')
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
      .replace(/\b(const|let|var|function|return|if|else|for|while|async|await|import|export|from|class|extends)\b/g, '<span class="syntax-keyword">$1</span>')
      .replace(/([a-zA-Z_$][\w$]*)\s*\(/g, '<span class="syntax-function">$1</span>(')
      .replace(/(["'`])((?:\\.|(?!\1).)*?)\1/g, '<span class="syntax-string">$1$2$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="syntax-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>')
  }

  return highlighted
}
