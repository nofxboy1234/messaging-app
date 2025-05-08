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

let context;
let page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext({
    storageState: 'app/frontend/playwright/.auth/user.json',
  });
  page = await context.newPage();

  await setup_test_data_except_users();
  await page.goto('/profiles/6');
  await page.waitForURL('/profiles/6');
  await page.waitForLoadState();
});

test.afterEach(async () => {
  if (context) {
    await context.close();
    context = null;
  }
});

test.describe('when showing a friend profile', () => {
  test('should show their profile info, and a send button', async () => {
    const profile = page.getByTestId('profile');
    await expect(profile.getByText('user6')).toBeVisible();
    await expect(profile.getByText('About Me:')).toBeVisible();

    const userActions = page.getByTestId('user-actions');
    await expect(
      userActions.getByRole('button', { name: 'Send' }),
    ).toBeVisible();
  });

  test('should show a Cancel button on a user profile when clicking the Send button and accepting the popup', async () => {
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

  test('should not show a Cancel button on a user profile when clicking the Send button and dismissing the popup', async () => {
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
