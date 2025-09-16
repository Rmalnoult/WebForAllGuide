<template>
  <div class="color-contrast">
    <header>
      <h1>Contrastes & Couleurs</h1>
      <p class="lead">
        Assurer une lisibilité optimale pour tous les utilisateurs
      </p>
    </header>

    <ExampleToggle
      title="Contraste de texte"
      explanation="Le ratio de contraste WCAG AA exige au minimum 4.5:1 pour le texte normal et 3:1 pour le texte large (18pt+ ou 14pt+ gras). Le niveau AAA est plus strict avec 7:1 et 4.5:1."
    >
      <template #bad>
        <div class="contrast-demo">
          <div class="text-samples-bad">
            <div class="sample sample-1">
              <p class="light-gray-text">Texte gris clair sur blanc (2.2:1) - Échec AA</p>
              <small class="ratio">Ratio: 2.2:1</small>
            </div>

            <div class="sample sample-2">
              <p class="medium-gray-text">Texte gris moyen sur blanc (3.8:1) - Échec AA</p>
              <small class="ratio">Ratio: 3.8:1</small>
            </div>

            <div class="sample sample-3">
              <p class="yellow-text">Texte jaune sur blanc (1.9:1) - Échec AA</p>
              <small class="ratio">Ratio: 1.9:1</small>
            </div>

            <div class="sample sample-4">
              <p class="orange-text">Orange sur rouge (1.2:1) - Échec AA</p>
              <small class="ratio">Ratio: 1.2:1</small>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="contrast-demo">
          <div class="text-samples-good">
            <div class="sample sample-1">
              <p class="dark-gray-text">Texte gris foncé sur blanc (7.0:1) - Réussite AAA</p>
              <small class="ratio">Ratio: 7.0:1</small>
            </div>

            <div class="sample sample-2">
              <p class="black-text">Texte noir sur blanc (21:1) - Réussite AAA</p>
              <small class="ratio">Ratio: 21:1</small>
            </div>

            <div class="sample sample-3">
              <p class="blue-text">Texte bleu foncé sur blanc (5.9:1) - Réussite AA</p>
              <small class="ratio">Ratio: 5.9:1</small>
            </div>

            <div class="sample sample-4">
              <p class="white-on-dark">Blanc sur bleu foncé (8.6:1) - Réussite AAA</p>
              <small class="ratio">Ratio: 8.6:1</small>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Information par la couleur"
      explanation="L'information ne doit jamais reposer uniquement sur la couleur. Il faut toujours ajouter des indicateurs visuels supplémentaires (icônes, motifs, texte)."
    >
      <template #bad>
        <div class="color-info-demo">
          <div class="form-example-bad">
            <h4>Formulaire d'inscription</h4>
            <div class="form-group">
              <label>Nom complet</label>
              <input type="text" class="input-error" value="Jo">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="input-valid" value="john@example.com">
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input type="password" class="input-error" value="123">
            </div>
            <p class="color-legend">🔴 Rouge = Erreur, 🟢 Vert = Valide</p>
          </div>

          <div class="status-example-bad">
            <h4>Statut des commandes</h4>
            <div class="order-list">
              <div class="order-item">
                <span class="order-number">#1234</span>
                <span class="status-red">En attente</span>
              </div>
              <div class="order-item">
                <span class="order-number">#1235</span>
                <span class="status-yellow">En cours</span>
              </div>
              <div class="order-item">
                <span class="order-number">#1236</span>
                <span class="status-green">Livrée</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="color-info-demo">
          <div class="form-example-good">
            <h4>Formulaire d'inscription</h4>
            <div class="form-group">
              <label>Nom complet</label>
              <input type="text" class="input-error" value="Jo" aria-describedby="name-error">
              <div id="name-error" class="error-message">
                ❌ Le nom doit contenir au moins 3 caractères
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="input-valid" value="john@example.com" aria-describedby="email-success">
              <div id="email-success" class="success-message">
                ✅ Email valide
              </div>
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input type="password" class="input-error" value="123" aria-describedby="password-error">
              <div id="password-error" class="error-message">
                ❌ Le mot de passe doit contenir au moins 8 caractères
              </div>
            </div>
          </div>

          <div class="status-example-good">
            <h4>Statut des commandes</h4>
            <div class="order-list">
              <div class="order-item">
                <span class="order-number">#1234</span>
                <span class="status-pending">
                  <span class="status-icon" aria-hidden="true">⏳</span>
                  En attente
                </span>
              </div>
              <div class="order-item">
                <span class="order-number">#1235</span>
                <span class="status-processing">
                  <span class="status-icon" aria-hidden="true">🚚</span>
                  En cours
                </span>
              </div>
              <div class="order-item">
                <span class="order-number">#1236</span>
                <span class="status-delivered">
                  <span class="status-icon" aria-hidden="true">✅</span>
                  Livrée
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Daltonisme et accessibilité"
      explanation="Environ 8% des hommes et 0.5% des femmes sont daltoniens. Les combinaisons rouge-vert sont particulièrement problématiques."
    >
      <template #bad>
        <div class="colorblind-demo">
          <h4>Graphique de performance</h4>
          <div class="chart-bad">
            <div class="legend-bad">
              <span class="legend-item">
                <span class="legend-color red"></span> Échecs
              </span>
              <span class="legend-item">
                <span class="legend-color green"></span> Succès
              </span>
            </div>
            <div class="chart-bars">
              <div class="bar-group">
                <div class="bar red-bar" style="height: 60px;"></div>
                <div class="bar green-bar" style="height: 40px;"></div>
                <span class="bar-label">Janvier</span>
              </div>
              <div class="bar-group">
                <div class="bar red-bar" style="height: 30px;"></div>
                <div class="bar green-bar" style="height: 70px;"></div>
                <span class="bar-label">Février</span>
              </div>
              <div class="bar-group">
                <div class="bar red-bar" style="height: 20px;"></div>
                <div class="bar green-bar" style="height: 80px;"></div>
                <span class="bar-label">Mars</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="colorblind-demo">
          <h4>Graphique de performance</h4>
          <div class="chart-good">
            <div class="legend-good">
              <span class="legend-item">
                <span class="legend-color error-color"></span>
                <span class="legend-icon" aria-hidden="true">❌</span>
                Échecs
              </span>
              <span class="legend-item">
                <span class="legend-color success-color"></span>
                <span class="legend-icon" aria-hidden="true">✅</span>
                Succès
              </span>
            </div>
            <div class="chart-bars">
              <div class="bar-group">
                <div class="bar error-bar striped" style="height: 60px;" title="Échecs: 60"></div>
                <div class="bar success-bar dotted" style="height: 40px;" title="Succès: 40"></div>
                <span class="bar-label">Janvier</span>
              </div>
              <div class="bar-group">
                <div class="bar error-bar striped" style="height: 30px;" title="Échecs: 30"></div>
                <div class="bar success-bar dotted" style="height: 70px;" title="Succès: 70"></div>
                <span class="bar-label">Février</span>
              </div>
              <div class="bar-group">
                <div class="bar error-bar striped" style="height: 20px;" title="Échecs: 20"></div>
                <div class="bar success-bar dotted" style="height: 80px;" title="Succès: 80"></div>
                <span class="bar-label">Mars</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Commutateur de thème accessible"
      explanation="Un commutateur de thème doit maintenir les ratios de contraste, préserver la lisibilité, et respecter les préférences système de l'utilisateur."
    >
      <template #bad>
        <div class="theme-demo">
          <div class="theme-switcher-bad">
            <div class="theme-controls-bad">
              <div @click="badTheme = 'light'" :class="{ active: badTheme === 'light' }" class="theme-option">☀️</div>
              <div @click="badTheme = 'dark'" :class="{ active: badTheme === 'dark' }" class="theme-option">🌙</div>
            </div>

            <div :class="`demo-content-bad theme-${badTheme}`">
              <h5>Contenu de la page</h5>
              <p>Ce texte change de couleur selon le thème.</p>
              <button class="demo-button-bad">Action</button>
              <div class="demo-card-bad">
                <h6>Carte d'information</h6>
                <p>Information importante à lire.</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #good>
        <div class="theme-demo">
          <div class="theme-switcher-good">
            <fieldset class="theme-controls-good">
              <legend>Choisir le thème</legend>
              <label>
                <input
                  type="radio"
                  name="good-theme"
                  value="light"
                  v-model="goodTheme"
                  aria-describedby="light-theme-desc"
                >
                <span class="theme-label">
                  <span aria-hidden="true">☀️</span>
                  Clair
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="good-theme"
                  value="dark"
                  v-model="goodTheme"
                  aria-describedby="dark-theme-desc"
                >
                <span class="theme-label">
                  <span aria-hidden="true">🌙</span>
                  Sombre
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="good-theme"
                  value="auto"
                  v-model="goodTheme"
                  aria-describedby="auto-theme-desc"
                >
                <span class="theme-label">
                  <span aria-hidden="true">💻</span>
                  Auto
                </span>
              </label>
            </fieldset>

            <div :class="`demo-content-good theme-${goodTheme}`">
              <h5>Contenu de la page</h5>
              <p>Ce texte maintient un bon contraste dans tous les thèmes.</p>
              <button class="demo-button-good">Action</button>
              <div class="demo-card-good">
                <h6>Carte d'information</h6>
                <p>Information importante toujours lisible.</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'

const badTheme = ref('light')
const goodTheme = ref('light')
</script>

<style scoped>
.color-contrast {
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

/* Contrast demo styles */
.contrast-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.text-samples-bad, .text-samples-good {
  display: grid;
  gap: 1rem;
}

.sample {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.sample p {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.ratio {
  font-size: 0.85rem;
  color: #666;
  font-weight: normal;
}

/* Bad contrast examples */
.light-gray-text { color: #bbb; }
.medium-gray-text { color: #999; }
.yellow-text { color: #ffff00; }
.orange-text {
  color: #ff8c00;
  background: #ff4444;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

/* Good contrast examples */
.dark-gray-text { color: #333; }
.black-text { color: #000; }
.blue-text { color: #1a365d; }
.white-on-dark {
  color: white;
  background: #1a365d;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

/* Color information demo */
.color-info-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  display: grid;
  gap: 2rem;
}

.form-example-bad, .form-example-good {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.input-error {
  border: 2px solid #e53e3e;
}

.input-valid {
  border: 2px solid #38a169;
}

.error-message {
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.9rem;
}

.success-message {
  margin-top: 0.5rem;
  color: #38a169;
  font-size: 0.9rem;
}

.color-legend {
  margin-top: 1rem;
  font-size: 0.9rem;
  font-style: italic;
}

.status-example-bad, .status-example-good {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
}

.order-number {
  font-weight: 600;
}

.status-red { color: #e53e3e; font-weight: 500; }
.status-yellow { color: #d69e2e; font-weight: 500; }
.status-green { color: #38a169; font-weight: 500; }

.status-pending { color: #d69e2e; font-weight: 500; }
.status-processing { color: #3182ce; font-weight: 500; }
.status-delivered { color: #38a169; font-weight: 500; }

.status-icon {
  margin-right: 0.5rem;
}

/* Colorblind demo */
.colorblind-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.chart-bad, .chart-good {
  margin-top: 1rem;
}

.legend-bad, .legend-good {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.red { background: #e53e3e; }
.green { background: #38a169; }
.error-color { background: #e53e3e; }
.success-color { background: #3182ce; }

.legend-icon {
  font-size: 0.9rem;
}

.chart-bars {
  display: flex;
  gap: 1rem;
  align-items: end;
  height: 120px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.bar {
  width: 30px;
  border-radius: 2px 2px 0 0;
}

.red-bar { background: #e53e3e; }
.green-bar { background: #38a169; }

.error-bar {
  background: #e53e3e;
}

.success-bar {
  background: #3182ce;
}

.striped {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.3) 2px,
    rgba(255,255,255,0.3) 4px
  );
}

.dotted {
  background-image: radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px);
  background-size: 4px 4px;
}

.bar-label {
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* Theme demo */
.theme-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.theme-switcher-bad, .theme-switcher-good {
  display: grid;
  gap: 1.5rem;
}

.theme-controls-bad {
  display: flex;
  gap: 0.5rem;
}

.theme-option {
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  background: var(--color-bg-secondary);
  border: 2px solid transparent;
}

.theme-option.active {
  border-color: var(--color-primary);
}

.theme-controls-good {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.theme-controls-good legend {
  font-weight: 600;
  padding: 0 0.5rem;
}

.theme-controls-good label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.theme-controls-good label:hover {
  background: var(--color-bg-secondary);
}

.theme-controls-good input {
  margin-right: 0.5rem;
}

.theme-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.demo-content-bad, .demo-content-good {
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  transition: all 0.3s;
}

/* Bad theme styles */
.demo-content-bad.theme-light {
  background: #f0f0f0;
  color: #ccc;
}

.demo-content-bad.theme-dark {
  background: #222;
  color: #555;
}

.demo-button-bad {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  margin: 0.5rem 0;
}

.theme-light .demo-button-bad {
  background: #ddd;
  color: #bbb;
}

.theme-dark .demo-button-bad {
  background: #333;
  color: #666;
}

.demo-card-bad {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
}

.theme-light .demo-card-bad {
  background: #e0e0e0;
  color: #aaa;
}

.theme-dark .demo-card-bad {
  background: #1a1a1a;
  color: #444;
}

/* Good theme styles */
.demo-content-good.theme-light {
  background: var(--color-bg);
  color: var(--color-text);
}

.demo-content-good.theme-dark {
  background: #1a202c;
  color: #f7fafc;
}

.demo-content-good.theme-auto {
  background: var(--color-bg);
  color: var(--color-text);
}

@media (prefers-color-scheme: dark) {
  .demo-content-good.theme-auto {
    background: #1a202c;
    color: #f7fafc;
  }
}

.demo-button-good {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  margin: 0.5rem 0;
  cursor: pointer;
  font-weight: 500;
}

.theme-light .demo-button-good {
  background: #3182ce;
  color: white;
}

.theme-dark .demo-button-good {
  background: #63b3ed;
  color: #1a202c;
}

.theme-auto .demo-button-good {
  background: #3182ce;
  color: white;
}

@media (prefers-color-scheme: dark) {
  .theme-auto .demo-button-good {
    background: #63b3ed;
    color: #1a202c;
  }
}

.demo-card-good {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid;
}

.theme-light .demo-card-good {
  background: #f7fafc;
  border-color: #e2e8f0;
  color: #2d3748;
}

.theme-dark .demo-card-good {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

.theme-auto .demo-card-good {
  background: #f7fafc;
  border-color: #e2e8f0;
  color: #2d3748;
}

@media (prefers-color-scheme: dark) {
  .theme-auto .demo-card-good {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .demo-content-bad, .demo-content-good {
    transition: none;
  }

  .theme-controls-good label {
    transition: none;
  }
}
</style>