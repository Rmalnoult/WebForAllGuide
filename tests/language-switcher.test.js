import { test, expect } from '@playwright/test';

test.describe('Language Switcher Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003/');
    await page.waitForLoadState('networkidle');
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Find the language switcher button
    const languageButton = page.getByRole('button', { name: /changer de langue|switch language/i });

    // Focus the button
    await languageButton.focus();

    // Verify button is focused
    await expect(languageButton).toBeFocused();

    // Open dropdown with Enter
    await page.keyboard.press('Enter');

    // Wait a bit for Vue reactivity
    await page.waitForTimeout(100);

    // Verify dropdown is open (aria-expanded should be true)
    await expect(languageButton).toHaveAttribute('aria-expanded', 'true');

    // Check if listbox is visible
    const listbox = page.getByRole('listbox', { name: /changer de langue|switch language/i });
    await expect(listbox).toBeVisible();

    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown');

    // Check if focus moved to first option
    const firstOption = listbox.getByRole('option').first();

    // Navigate down through options
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    // Press Enter to select
    await page.keyboard.press('Enter');

    // Verify dropdown closes
    await expect(languageButton).toHaveAttribute('aria-expanded', 'false');

    // Verify focus returns to button
    await expect(languageButton).toBeFocused();
  });

  test('should close with Escape key', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /changer de langue|switch language/i });

    await languageButton.click();
    await expect(languageButton).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(languageButton).toHaveAttribute('aria-expanded', 'false');

    // Focus should return to button
    await expect(languageButton).toBeFocused();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /changer de langue|switch language/i });

    // Check initial ARIA attributes
    await expect(languageButton).toHaveAttribute('aria-haspopup', 'listbox');
    await expect(languageButton).toHaveAttribute('aria-expanded', 'false');

    // Open dropdown
    await languageButton.click();

    // Check updated ARIA attributes
    await expect(languageButton).toHaveAttribute('aria-expanded', 'true');

    const controlsId = await languageButton.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();

    // Verify listbox has correct attributes
    const listbox = page.getByRole('listbox');
    await expect(listbox).toHaveAttribute('id', controlsId);
    await expect(listbox).toHaveAttribute('role', 'listbox');
  });

  test('should announce all language options', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /changer de langue|switch language/i });
    await languageButton.click();

    const listbox = page.getByRole('listbox');
    const options = listbox.getByRole('option');

    // Check that Portuguese is in the list
    const portugueseOption = listbox.getByRole('option', { name: /português/i });
    await expect(portugueseOption).toBeVisible();

    // Verify all expected languages are present
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(9); // fr, en, es, it, de, nl, ar, ja, pt
  });

  test('should support Home and End keys', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /changer de langue|switch language/i });
    await languageButton.click();

    // Press Home key
    await page.keyboard.press('Home');

    // First option should be focused (aria-activedescendant)
    const listbox = page.getByRole('listbox');
    const activeDescendant = await listbox.getAttribute('aria-activedescendant');
    expect(activeDescendant).toContain('language-option');

    // Press End key
    await page.keyboard.press('End');

    // Last option should be focused
    const newActiveDescendant = await listbox.getAttribute('aria-activedescendant');
    expect(newActiveDescendant).not.toBe(activeDescendant);
  });

  test('should trap focus within dropdown', async ({ page }) => {
    const languageButton = page.getByRole('button', { name: /changer de langue|switch language/i });
    await languageButton.click();

    // Tab should not move focus outside the dropdown
    // This is critical for accessibility
    await page.keyboard.press('Tab');

    // Verify dropdown is still open or focus is still within the component
    const expanded = await languageButton.getAttribute('aria-expanded');

    // If dropdown closed, that's a problem - Tab should stay within
    if (expanded === 'false') {
      throw new Error('Focus trap broken: Tab key closed the dropdown');
    }
  });
});
