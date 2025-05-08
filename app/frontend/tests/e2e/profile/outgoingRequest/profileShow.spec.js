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
  await page.goto('/profiles/2');
  await page.waitForURL('/profiles/2');
  await page.waitForLoadState();
});

test.afterEach(async () => {
  if (context) {
    await context.close();
    context = null;
  }
});

test.describe('when showing a profile with an outgoing request', () => {
  test('should show their profile info, and a cancel button', async () => {
    const profile = page.getByTestId('profile');
    await expect(profile.getByText('user2')).toBeVisible();
    await expect(profile.getByText('About Me:')).toBeVisible();

    const userActions = page.getByTestId('user-actions');
    await expect(
      userActions.getByRole('button', { name: 'Cancel' }),
    ).toBeVisible();
  });

  test('should show a Send button when clicking the Cancel button and accepting the popup', async () => {
    const userActions = page.getByTestId('user-actions');
    const cancelButton = userActions.getByRole('button', { name: 'Cancel' });

    await expect(cancelButton).toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Cancel friend request to user2?');
      await dialog.accept();
    });

    await cancelButton.click();

    await expect(cancelButton).not.toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Send' }),
    ).toBeVisible();
  });

  test('should not show a Send button when clicking the Cancel button and dismissing the popup', async () => {
    const userActions = page.getByTestId('user-actions');
    const cancelButton = userActions.getByRole('button', { name: 'Cancel' });

    await expect(cancelButton).toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Cancel friend request to user2?');
      await dialog.dismiss();
    });

    await cancelButton.click();

    await expect(cancelButton).toBeVisible();
    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Send' }),
    ).not.toBeVisible();
  });
});
