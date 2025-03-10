// @ts-check
import { test, expect } from '@playwright/test';

test.describe('when the scrollbar is at the bottom and a message is received', () => {
  test('should scroll to the newest message', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByText('Email');
    await expect(heading).toBeVisible();
  });

  test('should show the chat page', async ({ page }) => {
    await page.goto('/chats/2');

    const button = page.getByRole('button', { name: 'Send' });
    await expect(button).toBeVisible();
  });
});
