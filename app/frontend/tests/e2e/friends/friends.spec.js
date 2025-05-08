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
  await page.goto('/friends');
  await page.waitForURL('/friends');
  await page.waitForLoadState();
});

test.afterEach(async () => {
  if (context) {
    await context.close();
    context = null;
  }
});

test('should show a chat and unfriend button when clicking a friend in the friend index', async () => {
  const friendIndex = page.getByTestId('friend-index');
  const user5 = friendIndex.getByTestId('user-link-/profiles/5');

  await user5.click();

  await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Unfriend' })).toBeVisible();
});

test.describe('when clicking the Unfriend button', () => {
  test('should show a popup message to confirm, and remove the friend and chat when accepting the popup', async () => {
    const chatIndex = page.getByTestId('chat-index');
    const friendIndex = page.getByTestId('friend-index');

    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user5' })).toBeVisible();

    await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/4'),
    ).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/5'),
    ).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Unfriend user5?');
      await dialog.accept();
    });

    await friendIndex.getByTestId('user-link-/profiles/5').click();
    const unfriend = page.getByRole('button', { name: 'Unfriend' });
    await unfriend.click();

    await expect(page.getByText('CHATS-1')).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
    await expect(
      chatIndex.getByRole('link', { name: 'user5' }),
    ).not.toBeVisible();

    await expect(page.getByText('ALL FRIENDS-1')).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/4'),
    ).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/5'),
    ).not.toBeVisible();
  });

  test('should show a popup message to confirm, and not remove the friend and chat when dismissing the popup', async () => {
    const chatIndex = page.getByTestId('chat-index');
    const friendIndex = page.getByTestId('friend-index');

    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user5' })).toBeVisible();

    await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/4'),
    ).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/5'),
    ).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Unfriend user5?');
      await dialog.dismiss();
    });

    await friendIndex.getByTestId('user-link-/profiles/5').click();
    const unfriend = page.getByRole('button', { name: 'Unfriend' });
    await unfriend.click();

    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user5' })).toBeVisible();

    await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/4'),
    ).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/5'),
    ).toBeVisible();
  });
});

test.describe('when clicking the Chat button', () => {
  test('should show a chat with the friend', async () => {
    const friendIndex = page.getByTestId('friend-index');
    await friendIndex.getByTestId('user-link-/profiles/5').click();
    await page.getByRole('button', { name: 'Chat' }).click();

    const chatShow = page.getByTestId('chat-show');
    const headerProfileLink = chatShow.getByTestId('user-link-/profiles/5');
    await expect(headerProfileLink).toBeVisible();

    const sendButton = page.getByRole('button', { name: 'Send' });
    await expect(sendButton).toBeVisible();
  });
});
