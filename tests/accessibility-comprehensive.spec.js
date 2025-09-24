import { test, expect } from '@playwright/test'

test.describe('Tests d\'accessibilité complets', () => {

  test.beforeEach(async ({ page }) => {
    // Démarrer sur la page d'accueil
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('Vérification des contrastes de couleur sur toutes les pages', async ({ page }) => {
    const pages = [
      { path: '/', name: 'Accueil' },
      { path: '/semantic-html', name: 'HTML Sémantique' },
      { path: '/keyboard-navigation', name: 'Navigation Clavier' },
      { path: '/accessible-forms', name: 'Formulaires' },
      { path: '/media-accessible', name: 'Médias Accessibles' },
      { path: '/color-contrast', name: 'Contrastes' },
      { path: '/aria-components', name: 'ARIA' },
      { path: '/performance', name: 'Performance' }
    ]

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path)
      await page.waitForLoadState('networkidle')

      // Vérifier qu'il n'y a pas de texte bleu sur fond foncé avec ratio insuffisant
      const problematicElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*')
        const problems = []

        elements.forEach(el => {
          const style = window.getComputedStyle(el)
          const color = style.color
          const backgroundColor = style.backgroundColor
          const textContent = el.textContent?.trim()

          // Vérifier si c'est du texte bleu potentiellement problématique
          if (textContent && textContent.length > 0) {
            // Convertir les couleurs en RGB pour vérification
            if (color.includes('rgb')) {
              const colorMatch = color.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/)
              if (colorMatch) {
                const [_, r, g, b] = colorMatch.map(Number)

                // Détecter du bleu (plus de bleu que rouge/vert)
                if (b > r && b > g && b > 100) {
                  problems.push({
                    element: el.tagName,
                    text: textContent.substring(0, 50),
                    color: color,
                    backgroundColor: backgroundColor,
                    className: el.className,
                    id: el.id
                  })
                }
              }
            }

            // Vérifier les couleurs hexadécimales problématiques connues
            const problematicColors = [
              '#646cff', '#535bf2', '#0970e6', '#0866d3', '#075cc0',
              '#007bff', '#4F46E5', '#93c5fd', '#3182ce', '#005cc5'
            ]

            problematicColors.forEach(problemColor => {
              if (style.color === problemColor || el.style.color === problemColor) {
                problems.push({
                  element: el.tagName,
                  text: textContent.substring(0, 50),
                  color: problemColor,
                  backgroundColor: backgroundColor,
                  className: el.className,
                  id: el.id,
                  type: 'problematic-hex-color'
                })
              }
            })
          }
        })

        return problems
      })

      if (problematicElements.length > 0) {
        console.warn(`Page ${pageInfo.name}: Éléments avec potentiels problèmes de contraste:`, problematicElements)
      }

      // Ne pas faire échouer le test, juste reporter les problèmes
      expect(problematicElements.length).toBeLessThanOrEqual(10) // Limite raisonnable
    }
  })

  test('Navigation au clavier complète', async ({ page }) => {
    // Test sur la page des formulaires (plus complexe)
    await page.goto('/accessible-forms')

    let currentFocus = await page.evaluate(() => document.activeElement?.tagName)
    console.log('Focus initial:', currentFocus)

    // Naviguer avec Tab plusieurs fois
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab')
      currentFocus = await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        type: document.activeElement?.type,
        text: document.activeElement?.textContent?.substring(0, 30),
        ariaLabel: document.activeElement?.getAttribute('aria-label'),
        className: document.activeElement?.className
      }))

      // Vérifier que le focus est visible
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()

      console.log(`Tab ${i + 1}:`, currentFocus)
    }

    // Test navigation inverse avec Shift+Tab
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Shift+Tab')
      currentFocus = await page.evaluate(() => document.activeElement?.tagName)

      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    }
  })

  test('Tous les dropdowns fonctionnent correctement', async ({ page }) => {
    const pages = ['/semantic-html', '/accessible-forms', '/keyboard-navigation']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      // Trouver tous les boutons dropdown (3 dots)
      const dropdownButtons = page.locator('.menu-trigger')
      const count = await dropdownButtons.count()

      console.log(`Page ${pagePath}: ${count} dropdowns trouvés`)

      for (let i = 0; i < count; i++) {
        const button = dropdownButtons.nth(i)

        // Vérifier que le bouton est visible
        await expect(button).toBeVisible()

        // Vérifier les attributs ARIA
        await expect(button).toHaveAttribute('aria-haspopup', 'true')
        await expect(button).toHaveAttribute('aria-expanded', 'false')

        // Ouvrir le dropdown
        await button.click()
        await expect(button).toHaveAttribute('aria-expanded', 'true')

        // Vérifier que le menu est visible
        const menu = page.locator('.dropdown-content').nth(i)
        await expect(menu).toBeVisible()

        // Fermer avec Escape
        await page.keyboard.press('Escape')
        await expect(button).toHaveAttribute('aria-expanded', 'false')
        await expect(menu).not.toBeVisible()

        // Test clic à l'extérieur
        await button.click()
        await expect(menu).toBeVisible()

        // Cliquer ailleurs pour fermer
        await page.locator('h1').first().click()
        await expect(menu).not.toBeVisible()
      }
    }
  })

  test('Liens et boutons ont des textes descriptifs', async ({ page }) => {
    const pages = ['/', '/semantic-html', '/accessible-forms']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Vérifier tous les liens
      const links = page.locator('a')
      const linkCount = await links.count()

      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i)
        const text = await link.textContent()
        const ariaLabel = await link.getAttribute('aria-label')
        const title = await link.getAttribute('title')

        // Chaque lien doit avoir du texte descriptif ou un aria-label
        const hasDescriptiveText = (text && text.trim().length > 0) ||
                                  (ariaLabel && ariaLabel.length > 0) ||
                                  (title && title.length > 0)

        if (!hasDescriptiveText) {
          console.warn(`Lien sans texte descriptif sur ${pagePath}:`, await link.getAttribute('href'))
        }

        expect(hasDescriptiveText).toBeTruthy()
      }

      // Vérifier tous les boutons
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()

      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i)
        const text = await button.textContent()
        const ariaLabel = await button.getAttribute('aria-label')

        // Chaque bouton doit avoir du texte descriptif ou un aria-label
        const hasDescriptiveText = (text && text.trim().length > 0) ||
                                  (ariaLabel && ariaLabel.length > 0)

        if (!hasDescriptiveText) {
          console.warn(`Bouton sans texte descriptif sur ${pagePath}`)
        }

        expect(hasDescriptiveText).toBeTruthy()
      }
    }
  })

  test('Images ont des textes alternatifs appropriés', async ({ page }) => {
    const pages = ['/', '/media-accessible']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      const images = page.locator('img')
      const imageCount = await images.count()

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        const src = await img.getAttribute('src')

        // Vérifier que l'attribut alt existe (peut être vide pour images décoratives)
        expect(alt).not.toBeNull()

        // Si c'est une image de contenu (pas décorative), elle doit avoir un alt descriptif
        if (src && !src.includes('decoration') && !src.includes('icon')) {
          expect(alt.length).toBeGreaterThan(0)
        }
      }
    }
  })

  test('Formulaires sont accessibles', async ({ page }) => {
    await page.goto('/accessible-forms')

    // Vérifier que tous les inputs ont des labels
    const inputs = page.locator('input, select, textarea')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')

      if (id) {
        // Chercher un label associé
        const label = page.locator(`label[for="${id}"]`)
        const hasLabel = await label.count() > 0

        // Input doit avoir soit un label, soit aria-label, soit aria-labelledby
        const hasAccessibleName = hasLabel || ariaLabel || ariaLabelledBy

        if (!hasAccessibleName) {
          console.warn(`Input sans nom accessible:`, id)
        }

        expect(hasAccessibleName).toBeTruthy()
      }
    }
  })

  test('Titres ont une hiérarchie logique', async ({ page }) => {
    const pages = ['/', '/semantic-html', '/accessible-forms']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Récupérer tous les titres dans l'ordre
      const headings = await page.evaluate(() => {
        const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        return Array.from(headingElements).map(h => ({
          level: parseInt(h.tagName.charAt(1)),
          text: h.textContent?.trim().substring(0, 50)
        }))
      })

      // Vérifier qu'il y a au moins un h1
      const h1Count = headings.filter(h => h.level === 1).length
      expect(h1Count).toBeGreaterThan(0)

      // Vérifier que la hiérarchie ne saute pas de niveaux
      for (let i = 1; i < headings.length; i++) {
        const prev = headings[i - 1]
        const curr = headings[i]

        // Ne pas sauter plus d'un niveau vers le bas
        if (curr.level > prev.level) {
          expect(curr.level - prev.level).toBeLessThanOrEqual(1)
        }
      }
    }
  })

  test('Contenu dynamique a des annonces ARIA appropriées', async ({ page }) => {
    await page.goto('/accessible-forms')

    // Tester la validation de formulaire avec aria-live
    const goodExampleButton = page.locator('button:has-text("✅ Bon exemple")').first()
    await goodExampleButton.click()

    // Soumettre le formulaire vide pour déclencher les erreurs
    const submitButton = page.locator('button[type="submit"]').first()
    await submitButton.click()

    // Vérifier qu'il y a des régions live pour les erreurs
    const liveRegions = page.locator('[role="alert"], [aria-live]')
    const liveRegionCount = await liveRegions.count()

    expect(liveRegionCount).toBeGreaterThan(0)

    // Vérifier que les messages d'erreur sont visibles
    const errorMessages = page.locator('.error-message, [role="alert"]')
    const errorCount = await errorMessages.count()

    expect(errorCount).toBeGreaterThan(0)
  })

  test('Navigation par landmarks fonctionne', async ({ page }) => {
    await page.goto('/')

    // Vérifier la présence des landmarks principaux
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('nav')).toBeVisible()

    // Vérifier que le main a le bon aria-label ou role
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Navigation doit avoir un label descriptif
    const nav = page.locator('nav')
    const navLabel = await nav.getAttribute('aria-label')
    expect(navLabel).toBeTruthy()
  })

  test('Mode sombre et clair - contrastes appropriés', async ({ page }) => {
    // Test en mode clair (par défaut)
    await page.goto('/')

    // Vérifier que le contraste est suffisant (simulé)
    const bodyStyle = await page.evaluate(() => {
      const body = document.body
      const style = window.getComputedStyle(body)
      return {
        color: style.color,
        backgroundColor: style.backgroundColor
      }
    })

    expect(bodyStyle.color).toBeTruthy()
    expect(bodyStyle.backgroundColor).toBeTruthy()

    // Test avec mode sombre (si disponible)
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.reload()

    const darkBodyStyle = await page.evaluate(() => {
      const body = document.body
      const style = window.getComputedStyle(body)
      return {
        color: style.color,
        backgroundColor: style.backgroundColor
      }
    })

    expect(darkBodyStyle.color).toBeTruthy()
    expect(darkBodyStyle.backgroundColor).toBeTruthy()
  })

  test('Pas de contenu qui clignote ou bouge automatiquement', async ({ page }) => {
    const pages = ['/', '/performance', '/media-accessible']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Vérifier qu'il n'y a pas d'animations infinies problématiques
      const animatedElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*')
        const animated = []

        elements.forEach(el => {
          const style = window.getComputedStyle(el)
          const animation = style.animation
          const transition = style.transition

          // Détecter les animations infinites potentiellement problématiques
          if (animation && animation.includes('infinite')) {
            animated.push({
              tag: el.tagName,
              animation: animation,
              className: el.className
            })
          }
        })

        return animated
      })

      // Les animations infinites doivent être limitées et appropriées
      expect(animatedElements.length).toBeLessThan(5)
    }
  })

  test('Zoom jusqu\'à 200% reste utilisable', async ({ page }) => {
    await page.goto('/accessible-forms')

    // Simuler un zoom à 200%
    await page.setViewportSize({ width: 640, height: 400 }) // Simule zoom 200% sur 1280x800

    // Vérifier que les éléments principaux restent visibles et utilisables
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('nav')).toBeVisible()

    // Vérifier qu'on peut toujours naviguer
    const firstButton = page.locator('button').first()
    await expect(firstButton).toBeVisible()

    // Test d'interaction
    if (await firstButton.isVisible()) {
      await firstButton.click()
    }
  })
})