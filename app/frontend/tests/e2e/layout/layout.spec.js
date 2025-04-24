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

test('should show the navbar, current user chats, friends and all users', async ({
  page,
}) => {
  const homeLink = page.getByRole('link', { name: 'Home' });
  await expect(homeLink).toBeVisible();
  const friendsLink = page.getByRole('link', { name: 'Friends' });
  await expect(friendsLink).toBeVisible();
  const profileLink = page.getByRole('link', { name: 'Profile (user1)' });
  await expect(profileLink).toBeVisible();
  const logoutButton = page.getByRole('button', { name: 'Log out' });
  await expect(logoutButton).toBeVisible();

  const chats = page.getByText('CHATS-2');
  await expect(chats).toBeVisible();
  const chatIndex = page.getByTestId('chat-index');
  await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
  await expect(chatIndex.getByRole('link', { name: 'user5' })).toBeVisible();

  await expect(
    chatIndex.getByRole('link', { name: 'user1' }),
  ).not.toBeVisible();

  const friends = page.getByText('ALL FRIENDS-2');
  await expect(friends).toBeVisible();
  const friendIndex = page.getByTestId('friend-index');
  await expect(friendIndex.getByRole('link', { name: 'user4' })).toBeVisible();
  await expect(friendIndex.getByRole('link', { name: 'user5' })).toBeVisible();

  await expect(
    friendIndex.getByRole('link', { name: 'user1' }),
  ).not.toBeVisible();

  const users = page.getByText('USERS-6');
  await expect(users).toBeVisible();
  const userIndex = page.getByTestId('user-index');
  await expect(userIndex.getByRole('link', { name: 'user1' })).toBeVisible();
  await expect(userIndex.getByRole('link', { name: 'user2' })).toBeVisible();
  await expect(userIndex.getByRole('link', { name: 'user3' })).toBeVisible();
  await expect(userIndex.getByRole('link', { name: 'user4' })).toBeVisible();
  await expect(userIndex.getByRole('link', { name: 'user5' })).toBeVisible();
  await expect(userIndex.getByRole('link', { name: 'user6' })).toBeVisible();
});
