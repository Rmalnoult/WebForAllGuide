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
              <input type="password" placeholder="Mot de passe" autocomplete="current-password">
            </div>
            <div class="form-group checkbox-group">
              <input type="checkbox">
              <span>Se souvenir de moi</span>
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
        <div class="code-block">
            <pre><code>&lt;!-- ❌ Mauvais : Labels manquants --&gt;
&lt;form&gt;
  &lt;h4&gt;Connexion&lt;/h4&gt;

  &lt;!-- Pas de label associé --&gt;
  &lt;input
    type="email"
    placeholder="Votre email"&gt;

  &lt;!-- Pas de label associé, pas d'autocomplete --&gt;
  &lt;input
    type="password"
    placeholder="Mot de passe"&gt;

  &lt;!-- Checkbox non associée --&gt;
  &lt;input type="checkbox"&gt;
  &lt;span&gt;Se souvenir de moi&lt;/span&gt;

  &lt;button type="submit"&gt;Se connecter&lt;/button&gt;
&lt;/form&gt;</code></pre>
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
                autocomplete="email"
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
                autocomplete="current-password"
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

        <div class="code-block">
            <pre><code>&lt;!-- ✅ Bon : Labels explicites et associés --&gt;
&lt;form&gt;
  &lt;h4&gt;Connexion&lt;/h4&gt;

  &lt;!-- Label associé via for/id --&gt;
  &lt;label for="email-good"&gt;Adresse email&lt;/label&gt;
  &lt;input
    type="email"
    id="email-good"
    placeholder="exemple@domaine.fr"
    required
    aria-describedby="email-help"
    autocomplete="email"&gt;
  &lt;div id="email-help"&gt;
    Nous ne partagerons jamais votre email
  &lt;/div&gt;

  &lt;!-- Label avec instructions --&gt;
  &lt;label for="password-good"&gt;Mot de passe&lt;/label&gt;
  &lt;input
    type="password"
    id="password-good"
    required
    aria-describedby="password-help"
    autocomplete="current-password"&gt;
  &lt;div id="password-help"&gt;
    Minimum 8 caractères avec majuscules et chiffres
  &lt;/div&gt;

  &lt;!-- Checkbox correctement associée --&gt;
  &lt;input type="checkbox" id="remember-good"&gt;
  &lt;label for="remember-good"&gt;Se souvenir de moi&lt;/label&gt;

  &lt;button type="submit"&gt;Se connecter&lt;/button&gt;
&lt;/form&gt;</code></pre>
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
              <input type="text" v-model="badForm.name" :class="{ 'error': badFormSubmitted && !badForm.name }">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="badForm.email" :class="{ 'error': badFormSubmitted && !isValidEmail(badForm.email) }">
            </div>
            <div class="form-group">
              <label>Âge</label>
              <input type="number" v-model="badForm.age" :class="{ 'error': badFormSubmitted && badForm.age < 16 }">
            </div>

            <div v-if="badFormSubmitted && badFormErrors.length" class="error-summary-bad">
              ❌ Veuillez corriger les erreurs
            </div>

            <button type="submit">S'inscrire</button>
          </form>
        </div>

        <div class="code-block">
            <pre><code>&lt;!-- ❌ Mauvais : Erreurs mal annoncées --&gt;
&lt;form @submit.prevent="submitBadForm"&gt;
  &lt;h4&gt;Inscription newsletter&lt;/h4&gt;

  &lt;!-- Pas d'association label-input --&gt;
  &lt;label&gt;Nom&lt;/label&gt;
  &lt;input
    type="text"
    v-model="badForm.name"
    :class="{ 'error': submitted &amp;&amp; !badForm.name }"&gt;

  &lt;!-- Erreur visuelle seulement --&gt;
  &lt;label&gt;Email&lt;/label&gt;
  &lt;input
    type="email"
    v-model="badForm.email"
    :class="{ 'error': submitted &amp;&amp; !isValidEmail(badForm.email) }"&gt;

  &lt;!-- Pas d'information sur l'erreur --&gt;
  &lt;label&gt;Âge&lt;/label&gt;
  &lt;input
    type="number"
    v-model="badForm.age"
    :class="{ 'error': submitted &amp;&amp; badForm.age &lt; 16 }"&gt;

  &lt;!-- Message d'erreur générique et inutile --&gt;
  &lt;div v-if="submitted &amp;&amp; badFormErrors.length"&gt;
    ❌ Veuillez corriger les erreurs
  &lt;/div&gt;

  &lt;button type="submit"&gt;S'inscrire&lt;/button&gt;
&lt;/form&gt;</code></pre>
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
                  <a :href="`#${error.field}-good-form`">{{ error?.message || 'Erreur de validation' }}</a>
                </li>
              </ul>
            </div>

            <div class="form-group">
              <label for="name-good-form">Nom complet *</label>
              <input
                type="text"
                id="name-good-form"
                v-model="goodForm.name"
                :class="{ 'error': goodFormSubmitted && !goodForm.name }"
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
                :class="{ 'error': goodFormSubmitted && !isValidEmail(goodForm.email) }"
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
                :class="{ 'error': goodFormSubmitted && goodForm.age < 16 }"
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

        <div class="code-block">
            <pre><code>&lt;!-- ✅ Bon : Erreurs clairement associées --&gt;
&lt;form @submit.prevent="submitGoodForm" novalidate&gt;
  &lt;h4&gt;Inscription newsletter&lt;/h4&gt;

  &lt;!-- Résumé des erreurs avec navigation --&gt;
  &lt;div
    v-if="submitted &amp;&amp; goodFormErrors.length"
    role="alert"
    aria-labelledby="error-summary-title"&gt;
    &lt;h5 id="error-summary-title"&gt;Erreurs à corriger :&lt;/h5&gt;
    &lt;ul&gt;
      &lt;li v-for="error in goodFormErrors" :key="error.field"&gt;
        &lt;a :href="`#${error.field}-good-form`"&gt;
          {{ error.message }}
        &lt;/a&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;

  &lt;!-- Champ avec erreur spécifique associée --&gt;
  &lt;label for="name-good-form"&gt;Nom complet *&lt;/label&gt;
  &lt;input
    type="text"
    id="name-good-form"
    v-model="goodForm.name"
    required
    aria-invalid="submitted &amp;&amp; !goodForm.name"
    aria-describedby="name-error"&gt;
  &lt;div
    v-if="submitted &amp;&amp; !goodForm.name"
    id="name-error"
    role="alert"&gt;
    ❌ Le nom est obligatoire
  &lt;/div&gt;

  &lt;button type="submit"&gt;S'inscrire&lt;/button&gt;
&lt;/form&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Groupes de champs avec aria-labelledby"
      explanation="Les groupes de champs liés doivent être associés à leurs titres via aria-labelledby pour créer des relations sémantiques claires, particulièrement pour les boutons radio et cases à cocher."
    >
      <template #bad>
        <div class="form-demo">
          <form class="form-fieldset-bad">
            <h4>Préférences</h4>

            <div class="messy-form">
              <div class="form-row">
                <input type="radio" name="contact-bad" id="email-contact-bad" value="email">
                <label for="email-contact-bad">Email</label>

                <input type="checkbox" id="newsletter-bad" value="newsletter">
                <label for="newsletter-bad">Newsletter</label>
              </div>

              <div class="form-row">
                <input type="radio" name="contact-bad" id="phone-contact-bad" value="phone">
                <label for="phone-contact-bad">Téléphone</label>

                <input type="text" placeholder="Nom" class="text-input">
              </div>

              <div class="form-row">
                <input type="checkbox" id="offers-bad" value="offers">
                <label for="offers-bad">Offres</label>

                <input type="radio" name="contact-bad" id="sms-contact-bad" value="sms">
                <label for="sms-contact-bad">SMS</label>
              </div>

              <div class="form-row">
                <input type="email" placeholder="Email" class="text-input">

                <input type="checkbox" id="updates-bad" value="updates">
                <label for="updates-bad">Updates</label>
              </div>

              <div class="form-row">
                <select class="select-input">
                  <option>Choisir...</option>
                  <option>Quotidien</option>
                  <option>Hebdomadaire</option>
                  <option>Mensuel</option>
                </select>
              </div>
            </div>

            <button type="submit">OK</button>
          </form>
        </div>

        <div class="code-block" data-no-highlight="true">
            <pre><code data-highlighted="true">&lt;!-- ❌ Mauvais : Structure désorganisée --&gt;
&lt;form&gt;
  &lt;h4&gt;Préférences&lt;/h4&gt;

  &lt;!-- Éléments mélangés sans logique --&gt;
  &lt;div&gt;
    &lt;input type="radio" name="contact-bad"
           id="email-contact-bad" value="email"&gt;
    &lt;label for="email-contact-bad"&gt;Email&lt;/label&gt;

    &lt;input type="checkbox" id="newsletter-bad"
           value="newsletter"&gt;
    &lt;label for="newsletter-bad"&gt;Newsletter&lt;/label&gt;
  &lt;/div&gt;

  &lt;div&gt;
    &lt;input type="radio" name="contact-bad"
           id="phone-contact-bad" value="phone"&gt;
    &lt;label for="phone-contact-bad"&gt;Téléphone&lt;/label&gt;

    &lt;!-- Champ texte sans contexte --&gt;
    &lt;input type="text" placeholder="Nom"&gt;
  &lt;/div&gt;

  &lt;div&gt;
    &lt;input type="checkbox" id="offers-bad" value="offers"&gt;
    &lt;label for="offers-bad"&gt;Offres&lt;/label&gt;

    &lt;input type="radio" name="contact-bad"
           id="sms-contact-bad" value="sms"&gt;
    &lt;label for="sms-contact-bad"&gt;SMS&lt;/label&gt;
  &lt;/div&gt;

  &lt;!-- Select sans contexte --&gt;
  &lt;select&gt;
    &lt;option&gt;Choisir...&lt;/option&gt;
    &lt;option&gt;Quotidien&lt;/option&gt;
    &lt;option&gt;Hebdomadaire&lt;/option&gt;
  &lt;/select&gt;

  &lt;button type="submit"&gt;OK&lt;/button&gt;
&lt;/form&gt;</code></pre>
        </div>
      </template>

      <template #good>
        <div class="form-demo">
          <form class="form-fieldset-good">
            <h4>Préférences de contact</h4>

            <div class="form-section" role="group" aria-labelledby="personal-info-title">
              <h5 id="personal-info-title">Informations personnelles</h5>
              <div class="form-field">
                <label for="name-good">Nom complet *</label>
                <input type="text" id="name-good" name="name" required aria-required="true" aria-describedby="name-desc">
                <span id="name-desc" class="field-description">Votre nom complet tel qu'il apparaîtra dans nos communications</span>
              </div>
              <div class="form-field">
                <label for="email-field-good">Adresse email *</label>
                <input type="email" id="email-field-good" name="email-field" required aria-required="true" aria-describedby="email-desc">
                <span id="email-desc" class="field-description">Nous utiliserons cet email pour toutes nos communications</span>
              </div>
            </div>

            <div class="form-section" role="radiogroup" aria-labelledby="contact-method-title" aria-required="true">
              <h5 id="contact-method-title">Méthode de contact préférée *</h5>
              <div class="radio-group">
                <input type="radio" name="contact-good" id="email-contact-good" value="email" required aria-describedby="contact-method-title">
                <label for="email-contact-good">Email</label>
              </div>
              <div class="radio-group">
                <input type="radio" name="contact-good" id="phone-contact-good" value="phone" required aria-describedby="contact-method-title">
                <label for="phone-contact-good">Téléphone</label>
              </div>
              <div class="radio-group">
                <input type="radio" name="contact-good" id="sms-contact-good" value="sms" required aria-describedby="contact-method-title">
                <label for="sms-contact-good">SMS</label>
              </div>
            </div>

            <div class="form-section" role="group" aria-labelledby="comm-types-title">
              <h5 id="comm-types-title">Types de communications</h5>
              <p id="comm-types-desc" class="section-description">Sélectionnez les types de communications que vous souhaitez recevoir</p>
              <div class="checkbox-group">
                <input type="checkbox" id="newsletter-good" value="newsletter" aria-describedby="comm-types-desc">
                <label for="newsletter-good">Newsletter</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="offers-good" value="offers" aria-describedby="comm-types-desc">
                <label for="offers-good">Offres spéciales</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="updates-good" value="updates" aria-describedby="comm-types-desc">
                <label for="updates-good">Mises à jour produit</label>
              </div>
            </div>

            <div class="form-section" role="group" aria-labelledby="frequency-title">
              <h5 id="frequency-title">Fréquence des communications</h5>
              <div class="form-field">
                <label for="frequency-good">Choisir la fréquence</label>
                <select id="frequency-good" name="frequency" aria-describedby="frequency-desc">
                  <option value="">Sélectionner...</option>
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                </select>
                <span id="frequency-desc" class="field-description">Définit la fréquence maximale de nos envois</span>
              </div>
            </div>

            <button type="submit">Sauvegarder les préférences</button>
          </form>
        </div>

        <div class="code-block" data-no-highlight="true">
            <pre><code data-highlighted="true">&lt;!-- ✅ Bon : Groupes logiques avec aria-labelledby --&gt;
&lt;form&gt;
  &lt;h4&gt;Préférences de contact&lt;/h4&gt;

  &lt;!-- Section informations personnelles --&gt;
  &lt;div role="group" aria-labelledby="personal-info-title"&gt;
    &lt;h5 id="personal-info-title"&gt;
      Informations personnelles
    &lt;/h5&gt;

    &lt;label for="name-good"&gt;Nom complet *&lt;/label&gt;
    &lt;input
      type="text"
      id="name-good"
      name="name"
      required
      aria-required="true"
      aria-describedby="name-desc"&gt;
    &lt;span id="name-desc"&gt;
      Votre nom tel qu'il apparaîtra dans nos communications
    &lt;/span&gt;
  &lt;/div&gt;

  &lt;!-- Groupe de boutons radio --&gt;
  &lt;div
    role="radiogroup"
    aria-labelledby="contact-method-title"
    aria-required="true"&gt;
    &lt;h5 id="contact-method-title"&gt;
      Méthode de contact préférée *
    &lt;/h5&gt;

    &lt;input
      type="radio"
      name="contact-good"
      id="email-contact-good"
      value="email"
      required&gt;
    &lt;label for="email-contact-good"&gt;Email&lt;/label&gt;

    &lt;input
      type="radio"
      name="contact-good"
      id="phone-contact-good"
      value="phone"
      required&gt;
    &lt;label for="phone-contact-good"&gt;Téléphone&lt;/label&gt;
  &lt;/div&gt;

  &lt;!-- Groupe de cases à cocher --&gt;
  &lt;div role="group" aria-labelledby="comm-types-title"&gt;
    &lt;h5 id="comm-types-title"&gt;Types de communications&lt;/h5&gt;
    &lt;p id="comm-types-desc"&gt;
      Sélectionnez les types de communications
      que vous souhaitez recevoir
    &lt;/p&gt;

    &lt;input
      type="checkbox"
      id="newsletter-good"
      value="newsletter"
      aria-describedby="comm-types-desc"&gt;
    &lt;label for="newsletter-good"&gt;Newsletter&lt;/label&gt;
  &lt;/div&gt;

  &lt;button type="submit"&gt;
    Sauvegarder les préférences
  &lt;/button&gt;
&lt;/form&gt;</code></pre>
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
                  :class="{ 'error': usernameBadError }"
                >
                <div v-if="usernameBadError" class="error-inline">{{ usernameBadError }}</div>
              </div>

              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  v-model="complexBadForm.email"
                  @input="validateEmailBad"
                  :class="{ 'error': emailBadError }"
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
                :class="{ 'error': passwordBadError }"
                autocomplete="new-password"
              >
              <div v-if="passwordBadError" class="error-inline">{{ passwordBadError }}</div>
            </div>

            <button type="submit">Créer le compte</button>
          </form>
        </div>

        <div class="code-block">
            <pre><code>&lt;!-- ❌ Mauvais : Validation intrusive --&gt;
&lt;form&gt;
  &lt;h4&gt;Créer un compte&lt;/h4&gt;

  &lt;!-- Validation immédiate sur chaque frappe --&gt;
  &lt;label&gt;Nom d'utilisateur&lt;/label&gt;
  &lt;input
    type="text"
    v-model="complexBadForm.username"
    @input="validateUsernameBad"
    :class="{ 'error': usernameBadError }"&gt;
  &lt;!-- Erreur qui apparaît/disparaît constamment --&gt;
  &lt;div v-if="usernameBadError"&gt;
    {{ usernameBadError }}
  &lt;/div&gt;

  &lt;!-- Pas d'association avec aria-describedby --&gt;
  &lt;label&gt;Email&lt;/label&gt;
  &lt;input
    type="email"
    v-model="complexBadForm.email"
    @input="validateEmailBad"
    :class="{ 'error': emailBadError }"&gt;
  &lt;div v-if="emailBadError"&gt;{{ emailBadError }}&lt;/div&gt;

  &lt;!-- Messages d'erreur trop courts et peu utiles --&gt;
  &lt;!-- Pas d'autocomplete pour aider les gestionnaires de mots de passe --&gt;
  &lt;label&gt;Mot de passe&lt;/label&gt;
  &lt;input
    type="password"
    v-model="complexBadForm.password"
    @input="validatePasswordBad"
    :class="{ 'error': passwordBadError }"&gt;
  &lt;div v-if="passwordBadError"&gt;{{ passwordBadError }}&lt;/div&gt;

  &lt;button type="submit"&gt;Créer le compte&lt;/button&gt;
&lt;/form&gt;</code></pre>
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
                  :class="{ 'error': usernameGoodError, 'success': usernameGoodValid }"
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
                  :class="{ 'error': emailGoodError, 'success': emailGoodValid }"
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
                :class="{ 'error': passwordGoodError }"
                aria-describedby="password-strength password-feedback"
                aria-invalid="!!passwordGoodError"
                required
                autocomplete="new-password"
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

        <div class="code-block">
            <pre><code>&lt;!-- ✅ Bon : Validation respectueuse avec feedback --&gt;
&lt;form&gt;
  &lt;h4&gt;Créer un compte&lt;/h4&gt;

  &lt;!-- Validation sur blur, pas sur input --&gt;
  &lt;label for="username-complex"&gt;Nom d'utilisateur *&lt;/label&gt;
  &lt;input
    type="text"
    id="username-complex"
    v-model="complexGoodForm.username"
    @blur="validateUsernameGood"
    :class="{ error: usernameGoodError,
              success: usernameGoodValid }"
    aria-describedby="username-requirements username-feedback"
    aria-invalid="!!usernameGoodError"
    required&gt;

  &lt;!-- Instructions claires --&gt;
  &lt;div id="username-requirements"&gt;
    &lt;h6&gt;Exigences :&lt;/h6&gt;
    &lt;ul&gt;
      &lt;li :class="{ valid: complexGoodForm.username.length &gt;= 3 }"&gt;
        Au moins 3 caractères
      &lt;/li&gt;
      &lt;li :class="{ valid: /^[a-zA-Z0-9_]+$/.test(username) }"&gt;
        Lettres, chiffres et underscore uniquement
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;

  &lt;!-- Feedback accessible --&gt;
  &lt;div
    v-if="usernameGoodError"
    id="username-feedback"
    role="alert"
    aria-live="polite"&gt;
    ❌ {{ usernameGoodError }}
  &lt;/div&gt;
  &lt;div
    v-else-if="usernameGoodValid"
    id="username-feedback"
    role="status"
    aria-live="polite"&gt;
    ✅ Nom d'utilisateur disponible
  &lt;/div&gt;

  &lt;!-- Indicateur de force du mot de passe --&gt;
  &lt;label for="password-complex"&gt;Mot de passe *&lt;/label&gt;
  &lt;input
    type="password"
    id="password-complex"
    v-model="complexGoodForm.password"
    @input="validatePasswordGood"
    aria-describedby="password-strength"
    autocomplete="new-password"
    required&gt;

  &lt;div id="password-strength"&gt;
    &lt;h6&gt;Force du mot de passe :&lt;/h6&gt;
    &lt;div class="strength-indicator"&gt;
      &lt;div
        class="strength-bar"
        :class="`strength-${passwordStrength}`"
        :style="{ width: `${passwordStrength * 25}%` }"&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;button type="submit" :disabled="!isFormValid"&gt;
    Créer le compte
  &lt;/button&gt;
&lt;/form&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()

// Add default error state to prevent undefined access
const error = ref({ message: '' })

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
  if (goodForm.value && !goodForm.value.name) {
    errors.push({ field: 'name', message: 'Le nom est obligatoire' })
  }
  if (goodForm.value && !isValidEmail(goodForm.value.email)) {
    errors.push({ field: 'email', message: 'L\'adresse email est invalide' })
  }
  if (goodForm.value && goodForm.value.age < 16) {
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
  max-width: 1600px;
  margin: 0 auto;
}

header {
  text-align: left;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
}

/* Form demo styles */
.form-demo {
  /* Remove card styles to avoid nested cards */
  color: var(--color-text);
}

/* Ensure all form inputs have white background */
.form-demo input[type="text"],
.form-demo input[type="email"],
.form-demo input[type="password"],
.form-demo input[type="number"],
.form-demo input[type="tel"],
.form-demo input[type="url"],
.form-demo input[type="search"],
.form-demo textarea,
.form-demo select {
  background: #ffffff;
  color: var(--color-text);
}

.form-bad, .form-good, .form-validation-bad, .form-validation-good,
.form-fieldset-bad, .form-fieldset-good, .complex-form-bad, .complex-form-good {
  max-width: 800px;
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
  border-radius: 0.625rem;
  font-size: 1rem;
  background: #ffffff;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-text);
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
  border-radius: 0.625rem;
  margin-bottom: 1rem;
}

.error-summary-good {
  background: var(--color-error-light);
  border: 2px solid var(--color-error);
  color: var(--color-error);
  padding: 1rem;
  border-radius: 0.625rem;
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
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  accent-color: var(--color-primary);
  flex-shrink: 0;
}

.checkbox-group input[type="checkbox"]:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.checkbox-group label {
  margin: 0;
  cursor: pointer;
  font-weight: 400;
  line-height: 1.4;
}

.radio-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.radio-group input[type="radio"] {
  width: 20px;
  height: 20px;
  margin: 0;
  margin-top: 0.1rem;
  cursor: pointer;
  accent-color: var(--color-primary);
  flex-shrink: 0;
}

.radio-group input[type="radio"]:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.radio-group label {
  margin: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  line-height: 1.4;
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
  border-radius: 0.625rem;
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
  border-radius: 0.625rem;
}

.form-section p {
  margin: 0 0 1rem 0;
  font-weight: 500;
}

/* Messy form styles for bad example */
.form-fieldset-bad {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.form-fieldset-bad h4 {
  color: var(--color-text);
  margin-bottom: 1rem;
}

.messy-form {
  padding: 1rem;
  background: var(--color-bg);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.messy-form .form-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.messy-form .form-row:last-child {
  border-bottom: none;
}

.messy-form input[type="radio"],
.messy-form input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.messy-form label {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  cursor: pointer;
  min-width: 80px;
}

.messy-form .text-input,
.messy-form .select-input {
  flex: 1;
  min-width: 150px;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  background: #ffffff;
  color: var(--color-text);
}

.messy-form .text-input::placeholder {
  color: var(--color-text-secondary);
}

.form-fieldset-bad button[type="submit"] {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
}

.form-fieldset-bad button[type="submit"]:hover {
  background: var(--color-primary-dark);
}

/* Good form with aria-labelledby styles */
.form-fieldset-good h4 {
  margin-bottom: 1.5rem;
}

.form-fieldset-good .form-section {
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  /* Subtle separator instead of bordered card */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.form-fieldset-good .form-section:last-child {
  border-bottom: none;
}

.form-fieldset-good h5 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.1rem;
}

.form-fieldset-good .section-description {
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.form-fieldset-good .field-description {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.form-fieldset-good .form-field {
  margin-bottom: 1rem;
}

.form-fieldset-good .form-field:last-child {
  margin-bottom: 0;
}

.form-fieldset-good .form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-fieldset-good .form-field input[type="text"],
.form-fieldset-good .form-field input[type="email"],
.form-fieldset-good .form-field select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  background: #ffffff;
  color: var(--color-text);
}

.form-fieldset-good .form-field select {
  cursor: pointer;
}

/* Complex form styles */
.field-requirements {
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
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
  border-radius: 0.625rem;
}

.password-strength h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
}

.strength-indicator {
  width: 100%;
  height: 8px;
  background: var(--color-border);
  border-radius: 0.625rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.strength-bar {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
  border-radius: 0.625rem;
}

.strength-bar.strength-1 { background: var(--color-error); }
.strength-bar.strength-2 { background: var(--color-warning); }
.strength-bar.strength-3 { background: var(--color-success); }
.strength-bar.strength-4 { background: var(--color-success); }

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
  border-radius: 0.625rem;
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

/* Examples section styles */
.examples-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.examples-section h5 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--color-text);
  font-weight: 600;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.example-container {
  background: var(--color-bg);
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.example-container h6 {
  margin: 0;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
}

.example-container.bad h6 {
  background: var(--color-error-light);
  color: var(--color-error);
  border-bottom-color: var(--color-error);
}

.example-container.good h6 {
  background: var(--color-success-light);
  color: var(--color-success);
  border-bottom-color: var(--color-success);
}

/* Code block styles - now properly nested */
.example-container .code-block {
  margin: 0;
  border: none;
  border-radius: 0;
  background: transparent;
}

.example-container .code-block pre {
  margin: 0;
  padding: 1rem;
  background: #1e1e1e;
  color: #e0e0e0;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
  border-radius: 0;
  border: 1px solid var(--color-border);
}

.example-container .code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  white-space: pre;
  color: #e0e0e0;
}

/* Responsive code blocks */
@media (max-width: 1024px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }

  .example-container .code-block pre {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .examples-section {
    padding: 1rem;
  }

  .example-container .code-block pre {
    padding: 0.75rem;
    font-size: 0.75rem;
  }
}

/* Code block styles for standalone use */
.form-demo + .code-block {
  margin-top: 1.5rem;
}

.form-demo + .code-block pre {
  margin: 0;
  padding: 1rem;
  background: #1e1e1e;
  color: #e0e0e0;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
  border-radius: 0.625rem;
  border: 1px solid var(--color-border);
}

.form-demo + .code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  white-space: pre;
  color: #e0e0e0;
}

@media (max-width: 768px) {
  .form-demo + .code-block pre {
    padding: 0.75rem;
    font-size: 0.75rem;
  }
}
</style>