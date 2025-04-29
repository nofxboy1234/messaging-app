import { expect } from '@playwright/test';
import test from '../setupTest';
import createLayout from './layoutPage';

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

  await expect(layout.allUserTotal).toBeVisible();
  await expect(layout.user1UserLink).toBeVisible();
  await expect(layout.user2UserLink).toBeVisible();
  await expect(layout.user3UserLink).toBeVisible();
  await expect(layout.user4UserLink).toBeVisible();
  await expect(layout.user5UserLink).toBeVisible();
  await expect(layout.user6UserLink).toBeVisible();
});

test.describe('when clicking on the Home link', () => {
  test('should show the friend index page', async ({ page }) => {
    const layout = createLayout(page);

    await layout.homeLink.click();

    await expect(layout.friendTotal).toBeVisible();
  });
});

test.describe('when clicking on the Friends link', () => {
  test('should show the friend index', async ({ page }) => {
    const layout = createLayout(page);

    await layout.friendsLink.click();

    await expect(layout.friendTotal).toBeVisible();
  });
});

test.describe('when clicking on the Profile link', () => {
  test('should show the current user profile', async ({ page }) => {
    const layout = createLayout(page);

    await layout.profileLink.click();

    const profile = page.getByTestId('profile');
    await expect(profile.getByText('user1')).toBeVisible();
    await expect(profile.getByText('About Me:')).toBeVisible();

    const profileActions = page.getByTestId('profile-actions');
    await expect(
      profileActions.getByRole('button', { name: 'Edit' }),
    ).toBeVisible();
    await expect(
      profileActions.getByRole('link', { name: 'Update avatar' }),
    ).toBeVisible();
  });
});

test.describe('when clicking on the Log out button', () => {
  test('should show the login page with a flash message', async ({ page }) => {
    const layout = createLayout(page);

    await layout.logoutButton.click();

    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByText('Signed out successfully.')).toBeVisible();
  });
});

test.describe('when clicking on a chat link', () => {
  test('should show the chat', async ({ page }) => {
    const layout = createLayout(page);

    await layout.user4ChatLink.click();

    await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
    await expect(page.getByText('USERS-2')).toBeVisible();
  });
});

test.describe('when clicking on a user link', () => {
  test('should show a user profile', async ({ page }) => {
    const layout = createLayout(page);

    await layout.user4UserLink.click();

    const profile = page.getByTestId('profile');
    await expect(profile.getByText('user4')).toBeVisible();
    await expect(profile.getByText('About Me:')).toBeVisible();

    const userActions = page.getByTestId('user-actions');
    await expect(
      userActions.getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Unfriend' }),
    ).toBeVisible();
  });
});
