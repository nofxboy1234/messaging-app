import createLayout from './layoutPage';
import { expect } from '@playwright/test';
import test from './setupTest';

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
