// @ts-check
import { test, expect } from '@playwright/test';

test.describe('when navigating to the Chat page', () => {
  test.beforeEach('Log in', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();

    const chatIndex = page.getByTestId('chat-index');
    const link = chatIndex.getByRole('link', { name: 'user5' });
    await link.click();
    const sendButton = page.getByRole('button', { name: 'Send' });
    await expect(sendButton).toBeVisible();
  });

  test('should show the last message', async ({ page }) => {
    const lastMessage = page.getByText('last message');
    await expect(lastMessage).toBeVisible();
  });
});
