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

test.describe('when navigating to any page while signed out', () => {
  test.beforeEach(async ({ page }) => {
    await setup_test_data();

    await page.goto('/chats/3');
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
});
