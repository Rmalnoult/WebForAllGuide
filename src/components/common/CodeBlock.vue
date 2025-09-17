<template>
  <div class="code-block" :class="{ [`language-${language}`]: true }">
    <button
      v-if="showCopyButton"
      @click="copyCode"
      class="copy-button"
      :aria-label="`Copier le code ${language}`"
    >
      {{ copied ? '✓ Copié' : 'Copier' }}
    </button>
    <pre><code ref="codeElement" v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { highlightCode } from '@/utils/syntaxHighlight'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'html'
  },
  showCopyButton: {
    type: Boolean,
    default: true
  }
})

const copied = ref(false)
const codeElement = ref(null)

// Compute highlighted code
const highlightedCode = computed(() => {
  return highlightCode(props.code, props.language)
})

// Copy code to clipboard
async function copyCode() {
  try {
    // Get the raw text without HTML tags
    const rawCode = props.code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")

    await navigator.clipboard.writeText(rawCode)
    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}
</script>

<style scoped>
@import '@/styles/syntax-highlight.css';
</style>