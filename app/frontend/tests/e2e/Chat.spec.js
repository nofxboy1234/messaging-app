// @ts-check
import { test, expect } from '@playwright/test';
// import setup from '../../../../playwright-global-setup';

test.describe('when navigating to the Chat page', () => {
  test.beforeEach('Log in', async ({ page, request }) => {
    console.log('***');
    console.log('beforeEach');
    console.log('***');

    await request.get('http://localhost:3100/playwright_test_setup/seed');

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

  // test.afterEach('Clean up data', async ({ page }) => {
  //   await setup();
  // });

  test('should show the last message', async ({ page }) => {
    const lastMessage = page.getByText('last message');
    await expect(lastMessage).toBeVisible();
  });

  // test.describe('when sending a new message', () => {
  //   test('should show the new message', async ({ page }) => {
  //     const input = page.getByRole('textbox');
  //     const sendButton = page.getByRole('button', { name: 'Send' });
  //     await input.fill('new message');
  //     await sendButton.click();
  //     const newMessage = page.getByText('new message');
  //     await expect(newMessage).toBeVisible();
  //   });
  // });
});
