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
  await page.waitForLoadState();
});

test.describe('when sender sends a new message', () => {
  test('sender should see message from sender added to the chat', async ({
    page,
  }) => {
    const chat = page.getByTestId('root');

    const message = page
      .getByTestId('root')
      .locator('div')
      .filter({ hasText: 'user1hello user4' })
      .first();
    await page.waitForLoadState();

    await expect(
      page
        .getByTestId('root')
        .locator('div')
        .filter({ hasText: 'user1last message' })
        .first(),
    ).toBeInViewport({ ratio: 1 });

    await expect(message).not.toBeInViewport({ ratio: 1 });
    await expect(message).not.toBeVisible();

    let chatScrollBarAtBottom = await chat.evaluate((chat) => {
      return (
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
      );
    });
    expect(chatScrollBarAtBottom).toBe(true);

    //
    const input = page.getByRole('textbox');
    const sendButton = page.getByRole('button', { name: 'Send' });
    await input.fill('hello user4');
    await sendButton.click();

    //

    await page.waitForLoadState();
    await expect(message).toBeInViewport({ ratio: 1 });
    await expect(message).toBeVisible();

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

    chatScrollBarAtBottom = await chat.evaluate((chat) => {
      return (
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
      );
    });
    expect(chatScrollBarAtBottom).toBe(true);
  });

  test('receiver should see message from sender added to the chat', async ({
    browser,
    page: user1Page1,
  }) => {
    const user4Context = await browser.newContext();

    const user4SignIn = await user4Context.newPage();
    await user4SignIn.goto('/');
    await user4SignIn.waitForURL('/');
    await user4SignIn.waitForLoadState();

    await user4SignIn.getByRole('button', { name: 'Log out' }).click();
    await user4SignIn.waitForURL('/users/sign_in');

    await user4SignIn.getByLabel('Email:').fill('user4@example.com');
    await user4SignIn.getByLabel('Password:').fill('123456');
    await user4SignIn.getByRole('button', { name: 'Log in' }).click();
    await expect(user4SignIn.getByText('Profile (user4)')).toBeVisible();

    const user4Page1 = await user4Context.newPage();
    await user4Page1.goto('/chats/1');
    await user4Page1.waitForURL('/chats/1');
    await user4Page1.waitForLoadState();

    const chat = user4Page1.getByTestId('root');

    const message = user4Page1
      .getByTestId('root')
      .locator('div')
      .filter({ hasText: 'user1hello user4' })
      .first();
    await user4Page1.waitForLoadState();

    await expect(
      user4Page1
        .getByTestId('root')
        .locator('div')
        .filter({ hasText: 'user1last message' })
        .first(),
    ).toBeInViewport({ ratio: 1 });

    await expect(message).not.toBeInViewport({ ratio: 1 });
    await expect(message).not.toBeVisible();

    let chatScrollBarAtBottom = await chat.evaluate((chat) => {
      return (
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
      );
    });
    expect(chatScrollBarAtBottom).toBe(true);

    //
    const input = user1Page1.getByRole('textbox');
    const sendButton = user1Page1.getByRole('button', { name: 'Send' });
    await input.fill('hello user4');
    await sendButton.click();
    //

    await user4Page1.waitForLoadState();
    await expect(message).toBeInViewport({ ratio: 1 });
    await expect(message).toBeVisible();

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

    chatScrollBarAtBottom = await chat.evaluate((chat) => {
      return (
        Math.abs(chat.scrollHeight - chat.scrollTop - chat.clientHeight) <= 10
      );
    });
    expect(chatScrollBarAtBottom).toBe(true);

    await user4Context.close();
  });
});
