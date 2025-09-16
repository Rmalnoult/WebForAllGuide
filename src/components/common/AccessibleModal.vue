<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="close">
        <div
          ref="modalRef"
          class="modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="descId"
          @keydown.esc="close"
        >
          <header class="modal-header">
            <h2 :id="titleId">{{ title }}</h2>
            <button
              @click="close"
              :aria-label="`Fermer ${title}`"
              class="modal-close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div :id="descId" class="modal-content">
            <slot></slot>
          </div>

          <footer class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
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

watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    activate()
    document.body.style.overflow = 'hidden'
  } else {
    deactivate()
    document.body.style.overflow = ''
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--color-bg);
  border-radius: 0.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
}

.modal-close:hover {
  background: var(--color-hover);
}

.modal-close:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.modal-content {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

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
</style>