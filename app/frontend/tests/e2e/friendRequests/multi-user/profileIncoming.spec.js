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

test.describe('when accepting an incoming friend request and accepting the popup', () => {
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
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user3' }),
    ).toBeVisible();
    await expect(
      user1Page1.getByTestId('chat-index').getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();

    const user1Page2 = await user1Context.newPage();
    await user1Page2.goto('/profiles/3');
    await user1Page2.waitForURL('/profiles/3');
    await user1Page2.waitForLoadState();

    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Accept' }),
    ).toBeVisible();
    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Reject' }),
    ).toBeVisible();

    const user1Page3 = await user1Context.newPage();
    await user1Page3.goto('/friends');
    await user1Page3.waitForURL('/friends');
    await user1Page3.waitForLoadState();

    await expect(user1Page3.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      user1Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/3'),
    ).not.toBeVisible();

    user1Page2.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Accept friend request from user3?');
      await dialog.accept();
    });

    await user1Page2
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Accept' })
      .click();

    await expect(
      user1Page1
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();
    await expect(
      user1Page1.getByTestId('chat-index').getByRole('link', { name: 'user3' }),
    ).toBeVisible();

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

    await expect(user1Page3.getByText('ALL FRIENDS-3')).toBeVisible();
    await expect(
      user1Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/3'),
    ).toBeVisible();

    await user1Context.close();
  });

  test('should update receiver views related to sender', async ({
    browser,
    page: user1Page1,
  }) => {
    const user3Context = await browser.newContext();

    const user3SignIn = await user3Context.newPage();
    await user3SignIn.goto('/');
    await user3SignIn.waitForURL('/');
    await user3SignIn.waitForLoadState();

    await user3SignIn.getByRole('button', { name: 'Log out' }).click();
    await user3SignIn.waitForURL('/users/sign_in');

    await user3SignIn.getByLabel('Email:').fill('user3@example.com');
    await user3SignIn.getByLabel('Password:').fill('123456');
    await user3SignIn.getByRole('button', { name: 'Log in' }).click();
    await expect(user3SignIn.getByText('Profile (user3)')).toBeVisible();

    const user3Page1 = await user3Context.newPage();
    await user3Page1.goto('/pending_friends');
    await user3Page1.waitForURL('/pending_friends');
    await user3Page1.waitForLoadState();

    await expect(
      user3Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).toBeVisible();
    await expect(
      user3Page1.getByTestId('chat-index').getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    const user3Page2 = await user3Context.newPage();
    await user3Page2.goto('/profiles/1');
    await user3Page2.waitForURL('/profiles/1');
    await user3Page2.waitForLoadState();

    await expect(
      user3Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Cancel' }),
    ).toBeVisible();

    const user3Page3 = await user3Context.newPage();
    await user3Page3.goto('/friends');
    await user3Page3.waitForURL('/friends');
    await user3Page3.waitForLoadState();

    await expect(user3Page3.getByText('ALL FRIENDS-1')).toBeVisible();
    await expect(
      user3Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/1'),
    ).not.toBeVisible();

    user1Page1.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Accept friend request from user3?');
      await dialog.accept();
    });

    await user1Page1
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Accept' })
      .click();

    await expect(
      user3Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();
    await expect(
      user3Page1.getByTestId('chat-index').getByRole('link', { name: 'user1' }),
    ).toBeVisible();

    await expect(
      user3Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(
      user3Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Unfriend' }),
    ).toBeVisible();

    await expect(user3Page3.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      user3Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/1'),
    ).toBeVisible();

    await user3Context.close();
  });
});

test.describe('when rejecting an incoming friend request and accepting the popup', () => {
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
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user3' }),
    ).toBeVisible();
    await expect(
      user1Page1.getByTestId('chat-index').getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();

    const user1Page2 = await user1Context.newPage();
    await user1Page2.goto('/profiles/3');
    await user1Page2.waitForURL('/profiles/3');
    await user1Page2.waitForLoadState();

    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Accept' }),
    ).toBeVisible();
    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Reject' }),
    ).toBeVisible();

    const user1Page3 = await user1Context.newPage();
    await user1Page3.goto('/friends');
    await user1Page3.waitForURL('/friends');
    await user1Page3.waitForLoadState();

    await expect(user1Page3.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      user1Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/3'),
    ).not.toBeVisible();

    user1Page2.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Reject friend request from user3?');
      await dialog.accept();
    });

    await user1Page2
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Reject' })
      .click();

    await expect(
      user1Page1
        .getByTestId('incoming-friendrequests')
        .getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();
    await expect(
      user1Page1.getByTestId('chat-index').getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();

    await expect(
      user1Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Send' }),
    ).toBeVisible();

    await expect(user1Page3.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      user1Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/3'),
    ).not.toBeVisible();

    await user1Context.close();
  });

  test('should update receiver views related to sender', async ({
    browser,
    page: user1Page1,
  }) => {
    const user3Context = await browser.newContext();

    const user3SignIn = await user3Context.newPage();
    await user3SignIn.goto('/');
    await user3SignIn.waitForURL('/');
    await user3SignIn.waitForLoadState();

    await user3SignIn.getByRole('button', { name: 'Log out' }).click();
    await user3SignIn.waitForURL('/users/sign_in');

    await user3SignIn.getByLabel('Email:').fill('user3@example.com');
    await user3SignIn.getByLabel('Password:').fill('123456');
    await user3SignIn.getByRole('button', { name: 'Log in' }).click();
    await expect(user3SignIn.getByText('Profile (user3)')).toBeVisible();

    const user3Page1 = await user3Context.newPage();
    await user3Page1.goto('/pending_friends');
    await user3Page1.waitForURL('/pending_friends');
    await user3Page1.waitForLoadState();

    await expect(
      user3Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).toBeVisible();
    await expect(
      user3Page1.getByTestId('chat-index').getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    const user3Page2 = await user3Context.newPage();
    await user3Page2.goto('/profiles/1');
    await user3Page2.waitForURL('/profiles/1');
    await user3Page2.waitForLoadState();

    await expect(
      user3Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Cancel' }),
    ).toBeVisible();

    const user3Page3 = await user3Context.newPage();
    await user3Page3.goto('/friends');
    await user3Page3.waitForURL('/friends');
    await user3Page3.waitForLoadState();

    await expect(user3Page3.getByText('ALL FRIENDS-1')).toBeVisible();
    await expect(
      user3Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/1'),
    ).not.toBeVisible();

    user1Page1.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Reject friend request from user3?');
      await dialog.accept();
    });

    await user1Page1
      .getByTestId('user-actions')
      .getByRole('button', { name: 'Reject' })
      .click();

    await expect(
      user3Page1
        .getByTestId('outgoing-friendrequests')
        .getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();
    await expect(
      user3Page1.getByTestId('chat-index').getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    await expect(
      user3Page2
        .getByTestId('user-actions')
        .getByRole('button', { name: 'Send' }),
    ).toBeVisible();

    await expect(user3Page3.getByText('ALL FRIENDS-1')).toBeVisible();
    await expect(
      user3Page3
        .getByTestId('friend-index')
        .getByTestId('user-link-/profiles/1'),
    ).not.toBeVisible();

    await user3Context.close();
  });
});
