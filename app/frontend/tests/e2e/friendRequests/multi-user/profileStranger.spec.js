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
  await page.goto('/profiles/6');
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

  test('should update receiver views related to sender', async ({
    browser,
    page: user1Page1,
  }) => {
    const user6Context = await browser.newContext();

    const user6SignIn = await user6Context.newPage();
    await user6SignIn.goto('/');
    await user6SignIn.getByRole('button', { name: 'Log out' }).click();
    await user6SignIn.waitForURL('/users/sign_in');

    await user6SignIn.getByLabel('Email:').fill('user6@example.com');
    await user6SignIn.getByLabel('Password:').fill('123456');
    await user6SignIn.getByRole('button', { name: 'Log in' }).click();
    await expect(user6SignIn.getByText('Profile (user6)')).toBeVisible();

    const user6Page1 = await user6Context.newPage();
    await user6Page1.goto('/pending_friends');
    await expect(
      user6Page1
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    const user6Page2 = await user6Context.newPage();
    await user6Page2.goto('/profiles/1');
    await expect(
      user6Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Send' }),
    ).toBeVisible();

    user1Page1.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Send friend request to user6?');
      await dialog.accept();
    });

    await user1Page1
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Send' })
      .click();

    await expect(
      user6Page1
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).toBeVisible();

    await expect(
      user6Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Accept' }),
    ).toBeVisible();
    await expect(
      user6Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Reject' }),
    ).toBeVisible();
  });
});
