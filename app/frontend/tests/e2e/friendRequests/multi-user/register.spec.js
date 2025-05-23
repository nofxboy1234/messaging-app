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

  await page.goto('/users/sign_in');
  await page.waitForURL('/users/sign_in');
  await page.waitForLoadState();

  await page.getByLabel('Email:').fill('user1@example.com');
  await page.getByLabel('Password:').fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Profile (user1)')).toBeVisible();
  const authFile = path.join(
    import.meta.dirname,
    '../../../../playwright/.auth/user.json',
  );
  await page.context().storageState({ path: authFile });

  if (context) {
    await context.close();
    context = null;
  }
});

test.describe('when the sender registers a new user', () => {
  test('should show the new user in user index when logged in afterwards', async () => {
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
    await expect(
      page.getByTestId('user-index').getByRole('link', { name: 'user99' }),
    ).toBeVisible();
  });

  test('receiver should see the new user added to user index', async ({
    browser,
  }) => {
    const user1Page1 = page;
    const user4Context = await browser.newContext();

    const user4SignIn = await user4Context.newPage();
    await user4SignIn.goto('/users/sign_in');
    await user4SignIn.waitForURL('/users/sign_in');
    await user4SignIn.waitForLoadState();

    await user4SignIn.getByLabel('Email:').fill('user4@example.com');
    await user4SignIn.getByLabel('Password:').fill('123456');
    await user4SignIn.getByRole('button', { name: 'Log in' }).click();
    await expect(user4SignIn.getByText('Profile (user4)')).toBeVisible();

    const user4Page1 = await user4Context.newPage();
    await user4Page1.goto('/');
    await user4Page1.waitForURL('/');
    await user4Page1.waitForLoadState();

    await expect(
      user4Page1
        .getByTestId('user-index')
        .getByRole('link', { name: 'user99' }),
    ).not.toBeVisible();

    //
    await user1Page1.getByRole('button', { name: 'Sign up' }).click();

    const registrationsNew = user1Page1.getByTestId('registrations-new');
    await registrationsNew.getByLabel('Email:').fill('user99@example.com');
    await registrationsNew.getByLabel('Password:').fill('123456');
    await registrationsNew.getByLabel('Password confirmation:').fill('123456');
    await registrationsNew.getByRole('button', { name: 'Sign up' }).click();
    //

    await expect(
      user4Page1
        .getByTestId('user-index')
        .getByRole('link', { name: 'user99' }),
    ).toBeVisible();

    await user4Context.close();
  });
});
