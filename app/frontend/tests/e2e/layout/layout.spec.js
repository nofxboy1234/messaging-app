import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import createLayout from './layoutPage';

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
  const layout = createLayout(page);

  await expect(layout.homeLink).toBeVisible();
  await expect(layout.friendsLink).toBeVisible();
  await expect(layout.profileLink).toBeVisible();
  await expect(layout.logoutButton).toBeVisible();

  await expect(layout.chatTotal).toBeVisible();
  await expect(layout.user1ChatLink).not.toBeVisible();
  await expect(layout.user4ChatLink).toBeVisible();
  await expect(layout.user5ChatLink).toBeVisible();

  await expect(layout.friendTotal).toBeVisible();
  await expect(layout.user1FriendLink).not.toBeVisible();
  await expect(layout.user4FriendLink).toBeVisible();
  await expect(layout.user5FriendLink).toBeVisible();

  await expect(layout.userTotal).toBeVisible();
  await expect(layout.user1UserLink).toBeVisible();
  await expect(layout.user2UserLink).toBeVisible();
  await expect(layout.user3UserLink).toBeVisible();
  await expect(layout.user4UserLink).toBeVisible();
  await expect(layout.user5UserLink).toBeVisible();
  await expect(layout.user6UserLink).toBeVisible();
});
