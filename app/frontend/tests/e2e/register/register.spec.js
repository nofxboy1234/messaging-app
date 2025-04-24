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
