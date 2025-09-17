<template>
  <div class="aria-components">
    <header>
      <c-text tag="h1">ARIA</c-text>
      <c-text tag="p" class="lead">
        Créer des interfaces interactives accessibles avec les bonnes attributions ARIA
      </c-text>
    </header>

    <section class="aria-intro">
      <c-text tag="h2" class="section-title">Qu'est-ce que ARIA ?</c-text>
      <c-text tag="p">
        <strong>ARIA (Accessible Rich Internet Applications)</strong> est une spécification du W3C qui permet d'améliorer
        l'accessibilité des applications web dynamiques. ARIA fournit des attributs supplémentaires pour décrire
        le rôle, l'état et les propriétés des éléments aux technologies d'assistance.
      </c-text>

      <div class="aria-principles">
        <div class="principle-card">
          <c-text tag="h3">🏷️ Rôles</c-text>
          <c-text tag="p">Définissent ce qu'est un élément (button, navigation, alert...)</c-text>
          <code class="aria-example"><span class="attr">role</span>=<span class="value">"button"</span></code>
        </div>
        <div class="principle-card">
          <c-text tag="h3">📊 États</c-text>
          <c-text tag="p">Décrivent l'état actuel d'un élément (checked, expanded, disabled...)</c-text>
          <code class="aria-example"><span class="attr">aria-expanded</span>=<span class="value">"true"</span></code>
        </div>
        <div class="principle-card">
          <c-text tag="h3">🔧 Propriétés</c-text>
          <c-text tag="p">Fournissent des informations supplémentaires (label, describedby, controls...)</c-text>
          <code class="aria-example"><span class="attr">aria-label</span>=<span class="value">"Menu principal"</span></code>
        </div>
      </div>

      <div class="aria-golden-rules">
        <c-text tag="h3">⚠️ Les 5 règles d'or d'ARIA</c-text>
        <ol>
          <li><strong class="rule-number">Première règle :</strong> Ne pas utiliser ARIA si vous pouvez utiliser HTML natif</li>
          <li><strong class="rule-number">Deuxième règle :</strong> Ne pas changer la sémantique native sauf si nécessaire</li>
          <li><strong class="rule-number">Troisième règle :</strong> Tous les éléments ARIA doivent être utilisables au clavier</li>
          <li><strong class="rule-number">Quatrième règle :</strong> Ne pas cacher d'éléments focusables avec aria-hidden</li>
          <li><strong class="rule-number">Cinquième règle :</strong> Tous les éléments interactifs doivent avoir un nom accessible</li>
        </ol>
      </div>
    </section>

    <ExampleToggle
      title="Accordéon accessible"
      explanation="Un accordéon doit utiliser les attributs ARIA appropriés, supporter la navigation clavier et annoncer les changements d'état."
    >
      <template #bad>
        <div class="accordion-demo">
          <h4>Sans attributs ARIA</h4>
          <div class="accordion-bad">
            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(0)">
                <c-text>Qu'est-ce que l'accessibilité web ?</c-text>
                <c-text class="accordion-icon">{{ badAccordionOpen[0] ? '−' : '+' }}</c-text>
              </div>
              <div v-if="badAccordionOpen[0]" class="accordion-content">
                <c-text>L'accessibilité web consiste à rendre les sites et applications utilisables par tous, y compris les personnes en situation de handicap.</c-text>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(1)">
                <c-text>Pourquoi est-ce important ?</c-text>
                <c-text class="accordion-icon">{{ badAccordionOpen[1] ? '−' : '+' }}</c-text>
              </div>
              <div v-if="badAccordionOpen[1]" class="accordion-content">
                <c-text>15% de la population mondiale vit avec un handicap. L'accessibilité améliore l'expérience pour tous et est souvent une obligation légale.</c-text>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" @click="toggleBadAccordion(2)">
                <c-text>Comment commencer ?</c-text>
                <c-text class="accordion-icon">{{ badAccordionOpen[2] ? '−' : '+' }}</c-text>
              </div>
              <div v-if="badAccordionOpen[2]" class="accordion-content">
                <c-text>Commencez par apprendre les guidelines WCAG, utilisez des outils d'audit, et testez avec de vrais utilisateurs.</c-text>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- Bad: No ARIA attributes, no keyboard navigation --&gt;
&lt;div class="accordion-header" @click="toggle"&gt;
  &lt;span&gt;Title&lt;/span&gt;
  &lt;span&gt;+&lt;/span&gt;
&lt;/div&gt;
&lt;div v-if="open"&gt;
  Content
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>

      <template #good>
        <div class="accordion-demo">
          <h4>Avec ARIA correct</h4>
          <c-accordion
            v-for="(item, index) in accordionItems"
            :key="index"
            :title="item.title"
            :expanded="goodAccordionOpen[index]"
            @header-click="toggleGoodAccordion(index)"
          >
            <c-text>{{ item.content }}</c-text>
          </c-accordion>
          <div class="code-block">
            <pre><code>&lt;!-- Good: Complete ARIA with keyboard navigation --&gt;
&lt;button
  aria-expanded="false"
  aria-controls="panel-1"
  @click="toggle"
  @keydown.enter="toggle"
&gt;
  Title
&lt;/button&gt;
&lt;div
  id="panel-1"
  role="region"
  aria-labelledby="button-1"
  :hidden="!open"
&gt;
  Content
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <section class="tabindex-section">
      <c-text tag="h2" class="section-title">Tabindex et navigation clavier</c-text>
      <c-text tag="p">
        L'attribut <code class="inline-code">tabindex</code> contrôle si un élément peut recevoir le focus clavier et dans quel ordre.
      </c-text>

      <div class="tabindex-values">
        <div class="tabindex-card">
          <c-text tag="h3">✅ tabindex="0"</c-text>
          <c-text tag="p">L'élément est focusable dans l'ordre naturel du DOM</c-text>
          <code class="aria-example"><span class="attr">tabindex</span>=<span class="value">"0"</span></code>
          <div class="code-block">
            <pre><code>&lt;!-- Good: Interactive element focusable --&gt;
&lt;div role="button" aria-label="Custom action" tabindex="0"&gt;
  Custom button
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <div class="tabindex-card">
          <c-text tag="h3">⚠️ tabindex="-1"</c-text>
          <c-text tag="p">Focusable par JavaScript mais pas par Tab</c-text>
          <code class="aria-example"><span class="attr">tabindex</span>=<span class="value">"-1"</span></code>
          <div class="code-block">
            <pre><code>&lt;!-- Good: For programmatic focus --&gt;
&lt;div role="alert" aria-live="assertive" tabindex="-1"&gt;
  Error message
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <div class="tabindex-card bad">
          <c-text tag="h3">❌ tabindex > 0</c-text>
          <c-text tag="p">Change l'ordre de navigation (à éviter !)</c-text>
          <code class="aria-example bad-example"><span class="attr">tabindex</span>=<span class="value">"5"</span></code>
          <div class="code-block">
            <pre><code>&lt;!-- Bad: Breaks natural tab order --&gt;
&lt;button tabindex="3"&gt;Third&lt;/button&gt;
&lt;button tabindex="1"&gt;First&lt;/button&gt;
&lt;button tabindex="2"&gt;Second&lt;/button&gt;</code></pre>
          </div>
        </div>
      </div>

      <div class="tabindex-best-practices">
        <c-text tag="h3">📋 Bonnes pratiques tabindex</c-text>
        <ul>
          <li>Utilisez <code class="inline-code">tabindex="0"</code> pour rendre les éléments custom interactifs focusables</li>
          <li>Utilisez <code class="inline-code">tabindex="-1"</code> pour le focus programmatique (modals, alerts)</li>
          <li>N'utilisez JAMAIS de valeurs positives - respectez l'ordre du DOM</li>
          <li>Les éléments natifs interactifs (<code class="inline-code">&lt;button&gt;</code>, <code class="inline-code">&lt;a&gt;</code>, <code class="inline-code">&lt;input&gt;</code>) n'ont pas besoin de tabindex</li>
        </ul>
      </div>

      <!-- Interactive examples -->
      <div class="focus-examples">
        <c-text tag="h3">🎯 Exemples interactifs</c-text>
        <c-text tag="p">Testez la navigation au clavier (Tab/Shift+Tab) avec ces éléments :</c-text>

        <div class="focus-demo-grid">
          <div class="focus-demo-section">
            <c-text tag="h4">✅ Éléments focusables</c-text>

            <!-- Native focusable elements -->
            <button class="demo-button">Bouton natif</button>
            <input type="text" placeholder="Champ de texte" class="demo-input" />
            <a href="#demo" class="demo-link">Lien</a>

            <!-- Custom focusable elements -->
            <div role="button" aria-label="Bouton personnalisé" tabindex="0" class="custom-button" @click="handleCustomButtonClick" @keydown="handleCustomButtonKeydown">
              Bouton custom (div)
            </div>

            <div role="tab" aria-selected="false" aria-controls="panel-1" tabindex="0" class="custom-tab" @click="handleTabClick" @keydown="handleTabKeydown">
              Onglet personnalisé
            </div>

            <div role="menuitem" aria-label="Option de menu" tabindex="0" class="custom-menuitem" @click="handleMenuClick" @keydown="handleMenuKeydown">
              Option de menu
            </div>
          </div>

          <div class="focus-demo-section">
            <c-text tag="h4">❌ Éléments non-focusables</c-text>

            <!-- Non-focusable elements -->
            <div class="demo-text">Texte simple (div)</div>
            <span class="demo-span">Texte inline (span)</span>
            <p class="demo-paragraph">Paragraphe</p>

            <!-- Disabled elements -->
            <button disabled class="demo-button">Bouton désactivé</button>
            <input type="text" disabled placeholder="Champ désactivé" class="demo-input" />

            <!-- Hidden from screen readers -->
            <div aria-hidden="true" class="demo-hidden">Élément aria-hidden</div>

            <!-- Programmatically focusable only -->
            <div role="alert" aria-live="polite" tabindex="-1" class="demo-alert" ref="alertElement">
              Message d'alerte (tabindex="-1")
            </div>

            <button @click="focusAlert" class="demo-button">Focus sur l'alerte</button>
          </div>
        </div>

        <div class="focus-tips">
          <c-text tag="h4">💡 Conseils pour tester</c-text>
          <ul>
            <li>Utilisez <kbd>Tab</kbd> pour naviguer vers l'avant</li>
            <li>Utilisez <kbd>Shift + Tab</kbd> pour naviguer vers l'arrière</li>
            <li>Utilisez <kbd>Espace</kbd> ou <kbd>Entrée</kbd> pour activer les éléments</li>
            <li>Observez l'indicateur de focus (contour bleu)</li>
            <li>Notez quels éléments peuvent ou ne peuvent pas recevoir le focus</li>
          </ul>
        </div>
      </div>
    </section>

    <ExampleToggle
      title="Menu déroulant accessible"
      explanation="Un menu déroulant doit supporter la navigation clavier, fermer avec Échap, et maintenir le focus de manière appropriée."
    >
      <template #bad>
        <div class="dropdown-demo">
          <h4>Menu sans ARIA</h4>
          <div class="dropdown-bad">
            <div class="dropdown-trigger" @click="badDropdownOpen = !badDropdownOpen">
              Actions {{ badDropdownOpen ? '▲' : '▼' }}
            </div>
            <div v-if="badDropdownOpen" class="dropdown-menu">
              <div class="dropdown-item" @click="handleAction('edit')">Modifier</div>
              <div class="dropdown-item" @click="handleAction('copy')">Copier</div>
              <div class="dropdown-item" @click="handleAction('delete')">Supprimer</div>
              <div class="dropdown-item" @click="handleAction('share')">Partager</div>
            </div>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- Bad: No menu role, no focus trap --&gt;
&lt;div @click="open = !open"&gt;
  Actions ▼
&lt;/div&gt;
&lt;div v-if="open"&gt;
  &lt;div @click="action"&gt;Edit&lt;/div&gt;
  &lt;div @click="action"&gt;Delete&lt;/div&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>

      <template #good>
        <div class="dropdown-demo">
          <h4>Menu avec ARIA</h4>
          <div class="dropdown-good">
            <c-button
              class="dropdown-trigger"
              aria-haspopup="true"
              :aria-expanded="goodDropdownOpen"
              :aria-controls="goodDropdownOpen ? 'dropdown-menu-good' : undefined"
              @click="toggleGoodDropdown"
              @keydown="handleDropdownTriggerKeydown"
              ref="dropdownTrigger"
              append-icon="chevron-down"
            >
              Actions
            </c-button>
            <c-popin
              :show="goodDropdownOpen"
              @close="closeGoodDropdown"
              aria-labelledby="dropdown-trigger"
            >
              <template #title>Actions</template>
              <div
                id="dropdown-menu-good"
                class="dropdown-menu"
                role="menu"
                @keydown="handleDropdownMenuKeydown"
              >
                <c-button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('edit')"
                  ref="firstMenuItem"
                  prepend-icon="edit"
                >
                  Modifier
                </c-button>
                <c-button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('copy')"
                  prepend-icon="copy"
                >
                  Copier
                </c-button>
                <c-button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('delete')"
                  prepend-icon="trash"
                >
                  Supprimer
                </c-button>
                <c-button
                  role="menuitem"
                  class="dropdown-item"
                  @click="handleGoodAction('share')"
                  prepend-icon="share"
                >
                  Partager
                </c-button>
              </div>
            </c-popin>
          </div>
          <div class="code-block">
            <pre><code>&lt;!-- Good: ARIA attributes and focus management --&gt;
&lt;button
  aria-haspopup="true"
  aria-expanded="false"
  aria-controls="menu"
  @keydown.escape="close"
&gt;
  Actions
&lt;/button&gt;
&lt;div
  id="menu"
  role="menu"
  v-if="open"
&gt;
  &lt;button role="menuitem"&gt;Edit&lt;/button&gt;
  &lt;button role="menuitem"&gt;Delete&lt;/button&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Tableau triable accessible"
      explanation="Un tableau triable doit indiquer l'état de tri courant, permettre la navigation clavier, et annoncer les changements aux lecteurs d'écran."
    >
      <template #bad>
        <div class="table-demo">
          <table class="table-bad">
            <thead>
              <tr>
                <th @click="sortBadTable('name')">
                  Nom {{ badSortColumn === 'name' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('email')">
                  Email {{ badSortColumn === 'email' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('role')">
                  Rôle {{ badSortColumn === 'role' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
                <th @click="sortBadTable('status')">
                  Statut {{ badSortColumn === 'status' ? (badSortDirection === 'asc' ? '↑' : '↓') : '' }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in sortedBadUsers" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template #good>
        <div class="table-demo">
          <div id="table-status" class="sr-only" aria-live="polite" aria-atomic="true">
            {{ tableStatusMessage }}
          </div>
          <table class="table-good" role="table" aria-label="Liste des utilisateurs">
            <thead>
              <tr>
                <th scope="col">
                  <c-button
                    class="sort-button"
                    @click="sortGoodTable('name')"
                    :aria-sort="getSortState('name')"
                    aria-describedby="sort-instructions"
                  >
                    Nom
                    <c-icon :name="getSortIcon('name')" />
                  </c-button>
                </th>
                <th scope="col">
                  <c-button
                    class="sort-button"
                    @click="sortGoodTable('email')"
                    :aria-sort="getSortState('email')"
                    aria-describedby="sort-instructions"
                  >
                    Email
                    <c-icon :name="getSortIcon('email')" />
                  </c-button>
                </th>
                <th scope="col">
                  <c-button
                    class="sort-button"
                    @click="sortGoodTable('role')"
                    :aria-sort="getSortState('role')"
                    aria-describedby="sort-instructions"
                  >
                    Rôle
                    <c-icon :name="getSortIcon('role')" />
                  </c-button>
                </th>
                <th scope="col">
                  <c-button
                    class="sort-button"
                    @click="sortGoodTable('status')"
                    :aria-sort="getSortState('status')"
                    aria-describedby="sort-instructions"
                  >
                    Statut
                    <c-icon :name="getSortIcon('status')" />
                  </c-button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in sortedGoodUsers" :key="user.id">
                <th scope="row">{{ user.name }}</th>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <c-badge :status="user.status.toLowerCase()">{{ user.status }}</c-badge>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="sort-instructions" class="table-instructions">
            Cliquez sur les en-têtes de colonnes pour trier le tableau. Utilisez Tab pour naviguer entre les boutons de tri.
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Zones dynamiques aria-live"
      explanation="Les zones aria-live permettent d'annoncer des changements de contenu aux lecteurs d'écran. 'polite' attend la fin de l'annonce en cours, 'assertive' interrompt immédiatement."
    >
      <template #bad>
        <div class="aria-live-demo">
          <h4>Sans aria-live</h4>
          <p>Les changements ne sont pas annoncés</p>

          <div class="live-controls">
            <button @click="updateBadLiveContent">
              Mettre à jour le compteur
            </button>
            <button @click="clearBadLiveContent">
              Effacer
            </button>
          </div>

          <div class="live-region-bad">
            <p>{{ badLiveContent }}</p>
          </div>

          <div class="live-status">
            <p><strong>Problèmes :</strong></p>
            <ul>
              <li>Les changements ne sont pas annoncés</li>
              <li>Les utilisateurs de lecteurs d'écran ne savent pas que le contenu a changé</li>
              <li>Aucune indication de l'importance du message</li>
            </ul>
          </div>
        </div>
      </template>

      <template #good>
        <div class="aria-live-demo">
          <h4>Avec aria-live approprié</h4>
          <p>Les changements sont annoncés selon leur priorité</p>

          <div class="live-controls">
            <label for="live-type">Type de région :</label>
            <select id="live-type" v-model="liveType">
              <option value="polite">Polite (attend)</option>
              <option value="assertive">Assertive (interrompt)</option>
              <option value="off">Off (silencieux)</option>
            </select>

            <button @click="updateGoodLiveContent('info')">
              Info (polite)
            </button>
            <button @click="updateGoodLiveContent('alert')">
              Alerte (assertive)
            </button>
            <button @click="clearGoodLiveContent">
              Effacer
            </button>
          </div>

          <div class="live-regions">
            <div
              class="live-region-polite"
              aria-live="polite"
              aria-atomic="true"
              role="status"
            >
              <p v-if="politeLiveContent">{{ politeLiveContent }}</p>
            </div>

            <div
              class="live-region-assertive"
              aria-live="assertive"
              aria-atomic="true"
              role="alert"
            >
              <p v-if="assertiveLiveContent">{{ assertiveLiveContent }}</p>
            </div>
          </div>

          <div class="live-status">
            <p><strong>Avantages :</strong></p>
            <ul>
              <li>Les messages importants interrompent avec aria-live="assertive"</li>
              <li>Les messages informatifs attendent avec aria-live="polite"</li>
              <li>aria-atomic="true" annonce tout le contenu de la région</li>
              <li>Les rôles appropriés (status, alert) donnent plus de contexte</li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Boutons avec icônes accessibles"
      explanation="Les boutons qui contiennent uniquement des icônes doivent avoir un aria-label ou du texte masqué visuellement pour être compris par les lecteurs d'écran."
    >
      <template #bad>
        <div class="icon-buttons-demo">
          <h4>Boutons sans description</h4>
          <p>Ces boutons n'ont aucune indication textuelle :</p>

          <div class="button-group">
            <button class="icon-button">
              <span class="icon">🗑️</span>
            </button>
            <button class="icon-button">
              <span class="icon">✏️</span>
            </button>
            <button class="icon-button">
              <span class="icon">⭐</span>
            </button>
            <button class="icon-button">
              <span class="icon">🔍</span>
            </button>
            <button class="icon-button">
              <span class="icon">⚙️</span>
            </button>
          </div>

          <div class="problems-list">
            <h5>Problèmes :</h5>
            <ul>
              <li>Les lecteurs d'écran annoncent juste "bouton"</li>
              <li>Impossible de savoir l'action sans voir l'icône</li>
              <li>Les émojis peuvent être mal interprétés</li>
              <li>Aucun tooltip au survol</li>
            </ul>
          </div>
        </div>
      </template>

      <template #good>
        <div class="icon-buttons-demo">
          <h4>Boutons accessibles</h4>
          <p>Plusieurs approches pour rendre les icônes accessibles :</p>

          <div class="button-examples">
            <div class="button-example">
              <h5>1. Avec aria-label</h5>
              <div class="button-group">
                <button class="icon-button" aria-label="Supprimer l'élément">
                  <span class="icon" aria-hidden="true">🗑️</span>
                </button>
                <button class="icon-button" aria-label="Modifier l'élément">
                  <span class="icon" aria-hidden="true">✏️</span>
                </button>
                <button class="icon-button" aria-label="Ajouter aux favoris">
                  <span class="icon" aria-hidden="true">⭐</span>
                </button>
              </div>
            </div>

            <div class="button-example">
              <h5>2. Avec texte visible</h5>
              <div class="button-group">
                <button class="text-icon-button">
                  <span class="icon" aria-hidden="true">🔍</span>
                  <span>Rechercher</span>
                </button>
                <button class="text-icon-button">
                  <span class="icon" aria-hidden="true">⚙️</span>
                  <span>Paramètres</span>
                </button>
              </div>
            </div>

            <div class="button-example">
              <h5>3. Avec texte masqué visuellement</h5>
              <div class="button-group">
                <button class="icon-button">
                  <span class="icon" aria-hidden="true">💾</span>
                  <span class="sr-only">Enregistrer</span>
                </button>
                <button class="icon-button" title="Partager">
                  <span class="icon" aria-hidden="true">📤</span>
                  <span class="sr-only">Partager</span>
                </button>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h5>Bonnes pratiques :</h5>
            <ul>
              <li>Toujours fournir un texte alternatif (aria-label, texte masqué, ou texte visible)</li>
              <li>Utiliser aria-hidden="true" sur les icônes décoratives</li>
              <li>Ajouter des tooltips avec l'attribut title</li>
              <li>Préférer le texte visible quand l'espace le permet</li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Formulaires avec attributs ARIA"
      explanation="Les attributs ARIA enrichissent les formulaires en fournissant des labels, descriptions et états aux technologies d'assistance."
    >
      <template #bad>
        <div class="form-aria-demo">
          <h4>Formulaire sans ARIA</h4>
          <p>❌ Formulaire inaccessible sans attributs ARIA appropriés :</p>

          <div class="code-block">
            <pre><code>&lt;!-- Mauvais : pas de label, pas de description --&gt;
&lt;input type="text" placeholder="Votre email"&gt;

&lt;!-- Mauvais : icône non accessible --&gt;
&lt;button&gt;
  &lt;span class="icon"&gt;🔍&lt;/span&gt;
&lt;/button&gt;

&lt;!-- Mauvais : erreur non associée --&gt;
&lt;input type="password"&gt;
&lt;div class="error"&gt;Mot de passe trop court&lt;/div&gt;</code></pre>
          </div>

          <form class="bad-form-aria">
            <div class="form-field">
              <input type="text" placeholder="Votre email" class="bad-input">
            </div>

            <div class="form-field">
              <button class="bad-icon-button">
                <span>🔍</span>
              </button>
            </div>

            <div class="form-field">
              <input type="password" placeholder="Mot de passe" class="bad-input error-input">
              <div class="error-message">Mot de passe trop court</div>
            </div>

            <div class="form-field">
              <div class="checkbox-group">
                <input type="checkbox" id="bad-terms">
                <span>J'accepte les conditions</span>
              </div>
            </div>
          </form>
        </div>
      </template>

      <template #good>
        <div class="form-aria-demo">
          <h4>Formulaire avec ARIA</h4>
          <p>✅ Formulaire accessible avec attributs ARIA appropriés :</p>

          <div class="code-block">
            <pre><code>&lt;!-- Bon : aria-label pour champ sans label visible --&gt;
&lt;input
  type="text"
  aria-label="Adresse email"
  aria-describedby="email-desc"
  aria-required="true"&gt;
&lt;span id="email-desc"&gt;Format : nom@exemple.com&lt;/span&gt;

&lt;!-- Bon : bouton avec aria-label --&gt;
&lt;button aria-label="Rechercher"&gt;
  &lt;span aria-hidden="true"&gt;🔍&lt;/span&gt;
&lt;/button&gt;

&lt;!-- Bon : erreur associée avec aria-describedby --&gt;
&lt;input
  type="password"
  aria-label="Mot de passe"
  aria-invalid="true"
  aria-describedby="pwd-error"&gt;
&lt;div id="pwd-error" role="alert"&gt;
  Mot de passe trop court
&lt;/div&gt;</code></pre>
          </div>

          <form class="good-form-aria">
            <div class="form-field">
              <label for="good-email" class="sr-only">Adresse email</label>
              <input
                type="text"
                id="good-email"
                aria-label="Adresse email"
                aria-describedby="email-desc"
                aria-required="true"
                :aria-invalid="emailInvalid"
                v-model="formEmail"
                @blur="validateEmail"
                placeholder="Votre email"
                class="good-input"
              >
              <span id="email-desc" class="field-hint">Format : nom@exemple.com</span>
              <div v-if="emailError" id="email-error" role="alert" class="error-message">
                {{ emailError }}
              </div>
            </div>

            <div class="form-field">
              <c-button
                aria-label="Rechercher"
                @click="handleSearch"
                prepend-icon="search"
                class="good-icon-button"
              >
                <span class="sr-only">Rechercher</span>
              </c-button>
            </div>

            <div class="form-field">
              <label for="good-password" class="sr-only">Mot de passe</label>
              <input
                type="password"
                id="good-password"
                aria-label="Mot de passe"
                aria-describedby="pwd-requirements pwd-error"
                aria-required="true"
                :aria-invalid="passwordInvalid"
                v-model="formPassword"
                @input="validatePassword"
                placeholder="Mot de passe"
                class="good-input"
                :class="{ 'error': passwordInvalid }"
              >
              <div id="pwd-requirements" class="field-hint">
                Minimum 8 caractères avec chiffres et lettres
              </div>
              <div v-if="passwordError" id="pwd-error" role="alert" class="error-message">
                {{ passwordError }}
              </div>
            </div>

            <div class="form-field">
              <fieldset role="group" aria-labelledby="options-legend">
                <legend id="options-legend">Options de notification</legend>
                <div class="checkbox-group">
                  <input
                    type="checkbox"
                    id="good-email-notif"
                    v-model="emailNotifications"
                    aria-describedby="email-notif-desc"
                  >
                  <label for="good-email-notif">Notifications par email</label>
                </div>
                <span id="email-notif-desc" class="field-hint">
                  Recevez les mises à jour importantes par email
                </span>

                <div class="checkbox-group">
                  <input
                    type="checkbox"
                    id="good-sms-notif"
                    v-model="smsNotifications"
                    aria-describedby="sms-notif-desc"
                  >
                  <label for="good-sms-notif">Notifications par SMS</label>
                </div>
                <span id="sms-notif-desc" class="field-hint">
                  Recevez les alertes urgentes par SMS
                </span>
              </fieldset>
            </div>

            <div class="form-field">
              <div class="checkbox-group">
                <input
                  type="checkbox"
                  id="good-terms"
                  v-model="termsAccepted"
                  aria-required="true"
                  :aria-invalid="!termsAccepted && formSubmitted"
                  aria-describedby="terms-error"
                >
                <label for="good-terms">
                  J'accepte les <a href="#" aria-label="Lire les conditions d'utilisation">conditions d'utilisation</a>
                </label>
              </div>
              <div v-if="!termsAccepted && formSubmitted" id="terms-error" role="alert" class="error-message">
                Vous devez accepter les conditions
              </div>
            </div>

            <div class="form-actions">
              <c-button
                @click="submitForm"
                :disabled="!formValid"
                aria-describedby="submit-status"
              >
                Soumettre
              </c-button>
              <span id="submit-status" class="sr-only" aria-live="polite">
                {{ submitStatus }}
              </span>
            </div>
          </form>

          <div class="aria-attributes-list">
            <h5>Attributs ARIA utilisés :</h5>
            <ul>
              <li><code>aria-label</code> : Fournit un label accessible</li>
              <li><code>aria-describedby</code> : Associe une description détaillée</li>
              <li><code>aria-required</code> : Indique un champ obligatoire</li>
              <li><code>aria-invalid</code> : Signale un champ invalide</li>
              <li><code>aria-labelledby</code> : Référence un label existant</li>
              <li><code>role="alert"</code> : Annonce immédiatement les erreurs</li>
              <li><code>aria-hidden</code> : Cache les éléments décoratifs</li>
              <li><code>aria-live</code> : Annonce les changements dynamiques</li>
            </ul>
          </div>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()
import { CAccordion, CButton, CFunctionalNotice, CIcon, CPopin, CText, CBadge } from '@carrefour/design-system-components-vue3';

// Accordion state
const badAccordionOpen = ref([false, false, false])
const goodAccordionOpen = ref([false, false, false])

const accordionItems = [
  {
    title: "Qu'est-ce que l'accessibilité web ?",
    content: "L'accessibilité web consiste à rendre les sites et applications utilisables par tous, y compris les personnes en situation de handicap."
  },
  {
    title: "Pourquoi est-ce important ?",
    content: "15% de la population mondiale vit avec un handicap. L'accessibilité améliore l'expérience pour tous et est souvent une obligation légale."
  },
  {
    title: "Comment commencer ?",
    content: "Commencez par apprendre les guidelines WCAG, utilisez des outils d'audit, et testez avec de vrais utilisateurs."
  }
]

// Dropdown state
const badDropdownOpen = ref(false)
const goodDropdownOpen = ref(false)
const dropdownTrigger = ref(null)
const firstMenuItem = ref(null)

// Table state
const badSortColumn = ref('name')
const badSortDirection = ref('asc')
const goodSortColumn = ref('name')
const goodSortDirection = ref('asc')
const tableStatusMessage = ref('')

const users = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
  { id: 2, name: 'Bob Dupont', email: 'bob@example.com', role: 'Utilisateur', status: 'Inactif' },
  { id: 3, name: 'Charlie Leroy', email: 'charlie@example.com', role: 'Modérateur', status: 'Actif' },
  { id: 4, name: 'Diana Moreau', email: 'diana@example.com', role: 'Utilisateur', status: 'Suspendu' }
]

// Accordion functions
function toggleBadAccordion(index) {
  badAccordionOpen.value[index] = !badAccordionOpen.value[index]
}

function toggleGoodAccordion(index) {
  goodAccordionOpen.value[index] = !goodAccordionOpen.value[index]
}

function handleAccordionKeydown(event, index) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusNextAccordionHeader(index)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPrevAccordionHeader(index)
      break
    case 'Home':
      event.preventDefault()
      focusAccordionHeader(0)
      break
    case 'End':
      event.preventDefault()
      focusAccordionHeader(accordionItems.length - 1)
      break
  }
}

function focusNextAccordionHeader(currentIndex) {
  const nextIndex = currentIndex === accordionItems.length - 1 ? 0 : currentIndex + 1
  focusAccordionHeader(nextIndex)
}

function focusPrevAccordionHeader(currentIndex) {
  const prevIndex = currentIndex === 0 ? accordionItems.length - 1 : currentIndex - 1
  focusAccordionHeader(prevIndex)
}

function focusAccordionHeader(index) {
  const header = document.getElementById(`accordion-header-${index}`)
  if (header) header.focus()
}

// Dropdown functions
function toggleGoodDropdown() {
  goodDropdownOpen.value = !goodDropdownOpen.value
  if (goodDropdownOpen.value) {
    nextTick(() => {
      firstMenuItem.value?.focus()
    })
  }
}

function closeGoodDropdown() {
  goodDropdownOpen.value = false
  dropdownTrigger.value?.focus()
}

function handleDropdownTriggerKeydown(event) {
  switch (event.key) {
    case 'ArrowDown':
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleGoodDropdown()
      break
    case 'Escape':
      closeGoodDropdown()
      break
  }
}

function handleDropdownMenuKeydown(event) {
  const menuItems = document.querySelectorAll('#dropdown-menu-good button')
  const currentIndex = Array.from(menuItems).indexOf(event.target)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      const nextIndex = currentIndex === menuItems.length - 1 ? 0 : currentIndex + 1
      menuItems[nextIndex].focus()
      break
    case 'ArrowUp':
      event.preventDefault()
      const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1
      menuItems[prevIndex].focus()
      break
    case 'Escape':
      event.preventDefault()
      closeGoodDropdown()
      break
    case 'Home':
      event.preventDefault()
      menuItems[0].focus()
      break
    case 'End':
      event.preventDefault()
      menuItems[menuItems.length - 1].focus()
      break
  }
}

function handleAction(action) {
  alert(`Action: ${action}`)
  badDropdownOpen.value = false
}

function handleGoodAction(action) {
  alert(`Action: ${action}`)
  closeGoodDropdown()
}

// Table functions
function sortBadTable(column) {
  if (badSortColumn.value === column) {
    badSortDirection.value = badSortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    badSortColumn.value = column
    badSortDirection.value = 'asc'
  }
}

function sortGoodTable(column) {
  if (goodSortColumn.value === column) {
    goodSortDirection.value = goodSortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    goodSortColumn.value = column
    goodSortDirection.value = 'asc'
  }

  // Announce sort change
  const direction = goodSortDirection.value === 'asc' ? 'croissant' : 'décroissant'
  tableStatusMessage.value = `Tableau trié par ${column} en ordre ${direction}`
}

const sortedBadUsers = computed(() => {
  return [...users].sort((a, b) => {
    const aValue = a[badSortColumn.value]
    const bValue = b[badSortColumn.value]

    if (badSortDirection.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
})

const sortedGoodUsers = computed(() => {
  return [...users].sort((a, b) => {
    const aValue = a[goodSortColumn.value]
    const bValue = b[goodSortColumn.value]

    if (goodSortDirection.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
})

function getSortState(column) {
  if (goodSortColumn.value !== column) return 'none'
  return goodSortDirection.value === 'asc' ? 'ascending' : 'descending'
}

function getSortIcon(column) {
  if (goodSortColumn.value !== column) return 'chevrons-up-down'
  return goodSortDirection.value === 'asc' ? 'chevron-up' : 'chevron-down'
}

// Aria-live demo state
const badLiveContent = ref('')
const politeLiveContent = ref('')
const assertiveLiveContent = ref('')
const liveType = ref('polite')
let liveCounter = 0

function updateBadLiveContent() {
  liveCounter++
  badLiveContent.value = `Compteur mis à jour : ${liveCounter}`
}

function clearBadLiveContent() {
  badLiveContent.value = ''
  liveCounter = 0
}

function updateGoodLiveContent(type) {
  liveCounter++
  const message = type === 'alert'
    ? `⚠️ ALERTE : Action requise! (Message ${liveCounter})`
    : `ℹ️ Information : Le compteur est à ${liveCounter}`

  if (type === 'alert' || liveType.value === 'assertive') {
    assertiveLiveContent.value = message
    setTimeout(() => { assertiveLiveContent.value = '' }, 5000)
  } else {
    politeLiveContent.value = message
    setTimeout(() => { politeLiveContent.value = '' }, 5000)
  }
}

function clearGoodLiveContent() {
  politeLiveContent.value = ''
  assertiveLiveContent.value = ''
  liveCounter = 0
}

// Form ARIA demo variables
const formEmail = ref('')
const formPassword = ref('')
const emailNotifications = ref(true)
const smsNotifications = ref(false)
const termsAccepted = ref(false)
const formSubmitted = ref(false)

const emailInvalid = ref(false)
const emailError = ref('')
const passwordInvalid = ref(false)
const passwordError = ref('')
const submitStatus = ref('')

const formValid = computed(() => {
  return formEmail.value &&
         formPassword.value &&
         !emailInvalid.value &&
         !passwordInvalid.value &&
         termsAccepted.value
})

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formEmail.value) {
    emailInvalid.value = true
    emailError.value = 'L\'email est requis'
  } else if (!emailRegex.test(formEmail.value)) {
    emailInvalid.value = true
    emailError.value = 'Format d\'email invalide'
  } else {
    emailInvalid.value = false
    emailError.value = ''
  }
}

function validatePassword() {
  if (!formPassword.value) {
    passwordInvalid.value = true
    passwordError.value = 'Le mot de passe est requis'
  } else if (formPassword.value.length < 8) {
    passwordInvalid.value = true
    passwordError.value = 'Le mot de passe doit contenir au moins 8 caractères'
  } else if (!/\d/.test(formPassword.value) || !/[a-zA-Z]/.test(formPassword.value)) {
    passwordInvalid.value = true
    passwordError.value = 'Le mot de passe doit contenir des lettres et des chiffres'
  } else {
    passwordInvalid.value = false
    passwordError.value = ''
  }
}

function handleSearch() {
  alert('Recherche lancée')
}

function submitForm() {
  formSubmitted.value = true
  validateEmail()
  validatePassword()

  if (formValid.value) {
    submitStatus.value = 'Formulaire soumis avec succès'
    alert('Formulaire soumis avec succès!')
  } else {
    submitStatus.value = 'Veuillez corriger les erreurs avant de soumettre'
  }
}

// Focus demo refs and functions
const alertElement = ref(null)

function handleCustomButtonClick() {
  alert('Bouton personnalisé cliqué!')
}

function handleCustomButtonKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleCustomButtonClick()
  }
}

function handleTabClick() {
  alert('Onglet sélectionné!')
}

function handleTabKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleTabClick()
  }
}

function handleMenuClick() {
  alert('Option de menu sélectionnée!')
}

function handleMenuKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleMenuClick()
  }
}

function focusAlert() {
  if (alertElement.value) {
    alertElement.value.focus()
    alertElement.value.textContent = 'Message d\'alerte maintenant focusé!'
    setTimeout(() => {
      if (alertElement.value) {
        alertElement.value.textContent = 'Message d\'alerte (tabindex="-1")'
      }
    }, 2000)
  }
}
</script>

<style scoped>
.aria-components {
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

/* Accordion styles */
.accordion-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.accordion-bad, .accordion-good {
  max-width: 600px;
}

.accordion-item {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.accordion-item:last-child {
  margin-bottom: 0;
}

.accordion-header {
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--color-bg-secondary);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.2s;
}

.accordion-header:hover {
  background: var(--color-primary-light);
}

.accordion-header:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: -3px;
}

.accordion-bad .accordion-header {
  background: var(--color-bg-secondary);
}

.accordion-icon {
  font-weight: bold;
  font-size: 1.2rem;
}

.accordion-content {
  padding: 1.5rem;
  background: var(--color-bg);
  color: var(--color-text);
}

.accordion-content p {
  margin: 0;
  line-height: 1.6;
}


/* Dropdown styles */
.dropdown-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.dropdown-bad, .dropdown-good {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-trigger:hover {
  background: var(--color-primary-dark);
}

.dropdown-trigger:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin-top: 0.25rem;
  padding: 0;
  list-style: none;
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-item:hover {
  background: var(--color-bg-secondary);
}

.dropdown-item:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

.dropdown-item:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

/* Table styles */
.table-demo {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  overflow-x: auto;
}

.table-bad, .table-good {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.table-bad th, .table-bad td,
.table-good th, .table-good td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.table-bad th {
  background: var(--color-bg-secondary);
  cursor: pointer;
  user-select: none;
}

.table-bad th:hover {
  background: var(--color-primary-light);
}

.sort-button {
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.sort-button:hover {
  background: var(--color-primary-light);
}

.sort-button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

.sort-icon {
  margin-left: 0.5rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-actif {
  background: var(--color-success-light);
  color: var(--color-success);
}

.status-inactif {
  background: var(--color-border);
  color: var(--color-text-secondary);
}

.status-suspendu {
  background: var(--color-error-light);
  color: var(--color-error);
}

.table-instructions {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .accordion-header,
  .dropdown-item,
  .sort-button {
    transition: none;
  }
}

@media (max-width: 768px) {
  .table-demo {
    padding: 1rem;
  }

  .table-bad th, .table-bad td,
  .table-good th, .table-good td {
    padding: 0.5rem;
  }
}

/* Aria-live demo styles */
.aria-live-demo {
  padding: 1.5rem;
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: 0.5rem;
  min-height: 300px;
}

.aria-live-demo h4 {
  margin-top: 0;
  color: var(--color-primary);
}

.live-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.live-controls label {
  font-weight: 500;
}

.live-controls select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background: var(--color-bg);
  color: var(--color-text);
}

.live-controls button {
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.2s;
}

.live-controls button:hover {
  background: var(--color-primary-dark);
}

.live-region-bad,
.live-regions {
  min-height: 60px;
  margin-bottom: 1rem;
}

.live-region-bad {
  padding: 1rem;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
}

.live-region-polite,
.live-region-assertive {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  min-height: 50px;
}

.live-region-polite {
  background: var(--color-info-light);
  border: 2px solid var(--color-info);
}

.live-region-assertive {
  background: var(--color-error-light);
  border: 2px solid var(--color-error);
}

.live-region-polite p,
.live-region-assertive p {
  margin: 0;
  font-weight: 500;
}

.live-status {
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.live-status p {
  margin: 0 0 0.5rem 0;
}

.live-status ul {
  margin: 0;
  padding-left: 1.5rem;
}

.live-status li {
  margin-bottom: 0.25rem;
  color: var(--color-text);
}

/* Icon buttons demo styles */
.icon-buttons-demo {
  padding: 1.5rem;
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: 0.5rem;
}

.icon-buttons-demo h4 {
  margin-top: 0;
  color: var(--color-primary);
}

.icon-buttons-demo h5 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-primary-dark);
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.icon-button {
  width: 48px;
  height: 48px;
  padding: 0;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.icon-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.icon-button .icon {
  font-size: 1.5rem;
}

.text-icon-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.text-icon-button:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.text-icon-button .icon {
  font-size: 1.25rem;
}

.button-examples {
  margin-top: 1rem;
}

.button-example {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.button-example h5 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.problems-list,
.best-practices {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.problems-list h5,
.best-practices h5 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.problems-list ul,
.best-practices ul {
  margin: 0;
  padding-left: 1.5rem;
}

.problems-list li,
.best-practices li {
  margin-bottom: 0.5rem;
}

/* Section titles - all h2 white */
.section-title,
h2 {
  color: white !important;
  margin-bottom: 1rem;
}

/* ARIA Introduction Section */
.aria-intro {
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.aria-intro p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.aria-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.principle-card {
  padding: 1.5rem;
  background: var(--color-bg);
  border-radius: 0.5rem;
  border: 2px solid var(--color-border);
}

.principle-card h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.principle-card p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.principle-card code {
  display: block;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
  font-family: monospace;
}

/* ARIA code examples with better contrast */
.aria-example {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  background: #2d3748;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Courier New', monospace;
}

.aria-example .attr {
  color: #93c5fd;
}

.aria-example .value {
  color: #86efac;
}

.aria-example.bad-example {
  background: #7f1d1d;
}

.aria-example.bad-example .attr {
  color: #fca5a5;
}

.aria-example.bad-example .value {
  color: #fbbf24;
}

/* Inline code */
.inline-code,
code.inline-code {
  display: inline;
  padding: 0.2rem 0.4rem;
  background: #374151;
  color: #93c5fd;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.9em;
}

.aria-golden-rules {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-warning-light);
  border-radius: 0.5rem;
  border-left: 4px solid var(--color-warning);
}

.aria-golden-rules h3 {
  color: var(--color-text);
  margin-bottom: 1rem;
}

.aria-golden-rules ol {
  margin-left: 1.5rem;
}

.aria-golden-rules li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.aria-golden-rules strong.rule-number {
  color: white;
  font-weight: bold;
}

/* Tabindex Section */
.tabindex-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.tabindex-values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tabindex-card {
  padding: 1.5rem;
  background: var(--color-bg);
  border-radius: 0.5rem;
  border: 2px solid var(--color-border);
}

.tabindex-card.bad {
  border-color: var(--color-error);
  background: rgba(220, 53, 69, 0.1);
}

.tabindex-card h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.tabindex-card.bad h3 {
  color: var(--color-error);
}

.tabindex-card p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.tabindex-best-practices {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-info-light);
  border-radius: 0.5rem;
  border-left: 4px solid var(--color-info);
}

.tabindex-best-practices h3 {
  color: var(--color-text);
  margin-bottom: 1rem;
}

.tabindex-best-practices ul {
  margin-left: 1.5rem;
}

.tabindex-best-practices li {
  margin-bottom: 0.5rem;
}

/* Form ARIA Demo Styles */
.form-aria-demo {
  padding: 1.5rem;
  background: var(--color-bg);
  border-radius: 0.5rem;
}

.form-aria-demo h4 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.code-block {
  margin: 1.5rem 0;
  background: #1e1e1e;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  color: #d4d4d4;
}

.code-block code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.bad-form-aria,
.good-form-aria {
  margin-top: 1.5rem;
}

.bad-form-aria .form-field,
.good-form-aria .form-field {
  margin-bottom: 1.5rem;
}

.bad-input,
.good-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 0.25rem;
  font-size: 1rem;
}

.bad-input.error-input {
  border-color: var(--color-error);
}

.good-input:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.good-input.error {
  border-color: var(--color-error);
}

.field-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.error-message {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--color-error-light);
  color: var(--color-error);
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

.bad-icon-button,
.good-icon-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-primary);
  background: var(--color-primary);
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}

.bad-icon-button:hover,
.good-icon-button:hover {
  background: var(--color-primary-dark);
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.checkbox-group label {
  cursor: pointer;
}

fieldset {
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

legend {
  font-weight: 600;
  color: var(--color-primary);
  padding: 0 0.5rem;
}

.form-actions {
  margin-top: 2rem;
}

.aria-attributes-list {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.aria-attributes-list h5 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.aria-attributes-list ul {
  list-style: none;
  padding: 0;
}

.aria-attributes-list li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.aria-attributes-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

.aria-attributes-list code {
  background: var(--color-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
  color: var(--color-primary);
}

/* Focus demo styles */
.focus-examples {
  margin-top: 2rem;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.focus-demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.focus-demo-section {
  padding: 1.5rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-bg);
}

.focus-demo-section h4 {
  margin-bottom: 1rem;
  color: white;
}

.demo-button,
.custom-button,
.custom-tab,
.custom-menuitem {
  margin: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.demo-button {
  background: var(--color-primary);
  color: white;
}

.demo-button:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.demo-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.custom-button {
  background: var(--color-info);
  color: white;
  border-color: var(--color-info);
}

.custom-button:hover {
  background: var(--color-info-dark);
}

.custom-tab {
  background: var(--color-bg-secondary);
  color: var(--color-text);
  border-color: var(--color-border);
}

.custom-tab:hover {
  background: var(--color-hover);
}

.custom-menuitem {
  background: var(--color-warning);
  color: white;
  border-color: var(--color-warning);
}

.custom-menuitem:hover {
  background: var(--color-warning-dark);
}

.demo-input {
  margin: 0.5rem;
  padding: 0.5rem;
  border: 2px solid var(--color-border);
  border-radius: 0.25rem;
  width: auto;
  max-width: 200px;
}

.demo-input:focus {
  border-color: var(--color-primary);
}

.demo-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.demo-link {
  display: inline-block;
  margin: 0.5rem;
  padding: 0.5rem;
  color: var(--color-primary);
  text-decoration: underline;
}

.demo-link:hover {
  color: var(--color-primary-dark);
}

.demo-text,
.demo-span,
.demo-paragraph {
  margin: 0.5rem;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.25rem;
  color: var(--color-text-secondary);
}

.demo-hidden {
  margin: 0.5rem;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  opacity: 0.6;
  font-style: italic;
}

.demo-alert {
  margin: 0.5rem;
  padding: 0.75rem;
  background: var(--color-warning-light);
  color: var(--color-warning);
  border: 2px solid var(--color-warning);
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.demo-alert:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.focus-tips {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-info-light);
  border-radius: 0.5rem;
  border-left: 4px solid var(--color-info);
}

.focus-tips h4 {
  color: var(--color-text);
  margin-bottom: 1rem;
}

.focus-tips ul {
  margin-left: 1.5rem;
}

.focus-tips li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.focus-tips kbd {
  display: inline-block;
  padding: 0.2rem 0.4rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.9em;
  font-weight: bold;
}

@media (max-width: 768px) {
  .focus-demo-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>