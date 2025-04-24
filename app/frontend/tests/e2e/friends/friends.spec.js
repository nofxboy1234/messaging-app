import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

const setup_test_data = async () => {
  execSync('RAILS_ENV=test rails playwright:setup_test_data', {
    stdio: 'inherit',
  });
};

const cleanup_test_data = async () => {
  execSync('RAILS_ENV=test rails playwright:cleanup_test_data', {
    stdio: 'inherit',
  });
};

test.beforeEach(async ({ page }) => {
  await setup_test_data();

  await page.goto('/');
  await page.getByLabel('Email:').fill('user1@example.com');
  await page.getByLabel('Password:').fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test.afterEach(async () => {
  await cleanup_test_data();
});

test('should show a chat and unfriend button when clicking a friend in the friend index', async ({
  page,
}) => {
  const friendIndex = page.getByTestId('friend-index');
  const user5 = friendIndex.getByTestId('user-link-/profiles/5');

  await user5.click();

  await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Unfriend' })).toBeVisible();
});

test('should show a popup message to confirm, and remove the friend and chat when accepting the popup', async ({
  page,
}) => {
  const chatIndex = page.getByTestId('chat-index');
  const friendIndex = page.getByTestId('friend-index');

  await expect(page.getByText('CHATS-2')).toBeVisible();
  await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
  await expect(chatIndex.getByRole('link', { name: 'user5' })).toBeVisible();

  await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
  await expect(friendIndex.getByTestId('user-link-/profiles/4')).toBeVisible();
  await expect(friendIndex.getByTestId('user-link-/profiles/5')).toBeVisible();

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
  await expect(friendIndex.getByTestId('user-link-/profiles/4')).toBeVisible();
  await expect(
    friendIndex.getByTestId('user-link-/profiles/5'),
  ).not.toBeVisible();
});

test('should show a popup message to confirm, and not remove the friend and chat when dismissing the popup', async ({
  page,
}) => {
  const chatIndex = page.getByTestId('chat-index');
  const friendIndex = page.getByTestId('friend-index');

  await expect(page.getByText('CHATS-2')).toBeVisible();
  await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
  await expect(chatIndex.getByRole('link', { name: 'user5' })).toBeVisible();

  await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
  await expect(friendIndex.getByTestId('user-link-/profiles/4')).toBeVisible();
  await expect(friendIndex.getByTestId('user-link-/profiles/5')).toBeVisible();

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
  await expect(friendIndex.getByTestId('user-link-/profiles/4')).toBeVisible();
  await expect(friendIndex.getByTestId('user-link-/profiles/5')).toBeVisible();
});
