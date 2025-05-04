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
  await page.goto('/pending_friends');
  await page.waitForLoadState();
});

test.describe('when sending a friend request and accepting the popup', () => {
  test('should update sender views related to receiver', async ({
    browser,
  }) => {
    const user1Context = await browser.newContext();

    const user1Page1 = await user1Context.newPage();
    await user1Page1.goto('/pending_friends');
    await expect(
      user1Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user6' }),
    ).not.toBeVisible();

    const user1Page2 = await user1Context.newPage();
    await user1Page2.goto('/profiles/6');
    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Send' }),
    ).toBeVisible();

    user1Page2.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Send friend request to user6?');
      await dialog.accept();
    });

    await user1Page2
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Send' })
      .click();

    await expect(
      user1Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user6' }),
    ).toBeVisible();

    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Cancel' }),
    ).toBeVisible();
  });
});
