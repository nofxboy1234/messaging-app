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
  await page.goto('/pending_friends');
  await page.waitForLoadState();
});

test.describe('when accepting an incoming friend request and accepting the popup', () => {
  test('should remove the user from incoming friend requests, \
               add the user chat to chat index, \
               show chat and unfriend buttons on their profile, \
               show user in friend index', async ({ page }) => {
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

    await incomingFriendRequests
      .getByRole('button', { name: 'Accept' })
      .click();

    await expect(
      incomingFriendRequests.getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user3' })).toBeVisible();

    await page
      .getByTestId('user-index')
      .getByRole('link', { name: 'user3' })
      .click();
    const userActions = page.getByTestId('user-actions');
    await expect(
      userActions.getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Unfriend' }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Friends' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.getByText('ALL FRIENDS-3')).toBeVisible();

    await expect(
      page.getByTestId('friend-index').getByTestId('user-link-/profiles/3'),
    ).toBeVisible();
  });
});

// test('should remove the user from incoming friend requests when rejecting an incoming friend request and not create a new chat in chat index when accepting the popup', async ({
//   page,
// }) => {
//   const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
//   const chatIndex = page.getByTestId('chat-index');

//   await expect(
//     incomingFriendRequests.getByRole('link', { name: 'user3' }),
//   ).toBeVisible();

//   await expect(
//     chatIndex.getByRole('link', { name: 'user3' }),
//   ).not.toBeVisible();

//   page.on('dialog', async (dialog) => {
//     expect(dialog.message()).toBe('Reject friend request from user3?');
//     await dialog.accept();
//   });

//   await incomingFriendRequests.getByRole('button', { name: 'Reject' }).click();

//   await expect(
//     incomingFriendRequests.getByRole('link', { name: 'user3' }),
//   ).not.toBeVisible();

//   await expect(
//     chatIndex.getByRole('link', { name: 'user3' }),
//   ).not.toBeVisible();
// });
