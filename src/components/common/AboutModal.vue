<template>
  <SimpleModal
    v-model="isOpen"
    title="À propos de ce site"
  >
    <div class="about-content">
      <!-- Section Cookies & Privacy -->
      <section class="about-section">
        <h3 class="section-title">🌱 Un site respectueux de votre vie privée</h3>
        <p>
          Aucune donnée personnelle n'est collectée ni partagée. Aucun cookie n'est utilisé. Aucune pub.
        </p>
          <p>
          Ce site utilise <strong>Plausible Analytics</strong>, un service d'analyse respectueux de la vie privée, pour mesurer le trafic.
        </p>
        <p>
          Oui, c'est possible de créer un site web sans transformer vos données en produit.
        </p>
      </section>

      <!-- Section Auteur -->
      <section class="about-section author-section">
        <h3 class="section-title">👨‍💻 À propos de l'auteur</h3>
        <p>
          Ce site a été créé par <strong>Romain Malnoult</strong>, Design System & Accessibility Developer.
        </p>
        <p>
          Passionné par l'accessibilité numérique et convaincu qu'un web inclusif
          est un meilleur web pour tous, je partage ici mes connaissances et
          bonnes pratiques pour rendre le web accessible.
        </p>

        <a
          href="https://www.linkedin.com/in/romainmalnoult/"
          target="_blank"
          rel="noopener noreferrer"
          class="linkedin-link"
          aria-label="Visiter le profil LinkedIn de Romain Malnoult (nouvelle fenêtre)"
        >
          <svg
            class="linkedin-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Retrouvez-moi sur LinkedIn
        </a>
      </section>


      <!-- Section Tech -->
      <section class="about-section tech-section">
        <h3 class="section-title">⚡ Technologies</h3>
        <p>
          Ce site est construit avec <strong>Vue.js 3</strong> et démontre l'implémentation
          concrète des normes <strong>WCAG 2.1</strong> (niveau AA) et des bonnes pratiques d'accessibilité.
        </p>
        <p class="tech-stack">
          <strong>Stack technique :</strong> Vue.js 3, Vue Router, Vite, Playwright (tests), axe-core (audit accessibilité)
        </p>
      </section>
    </div>
  </SimpleModal>
</template>

<script setup>
import { computed } from 'vue'
import SimpleModal from './SimpleModal.vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style scoped>
.about-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
}

.about-section {
  margin-bottom: 2rem;
}

.about-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--color-primary);
}

.about-content p {
  margin: 0 0 0.75rem 0;
}

.about-content strong {
  color: var(--color-primary);
  font-weight: 600;
}

/* Privacy badge */
.privacy-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.625rem;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Author section */
.author-section {
  background: rgba(var(--color-primary-rgb, 76, 110, 245), 0.05);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border-left: 4px solid var(--color-primary);
}

/* LinkedIn link */
.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #0077B5;
  color: white;
  text-decoration: none;
  border-radius: 0.625rem;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-top: 1rem;
}

.linkedin-link:hover {
  background: #006399;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
}

.linkedin-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.linkedin-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Features section */
.features-section {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}

.features-list li {
  padding: 0.5rem 0 0.5rem 1.75rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.features-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: 700;
  font-size: 1.1rem;
}

.features-list strong {
  color: var(--color-primary);
}

/* Tech section */
.tech-section {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  padding-top: 1.5rem;
  border-top: 2px solid var(--color-border);
}

.tech-stack {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  font-size: 0.9rem;
}

/* Animations */
@media (prefers-reduced-motion: reduce) {
  .linkedin-link {
    transition: none;
  }

  .linkedin-link:hover {
    transform: none;
  }
}
</style>
