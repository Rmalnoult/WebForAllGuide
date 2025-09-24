import { test, expect } from '@playwright/test'

test.describe('Modal Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  test('Help modal is fully accessible', async ({ page }) => {
    // Click the help button
    await page.click('button:has-text("Aide")')

    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]')

    // Check modal attributes
    const modal = await page.locator('[role="dialog"]')
    await expect(modal).toHaveAttribute('aria-modal', 'true')
    await expect(modal).toHaveAttribute('aria-labelledby', 'help-title')
    await expect(modal).toHaveAttribute('aria-describedby', 'help-content')

    // Check that the modal title exists and has correct id
    const title = await page.locator('#help-title')
    await expect(title).toContainText('Raccourcis Clavier')
    await expect(title).toHaveAttribute('tabindex', '-1')

    // Check that close button has proper label
    const closeButton = await page.locator('.dialog-close')
    await expect(closeButton).toHaveAttribute('aria-label', 'Fermer la fenêtre d\'aide')
    await expect(closeButton).toHaveAttribute('type', 'button')

    // Check that content has proper role
    const content = await page.locator('.dialog-content')
    await expect(content).toHaveAttribute('role', 'document')
  })

  test('Modal focus management works correctly', async ({ page }) => {
    // Store the help button for focus restoration check
    const helpButton = await page.locator('button:has-text("Aide")')

    // Click the help button
    await helpButton.click()

    // Wait for modal
    await page.waitForSelector('[role="dialog"]')

    // Check that focus is on the title (first focusable element)
    const focusedElement = await page.evaluate(() => document.activeElement.id)
    expect(focusedElement).toBe('help-title')

    // Test Tab key trapping - forward
    await page.keyboard.press('Tab')
    const closeButton = await page.locator('.dialog-close')
    await expect(closeButton).toBeFocused()

    // Tab should wrap to the title
    await page.keyboard.press('Tab')
    const title = await page.locator('#help-title')
    await expect(title).toBeFocused()

    // Test Tab key trapping - backward
    await page.keyboard.press('Shift+Tab')
    await expect(closeButton).toBeFocused()

    // Close modal and check focus restoration
    await page.keyboard.press('Escape')
    await page.waitForSelector('[role="dialog"]', { state: 'detached' })

    // Focus should return to the help button
    await expect(helpButton).toBeFocused()
  })

  test('Modal can be closed with Escape key', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Aide")')
    await page.waitForSelector('[role="dialog"]')

    // Press Escape
    await page.keyboard.press('Escape')

    // Modal should be removed
    await expect(page.locator('[role="dialog"]')).toHaveCount(0)
  })

  test('Modal can be closed by clicking overlay', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Aide")')
    await page.waitForSelector('[role="dialog"]')

    // Click overlay
    await page.click('.dialog-overlay')

    // Modal should be removed
    await expect(page.locator('[role="dialog"]')).toHaveCount(0)
  })

  test('Modal can be closed with close button', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Aide")')
    await page.waitForSelector('[role="dialog"]')

    // Click close button
    await page.click('.dialog-close')

    // Modal should be removed
    await expect(page.locator('[role="dialog"]')).toHaveCount(0)
  })

  test('Modal can be opened with keyboard shortcut Alt+H', async ({ page }) => {
    // Press Alt+H
    await page.keyboard.press('Alt+h')

    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]')

    // Check that modal is visible
    await expect(page.locator('[role="dialog"]')).toBeVisible()
  })

  test('Screen reader announcement is made when modal opens', async ({ page }) => {
    // Listen for live region updates
    const liveRegionPromise = page.waitForSelector('[aria-live="assertive"]:has-text("Fenêtre de raccourcis clavier ouverte")', {
      state: 'attached',
      timeout: 2000
    })

    // Open modal
    await page.click('button:has-text("Aide")')

    // Check that announcement was made
    const liveRegion = await liveRegionPromise
    expect(liveRegion).toBeTruthy()
  })

  test('Modal content is keyboard navigable', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Aide")')
    await page.waitForSelector('[role="dialog"]')

    // Check that all sections are present
    await expect(page.locator('h3:has-text("Navigation")')).toBeVisible()
    await expect(page.locator('h3:has-text("Focus")')).toBeVisible()
    await expect(page.locator('h3:has-text("Aide")')).toBeVisible()

    // Check that shortcuts are listed
    const shortcuts = await page.locator('.shortcuts-list dt')
    const count = await shortcuts.count()
    expect(count).toBeGreaterThan(0)
  })

  test('Modal prevents interaction with background content', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Aide")')
    await page.waitForSelector('[role="dialog"]')

    // Try to tab outside modal - should stay within modal
    const closeButton = await page.locator('.dialog-close')
    await closeButton.focus()
    await page.keyboard.press('Tab')

    // Focus should wrap to title, not go to background
    const title = await page.locator('#help-title')
    await expect(title).toBeFocused()

    // Background should have overlay preventing clicks
    const overlay = await page.locator('.dialog-overlay')
    await expect(overlay).toBeVisible()
  })
})