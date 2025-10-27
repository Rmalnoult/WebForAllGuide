<template>
  <div class="media-accessible">
    <PageHeader
      title="Images & Médias Accessibles"
      description="Rendre les contenus visuels compréhensibles pour tous les utilisateurs"
    />

    <ExampleToggle
      title="Textes alternatifs pour les images"
      explanation="Les textes alternatifs permettent aux lecteurs d'écran de décrire les images. Ils doivent être descriptifs pour les images informatives, vides pour les images décoratives."
    >
      <template #bad>
        <div class="images-demo">
          <article class="product-card">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxhcHRvcCBNYWNCb29rPC90ZXh0Pgo8L3N2Zz4=" alt="image" />
            <h3>MacBook Pro 16"</h3>
            <p class="price">2 499 €</p>
            <div class="rating">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTIgMi41TDE0LjA5IDguMjZMMjAuMTggOS4yN0wxNi4wOSAxMy4xNEwxNy4xOCAxOS4xOEwxMiAxNi4yN0w2LjgyIDE5LjE4TDcuOTEgMTMuMTRMMy44MiA5LjI3TDkuOTEgOC4yNkwxMiAyLjVaIiBmaWxsPSIjZjU5ZTBiIi8+Cjwvc3ZnPg==" alt="star.png" />
              <span>4.8/5 (127 avis)</span>
            </div>
          </article>

          <div class="notification">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzEwYjk4MSIvPgogIDxwYXRoIGQ9Ik05IDEyTDExIDE0TDE1IDEwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+" alt="success.svg" />
            Commande confirmée !
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;!-- ❌ Mauvais : textes alternatifs non descriptifs --&gt;
&lt;img src="laptop.jpg" alt="image" /&gt;
&lt;img src="star-icon.svg" alt="star.png" /&gt;
&lt;img src="success-icon.svg" alt="success.svg" /&gt;

&lt;!-- Problèmes :
- alt="image" n'est pas descriptif
- alt="star.png" décrit le fichier, pas le contenu
- Les icônes décoratives ont un alt non vide --&gt;</code></pre>
        </div>
      </template>

      <template #good>
        <div class="images-demo">
          <article class="product-card">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxhcHRvcCBNYWNCb29rPC90ZXh0Pgo8L3N2Zz4=" alt="MacBook Pro 16 pouces, vue de face, écran ouvert montrant l'interface macOS" />
            <h3>MacBook Pro 16"</h3>
            <p class="price">2 499 €</p>
            <div class="rating">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTIgMi41TDE0LjA5IDguMjZMMjAuMTggOS4yN0wxNi4wOSAxMy4xNEwxNy4xOCAxOS4xOEwxMiAxNi4yN0w2LjgyIDE5LjE4TDcuOTEgMTMuMTRMMy44MiA5LjI3TDkuOTEgOC4yNkwxMiAyLjVaIiBmaWxsPSIjZjU5ZTBiIi8+Cjwvc3ZnPg==" alt="" />
              <span><span class="sr-only">Note de </span>4.8/5 <span class="sr-only">étoiles, basée sur </span>(127 avis)</span>
            </div>
          </article>

          <div class="notification">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzEwYjk4MSIvPgogIDxwYXRoIGQ9Ik05IDEyTDExIDE0TDE1IDEwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+" alt="" />
            Commande confirmée !
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;!-- ✅ Bon : textes alternatifs descriptifs --&gt;
&lt;img src="laptop.jpg"
     alt="MacBook Pro 16 pouces, vue de face,
          écran ouvert montrant l'interface macOS" /&gt;

&lt;!-- Icône décorative : alt vide, .sr-only pour contexte --&gt;
&lt;img src="star-icon.svg" alt="" /&gt;
&lt;span&gt;
  &lt;span class="sr-only"&gt;Note de &lt;/span&gt;4.8/5
  &lt;span class="sr-only"&gt; étoiles&lt;/span&gt; (127 avis)
&lt;/span&gt;

&lt;!-- Icône décorative dans notification --&gt;
&lt;img src="success-icon.svg" alt="" /&gt;
&lt;span&gt;Commande confirmée !&lt;/span&gt;

&lt;!-- Bonnes pratiques :
- Images informatives : alt descriptif du contenu/fonction
- Images décoratives : alt="" (vide)
- Éviter les mots comme "image", "photo", "icône" --&gt;</code></pre>
        </div>
      </template>

    </ExampleToggle>

    <ExampleToggle
      title="Vidéo accessible"
      explanation="Les vidéos doivent avoir des sous-titres, des contrôles accessibles au clavier, et ne pas démarrer automatiquement."
    >
      <template #bad>
        <div class="video-demo">
          <h3>Présentation du produit</h3>
          <div class="video-container-bad">
            <video
              width="100%"
              height="200"
              autoplay
              loop
              muted
            >
              <source src="data:video/mp4;base64," type="video/mp4">
              Votre navigateur ne supporte pas la vidéo.
            </video>
            <div class="video-placeholder">
              📹 Vidéo de démonstration
              <br>
              <small>(Lecture automatique, pas de sous-titres)</small>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;!-- ❌ Mauvais : vidéo avec lecture automatique --&gt;
&lt;video width="100%" height="200" autoplay loop muted&gt;
  &lt;source src="demo.mp4" type="video/mp4"&gt;
  Votre navigateur ne supporte pas la vidéo.
&lt;/video&gt;

&lt;!-- Problèmes :
- autoplay peut désorienter les utilisateurs
- Pas de sous-titres (captions)
- Pas de description audio
- Contrôles non explicites
- Pas d'alternative textuelle --&gt;</code></pre>
        </div>
      </template>

      <template #good>
        <div class="video-demo">
          <h3>Présentation du produit</h3>
          <div class="video-container-good">
            <video
              width="100%"
              height="200"
              controls
              preload="metadata"
              aria-describedby="video-description"
            >
              <source src="data:video/mp4;base64," type="video/mp4">
              <track
                kind="captions"
                src="captions.vtt"
                srclang="fr"
                label="Français"
                default
              >
              <track
                kind="descriptions"
                src="descriptions.vtt"
                srclang="fr"
                label="Description audio"
              >
              Votre navigateur ne supporte pas la vidéo.
              <a href="transcript.html">Consulter la transcription</a>
            </video>
            <div class="video-placeholder">
              📹 Vidéo de démonstration du MacBook Pro
              <br>
              <small>(Contrôles accessibles, sous-titres disponibles)</small>
            </div>
            <div id="video-description" class="video-description">
              Vidéo de 2 minutes présentant les fonctionnalités du MacBook Pro 16 pouces.
              Sous-titres en français disponibles.
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;!-- ✅ Bon : vidéo accessible avec sous-titres et contrôles --&gt;
&lt;video width="100%" height="200"
       controls
       preload="metadata"
       aria-describedby="video-description"&gt;
  &lt;source src="demo.mp4" type="video/mp4"&gt;

  &lt;!-- Sous-titres pour les malentendants --&gt;
  &lt;track kind="captions"
         src="captions.vtt"
         srclang="fr"
         label="Français"
         default&gt;

  &lt;!-- Descriptions audio pour les malvoyants --&gt;
  &lt;track kind="descriptions"
         src="descriptions.vtt"
         srclang="fr"
         label="Description audio"&gt;

  &lt;!-- Fallback avec lien vers transcription --&gt;
  Votre navigateur ne supporte pas la vidéo.
  &lt;a href="transcript.html"&gt;Consulter la transcription&lt;/a&gt;
&lt;/video&gt;

&lt;div id="video-description"&gt;
  Vidéo de 2 minutes présentant les fonctionnalités du MacBook Pro.
  Sous-titres en français disponibles.
&lt;/div&gt;

&lt;!-- Bonnes pratiques :
- controls : contrôles natifs accessibles
- preload="metadata" : pas de lecture automatique
- Sous-titres (captions) et descriptions audio
- Transcription alternative disponible --&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>

    <ExampleToggle
      title="Graphiques et données visuelles"
      explanation="Les graphiques doivent être accompagnés de descriptions textuelles et de données alternatives pour les utilisateurs qui ne peuvent pas les voir."
    >
      <template #bad>
        <div class="chart-demo">
          <h3>Ventes trimestrielles</h3>
          <div class="chart-bad">
            <svg width="300" height="150" viewBox="0 0 300 150">
              <rect
                x="50"
                y="100"
                width="40"
                height="40"
                fill="#3b82f6"
              />
              <rect
                x="110"
                y="80"
                width="40"
                height="60"
                fill="#3b82f6"
              />
              <rect
                x="170"
                y="60"
                width="40"
                height="80"
                fill="#3b82f6"
              />
              <rect
                x="230"
                y="40"
                width="40"
                height="100"
                fill="#3b82f6"
              />
            </svg>
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;!-- ❌ Mauvais : graphique sans description ni données alternatives --&gt;
&lt;svg width="300" height="150" viewBox="0 0 300 150"&gt;
  &lt;rect
    x="50"
    y="100"
    width="40"
    height="40"
    fill="#3b82f6"
  /&gt;
  &lt;rect
    x="110"
    y="80"
    width="40"
    height="60"
    fill="#3b82f6"
  /&gt;
  &lt;rect
    x="170"
    y="60"
    width="40"
    height="80"
    fill="#3b82f6"
  /&gt;
  &lt;rect
    x="230"
    y="40"
    width="40"
    height="100"
    fill="#3b82f6"
  /&gt;
&lt;/svg&gt;

&lt;!-- Problèmes :
- Pas de role="img"
- Pas de titre ni description
- Données non accessibles aux lecteurs d'écran
- Pas d'alternative textuelle --&gt;</code></pre>
        </div>
      </template>

      <template #good>
        <div class="chart-demo">
          <h3>Ventes trimestrielles</h3>
          <div class="chart-good">
            <svg
              width="300"
              height="150"
              viewBox="0 0 300 150"
              role="img"
              aria-labelledby="chart-title"
              aria-describedby="chart-desc"
            >
              <title id="chart-title">Graphique en barres des ventes trimestrielles</title>
              <desc id="chart-desc">
                Évolution croissante des ventes sur 4 trimestres :
                Q1: 40k€, Q2: 60k€, Q3: 80k€, Q4: 100k€
              </desc>
              <rect
                x="50"
                y="100"
                width="40"
                height="40"
                fill="#3b82f6"
              />
              <rect
                x="110"
                y="80"
                width="40"
                height="60"
                fill="#3b82f6"
              />
              <rect
                x="170"
                y="60"
                width="40"
                height="80"
                fill="#3b82f6"
              />
              <rect
                x="230"
                y="40"
                width="40"
                height="100"
                fill="#3b82f6"
              />

              <!-- Labels -->
              <text x="70" y="130" text-anchor="middle" font-size="12">Q1</text>
              <text x="130" y="130" text-anchor="middle" font-size="12">Q2</text>
              <text x="190" y="130" text-anchor="middle" font-size="12">Q3</text>
              <text x="250" y="130" text-anchor="middle" font-size="12">Q4</text>
            </svg>

            <table class="chart-data">
              <caption>Données détaillées des ventes trimestrielles</caption>
              <thead>
                <tr>
                  <th scope="col">Trimestre</th>
                  <th scope="col">Ventes (k€)</th>
                  <th scope="col">Évolution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Q1 2025</th>
                  <td>40</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th scope="row">Q2 2025</th>
                  <td>60</td>
                  <td>+50%</td>
                </tr>
                <tr>
                  <th scope="row">Q3 2025</th>
                  <td>80</td>
                  <td>+33%</td>
                </tr>
                <tr>
                  <th scope="row">Q4 2025</th>
                  <td>100</td>
                  <td>+25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="code-block">
          <pre><code>&lt;!-- ✅ Bon : graphique accessible avec données alternatives --&gt;
&lt;svg width="300" height="150"
     role="img"
     aria-labelledby="chart-title"
     aria-describedby="chart-desc"&gt;

  &lt;title id="chart-title"&gt;Graphique en barres des ventes trimestrielles&lt;/title&gt;
  &lt;desc id="chart-desc"&gt;
    Évolution croissante des ventes sur 4 trimestres :
    Q1: 40k€, Q2: 60k€, Q3: 80k€, Q4: 100k€
  &lt;/desc&gt;

  &lt;!-- Barres du graphique --&gt;
  &lt;rect
    x="50"
    y="100"
    width="40"
    height="40"
    fill="#3b82f6"
  /&gt;
  &lt;rect
    x="110"
    y="80"
    width="40"
    height="60"
    fill="#3b82f6"
  /&gt;
  &lt;rect
    x="170"
    y="60"
    width="40"
    height="80"
    fill="#3b82f6"
  /&gt;
  &lt;rect
    x="230"
    y="40"
    width="40"
    height="100"
    fill="#3b82f6"
  /&gt;

  &lt;!-- Labels accessibles --&gt;
  &lt;text x="70" y="130"&gt;Q1&lt;/text&gt;
  &lt;text x="130" y="130"&gt;Q2&lt;/text&gt;
  &lt;text x="190" y="130"&gt;Q3&lt;/text&gt;
  &lt;text x="250" y="130"&gt;Q4&lt;/text&gt;
&lt;/svg&gt;

&lt;!-- Table alternative avec toutes les données --&gt;
&lt;table&gt;
  &lt;caption&gt;Données détaillées des ventes trimestrielles&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Trimestre&lt;/th&gt;
      &lt;th scope="col"&gt;Ventes (k€)&lt;/th&gt;
      &lt;th scope="col"&gt;Évolution&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Q1 2025&lt;/th&gt;
      &lt;td&gt;40&lt;/td&gt;
      &lt;td&gt;-&lt;/td&gt;
    &lt;/tr&gt;
    &lt;!-- ... autres lignes --&gt;
  &lt;/tbody&gt;
&lt;/table&gt;

&lt;!-- Bonnes pratiques :
- role="img" pour indiquer que le SVG est une image
- &lt;title&gt; et &lt;desc&gt; pour décrire le graphique
- Table alternative avec toutes les données
- Labels textuels dans le SVG --&gt;</code></pre>
        </div>
      </template>
    </ExampleToggle>
  </div>
</template>

<script setup>
import PageHeader from '@/components/layout/PageHeader.vue'
import ExampleToggle from '@/components/common/ExampleToggle.vue'
import { useSyntaxHighlight } from '@/composables/useSyntaxHighlight'

// Initialize syntax highlighting
useSyntaxHighlight()
</script>

<style scoped>
.media-accessible {
  max-width: 100%;
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

/* Images demo styles */
.images-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-card {
  /* Light background to distinguish from parent */
  background: var(--color-bg-secondary);
  color: var(--color-text);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.625rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.product-card img:first-child {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.625rem;
  margin-bottom: 1rem;
}

.product-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1;
}

.rating img {
  width: 14px !important;
  height: 14px !important;
  flex-shrink: 0;
  margin-bottom: 0 !important;
}

.notification {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-success-light);
  border: 1px solid var(--color-success);
  border-radius: 0.625rem;
  color: var(--color-success-dark);
  margin-top: 0.5rem;
}

.notification img {
  width: 20px;
  height: 20px;
}

/* Video demo styles */
.video-demo {
  /* Remove card styles to avoid nested cards */
  color: var(--color-text);
}

.video-container-bad, .video-container-good {
  margin-top: 1rem;
  position: relative;
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg-secondary);
  border: 2px dashed var(--color-border);
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 1.25rem;
}

.video-description {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: 0.625rem;
  font-size: 0.9rem;
}

/* Chart demo styles */
.chart-demo {
  /* Remove card styles to avoid nested cards */
  color: var(--color-text);
}

.chart-bad, .chart-good {
  margin-top: 1rem;
}

.chart-data {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.chart-data caption {
  text-align: left;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.chart-data th,
.chart-data td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid var(--color-border);
}

.chart-data th {
  background: var(--color-bg-secondary);
  font-weight: 600;
}

.chart-data tbody th {
  background: var(--color-bg-secondary);
}

/* Code block styles */
.code-block {
  background: #1e1e1e;
  color: #e0e0e0;
  border-radius: 0.625rem;
  padding: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
  border: 1px solid var(--color-border);
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.code-block code {
  white-space: pre;
  word-wrap: normal;
}

@media (max-width: 768px) {
  .chart-data {
    font-size: 0.8rem;
  }

  .chart-data th,
  .chart-data td {
    padding: 0.25rem;
  }
}
</style>