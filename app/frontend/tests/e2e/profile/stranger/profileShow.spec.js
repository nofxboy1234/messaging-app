import { expect } from '@playwright/test';
import setupTest from '../../setupTest';

const test = setupTest(async ({ page }) => {
  await page.goto('/profiles/6');
  await page.waitForURL('/profiles/6');
});

test.describe('when showing a friend profile', () => {
  test('should show their profile info, and a send button', async ({
    page,
  }) => {
    const profile = page.getByTestId('profile');
    await expect(profile.getByText('user6')).toBeVisible();
    await expect(profile.getByText('About Me:')).toBeVisible();

    const userActions = page.getByTestId('user-actions');
    await expect(
      userActions.getByRole('button', { name: 'Send' }),
    ).toBeVisible();
  });

  test('should show a Cancel button on a user profile when clicking the Send button and accepting the popup', async ({
    page,
  }) => {
    const userActions = page.getByTestId('user-actions');
    const sendButton = userActions.getByRole('button', { name: 'Send' });

    await expect(sendButton).toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Send friend request to user6?');
      await dialog.accept();
    });

    await sendButton.click();

    await expect(sendButton).not.toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Cancel' }),
    ).toBeVisible();
  });

  test('should not show a Cancel button on a user profile when clicking the Send button and dismissing the popup', async ({
    page,
  }) => {
    const userActions = page.getByTestId('user-actions');
    const sendButton = userActions.getByRole('button', { name: 'Send' });

    await expect(sendButton).toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Send friend request to user6?');
      await dialog.dismiss();
    });

    await sendButton.click();

    await expect(sendButton).toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();
  });
});
