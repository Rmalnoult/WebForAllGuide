/**
 * Syntax highlighting for HTML, CSS, and JavaScript code
 */

export function highlightCode(code, language = 'html') {
  if (language === 'html' || language === 'xml') {
    return highlightHTML(code);
  } else if (language === 'css') {
    return highlightCSS(code);
  } else if (language === 'javascript' || language === 'js') {
    return highlightJavaScript(code);
  }
  return code;
}

function highlightHTML(code) {
  // Store comments temporarily to protect them from other replacements
  const comments = [];
  code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (match) => {
    const placeholder = `__COMMENT_${comments.length}__`;
    comments.push(match);
    return placeholder;
  });

  // Highlight tags with attributes
  code = code.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^&>]*)?)(&gt;)/g, (match, opening, tagName, attrs, closing) => {
    // Process attributes if they exist
    let highlightedAttrs = attrs;
    if (attrs) {
      highlightedAttrs = attrs.replace(
        /(\s+)([@:]?[a-zA-Z][a-zA-Z0-9-:]*)(\s*=\s*)?("[^"]*"|'[^']*')?/g,
        (attrMatch, space, name, equals, value) => {
          // Check if it's a Vue.js event handler (@click, @keydown, etc.)
          if (name.startsWith('@')) {
            if (!equals) {
              return `${space}<span class="vue-event">${name}</span>`;
            }
            return `${space}<span class="vue-event">${name}</span><span class="attr-equals">${equals}</span><span class="attr-value">${value || ''}</span>`;
          }
          // Check if it's a Vue.js binding (:hidden, :class, v-bind:, etc.)
          else if (name.startsWith(':') || name.startsWith('v-bind:')) {
            if (!equals) {
              return `${space}<span class="vue-bind">${name}</span>`;
            }
            return `${space}<span class="vue-bind">${name}</span><span class="attr-equals">${equals}</span><span class="attr-value">${value || ''}</span>`;
          }
          // Check for other Vue directives (v-if, v-for, v-show, etc.)
          else if (name.startsWith('v-')) {
            if (!equals) {
              return `${space}<span class="vue-directive">${name}</span>`;
            }
            return `${space}<span class="vue-directive">${name}</span><span class="attr-equals">${equals}</span><span class="attr-value">${value || ''}</span>`;
          }
          // Regular HTML attributes
          else {
            if (!equals) {
              return `${space}<span class="attr-name">${name}</span>`;
            }
            return `${space}<span class="attr-name">${name}</span><span class="attr-equals">${equals}</span><span class="attr-value">${value || ''}</span>`;
          }
        }
      );
    }

    return `<span class="tag-bracket">${opening}</span><span class="tag-name">${tagName}</span>${highlightedAttrs}<span class="tag-bracket">${closing}</span>`;
  });

  // Restore and highlight comments
  comments.forEach((comment, index) => {
    code = code.replace(`__COMMENT_${index}__`, `<span class="comment">${comment}</span>`);
  });

  return code;
}

function highlightCSS(code) {
  // Store existing HTML tags to protect them from CSS highlighting
  const htmlTags = [];
  code = code.replace(/(<\/?span[^>]*>)/g, (match) => {
    const placeholder = `__HTMLTAG_${htmlTags.length}__`;
    htmlTags.push(match);
    return placeholder;
  });

  // Highlight comments
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');

  // Highlight @rules
  code = code.replace(/(@[a-zA-Z-]+)(\s+[^{;]+)?/g, '<span class="at-rule">$1</span>$2');

  // Highlight selectors and properties
  code = code.replace(/([^{}]+)\s*{([^}]*)}/g, (match, selector, rules) => {
    // Highlight pseudo-classes and pseudo-elements
    selector = selector.replace(/(:[a-zA-Z-]+)/g, '<span class="pseudo">$1</span>');

    // Highlight class and id selectors
    selector = selector.replace(/([.#][a-zA-Z_-][a-zA-Z0-9_-]*)/g, '<span class="selector">$1</span>');

    // Highlight element selectors
    selector = selector.replace(/\b([a-zA-Z]+)\b(?![:])/g, '<span class="selector">$1</span>');

    // Highlight properties and values
    rules = rules.replace(/([a-zA-Z-]+)\s*:\s*([^;]+);?/g, (ruleMatch, prop, value) => {
      // Highlight numbers with units
      value = value.replace(/(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|deg|s|ms)?/g, '<span class="number">$1</span><span class="unit">$2</span>');

      // Highlight hex colors
      value = value.replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="value">$1</span>');

      // Highlight strings
      value = value.replace(/("[^"]*"|'[^']*')/g, '<span class="string">$1</span>');

      return `<span class="property">${prop}</span>: ${value};`;
    });

    return `${selector} {${rules}}`;
  });

  // Restore HTML tags
  htmlTags.forEach((tag, index) => {
    code = code.replace(`__HTMLTAG_${index}__`, tag);
  });

  return code;
}

function highlightJavaScript(code) {
  // Store existing HTML tags to protect them from JavaScript highlighting
  const htmlTags = [];
  code = code.replace(/(<\/?span[^>]*>)/g, (match) => {
    const placeholder = `__HTMLTAG_${htmlTags.length}__`;
    htmlTags.push(match);
    return placeholder;
  });

  // Highlight comments
  code = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');

  // Highlight strings (but not within comments)
  code = code.replace(/(?<!<span class="comment">.*)(["'`])(?:\\.|(?!\1).)*?\1/g, '<span class="string">$&</span>');

  // Highlight keywords
  const keywords = ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'break', 'continue',
                   'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'typeof', 'instanceof',
                   'async', 'await', 'import', 'export', 'from', 'class', 'extends', 'static'];
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    code = code.replace(regex, '<span class="keyword">$1</span>');
  });

  // Highlight booleans and null
  code = code.replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>');
  code = code.replace(/\b(null|undefined)\b/g, '<span class="null">$1</span>');

  // Highlight numbers
  code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>');

  // Highlight functions
  code = code.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(');

  // Highlight operators
  code = code.replace(/([+\-*/%=<>!&|^~?:])/g, '<span class="operator">$1</span>');

  // Restore HTML tags
  htmlTags.forEach((tag, index) => {
    code = code.replace(`__HTMLTAG_${index}__`, tag);
  });

  return code;
}

/**
 * Vue directive for syntax highlighting
 */
export const vHighlight = {
  mounted(el, binding) {
    const language = binding.arg || 'html';
    const codeElements = el.querySelectorAll('code');

    codeElements.forEach(codeEl => {
      const originalCode = codeEl.innerHTML;
      const highlightedCode = highlightCode(originalCode, language);
      codeEl.innerHTML = highlightedCode;
    });
  },
  updated(el, binding) {
    const language = binding.arg || 'html';
    const codeElements = el.querySelectorAll('code');

    codeElements.forEach(codeEl => {
      if (!codeEl.dataset.highlighted) {
        const originalCode = codeEl.innerHTML;
        const highlightedCode = highlightCode(originalCode, language);
        codeEl.innerHTML = highlightedCode;
        codeEl.dataset.highlighted = 'true';
      }
    });
  }
};