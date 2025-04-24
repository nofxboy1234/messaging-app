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

test('should show the friend chat when clicking on the chat button on their profile', async ({
  page,
}) => {
  const userIndex = page.getByTestId('user-index');
  await userIndex.getByRole('link', { name: 'user4' }).click();

  const userActions = page.getByTestId('user-actions');
  await userActions.getByRole('button', { name: 'Chat' }).click();

  const chatShow = page.getByTestId('chat-show');
  const headerProfileLink = chatShow.getByTestId('user-link-/profiles/4');
  await expect(headerProfileLink).toBeVisible();

  const sendButton = page.getByRole('button', { name: 'Send' });
  await expect(sendButton).toBeVisible();
});

test('should remove the friend from chat index and show a send button on their profile when clicking the unfriend button on their profile', async ({
  page,
}) => {
  const userIndex = page.getByTestId('user-index');
  await userIndex.getByRole('link', { name: 'user4' }).click();

  const chatIndex = page.getByTestId('chat-index');
  const userActions = page.getByTestId('user-actions');
  const user4ChatLink = chatIndex.getByRole('link', { name: 'user4' });
  await expect(userActions.getByRole('button', { name: 'Chat' })).toBeVisible();
  await expect(page.getByText('CHATS-2')).toBeVisible();
  await expect(user4ChatLink).toBeVisible();

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Unfriend user4?');
    await dialog.accept();
  });

  await userActions.getByRole('button', { name: 'Unfriend' }).click();

  await expect(page.getByText('CHATS-1')).toBeVisible();
  await expect(user4ChatLink).not.toBeVisible();
  await expect(userActions.getByRole('button', { name: 'Send' })).toBeVisible();
});

test('should show a Cancel button on a user profile when clicking the Send button', async ({
  page,
}) => {
  const userIndex = page.getByTestId('user-index');
  const userActions = page.getByTestId('user-actions');
  const sendButton = userActions.getByRole('button', { name: 'Send' });

  await userIndex.getByRole('link', { name: 'user6' }).click();

  await expect(sendButton).toBeVisible();
  await expect(page.getByText('CHATS-2')).toBeVisible();

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Send friend request to user6?');
    await dialog.accept();
  });

  await sendButton.click();

  await expect(sendButton).not.toBeVisible();
  await expect(page.getByText('CHATS-2')).toBeVisible();
  await expect(
    userActions.getByRole('button', { name: 'Cancel' }),
  ).toBeVisible();
});
