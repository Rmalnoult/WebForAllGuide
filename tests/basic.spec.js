import { test, expect } from '@playwright/test'

test.describe('Tests de base de l\'application', () => {
  test('Application démarre et navigation fonctionne', async ({ page }) => {
    // Aller à la page d'accueil
    await page.goto('/')

    // Vérifier le titre principal - use first() to avoid strict mode
    await expect(page.locator('h1').first()).toContainText('Accessibilité Web')

    // Vérifier la navigation principale
    const nav = page.locator('nav[aria-label="Navigation principale"]')
    await expect(nav).toBeVisible()

    // Naviguer vers la page HTML Sémantique
    await page.click('text=HTML Sémantique')
    await expect(page).toHaveURL('/semantic-html')
    await expect(page.locator('.page-title').first()).toContainText('HTML Sémantique')

    // Naviguer vers la page Navigation Clavier
    await page.click('text=Navigation Clavier')
    await expect(page).toHaveURL('/keyboard-navigation')
    await expect(page.locator('.page-title').first()).toContainText('Navigation Clavier')

    // Naviguer vers la page Formulaires
    await page.click('text=Formulaires')
    await expect(page).toHaveURL('/accessible-forms')
    await expect(page.locator('.page-title').first()).toContainText('Formulaires')
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

      // Vérifier qu'il y a un titre h1 - use first() to avoid strict mode
      const h1 = page.locator('h1').first()
      await expect(h1).toBeVisible()

      // Vérifier que le titre contient un mot clé attendu
      const h1Text = await h1.textContent()
      expect(h1Text.toLowerCase()).toContain(route.title.split(' ')[0].toLowerCase())
    }
  })
})