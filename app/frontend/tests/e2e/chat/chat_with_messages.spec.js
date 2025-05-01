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
  await page.goto('/chats/1');
  await page.waitForURL('/chats/1');
});

test.describe('when there are messages', () => {
  test('should show a link to the friend profile at the top of the chat', async ({
    page,
  }) => {
    const chatShow = page.getByTestId('chat-show');
    const headerProfileLink = chatShow.getByTestId('user-link-/profiles/4');
    await expect(headerProfileLink).toBeVisible();
  });

  test('should have the message input focused', async ({ page }) => {
    const chatShow = page.getByTestId('chat-show');
    const messageInput = chatShow.getByRole('textbox');
    await expect(messageInput).toBeFocused();
  });

  test('should show the last message at the bottom of the chat viewport', async ({
    page,
  }) => {
    const chat = page.getByTestId('root');

    const message = page
      .getByTestId('root')
      .locator('div')
      .filter({ hasText: 'user1last message' })
      .first();
    // await expect(message).toBeVisible();
    await page.waitForLoadState();
    await expect(message).toBeInViewport();

    const messageBox = await message.boundingBox();
    const chatBox = await chat.boundingBox();

    const messageTop = messageBox.y;
    const messageBottom = messageBox.y + messageBox.height;
    const chatBottom = chatBox.y + chatBox.height;
    const tolerance = 5;

    const messageAtBottomOfViewport =
      messageTop >= chatBottom - messageBox.height - tolerance &&
      messageTop <= chatBottom - messageBox.height + tolerance &&
      messageBottom >= chatBottom - tolerance &&
      messageBottom <= chatBottom + tolerance;

    expect(messageAtBottomOfViewport).toBe(true);

    const chatScrollBarAtBottom = await chat.evaluate((chat) => {
      return (
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
      );
    });
    expect(chatScrollBarAtBottom).toBe(true);
  });

  test('should show the current user and their friend in the user index', async ({
    page,
  }) => {
    const chatUserIndex = page.getByTestId('chat-user-index');
    const user1 = chatUserIndex.getByRole('link', { name: 'user1' });
    const user4 = chatUserIndex.getByRole('link', { name: 'user4' });
    const chatUsers = chatUserIndex.getByRole('link');

    await expect(user1).toBeVisible();
    await expect(user4).toBeVisible();
    await expect(chatUsers).toHaveCount(2);
  });

  test('should show a friend profile when clicking on their username in the chat user index', async ({
    page,
  }) => {
    const chatUserIndex = page.getByTestId('chat-user-index');
    const user4 = chatUserIndex.getByRole('link', { name: 'user4' });

    await user4.click();

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

  test.describe('when sending a new message', () => {
    test('should not see the message if it is blank', async ({ page }) => {
      const sendButton = page.getByRole('button', { name: 'Send' });

      await expect(page.getByTestId('message')).toHaveCount(203);
      await sendButton.click();
      await expect(page.getByTestId('message')).toHaveCount(203);
    });

    test('should show the new message at the bottom of the chat viewport', async ({
      page,
    }) => {
      const input = page.getByRole('textbox');
      const sendButton = page.getByRole('button', { name: 'Send' });
      await input.fill('new message');
      await sendButton.click();

      const chat = page.getByTestId('root');

      const message = page
        .getByTestId('root')
        .locator('div')
        .filter({ hasText: 'user1new message' })
        .first();
      // await expect(message).toBeVisible();
      await page.waitForLoadState();
      await expect(message).toBeInViewport({ ratio: 0.5 });

      const messageBox = await message.boundingBox();
      const chatBox = await chat.boundingBox();

      const messageTop = messageBox.y;
      const messageBottom = messageBox.y + messageBox.height;
      const chatBottom = chatBox.y + chatBox.height;
      const tolerance = 5;

      const messageAtBottomOfViewport =
        messageTop >= chatBottom - messageBox.height - tolerance &&
        messageTop <= chatBottom - messageBox.height + tolerance &&
        messageBottom >= chatBottom - tolerance &&
        messageBottom <= chatBottom + tolerance;

      expect(messageAtBottomOfViewport).toBe(true);

      const chatScrollBarAtBottom = await chat.evaluate((chat) => {
        return (
          Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
        );
      });
      expect(chatScrollBarAtBottom).toBe(true);
    });
  });

  test.describe('when scrolling partially in the chat, then sending a message', () => {
    test('should not show the new message at the bottom of the chat viewport', async ({
      page,
    }) => {
      const middleMessage = page.getByText('middle message');
      await middleMessage.scrollIntoViewIfNeeded();

      const input = page.getByRole('textbox');
      const sendButton = page.getByRole('button', { name: 'Send' });
      await input.fill('new message');
      await sendButton.click();

      const chat = page.getByTestId('root');

      const message = page
        .getByTestId('root')
        .locator('div')
        .filter({ hasText: 'user1new message' })
        .first();
      await expect(message).not.toBeVisible();
      await expect(message).not.toBeInViewport();

      const chatScrollBarAtBottom = await chat.evaluate((chat) => {
        return (
          Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
        );
      });
      expect(chatScrollBarAtBottom).toBe(false);
    });
  });

  test.describe('when scrolling right to the top in the chat, then sending a message', () => {
    test('should not show the new message at the bottom of the chat viewport', async ({
      page,
    }) => {
      const firstMessage = page.getByText('first message');
      await firstMessage.scrollIntoViewIfNeeded();

      const input = page.getByRole('textbox');
      const sendButton = page.getByRole('button', { name: 'Send' });
      await input.fill('new message');
      await sendButton.click();

      const chat = page.getByTestId('root');

      const message = page
        .getByTestId('root')
        .locator('div')
        .filter({ hasText: 'user1new message' })
        .first();
      await expect(message).not.toBeVisible();
      await expect(message).not.toBeInViewport();

      const chatScrollBarAtBottom = await chat.evaluate((chat) => {
        return (
          Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
        );
      });
      expect(chatScrollBarAtBottom).toBe(false);
    });
  });
});
