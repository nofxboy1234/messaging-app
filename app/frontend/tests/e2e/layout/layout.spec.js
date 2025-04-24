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

function setup(page) {
  const homeLink = page.getByRole('link', { name: 'Home' });
  const friendsLink = page.getByRole('link', { name: 'Friends' });
  const profileLink = page.getByRole('link', { name: 'Profile (user1)' });
  const logoutButton = page.getByRole('button', { name: 'Log out' });
  const chatTotal = page.getByText('CHATS-2');
  const user1ChatLink = page
    .getByTestId('chat-index')
    .getByRole('link', { name: 'user1' });
  const user4ChatLink = page
    .getByTestId('chat-index')
    .getByRole('link', { name: 'user4' });
  const user5ChatLink = page
    .getByTestId('chat-index')
    .getByRole('link', { name: 'user5' });

  const friendTotal = page.getByText('ALL FRIENDS-2');
  const user1FriendLink = page
    .getByTestId('friend-index')
    .getByRole('link', { name: 'user1' });
  const user4FriendLink = page
    .getByTestId('friend-index')
    .getByRole('link', { name: 'user4' });
  const user5FriendLink = page
    .getByTestId('friend-index')
    .getByRole('link', { name: 'user5' });

  const userTotal = page.getByText('USERS-6');
  const user1UserLink = page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user1' });
  const user2UserLink = page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user2' });
  const user3UserLink = page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user3' });
  const user4UserLink = page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user4' });
  const user5UserLink = page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user5' });
  const user6UserLink = page
    .getByTestId('user-index')
    .getByRole('link', { name: 'user6' });

  return {
    homeLink,
    friendsLink,
    profileLink,
    logoutButton,
    chatTotal,
    user1ChatLink,
    user4ChatLink,
    user5ChatLink,
    friendTotal,
    user1FriendLink,
    user4FriendLink,
    user5FriendLink,
    userTotal,
    user1UserLink,
    user2UserLink,
    user3UserLink,
    user4UserLink,
    user5UserLink,
    user6UserLink,
  };
}

test('should show the navbar, current user chats, friends and all users', async ({
  page,
}) => {
  const {
    homeLink,
    friendsLink,
    profileLink,
    logoutButton,
    chatTotal,
    user1ChatLink,
    user4ChatLink,
    user5ChatLink,
    friendTotal,
    user1FriendLink,
    user4FriendLink,
    user5FriendLink,
    userTotal,
    user1UserLink,
    user2UserLink,
    user3UserLink,
    user4UserLink,
    user5UserLink,
    user6UserLink,
  } = setup(page);

  await expect(homeLink).toBeVisible();
  await expect(friendsLink).toBeVisible();
  await expect(profileLink).toBeVisible();
  await expect(logoutButton).toBeVisible();

  await expect(chatTotal).toBeVisible();
  await expect(user1ChatLink).not.toBeVisible();
  await expect(user4ChatLink).toBeVisible();
  await expect(user5ChatLink).toBeVisible();

  await expect(friendTotal).toBeVisible();
  await expect(user1FriendLink).not.toBeVisible();
  await expect(user4FriendLink).toBeVisible();
  await expect(user5FriendLink).toBeVisible();

  await expect(userTotal).toBeVisible();
  await expect(user1UserLink).toBeVisible();
  await expect(user2UserLink).toBeVisible();
  await expect(user3UserLink).toBeVisible();
  await expect(user4UserLink).toBeVisible();
  await expect(user5UserLink).toBeVisible();
  await expect(user6UserLink).toBeVisible();
});
