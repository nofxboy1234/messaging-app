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
  await page.goto('/profiles/4');
  await page.waitForURL('/profiles/4');
  await page.waitForLoadState();
});

test.afterEach(async () => {
  if (context) {
    await context.close();
    context = null;
  }
});

test.describe('when unfriending a friend and accepting the popup', () => {
  test('should update sender views related to receiver', async ({
    browser,
  }) => {
    const user1Context = await browser.newContext();

    const user1Page1 = await user1Context.newPage();
    await user1Page1.goto('/friends');
    await user1Page1.waitForURL('/friends');
    await user1Page1.waitForLoadState();

    await expect(user1Page1.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      user1Page1
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/4'),
    ).toBeVisible();
    await expect(
      user1Page1.getByTestId('chat-index').getByRole('link', { name: 'user4' }),
    ).toBeVisible();

    const user1Page2 = await user1Context.newPage();
    await user1Page2.goto('/profiles/4');
    await user1Page2.waitForURL('/profiles/4');
    await user1Page2.waitForLoadState();

    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Unfriend' }),
    ).toBeVisible();

    user1Page2.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Unfriend user4?');
      await dialog.accept();
    });

    await user1Page2
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Unfriend' })
      .click();

    await expect(user1Page1.getByText('ALL FRIENDS-1')).toBeVisible();
    await expect(
      user1Page1
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/4'),
    ).not.toBeVisible();
    await expect(
      user1Page1.getByTestId('chat-index').getByRole('link', { name: 'user4' }),
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
  }) => {
    const user1Page1 = page;
    const user4Context = await browser.newContext();

    const user4SignIn = await user4Context.newPage();
    await user4SignIn.goto('/');
    await user4SignIn.waitForURL('/');
    await user4SignIn.waitForLoadState();

    await user4SignIn.getByRole('button', { name: 'Log out' }).click();
    await user4SignIn.waitForURL('/users/sign_in');

    await user4SignIn.getByLabel('Email:').fill('user4@example.com');
    await user4SignIn.getByLabel('Password:').fill('123456');
    await user4SignIn.getByRole('button', { name: 'Log in' }).click();
    await expect(user4SignIn.getByText('Profile (user4)')).toBeVisible();

    const user4Page1 = await user4Context.newPage();
    await user4Page1.goto('/friends');
    await user4Page1.waitForURL('/friends');
    await user4Page1.waitForLoadState();

    await expect(user4Page1.getByText('ALL FRIENDS-1')).toBeVisible();
    await expect(
      user4Page1
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/1'),
    ).toBeVisible();
    await expect(
      user4Page1.getByTestId('chat-index').getByRole('link', { name: 'user1' }),
    ).toBeVisible();

    const user4Page2 = await user4Context.newPage();
    await user4Page2.goto('/profiles/1');
    await user4Page2.waitForURL('/profiles/1');
    await user4Page2.waitForLoadState();

    await expect(
      user4Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(
      user4Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Unfriend' }),
    ).toBeVisible();

    user1Page1.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Unfriend user4?');
      await dialog.accept();
    });

    await user1Page1
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Unfriend' })
      .click();

    await expect(user4Page1.getByText('ALL FRIENDS-0')).toBeVisible();
    await expect(
      user4Page1
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/1'),
    ).not.toBeVisible();
    await expect(
      user4Page1.getByTestId('chat-index').getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    await expect(
      user4Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Send' }),
    ).toBeVisible();

    await user4Context.close();
  });
});
