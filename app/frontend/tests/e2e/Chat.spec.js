// @ts-check
import { test, expect } from '@playwright/test';

test.describe('when the scrollbar is at the bottom and a message is received', () => {
  test('should scroll to the newest message', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByText('Email');
    await expect(heading).toBeVisible();
  });

  test('should show the chat page', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();

    // await page.goto('/chats/2');
  });
});
