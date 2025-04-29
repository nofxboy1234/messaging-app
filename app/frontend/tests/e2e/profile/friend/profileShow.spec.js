import { expect } from '@playwright/test';
import setupTest from '../../setupTest';

const test = setupTest(async ({ page }) => {
  await page.goto('/profiles/4');
  await page.waitForURL('/profiles/4');
});

test.describe('when showing a friend profile', () => {
  test('should show their profile info, a chat button, an unfriend button', async ({
    page,
  }) => {
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

  test('should show the friend chat when clicking on the chat button on their profile', async ({
    page,
  }) => {
    const userActions = page.getByTestId('user-actions');
    await userActions.getByRole('button', { name: 'Chat' }).click();

    const chatShow = page.getByTestId('chat-show');
    const headerProfileLink = chatShow.getByTestId('user-link-/profiles/4');
    await expect(headerProfileLink).toBeVisible();

    const sendButton = page.getByRole('button', { name: 'Send' });
    await expect(sendButton).toBeVisible();
  });

  test('should remove the friend from chat index and show a send button on their profile when clicking the unfriend button and accepting the popup', async ({
    page,
  }) => {
    const chatIndex = page.getByTestId('chat-index');
    const userActions = page.getByTestId('user-actions');
    const user4ChatLink = chatIndex.getByRole('link', { name: 'user4' });

    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(user4ChatLink).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Unfriend user4?');
      await dialog.accept();
    });

    await userActions.getByRole('button', { name: 'Unfriend' }).click();

    await expect(page.getByText('CHATS-1')).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Send' }),
    ).toBeVisible();
    await expect(user4ChatLink).not.toBeVisible();
  });

  test('should not remove the friend from chat index and not show a send button on their profile when clicking the unfriend button and dismissing the popup', async ({
    page,
  }) => {
    const chatIndex = page.getByTestId('chat-index');
    const userActions = page.getByTestId('user-actions');
    const user4ChatLink = chatIndex.getByRole('link', { name: 'user4' });

    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(user4ChatLink).toBeVisible();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Unfriend user4?');
      await dialog.dismiss();
    });

    await userActions.getByRole('button', { name: 'Unfriend' }).click();

    await expect(page.getByText('CHATS-2')).toBeVisible();
    await expect(
      userActions.getByRole('button', { name: 'Chat' }),
    ).toBeVisible();
    await expect(user4ChatLink).toBeVisible();
  });
});
