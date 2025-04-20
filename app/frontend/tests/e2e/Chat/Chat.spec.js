// @ts-check
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

test.describe('when navigating to the Home page', () => {
  test.beforeEach(async ({ page }) => {
    await setup_test_data();

    await page.goto('/');
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();
  });

  test.afterEach(async () => {
    await cleanup_test_data();
  });

  test.only('should show the navbar, current user chats, friends and all users', async ({
    page,
  }) => {
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
    const friendsLink = page.getByRole('link', { name: 'Friends' });
    await expect(friendsLink).toBeVisible();
    const profileLink = page.getByRole('link', { name: 'Profile (user1)' });
    await expect(profileLink).toBeVisible();
    const logoutButton = page.getByRole('button', { name: 'Log out' });
    await expect(logoutButton).toBeVisible();

    const chats = page.getByText('CHATS-2');
    await expect(chats).toBeVisible();
    const chatIndex = page.getByTestId('chat-index');
    await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
    await expect(chatIndex.getByRole('link', { name: 'user5' })).toBeVisible();
    await expect(
      chatIndex.getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    const friends = page.getByText('ALL FRIENDS-2');
    await expect(friends).toBeVisible();
    const friendIndex = page.getByTestId('friend-index');
    await expect(
      friendIndex.getByRole('link', { name: 'user4' }),
    ).toBeVisible();
    await expect(
      friendIndex.getByRole('link', { name: 'user5' }),
    ).toBeVisible();
    await expect(
      friendIndex.getByRole('link', { name: 'user1' }),
    ).not.toBeVisible();

    const users = page.getByText('USERS-5');
    await expect(users).toBeVisible();
    const userIndex = page.getByTestId('user-index');
    await expect(userIndex.getByRole('link', { name: 'user1' })).toBeVisible();
    await expect(userIndex.getByRole('link', { name: 'user2' })).toBeVisible();
    await expect(userIndex.getByRole('link', { name: 'user3' })).toBeVisible();
    await expect(userIndex.getByRole('link', { name: 'user4' })).toBeVisible();
    await expect(userIndex.getByRole('link', { name: 'user5' })).toBeVisible();
  });
});

test.describe('when navigating to the Chat page', () => {
  test.beforeEach(async ({ page }) => {
    await setup_test_data();

    await page.goto('/');
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();

    const chatIndex = page.getByTestId('chat-index');
    const link = chatIndex.getByRole('link', { name: 'user4' });
    await link.click();
    const sendButton = page.getByRole('button', { name: 'Send' });
    await expect(sendButton).toBeVisible();
  });

  test.afterEach(async () => {
    await cleanup_test_data();
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

    await expect(user1).toBeVisible;
    await expect(user4).toBeVisible;
    await expect(chatUsers).toHaveCount(2);
  });

  test.describe('when sending a new message', () => {
    test('should not see the message if it is blank', async ({ page }) => {
      const sendButton = page.getByRole('button', { name: 'Send' });

      expect(page.getByTestId('message')).toHaveCount(203);
      await sendButton.click();
      expect(page.getByTestId('message')).toHaveCount(203);
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
