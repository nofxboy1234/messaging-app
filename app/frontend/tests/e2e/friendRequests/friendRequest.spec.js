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

test.beforeEach(async ({ page }) => {
  await page.getByRole('link', { name: 'Friends' }).click();
});

test('should show incoming and outgoing friends requests friends when clicking Pending', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Pending' }).click();

  await expect(page.getByText('Outgoing Friend Requests')).toBeVisible();
  await expect(page.getByText('Incoming Friend Requests')).toBeVisible();

  const outgoingFriendRequests = page.getByTestId('outgoing-friendrequests');
  await expect(
    outgoingFriendRequests.getByRole('link', { name: 'user2' }),
  ).toBeVisible();
  await expect(
    outgoingFriendRequests.getByRole('button', { name: 'Cancel' }),
  ).toBeVisible();

  const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
  await expect(
    incomingFriendRequests.getByRole('link', { name: 'user3' }),
  ).toBeVisible();
  await expect(
    incomingFriendRequests.getByRole('button', { name: 'Accept' }),
  ).toBeVisible();
  await expect(
    incomingFriendRequests.getByRole('button', { name: 'Reject' }),
  ).toBeVisible();
});

test('should remove the user from outgoing friend requests when cancelling a friend request', async ({
  page,
}) => {
  const outgoingFriendRequests = page.getByTestId('outgoing-friendrequests');

  await page.getByRole('link', { name: 'Pending' }).click();

  await expect(
    outgoingFriendRequests.getByRole('link', { name: 'user2' }),
  ).toBeVisible();

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Cancel friend request to user2?');
    await dialog.accept();
  });

  await outgoingFriendRequests.getByRole('button', { name: 'Cancel' }).click();

  await expect(
    outgoingFriendRequests.getByRole('link', { name: 'user2' }),
  ).not.toBeVisible();
});

test('should remove the user from incoming friend requests and add the user chat to chat index when accepting an incoming friend request', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Pending' }).click();

  const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
  const chatIndex = page.getByTestId('chat-index');

  await expect(
    incomingFriendRequests.getByRole('link', { name: 'user3' }),
  ).toBeVisible();
  await expect(
    chatIndex.getByRole('link', { name: 'user3' }),
  ).not.toBeVisible();

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Accept friend request from user3?');
    await dialog.accept();
  });

  await incomingFriendRequests.getByRole('button', { name: 'Accept' }).click();

  await expect(
    incomingFriendRequests.getByRole('link', { name: 'user3' }),
  ).not.toBeVisible();
  await expect(chatIndex.getByRole('link', { name: 'user3' })).toBeVisible();
});

test('should remove the user from incoming friend requests when rejecting an incoming friend request and not create a new chat in chat index', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Pending' }).click();

  const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
  const chatIndex = page.getByTestId('chat-index');

  await expect(
    incomingFriendRequests.getByRole('link', { name: 'user3' }),
  ).toBeVisible();

  await expect(
    chatIndex.getByRole('link', { name: 'user3' }),
  ).not.toBeVisible();

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Reject friend request from user3?');
    await dialog.accept();
  });

  await incomingFriendRequests.getByRole('button', { name: 'Reject' }).click();

  await expect(
    incomingFriendRequests.getByRole('link', { name: 'user3' }),
  ).not.toBeVisible();

  await expect(
    chatIndex.getByRole('link', { name: 'user3' }),
  ).not.toBeVisible();
});

test('should show the receiving user profile when clicking on an outgoing friend request', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Pending' }).click();

  const outgoingFriendRequests = page.getByTestId('outgoing-friendrequests');
  await outgoingFriendRequests.getByRole('link', { name: 'user2' }).click();
  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user2')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();
});

test('should show the sending user profile when clicking on an incoming friend request', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Pending' }).click();

  const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
  await incomingFriendRequests.getByRole('link', { name: 'user3' }).click();
  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user3')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();
});
