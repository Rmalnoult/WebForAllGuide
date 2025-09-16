<template>
  <div class="accessible-forms">
    <header>
      <h1>Formulaires Accessibles</h1>
      <p class="lead">
        Créer des formulaires utilisables par tous avec une expérience claire et guidée
      </p>
    </header>

    <ExampleToggle
      title="Labels et associations"
      explanation="Chaque champ de formulaire doit avoir un label explicite et correctement associé. Les placeholders ne remplacent pas les labels."
    >
      <template #bad>
        <div class="form-demo">
          <form class="form-bad">
            <h4>Connexion</h4>
            <div class="form-group">
              <input type="email" placeholder="Votre email">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Mot de passe">
            </div>
            <div class="form-group">
              <input type="checkbox">
              <span>Se souvenir de moi</span>
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </template>

      <template #good>
        <div class="form-demo">
          <form class="form-good">
            <h4>Connexion</h4>
            <div class="form-group">
              <label for="email-good">Adresse email</label>
              <input
                type="email"
                id="email-good"
                placeholder="exemple@domaine.fr"
                required
                aria-describedby="email-help"
              >
              <div id="email-help" class="field-help">
                Nous ne partagerons jamais votre email
              </div>
            </div>
            <div class="form-group">
              <label for="password-good">Mot de passe</label>
              <input
                type="password"
                id="password-good"
                required
                aria-describedby="password-help"
              >
              <div id="password-help" class="field-help">
                Minimum 8 caractères avec majuscules et chiffres
              </div>
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox" id="remember-good">
              <label for="remember-good">Se souvenir de moi</label>
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Validation et messages d'erreur"
      explanation="Les erreurs doivent être clairement annoncées, associées aux champs concernés, et donner des instructions précises pour les corriger."
    >
      <template #bad>
        <div class="form-demo">
          <form class="form-validation-bad" @submit.prevent="submitBadForm">
            <h4>Inscription newsletter</h4>
            <div class="form-group">
              <label>Nom</label>
              <input type="text" v-model="badForm.name" :class="{ error: badFormSubmitted && !badForm.name }">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="badForm.email" :class="{ error: badFormSubmitted && !isValidEmail(badForm.email) }">
            </div>
            <div class="form-group">
              <label>Âge</label>
              <input type="number" v-model="badForm.age" :class="{ error: badFormSubmitted && badForm.age < 16 }">
            </div>

            <div v-if="badFormSubmitted && badFormErrors.length" class="error-summary-bad">
              ❌ Veuillez corriger les erreurs
            </div>

            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </template>

      <template #good>
        <div class="form-demo">
          <form class="form-validation-good" @submit.prevent="submitGoodForm" novalidate>
            <h4>Inscription newsletter</h4>

            <div v-if="goodFormSubmitted && goodFormErrors.length" class="error-summary-good" role="alert" aria-labelledby="error-summary-title">
              <h5 id="error-summary-title">Erreurs à corriger :</h5>
              <ul>
                <li v-for="error in goodFormErrors" :key="error.field">
                  <a :href="`#${error.field}-good-form`">{{ error.message }}</a>
                </li>
              </ul>
            </div>

            <div class="form-group">
              <label for="name-good-form">Nom complet *</label>
              <input
                type="text"
                id="name-good-form"
                v-model="goodForm.name"
                :class="{ error: goodFormSubmitted && !goodForm.name }"
                required
                aria-invalid="goodFormSubmitted && !goodForm.name"
                aria-describedby="name-error"
              >
              <div
                v-if="goodFormSubmitted && !goodForm.name"
                id="name-error"
                class="error-message"
                role="alert"
              >
                ❌ Le nom est obligatoire
              </div>
            </div>

            <div class="form-group">
              <label for="email-good-form">Adresse email *</label>
              <input
                type="email"
                id="email-good-form"
                v-model="goodForm.email"
                :class="{ error: goodFormSubmitted && !isValidEmail(goodForm.email) }"
                required
                aria-invalid="goodFormSubmitted && !isValidEmail(goodForm.email)"
                aria-describedby="email-good-error"
              >
              <div
                v-if="goodFormSubmitted && !isValidEmail(goodForm.email)"
                id="email-good-error"
                class="error-message"
                role="alert"
              >
                ❌ Veuillez saisir une adresse email valide (exemple@domaine.fr)
              </div>
            </div>

            <div class="form-group">
              <label for="age-good-form">Âge *</label>
              <input
                type="number"
                id="age-good-form"
                v-model="goodForm.age"
                min="16"
                max="120"
                :class="{ error: goodFormSubmitted && goodForm.age < 16 }"
                required
                aria-invalid="goodFormSubmitted && goodForm.age < 16"
                aria-describedby="age-help age-error"
              >
              <div id="age-help" class="field-help">
                Vous devez avoir au moins 16 ans
              </div>
              <div
                v-if="goodFormSubmitted && goodForm.age < 16"
                id="age-error"
                class="error-message"
                role="alert"
              >
                ❌ L'âge minimum requis est 16 ans
              </div>
            </div>

            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Fieldsets et groupes de champs"
      explanation="Les groupes de champs liés doivent être regroupés dans des fieldsets avec des légendes descriptives, particulièrement pour les boutons radio et cases à cocher."
    >
      <template #bad>
        <div class="form-demo">
          <form class="form-fieldset-bad">
            <h4>Préférences de contact</h4>

            <div class="form-section">
              <p>Comment souhaitez-vous être contacté ?</p>
              <div class="radio-group">
                <input type="radio" name="contact-bad" id="email-contact-bad" value="email">
                <label for="email-contact-bad">Email</label>
              </div>
              <div class="radio-group">
                <input type="radio" name="contact-bad" id="phone-contact-bad" value="phone">
                <label for="phone-contact-bad">Téléphone</label>
              </div>
              <div class="radio-group">
                <input type="radio" name="contact-bad" id="sms-contact-bad" value="sms">
                <label for="sms-contact-bad">SMS</label>
              </div>
            </div>

            <div class="form-section">
              <p>Quels types de communications souhaitez-vous recevoir ?</p>
              <div class="checkbox-group">
                <input type="checkbox" id="newsletter-bad" value="newsletter">
                <label for="newsletter-bad">Newsletter hebdomadaire</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="offers-bad" value="offers">
                <label for="offers-bad">Offres spéciales</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="updates-bad" value="updates">
                <label for="updates-bad">Mises à jour produit</label>
              </div>
            </div>

            <button type="submit">Sauvegarder</button>
          </form>
        </div>
      </template>

      <template #good>
        <div class="form-demo">
          <form class="form-fieldset-good">
            <h4>Préférences de contact</h4>

            <fieldset>
              <legend>Comment souhaitez-vous être contacté ? *</legend>
              <div class="radio-group">
                <input type="radio" name="contact-good" id="email-contact-good" value="email" required>
                <label for="email-contact-good">
                  <span class="radio-label">Email</span>
                  <span class="radio-description">Notifications par email</span>
                </label>
              </div>
              <div class="radio-group">
                <input type="radio" name="contact-good" id="phone-contact-good" value="phone" required>
                <label for="phone-contact-good">
                  <span class="radio-label">Téléphone</span>
                  <span class="radio-description">Appels directs</span>
                </label>
              </div>
              <div class="radio-group">
                <input type="radio" name="contact-good" id="sms-contact-good" value="sms" required>
                <label for="sms-contact-good">
                  <span class="radio-label">SMS</span>
                  <span class="radio-description">Messages texte</span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Types de communications (optionnel)</legend>
              <div class="checkbox-group">
                <input type="checkbox" id="newsletter-good" value="newsletter">
                <label for="newsletter-good">
                  <span class="checkbox-label">Newsletter hebdomadaire</span>
                  <span class="checkbox-description">Actualités et conseils chaque semaine</span>
                </label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="offers-good" value="offers">
                <label for="offers-good">
                  <span class="checkbox-label">Offres spéciales</span>
                  <span class="checkbox-description">Promotions et réductions exclusives</span>
                </label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="updates-good" value="updates">
                <label for="updates-good">
                  <span class="checkbox-label">Mises à jour produit</span>
                  <span class="checkbox-description">Nouvelles fonctionnalités et améliorations</span>
                </label>
              </div>
            </fieldset>

            <button type="submit">Sauvegarder les préférences</button>
          </form>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Formulaire complexe avec validation temps réel"
      explanation="Pour les formulaires complexes, la validation temps réel peut aider, mais elle doit être implémentée de manière non intrusive et accessible."
    >
      <template #bad>
        <div class="form-demo">
          <form class="complex-form-bad">
            <h4>Créer un compte</h4>

            <div class="form-row">
              <div class="form-group">
                <label>Nom d'utilisateur</label>
                <input
                  type="text"
                  v-model="complexBadForm.username"
                  @input="validateUsernameBad"
                  :class="{ error: usernameBadError }"
                >
                <div v-if="usernameBadError" class="error-inline">{{ usernameBadError }}</div>
              </div>

              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  v-model="complexBadForm.email"
                  @input="validateEmailBad"
                  :class="{ error: emailBadError }"
                >
                <div v-if="emailBadError" class="error-inline">{{ emailBadError }}</div>
              </div>
            </div>

            <div class="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                v-model="complexBadForm.password"
                @input="validatePasswordBad"
                :class="{ error: passwordBadError }"
              >
              <div v-if="passwordBadError" class="error-inline">{{ passwordBadError }}</div>
            </div>

            <button type="submit">Créer le compte</button>
          </form>
        </div>
      </template>

      <template #good>
        <div class="form-demo">
          <form class="complex-form-good">
            <h4>Créer un compte</h4>

            <div class="form-row">
              <div class="form-group">
                <label for="username-complex">Nom d'utilisateur *</label>
                <input
                  type="text"
                  id="username-complex"
                  v-model="complexGoodForm.username"
                  @blur="validateUsernameGood"
                  :class="{ error: usernameGoodError, success: usernameGoodValid }"
                  aria-describedby="username-requirements username-feedback"
                  aria-invalid="!!usernameGoodError"
                  required
                >
                <div id="username-requirements" class="field-requirements">
                  <h6>Exigences :</h6>
                  <ul>
                    <li :class="{ valid: complexGoodForm.username.length >= 3 }">
                      Au moins 3 caractères
                    </li>
                    <li :class="{ valid: /^[a-zA-Z0-9_]+$/.test(complexGoodForm.username) }">
                      Lettres, chiffres et underscore uniquement
                    </li>
                  </ul>
                </div>
                <div
                  v-if="usernameGoodError"
                  id="username-feedback"
                  class="error-message"
                  role="alert"
                  aria-live="polite"
                >
                  ❌ {{ usernameGoodError }}
                </div>
                <div
                  v-else-if="usernameGoodValid"
                  id="username-feedback"
                  class="success-message"
                  role="status"
                  aria-live="polite"
                >
                  ✅ Nom d'utilisateur disponible
                </div>
              </div>

              <div class="form-group">
                <label for="email-complex">Adresse email *</label>
                <input
                  type="email"
                  id="email-complex"
                  v-model="complexGoodForm.email"
                  @blur="validateEmailGood"
                  :class="{ error: emailGoodError, success: emailGoodValid }"
                  aria-describedby="email-complex-feedback"
                  aria-invalid="!!emailGoodError"
                  required
                >
                <div
                  v-if="emailGoodError"
                  id="email-complex-feedback"
                  class="error-message"
                  role="alert"
                  aria-live="polite"
                >
                  ❌ {{ emailGoodError }}
                </div>
                <div
                  v-else-if="emailGoodValid"
                  id="email-complex-feedback"
                  class="success-message"
                  role="status"
                  aria-live="polite"
                >
                  ✅ Email valide
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="password-complex">Mot de passe *</label>
              <input
                type="password"
                id="password-complex"
                v-model="complexGoodForm.password"
                @input="validatePasswordGood"
                :class="{ error: passwordGoodError }"
                aria-describedby="password-strength password-feedback"
                aria-invalid="!!passwordGoodError"
                required
              >
              <div id="password-strength" class="password-strength">
                <h6>Force du mot de passe :</h6>
                <div class="strength-indicator">
                  <div
                    class="strength-bar"
                    :class="`strength-${passwordStrength}`"
                    :style="{ width: `${passwordStrength * 25}%` }"
                  ></div>
                </div>
                <div class="strength-requirements">
                  <div :class="{ valid: complexGoodForm.password.length >= 8 }">
                    8+ caractères
                  </div>
                  <div :class="{ valid: /[A-Z]/.test(complexGoodForm.password) }">
                    Majuscule
                  </div>
                  <div :class="{ valid: /[0-9]/.test(complexGoodForm.password) }">
                    Chiffre
                  </div>
                  <div :class="{ valid: /[^A-Za-z0-9]/.test(complexGoodForm.password) }">
                    Caractère spécial
                  </div>
                </div>
              </div>
              <div
                v-if="passwordGoodError"
                id="password-feedback"
                class="error-message"
                role="alert"
                aria-live="polite"
              >
                ❌ {{ passwordGoodError }}
              </div>
            </div>

            <button type="submit" :disabled="!isFormValid">
              Créer le compte
            </button>
          </form>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'

// Simple form validation
const badForm = ref({ name: '', email: '', age: 0 })
const goodForm = ref({ name: '', email: '', age: 0 })
const badFormSubmitted = ref(false)
const goodFormSubmitted = ref(false)

// Complex form validation
const complexBadForm = ref({ username: '', email: '', password: '' })
const complexGoodForm = ref({ username: '', email: '', password: '' })

const usernameBadError = ref('')
const emailBadError = ref('')
const passwordBadError = ref('')

const usernameGoodError = ref('')
const usernameGoodValid = ref(false)
const emailGoodError = ref('')
const emailGoodValid = ref(false)
const passwordGoodError = ref('')

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const badFormErrors = computed(() => {
  const errors = []
  if (!badForm.value.name) errors.push('Nom requis')
  if (!isValidEmail(badForm.value.email)) errors.push('Email invalide')
  if (badForm.value.age < 16) errors.push('Âge minimum 16 ans')
  return errors
})

const goodFormErrors = computed(() => {
  const errors = []
  if (!goodForm.value.name) {
    errors.push({ field: 'name', message: 'Le nom est obligatoire' })
  }
  if (!isValidEmail(goodForm.value.email)) {
    errors.push({ field: 'email', message: 'L\'adresse email est invalide' })
  }
  if (goodForm.value.age < 16) {
    errors.push({ field: 'age', message: 'L\'âge minimum requis est 16 ans' })
  }
  return errors
})

function submitBadForm() {
  badFormSubmitted.value = true
}

function submitGoodForm() {
  goodFormSubmitted.value = true
  if (goodFormErrors.value.length === 0) {
    alert('Formulaire soumis avec succès !')
  }
}

// Complex form validation functions
function validateUsernameBad() {
  if (complexBadForm.value.username.length < 3) {
    usernameBadError.value = 'Trop court'
  } else if (!/^[a-zA-Z0-9_]+$/.test(complexBadForm.value.username)) {
    usernameBadError.value = 'Caractères invalides'
  } else {
    usernameBadError.value = ''
  }
}

function validateEmailBad() {
  if (!isValidEmail(complexBadForm.value.email)) {
    emailBadError.value = 'Email invalide'
  } else {
    emailBadError.value = ''
  }
}

function validatePasswordBad() {
  if (complexBadForm.value.password.length < 8) {
    passwordBadError.value = 'Trop court'
  } else {
    passwordBadError.value = ''
  }
}

function validateUsernameGood() {
  usernameGoodError.value = ''
  usernameGoodValid.value = false

  if (complexGoodForm.value.username.length < 3) {
    usernameGoodError.value = 'Le nom d\'utilisateur doit contenir au moins 3 caractères'
  } else if (!/^[a-zA-Z0-9_]+$/.test(complexGoodForm.value.username)) {
    usernameGoodError.value = 'Seuls les lettres, chiffres et underscore sont autorisés'
  } else {
    usernameGoodValid.value = true
  }
}

function validateEmailGood() {
  emailGoodError.value = ''
  emailGoodValid.value = false

  if (!isValidEmail(complexGoodForm.value.email)) {
    emailGoodError.value = 'Veuillez saisir une adresse email valide'
  } else {
    emailGoodValid.value = true
  }
}

function validatePasswordGood() {
  passwordGoodError.value = ''

  if (complexGoodForm.value.password.length < 8) {
    passwordGoodError.value = 'Le mot de passe doit contenir au moins 8 caractères'
  }
}

const passwordStrength = computed(() => {
  const password = complexGoodForm.value.password
  let strength = 0

  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  return strength
})

const isFormValid = computed(() => {
  return usernameGoodValid.value &&
         emailGoodValid.value &&
         passwordStrength.value >= 3
})
</script>

<style scoped>
.accessible-forms {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
}

/* Form demo styles */
.form-demo {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.form-bad, .form-good, .form-validation-bad, .form-validation-good,
.form-fieldset-bad, .form-fieldset-good, .complex-form-bad, .complex-form-good {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group input.error {
  border-color: var(--color-error);
}

.form-group input.success {
  border-color: var(--color-success);
}

.field-help {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.error-message {
  margin-top: 0.5rem;
  color: var(--color-error);
  font-size: 0.9rem;
}

.success-message {
  margin-top: 0.5rem;
  color: var(--color-success);
  font-size: 0.9rem;
}

.error-inline {
  color: var(--color-error);
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.error-summary-bad {
  background: var(--color-error-light);
  border: 1px solid var(--color-error);
  color: var(--color-error);
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.error-summary-good {
  background: var(--color-error-light);
  border: 2px solid var(--color-error);
  color: var(--color-error);
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
}

.error-summary-good h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.error-summary-good ul {
  margin: 0;
  padding-left: 1.5rem;
}

.error-summary-good a {
  color: var(--color-error);
  text-decoration: underline;
}

/* Checkbox and radio styles */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.checkbox-group input {
  width: auto;
  margin: 0;
}

.checkbox-group label {
  margin: 0;
  cursor: pointer;
}

.radio-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.radio-group input {
  width: auto;
  margin: 0;
}

.radio-group label {
  margin: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.radio-label, .checkbox-label {
  font-weight: 500;
}

.radio-description, .checkbox-description {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

/* Fieldset styles */
fieldset {
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

fieldset legend {
  font-weight: 600;
  color: var(--color-text);
  padding: 0 0.5rem;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
}

.form-section p {
  margin: 0 0 1rem 0;
  font-weight: 500;
}

/* Complex form styles */
.field-requirements {
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

.field-requirements h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.field-requirements ul {
  margin: 0;
  padding-left: 1.5rem;
}

.field-requirements li {
  margin-bottom: 0.25rem;
  color: var(--color-text-secondary);
}

.field-requirements li.valid {
  color: var(--color-success);
}

.password-strength {
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
}

.password-strength h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
}

.strength-indicator {
  width: 100%;
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.strength-bar {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
  border-radius: 4px;
}

.strength-bar.strength-1 { background: #e53e3e; }
.strength-bar.strength-2 { background: #d69e2e; }
.strength-bar.strength-3 { background: #38a169; }
.strength-bar.strength-4 { background: #2d5a28; }

.strength-requirements {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.strength-requirements div {
  color: var(--color-text-secondary);
}

.strength-requirements div.valid {
  color: var(--color-success);
}

/* Button styles */
button[type="submit"] {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

button[type="submit"]:disabled {
  background: var(--color-border);
  cursor: not-allowed;
}

button[type="submit"]:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .strength-requirements {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-group input {
    transition: none;
  }

  .strength-bar {
    transition: none;
  }

  button[type="submit"] {
    transition: none;
  }
}
</style>