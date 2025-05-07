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
  await page.waitForURL('/pending_friends');
  await page.waitForLoadState();
});

test.describe('when canceling an outgoing friend request and accepting the popup', () => {
  test('should update sender views related to receiver', async ({
    browser,
  }) => {
    const user1Context = await browser.newContext();

    const user1Page1 = await user1Context.newPage();
    await user1Page1.goto('/pending_friends');
    await user1Page1.waitForURL('/pending_friends');
    await user1Page1.waitForLoadState();

    await expect(
      user1Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user2' }),
    ).toBeVisible();

    const user1Page2 = await user1Context.newPage();
    await user1Page2.goto('/profiles/2');
    await user1Page2.waitForURL('/profiles/2');
    await user1Page2.waitForLoadState();

    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Cancel' }),
    ).toBeVisible();

    user1Page1.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Cancel friend request to user2?');
      await dialog.accept();
    });

    await user1Page1
      .getByTestId('outgoing-friendrequests')
      .getByRole('button', { name: 'Cancel' })
      .click();

    await expect(
      user1Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user2' }),
    ).not.toBeVisible();

    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Send' }),
    ).toBeVisible();

    await user1Context.close();
  });

  test('should update receiver views related to sender', async ({
    browser,
    page: user1Page1,
  }) => {
    const user2Context = await browser.newContext();

    const user2SignIn = await user2Context.newPage();
    await user2SignIn.goto('/');
    await user2SignIn.waitForURL('/');
    await user2SignIn.waitForLoadState();

    await user2SignIn.getByRole('button', { name: 'Log out' }).click();
    await user2SignIn.waitForURL('/users/sign_in');

    await user2SignIn.getByLabel('Email:').fill('user2@example.com');
    await user2SignIn.getByLabel('Password:').fill('123456');
    await user2SignIn.getByRole('button', { name: 'Log in' }).click();
    await expect(user2SignIn.getByText('Profile (user2)')).toBeVisible();

    const user2Page1 = await user2Context.newPage();
    await user2Page1.goto('/pending_friends');
    await user2Page1.waitForURL('/pending_friends');
    await user2Page1.waitForLoadState();

    await expect(
      user2Page1
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).toBeVisible();

    const user2Page2 = await user2Context.newPage();
    await user2Page2.goto('/profiles/1');
    await user2Page2.waitForURL('/profiles/1');
    await user2Page2.waitForLoadState();

    await expect(
      user2Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Accept' }),
    ).toBeVisible();
    await expect(
      user2Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Reject' }),
    ).toBeVisible();

    user1Page1.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Cancel friend request to user2?');
      await dialog.accept();
    });

    await user1Page1
      .getByTestId('outgoing-friendrequests')
      .getByRole('button', { name: 'Cancel' })
      .click();

    await expect(
      user2Page1
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    await expect(
      user2Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Send' }),
    ).toBeVisible();

    await user2Context.close();
  });
});
