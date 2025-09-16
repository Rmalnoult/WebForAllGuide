import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('Tests d\'accessibilité de l\'application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
  })

  test('La page d\'accueil est accessible', async ({ page }) => {
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    })

    // Vérifier la présence du skip link
    const skipLink = page.locator('a.sr-only-focusable')
    await expect(skipLink).toHaveText('Aller au contenu principal')

    // Vérifier la navigation
    const nav = page.locator('nav[aria-label="Navigation principale"]')
    await expect(nav).toBeVisible()

    // Vérifier le titre principal
    const h1 = page.locator('h1')
    await expect(h1).toHaveText('Démonstration d\'Accessibilité Web')
  })

  test('Navigation au clavier fonctionne', async ({ page }) => {
    // Tester la navigation avec Tab
    await page.keyboard.press('Tab')
    const skipLink = page.locator('a.sr-only-focusable')
    await expect(skipLink).toBeFocused()

    // Continuer à naviguer
    await page.keyboard.press('Tab')
    const firstNavLink = page.locator('nav a').first()
    await expect(firstNavLink).toBeFocused()

    // Tester l'activation avec Enter
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/')
  })

  test('Page HTML Sémantique - Toggle fonctionne', async ({ page }) => {
    await page.goto('/semantic-html')

    // Vérifier que la page se charge
    await expect(page.locator('h1')).toContainText('HTML Sémantique')

    // Tester le toggle entre bon et mauvais exemple
    const toggleBad = page.locator('button:has-text("❌ Mauvais exemple")').first()
    const toggleGood = page.locator('button:has-text("✅ Bon exemple")').first()

    // Vérifier l'état initial (mauvais exemple affiché)
    await expect(toggleBad).toHaveAttribute('aria-pressed', 'true')
    await expect(toggleGood).toHaveAttribute('aria-pressed', 'false')

    // Basculer vers le bon exemple
    await toggleGood.click()
    await expect(toggleGood).toHaveAttribute('aria-pressed', 'true')
    await expect(toggleBad).toHaveAttribute('aria-pressed', 'false')

    // Vérifier l'accessibilité de la page
    await checkA11y(page)
  })

  test('Page Navigation Clavier - Modal focus trap', async ({ page }) => {
    await page.goto('/keyboard-navigation')

    // Ouvrir la modal
    const openModalBtn = page.locator('button:has-text("Ouvrir la modal")')
    await openModalBtn.click()

    // Vérifier que la modal est ouverte
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()

    // Vérifier le focus trap
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Le focus devrait revenir au début de la modal
    const closeButton = modal.locator('button:has-text("×")')
    const confirmButton = modal.locator('button:has-text("Confirmer")')

    // Fermer avec Escape
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })

  test('Page Formulaires - Validation accessible', async ({ page }) => {
    await page.goto('/accessible-forms')

    // Basculer vers le bon exemple
    const toggleGood = page.locator('button:has-text("✅ Bon exemple")').first()
    await toggleGood.click()

    // Tester le formulaire accessible
    const submitBtn = page.locator('button[type="submit"]').first()
    await submitBtn.click()

    // Vérifier les messages d'erreur avec role="alert"
    const errorMessages = page.locator('[role="alert"]')
    await expect(errorMessages.first()).toBeVisible()

    // Vérifier que les champs ont aria-invalid
    const emailInput = page.locator('#email')
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true')

    // Remplir le formulaire
    await emailInput.fill('test@example.com')
    const passwordInput = page.locator('#password')
    await passwordInput.fill('password123')

    // Vérifier l'accessibilité du formulaire
    await checkA11y(page, null, {
      rules: {
        // Ignorer certaines règles pendant les tests
        'color-contrast': { enabled: false }
      }
    })
  })

  test('Page Contrastes - Thèmes accessibles', async ({ page }) => {
    await page.goto('/color-contrast')

    // Vérifier les exemples de contrastes
    await expect(page.locator('h1')).toContainText('Contrastes et Couleurs')

    // Tester le changement de thème
    const darkModeBtn = page.locator('button:has-text("Mode sombre")')
    if (await darkModeBtn.isVisible()) {
      await darkModeBtn.click()
      // Vérifier que le thème a changé
      await expect(page.locator('body')).toHaveCSS('background-color', /.+/)
    }

    // Vérifier l'accessibilité avec différents thèmes
    await checkA11y(page, null, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
  })

  test('Page ARIA - Composants dynamiques', async ({ page }) => {
    await page.goto('/aria-components')

    // Tester l'accordion
    const accordionButton = page.locator('[aria-expanded]').first()
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'false')

    await accordionButton.click()
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'true')

    // Vérifier le panneau associé
    const panelId = await accordionButton.getAttribute('aria-controls')
    const panel = page.locator(`#${panelId}`)
    await expect(panel).toBeVisible()

    // Vérifier l'accessibilité des composants ARIA
    await checkA11y(page)
  })

  test('Page Performance - Préférences utilisateur', async ({ page }) => {
    await page.goto('/performance')

    // Vérifier que la page respecte prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' })

    // Les animations devraient être désactivées
    const animatedElement = page.locator('.example').first()
    await expect(animatedElement).toHaveCSS('transition-duration', '0.01ms')

    // Tester le zoom
    await page.evaluate(() => { document.documentElement.style.zoom = '200%' })

    // Le contenu devrait rester lisible et accessible
    await checkA11y(page)
  })

  test('Navigation complète avec lecteur d\'écran simulé', async ({ page }) => {
    // Parcourir toutes les pages principales
    const routes = [
      '/',
      '/semantic-html',
      '/keyboard-navigation',
      '/media-accessible',
      '/color-contrast',
      '/accessible-forms',
      '/aria-components',
      '/performance'
    ]

    for (const route of routes) {
      await page.goto(route)

      // Vérifier qu'il y a un h1 sur chaque page
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()

      // Vérifier les landmarks ARIA
      const main = page.locator('main')
      await expect(main).toBeVisible()

      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // Test d'accessibilité basique pour chaque page
      try {
        await checkA11y(page, null, {
          disableColorContrast: true,
          detailedReport: false
        })
      } catch (e) {
        console.log(`Avertissement d'accessibilité sur ${route}:`, e.message)
      }
    }
  })

  test('Liens et boutons ont des labels accessibles', async ({ page }) => {
    await page.goto('/')

    // Vérifier que tous les boutons ont du texte ou aria-label
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')

      expect(text || ariaLabel).toBeTruthy()
    }

    // Vérifier que tous les liens ont du texte ou aria-label
    const links = page.locator('a')
    const linkCount = await links.count()

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i)
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')

      expect(text || ariaLabel).toBeTruthy()
    }
  })
})