<template>
  <div class="example-toggle">
    <div class="toggle-header">
      <h3>{{ title }}</h3>
      <div class="toggle-buttons" role="group" :aria-label="`Basculer entre les exemples ${title}`">
        <button
          @click="showGood = false"
          :aria-pressed="!showGood"
          :class="{ active: !showGood }"
          class="toggle-bad"
        >
          ❌ Mauvais exemple
        </button>
        <button
          @click="showGood = true"
          :aria-pressed="showGood"
          :class="{ active: showGood }"
          class="toggle-good"
        >
          ✅ Bon exemple
        </button>
      </div>
    </div>

    <div class="example-content">
      <transition name="fade" mode="out-in">
        <div v-if="!showGood" key="bad" class="example bad-example">
          <div class="example-label bad-label">
            <span aria-hidden="true">❌</span> Mauvais exemple
          </div>
          <slot name="bad"></slot>
        </div>
        <div v-else key="good" class="example good-example">
          <div class="example-label good-label">
            <span aria-hidden="true">✅</span> Bon exemple
          </div>
          <slot name="good"></slot>
        </div>
      </transition>
    </div>

    <div v-if="explanation" class="example-explanation" role="note">
      <strong>Explication :</strong> {{ explanation }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  explanation: String
})

const showGood = ref(false)
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.toggle-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.toggle-buttons {
  display: flex;
  gap: 0.5rem;
}

.toggle-buttons button {
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 0.25rem;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.toggle-buttons button:hover {
  transform: translateY(-1px);
}

.toggle-buttons button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.toggle-buttons button.active {
  color: white;
}

.toggle-bad.active {
  background: var(--color-error);
  border-color: var(--color-error);
}

.toggle-good.active {
  background: var(--color-success);
  border-color: var(--color-success);
}

.example-content {
  padding: 1.5rem;
  min-height: 200px;
}

.example {
  position: relative;
}

.example-label {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 1;
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
  border-top: 2px solid var(--color-info);
  padding: 1rem;
  font-size: 0.95rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .toggle-buttons button {
    transition: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>