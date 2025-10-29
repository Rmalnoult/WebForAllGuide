<template>
  <div class="example-comparison">
    <!-- Bad Example -->
    <section class="example-section bad-example" aria-labelledby="bad-example-heading">
      <h3 id="bad-example-heading" class="example-heading">
        <span class="icon" aria-hidden="true">❌</span>
        {{ $t('components.exampleComparison.badExample') }}
      </h3>
      <div class="example-content">
        <slot name="bad" />
      </div>
    </section>

    <!-- Good Example -->
    <section class="example-section good-example" aria-labelledby="good-example-heading">
      <h3 id="good-example-heading" class="example-heading">
        <span class="icon" aria-hidden="true">✅</span>
        {{ $t('components.exampleComparison.goodExample') }}
      </h3>
      <div class="example-content">
        <slot name="good" />
      </div>
    </section>

    <!-- Explanation -->
    <section class="example-section explanation" aria-labelledby="explanation-heading">
      <h3 id="explanation-heading" class="example-heading">
        <span class="icon" aria-hidden="true">💡</span>
        {{ $t('components.exampleComparison.explanation') }}
      </h3>
      <div class="example-content">
        <slot name="explanation" />
      </div>
    </section>
  </div>
</template>

<script setup>
// No props needed, everything is handled via slots
</script>

<style scoped>
.example-comparison {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.example-section {
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: border-color 0.2s ease;
}

.bad-example {
  border-left: 4px solid #EF4444;
  background: linear-gradient(to right, rgba(239, 68, 68, 0.05), transparent);
}

.good-example {
  border-left: 4px solid #10B981;
  background: linear-gradient(to right, rgba(16, 185, 129, 0.05), transparent);
}

.explanation {
  border-left: 4px solid #3B82F6;
  background: linear-gradient(to right, rgba(59, 130, 246, 0.05), transparent);
}

.example-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 1rem 0;
}

.bad-example .example-heading {
  color: #DC2626;
}

.good-example .example-heading {
  color: #059669;
}

.explanation .example-heading {
  color: #2563EB;
}

.icon {
  font-size: 1.5rem;
  line-height: 1;
}

.example-content {
  color: var(--color-text);
  line-height: 1.6;
}

.example-content :deep(p) {
  margin: 0.5rem 0;
}

.example-content :deep(p:first-child) {
  margin-top: 0;
}

.example-content :deep(p:last-child) {
  margin-bottom: 0;
}

.example-content :deep(ul),
.example-content :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
}

.example-content :deep(li) {
  margin: 0.5rem 0;
}

.example-content :deep(code) {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875em;
}

/* Responsive: Stack on mobile, side-by-side on desktop */
@media (min-width: 768px) {
  .example-comparison {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  .bad-example {
    grid-column: 1;
    grid-row: 1;
  }

  .good-example {
    grid-column: 2;
    grid-row: 1;
  }

  .explanation {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .example-section {
    border-width: 3px;
  }

  .bad-example,
  .good-example,
  .explanation {
    border-left-width: 6px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .example-section {
    transition: none;
  }
}

/* Focus visible for interactive elements inside */
.example-content :deep(a:focus-visible),
.example-content :deep(button:focus-visible) {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
