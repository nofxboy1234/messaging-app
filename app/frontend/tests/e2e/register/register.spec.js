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

let context;
let page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext({
    storageState: 'app/frontend/playwright/.auth/user.json',
  });
  page = await context.newPage();

  await setup_test_data_with_users();
  await page.goto('/users/sign_in');
  await page.waitForURL('/users/sign_in');
  await page.waitForLoadState();
});

test.afterEach(async () => {
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

  if (context) {
    await context.close();
    context = null;
  }
});

test.describe('when on the sign up page', () => {
  test('should show the sign up screen when clicking "Sign up"', async () => {
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

  test('should show error flash messages for email and password when entering an invalid email then clicking "Sign up"', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(registrationsNew.getByText('is invalid')).toBeVisible();
    await expect(registrationsNew.getByText("can't be blank")).toBeVisible();
  });

  test('should show error flash message for password when entering a valid email then clicking "Sign up"', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(registrationsNew.getByText("can't be blank")).toBeVisible();
  });

  test('should show error flash messages for password and password confirmation when entering a valid email, short password, then clicking "Sign up"', async () => {
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

  test('should show error flash message for password confirmation when entering a valid email, valid password, then clicking "Sign up"', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = page.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByLabel('Password:').fill('123456');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(
      registrationsNew.getByText("doesn't match Password"),
    ).toBeVisible();
  });

  test('should log in and show successful sign up message when signing up successfully', async () => {
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

  test('should show "has already been taken" message when signing up with an email that is already registered', async () => {
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

    await page.getByRole('button', { name: 'Log out' }).click();

    await page.getByRole('button', { name: 'Sign up' }).click();

    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByLabel('Password:').fill('123456');
    await registrationsNew.getByLabel('Password confirmation:').fill('123456');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.getByText('has already been taken')).toBeVisible();
  });
});
