import { expect, test } from '@playwright/test';
import { execSync } from 'child_process';

const setup_test_data_except_users = async () => {
  return new Promise((resolve) => {
    execSync('RAILS_ENV=test rails playwright:setup_test_data_except_users', {
      stdio: 'inherit',
    });
    resolve();
  });
};

test.beforeEach(async ({ page }) => {
  await setup_test_data_except_users();
  await page.goto('/profiles/3');
  await page.waitForURL('/profiles/3');
  await page.waitForLoadState();
});

test.describe('when showing a profile with an incoming friend request', () => {
  test('should show their profile info, an Accept button, a Reject button', async ({
    page,
  }) => {
    const profile = page.getByTestId('profile');
    await expect(profile.getByText('user3')).toBeVisible();
    await expect(profile.getByText('About Me:')).toBeVisible();

    const userActions = page.getByTestId('user-actions');
    await expect(
      userActions.getByRole('button', { name: 'Accept' }),
    ).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Reject' }),
    ).toBeVisible();
  });

  test.describe('when clicking the Accept button', () => {
    test('should add the friend to chat index and show a Chat button, Unfriend button when accepting the popup', async ({
      page,
    }) => {
      const chatIndex = page.getByTestId('chat-index');
      const userActions = page.getByTestId('user-actions');
      const user3ChatLink = chatIndex.getByRole('link', { name: 'user3' });

      await expect(page.getByText('CHATS-2')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Accept' }),
      ).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Reject' }),
      ).toBeVisible();
      await expect(user3ChatLink).not.toBeVisible();

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Accept friend request from user3?');
        await dialog.accept();
      });

      await userActions.getByRole('button', { name: 'Accept' }).click();

      await expect(page.getByText('CHATS-3')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Chat' }),
      ).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Unfriend' }),
      ).toBeVisible();
      await expect(user3ChatLink).toBeVisible();
    });

    test('should show an Accept and Reject button when dismissing the popup', async ({
      page,
    }) => {
      const chatIndex = page.getByTestId('chat-index');
      const userActions = page.getByTestId('user-actions');
      const user3ChatLink = chatIndex.getByRole('link', { name: 'user3' });

      await expect(page.getByText('CHATS-2')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Accept' }),
      ).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Reject' }),
      ).toBeVisible();
      await expect(user3ChatLink).not.toBeVisible();

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Accept friend request from user3?');
        await dialog.dismiss();
      });

      await userActions.getByRole('button', { name: 'Accept' }).click();

      await expect(page.getByText('CHATS-2')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Accept' }),
      ).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Reject' }),
      ).toBeVisible();
      await expect(user3ChatLink).not.toBeVisible();
    });
  });

  test.describe('when clicking the Reject button', () => {
    test('should show a Send button when accepting the popup', async ({
      page,
    }) => {
      const chatIndex = page.getByTestId('chat-index');
      const userActions = page.getByTestId('user-actions');
      const user3ChatLink = chatIndex.getByRole('link', { name: 'user3' });

      await expect(page.getByText('CHATS-2')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Accept' }),
      ).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Reject' }),
      ).toBeVisible();
      await expect(user3ChatLink).not.toBeVisible();

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Reject friend request from user3?');
        await dialog.accept();
      });

      await userActions.getByRole('button', { name: 'Reject' }).click();

      await expect(page.getByText('CHATS-2')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Send' }),
      ).toBeVisible();
      await expect(user3ChatLink).not.toBeVisible();
    });

    test('should show an Accept and Reject button when dismissing the popup', async ({
      page,
    }) => {
      const chatIndex = page.getByTestId('chat-index');
      const userActions = page.getByTestId('user-actions');
      const user3ChatLink = chatIndex.getByRole('link', { name: 'user3' });

      await expect(page.getByText('CHATS-2')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Accept' }),
      ).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Reject' }),
      ).toBeVisible();
      await expect(user3ChatLink).not.toBeVisible();

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Reject friend request from user3?');
        await dialog.dismiss();
      });

      await userActions.getByRole('button', { name: 'Reject' }).click();

      await expect(page.getByText('CHATS-2')).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Accept' }),
      ).toBeVisible();
      await expect(
        userActions.getByRole('button', { name: 'Reject' }),
      ).toBeVisible();
      await expect(user3ChatLink).not.toBeVisible();
    });
  });
});
