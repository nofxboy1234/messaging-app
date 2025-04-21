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

  test('should show the navbar, current user chats, friends and all users', async ({
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

  test('should show a chat and unfriend button when clicking a friend in the friend index', async ({
    page,
  }) => {
    const friendIndex = page.getByTestId('friend-index');
    const user5 = friendIndex.getByTestId('user-link-/profiles/5');

    await user5.click();

    await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unfriend' })).toBeVisible();
  });

  test('should show a popup message to confirm, and remove the friend and chat if OK is clicked', async ({
    page,
  }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Unfriend user5?');
      await dialog.accept();
    });

    const friendIndex = page.getByTestId('friend-index');
    await friendIndex.getByTestId('user-link-/profiles/5').click();
    const unfriend = page.getByRole('button', { name: 'Unfriend' });
    await unfriend.click();

    await expect(page.getByText('CHATS-1')).toBeVisible();
    const chatIndex = page.getByTestId('chat-index');
    await expect(chatIndex.getByRole('link', { name: 'user4' })).toBeVisible();
    await expect(
      chatIndex.getByRole('link', { name: 'user5' }),
    ).not.toBeVisible();

    await expect(page.getByText('ALL FRIENDS-1')).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/4'),
    ).toBeVisible();
    await expect(
      friendIndex.getByTestId('user-link-/profiles/5'),
    ).not.toBeVisible();
  });

  test.describe('when clicking on the Log out button', () => {
    test('should show the login page with a flash message', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Log out' }).click();

      await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
      await expect(page.getByText('Signed out successfully.')).toBeVisible();
    });
  });
});

test.describe('when navigating to a Chat page with no messages', () => {
  test.beforeEach(async ({ page }) => {
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

  test.afterEach(async () => {
    await cleanup_test_data();
  });

  test('should show no messages', async ({ page }) => {
    await expect(page.getByTestId('message')).toHaveCount(0);
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

test.describe('when navigating to the Friends page', () => {
  test.beforeEach(async ({ page }) => {
    await setup_test_data();

    await page.goto('/');
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();

    await page.getByRole('link', { name: 'Friends' }).click();
  });

  test.afterEach(async () => {
    await cleanup_test_data();
  });

  test('should show All and Pending friends links', async ({ page }) => {
    await expect(page.getByText('Friends:')).toBeVisible();
    await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pending' })).toBeVisible();
  });

  test('should show all friends when clicking All', async ({ page }) => {
    await page.getByRole('link', { name: 'All' }).click();

    await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
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
    await page.getByRole('link', { name: 'Pending' }).click();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Cancel friend request to user2?');
      await dialog.accept();
    });

    const outgoingFriendRequests = page.getByTestId('outgoing-friendrequests');
    await outgoingFriendRequests
      .getByRole('button', { name: 'Cancel' })
      .click();

    await expect(
      outgoingFriendRequests.getByRole('link', { name: 'user2' }),
    ).not.toBeVisible();
  });

  test('should remove the user from incoming friend requests and add the user chat to chat index when accepting an incoming friend request', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Pending' }).click();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Accept friend request from user3?');
      await dialog.accept();
    });

    const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
    await incomingFriendRequests
      .getByRole('button', { name: 'Accept' })
      .click();

    await expect(
      incomingFriendRequests.getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();

    const chatIndex = page.getByTestId('chat-index');
    await expect(chatIndex.getByRole('link', { name: 'user3' })).toBeVisible();
  });

  test('should remove the user from incoming friend requests when rejecting an incoming friend request and not create a new chat in chat index', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Pending' }).click();

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Reject friend request from user3?');
      await dialog.accept();
    });

    const incomingFriendRequests = page.getByTestId('incoming-friendrequests');
    await incomingFriendRequests
      .getByRole('button', { name: 'Reject' })
      .click();

    await expect(
      incomingFriendRequests.getByRole('link', { name: 'user3' }),
    ).not.toBeVisible();

    const chatIndex = page.getByTestId('chat-index');
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
});

test.describe('when navigating to the Profile page', () => {
  test.beforeEach(async ({ page }) => {
    await setup_test_data();

    await page.goto('/');
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Signed in successfully.')).toBeVisible();

    await page.getByRole('link', { name: 'Profile (user1)' }).click();
  });

  test.afterEach(async () => {
    await cleanup_test_data();
  });

  test('should show the current user profile', async ({ page }) => {
    const profile = page.getByTestId('profile');
    await expect(profile.getByText('user1')).toBeVisible();
    await expect(profile.getByText('About Me:')).toBeVisible();

    const profileActions = page.getByTestId('profile-actions');
    await expect(
      profileActions.getByRole('button', { name: 'Edit' }),
    ).toBeVisible();
    await expect(
      profileActions.getByRole('link', { name: 'Update avatar' }),
    ).toBeVisible();
  });

  test('should show the current user profile edit page when clicking Edit', async ({
    page,
  }) => {
    const userActions = page.getByTestId('profile-actions');
    await userActions.getByRole('button', { name: 'Edit' }).click();

    await expect(page.locator('#username')).toBeVisible();
    await expect(page.getByText('About Me:')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Update' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show' })).toBeVisible();
  });

  test('should show the current user profile page when clicking Edit, then Show button', async ({
    page,
  }) => {
    const userActions = page.getByTestId('profile-actions');
    await userActions.getByRole('button', { name: 'Edit' }).click();

    await page.getByRole('button', { name: 'Show' }).click();

    await expect(
      userActions.getByRole('button', { name: 'Edit' }),
    ).toBeVisible();
    await expect(
      userActions.getByRole('link', { name: 'Update avatar' }),
    ).toBeVisible();
  });

  test('should show the current user profile page with updated info when clicking Edit, updating, then clicking Update button', async ({
    page,
  }) => {
    const userActions = page.getByTestId('profile-actions');
    await userActions.getByRole('button', { name: 'Edit' }).click();

    await page.locator('#username').clear();
    await page.locator('#username').fill('updated username');
    await page.getByRole('textbox', { name: 'About Me:' }).clear();
    await page
      .getByRole('textbox', { name: 'About Me:' })
      .fill('updated about me');

    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.getByText('updated username')).toBeVisible();
    await expect(page.getByText('updated about me')).toBeVisible();
  });
});

test.describe('when navigating to any page while signed out', () => {
  test.beforeEach(async ({ page }) => {
    await setup_test_data();

    await page.goto('/chats/3');
  });

  test.afterEach(async () => {
    await cleanup_test_data();
  });

  test('should show the login screen with a flash message', async ({
    page,
  }) => {
    await expect(page.getByLabel('Email:')).toBeVisible();
    await expect(page.getByLabel('Password:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    await expect(
      page.getByText('You need to sign in or sign up before continuing.'),
    ).toBeVisible();
  });

  test('should show "Invalid Email or password" when entering a valid email then clicking "Log in"', async ({
    page,
  }) => {
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('Invalid Email or password.')).toBeVisible();
  });

  test('should show "Invalid Email or password" when entering a valid email, invalid password, then clicking "Log in"', async ({
    page,
  }) => {
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('Invalid Email or password.')).toBeVisible();
  });

  test('should log in and show successful sign in flash message when logging in with correct email and password', async ({
    page,
  }) => {
    await page.getByLabel('Email:').fill('user1@example.com');
    await page.getByLabel('Password:').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('Signed in successfully.')).toBeVisible();
    await expect(page.getByText('Profile (user1)')).toBeVisible();
  });

  test('should show the sign up screen when clicking "Sign up"', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await expect(registrationsNew.getByLabel('Email:')).toBeVisible();
    await expect(registrationsNew.getByLabel('Password:')).toBeVisible();
    await expect(
      registrationsNew.getByLabel('Password confirmation:'),
    ).toBeVisible();
    await expect(
      registrationsNew.getByRole('button', { name: 'Sign up' }),
    ).toBeVisible();
    await expect(
      registrationsNew.getByRole('button', { name: 'Back' }),
    ).toBeVisible();
  });

  test('should show error flash messages for email and password when entering an invalid email then clicking "Sign up"', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(registrationsNew.getByText('is invalid')).toBeVisible();
    await expect(registrationsNew.getByText("can't be blank")).toBeVisible();
  });

  test('should show error flash message for password when entering a valid email then clicking "Sign up"', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(registrationsNew.getByText("can't be blank")).toBeVisible();
  });

  test('should show error flash messages for password and password confirmation when entering a valid email, short password, then clicking "Sign up"', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByLabel('Password:').fill('123');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(
      registrationsNew.getByText('is too short (minimum is 6 characters)'),
    ).toBeVisible();
    await expect(
      registrationsNew.getByText("doesn't match Password"),
    ).toBeVisible();
  });

  test('should show error flash message for password confirmation when entering a valid email, valid password, then clicking "Sign up"', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByLabel('Password:').fill('123456');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(
      registrationsNew.getByText("doesn't match Password"),
    ).toBeVisible();
  });

  test('should log in and show successful sign up message when signing up successfully', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByLabel('Password:').fill('123456');
    await registrationsNew.getByLabel('Password confirmation:').fill('123456');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(
      page.getByText('Welcome! You have signed up successfully.'),
    ).toBeVisible();
    await expect(page.getByText('Profile (user99)')).toBeVisible();
  });
});
