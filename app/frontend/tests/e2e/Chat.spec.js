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

test.describe('when navigating to the Chat page', () => {
  test.beforeEach(async ({ page, request }) => {
    await setup_test_data();

    await page.goto('/');
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();

    const chatIndex = page.getByTestId('chat-index');
    const link = chatIndex.getByRole('link', { name: 'user5' });
    await link.click();
    const sendButton = page.getByRole('button', { name: 'Send' });
    await expect(sendButton).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
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

  // test.describe('when sending a new message', () => {
  //   test('should show the new message at the bottom', async ({ page }) => {
  //     const input = page.getByRole('textbox');
  //     const sendButton = page.getByRole('button', { name: 'Send' });
  //     await input.fill('new message');
  //     await sendButton.click();
  //     const newMessage = page.getByText('new message');
  //     await expect(newMessage).toBeVisible();
  //   });
  // });

  // test.describe('when scrolling partially in the chat, then sending a message', () => {
  //   test.skip('should not show the sent message at the bottom', async ({
  //     page,
  //   }) => {
  //     const input = page.getByRole('textbox');
  //     const sendButton = page.getByRole('button', { name: 'Send' });
  //     await input.fill('new message');
  //     await sendButton.click();
  //     const newMessage = page.getByText('new message');
  //     await expect(newMessage).toBeVisible();
  //   });
  // });
});
