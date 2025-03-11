// @ts-check
import { test, expect } from '@playwright/test';

test.describe('when the scrollbar is at the bottom and a message is received', () => {
  test.beforeEach('Log in', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();
  });

  test('should show the chat page', async ({ page }) => {
    const chatIndex = page.getByTestId('chat-index');
    const link = chatIndex.getByRole('link', { name: 'user2' });
    await link.click();
    const sendButton = page.getByRole('button', { name: 'Send' });
    await expect(sendButton).toBeVisible();
  });
});
