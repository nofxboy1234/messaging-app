import { expect } from '@playwright/test';
import test from '../setupTest';

test.describe('when there are no messages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/chats/2');
    await page.waitForURL('/chats/2');
  });

  test('should show an empty chat', async ({ page }) => {
    await expect(page.getByTestId('message')).toHaveCount(0);
  });
});

test.describe('when there are messages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/chats/1');
    await page.waitForURL('/chats/1');
  });

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
    const lastMessage = page.getByText('last message');

    const lastMessageInChatViewport = await lastMessage.evaluate(
      (message, container) => {
        const messageRect = message.getBoundingClientRect();
        const chatRect = container.getBoundingClientRect();

        return (
          messageRect.top >= chatRect.top &&
          messageRect.bottom <= chatRect.bottom
        );
      },
      await chat.elementHandle(),
    );

    const chatScrollBarAtBottom = await chat.evaluate((chat) => {
      return (
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 3
      );
    });

    expect(lastMessageInChatViewport).toBe(true);
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
      const newMessage = page.getByText('new message');

      const newMessageInChatViewport = await newMessage.evaluate(
        (message, container) => {
          const messageRect = message.getBoundingClientRect();
          const chatRect = container.getBoundingClientRect();

          return (
            messageRect.top >= chatRect.top &&
            messageRect.bottom <= chatRect.bottom
          );
        },
        await chat.elementHandle(),
      );

      const chatScrollBarAtBottom = await chat.evaluate((chat) => {
        return (
          Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 3
        );
      });

      expect(newMessageInChatViewport).toBe(true);
      expect(chatScrollBarAtBottom).toBe(true);
    });
  });

  test.describe('when scrolling partially in the chat, then sending a message', () => {
    test('should not show the new message at the bottom of the chat viewport', async ({
      page,
    }) => {
      const middleMessage = page.getByText('middle message');
      middleMessage.scrollIntoViewIfNeeded();

      const input = page.getByRole('textbox');
      const sendButton = page.getByRole('button', { name: 'Send' });
      await input.fill('new message');
      await sendButton.click();

      const chat = page.getByTestId('root');
      const newMessage = page.getByText('new message');

      const newMessageInChatViewport = await newMessage.evaluate(
        (message, container) => {
          const messageRect = message.getBoundingClientRect();
          const chatRect = container.getBoundingClientRect();

          return (
            messageRect.top >= chatRect.top &&
            messageRect.bottom <= chatRect.bottom
          );
        },
        await chat.elementHandle(),
      );

      const chatScrollBarAtBottom = await chat.evaluate((chat) => {
        return (
          Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 3
        );
      });

      expect(newMessageInChatViewport).toBe(false);
      expect(chatScrollBarAtBottom).toBe(false);
    });
  });

  test.describe('when scrolling right to the top in the chat, then sending a message', () => {
    test('should not show the new message at the bottom of the chat viewport', async ({
      page,
    }) => {
      const firstMessage = page.getByText('first message');
      firstMessage.scrollIntoViewIfNeeded();

      const input = page.getByRole('textbox');
      const sendButton = page.getByRole('button', { name: 'Send' });
      await input.fill('new message');
      await sendButton.click();

      const chat = page.getByTestId('root');
      const newMessage = page.getByText('new message');

      const newMessageInChatViewport = await newMessage.evaluate(
        (message, container) => {
          const messageRect = message.getBoundingClientRect();
          const chatRect = container.getBoundingClientRect();

          return (
            messageRect.top >= chatRect.top &&
            messageRect.bottom <= chatRect.bottom
          );
        },
        await chat.elementHandle(),
      );

      const chatScrollBarAtBottom = await chat.evaluate((chat) => {
        return (
          Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 3
        );
      });

      expect(newMessageInChatViewport).toBe(false);
      expect(chatScrollBarAtBottom).toBe(false);
    });
  });
});
