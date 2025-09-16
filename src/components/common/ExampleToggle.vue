<template>
  <c-card class="example-toggle">
    <div class="toggle-header">
      <c-text tag="h3">{{ title }}</c-text>
    </div>

    <div class="examples-container">
      <c-card class="example bad-example">
        <div class="example-label bad-label">
          <c-icon name="error-circle" aria-hidden="true" /> Mauvais exemple
        </div>
        <div class="example-content">
          <slot name="bad"></slot>
        </div>
      </c-card>

      <c-card class="example good-example">
        <div class="example-label good-label">
          <c-icon name="check-circle" aria-hidden="true" /> Bon exemple
        </div>
        <div class="example-content">
          <slot name="good"></slot>
        </div>
      </c-card>
    </div>

    <div v-if="explanation" class="example-explanation" role="note">
      <c-text><strong>Explication :</strong> {{ explanation }}</c-text>
    </div>
  </c-card>
</template>

<script setup>
import { CCard, CText, CIcon } from '@carrefour/design-system-components-vue3';

defineProps({
  title: {
    type: String,
    required: true
  },
  explanation: String
})
</script>

<style scoped>
.example-toggle {
  margin-bottom: 2rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.toggle-header {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.toggle-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.examples-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: var(--color-border);
}

.example {
  position: relative;
  background: var(--color-bg);
}

.bad-example {
  border-right: 1px solid var(--color-border);
}

.example-content {
  padding: 1.5rem;
  min-height: 200px;
}

.example-label {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
}

.bad-label {
  background: var(--color-error-light);
  color: var(--color-error);
  border: 2px solid var(--color-error);
}

.good-label {
  background: var(--color-success-light);
  color: var(--color-success);
  border: 2px solid var(--color-success);
}

.example-explanation {
  background: var(--color-info-light);
  color: var(--color-text);
  border-top: 2px solid var(--color-info);
  padding: 1rem;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .examples-container {
    grid-template-columns: 1fr;
  }

  .bad-example {
    border-right: none;
    border-bottom: 2px solid var(--color-border);
  }
}
</style>