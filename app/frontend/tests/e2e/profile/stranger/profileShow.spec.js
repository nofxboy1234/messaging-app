import { expect } from '@playwright/test';
// import test from './setupShow';

import { execSync } from 'child_process';
import { test } from '@playwright/test';

const setup_test_data_except_users = async () => {
  execSync('RAILS_ENV=test rails playwright:setup_test_data_except_users', {
    stdio: 'inherit',
  });
};

const cleanup_test_data_except_users = async () => {
  execSync('RAILS_ENV=test rails playwright:cleanup_test_data_except_users', {
    stdio: 'inherit',
  });
};

test.beforeEach(async ({ page }) => {
  await setup_test_data_except_users();
  await page.goto('/profiles/6');
  await page.waitForURL('/profiles/6');
});

test.afterEach(async () => {
  await cleanup_test_data_except_users();
});

test.describe('when showing a friend profile', () => {
  test.beforeEach(async ({ page }) => {});

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
