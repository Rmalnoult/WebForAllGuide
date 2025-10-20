<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descId"
      >
        <div
          ref="modalRef"
          class="modal"
          role="document"
        >
          <div class="modal-header">
            <h2 :id="titleId" class="modal-title">{{ title }}</h2>
            <button
              @click="close"
              class="modal-close"
              aria-label="Fermer la boîte de dialogue"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div :id="descId" class="modal-content">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useFocusTrap } from '../../composables/useA11y'

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const modalRef = ref(null)
const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`
const descId = `modal-desc-${Math.random().toString(36).substr(2, 9)}`

const { activate, deactivate } = useFocusTrap(modalRef)

const close = () => {
  emit('update:modelValue', false)
}

// Handle keyboard shortcuts
const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    activate()
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
  } else {
    deactivate()
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

onMounted(() => {
  return () => {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.modal {
  background: var(--color-bg, #fff);
  color: var(--color-text, #000);
  border-radius: 0.625rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 2px solid var(--color-border, #e0e0e0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text, #000);
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  color: var(--color-text, #000);
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.modal-close:hover {
  background: var(--color-hover, rgba(0, 0, 0, 0.1));
}

.modal-close:focus-visible {
  outline: 3px solid var(--color-focus, #4C6EF5);
  outline-offset: 2px;
}

.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 2px solid var(--color-border, #e0e0e0);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal,
  .modal-leave-active .modal {
    transition: none;
  }
}

@media (max-width: 768px) {
  .modal {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-overlay {
    padding: 0;
  }
}
</style>
