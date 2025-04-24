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

test.describe('when navigating to the Profile page', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Profile (user1)' }).click();
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
