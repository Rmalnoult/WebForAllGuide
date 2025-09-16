import { test, expect } from '@playwright/test'

test.describe('Tests de base de l\'application', () => {
  test('Application démarre et navigation fonctionne', async ({ page }) => {
    // Aller à la page d'accueil
    await page.goto('/')

    // Vérifier le titre principal
    await expect(page.locator('h1')).toContainText('Accessibilité Web')

    // Vérifier la navigation principale
    const nav = page.locator('nav[aria-label="Navigation principale"]')
    await expect(nav).toBeVisible()

    // Naviguer vers la page HTML Sémantique
    await page.click('text=HTML Sémantique')
    await expect(page).toHaveURL('/semantic-html')
    await expect(page.locator('h1')).toContainText('HTML Sémantique')

    // Naviguer vers la page Navigation Clavier
    await page.click('text=Navigation Clavier')
    await expect(page).toHaveURL('/keyboard-navigation')
    await expect(page.locator('h1')).toContainText('Navigation Clavier')

    // Naviguer vers la page Formulaires
    await page.click('text=Formulaires')
    await expect(page).toHaveURL('/accessible-forms')
    await expect(page.locator('h1')).toContainText('Formulaires Accessibles')
  })

  test('Toggle entre bon et mauvais exemples fonctionne', async ({ page }) => {
    await page.goto('/semantic-html')

    // Trouver le premier toggle
    const exampleToggle = page.locator('.example-toggle').first()
    await expect(exampleToggle).toBeVisible()

    // Vérifier que le mauvais exemple est affiché par défaut
    const badExample = exampleToggle.locator('.bad-example')
    await expect(badExample).toBeVisible()

    // Cliquer sur le bouton "Bon exemple"
    const goodButton = exampleToggle.locator('button:has-text("✅ Bon exemple")')
    await goodButton.click()

    // Vérifier que le bon exemple est maintenant affiché
    const goodExample = exampleToggle.locator('.good-example')
    await expect(goodExample).toBeVisible()

    // Vérifier que le mauvais exemple n'est plus visible
    await expect(badExample).not.toBeVisible()
  })

  test('Navigation au clavier avec Tab fonctionne', async ({ page }) => {
    await page.goto('/')

    // Appuyer sur Tab pour accéder au skip link
    await page.keyboard.press('Tab')

    // Le skip link devrait être focusé
    const skipLink = page.locator('a.sr-only-focusable')
    await expect(skipLink).toBeFocused()

    // Continuer à naviguer avec Tab
    await page.keyboard.press('Tab')

    // Le premier lien de navigation devrait être focusé
    const firstNavLink = page.locator('nav a').first()
    await expect(firstNavLink).toBeFocused()
  })

  test('Modal s\'ouvre et se ferme correctement', async ({ page }) => {
    await page.goto('/keyboard-navigation')

    // Chercher un bouton pour ouvrir une modal
    const modalButtons = page.locator('button:has-text("modal")')
    const modalButtonCount = await modalButtons.count()

    if (modalButtonCount > 0) {
      // Cliquer sur le premier bouton modal trouvé
      await modalButtons.first().click()

      // Vérifier qu'une modal est visible
      const modal = page.locator('[role="dialog"]')
      await expect(modal).toBeVisible({ timeout: 5000 })

      // Fermer avec Escape
      await page.keyboard.press('Escape')

      // Vérifier que la modal est fermée
      await expect(modal).not.toBeVisible()
    }
  })

  test('Formulaire avec validation fonctionne', async ({ page }) => {
    await page.goto('/accessible-forms')

    // Basculer vers le bon exemple
    const goodButton = page.locator('button:has-text("✅ Bon exemple")').first()
    await goodButton.click()

    // Attendre que le formulaire soit visible
    await page.waitForTimeout(500)

    // Essayer de soumettre le formulaire vide
    const submitButtons = page.locator('button[type="submit"]')
    const submitButtonCount = await submitButtons.count()

    if (submitButtonCount > 0) {
      await submitButtons.first().click()

      // Vérifier qu'il y a des messages d'erreur
      const errorMessages = page.locator('[role="alert"], .error-message')
      const errorCount = await errorMessages.count()
      expect(errorCount).toBeGreaterThan(0)
    }
  })

  test('Les pages principales se chargent sans erreur', async ({ page }) => {
    const routes = [
      { path: '/', title: 'Accessibilité Web' },
      { path: '/semantic-html', title: 'HTML Sémantique' },
      { path: '/keyboard-navigation', title: 'Navigation Clavier' },
      { path: '/media-accessible', title: 'Médias Accessibles' },
      { path: '/color-contrast', title: 'Contrastes' },
      { path: '/accessible-forms', title: 'Formulaires' },
      { path: '/aria-components', title: 'ARIA' },
      { path: '/performance', title: 'Performance' }
    ]

    for (const route of routes) {
      await page.goto(route.path)

      // Vérifier qu'il y a un titre h1
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()

      // Vérifier que le titre contient un mot clé attendu
      const h1Text = await h1.textContent()
      expect(h1Text.toLowerCase()).toContain(route.title.split(' ')[0].toLowerCase())
    }
  })
})