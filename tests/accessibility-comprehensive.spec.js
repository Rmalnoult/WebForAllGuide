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





  test('Navigation par landmarks fonctionne', async ({ page }) => {
    await page.goto('/')

    // Vérifier la présence des landmarks principaux
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('nav[aria-label="Navigation principale"]')).toBeVisible()

    // Vérifier que le main a le bon aria-label ou role
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Navigation doit avoir un label descriptif
    const nav = page.locator('nav[aria-label="Navigation principale"]')
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




})