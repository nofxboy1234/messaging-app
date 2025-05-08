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
  await page.goto('/pending_friends');
  await page.waitForURL('/pending_friends');
  await page.waitForLoadState();
});

test.afterEach(async () => {
  if (context) {
    await context.close();
    context = null;
  }
});

test('should show incoming and outgoing friends requests friends when clicking Pending', async () => {
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

test('should remove the user from outgoing friend requests when cancelling a friend request and accepting the popup', async () => {
  const outgoingFriendRequests = page.getByTestId('outgoing-friendrequests');

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

test('should not remove the user from outgoing friend requests when cancelling a friend request and dismissing the popup', async () => {
  const outgoingFriendRequests = page.getByTestId('outgoing-friendrequests');

  await expect(
    outgoingFriendRequests.getByRole('link', { name: 'user2' }),
  ).toBeVisible();

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Cancel friend request to user2?');
    await dialog.dismiss();
  });

  await outgoingFriendRequests.getByRole('button', { name: 'Cancel' }).click();

  await expect(
    outgoingFriendRequests.getByRole('link', { name: 'user2' }),
  ).toBeVisible();
});

test('should remove the user from incoming friend requests and add the user chat to chat index when accepting an incoming friend request and accepting the popup', async () => {
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

test('should not remove the user from incoming friend requests and add the user chat to chat index when accepting an incoming friend request and dismissing the popup', async () => {
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
    await dialog.dismiss();
  });

  await incomingFriendRequests.getByRole('button', { name: 'Accept' }).click();

  await expect(
    incomingFriendRequests.getByRole('link', { name: 'user3' }),
  ).toBeVisible();
  await expect(
    chatIndex.getByRole('link', { name: 'user3' }),
  ).not.toBeVisible();
});

test('should remove the user from incoming friend requests when rejecting an incoming friend request and not create a new chat in chat index when accepting the popup', async () => {
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

test('should not remove the user from incoming friend requests when rejecting an incoming friend request and not create a new chat in chat index when dismissing the popup', async () => {
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
    await dialog.dismiss();
  });

  await incomingFriendRequests.getByRole('button', { name: 'Reject' }).click();

  await expect(
    incomingFriendRequests.getByRole('link', { name: 'user3' }),
  ).toBeVisible();

  await expect(
    chatIndex.getByRole('link', { name: 'user3' }),
  ).not.toBeVisible();
});

test('should show the receiving user profile when clicking on an outgoing friend request', async () => {
  const outgoingFriendRequests = page.getByTestId('outgoing-friendrequests');
  await outgoingFriendRequests.getByRole('link', { name: 'user2' }).click();
  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user2')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();
});

test('should show the sending user profile when clicking on an incoming friend request', async () => {
  const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
  await incomingFriendRequests
    .getByRole('link', { name: 'user3' })
    .click({ position: { x: 5, y: 5 } });
  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user3')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();
});
