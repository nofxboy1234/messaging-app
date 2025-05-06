import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';

const setup_test_data_with_users = async () => {
  return new Promise((resolve) => {
    execSync('RAILS_ENV=test rails playwright:setup_test_data', {
      stdio: 'inherit',
    });
    resolve();
  });
};

test.beforeEach(async ({ page }) => {
  await setup_test_data_with_users();
  await page.goto('/users/sign_in');
  await page.waitForURL('/users/sign_in');
  await page.waitForLoadState();
});

test.afterEach(async ({ page }) => {
  await setup_test_data_with_users();

  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/users/sign_in');
  await page.waitForURL('/users/sign_in');
  await page.waitForLoadState();

  await page.getByLabel('Email:').fill('user1@example.com');
  await page.getByLabel('Password:').fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // await page.waitForURL('/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText('Profile (user1)')).toBeVisible();
  // End of authentication steps.
  const authFile = path.join(
    import.meta.dirname,
    '../../../playwright/.auth/user.json',
  );
  await page.context().storageState({ path: authFile });
});

test.describe('when on the sign in page', () => {
  test('should show the login screen inputs and buttons', async ({ page }) => {
    await expect(page.getByLabel('Email:')).toBeVisible();
    await expect(page.getByLabel('Password:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
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
